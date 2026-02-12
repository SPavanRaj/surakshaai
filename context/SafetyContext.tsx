import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Contact, ActivityLog, AppSettings, SafetyStatus } from '../types';
import { INITIAL_CONTACTS } from '../utils/constants';
import { createEmergencyLog } from '../services/sosService';

interface SafetyContextType {
  status: SafetyStatus;
  contacts: Contact[];
  logs: ActivityLog[];
  settings: AppSettings;
  triggerSOS: (type: ActivityLog['type']) => Promise<void>;
  resolveSOS: () => void;
  addContact: (contact: Contact) => void;
  removeContact: (id: string) => void;
  toggleStealthMode: () => void;
  toggleTheme: () => void;
  resetData: () => void;
}

const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

export const SafetyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<SafetyStatus>(SafetyStatus.SAFE);
  
  // Safe initialization for contacts
  const [contacts, setContacts] = useState<Contact[]>(() => {
    if (typeof window === 'undefined') return INITIAL_CONTACTS;
    try {
      const saved = localStorage.getItem('suraksha_contacts');
      return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
    } catch (e) {
      console.warn('Failed to parse contacts from local storage', e);
      return INITIAL_CONTACTS;
    }
  });

  // Safe initialization for logs
  const [logs, setLogs] = useState<ActivityLog[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('suraksha_logs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to parse logs from local storage', e);
      return [];
    }
  });

  const [settings, setSettings] = useState<AppSettings>({
    stealthMode: false,
    theme: 'dark',
    language: 'en'
  });

  // Effects for persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('suraksha_contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('suraksha_logs', JSON.stringify(logs));
    }
  }, [logs]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [settings.theme]);

  const triggerSOS = async (type: ActivityLog['type']) => {
    setStatus(SafetyStatus.DANGER);
    try {
      // Call mock service
      const newLog = await createEmergencyLog(type);
      setLogs(prev => [newLog, ...prev]);
      
      if (!settings.stealthMode) {
        // Safe vibration check
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([500, 200, 500]);
        }
      }
    } catch (error) {
      console.error("Failed to create log", error);
      // Even if logging fails, ensure UI shows danger
      setStatus(SafetyStatus.DANGER);
    }
  };

  const resolveSOS = () => {
    setStatus(SafetyStatus.SAFE);
  };

  const addContact = (contact: Contact) => {
    setContacts(prev => [...prev, contact]);
  };

  const removeContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const toggleStealthMode = () => {
    setSettings(prev => ({ ...prev, stealthMode: !prev.stealthMode }));
  };

  const toggleTheme = () => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  const resetData = () => {
    setContacts(INITIAL_CONTACTS);
    setLogs([]);
    setStatus(SafetyStatus.SAFE);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('suraksha_contacts');
      localStorage.removeItem('suraksha_logs');
    }
  };

  return (
    <SafetyContext.Provider value={{
      status,
      contacts,
      logs,
      settings,
      triggerSOS,
      resolveSOS,
      addContact,
      removeContact,
      toggleStealthMode,
      toggleTheme,
      resetData
    }}>
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (context === undefined) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};
