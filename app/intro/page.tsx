'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Zap, Shield, Navigation, Activity, Camera, Map, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import Sarthi3DModel from '@/components/Sarthi3DModel';

export default function IntroPage() {
  const [scene, setScene] = useState(1);
  const [logs, setLogs] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const router = useRouter();

  const startupLogs = [
    'Initializing AI Core...',
    'Loading Rescue Engine...',
    'Connecting ESP32...',
    'Loading Camera...',
    'Loading AI Vision...',
    'Checking Sensors...',
    'Loading Maps...',
    'Initializing Simulation Engine...',
    'Mission Database Ready...',
    'Emergency System Ready...',
    'Command Center Ready...'
  ];

  useEffect(() => {
    // Always show intro, don't check localStorage
    const skipTimer = setTimeout(() => setShowSkip(true), 3000);
    return () => clearTimeout(skipTimer);
  }, [router]);

  useEffect(() => {
    // Scene transitions - 20 second total duration
    const scene1Timer = setTimeout(() => setScene(2), 2000);
    const scene2Timer = setTimeout(() => setScene(3), 8000);
    const scene3Timer = setTimeout(() => setScene(4), 12000);
    const scene4Timer = setTimeout(() => setScene(5), 16000);
    const scene5Timer = setTimeout(() => setScene(6), 19000);

    return () => {
      clearTimeout(scene1Timer);
      clearTimeout(scene2Timer);
      clearTimeout(scene3Timer);
      clearTimeout(scene4Timer);
      clearTimeout(scene5Timer);
    };
  }, []);

  useEffect(() => {
    if (scene === 5) {
      let logIndex = 0;
      const logInterval = setInterval(() => {
        if (logIndex < startupLogs.length) {
          setLogs(prev => [...prev, startupLogs[logIndex]]);
          logIndex++;
        } else {
          clearInterval(logInterval);
        }
      }, 300);

      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => {
        clearInterval(logInterval);
        clearInterval(progressInterval);
      };
    }
  }, [scene]);

  const handleSkip = () => {
    router.push('/login');
  };

  const handleIntroComplete = () => {
    router.push('/login');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {showSkip && (
        <button
          onClick={handleSkip}
          className="fixed top-6 right-6 z-50 px-6 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white font-medium transition-all hover:bg-black/70"
        >
          Skip Intro
        </button>
      )}

      <AnimatePresence mode="wait">
        {/* Scene 1: White background - 1 second */}
        {scene === 1 && (
          <motion.div
            key="scene1"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-4 h-4 bg-blue-500 rounded-full mx-auto"
              />
            </div>
          </motion.div>
        )}

        {/* Scene 2: 3D Robot smooth rotation */}
        {scene === 2 && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white flex items-center justify-center"
          >
            <div className="relative w-[600px] h-[700px]">
              <Canvas>
                <PerspectiveCamera makeDefault position={[5, 4, 5]} />
                <OrbitControls enableDamping dampingFactor={0.05} enableZoom={false} />
                <Environment preset="night" />
                <Stars radius={50} depth={25} count={1000} factor={2} saturation={0} fade speed={1} />
                <Sarthi3DModel 
                  position={[0, 0, 0]} 
                  rotation={[0, 0, 0]} 
                  scale={2.0}
                  autoRotate={true}
                  rotationSpeed={0.5}
                />
              </Canvas>
            </div>
          </motion.div>
        )}

        {/* Scene 3: AI Logo and SARTHI */}
        {scene === 3 && (
          <motion.div
            key="scene3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white flex items-center justify-center"
          >
            <div className="text-center">
              {/* Glowing AI Logo */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 animate-pulse" />
                  <Brain className="w-24 h-24 text-blue-500 mx-auto relative z-10" />
                </div>
              </motion.div>

              {/* SARTHI Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-6xl font-bold text-gray-900 mb-4 tracking-wider"
              >
                SARTHI
              </motion.h1>

              {/* Glowing effect */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"
              />
            </div>
          </motion.div>
        )}

        {/* Scene 4: Full form typing animation */}
        {scene === 4 && (
          <motion.div
            key="scene4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white flex items-center justify-center"
          >
            <div className="text-center max-w-4xl px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {[
                  'SMART',
                  'AUTONOMOUS',
                  'RESCUE',
                  'AND',
                  'TERRAIN',
                  'HAZARD',
                  'INSPECTOR'
                ].map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="text-2xl text-gray-700 font-mono font-bold"
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Scene 5: AI Startup Logs */}
        {scene === 5 && (
          <motion.div
            key="scene5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center"
          >
            <div className="text-center max-w-2xl w-full px-4">
              {/* Animated Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-8"
              >
                <Brain className="w-16 h-16 text-blue-400 mx-auto animate-pulse" />
              </motion.div>

              {/* Startup Logs */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                <div className="h-64 overflow-hidden">
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-left mb-2"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-green-400 font-mono text-sm">{log}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Loading Bar */}
                <div className="mt-4">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-400 text-xs font-mono">Loading System</span>
                    <span className="text-blue-400 text-xs font-mono">{loadingProgress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scene 6: Transform to dashboard */}
        {scene === 6 && (
          <motion.div
            key="scene6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onAnimationComplete={handleIntroComplete}
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
          >
            {/* Scanning effect */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0"
                animate={{
                  y: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* Holographic elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
                  <Brain className="w-32 h-32 text-blue-400 mx-auto relative z-10" />
                </div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl font-bold text-white mt-8 glow-text"
                >
                  SARTHI
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-blue-300 mt-2"
                >
                  Command Center Initializing...
                </motion.p>
              </motion.div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-blue-500/50" />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-blue-500/50" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-blue-500/50" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-blue-500/50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}