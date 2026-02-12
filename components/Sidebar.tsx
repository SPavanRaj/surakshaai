import React from 'react';
import { LayoutDashboard, Map, Users, History, Settings, Activity, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'routes', label: 'Smart Routes', icon: Map },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'activity', label: 'Activity Log', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-20 left-0 h-[calc(100vh-5rem)] w-72 bg-slate-950/80 backdrop-blur-xl border-r border-white/5 z-50
        transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full py-6 px-4">
          
          <div className="mb-2 px-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Navigation</h3>
          </div>

          <div className="space-y-2 flex-1">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onChangeView(item.id);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`
                    group w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 border border-transparent
                    ${isActive 
                      ? 'bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-l-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.1)]' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white hover:pl-5'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-red-500' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    {item.label}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-red-500" />}
                </button>
              );
            })}
          </div>

          {/* System Status Card */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-emerald-500/50 rounded-full animate-ping"></div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">System Status</p>
                  <p className="text-sm font-bold text-emerald-400">Online & Secure</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};