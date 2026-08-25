import os
import json
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from dotenv import load_dotenv
import openai

load_dotenv()

app = FastAPI(title="Agentic AI Prototype API", version="1.0.0")

# ============ CORS ============
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ CONFIG ============
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    print("❌ ERROR: OPENAI_API_KEY not found in .env file!")
    print("⚠️ Please create a .env file with OPENAI_API_KEY=sk-proj-...")
    exit(1)

openai.api_key = OPENAI_API_KEY

# ============ MODELS ============
class ChatRequest(BaseModel):
    message: str
    context: Optional[List[Dict[str, Any]]] = None

class WorkflowRequest(BaseModel):
    input_data: Dict[str, Any]

class MemoryRequest(BaseModel):
    key: str
    value: str

# ============ MCP SERVER (Memory) ============
class MCPServer:
    def __init__(self):
        self._memory = {}
    
    def store(self, key: str, value: Any) -> Dict[str, Any]:
        self._memory[key] = value
        return {"status": "stored", "key": key, "value": value}
    
    def retrieve(self, key: str) -> Optional[Any]:
        return self._memory.get(key)

mcp_server = MCPServer()

# ============ RAG PIPELINE ============
def retrieve_context(query: str) -> str:
    return f"Retrieved relevant context for: '{query}'. This includes related documents and information."

# ============ OPENAI FUNCTION DEFINITIONS ============
FUNCTIONS = [
    {
        "name": "search_web",
        "description": "Search the web for current information",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "The search query"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "analyze_data",
        "description": "Analyze provided data and return insights",
        "parameters": {
            "type": "object",
            "properties": {
                "data": {"type": "object", "description": "The data to analyze"}
            },
            "required": ["data"]
        }
    },
    {
        "name": "save_to_memory",
        "description": "Save information to the agent's persistent memory",
        "parameters": {
            "type": "object",
            "properties": {
                "key": {"type": "string", "description": "Memory key"},
                "value": {"type": "string", "description": "Memory value"}
            },
            "required": ["key", "value"]
        }
    }
]

# ============ TOOL EXECUTION ============
def execute_tool(tool_name: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
    if tool_name == "search_web":
        return {"result": f"🔍 Web search results for: '{parameters.get('query', '')}'", "success": True}
    elif tool_name == "analyze_data":
        return {"result": f"📊 Data analysis complete", "success": True}
    elif tool_name == "save_to_memory":
        key = parameters.get("key", "")
        value = parameters.get("value", "")
        mcp_server.store(key, value)
        return {"result": f"💾 Saved to memory: {key} = {value}", "success": True}
    else:
        return {"result": f"Tool '{tool_name}' not found", "success": False}

# ============ AGENTIC WORKFLOW ============
class AgenticWorkflow:
    def __init__(self):
        self.steps = []
    
    def add_step(self, name: str, action: callable):
        self.steps.append({"name": name, "action": action})
    
    def execute(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        result = {"input": input_data, "outputs": [], "status": "success"}
        for step in self.steps:
            try:
                output = step["action"](input_data)
                result["outputs"].append({"step": step["name"], "result": output})
            except Exception as e:
                result["status"] = "failed"
                result["outputs"].append({"step": step["name"], "error": str(e)})
                break
        return result

# ============ ENDPOINTS ============

@app.get("/")
async def root():
    return {
        "status": "🚀 Agentic AI Prototype is running",
        "version": "1.0.0",
        "openai_api_key_set": bool(OPENAI_API_KEY),
        "endpoints": {
            "/api/chat": "POST - Chat with Agentic AI",
            "/api/agent/workflow": "POST - Run agentic workflow",
            "/api/memory/store": "POST - Store memory",
            "/api/memory/retrieve/{key}": "GET - Retrieve memory",
            "/api/memory/list": "GET - List all memory"
        }
    }

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Chat with the Agentic AI with RAG + MCP + OpenAI."""
    try:
        # 1. RAG Retrieval
        rag_context = retrieve_context(request.message)
        
        # 2. Check MCP Memory
        memory_context = mcp_server.retrieve("conversation_history") or ""
        
        # 3. Build system prompt
        system_prompt = f"""You are an Agentic AI assistant with capabilities:
        
RAG Context: {rag_context}
Memory: {memory_context}

You can use tools to help users. When a user asks for something that requires action, call the appropriate function.
"""
        
        # 4. Call OpenAI with function calling (OLD API)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            functions=FUNCTIONS,
            function_call="auto",
            temperature=0.7
        )
        
        message = response["choices"][0]["message"]
        
        # 5. Check if tool was called
        if message.get("function_call"):
            function_name = message["function_call"]["name"]
            function_args = json.loads(message["function_call"]["arguments"])
            
            # Execute the tool
            tool_result = execute_tool(function_name, function_args)
            
            # Get final response from OpenAI with tool result
            final_response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": request.message},
                    {"role": "assistant", "content": None, "function_call": {
                        "name": function_name,
                        "arguments": json.dumps(function_args)
                    }},
                    {"role": "function", "name": function_name, "content": json.dumps(tool_result)}
                ],
                temperature=0.7
            )
            
            final_message = final_response["choices"][0]["message"]["content"]
            
            return {
                "response": final_message,
                "tool_called": function_name,
                "tool_result": tool_result,
                "type": "tool_call"
            }
        
        # 6. Save conversation to memory
        history = mcp_server.retrieve("conversation_history") or ""
        mcp_server.store("conversation_history", f"{history}\nUser: {request.message}\nAI: {message['content']}")
        
        return {
            "response": message["content"],
            "type": "text"
        }
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# ============ OTHER ENDPOINTS ============

@app.post("/api/agent/workflow")
async def run_workflow(request: WorkflowRequest):
    workflow = AgenticWorkflow()
    
    def step_analyze(data):
        return f"📊 Analysis complete: {data.get('input_data', {}).get('task', 'unknown task')}"
    
    def step_decide(data):
        return "🎯 Decision made: Proceed with recommended action"
    
    def step_execute(data):
        return "✅ Execution complete"
    
    workflow.add_step("analyze", step_analyze)
    workflow.add_step("decide", step_decide)
    workflow.add_step("execute", step_execute)
    
    result = workflow.execute(request.input_data)
    return result

@app.post("/api/memory/store")
async def store_memory(request: MemoryRequest):
    return mcp_server.store(request.key, request.value)

@app.get("/api/memory/retrieve/{key}")
async def retrieve_memory(key: str):
    value = mcp_server.retrieve(key)
    if value is None:
        raise HTTPException(status_code=404, detail=f"Key '{key}' not found")
    return {"key": key, "value": value}

@app.get("/api/memory/list")
async def list_memory():
    return mcp_server.list_all()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)