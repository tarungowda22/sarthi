'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Save,
  Eye,
  EyeOff,
  ChevronRight
} from 'lucide-react';

type NotificationSettings = {
  email: boolean;
  push: boolean;
  sms: boolean;
  taskUpdates: boolean;
  securityAlerts: boolean;
  marketing: boolean;
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    taskUpdates: true,
    securityAlerts: true,
    marketing: false
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'integrations', name: 'Integrations', icon: Globe },
    { id: 'data', name: 'Data & Privacy', icon: Database },
  ];

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white glow-text mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card-glass p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-400' : ''}`} />
                  <span className="font-medium">{tab.name}</span>
                  {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto text-blue-400" />}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="card-glass p-6"
          >
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'notifications' && (
              <NotificationSettings 
                notifications={notifications} 
                onChange={handleNotificationChange} 
              />
            )}
            {activeTab === 'security' && <SecuritySettings showPassword={showPassword} setShowPassword={setShowPassword} />}
            {activeTab === 'appearance' && <AppearanceSettings />}
            {activeTab === 'integrations' && <IntegrationsSettings />}
            {activeTab === 'data' && <DataSettings />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Profile Settings</h2>
      
      {/* Avatar Section */}
      <div className="flex items-center gap-6 pb-6 border-b border-gray-700">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
          U
        </div>
        <div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
            Change Avatar
          </button>
          <p className="text-gray-400 text-sm mt-2">JPG, PNG or GIF. Max size 2MB</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            defaultValue="User"
            className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            defaultValue="Name"
            className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white transition-colors"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
          <input
            type="email"
            defaultValue="user@email.com"
            className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white transition-colors"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <textarea
            rows={4}
            defaultValue="AI enthusiast and tech professional exploring the future of autonomous systems."
            className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white transition-colors resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity glow-blue">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function NotificationSettings({ 
  notifications, 
  onChange 
}: { 
  notifications: NotificationSettings;
  onChange: (key: keyof NotificationSettings) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>

      <div className="space-y-4">
        {[
          { key: 'email' as const, label: 'Email Notifications', description: 'Receive notifications via email' },
          { key: 'push' as const, label: 'Push Notifications', description: 'Receive push notifications in browser' },
          { key: 'sms' as const, label: 'SMS Notifications', description: 'Receive notifications via SMS' },
          { key: 'taskUpdates' as const, label: 'Task Updates', description: 'Get notified about task progress' },
          { key: 'securityAlerts' as const, label: 'Security Alerts', description: 'Important security notifications' },
          { key: 'marketing' as const, label: 'Marketing Communications', description: 'Receive updates about new features' },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
          >
            <div>
              <h3 className="text-white font-medium">{item.label}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
            <button
              onClick={() => onChange(item.key)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications[item.key] 
                  ? 'bg-blue-500' 
                  : 'bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications[item.key] 
                    ? 'left-7' 
                    : 'left-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity glow-blue">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function SecuritySettings({ 
  showPassword, 
  setShowPassword 
}: { 
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>

      {/* Change Password */}
      <div className="space-y-4 pb-6 border-b border-gray-700">
        <h3 className="text-white font-medium">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white transition-colors pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="space-y-4 pb-6 border-b border-gray-700">
        <h3 className="text-white font-medium">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div>
            <p className="text-white">Enable 2FA</p>
            <p className="text-gray-400 text-sm">Add an extra layer of security</p>
          </div>
          <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
            Enable
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="space-y-4">
        <h3 className="text-white font-medium">Active Sessions</h3>
        <div className="space-y-3">
          {[
            { device: 'Chrome on Windows', location: 'San Francisco, CA', time: 'Current session' },
            { device: 'Safari on iPhone', location: 'New York, NY', time: '2 hours ago' },
          ].map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
            >
              <div>
                <p className="text-white font-medium">{session.device}</p>
                <p className="text-gray-400 text-sm">{session.location} • {session.time}</p>
              </div>
              {index !== 0 && (
                <button className="text-red-400 hover:text-red-300 text-sm">Revoke</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity glow-blue">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Appearance Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">Theme</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'Dark', bg: 'bg-gray-900', accent: 'border-blue-500' },
              { name: 'Light', bg: 'bg-white', accent: 'border-purple-500' },
              { name: 'System', bg: 'bg-gradient-to-br from-gray-900 to-white', accent: 'border-cyan-500' },
            ].map((theme) => (
              <button
                key={theme.name}
                className={`p-4 rounded-lg border-2 ${theme.accent} bg-black/30 hover:bg-black/50 transition-colors`}
              >
                <div className={`w-full h-16 rounded ${theme.bg} mb-2`} />
                <p className="text-white text-sm font-medium">{theme.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">Accent Color</label>
          <div className="flex gap-3">
            {['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
              <button
                key={color}
                className="w-10 h-10 rounded-full border-2 border-transparent hover:border-white transition-colors"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Font Size</label>
          <select className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white transition-colors">
            <option>Small</option>
            <option selected>Medium</option>
            <option>Large</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity glow-blue">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function IntegrationsSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Integrations</h2>

      <div className="space-y-4">
        {[
          { name: 'Slack', status: 'connected', icon: '💬' },
          { name: 'GitHub', status: 'connected', icon: '🐙' },
          { name: 'Google Workspace', status: 'disconnected', icon: '📧' },
          { name: 'Microsoft Teams', status: 'disconnected', icon: '👥' },
          { name: 'Jira', status: 'disconnected', icon: '📋' },
        ].map((integration) => (
          <div
            key={integration.name}
            className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{integration.icon}</span>
              <div>
                <p className="text-white font-medium">{integration.name}</p>
                <p className={`text-sm ${
                  integration.status === 'connected' ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {integration.status === 'connected' ? 'Connected' : 'Not connected'}
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              integration.status === 'connected'
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
            }`}>
              {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Data & Privacy</h2>

      <div className="space-y-4">
        <div className="p-4 bg-black/30 rounded-lg">
          <h3 className="text-white font-medium mb-2">Export Your Data</h3>
          <p className="text-gray-400 text-sm mb-4">Download all your data in a machine-readable format</p>
          <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
            Export Data
          </button>
        </div>

        <div className="p-4 bg-black/30 rounded-lg">
          <h3 className="text-white font-medium mb-2">Delete Account</h3>
          <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all associated data</p>
          <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}