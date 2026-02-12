import { ActivityLog, GeoLocation } from '../types';
import { getCurrentLocation, generateGoogleMapsLink } from './locationService';

export const createEmergencyLog = async (type: ActivityLog['type']): Promise<ActivityLog> => {
  const location = await getCurrentLocation();
  const mapsLink = generateGoogleMapsLink(location);
  
  return {
    id: Date.now().toString(),
    type,
    timestamp: Date.now(),
    location: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
    details: `Alert triggered. Location tracked: ${location.address}. Map: ${mapsLink}`,
    resolved: false,
  };
};
