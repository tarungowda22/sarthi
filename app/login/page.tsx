'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Mail, Lock, Eye, EyeOff, ArrowRight, User, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import Sarthi3DModel from '@/components/Sarthi3DModel';

export default function LoginPage() {
  const [mode, setMode] = useState<'admin' | 'guest'>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [robotPosition, setRobotPosition] = useState(-400);
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Robot animation
    const timer = setTimeout(() => {
      setRobotPosition(window.innerWidth / 2 - 250);
    }, 500);
    
    const panelTimer = setTimeout(() => {
      setShowLoginPanel(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(panelTimer);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'admin') {
      // Hardcoded admin credentials
      if (formData.email === 'gowdatarun899@gmail.com' && formData.password === 'Tarungowda@22') {
        localStorage.setItem('sarthi-auth', 'admin');
        localStorage.setItem('sarthi-user', JSON.stringify({ email: formData.email, role: 'admin' }));
        router.push('/dashboard');
      } else {
        setError('Invalid Credentials');
      }
    } else {
      // Guest mode - no authentication required
      localStorage.setItem('sarthi-auth', 'guest');
      localStorage.setItem('sarthi-user', JSON.stringify({ role: 'guest' }));
      router.push('/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden flex items-center justify-center px-6">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      {/* 3D Robot Animation */}
      <motion.div
        initial={{ x: -500 }}
        animate={{ x: robotPosition }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute z-10 w-[500px] h-[600px]"
      >
        <Canvas>
          <PerspectiveCamera makeDefault position={[5, 4, 5]} />
          <OrbitControls enableDamping dampingFactor={0.05} enableZoom={false} />
          <Environment preset="night" />
          <Stars radius={50} depth={25} count={1000} factor={2} saturation={0} fade speed={1} />
          <Sarthi3DModel 
            position={[0, 0, 0]} 
            rotation={[0, 0, 0]} 
            scale={2.5}
            autoRotate={true}
            rotationSpeed={0.3}
          />
        </Canvas>
      </motion.div>

      {/* Login Panel */}
      <AnimatePresence>
        {showLoginPanel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-20 w-full max-w-md ml-64"
          >
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Brain className="w-10 h-10 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">SARTHI</span>
            </div>

            {/* Mode Selection */}
            <div className="flex mb-6 bg-black/30 rounded-lg p-1">
              <button
                onClick={() => setMode('admin')}
                className={`flex-1 py-3 rounded-md font-semibold transition-all ${
                  mode === 'admin'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Admin Login
              </button>
              <button
                onClick={() => setMode('guest')}
                className={`flex-1 py-3 rounded-md font-semibold transition-all ${
                  mode === 'guest'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Guest Mode
              </button>
            </div>

            {/* Glass Card */}
            <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                {mode === 'admin' ? 'Admin Access' : 'Guest Access'}
              </h2>
              <p className="text-gray-400 mb-6">
                {mode === 'admin' 
                  ? 'Enter your credentials to access the command center' 
                  : 'Explore SARTHI in read-only mode'}
              </p>

              {mode === 'admin' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 bg-black/30 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    <Shield className="w-5 h-5" />
                    Access Command Center
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </form>
              )}

              {mode === 'guest' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg font-semibold text-white hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Enter as Guest
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}

              <div className="mt-6 pt-6 border-t border-blue-500/30">
                <p className="text-center text-gray-400 text-sm">
                  {mode === 'guest' && 'Guest mode provides limited access to view and simulate'}
                </p>
              </div>
            </div>

            <p className="text-center text-gray-500 text-xs mt-6">
              Smart Autonomous Rescue and Terrain Hazard Inspector
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}