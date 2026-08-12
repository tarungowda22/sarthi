'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Video, 
  Gamepad2, 
  BarChart3, 
  FileText, 
  Info,
  Gauge,
  Cpu,
  Menu,
  X,
  LogOut,
  Bell,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/guest', icon: Home },
    { name: 'Live Camera', href: '/guest/camera', icon: Video },
    { name: 'Simulation', href: '/guest/simulation', icon: Gamepad2 },
    { name: 'Sensors', href: '/guest/sensors', icon: Gauge },
    { name: 'Reports', href: '/guest/reports', icon: FileText },
    { name: 'Analytics', href: '/guest/analytics', icon: BarChart3 },
    { name: 'AI Demo', href: '/guest/ai', icon: Cpu },
    { name: 'About', href: '/guest/about', icon: Info },
  ];

  const handleLogout = () => {
    localStorage.removeItem('sarthi-auth');
    localStorage.removeItem('sarthi-user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-black/90 backdrop-blur-xl z-50 p-6 border-r border-blue-500/30"
            >
              <SidebarContent 
                navigation={navigation} 
                pathname={pathname} 
                onLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-black/90 backdrop-blur-xl p-6 border-r border-blue-500/30 flex-col">
        <SidebarContent 
          navigation={navigation} 
          pathname={pathname} 
          onLogout={handleLogout}
        />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-black/50 backdrop-blur-xl border-b border-blue-500/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-4 pr-4 py-2 bg-black/30 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 w-64 transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  G
                </div>
                <span className="text-white font-medium hidden sm:block">Guest</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarContent({ 
  navigation, 
  pathname, 
  onLogout 
}: { 
  navigation: typeof navigation;
  pathname: string;
  onLogout: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <Link href="/guest" className="flex items-center gap-2 mb-8">
        <Brain className="w-8 h-8 text-blue-400" />
        <span className="text-xl font-bold text-white">SARTHI</span>
      </Link>

      {/* Guest Badge */}
      <div className="mb-6 px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
        <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Guest Mode</p>
        <p className="text-gray-400 text-xs">Limited Access</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="mt-6 p-4 bg-black/30 border border-blue-500/20 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            G
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">Guest User</p>
            <p className="text-gray-400 text-xs truncate">Read-only access</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </>
  );
}