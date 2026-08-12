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

export default function AdminSensorsPage() {
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
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Sensor Dashboard</h1>
        <p className="text-gray-400">Real-time monitoring of SARTHI robot sensors</p>
      </div>

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
    </div>
  );
}