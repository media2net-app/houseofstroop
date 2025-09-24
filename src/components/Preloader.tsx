'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // Increment by 2% every ~60ms for smooth animation
      });
    }, 60);

    // Hide preloader after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center header-bg">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <div className="w-32 h-32 mx-auto relative">
            <Image
              src="/logo-nieuw.png"
              alt="House of Stroop Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl md:text-3xl font-bold text-stroop-700 mb-8 animate-fade-in-up">
          House of Stroop is loading...
        </h2>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="bg-stroop-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-stroop-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 text-stroop-600 font-medium">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
