import os
import pinecone
import openai
from dotenv import load_dotenv

load_dotenv()

# ============ CONFIG ============
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENVIRONMENT = os.getenv("PINECONE_ENVIRONMENT")
PINECONE_INDEX = os.getenv("PINECONE_INDEX")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not PINECONE_API_KEY or not OPENAI_API_KEY:
    print("❌ ERROR: Please set PINECONE_API_KEY and OPENAI_API_KEY in .env")
    exit(1)

# ============ CONNECT TO PINECONE ============
print("🔗 Connecting to Pinecone...")
pc = pinecone.Pinecone(
    api_key=PINECONE_API_KEY,
    environment=PINECONE_ENVIRONMENT
)

# Check if index exists
indexes = pc.list_indexes()
index_names = [idx["name"] for idx in indexes]
print(f"📚 Available indexes: {index_names}")

if PINECONE_INDEX not in index_names:
    print(f"❌ Index '{PINECONE_INDEX}' not found. Please create it first.")
    exit(1)

index = pc.Index(PINECONE_INDEX)
print(f"✅ Connected to index: {PINECONE_INDEX}")

# ============ OPENAI EMBEDDING ============
client = openai.OpenAI(api_key=OPENAI_API_KEY)

def get_embedding(text: str) -> list:
    """Generate embedding using OpenAI's API."""
    response = client.embeddings.create(
        model="text-embedding-ada-002",
        input=text
    )
    return response.data[0].embedding

# ============ SAMPLE DOCUMENTS ============
documents = [
    {
        "id": "doc1",
        "text": "Agentic AI refers to autonomous AI systems that can make decisions and take actions to achieve goals without human intervention. These systems use large language models and reinforcement learning to adapt to changing environments."
    },
    {
        "id": "doc2",
        "text": "RAG (Retrieval-Augmented Generation) is a technique that combines information retrieval with large language models. It retrieves relevant documents from a knowledge base and uses them as context to generate more accurate and up-to-date responses."
    },
    {
        "id": "doc3",
        "text": "MCP (Model Context Protocol) is a framework for managing context and state in AI systems. It provides persistent memory, allowing AI agents to maintain information across conversations and make context-aware decisions."
    },
    {
        "id": "doc4",
        "text": "Urban resilience is the capacity of cities to withstand and recover from shocks and stresses such as natural disasters, climate change, and economic disruptions. AI-powered systems are increasingly used to model, forecast, and enhance urban resilience."
    },
    {
        "id": "doc5",
        "text": "Digital twins are virtual replicas of physical systems that can be used for simulation, monitoring, and optimization. In the context of urban infrastructure, digital twins help city planners test scenarios and make data-driven decisions."
    }
]

# ============ UPLOAD DOCUMENTS ============
print("📤 Uploading documents to Pinecone...")

for doc in documents:
    embedding = get_embedding(doc["text"])
    
    index.upsert(
        vectors=[
            {
                "id": doc["id"],
                "values": embedding,
                "metadata": {"text": doc["text"]}
            }
        ]
    )
    print(f"✅ Uploaded: {doc['id']}")

print(f"🎉 Successfully uploaded {len(documents)} documents to Pinecone!")
print(f"🔍 Your documents are now searchable via RAG.")