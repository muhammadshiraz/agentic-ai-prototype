import React, { useState, useEffect } from 'react';

export default function MonitoringPanel() {
  const [logs, setLogs] = useState([
    { time: '10:00:01', level: 'INFO', message: '🚀 Agentic AI initialized' },
    { time: '10:00:05', level: 'INFO', message: '🔍 RAG pipeline connected to vector DB' },
    { time: '10:00:10', level: 'INFO', message: '🧠 MCP server started on port 8001' },
    { time: '10:00:15', level: 'INFO', message: '⚡ OpenAI function calling registered' },
    { time: '10:00:20', level: 'INFO', message: '🤖 Agentic workflows loaded' }
  ]);

  const [metrics, setMetrics] = useState({
    requests: 0,
    avgResponseTime: '0ms',
    toolsCalled: 0,
    memoryHits: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        requests: Math.floor(Math.random() * 100),
        avgResponseTime: `${Math.floor(Math.random() * 200 + 50)}ms`,
        toolsCalled: Math.floor(Math.random() * 20),
        memoryHits: Math.floor(Math.random() * 50)
      });
      setLogs(prev => [
        ...prev,
        { 
          time: new Date().toTimeString().slice(0, 8), 
          level: ['INFO', 'DEBUG', 'INFO', 'DEBUG'][Math.floor(Math.random() * 4)], 
          message: `Agent processed ${Math.floor(Math.random() * 10)} tokens` 
        }
      ].slice(-20));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level) => {
    switch(level) {
      case 'INFO': return 'text-blue-600';
      case 'DEBUG': return 'text-gray-600';
      case 'WARN': return 'text-yellow-600';
      case 'ERROR': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
          <p className="text-2xl font-semibold text-gray-900">{metrics.requests}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Avg Response Time</h3>
          <p className="text-2xl font-semibold text-blue-600">{metrics.avgResponseTime}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Tools Called</h3>
          <p className="text-2xl font-semibold text-purple-600">{metrics.toolsCalled}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Memory Hits</h3>
          <p className="text-2xl font-semibold text-green-600">{metrics.memoryHits}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">📋 Agent Logs</h3>
        <div className="space-y-1 font-mono text-xs max-h-96 overflow-y-auto">
          {logs.map((log, idx) => (
            <div key={idx} className={`flex items-start gap-3 p-1.5 rounded ${
              idx % 2 === 0 ? 'bg-gray-50' : ''
            }`}>
              <span className="text-gray-500 whitespace-nowrap">{log.time}</span>
              <span className={`px-1.5 py-0.5 rounded font-bold ${getLevelColor(log.level)}`}>
                [{log.level}]
              </span>
              <span className="text-gray-800 break-all">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}