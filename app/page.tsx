'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Fade out after 800ms, then navigate (total 1 second)
    const fadeTimer = setTimeout(() => {
      setShowLoader(false);
    }, 800);

    const navTimer = setTimeout(() => {
      router.push('/intro');
    }, 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: showLoader ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white">Loading SARTHI...</p>
      </div>
    </motion.div>
  );
}