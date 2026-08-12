'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Camera, 
  Maximize, 
  Mic, 
  MicOff, 
  Sun, 
  Thermometer,
  Download,
  Radio,
  X
} from 'lucide-react';

export default function CameraPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isNightVision, setIsNightVision] = useState(false);
  const [isThermal, setIsThermal] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulated camera feed with noise overlay
  const CameraFeed = () => (
    <div className={`relative w-full h-full ${isNightVision ? 'bg-green-900/20' : isThermal ? 'bg-gradient-to-br from-blue-900/20 to-red-900/20' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
      {/* Simulated video feed */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">ESP32-CAM Feed</p>
          <p className="text-gray-600 text-xs mt-1">1920x1080 @ 30fps</p>
        </div>
      </div>

      {/* Scan lines effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
      }} />

      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-white/30 rounded-full" />
          <div className="absolute w-24 h-0.5 bg-white/30" />
          <div className="absolute h-24 w-0.5 bg-white/30" />
        </div>

        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400" />

        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-red-500/80 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-xs font-medium">REC</span>
          </div>
        )}

        {/* Camera info */}
        <div className="absolute bottom-4 left-4 text-white/70 text-xs font-mono">
          CAM-01 | FPV | {isNightVision ? 'NIGHT VISION' : isThermal ? 'THERMAL' : 'NORMAL'}
        </div>

        {/* Timestamp */}
        <div className="absolute bottom-4 right-4 text-white/70 text-xs font-mono">
          {new Date().toLocaleTimeString()}
        </div>

        {/* Battery indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="w-16 h-2 bg-black/50 rounded-full overflow-hidden">
            <div className="w-[87%] h-full bg-green-500" />
          </div>
          <span className="text-white/70 text-xs">87%</span>
        </div>
      </div>
    </div>
  );

  const handleCapture = () => {
    // Simulate image capture
    setCapturedImage('captured');
    setTimeout(() => setCapturedImage(null), 2000);
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Live Camera</h1>
          <p className="text-gray-400 text-sm">First-person view from SARTHI robot</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNightVision(!isNightVision)}
            className={`p-2 rounded-lg transition-colors ${
              isNightVision 
                ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                : 'bg-black/30 border border-gray-700 text-gray-400 hover:text-white'
            }`}
            title="Night Vision"
          >
            <Sun className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsThermal(!isThermal)}
            className={`p-2 rounded-lg transition-colors ${
              isThermal 
                ? 'bg-red-500/20 border border-red-500/30 text-red-400' 
                : 'bg-black/30 border border-gray-700 text-gray-400 hover:text-white'
            }`}
            title="Thermal Mode"
          >
            <Thermometer className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Camera View */}
      <div className="flex-1 relative">
        <div className="w-full h-full bg-black rounded-lg overflow-hidden border border-blue-500/20">
          <CameraFeed />
        </div>

        {/* Capture notification */}
        {capturedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500/90 text-white px-6 py-3 rounded-lg"
          >
            Image Captured!
          </motion.div>
        )}

        {/* Control Bar */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-500/30">
          <button
            onClick={handleCapture}
            className="p-3 bg-white rounded-full hover:bg-gray-200 transition-colors"
            title="Capture"
          >
            <Camera className="w-5 h-5 text-black" />
          </button>
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-3 rounded-full transition-colors ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-red-500/20 hover:bg-red-500/30 border border-red-500/30'
            }`}
            title="Record"
          >
            <Radio className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-red-400'}`} />
          </button>
          <button
            onClick={handleFullscreen}
            className="p-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-full transition-colors"
            title="Fullscreen"
          >
            <Maximize className="w-5 h-5 text-blue-400" />
          </button>
          <button
            className="p-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-full transition-colors"
            title="Download"
          >
            <Download className="w-5 h-5 text-purple-400" />
          </button>
        </div>
      </div>

      {/* Camera Info Panel */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">Resolution</h3>
          <p className="text-white font-mono">1920x1080</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">Frame Rate</h3>
          <p className="text-white font-mono">30 FPS</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">Bitrate</h3>
          <p className="text-white font-mono">8 Mbps</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">Latency</h3>
          <p className="text-white font-mono">12ms</p>
        </div>
      </div>
    </div>
  );
}