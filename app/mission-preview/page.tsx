'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function MissionPreviewPage() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [showStartOverlay, setShowStartOverlay] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show skip button after 3 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 3000);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    // Wait 2 seconds then show video
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);

    return () => clearTimeout(videoTimer);
  }, []);

  const handleSkip = () => {
    router.push('/dashboard');
  };

  const handleVideoEnd = () => {
    console.log('Video ended, navigating to dashboard');
    router.push('/dashboard');
  };

  const handleVideoError = () => {
    console.error('Video error occurred');
    setVideoError(true);
    // Continue to dashboard after 3 seconds
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  };

  const handleStartMission = () => {
    const video = videoRef.current;
    if (video) {
      console.log('Starting mission with audio...');
      console.log('Audio Enabled');
      console.log('Current Volume:', video.volume);
      console.log('Current Muted State:', video.muted);
      
      video.muted = false;
      video.volume = 1.0;
      
      console.log('Video Playing');
      console.log('Audio Enabled');
      console.log('Current Volume:', video.volume);
      console.log('Current Muted State:', video.muted);
      
      video.play().then(() => {
        console.log('Video started successfully with audio');
        setShowStartOverlay(false);
      }).catch((error) => {
        console.error('Autoplay blocked:', error);
        setAutoplayBlocked(true);
      });
    }
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    const video = videoRef.current;
    if (video) {
      console.log('Current Volume:', video.volume);
      console.log('Current Muted State:', video.muted);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Skip Preview Button */}
      {showSkip && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleSkip}
          className="fixed top-6 right-6 z-50 px-6 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white font-medium transition-all hover:bg-black/70 border border-blue-500/30"
        >
          Skip Preview
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {!showVideo && !videoError && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center px-6"
          >
            <h1 className="text-4xl font-bold text-blue-400 mb-4 tracking-wider">
              SARTHI Mission Preview
            </h1>
            <p className="text-xl text-gray-400">
              Initializing Autonomous Rescue Mission...
            </p>
          </motion.div>
        )}

        {showVideo && !videoError && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full h-screen"
          >
            <video
              ref={videoRef}
              autoPlay
              muted={false}
              volume={1.0}
              playsInline
              controls={true}
              preload="auto"
              onEnded={handleVideoEnd}
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
              className="w-full h-full object-cover"
            >
              <source src="/videos/sarthi-mission-demo.mp4" type="video/mp4" />
            </video>

            {/* Start Mission Overlay */}
            {showStartOverlay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/80 flex items-center justify-center cursor-pointer z-20"
                onClick={handleStartMission}
              >
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-blue-400 mb-4 tracking-wider">
                    SARTHI Mission Preview
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Click anywhere to begin mission.
                  </p>
                  {autoplayBlocked && (
                    <p className="text-red-400 mb-4">
                      Click to Start Mission Preview
                    </p>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all"
                  >
                    Start Mission
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {videoError && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 text-center px-6"
          >
            <h2 className="text-2xl font-semibold text-red-400 mb-4">
              Mission preview unavailable
            </h2>
            <p className="text-gray-400">
              Continuing to command center...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
