import React from 'react';
import { useSafety } from '../context/SafetyContext';
import { Moon, Sun, Globe, EyeOff, RotateCcw, Shield, Bell, Lock } from 'lucide-react';

export const Settings: React.FC = () => {
  const { settings, toggleStealthMode, toggleTheme, resetData } = useSafety();

  return (
    <div className="animate-slide-up max-w-3xl mx-auto">
      
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">System Configuration</h2>
        <p className="text-slate-400 text-sm">Manage global preferences and emergency protocols.</p>
      </div>

      <div className="space-y-8">
        
        {/* Section: Security */}
        <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 ml-1">Security Protocols</h3>
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                
                {/* Stealth Mode */}
                <div className="p-6 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                            <EyeOff className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Stealth Mode</h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-sm">Suppress audible alarms and visible popups during SOS to remain undetected.</p>
                        </div>
                    </div>
                    <button 
                        onClick={toggleStealthMode}
                        className={`w-14 h-8 rounded-full transition-colors duration-300 relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 ${settings.stealthMode ? 'bg-indigo-600' : 'bg-slate-700'}`}
                    >
                        <span className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-md ${settings.stealthMode ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>

                {/* Lock Screen */}
                <div className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                            <Lock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Biometric Lock</h3>
                            <p className="text-xs text-slate-400 mt-1">Require FaceID/TouchID to cancel SOS.</p>
                        </div>
                    </div>
                    <div className="w-14 h-8 rounded-full bg-slate-700 relative opacity-50 cursor-not-allowed">
                        <span className="absolute top-1 left-1 bg-slate-400 w-6 h-6 rounded-full shadow-md" />
                    </div>
                </div>
            </div>
        </div>

        {/* Section: Interface */}
        <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 ml-1">Interface & Accessibility</h3>
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                
                {/* Theme Toggle */}
                <div className="p-6 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 group-hover:scale-110 transition-transform duration-300">
                            {settings.theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Appearance</h3>
                            <p className="text-xs text-slate-400 mt-1">High contrast mode for better visibility.</p>
                        </div>
                    </div>
                    <button 
                        onClick={toggleTheme}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-lg border border-white/10 transition-colors"
                    >
                        {settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </div>

                {/* Language */}
                <div className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                            <Globe className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Language</h3>
                            <p className="text-xs text-slate-400 mt-1">System-wide language preference.</p>
                        </div>
                    </div>
                    <select className="bg-slate-950 border border-slate-700 text-slate-300 text-sm font-medium rounded-lg px-4 py-2 outline-none focus:border-blue-500 cursor-pointer">
                        <option>English (US)</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-8">
            <div className="bg-red-950/10 border border-red-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-sm hover:bg-red-950/20 transition-colors">
                <div className="flex items-center gap-5">
                    <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                        <RotateCcw className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">Factory Reset</h3>
                        <p className="text-xs text-red-300/70 mt-1">Permanently delete all logs, contacts, and settings.</p>
                    </div>
                </div>
                <button 
                    onClick={() => {
                        if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
                            resetData();
                        }
                    }}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-900/20 transition-all hover:scale-105 active:scale-95"
                >
                    Reset System
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};