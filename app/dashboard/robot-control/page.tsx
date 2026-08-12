'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Play, 
  Pause, 
  Square, 
  Home, 
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Zap,
  Settings
} from 'lucide-react';

export default function RobotControlPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [mode, setMode] = useState<'manual' | 'autonomous'>('manual');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Robot Control</h1>
        <p className="text-gray-400">Manual and autonomous control of SARTHI robot</p>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status */}
          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Robot Status</h3>
              <div className={`flex items-center gap-2 ${isRunning ? 'text-green-400' : 'text-yellow-400'}`}>
                <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                <span className="text-sm font-medium">{isRunning ? 'Active' : 'Standby'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-400 text-xs mb-1">Mode</p>
                <p className="text-white font-medium capitalize">{mode}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Speed</p>
                <p className="text-white font-medium">{speed}%</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Battery</p>
                <p className="text-white font-medium">87%</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Signal</p>
                <p className="text-white font-medium">Strong</p>
              </div>
            </div>
          </div>

          {/* Direction Controls */}
          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Direction Controls</h3>
            <div className="max-w-[200px] mx-auto">
              <div className="grid grid-cols-3 gap-2">
                <div />
                <button className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white hover:bg-blue-500/30 transition-colors">
                  <ArrowUp className="w-6 h-6" />
                </button>
                <div />
                <button className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white hover:bg-blue-500/30 transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-white hover:bg-red-500/30 transition-colors">
                  <Square className="w-6 h-6" />
                </button>
                <button className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white hover:bg-blue-500/30 transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </button>
                <div />
                <button className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white hover:bg-blue-500/30 transition-colors">
                  <ArrowDown className="w-6 h-6" />
                </button>
                <div />
              </div>
            </div>
          </div>

          {/* Rotation Controls */}
          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Rotation Controls</h3>
            <div className="flex gap-4">
              <button className="flex-1 py-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-white hover:bg-purple-500/30 transition-colors">
                Rotate Left
              </button>
              <button className="flex-1 py-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-white hover:bg-purple-500/30 transition-colors">
                Rotate Right
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Operation Mode</h3>
            <div className="space-y-2">
              <button
                onClick={() => setMode('manual')}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  mode === 'manual'
                    ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                    : 'bg-black/30 border border-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                Manual Mode
              </button>
              <button
                onClick={() => setMode('autonomous')}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  mode === 'autonomous'
                    ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                    : 'bg-black/30 border border-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                Autonomous Mode
              </button>
            </div>
          </div>

          {/* Speed Control */}
          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Speed Control</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>0%</span>
                <span className="text-white font-medium">{speed}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  isRunning
                    ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
                    : 'bg-green-500/20 border border-green-500/30 text-green-400'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pause Robot' : 'Start Robot'}
              </button>
              <button className="w-full py-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Return Home
              </button>
              <button className="w-full py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2">
                <Square className="w-4 h-4" />
                Emergency Stop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <h3 className="text-yellow-400 font-semibold mb-1">Hardware Integration</h3>
            <p className="text-gray-300 text-sm">
              Current controls are in simulation mode. Connect ESP32 hardware for real robot control via WiFi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}