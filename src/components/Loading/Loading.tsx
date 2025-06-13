'use client';

import React, { useState, useEffect } from 'react';

const HawiCrotchetsLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const loadingMessages = [
    "Gathering yarn...",
    "Selecting hooks...",
    "Crafting with love...",
    "Weaving magic...",
    "Almost ready..."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 min-h-screen bg-gradient-to-br from-[#f7d6c5] via-[#ffffff] to-[#ffffff] flex items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-dashed border-[#f7d6c5] animate-spin"></div>
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full border-4 border-dashed border-orange-200 animate-spin animate-reverse"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 rounded-full border-4 border-dashed border-[#f7d6c5] animate-spin"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 rounded-full border-4 border-dashed border-orange-300 animate-spin animate-reverse"></div>
      </div>

      <div className="text-center space-y-8 px-8">
        {/* Logo/Brand */}
        <div className="space-y-4">
          <div className="relative">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Hawi Crotchets
            </h1>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Handcrafted with Love</p>
        </div>

        {/* Animated Yarn Ball */}
        <div className="relative flex justify-center">
          <div className="relative">
            {/* Main yarn ball */}
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full shadow-2xl animate-pulse">
              {/* Yarn strands */}
              <div className="absolute top-4 left-4 w-24 h-24 border-4 border-white border-dashed rounded-full animate-spin"></div>
              <div className="absolute top-8 left-8 w-16 h-16 border-2 border-orange-200 border-dashed rounded-full animate-spin animate-reverse"></div>
            </div>
            
            {/* Crochet hook */}
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 rotate-45">
              <div className="w-16 h-2 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full shadow-lg"></div>
              <div className="absolute -right-1 -top-1 w-4 h-4 bg-silver-400 rounded-full border-2 border-gray-300"></div>
            </div>

            {/* Floating yarn pieces */}
            <div className="absolute -top-8 -left-4 w-2 h-8 bg-orange-300 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-6 -right-2 w-2 h-6 bg-amber-300 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-2 -right-8 w-2 h-10 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-4">
          <div className="bg-white/50 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <div 
              className="h-3 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 rounded-full transition-all duration-100 ease-out shadow-inner"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Loading Message */}
          <div className="text-gray-700 font-medium text-lg min-h-[28px] flex items-center justify-center">
            <span className="animate-fade-in-out" key={currentMessage}>
              {loadingMessages[currentMessage]}
            </span>
          </div>
          
          {/* Percentage */}
          <div className="text-2xl font-bold text-gray-800">
            {progress}%
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-6 opacity-60">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        .animate-fade-in-out {
          animation: fade-in-out 1s ease-in-out infinite;
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default HawiCrotchetsLoader;