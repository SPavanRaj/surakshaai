import { Contact } from '../types';

export const INITIAL_CONTACTS: Contact[] = [
  { id: '1', name: 'Mom', phone: '+1 234 567 8900', relation: 'Parent' },
  { id: '2', name: 'Dad', phone: '+1 987 654 3210', relation: 'Parent' },
  { id: '3', name: 'Emergency Services', phone: '911', relation: 'Emergency' },
];

export const MOCK_LOCATIONS = [
  { lat: 40.7128, lng: -74.0060, address: "New York, NY" },
  { lat: 34.0522, lng: -118.2437, address: "Los Angeles, CA" },
  { lat: 51.5074, lng: -0.1278, address: "London, UK" },
  { lat: 35.6762, lng: 139.6503, address: "Tokyo, JP" }
];

export const VOICE_KEYWORDS = ['help', 'danger', 'save me', 'emergency', 'stop'];
