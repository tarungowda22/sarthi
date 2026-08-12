'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdminReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const missionData = [
    { date: 'Mon', missions: 3, success: 2, failed: 1 },
    { date: 'Tue', missions: 4, success: 4, failed: 0 },
    { date: 'Wed', missions: 2, success: 2, failed: 0 },
    { date: 'Thu', missions: 5, success: 4, failed: 1 },
    { date: 'Fri', missions: 3, success: 3, failed: 0 },
    { date: 'Sat', missions: 1, success: 1, failed: 0 },
    { date: 'Sun', missions: 2, success: 2, failed: 0 },
  ];

  const reports = [
    {
      id: 1,
      name: 'Earthquake Rescue - Building A',
      date: '2026-08-10',
      duration: '2h 34m',
      status: 'completed',
      victim: 'Rescued',
      battery: '45%',
      distance: '1.2km'
    },
    {
      id: 2,
      name: 'Fire Rescue - Industrial Zone',
      date: '2026-08-09',
      duration: '1h 45m',
      status: 'completed',
      victim: 'Rescued',
      battery: '62%',
      distance: '0.8km'
    },
    {
      id: 3,
      name: 'Industrial Accident - Chemical Leak',
      date: '2026-08-08',
      duration: '3h 12m',
      status: 'completed',
      victim: 'Rescued',
      battery: '38%',
      distance: '1.5km'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mission Reports</h1>
          <p className="text-gray-400">Historical mission data and performance analytics</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 bg-black/30 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Missions</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">24</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Success Rate</span>
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">92%</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Distance</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">12.4km</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Avg Duration</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">2h 15m</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Mission Success Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={missionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }} itemStyle={{ color: '#fff' }} />
              <Bar dataKey="success" fill="#3b82f6" name="Successful" />
              <Bar dataKey="failed" fill="#ef4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Mission History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Mission Name</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Date</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Duration</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Status</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Victim</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-800 hover:bg-black/20 transition-colors">
                  <td className="py-3 px-4">
                    <p className="text-white font-medium">{report.name}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{report.date}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{report.duration}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(report.status)}
                      <span className={`text-sm capitalize ${report.status === 'completed' ? 'text-green-400' : 'text-red-400'}`}>
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{report.victim}</td>
                  <td className="py-3 px-4">
                    <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}