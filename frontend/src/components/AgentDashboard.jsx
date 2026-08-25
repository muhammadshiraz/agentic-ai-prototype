import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export default function AgentDashboard() {
  const [workflowInput, setWorkflowInput] = useState('{"task": "analyze data"}');
  const [workflowResult, setWorkflowResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [memoryKey, setMemoryKey] = useState('');
  const [memoryValue, setMemoryValue] = useState('');
  const [memoryResult, setMemoryResult] = useState(null);
  const [retrievedMemory, setRetrievedMemory] = useState(null);
  const [retrieveKey, setRetrieveKey] = useState('');

  const handleRunWorkflow = async () => {
    setIsLoading(true);
    try {
      const input = JSON.parse(workflowInput);
      const response = await axios.post(`${API_BASE}/agent/workflow`, { input_data: input });
      setWorkflowResult(response.data);
    } catch (error) {
      alert('❌ Invalid JSON input or server error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoreMemory = async () => {
    if (!memoryKey || !memoryValue) return alert('Please enter both key and value');
    try {
      const response = await axios.post(`${API_BASE}/memory/store`, { key: memoryKey, value: memoryValue });
      setMemoryResult(response.data);
    } catch (error) {
      alert('Error storing memory');
    }
  };

  const handleRetrieveMemory = async () => {
    if (!retrieveKey) return alert('Please enter a key');
    try {
      const response = await axios.get(`${API_BASE}/memory/retrieve/${retrieveKey}`);
      setRetrievedMemory(response.data);
    } catch (error) {
      setRetrievedMemory({ error: 'Key not found' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Agent Status</h3>
          <p className="text-2xl font-semibold text-green-600">● Online</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Memory Items</h3>
          <p className="text-2xl font-semibold text-gray-900">Active</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Tools Available</h3>
          <p className="text-2xl font-semibold text-gray-900">4</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🤖 Agentic Workflow</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Input (JSON)</label>
              <textarea
                value={workflowInput}
                onChange={(e) => setWorkflowInput(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              />
            </div>
            <button
              onClick={handleRunWorkflow}
              disabled={isLoading}
              className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 text-sm font-medium"
            >
              {isLoading ? '⏳ Running...' : '▶️ Run Workflow'}
            </button>
            {workflowResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">📊 Result</h4>
                <pre className="text-xs font-mono whitespace-pre-wrap break-words max-h-60 overflow-y-auto">
                  {JSON.stringify(workflowResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🧠 MCP Memory</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Memory</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={memoryKey}
                  onChange={(e) => setMemoryKey(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={memoryValue}
                  onChange={(e) => setMemoryValue(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleStoreMemory}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                >
                  Save
                </button>
              </div>
              {memoryResult && (
                <p className="text-xs text-green-600 mt-1">✅ {memoryResult.status}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Retrieve Memory</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={retrieveKey}
                  onChange={(e) => setRetrieveKey(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleRetrieveMemory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Retrieve
                </button>
              </div>
              {retrievedMemory && (
                <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <pre className="text-xs font-mono whitespace-pre-wrap break-words">
                    {JSON.stringify(retrievedMemory, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}