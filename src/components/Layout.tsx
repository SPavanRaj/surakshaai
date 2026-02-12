import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Toast } from './Toast';
import { useSafety } from '../context/SafetyContext';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onChangeView: (view: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { status } = useSafety();
  const isDanger = status === 'DANGER';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-red-500/30">
      {/* Emergency Flash Overlay */}
      <div 
        className={`fixed inset-0 z-[60] pointer-events-none transition-opacity duration-1000 ${isDanger ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 bg-red-600/10 animate-pulse"></div>
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-red-600/20 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-red-600/20 to-transparent"></div>
      </div>

      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex pt-20 h-screen overflow-hidden">
        <Sidebar 
          currentView={currentView}
          onChangeView={onChangeView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 ml-0 lg:ml-72 relative scroll-smooth no-scrollbar">
          <div className="max-w-7xl mx-auto pb-24 lg:pb-8">
            <div key={currentView} className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>

      <Toast />
    </div>
  );
};
