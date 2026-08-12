'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  Radio,
  Activity
} from 'lucide-react';

export default function MapPage() {
  const [robotPosition, setRobotPosition] = useState({ x: 50, y: 50 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Robot Map</h1>
        <p className="text-gray-400">Real-time GPS tracking and location monitoring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
          <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
            {/* Simulated Map */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Grid lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }} />
              
              {/* Robot marker */}
              <motion.div
                animate={{
                  x: [robotPosition.x - 5, robotPosition.x + 5, robotPosition.x - 5],
                  y: [robotPosition.y - 5, robotPosition.y + 5, robotPosition.y - 5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
                style={{ left: `${robotPosition.x}%`, top: `${robotPosition.y}%` }}
              />
              
              {/* Explored area */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute w-32 h-32 bg-blue-500 rounded-full blur-2xl" style={{ left: '40%', top: '40%' }} />
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors">
                <Navigation className="w-4 h-4" />
              </button>
              <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors">
                <Compass className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Current Location</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Latitude</span>
                <span className="text-white font-mono text-sm">12.9716° N</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Longitude</span>
                <span className="text-white font-mono text-sm">77.5946° E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Altitude</span>
                <span className="text-white font-mono text-sm">920m</span>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">GPS Status</h3>
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">Signal Strong</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400 text-sm">12 satellites</span>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Explored Area</h3>
            <p className="text-2xl font-bold text-white">1,245 m²</p>
            <p className="text-gray-400 text-sm">23% of zone</p>
          </div>
        </div>
      </div>
    </div>
  );
}