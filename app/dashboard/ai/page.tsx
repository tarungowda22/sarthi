'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Brain, 
  Eye, 
  Flame, 
  User, 
  Dog, 
  AlertTriangle,
  Scan,
  Zap,
  Settings
} from 'lucide-react';

export default function AdminAIPage() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [processingSpeed, setProcessingSpeed] = useState(45);

  const aiModels = [
    { name: 'YOLOv8', status: 'active', accuracy: 94.2, speed: 45 },
    { name: 'ResNet-50', status: 'active', accuracy: 91.8, speed: 38 },
    { name: 'Custom Victim Detection', status: 'active', accuracy: 89.5, speed: 42 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">AI Module Configuration</h1>
        <p className="text-gray-400">Configure and monitor AI detection systems</p>
      </div>

      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="text-white font-semibold">AI System Status</h3>
              <p className="text-gray-400 text-sm">Neural networks operational</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${aiEnabled ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className={`${aiEnabled ? 'text-green-400' : 'text-red-400'} text-sm`}>
              {aiEnabled ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Enable AI Processing</span>
          <button
            onClick={() => setAiEnabled(!aiEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              aiEnabled ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                aiEnabled ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Active AI Models</h2>
        <div className="space-y-4">
          {aiModels.map((model, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium">{model.name}</h3>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  {model.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Accuracy</p>
                  <p className="text-white font-mono">{model.accuracy}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Speed</p>
                  <p className="text-white font-mono">{model.speed} FPS</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Processing Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Target Processing Speed (FPS)</label>
            <input
              type="range"
              min="10"
              max="60"
              value={processingSpeed}
              onChange={(e) => setProcessingSpeed(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>10 FPS</span>
              <span className="text-white">{processingSpeed} FPS</span>
              <span>60 FPS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}