'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Gauge, 
  Zap, 
  Thermometer, 
  Droplets, 
  Wind, 
  Compass,
  Activity,
  Cpu,
  Radio,
  MapPin
} from 'lucide-react';

// Circular gauge component
function CircularGauge({ value, max, unit, icon: Icon, color }: { 
  value: number; 
  max: number; 
  unit: string; 
  icon: any; 
  color: string;
}) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-gray-400 text-sm">{unit}</span>
      </div>
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="#1a1a2e"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke={color.replace('text-', '#')}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{value.toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
}

// Linear gauge component
function LinearGauge({ label, value, max, unit, icon: Icon, color }: {
  label: string;
  value: number;
  max: number;
  unit: string;
  icon: any;
  color: string;
}) {
  const percentage = (value / max) * 100;

  return (
    <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-white font-medium">{label}</span>
        </div>
        <span className="text-gray-400 text-sm">{value.toFixed(1)} {unit}</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function SensorsPage() {
  const [sensors, setSensors] = useState({
    battery: 87,
    gas: 23,
    temperature: 28.5,
    humidity: 52,
    obstacleDistance: 145,
    speed: 2.3,
    compass: 45,
    gyroscope: { x: 0.5, y: -0.3, z: 0.1 },
    accelerometer: { x: 0.2, y: 9.8, z: 0.1 },
    signalStrength: 85
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => ({
        ...prev,
        battery: Math.max(0, prev.battery - 0.01),
        gas: Math.max(0, Math.min(100, prev.gas + (Math.random() - 0.5) * 5)),
        temperature: 25 + Math.random() * 10,
        humidity: 45 + Math.random() * 20,
        obstacleDistance: Math.max(0, 50 + Math.random() * 100),
        speed: Math.random() * 5,
        compass: (prev.compass + (Math.random() - 0.5) * 10 + 360) % 360,
        gyroscope: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 2
        },
        accelerometer: {
          x: (Math.random() - 0.5) * 2,
          y: 9.5 + Math.random(),
          z: (Math.random() - 0.5) * 2
        },
        signalStrength: 70 + Math.random() * 30
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Sensor Dashboard</h1>
        <p className="text-gray-400">Real-time monitoring of SARTHI robot sensors</p>
      </div>

      {/* Critical Sensors */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Critical Sensors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CircularGauge
            value={sensors.battery}
            max={100}
            unit="%"
            icon={Zap}
            color="text-yellow-400"
          />
          <CircularGauge
            value={sensors.gas}
            max={100}
            unit="ppm"
            icon={Wind}
            color="text-orange-400"
          />
          <CircularGauge
            value={sensors.temperature}
            max={50}
            unit="°C"
            icon={Thermometer}
            color="text-red-400"
          />
          <CircularGauge
            value={sensors.humidity}
            max={100}
            unit="%"
            icon={Droplets}
            color="text-blue-400"
          />
        </div>
      </div>

      {/* Navigation Sensors */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Navigation Sensors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LinearGauge
            label="Obstacle Distance"
            value={sensors.obstacleDistance}
            max={200}
            unit="cm"
            icon={Activity}
            color="text-purple-400"
          />
          <LinearGauge
            label="Robot Speed"
            value={sensors.speed}
            max={10}
            unit="m/s"
            icon={Gauge}
            color="text-green-400"
          />
          <LinearGauge
            label="Signal Strength"
            value={sensors.signalStrength}
            max={100}
            unit="%"
            icon={Radio}
            color="text-cyan-400"
          />
          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-400" />
                <span className="text-white font-medium">Compass</span>
              </div>
              <span className="text-gray-400 text-sm">{sensors.compass.toFixed(0)}°</span>
            </div>
            <div className="relative w-full h-12 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                style={{ left: `${(sensors.compass / 360) * 100}%` }}
              >
                <Compass className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IMU Sensors */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">IMU Sensors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Gyroscope</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">X-Axis</p>
                <p className="text-white font-mono">{sensors.gyroscope.x.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">Y-Axis</p>
                <p className="text-white font-mono">{sensors.gyroscope.y.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">Z-Axis</p>
                <p className="text-white font-mono">{sensors.gyroscope.z.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-semibold">Accelerometer</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">X-Axis</p>
                <p className="text-white font-mono">{sensors.accelerometer.x.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">Y-Axis</p>
                <p className="text-white font-mono">{sensors.accelerometer.y.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">Z-Axis</p>
                <p className="text-white font-mono">{sensors.accelerometer.z.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Status */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Sensor Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'MQ2 Gas', status: 'Online', color: 'green' },
            { name: 'HC-SR04', status: 'Online', color: 'green' },
            { name: 'DHT11', status: 'Online', color: 'green' },
            { name: 'MPU6050', status: 'Online', color: 'green' },
            { name: 'GPS Module', status: 'Searching', color: 'yellow' },
            { name: 'ESP32-CAM', status: 'Online', color: 'green' },
            { name: 'L298N Driver', status: 'Online', color: 'green' },
            { name: 'Servo Motors', status: 'Online', color: 'green' },
          ].map((sensor, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-black/30 rounded-lg"
            >
              <span className="text-gray-300 text-sm">{sensor.name}</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  sensor.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <span className={`text-xs ${
                  sensor.color === 'green' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {sensor.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last Update */}
      <div className="text-center text-gray-500 text-sm">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}