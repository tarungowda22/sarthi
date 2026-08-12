'use client';

import { motion } from 'framer-motion';
import { 
  Activity, 
  Zap, 
  Clock, 
  TrendingUp, 
  Video, 
  Gamepad2,
  Shield,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export default function GuestDashboard() {
  const stats = [
    {
      name: 'System Status',
      value: 'Online',
      change: 'Operational',
      icon: Activity,
      color: 'from-green-500 to-green-600',
      status: 'success'
    },
    {
      name: 'Battery Level',
      value: '87%',
      change: 'Stable',
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      status: 'normal'
    },
    {
      name: 'Mission Time',
      value: '00:00:00',
      change: 'Standby',
      icon: Clock,
      color: 'from-purple-500 to-purple-600',
      status: 'normal'
    },
    {
      name: 'Signal Strength',
      value: 'Strong',
      change: 'WiFi Connected',
      icon: TrendingUp,
      color: 'from-cyan-500 to-cyan-600',
      status: 'success'
    }
  ];

  const quickActions = [
    {
      name: 'Live Camera',
      description: 'View real-time camera feed',
      icon: Video,
      href: '/guest/camera',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Simulation Mode',
      description: 'Control virtual robot in 3D environment',
      icon: Gamepad2,
      href: '/guest/simulation',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Sensor Dashboard',
      description: 'Monitor real-time sensor data',
      icon: Activity,
      href: '/guest/sensors',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      name: 'Mission Reports',
      description: 'View historical mission data',
      icon: Shield,
      href: '/guest/reports',
      color: 'from-green-500 to-green-600'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      message: 'System operating in guest mode - limited functionality',
      time: 'Just now'
    },
    {
      type: 'info',
      message: 'Simulation mode available for testing',
      time: '5 minutes ago'
    },
    {
      type: 'success',
      message: 'All sensors calibrated and ready',
      time: '10 minutes ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Guest Dashboard</h1>
        <p className="text-gray-400">Welcome to SARTHI Rescue Command Center - Guest Access</p>
      </div>

      {/* Guest Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4"
      >
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-blue-400 font-semibold mb-1">Guest Mode Active</h3>
            <p className="text-gray-300 text-sm">
              You are in read-only mode. You can view camera feeds, run simulations, and access reports, 
              but cannot control the real robot or access admin functions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium ${
                stat.status === 'success' ? 'text-green-400' : 'text-blue-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={action.name} href={action.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 hover:scale-105 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{action.name}</h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">System Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  alert.type === 'warning' 
                    ? 'bg-yellow-500/10 border border-yellow-500/20' 
                    : alert.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-blue-500/10 border border-blue-500/20'
                }`}
              >
                {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />}
                {alert.type === 'success' && <Shield className="w-5 h-5 text-green-400 mt-0.5" />}
                {alert.type === 'info' && <Activity className="w-5 h-5 text-blue-400 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-white text-sm">{alert.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Available Missions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Available Simulations</h2>
          <div className="space-y-3">
            {[
              { name: 'Earthquake Rescue', difficulty: 'Hard', status: 'Available' },
              { name: 'Fire Rescue', difficulty: 'Medium', status: 'Available' },
              { name: 'Industrial Accident', difficulty: 'Hard', status: 'Available' },
            ].map((mission, index) => (
              <Link
                key={index}
                href="/guest/simulation"
                className="flex items-center justify-between p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors group"
              >
                <div>
                  <p className="text-white font-medium group-hover:text-blue-400 transition-colors">{mission.name}</p>
                  <p className="text-gray-400 text-xs">Difficulty: {mission.difficulty}</p>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  {mission.status}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Robot Model</p>
            <p className="text-white font-medium">SARTHI Mk-1</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Firmware Version</p>
            <p className="text-white font-medium">v2.4.1</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Last Calibration</p>
            <p className="text-white font-medium">2 hours ago</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Connection Type</p>
            <p className="text-white font-medium">WiFi 5GHz</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Latency</p>
            <p className="text-white font-medium">12ms</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Uptime</p>
            <p className="text-white font-medium">48h 23m</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}