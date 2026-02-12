import React from 'react';
import { Shield, AlertTriangle, Navigation } from 'lucide-react';

export const SmartRoute: React.FC = () => {
  return (
    <div className="animate-slide-up space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Smart Route Navigation</h2>
            <p className="text-slate-400 text-sm max-w-lg">
                Real-time AI analysis of street safety using historical crime data, lighting conditions, and crowd density sensors.
            </p>
        </div>
        
        <div className="flex items-center gap-6 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
             <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-slate-800" />
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-emerald-500" strokeDasharray="175" strokeDashoffset="10" strokeLinecap="round" />
                </svg>
                <span className="absolute text-sm font-bold text-white">94%</span>
             </div>
             <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Safety Score</p>
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-400 font-bold">Excellent</span>
                </div>
             </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="glass-panel border border-white/10 rounded-3xl p-1 overflow-hidden relative min-h-[600px] shadow-2xl">
        
        {/* Futuristic Map View */}
        <div className="w-full h-full min-h-[600px] bg-[#050b14] relative overflow-hidden rounded-2xl group">
            
            {/* Dark Grid Floor */}
            <div className="absolute inset-0 opacity-20" 
                style={{ 
                    backgroundImage: `
                        linear-gradient(to right, #1e293b 1px, transparent 1px),
                        linear-gradient(to bottom, #1e293b 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    perspective: '1000px',
                    transform: 'scale(1.1)'
                }} 
            />

            {/* Radar Scan Effect */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(34,197,94,0.1)_0deg,transparent_60deg)] animate-spin-slow opacity-30 rounded-full scale-[2]"></div>
            
            {/* Stylized Roads */}
            <div className="absolute top-1/2 left-0 w-full h-8 bg-slate-800/40 -translate-y-1/2 blur-[1px]" />
            <div className="absolute top-0 left-1/3 w-8 h-full bg-slate-800/40 blur-[1px]" />
            <div className="absolute top-0 left-2/3 w-8 h-full bg-slate-800/40 blur-[1px]" />
            <div className="absolute top-1/3 left-0 w-full h-6 bg-slate-800/30 blur-[1px]" />

            {/* Danger Zones (Red Pulsing) */}
            <div className="absolute top-[10%] left-[65%] w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-[15%] left-[68%] w-4 h-4 bg-red-500 rounded-full animate-ping"></div>

            {/* Safe Zones (Green Glow) */}
            <div className="absolute top-[35%] left-[35%] w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />

            {/* Route Path SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <path 
                    d="M 100 250 L 300 250 L 300 150 L 500 150 L 500 300 L 800 300" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    filter="url(#glow)"
                    className="opacity-80"
                >
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                </path>
                
                {/* Dynamic Markers */}
                <circle cx="500" cy="150" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" className="animate-pulse">
                    <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>

            {/* Floating UI Markers */}
            <div className="absolute top-[12%] left-[68%] animate-bounce">
                <div className="bg-red-950/90 backdrop-blur-md border border-red-500/50 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg shadow-red-900/20">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-[10px] text-red-200 font-bold uppercase tracking-wide">High Crime Zone</span>
                </div>
            </div>

            <div className="absolute top-[52%] left-[45%]">
                <div className="bg-emerald-950/90 backdrop-blur-md border border-emerald-500/50 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-900/20 transform hover:scale-110 transition-transform cursor-help">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] text-emerald-200 font-bold uppercase tracking-wide">Safe Corridor</span>
                </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <button className="w-10 h-10 bg-slate-900/80 backdrop-blur border border-white/10 rounded-xl text-white flex items-center justify-center hover:bg-slate-800 transition-colors">
                    <Navigation className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* Legend Overlay */}
        <div className="absolute top-6 left-6 bg-slate-950/80 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-3 shadow-xl max-w-[200px]">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-2">Map Legend</h4>
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <span className="text-xs text-slate-300 font-medium">Safe Route</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                <span className="text-xs text-slate-300 font-medium">Risk Zone</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                <span className="text-xs text-slate-300 font-medium">Live Position</span>
            </div>
        </div>
      </div>
    </div>
  );
};