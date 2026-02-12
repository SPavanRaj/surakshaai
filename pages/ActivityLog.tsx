import React from 'react';
import { useSafety } from '../context/SafetyContext';
import { AlertCircle, Mic, Smartphone, BrainCircuit, CheckCircle2, Clock, MapPin } from 'lucide-react';

export const ActivityLogPage: React.FC = () => {
  const { logs } = useSafety();

  const getIcon = (type: string) => {
    switch (type) {
        case 'VOICE_TRIGGER': return <Mic className="w-4 h-4" />;
        case 'SHAKE_DETECTION': return <Smartphone className="w-4 h-4" />;
        case 'AI_PANIC': return <BrainCircuit className="w-4 h-4" />;
        default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getColors = (type: string) => {
     switch (type) {
        case 'VOICE_TRIGGER': return 'bg-blue-500 border-blue-400 text-blue-100';
        case 'SHAKE_DETECTION': return 'bg-orange-500 border-orange-400 text-orange-100';
        case 'AI_PANIC': return 'bg-purple-500 border-purple-400 text-purple-100';
        default: return 'bg-red-500 border-red-400 text-red-100';
     }
  };

  return (
    <div className="animate-slide-up max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
        <div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Security Audit Log</h2>
            <p className="text-slate-400 text-sm">Immutable blockchain-verified record of all security events.</p>
        </div>
        <div className="hidden sm:block text-right">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Events</p>
            <p className="text-3xl font-mono text-white">{logs.length.toString().padStart(2, '0')}</p>
        </div>
      </div>

      <div className="relative pl-8 space-y-8">
        {/* Timeline Vertical Line */}
        <div className="absolute left-3.5 top-2 bottom-0 w-0.5 bg-gradient-to-b from-slate-800 via-slate-800 to-transparent"></div>

        {logs.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800 ml-4">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-slate-400 font-medium">No activity recorded</p>
                <p className="text-xs text-slate-600 mt-1">System is monitoring in background</p>
            </div>
        ) : (
            logs.map((log, index) => (
                <div key={log.id} className="relative animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[34px] top-6 w-7 h-7 rounded-full border-4 border-slate-950 flex items-center justify-center z-10 ${getColors(log.type).split(' ')[0]}`}>
                        {log.resolved && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>

                    {/* Card */}
                    <div className="glass-card rounded-2xl p-6 hover:bg-slate-800/50 transition-colors border border-white/5 group">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 p-3 rounded-xl border shadow-lg ${getColors(log.type)} bg-opacity-20 border-opacity-30`}>
                                    {getIcon(log.type)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="font-bold text-white text-lg">
                                            {log.type.replace('_', ' ')}
                                        </h4>
                                        {!log.resolved && (
                                            <span className="bg-red-500/10 text-red-500 text-[10px] px-2 py-0.5 rounded border border-red-500/20 uppercase font-bold tracking-wider animate-pulse">
                                                Active Threat
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-3 max-w-lg">{log.details}</p>
                                    
                                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3" />
                                            {new Date(log.timestamp).toLocaleTimeString()}
                                        </span>
                                        <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                        <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2 pl-4 md:border-l border-white/5">
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center justify-end gap-1">
                                        <MapPin className="w-3 h-3" /> Location Coords
                                    </p>
                                    <p className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                                        {log.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};