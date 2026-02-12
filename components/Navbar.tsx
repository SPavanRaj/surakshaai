import React from 'react';
import { Logo } from './Logo';
import { useSafety } from '../context/SafetyContext';
import { ShieldAlert, ShieldCheck, Menu, Bell } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { status } = useSafety();

  return (
    <nav className="h-20 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl fixed top-0 w-full z-40 flex items-center justify-between px-4 lg:px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Logo />
      </div>

      <div className="flex items-center gap-6">
        {/* Status Pill */}
        <div className={`
          flex items-center gap-3 px-4 py-2 rounded-full border shadow-lg transition-all duration-500
          ${status === 'DANGER' 
            ? 'bg-red-500/10 border-red-500/50 text-red-400 shadow-red-900/20 animate-pulse' 
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-emerald-900/10'
          }
        `}>
          {status === 'DANGER' ? (
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          ) : (
            <ShieldCheck className="w-5 h-5" />
          )}
          <span className="text-xs font-bold tracking-widest uppercase">
            {status === 'DANGER' ? 'Emergency Active' : 'System Secure'}
          </span>
        </div>

        {/* Notifications */}
        <button className="hidden sm:flex relative p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors border border-transparent hover:border-white/10">
          <Bell className="w-5 h-5" />
          {status === 'DANGER' && (
             <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          )}
        </button>
      </div>
    </nav>
  );
};