import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import AgentDashboard from './components/AgentDashboard';
import MonitoringPanel from './components/MonitoringPanel';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [agentStatus, setAgentStatus] = useState('idle');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Agentic AI Prototype</h1>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">RAG + MCP + OpenAI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
              agentStatus === 'running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${agentStatus === 'running' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
              {agentStatus === 'running' ? 'Running' : 'Idle'}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-2 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              💬 Chat Interface
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 Agent Dashboard
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`py-2 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'monitoring'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📈 Monitoring
            </button>
          </nav>
        </div>

        <main>
          {activeTab === 'chat' && <ChatInterface agentStatus={agentStatus} setAgentStatus={setAgentStatus} />}
          {activeTab === 'dashboard' && <AgentDashboard />}
          {activeTab === 'monitoring' && <MonitoringPanel />}
        </main>
      </div>
    </div>
  );
}

export default App;