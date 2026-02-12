import React, { useState, useEffect } from 'react';
import { SOSButton } from '../components/SOSButton';
import { useSafety } from '../context/SafetyContext';
import { analyzeVoiceInput, predictEmotion } from '../services/aiService';
import { Mic, Smartphone, BrainCircuit, Activity, HeartPulse, Wifi, Battery } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// Mock data for the AI confidence chart
const generateChartData = () => 
  Array.from({ length: 30 }, (_, i) => ({
    time: i,
    value: 20 + Math.random() * 30
  }));

export const Dashboard: React.FC = () => {
  const { triggerSOS, status } = useSafety();
  const [voiceText, setVoiceText] = useState('');
  const [emotion, setEmotion] = useState('Calm');
  const [isShaking, setIsShaking] = useState(false);
  const [chartData, setChartData] = useState(generateChartData());
  const [aiConfidence, setAiConfidence] = useState(98);

  // Update chart data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1), { time: Date.now(), value: 20 + Math.random() * 30 + (status === 'DANGER' ? 40 : 0) }];
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  const handleVoiceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setVoiceText(text);
    const analysis = analyzeVoiceInput(text);
    if (analysis.triggered) {
      triggerSOS('VOICE_TRIGGER');
      setAiConfidence(Math.round(analysis.confidence * 100));
    }
  };

  const handleEmotionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setEmotion(selected);
    const prediction = predictEmotion(selected);
    if (prediction.isPanic) {
      triggerSOS('AI_PANIC');
      setAiConfidence(Math.round(prediction.score * 100));
    } else {
        setAiConfidence(95 + Math.floor(Math.random() * 4));
    }
  };

  const handleShakeSimulation = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    triggerSOS('SHAKE_DETECTION');
  };

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-5 rounded-2xl relative overflow-hidden group hover:border-red-500/30 transition-all duration-300">
              <div className="absolute right-0 top-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-red-500/10 transition-colors"></div>
              <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-red-500/10 rounded-xl text-red-500 group-hover:scale-110 transition-transform">
                      <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">User Biometrics</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-white tabular-nums">{status === 'DANGER' ? '124' : '72'}</p>
                        <span className="text-xs font-bold text-slate-500">BPM</span>
                      </div>
                  </div>
              </div>
          </div>

          <div className="glass-card p-5 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
              <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-colors"></div>
              <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
                      <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">AI Confidence</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-white tabular-nums">{aiConfidence}%</p>
                        <span className="text-xs font-bold text-emerald-500">Optimal</span>
                      </div>
                  </div>
              </div>
          </div>

          <div className="glass-card p-5 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
              <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-500/10 transition-colors"></div>
              <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500 group-hover:scale-110 transition-transform">
                      <Wifi className="w-6 h-6" />
                  </div>
                  <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Connectivity</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-white">5G</p>
                        <span className="text-xs font-bold text-slate-500">GPS Active</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Main SOS Panel */}
        <div className="xl:col-span-8 order-2 xl:order-1">
            <div className="glass-panel border border-white/5 rounded-3xl p-8 flex items-center justify-center min-h-[500px] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 to-slate-950/80"></div>
                <div className="relative z-10">
                  <SOSButton />
                </div>
                
                {/* Decorative corners */}
                <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-white/10 rounded-tl-xl"></div>
                <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-white/10 rounded-tr-xl"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-white/10 rounded-bl-xl"></div>
                <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-white/10 rounded-br-xl"></div>
            </div>
        </div>

        {/* Simulation Controls Sidebar */}
        <div className="xl:col-span-4 order-1 xl:order-2 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Simulation Controls</h3>
                
                <div className="space-y-6">
                    {/* Shake Simulation */}
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <Smartphone className="w-4 h-4 text-red-500" />
                            <h4 className="text-sm font-semibold text-slate-200">Shake Detection</h4>
                        </div>
                        <button
                            onClick={handleShakeSimulation}
                            className={`w-full py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all ${
                                isShaking 
                                ? 'bg-red-600 text-white animate-shake shadow-lg shadow-red-900/40' 
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                        >
                            {isShaking ? 'DETECTING IMPACT...' : 'SIMULATE FALL'}
                        </button>
                    </div>

                    {/* Voice Activation */}
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <Mic className="w-4 h-4 text-blue-500" />
                            <h4 className="text-sm font-semibold text-slate-200">Voice Recognition</h4>
                        </div>
                        <div className="relative">
                          <input 
                              type="text" 
                              value={voiceText}
                              onChange={handleVoiceInput}
                              placeholder="Type 'help'..."
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                          />
                          <div className="absolute right-3 top-2.5">
                            <span className="flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                          </div>
                        </div>
                    </div>

                    {/* Emotion AI */}
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <BrainCircuit className="w-4 h-4 text-purple-500" />
                            <h4 className="text-sm font-semibold text-slate-200">Emotion Analysis</h4>
                        </div>
                        <select 
                            value={emotion}
                            onChange={handleEmotionChange}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 mb-4"
                        >
                            <option value="Calm">State: Calm</option>
                            <option value="Fear">State: Fear</option>
                            <option value="Panic">State: Panic</option>
                        </select>

                        <div className="h-24 w-full bg-slate-950 rounded-lg overflow-hidden relative border border-white/5">
                            <div className="absolute top-2 left-3 z-10">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Stress Index</span>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Area 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke="#dc2626" 
                                        strokeWidth={2}
                                        fillOpacity={1} 
                                        fill="url(#colorValue)" 
                                        isAnimationActive={false}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};