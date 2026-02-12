import React, { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

export const Toast: React.FC = () => {
  const { logs, settings } = useSafety();
  const [visible, setVisible] = useState(false);
  const [latestLog, setLatestLog] = useState(logs[0]);

  useEffect(() => {
    if (logs.length > 0 && logs[0] !== latestLog) {
      setLatestLog(logs[0]);
      if (!settings.stealthMode) {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [logs, settings.stealthMode, latestLog]);

  if (!visible) return null;

  return (
    <div className="fixed top-24 right-4 z-[100] animate-slide-in-right">
      <div className="bg-slate-900/90 backdrop-blur-xl text-white pl-4 pr-10 py-4 rounded-xl shadow-2xl flex items-start gap-4 border-l-4 border-red-500 min-w-[320px] relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

        <div className="p-2 bg-red-500/20 rounded-full text-red-500 animate-pulse mt-1">
            <AlertCircle className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold text-lg text-white leading-tight mb-1">Emergency Triggered</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            SOS Signal sent to emergency contacts with your live location.
          </p>
        </div>

        <button 
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white transition-colors"
        >
            <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};