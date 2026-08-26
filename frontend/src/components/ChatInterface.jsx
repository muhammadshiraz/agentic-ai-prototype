import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'https://agentic-ai-prototype-production-1c87.up.railway.app/api';

export default function ChatInterface({ agentStatus, setAgentStatus }) {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "🤖 Hello! I'm an **Agentic AI** with:\n\n✅ RAG (Retrieval-Augmented Generation)\n✅ MCP (Model Context Protocol) Memory\n✅ OpenAI Function/Tool Calling\n\nHow can I help you today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (message) => {
    try {
      const response = await axios.post(`${API_BASE}/chat`, { message });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setAgentStatus('running');

    try {
      const response = await sendMessage(input);
      let assistantMessage = {
        role: 'assistant',
        content: response.response || 'No response received.'
      };
      
      if (response.type === 'tool_call' && response.tool_called) {
        assistantMessage.toolCalled = response.tool_called;
        assistantMessage.toolResult = response.tool_result;
        assistantMessage.type = 'tool_call';
      }
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Error: Unable to process your request. Please check if the backend is running.'
      }]);
    } finally {
      setIsLoading(false);
      setAgentStatus('idle');
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-t-xl">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl rounded-lg px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-800 border border-gray-200'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              {msg.toolCalled && (
                <div className="mt-2 p-2 bg-purple-50 text-purple-800 rounded text-xs border border-purple-200">
                  <strong>🔧 Tool Called:</strong> {msg.toolCalled}
                </div>
              )}
              {msg.toolResult && (
                <div className="mt-1 p-2 bg-blue-50 text-blue-800 rounded text-xs border border-blue-200">
                  <strong>📊 Result:</strong> {JSON.stringify(msg.toolResult, null, 2)}
                </div>
              )}
              {msg.type === 'tool_call' && (
                <div className="mt-1">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">⚡ Tool Call</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-lg px-4 py-3 border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4 bg-white rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="💬 Ask the Agentic AI something..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-all"
          >
            Send
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded">🔍 RAG Enabled</span>
          <span className="bg-gray-100 px-2 py-1 rounded">🧠 MCP Active</span>
          <span className="bg-gray-100 px-2 py-1 rounded">⚡ Tool Calling</span>
          <span className="bg-gray-100 px-2 py-1 rounded">🤖 Agentic</span>
        </div>
      </div>
    </div>
  );
}