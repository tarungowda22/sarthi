'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Camera, 
  Maximize, 
  Radio,
  Download,
  Sun,
  Thermometer
} from 'lucide-react';

export default function AdminCameraPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isNightVision, setIsNightVision] = useState(false);
  const [isThermal, setIsThermal] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Live Camera Feed</h1>
        <p className="text-gray-400">Real-time FPV camera from SARTHI robot</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="aspect-video bg-black rounded-lg overflow-hidden border border-blue-500/20 relative">
            {/* Camera Feed Placeholder */}
            <div className={`absolute inset-0 flex items-center justify-center ${isNightVision ? 'bg-green-900/20' : isThermal ? 'bg-gradient-to-br from-blue-900/20 to-red-900/20' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
              <div className="text-center">
                <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">ESP32-CAM Feed</p>
                <p className="text-gray-600 text-xs mt-1">1920x1080 @ 30fps</p>
              </div>
            </div>

            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {isRecording && (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-white text-xs font-mono">REC</span>
                  </>
                )}
              </div>
              <div className="absolute bottom-4 left-4 text-white/70 text-xs font-mono">
                CAM-01 | FPV | {isNightVision ? 'NIGHT VISION' : isThermal ? 'THERMAL' : 'NORMAL'}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Camera Controls</h3>
            <div className="space-y-2">
              <button
                onClick={() => setIsNightVision(!isNightVision)}
                className={`w-full p-2 rounded-lg transition-colors flex items-center gap-2 ${
                  isNightVision 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                    : 'bg-black/30 border border-gray-700 text-gray-400'
                }`}
              >
                <Sun className="w-4 h-4" />
                Night Vision
              </button>
              <button
                onClick={() => setIsThermal(!isThermal)}
                className={`w-full p-2 rounded-lg transition-colors flex items-center gap-2 ${
                  isThermal 
                    ? 'bg-red-500/20 border border-red-500/30 text-red-400' 
                    : 'bg-black/30 border border-gray-700 text-gray-400'
                }`}
              >
                <Thermometer className="w-4 h-4" />
                Thermal Mode
              </button>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Recording</h3>
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`w-full p-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                isRecording ? 'bg-red-500 text-white' : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              <Radio className="w-4 h-4" />
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>

          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" />
                Capture
              </button>
              <button className="w-full p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}