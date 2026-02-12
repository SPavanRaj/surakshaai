import React, { useState } from 'react';
import { useSafety } from '../context/SafetyContext';
import { SafetyStatus } from '../types';
import { Power } from 'lucide-react';

export const SOSButton: React.FC = () => {
  const { triggerSOS, status, resolveSOS } = useSafety();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const isActive = status === SafetyStatus.DANGER;

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);

    if (isActive) {
      resolveSOS();
    } else {
      triggerSOS('SOS_BUTTON');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 relative isolate">
      {/* Outer Pulse Rings */}
      <div className={`absolute w-[500px] h-[500px] rounded-full border border-red-500/10 transition-all duration-1000 ${isActive ? 'scale-100 opacity-100 animate-[spin_10s_linear_infinite]' : 'scale-50 opacity-0'}`} />
      <div className={`absolute w-[400px] h-[400px] rounded-full border border-red-500/20 transition-all duration-1000 delay-75 ${isActive ? 'scale-100 opacity-100 animate-[spin_8s_linear_infinite_reverse]' : 'scale-50 opacity-0'}`} />
      
      {/* Animated Glow Backgrounds */}
      <div className={`absolute w-80 h-80 rounded-full bg-red-600/20 blur-[60px] transition-all duration-1000 ${isActive ? 'animate-pulse scale-150' : 'scale-100 opacity-50'}`} />
      
      {/* Ripple Rings */}
      <div className={`absolute w-64 h-64 rounded-full border-2 border-red-500/30 ${isActive ? 'animate-ping-slow' : 'hidden'}`} />
      <div className={`absolute w-64 h-64 rounded-full border-2 border-red-500/30 ${isActive ? 'animate-ping-slow' : 'hidden'}`} style={{ animationDelay: '1s' }} />

      {/* Main Button Container */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative z-10 w-64 h-64 rounded-full flex items-center justify-center
          transition-all duration-500 transform
          border-[12px] backdrop-blur-sm group
          ${isActive 
            ? 'bg-red-600 border-red-500 shadow-[0_0_100px_rgba(220,38,38,0.6)] scale-110' 
            : 'bg-gradient-to-b from-slate-800 to-slate-950 border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_60px_rgba(220,38,38,0.3)]'
          }
          ${isPressed ? 'scale-95' : ''}
        `}
      >
        {/* Inner Gradient & Texture */}
        <div className={`
          absolute inset-2 rounded-full overflow-hidden
          ${isActive ? 'bg-gradient-to-br from-red-500 to-red-900' : 'bg-gradient-to-br from-slate-900 to-black'}
        `}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
        </div>

        {/* Text Content */}
        <div className="relative flex flex-col items-center text-center z-20">
          <Power className={`w-12 h-12 mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-red-500'}`} />
          
          <span className={`text-5xl font-black tracking-widest drop-shadow-lg transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
            {isActive ? 'STOP' : 'SOS'}
          </span>
          
          <span className={`text-xs mt-2 font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${isActive ? 'text-red-100' : 'text-slate-500 group-hover:text-red-400'}`}>
            {isActive ? 'Click to Cancel' : 'Emergency'}
          </span>
        </div>
      </button>

      {/* Status Label */}
      <div className={`mt-12 text-center transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-2'}`}>
        <p className={`text-lg font-bold tracking-widest ${isActive ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
          {isActive ? 'TRANSMITTING EMERGENCY SIGNAL...' : 'PRESS FOR IMMEDIATE ASSISTANCE'}
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-4 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};