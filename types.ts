export interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface ActivityLog {
  id: string;
  type: 'SOS_BUTTON' | 'VOICE_TRIGGER' | 'SHAKE_DETECTION' | 'AI_PANIC';
  timestamp: number;
  location: string; // e.g., "12.9716° N, 77.5946° E"
  details: string;
  resolved: boolean;
}

export enum SafetyStatus {
  SAFE = 'SAFE',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
}

export interface AppSettings {
  stealthMode: boolean;
  theme: 'dark' | 'light';
  language: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  address?: string;
}
