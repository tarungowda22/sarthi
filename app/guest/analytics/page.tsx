'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Activity,
  MapPin,
  Zap
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const performanceData = [
    { name: 'Mon', efficiency: 85, response: 92, battery: 78 },
    { name: 'Tue', efficiency: 88, response: 95, battery: 82 },
    { name: 'Wed', efficiency: 82, response: 88, battery: 75 },
    { name: 'Thu', efficiency: 90, response: 94, battery: 80 },
    { name: 'Fri', efficiency: 87, response: 91, battery: 77 },
    { name: 'Sat', efficiency: 84, response: 89, battery: 73 },
    { name: 'Sun', efficiency: 86, response: 93, battery: 79 },
  ];

  const missionTypeData = [
    { name: 'Earthquake', value: 35, color: '#3b82f6' },
    { name: 'Fire', value: 25, color: '#ef4444' },
    { name: 'Industrial', value: 20, color: '#f59e0b' },
    { name: 'Flood', value: 12, color: '#06b6d4' },
    { name: 'Search', value: 8, color: '#8b5cf6' },
  ];

  const locationData = [
    { name: 'Urban', missions: 12, success: 11 },
    { name: 'Industrial', missions: 8, success: 7 },
    { name: 'Rural', missions: 6, success: 5 },
    { name: 'Forest', missions: 4, success: 3 },
  ];

  const timeData = [
    { period: '00-04', missions: 2 },
    { period: '04-08', missions: 3 },
    { period: '08-12', missions: 8 },
    { period: '12-16', missions: 12 },
    { period: '16-20', missions: 10 },
    { period: '20-24', missions: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Performance metrics and operational insights</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-black/30 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Overall Efficiency</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">87.3%</p>
          <p className="text-green-400 text-xs mt-1">+5.2% from last period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Response Time</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">2.3m</p>
          <p className="text-green-400 text-xs mt-1">-18% faster</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Victims Rescued</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">24</p>
          <p className="text-green-400 text-xs mt-1">+8 this period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Battery Efficiency</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white">78%</p>
          <p className="text-green-400 text-xs mt-1">+3% improvement</p>
        </motion.div>
      </div>

      {/* Performance Chart */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="efficiency" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Efficiency %" />
            <Area type="monotone" dataKey="response" stackId="2" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Response %" />
            <Area type="monotone" dataKey="battery" stackId="3" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} name="Battery %" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Mission Types & Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Mission Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={missionTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {missionTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {missionTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-400 text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Mission Success by Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="missions" fill="#3b82f6" name="Total Missions" />
              <Bar dataKey="success" fill="#22c55e" name="Successful" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time Distribution */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Mission Distribution by Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="period" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="missions" stroke="#8b5cf6" strokeWidth={2} name="Missions" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <Activity className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-white font-medium mb-1">Peak Performance</p>
            <p className="text-gray-400 text-sm">Best performance between 12-16 PM with 92% success rate</p>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-white font-medium mb-1">Location Analysis</p>
            <p className="text-gray-400 text-sm">Urban areas show highest mission volume and success rates</p>
          </div>
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <BarChart3 className="w-5 h-5 text-purple-400 mb-2" />
            <p className="text-white font-medium mb-1">Mission Type</p>
            <p className="text-gray-400 text-sm">Earthquake rescue missions are most common at 35%</p>
          </div>
        </div>
      </div>
    </div>
  );
}