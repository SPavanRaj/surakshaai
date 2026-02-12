import { ActivityLog } from '../types';
import { getCurrentLocation, generateGoogleMapsLink } from './locationService';

/**
 * MOCK SOS SERVICE
 * 
 * This service is purely frontend-only to ensure the application works 
 * in production environments without a backend.
 * 
 * It simulates network latency and returns mock data.
 */

export const createEmergencyLog = async (type: ActivityLog['type']): Promise<ActivityLog> => {
  // Simulate network latency (800ms - 1.5s) to provide realistic UI feedback
  // This replaces actual fetch calls to /api endpoints
  const delay = 800 + Math.random() * 700;
  await new Promise(resolve => setTimeout(resolve, delay));

  // Get mock location data from local service
  const location = await getCurrentLocation();
  const mapsLink = generateGoogleMapsLink(location);
  
  // Construct the log entry locally
  const newLog: ActivityLog = {
    id: Date.now().toString(),
    type,
    timestamp: Date.now(),
    location: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
    details: `Alert triggered. Location tracked: ${location.address}. Map: ${mapsLink}`,
    resolved: false,
  };

  // Return the log object directly (mocking a successful 200 OK API response)
  return newLog;
};

// Mock function to simulate notifying contacts
export const simulateNotifyContacts = async (count: number): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`[MOCK SOS] Successfully notified ${count} contacts via simulated SMS gateway.`);
  return true;
};
