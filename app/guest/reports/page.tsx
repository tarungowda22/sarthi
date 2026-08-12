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

export default function ReportsPage() {
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

  const batteryData = [
    { time: '00:00', level: 95 },
    { time: '04:00', level: 88 },
    { time: '08:00', level: 75 },
    { time: '12:00', level: 60 },
    { time: '16:00', level: 45 },
    { time: '20:00', level: 30 },
    { time: '24:00', level: 20 },
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
    {
      id: 4,
      name: 'Search Operation - Forest Area',
      date: '2026-08-07',
      duration: '4h 56m',
      status: 'failed',
      victim: 'Not Found',
      battery: '15%',
      distance: '2.3km'
    },
    {
      id: 5,
      name: 'Rescue Mission - Flood Zone',
      date: '2026-08-06',
      duration: '2h 18m',
      status: 'completed',
      victim: 'Rescued',
      battery: '55%',
      distance: '0.9km'
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

  const downloadReport = (reportId: number) => {
    console.log('Downloading report:', reportId);
    // Simulate download
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mission Reports</h1>
          <p className="text-gray-400">Historical mission data and performance analytics</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-black/30 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Missions</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">24</p>
          <p className="text-green-400 text-xs mt-1">+12% from last period</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Success Rate</span>
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">92%</p>
          <p className="text-green-400 text-xs mt-1">+3% from last period</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Distance</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">12.4km</p>
          <p className="text-gray-400 text-xs mt-1">This period</p>
        </div>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Avg Duration</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">2h 15m</p>
          <p className="text-gray-400 text-xs mt-1">Per mission</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Mission Success Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={missionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="success" fill="#3b82f6" name="Successful" />
              <Bar dataKey="failed" fill="#ef4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Battery Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={batteryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="level" stroke="#3b82f6" strokeWidth={2} name="Battery %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Mission History</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports..."
                className="pl-10 pr-4 py-2 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 text-sm"
              />
            </div>
            <button className="p-2 bg-black/30 border border-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Mission Name</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Date</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Duration</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Status</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Victim</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Battery</th>
                <th className="text-left text-gray-400 text-sm font-medium py-3 px-4">Distance</th>
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
                      <span className={`text-sm capitalize ${
                        report.status === 'completed' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{report.victim}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{report.battery}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{report.distance}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => downloadReport(report.id)}
                      className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors group"
                      title="Download Report"
                    >
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Export Options</h3>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
            <Download className="w-4 h-4" />
            Download CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors">
            <Download className="w-4 h-4" />
            Download JSON
          </button>
        </div>
      </div>
    </div>
  );
}