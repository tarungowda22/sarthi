'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Zap,
  LineChart,
  PieChart
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts';

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const performanceData = [
    { name: 'Mon', efficiency: 92, response: 95, success: 88 },
    { name: 'Tue', efficiency: 89, response: 93, success: 91 },
    { name: 'Wed', efficiency: 94, response: 96, success: 93 },
    { name: 'Thu', efficiency: 91, response: 94, success: 90 },
    { name: 'Fri', efficiency: 95, response: 97, success: 94 },
    { name: 'Sat', efficiency: 88, response: 92, success: 87 },
    { name: 'Sun', efficiency: 93, response: 95, success: 92 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Comprehensive performance metrics and operational insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Mission Success</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">94.2%</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Avg Response</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">1.8m</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Efficiency</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white">91.7%</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Missions</span>
            <BarChart3 className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">47</p>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }} itemStyle={{ color: '#fff' }} />
            <Area type="monotone" dataKey="efficiency" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Efficiency %" />
            <Area type="monotone" dataKey="response" stackId="2" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Response %" />
            <Area type="monotone" dataKey="success" stackId="3" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} name="Success %" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}