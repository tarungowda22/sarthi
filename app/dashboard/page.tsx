'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import { 
  Brain, 
  Activity, 
  Zap, 
  Thermometer, 
  Droplets, 
  Wind, 
  Navigation,
  Camera,
  MapPin,
  Shield,
  AlertTriangle,
  Settings,
  LogOut,
  Bell,
  MessageSquare,
  Battery,
  Cpu,
  Compass,
  Eye,
  Flame,
  Wifi,
  Bluetooth,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Home,
  Square,
  Play,
  Radio,
  Target,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Sarthi3DModel from '@/components/Sarthi3DModel';
import LeafletMap from '@/components/LeafletMap';

export default function DashboardPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('');

  // Connection state
  const [connectionType, setConnectionType] = useState<'wifi' | 'bluetooth'>('wifi');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [wifiIP, setWifiIP] = useState('');
  const [wifiPort, setWifiPort] = useState('');
  const [bluetoothDevice, setBluetoothDevice] = useState<any>(null);
  const [bluetoothError, setBluetoothError] = useState('');

  // Telemetry state
  const [telemetry, setTelemetry] = useState({
    battery: '--',
    voltage: '--',
    current: '--',
    temperature: '--',
    humidity: '--',
    gas: '--',
    smoke: '--',
    gps: { lat: null, lng: null },
    speed: '--',
    motorRPM: '--',
    motorTemp: '--',
    lidar: '--',
    camera: '--',
    signal: '--',
    cpu: '--',
    missionStatus: 'STANDBY'
  });

  // GPS state
  const [gpsStatus, setGpsStatus] = useState<'disconnected' | 'no_gps' | 'connected'>('disconnected');

  // Demo mode state
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [missionTime, setMissionTime] = useState(0);
  const [demoTelemetry, setDemoTelemetry] = useState<any>(null);
  const [demoAiDetection, setDemoAiDetection] = useState<any>(null);
  const [showMissionReport, setShowMissionReport] = useState(false);
  const [missionReportData, setMissionReportData] = useState<any>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWifiConnect = async () => {
    if (!wifiIP || !wifiPort) return;
    setConnectionStatus('connecting');
    // TODO: Implement actual WebSocket connection
    setTimeout(() => {
      setConnectionStatus('connected');
      setGpsStatus('connected');
    }, 2000);
  };

  const handleBluetoothConnect = async () => {
    if (!(navigator as any).bluetooth) {
      setBluetoothError('Bluetooth is not supported by this browser.');
      return;
    }
    try {
      setConnectionStatus('connecting');
      const device = await (navigator as any).bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service', 'generic_access']
      });
      setBluetoothDevice(device);
      setConnectionStatus('connected');
      setGpsStatus('connected');
    } catch (error) {
      setBluetoothError('Failed to connect to Bluetooth device.');
      setConnectionStatus('error');
    }
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
    setGpsStatus('disconnected');
    setBluetoothDevice(null);
    setBluetoothError('');
    setTelemetry({
      battery: '--',
      voltage: '--',
      current: '--',
      temperature: '--',
      humidity: '--',
      gas: '--',
      smoke: '--',
      gps: { lat: null, lng: null },
      speed: '--',
      motorRPM: '--',
      motorTemp: '--',
      lidar: '--',
      camera: '--',
      signal: '--',
      cpu: '--',
      missionStatus: 'STANDBY'
    });
  };

  // Demo telemetry timeline (60-second mission)
  const getDemoTelemetry = (time: number) => {
    // Mission phases: 0-10s (approach), 10-20s (enter), 20-30s (scan), 30-40s (detect), 40-50s (analyze), 50-60s (complete)
    if (time < 10) {
      return {
        battery: '87%',
        voltage: '11.8 V',
        current: '1.4 A',
        temperature: '32°C',
        humidity: '61%',
        gas: '80 ppm',
        smoke: '10%',
        speed: '0.8 m/s',
        motorRPM: '420 RPM',
        motorTemp: '38°C',
        lidar: 'ACTIVE',
        camera: 'ACTIVE',
        signal: 'STRONG',
        cpu: '42%',
        missionStatus: 'APPROACHING'
      };
    } else if (time < 20) {
      return {
        battery: '86%',
        voltage: '11.7 V',
        current: '1.5 A',
        temperature: '34°C',
        humidity: '63%',
        gas: '120 ppm',
        smoke: '25%',
        speed: '0.6 m/s',
        motorRPM: '380 RPM',
        motorTemp: '40°C',
        lidar: 'ACTIVE',
        camera: 'ACTIVE',
        signal: 'STRONG',
        cpu: '45%',
        missionStatus: 'ENTERING'
      };
    } else if (time < 30) {
      return {
        battery: '85%',
        voltage: '11.6 V',
        current: '1.6 A',
        temperature: '36°C',
        humidity: '65%',
        gas: '180 ppm',
        smoke: '45%',
        speed: '0.4 m/s',
        motorRPM: '350 RPM',
        motorTemp: '42°C',
        lidar: 'ACTIVE',
        camera: 'ACTIVE',
        signal: 'STRONG',
        cpu: '48%',
        missionStatus: 'SCANNING'
      };
    } else if (time < 40) {
      return {
        battery: '84%',
        voltage: '11.5 V',
        current: '1.7 A',
        temperature: '38°C',
        humidity: '67%',
        gas: '250 ppm',
        smoke: '58%',
        speed: '0.3 m/s',
        motorRPM: '320 RPM',
        motorTemp: '44°C',
        lidar: 'ACTIVE',
        camera: 'ACTIVE',
        signal: 'STRONG',
        cpu: '52%',
        missionStatus: 'DETECTING'
      };
    } else if (time < 50) {
      return {
        battery: '82%',
        voltage: '11.4 V',
        current: '1.8 A',
        temperature: '40°C',
        humidity: '69%',
        gas: '320 ppm',
        smoke: '72%',
        speed: '0.2 m/s',
        motorRPM: '300 RPM',
        motorTemp: '46°C',
        lidar: 'ACTIVE',
        camera: 'ACTIVE',
        signal: 'STRONG',
        cpu: '55%',
        missionStatus: 'ANALYZING'
      };
    } else {
      return {
        battery: '80%',
        voltage: '11.3 V',
        current: '1.9 A',
        temperature: '42°C',
        humidity: '71%',
        gas: '350 ppm',
        smoke: '78%',
        speed: '0.1 m/s',
        motorRPM: '280 RPM',
        motorTemp: '48°C',
        lidar: 'ACTIVE',
        camera: 'ACTIVE',
        signal: 'STRONG',
        cpu: '58%',
        missionStatus: 'COMPLETE'
      };
    }
  };

  // Demo AI detection timeline (60-second mission)
  const getDemoAiDetection = (time: number) => {
    if (time < 30) {
      return {
        objectDetection: 'ACTIVE',
        victimDetection: '0 DETECTED',
        eyeStatus: '--',
        temperature: '--',
        gasDetection: '80 ppm',
        hazardLevel: 'LOW'
      };
    } else if (time < 40) {
      return {
        objectDetection: 'ACTIVE',
        victimDetection: '1 DETECTED',
        eyeStatus: '1 OPEN',
        temperature: '37.2°C',
        gasDetection: '250 ppm',
        hazardLevel: 'MEDIUM'
      };
    } else if (time < 50) {
      return {
        objectDetection: 'ACTIVE',
        victimDetection: '2 DETECTED',
        eyeStatus: '2 OPEN',
        temperature: '37.4°C',
        gasDetection: '320 ppm',
        hazardLevel: 'HIGH'
      };
    } else {
      return {
        objectDetection: 'ACTIVE',
        victimDetection: '3 DETECTED',
        eyeStatus: '2 OPEN, 1 CLOSED',
        temperature: '37.6°C',
        gasDetection: '350 ppm',
        hazardLevel: 'CRITICAL'
      };
    }
  };

  const handleStartMissionPreview = () => {
    setIsDemoMode(true);
    setMissionTime(0);
    setConnectionStatus('connected');
    setGpsStatus('connected');
    setVideoError(false);
    
    // Initialize mission data
    const missionId = `mission-${Date.now()}`;
    const missionData = {
      missionId,
      startTime: new Date().toISOString(),
      endTime: null,
      missionStatus: 'IN_PROGRESS',
      robotConnection: 'DEMO',
      battery: [],
      voltage: [],
      temperature: [],
      humidity: [],
      gas: [],
      smoke: [],
      speed: [],
      motorRPM: [],
      gpsStatus: 'DEMO',
      victimCount: 0,
      eyesOpen: 0,
      eyesClosed: 0,
      hazardLevel: 'LOW',
      aiDetections: [],
      alerts: []
    };
    
    localStorage.setItem('sarthiCurrentMission', JSON.stringify(missionData));
  };

  const handleExitPreview = () => {
    // Save final mission data
    const currentMission = localStorage.getItem('sarthiCurrentMission');
    if (currentMission) {
      const missionData = JSON.parse(currentMission);
      missionData.endTime = new Date().toISOString();
      missionData.missionStatus = 'COMPLETED';
      
      // Save to history
      const history = JSON.parse(localStorage.getItem('sarthiMissionHistory') || '[]');
      history.push(missionData);
      localStorage.setItem('sarthiMissionHistory', JSON.stringify(history));
      
      setMissionReportData(missionData);
    }
    
    localStorage.removeItem('sarthiCurrentMission');
    
    setIsDemoMode(false);
    setMissionTime(0);
    setConnectionStatus('disconnected');
    setGpsStatus('disconnected');
    setDemoTelemetry(null);
    setDemoAiDetection(null);
    handleDisconnect();
  };

  const handleGenerateMissionReport = () => {
    const history = JSON.parse(localStorage.getItem('sarthiMissionHistory') || '[]');
    if (history.length > 0) {
      setMissionReportData(history[history.length - 1]);
      setShowMissionReport(true);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  // Demo mode timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDemoMode) {
      interval = setInterval(() => {
        setMissionTime(prev => {
          const newTime = prev + 1;
          const telemetry = getDemoTelemetry(newTime);
          const aiDetection = getDemoAiDetection(newTime);
          setDemoTelemetry(telemetry);
          setDemoAiDetection(aiDetection);
          
          // Store telemetry in localStorage
          const currentMission = localStorage.getItem('sarthiCurrentMission');
          if (currentMission) {
            const missionData = JSON.parse(currentMission);
            missionData.battery.push(telemetry.battery);
            missionData.voltage.push(telemetry.voltage);
            missionData.temperature.push(telemetry.temperature);
            missionData.humidity.push(telemetry.humidity);
            missionData.gas.push(telemetry.gas);
            missionData.smoke.push(telemetry.smoke);
            missionData.speed.push(telemetry.speed);
            missionData.motorRPM.push(telemetry.motorRPM);
            missionData.hazardLevel = aiDetection.hazardLevel;
            
            // Update victim count based on detection
            const victimMatch = aiDetection.victimDetection.match(/(\d+) DETECTED/);
            if (victimMatch) {
              missionData.victimCount = parseInt(victimMatch[1]);
              const eyesOpenMatch = aiDetection.eyeStatus.match(/(\d+) OPEN/);
              const eyesClosedMatch = aiDetection.eyeStatus.match(/(\d+) CLOSED/);
              missionData.eyesOpen = eyesOpenMatch ? parseInt(eyesOpenMatch[1]) : 0;
              missionData.eyesClosed = eyesClosedMatch ? parseInt(eyesClosedMatch[1]) : 0;
            }
            
            localStorage.setItem('sarthiCurrentMission', JSON.stringify(missionData));
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isDemoMode]);

  const handleLogout = () => {
    localStorage.removeItem('sarthi-auth');
    localStorage.removeItem('sarthi-user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-blue-500/20 bg-black/30 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-30" />
              <Brain className="w-8 h-8 text-blue-400 relative z-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SARTHI COMMAND CENTER</h1>
              <p className="text-xs text-blue-400">Smart Autonomous Response Tactical Humanitarian Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isDemoMode && (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-lg border border-yellow-500/30">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-yellow-400 text-sm font-medium">DEMO MODE</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-lg border border-blue-500/30">
              <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`} />
              <span className="text-white text-sm font-medium">{isDemoMode ? 'DEMO CONNECTION' : connectionStatus.toUpperCase()}</span>
            </div>
            <button className="p-2 bg-black/40 backdrop-blur-sm rounded-lg border border-blue-500/30 text-white hover:bg-blue-500/20 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 bg-black/40 backdrop-blur-sm rounded-lg border border-blue-500/30 text-white hover:bg-blue-500/20 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button onClick={handleLogout} className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 grid grid-cols-12 gap-4 h-[calc(100vh-60px)]">
        
        {/* LEFT COLUMN - Connection, Telemetry, Controls */}
        <div className="col-span-3 space-y-4 overflow-y-auto">
          
          {/* Connection Panel */}
          <div className={`bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4 ${isDemoMode ? 'opacity-50 pointer-events-none' : ''}`}>
            <h3 className="text-blue-400 text-sm font-semibold mb-3 flex items-center gap-2">
              <Radio className="w-4 h-4" />
              ROBOT CONNECTION
            </h3>
            
            {/* Connection Type Selector */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setConnectionType('wifi')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${connectionType === 'wifi' ? 'bg-blue-500/30 border border-blue-500/50 text-blue-400' : 'bg-black/30 border border-blue-500/20 text-gray-400'}`}
              >
                <Wifi className="w-4 h-4 mx-auto mb-1" />
                Wi-Fi
              </button>
              <button
                onClick={() => setConnectionType('bluetooth')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${connectionType === 'bluetooth' ? 'bg-blue-500/30 border border-blue-500/50 text-blue-400' : 'bg-black/30 border border-blue-500/20 text-gray-400'}`}
              >
                <Bluetooth className="w-4 h-4 mx-auto mb-1" />
                Bluetooth
              </button>
            </div>

            {connectionType === 'wifi' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Robot IP Address</label>
                  <input
                    type="text"
                    placeholder="192.168.4.1"
                    value={wifiIP}
                    onChange={(e) => setWifiIP(e.target.value)}
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Port</label>
                  <input
                    type="text"
                    placeholder="8080"
                    value={wifiPort}
                    onChange={(e) => setWifiPort(e.target.value)}
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                {connectionStatus === 'disconnected' ? (
                  <button
                    onClick={handleWifiConnect}
                    className="w-full py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors text-sm font-medium"
                  >
                    Connect
                  </button>
                ) : (
                  <button
                    onClick={handleDisconnect}
                    className="w-full py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {bluetoothError && (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-xs">
                    {bluetoothError}
                  </div>
                )}
                {connectionStatus === 'disconnected' ? (
                  <button
                    onClick={handleBluetoothConnect}
                    className="w-full py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors text-sm font-medium"
                  >
                    Scan for Robot
                  </button>
                ) : (
                  <button
                    onClick={handleDisconnect}
                    className="w-full py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium"
                  >
                    Disconnect
                  </button>
                )}
                {bluetoothDevice && (
                  <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-2 rounded-lg text-xs">
                    Connected: {bluetoothDevice.name || 'Unknown Device'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Telemetry Panel */}
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 text-sm font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              TELEMETRY
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Battery</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.battery : telemetry.battery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Voltage</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.voltage : telemetry.voltage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.current : telemetry.current}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Temperature</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.temperature : telemetry.temperature}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Humidity</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.humidity : telemetry.humidity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Gas</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.gas : telemetry.gas}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Smoke</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.smoke : telemetry.smoke}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Speed</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.speed : telemetry.speed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Motor RPM</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.motorRPM : telemetry.motorRPM}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Motor Temp</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.motorTemp : telemetry.motorTemp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">LiDAR</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.lidar : telemetry.lidar}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Camera</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.camera : telemetry.camera}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signal</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.signal : telemetry.signal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">CPU</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.cpu : telemetry.cpu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Mission</span>
                <span className="text-white font-mono">{isDemoMode && demoTelemetry ? demoTelemetry.missionStatus : telemetry.missionStatus}</span>
              </div>
            </div>
          </div>

          {/* Robot Controls */}
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 text-sm font-semibold mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              CONTROLS
            </h3>
            {connectionStatus === 'disconnected' ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                Connect SARTHI to enable controls
              </div>
            ) : (
              <div className="space-y-3">
                {/* Joystick */}
                <div className="grid grid-cols-3 gap-2 max-w-[150px] mx-auto">
                  <div />
                  <button className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white hover:bg-blue-500/30 transition-colors">
                    <ArrowUp className="w-4 h-4 mx-auto" />
                  </button>
                  <div />
                  <button className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white hover:bg-blue-500/30 transition-colors">
                    <ArrowLeft className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white hover:bg-blue-500/30 transition-colors">
                    <ArrowDown className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white hover:bg-blue-500/30 transition-colors">
                    <ArrowRight className="w-4 h-4 mx-auto" />
                  </button>
                </div>
                
                {/* Rotation */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white text-xs hover:bg-blue-500/30 transition-colors">
                    <RotateCcw className="w-4 h-4 mx-auto" />
                    Rotate Left
                  </button>
                  <button className="flex-1 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-white text-xs hover:bg-blue-500/30 transition-colors">
                    <RotateCcw className="w-4 h-4 mx-auto rotate-180" />
                    Rotate Right
                  </button>
                </div>

                {/* Speed Control */}
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Speed</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full"
                  />
                </div>

                {/* Emergency Controls */}
                <div className="space-y-2">
                  <button className="w-full py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <Square className="w-4 h-4" />
                    Emergency Stop
                  </button>
                  <button className="w-full py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <Home className="w-4 h-4" />
                    Return Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CENTER COLUMN - 3D Robot, Status, GPS */}
        <div className="col-span-6 space-y-4">
          
          {/* 3D Robot View */}
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4 h-[400px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-blue-400 text-sm font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4" />
                SARTHI 3D VIEW
              </h3>
              <div className={`px-2 py-1 rounded text-xs font-medium ${connectionStatus === 'connected' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {connectionStatus.toUpperCase()}
              </div>
            </div>
            <div className="h-[340px]">
              <Canvas>
                <PerspectiveCamera makeDefault position={[5, 4, 5]} />
                <OrbitControls enableDamping dampingFactor={0.05} />
                <Environment preset="night" />
                <Stars radius={50} depth={25} count={1000} factor={2} saturation={0} fade speed={1} />
                <Sarthi3DModel 
                  position={[0, 0, 0]} 
                  rotation={[0, 0, 0]} 
                  scale={2.0}
                  autoRotate={true}
                  rotationSpeed={0.3}
                />
              </Canvas>
            </div>
          </div>

          {/* GPS / Location */}
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-blue-400 text-sm font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                GPS / LOCATION
              </h3>
              <div className={`px-2 py-1 rounded text-xs font-medium ${gpsStatus === 'connected' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {isDemoMode ? 'DEMO LOCATION' : gpsStatus === 'connected' ? 'CONNECTED' : gpsStatus === 'no_gps' ? 'NO GPS' : 'DISCONNECTED'}
              </div>
            </div>
            {isDemoMode ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Latitude</span>
                  <span className="text-white font-mono">12.9073° N</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Longitude</span>
                  <span className="text-white font-mono">77.5650° E</span>
                </div>
                <LeafletMap 
                  center={[12.9073, 77.5650]} 
                  zoom={15}
                  connected={true}
                />
              </div>
            ) : gpsStatus === 'connected' && telemetry.gps.lat && telemetry.gps.lng ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Latitude</span>
                  <span className="text-white font-mono">{(telemetry.gps.lat as number).toFixed(6)}°</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Longitude</span>
                  <span className="text-white font-mono">{(telemetry.gps.lng as number).toFixed(6)}°</span>
                </div>
                <LeafletMap 
                  center={[telemetry.gps.lat as number, telemetry.gps.lng as number]} 
                  zoom={15}
                  connected={true}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Latitude</span>
                  <span className="text-white font-mono">12.9073° N</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Longitude</span>
                  <span className="text-white font-mono">77.5650° E</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white font-mono text-xs">KSIT Campus, Bengaluru</span>
                </div>
                <LeafletMap 
                  center={[12.9073, 77.5650]} 
                  zoom={15}
                  connected={false}
                />
              </div>
            )}
          </div>

          {/* Mission Status */}
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 text-sm font-semibold mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              MISSION STATUS
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                <span className="text-gray-400 text-sm">Current Status</span>
                <span className="text-white text-sm font-medium">{telemetry.missionStatus}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                <span className="text-gray-400 text-sm">Mission Time</span>
                <span className="text-white text-sm font-mono">{currentTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Preview, AI, Alerts */}
        <div className="col-span-3 space-y-4 overflow-y-auto">
          
          {/* Preview Section */}
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-blue-400 text-sm font-semibold flex items-center gap-2">
                <Play className="w-4 h-4" />
                PREVIEW
              </h3>
              {isDemoMode ? (
                <button
                  onClick={handleExitPreview}
                  className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors"
                >
                  EXIT PREVIEW
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-400 text-xs font-medium">LIVE</span>
                </div>
              )}
            </div>
            <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden">
              {isDemoMode ? (
                videoError ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">MISSION VIDEO NOT INSTALLED</p>
                      <p className="text-gray-600 text-xs mt-1">Place video at: public/videos/sarthi-mission-demo.mp4</p>
                    </div>
                  </div>
                ) : (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    onError={handleVideoError}
                    src="/videos/sarthi-mission-demo.mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">MISSION DEMONSTRATION</p>
                    <p className="text-gray-600 text-xs mt-1">AI-Generated Rescue Video</p>
                    <button
                      onClick={handleStartMissionPreview}
                      className="mt-3 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors text-sm font-medium flex items-center gap-2 mx-auto"
                    >
                      <Play className="w-4 h-4" />
                      START MISSION PREVIEW
                    </button>
                  </div>
                </div>
              )}
              {isDemoMode && (
                <>
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="text-white text-xs font-mono">CAM-01 | SARTHI</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-red-500/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-white text-xs font-medium">REC</span>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="text-white text-xs font-mono">MISSION PREVIEW</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="text-gray-400 text-xs font-mono">
                      MISSION TIME: {String(Math.floor(missionTime / 60)).padStart(2, '0')}:{String(missionTime % 60).padStart(2, '0')}
                    </span>
                  </div>
                </>
              )}
              {!isDemoMode && (
                <>
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="text-white text-xs font-mono">CAM-01 | FPV</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="text-gray-400 text-xs font-mono">{currentTime}</span>
                  </div>
                </>
              )}
            </div>
            {!isDemoMode && (
              <button
                onClick={handleGenerateMissionReport}
                className="mt-3 w-full py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors text-sm font-medium"
              >
                GENERATE MISSION REPORT
              </button>
            )}
          </div>

          {/* AI Detection */}
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 text-sm font-semibold mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI DETECTION
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-black/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-400">Object Detection</span>
                </div>
                <span className="text-white font-mono">{isDemoMode && demoAiDetection ? demoAiDetection.objectDetection : (connectionStatus === 'connected' ? 'ACTIVE' : '—')}</span>
              </div>
              <div className="p-2 bg-black/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-400">Victim Detection</span>
                </div>
                <span className="text-white font-mono">{isDemoMode && demoAiDetection ? demoAiDetection.victimDetection : (connectionStatus === 'connected' ? 'ACTIVE' : '—')}</span>
              </div>
              {isDemoMode && demoAiDetection && (
                <>
                  <div className="p-2 bg-black/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-400">Eye Status</span>
                    </div>
                    <span className="text-white font-mono">{demoAiDetection.eyeStatus}</span>
                  </div>
                  <div className="p-2 bg-black/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-400">Temperature</span>
                    </div>
                    <span className="text-white font-mono">{demoAiDetection.temperature}</span>
                  </div>
                  <div className="p-2 bg-black/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-400">Gas Detection</span>
                    </div>
                    <span className="text-white font-mono">{demoAiDetection.gasDetection}</span>
                  </div>
                  <div className="p-2 bg-black/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-400">Hazard Level</span>
                    </div>
                    <span className={`text-white font-mono ${demoAiDetection.hazardLevel === 'CRITICAL' ? 'text-red-400' : demoAiDetection.hazardLevel === 'HIGH' ? 'text-yellow-400' : 'text-green-400'}`}>{demoAiDetection.hazardLevel}</span>
                  </div>
                </>
              )}
              {!isDemoMode && (
                <div className="p-2 bg-black/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-400">Gas Prediction</span>
                  </div>
                  <span className="text-white font-mono">{connectionStatus === 'connected' ? 'ACTIVE' : '—'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 text-sm font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              ALERTS
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                <span className="text-red-400">No active alerts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Report Modal */}
      <AnimatePresence>
        {showMissionReport && missionReportData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMissionReport(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-blue-500/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">SARTHI</h2>
                  <p className="text-xs text-blue-400">SMART AUTONOMOUS RESPONSE TACTICAL HUMANITARIAN INTELLIGENCE</p>
                </div>
                <button
                  onClick={() => setShowMissionReport(false)}
                  className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-400 text-xs font-medium">DEMONSTRATION / SIMULATED MISSION</p>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="text-blue-400 font-semibold mb-2">MISSION DETAILS</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Mission ID:</span>
                      <span className="text-white ml-2">{missionReportData.missionId}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white ml-2">{new Date(missionReportData.startTime).toLocaleDateString()}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Start Time:</span>
                      <span className="text-white ml-2">{new Date(missionReportData.startTime).toLocaleTimeString()}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">End Time:</span>
                      <span className="text-white ml-2">{new Date(missionReportData.endTime).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-blue-400 font-semibold mb-2">ROBOT STATUS</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Connection:</span>
                      <span className="text-white ml-2">{missionReportData.robotConnection}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Final Battery:</span>
                      <span className="text-white ml-2">{missionReportData.battery[missionReportData.battery.length - 1] || '--'}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Voltage:</span>
                      <span className="text-white ml-2">{missionReportData.voltage[missionReportData.voltage.length - 1] || '--'}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Speed:</span>
                      <span className="text-white ml-2">{missionReportData.speed[missionReportData.speed.length - 1] || '--'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-blue-400 font-semibold mb-2">ENVIRONMENT</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Temperature:</span>
                      <span className="text-white ml-2">{missionReportData.temperature[missionReportData.temperature.length - 1] || '--'}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Humidity:</span>
                      <span className="text-white ml-2">{missionReportData.humidity[missionReportData.humidity.length - 1] || '--'}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Gas:</span>
                      <span className="text-white ml-2">{missionReportData.gas[missionReportData.gas.length - 1] || '--'}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Smoke:</span>
                      <span className="text-white ml-2">{missionReportData.smoke[missionReportData.smoke.length - 1] || '--'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-blue-400 font-semibold mb-2">AI ANALYSIS</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Victims Detected:</span>
                      <span className="text-white ml-2">{missionReportData.victimCount}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Eyes Open:</span>
                      <span className="text-white ml-2">{missionReportData.eyesOpen}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Eyes Closed:</span>
                      <span className="text-white ml-2">{missionReportData.eyesClosed}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded">
                      <span className="text-gray-400">Hazard Level:</span>
                      <span className={`text-white ml-2 ${missionReportData.hazardLevel === 'CRITICAL' ? 'text-red-400' : missionReportData.hazardLevel === 'HIGH' ? 'text-yellow-400' : 'text-green-400'}`}>{missionReportData.hazardLevel}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-blue-400 font-semibold mb-2">GPS STATUS</h3>
                  <div className="bg-black/30 p-2 rounded text-xs">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-white ml-2">{missionReportData.gpsStatus}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-blue-400 font-semibold mb-2">MISSION SUMMARY</h3>
                  <div className="bg-black/30 p-3 rounded text-xs text-gray-300 leading-relaxed">
                    During the demonstration mission, SARTHI entered a simulated fire environment and detected {missionReportData.victimCount} potential victim{missionReportData.victimCount !== 1 ? 's' : ''}. Environmental sensors indicated elevated smoke and gas levels. The mission remained active while the robot performed scanning operations. Final hazard level was assessed as {missionReportData.hazardLevel}.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}