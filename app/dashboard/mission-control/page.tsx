'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Play, 
  Pause, 
  Square, 
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Users
} from 'lucide-react';

export default function MissionControlPage() {
  const [activeMission, setActiveMission] = useState<string | null>(null);
  const [missionStatus, setMissionStatus] = useState<'idle' | 'active' | 'paused' | 'completed'>('idle');

  const missions = [
    {
      id: 1,
      name: 'Earthquake Rescue - Building A',
      type: 'earthquake',
      location: 'Downtown Zone',
      difficulty: 'Hard',
      status: 'available',
      victims: 3,
      time: '2h 30m'
    },
    {
      id: 2,
      name: 'Fire Rescue - Industrial Zone',
      type: 'fire',
      location: 'Industrial Park',
      difficulty: 'Medium',
      status: 'available',
      victims: 2,
      time: '1h 45m'
    },
    {
      id: 3,
      name: 'Industrial Accident - Chemical Leak',
      type: 'industrial',
      location: 'Factory District',
      difficulty: 'Hard',
      status: 'available',
      victims: 1,
      time: '3h 00m'
    },
    {
      id: 4,
      name: 'Flood Rescue - Residential Area',
      type: 'flood',
      location: 'Riverside',
      difficulty: 'Medium',
      status: 'completed',
      victims: 5,
      time: '4h 15m'
    }
  ];

  const handleStartMission = (missionId: string) => {
    setActiveMission(missionId);
    setMissionStatus('active');
  };

  const handlePauseMission = () => {
    setMissionStatus('paused');
  };

  const handleResumeMission = () => {
    setMissionStatus('active');
  };

  const handleCompleteMission = () => {
    setMissionStatus('completed');
    setTimeout(() => {
      setActiveMission(null);
      setMissionStatus('idle');
    }, 2000);
  };

  const handleAbortMission = () => {
    setActiveMission(null);
    setMissionStatus('idle');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mission Control</h1>
        <p className="text-gray-400">Manage and coordinate rescue missions</p>
      </div>

      {/* Active Mission Panel */}
      {activeMission && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="text-white font-semibold">Active Mission</h3>
                <p className="text-gray-400 text-sm">{missions.find(m => m.id.toString() === activeMission)?.name}</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              missionStatus === 'active' ? 'bg-green-500/20 text-green-400' :
              missionStatus === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
              missionStatus === 'completed' ? 'bg-blue-500/20 text-blue-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                missionStatus === 'active' ? 'bg-green-500 animate-pulse' :
                missionStatus === 'paused' ? 'bg-yellow-500' :
                missionStatus === 'completed' ? 'bg-blue-500' :
                'bg-gray-500'
              }`} />
              <span className="text-sm font-medium capitalize">{missionStatus}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-gray-400 text-xs mb-1">Elapsed Time</p>
              <p className="text-white font-mono">00:45:23</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Victims Found</p>
              <p className="text-white font-mono">1/3</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Distance</p>
              <p className="text-white font-mono">0.8km</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Battery</p>
              <p className="text-white font-mono">72%</p>
            </div>
          </div>

          <div className="flex gap-2">
            {missionStatus === 'active' && (
              <>
                <button
                  onClick={handlePauseMission}
                  className="flex-1 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
                <button
                  onClick={handleCompleteMission}
                  className="flex-1 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Complete
                </button>
              </>
            )}
            {missionStatus === 'paused' && (
              <>
                <button
                  onClick={handleResumeMission}
                  className="flex-1 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Resume
                </button>
              </>
            )}
            <button
              onClick={handleAbortMission}
              className="flex-1 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <Square className="w-4 h-4" />
              Abort
            </button>
          </div>
        </motion.div>
      )}

      {/* Available Missions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Available Missions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missions.filter(m => m.status === 'available').map((mission) => (
            <motion.div
              key={mission.id}
              whileHover={{ scale: 1.02 }}
              className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold mb-1">{mission.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-3 h-3" />
                    {mission.location}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  mission.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' :
                  mission.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {mission.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-white font-medium">{mission.victims}</p>
                  <p className="text-gray-400 text-xs">Victims</p>
                </div>
                <div className="text-center">
                  <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <p className="text-white font-medium">{mission.time}</p>
                  <p className="text-gray-400 text-xs">Est. Time</p>
                </div>
                <div className="text-center">
                  <Target className="w-4 h-4 text-green-400 mx-auto mb-1" />
                  <p className="text-white font-medium capitalize">{mission.type}</p>
                  <p className="text-gray-400 text-xs">Type</p>
                </div>
              </div>

              <button
                onClick={() => handleStartMission(mission.id.toString())}
                disabled={activeMission !== null}
                className="w-full py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Mission
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission History */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Mission History</h2>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
          <div className="space-y-3">
            {missions.filter(m => m.status === 'completed').map((mission) => (
              <div
                key={mission.id}
                className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">{mission.name}</p>
                    <p className="text-gray-400 text-sm">{mission.location} • {mission.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm font-medium">Completed</p>
                  <p className="text-gray-400 text-xs">{mission.victims} victims rescued</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}