'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Cpu, 
  Wifi, 
  Shield, 
  Zap,
  Target,
  Code,
  Users,
  Award
} from 'lucide-react';

export default function AboutPage() {
  const technologies = [
    { name: 'ESP32', description: 'Main microcontroller for robot control', icon: Cpu },
    { name: 'ESP32-CAM', description: 'Camera module for FPV and AI vision', icon: Wifi },
    { name: 'MQ2 Gas Sensor', description: 'Gas and smoke detection', icon: Shield },
    { name: 'HC-SR04', description: 'Ultrasonic distance measurement', icon: Target },
    { name: 'DHT11', description: 'Temperature and humidity sensing', icon: Zap },
    { name: 'Servo Motors', description: 'Precise movement control', icon: Brain },
    { name: 'L298N Driver', description: 'Motor driver for propulsion', icon: Cpu },
    { name: 'Arduino IDE', description: 'Development environment', icon: Code },
  ];

  const softwareStack = [
    { name: 'Next.js 16', description: 'React framework for frontend' },
    { name: 'React 19', description: 'UI library' },
    { name: 'TypeScript', description: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS', description: 'Utility-first styling' },
    { name: 'Framer Motion', description: 'Animation library' },
    { name: 'Three.js', description: '3D graphics and simulation' },
    { name: 'Recharts', description: 'Data visualization' },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced neural networks for victim, fire, and hazard detection'
    },
    {
      icon: Shield,
      title: 'Real-Time Monitoring',
      description: 'Continuous sensor data streaming and analysis'
    },
    {
      icon: Zap,
      title: 'Autonomous Navigation',
      description: 'Self-driving capabilities with obstacle avoidance'
    },
    {
      icon: Target,
      title: 'Precision Control',
      description: 'Accurate movement and manipulation in disaster zones'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">About SARTHI</h1>
        <p className="text-gray-400">Smart Autonomous Rescue and Terrain Hazard Inspector</p>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-8 text-center"
      >
        <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Revolutionizing Disaster Response</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          SARTHI is an advanced autonomous rescue robot designed to navigate hazardous environments, 
          locate victims, and provide critical assistance in disaster scenarios where human intervention would be dangerous.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">Award-Winning Design</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm">Open Source</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm">Mission Ready</span>
          </div>
        </div>
      </motion.div>

      {/* Mission */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          SARTHI is designed to save lives in disaster situations by providing autonomous reconnaissance and rescue capabilities. 
          The robot can navigate through collapsed buildings, fire zones, and hazardous industrial environments to locate victims, 
          assess conditions, and deliver emergency supplies. By removing human rescuers from immediate danger, SARTHI enables 
          safer and more effective disaster response operations.
        </p>
      </div>

      {/* Key Features */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6"
            >
              <feature.icon className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hardware */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Hardware Components</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-4 text-center hover:border-blue-500/40 transition-all"
            >
              <tech.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-white font-medium text-sm mb-1">{tech.name}</h3>
              <p className="text-gray-400 text-xs">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Software Stack */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Software Stack</h2>
        <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {softwareStack.map((tech, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                <Code className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white font-medium">{tech.name}</p>
                  <p className="text-gray-400 text-xs">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-gray-400 text-sm mb-3">Dimensions</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Length: 45cm</li>
              <li>• Width: 35cm</li>
              <li>• Height: 25cm</li>
              <li>• Weight: 4.5kg</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm mb-3">Performance</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Max Speed: 2 m/s</li>
              <li>• Battery Life: 4 hours</li>
              <li>• Range: 200m (WiFi)</li>
              <li>• Operating Temp: -10°C to 50°C</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm mb-3">Sensors</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Camera: 1080p @ 30fps</li>
              <li>• Gas: MQ2 (0-1000ppm)</li>
              <li>• Distance: 2-400cm</li>
              <li>• Temp/Humidity: 0-50°C / 20-90%</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Development Team */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Development Team</h2>
        <p className="text-gray-300 mb-4">
          SARTHI is developed by a team of passionate engineers and researchers dedicated to advancing 
          autonomous rescue technology.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { role: 'Lead Developer', name: 'Tarun Gowda' },
            { role: 'AI Engineer', name: 'Team Member' },
            { role: 'Hardware Specialist', name: 'Team Member' },
          ].map((member, index) => (
            <div key={index} className="p-4 bg-black/30 rounded-lg text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-2 flex items-center justify-center text-white font-bold">
                {member.name.charAt(0)}
              </div>
              <p className="text-white font-medium">{member.name}</p>
              <p className="text-gray-400 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Acknowledgments */}
      <div className="bg-black/30 backdrop-blur-xl border border-blue-500/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Acknowledgments</h2>
        <p className="text-gray-300">
          This project is inspired by the need for advanced autonomous systems in disaster response. 
          We acknowledge the contributions of the open-source community and the support of our academic institution.
        </p>
      </div>
    </div>
  );
}