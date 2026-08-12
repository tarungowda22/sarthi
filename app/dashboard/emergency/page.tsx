'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Shield, 
  Activity,
  Zap,
  Square,
  Bell
} from 'lucide-react';

export default function EmergencyPage() {
  const [emergencyActive, setEmergencyActive] = useState(false);

  const emergencies = [
    {
      id: 1,
      type: 'Robot Malfunction',
      severity: 'high',
      location: 'Building A, Floor 2',
      time: '2 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'Communication Lost',
      severity: 'critical',
      location: 'Unknown',
      time: '5 minutes ago',
      status: 'active'
    },
    {
      id: 3,
      type: 'Battery Critical',
      severity: 'medium',
      location: 'Industrial Zone',
      time: '10 minutes ago',
      status: 'resolved'
    }
  ];

  const handleEmergencyStop = () => {
    setEmergencyActive(true);
    // Emergency stop logic
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'high':
        return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      default:
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Emergency Controls</h1>
        <p className="text-gray-400">Critical emergency response and robot safety controls</p>
      </div>

      {/* Emergency Stop Button */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full ${emergencyActive ? 'bg-red-500 animate-pulse' : 'bg-red-500/20'} flex items-center justify-center`}>
              <AlertTriangle className={`w-8 h-8 ${emergencyActive ? 'text-white' : 'text-red-400'}`} />
            </div>
            <div>
              <h3 className="text-red-400 font-semibold text-lg">Emergency Stop</h3>
              <p className="text-gray-400 text-sm">Immediately halt all robot operations</p>
            </div>
          </div>
          <button
            onClick={handleEmergencyStop}
            className="px-8 py-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition-colors flex items-center gap-2"
          >
            <Square className="w-5 h-5" />
            EMERGENCY STOP
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all text-left">
          <Phone className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="text-white font-semibold mb-1">Call Emergency Services</h3>
          <p className="text-gray-400 text-sm">Contact local emergency responders</p>
        </button>
        <button className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all text-left">
          <MapPin className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="text-white font-semibold mb-1">Send Location</h3>
          <p className="text-gray-400 text-sm">Broadcast robot GPS coordinates</p>
        </button>
        <button className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all text-left">
          <Shield className="w-8 h-8 text-green-400 mb-3" />
          <h3 className="text-white font-semibold mb-1">Safe Mode</h3>
          <p className="text-gray-400 text-sm">Return to safe location automatically</p>
        </button>
      </div>

      {/* Active Emergencies */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Active Emergencies</h2>
        <div className="space-y-4">
          {emergencies.filter(e => e.status === 'active').map((emergency) => (
            <motion.div
              key={emergency.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg border ${getSeverityColor(emergency.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{emergency.type}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      <MapPin className="w-3 h-3" />
                      {emergency.location}
                    </div>
                    <p className="text-sm mt-1">{emergency.time}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white/10 rounded text-sm hover:bg-white/20 transition-colors">
                    Acknowledge
                  </button>
                  <button className="px-3 py-1 bg-white/10 rounded text-sm hover:bg-white/20 transition-colors">
                    Resolve
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Emergency Protocols */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Emergency Protocols</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-red-400" />
              <h3 className="text-white font-medium">Robot Malfunction</h3>
            </div>
            <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
              <li>Activate emergency stop</li>
              <li>Assess robot status remotely</li>
              <li>Deploy backup robot if available</li>
              <li>Contact technical support</li>
            </ol>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="text-white font-medium">Power Failure</h3>
            </div>
            <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
              <li>Check battery levels</li>
              <li>Initiate return-to-home</li>
              <li>Activate low-power mode</li>
              <li>Estimate remaining operation time</li>
            </ol>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-orange-400" />
              <h3 className="text-white font-medium">Communication Lost</h3>
            </div>
            <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
              <li>Attempt reconnection</li>
              <li>Check last known location</li>
              <li>Deploy search protocol</li>
              <li>Notify emergency services</li>
            </ol>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-medium">Sensor Failure</h3>
            </div>
            <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
              <li>Identify failed sensor</li>
              <li>Switch to backup sensors</li>
              <li>Adjust operation parameters</li>
              <li>Continue with reduced capability</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/30 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Fire Department</p>
            <p className="text-white font-medium">101</p>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Ambulance</p>
            <p className="text-white font-medium">102</p>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Police</p>
            <p className="text-white font-medium">100</p>
          </div>
        </div>
      </div>
    </div>
  );
}