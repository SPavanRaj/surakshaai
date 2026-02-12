import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative w-11 h-11 group">
        <div className="absolute inset-0 bg-red-600/20 blur-lg rounded-full animate-pulse"></div>
        <svg viewBox="0 0 100 100" className="relative w-full h-full drop-shadow-[0_0_15px_rgba(220,38,38,0.6)] transition-transform duration-500 group-hover:scale-110">
          {/* Shield Base */}
          <path 
            d="M50 95 C20 80 5 55 5 25 L50 5 L95 25 C95 55 80 80 50 95 Z" 
            fill="url(#shieldGradient)" 
            stroke="white" 
            strokeWidth="2.5"
            className="drop-shadow-lg"
          />
          <defs>
            <linearGradient id="shieldGradient" x1="0" y1="0" x2="0" y2="100">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>
          
          {/* Inner Circuit Pattern */}
          <path 
            d="M50 20 V45 M50 45 L35 55 M50 45 L65 55 M35 55 V65 M65 55 V65" 
            stroke="white" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            fill="none"
            className="opacity-90"
          />
          <circle cx="50" cy="45" r="2.5" fill="white" className="animate-ping-slow" style={{ animationDuration: '3s' }}/>
          <circle cx="50" cy="45" r="2.5" fill="white" />
          <circle cx="35" cy="65" r="2.5" fill="white" />
          <circle cx="65" cy="65" r="2.5" fill="white" />
        </svg>
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="text-2xl font-black tracking-tight text-white font-sans">
          Suraksha<span className="text-red-500">AI</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold pl-0.5">
          Intelligent System
        </span>
      </div>
    </div>
  );
};