'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Eye, 
  Flame, 
  User, 
  Dog, 
  AlertTriangle,
  Scan,
  Brain,
  Zap
} from 'lucide-react';

export default function AIDemoPage() {
  const [activeDetection, setActiveDetection] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const aiCapabilities = [
    {
      id: 'victim',
      name: 'Victim Detection',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      description: 'AI-powered human detection using computer vision',
      status: 'ready'
    },
    {
      id: 'fire',
      name: 'Fire Detection',
      icon: Flame,
      color: 'from-red-500 to-red-600',
      description: 'Real-time fire and smoke detection',
      status: 'ready'
    },
    {
      id: 'human',
      name: 'Human Detection',
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
      description: 'Advanced human pose estimation',
      status: 'ready'
    },
    {
      id: 'animal',
      name: 'Animal Detection',
      icon: Dog,
      color: 'from-green-500 to-green-600',
      description: 'Animal species identification',
      status: 'ready'
    },
    {
      id: 'crack',
      name: 'Crack Detection',
      icon: AlertTriangle,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Structural damage analysis',
      status: 'ready'
    },
    {
      id: 'voice',
      name: 'Voice Commands',
      icon: Scan,
      color: 'from-cyan-500 to-cyan-600',
      description: 'Natural language processing for control',
      status: 'ready'
    }
  ];

  const handleDetection = (id: string) => {
    setActiveDetection(id);
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">AI Module Demo</h1>
        <p className="text-gray-400">Artificial intelligence capabilities for autonomous rescue operations</p>
      </div>

      {/* AI Status */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="text-white font-semibold">AI System Status</h3>
              <p className="text-gray-400 text-sm">Neural networks loaded and ready</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">Online</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-400 text-xs mb-1">Model Version</p>
            <p className="text-white font-mono text-sm">v2.4.1</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Processing Speed</p>
            <p className="text-white font-mono text-sm">45 FPS</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Accuracy</p>
            <p className="text-white font-mono text-sm">94.2%</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Latency</p>
            <p className="text-white font-mono text-sm">12ms</p>
          </div>
        </div>
      </div>

      {/* AI Capabilities Grid */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Detection Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiCapabilities.map((capability) => (
            <motion.div
              key={capability.id}
              whileHover={{ scale: 1.02 }}
              className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${capability.color} flex items-center justify-center mb-4`}>
                <capability.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">{capability.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{capability.description}</p>
              <button
                onClick={() => handleDetection(capability.id)}
                disabled={isProcessing}
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  isProcessing && activeDetection === capability.id
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                }`}
              >
                {isProcessing && activeDetection === capability.id ? 'Processing...' : 'Test Detection'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detection Simulation */}
      {activeDetection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Detection Simulation</h3>
            <button
              onClick={() => setActiveDetection(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>

          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative w-24 h-24 mb-4">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full" />
                <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
                <Cpu className="absolute inset-0 m-auto w-8 h-8 text-blue-400" />
              </div>
              <p className="text-white font-medium">Processing...</p>
              <p className="text-gray-400 text-sm">Running neural network inference</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Detection Complete</p>
                    <p className="text-gray-400 text-sm">
                      {aiCapabilities.find(c => c.id === activeDetection)?.name} successful
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-black/30 rounded-lg">
                  <p className="text-gray-400 text-xs mb-1">Confidence</p>
                  <p className="text-white font-mono">94.2%</p>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <p className="text-gray-400 text-xs mb-1">Processing Time</p>
                  <p className="text-white font-mono">0.8s</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Technical Info */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Technical Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Neural Network Architecture</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• YOLOv8 for object detection</li>
              <li>• ResNet-50 for feature extraction</li>
              <li>• Custom trained on disaster scenarios</li>
              <li>• Real-time edge processing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Hardware Acceleration</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• ESP32-S3 neural network accelerator</li>
              <li>• Optimized for low-power deployment</li>
              <li>• On-device inference (no cloud)</li>
              <li>• 8-bit quantization for efficiency</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Future Capabilities */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Future Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'SLAM Navigation',
            'Path Planning',
            'Object Manipulation',
            'Thermal Analysis',
            'Gas Mapping',
            'Autonomous Decision Making'
          ].map((capability) => (
            <div key={capability} className="flex items-center gap-2 p-3 bg-black/30 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-gray-300 text-sm">{capability}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}