import { GeoLocation } from '../types';
import { MOCK_LOCATIONS } from '../utils/constants';

export const getCurrentLocation = async (): Promise<GeoLocation> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return random mock location for demo purposes
  const randomIndex = Math.floor(Math.random() * MOCK_LOCATIONS.length);
  return MOCK_LOCATIONS[randomIndex];
};

export const generateGoogleMapsLink = (location: GeoLocation): string => {
  return `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
};
