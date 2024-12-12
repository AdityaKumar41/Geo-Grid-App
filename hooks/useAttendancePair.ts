import { useState, useEffect } from 'react';
import { calculateDistance, useLocation } from './useLocations';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AttendancePair {
  id: string;
  checkIn: {
    timestamp: string;
    location: {
      latitude: number;
      longitude: number;
      accuracy: number | null | undefined;
    };
    distance: number;
  };
  checkOut?: {
    timestamp: string;
    location: {
      latitude: number;
      longitude: number;
      accuracy: number | null | undefined;
    };
    distance: number;
  };
  duration?: number; // Duration in minutes
}

const STORAGE_KEY = 'attendance_pairs';
const TARGET_LOCATION = {
  latitude: 34.122891,
  longitude: 74.841080,
  radius: 200 // meters
};

export const useAttendancePairs = () => {
  const { location, distance, previousDistance } = useLocation();
  const [isInside, setIsInside] = useState(false);
  const [attendancePairs, setAttendancePairs] = useState<AttendancePair[]>([]);
  const [lastStatusChange, setLastStatusChange] = useState<Date | null>(null);
  const GEOFENCE_RADIUS = 200;

  // console.log('attendancePairs', attendancePairs);

  // Load saved attendance pairs on mount
  useEffect(() => {
    loadAttendancePairs();
  }, []);

  // Save attendance pairs whenever they change
  useEffect(() => {
    saveAttendancePairs();
  }, [attendancePairs]);

  // Add geofence exit handler
  useEffect(() => {
    if (distance > GEOFENCE_RADIUS && previousDistance <= GEOFENCE_RADIUS) {
      console.log('Triggering auto checkout - Distance changed from:', previousDistance, 'to:', distance);
      handleAutoCheckOut();
    }
  }, [distance, previousDistance]);

  const loadAttendancePairs = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAttendancePairs(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading attendance pairs:', error);
    }
  };

  const saveAttendancePairs = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(attendancePairs));
    } catch (error) {
      console.error('Error saving attendance pairs:', error);
    }
  };

  const calculateDuration = (checkIn: string, checkOut: string): number => {
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    return Math.round((end - start) / (1000 * 60)); // Duration in minutes
  };

  useEffect(() => {
    if (!location) return;

    const distanceInMeters = Math.round(
      calculateDistance(
        location.latitude,
        location.longitude,
        TARGET_LOCATION.latitude,
        TARGET_LOCATION.longitude
      ) * 1000
    );

    const currentlyInside = distanceInMeters <= TARGET_LOCATION.radius;

    // Only update if status has actually changed
    if (currentlyInside !== isInside) {
      const lastPair = attendancePairs[attendancePairs.length - 1];
      
      if (currentlyInside) {
        // Only create new check-in if there's no active check-in
        if (!lastPair || lastPair.checkOut) {
          const newPair: AttendancePair = {
            id: Date.now().toString(),
            checkIn: {
              timestamp: new Date().toISOString(),
              location: {
                latitude: location.latitude,
                longitude: location.longitude,
                accuracy: location.accuracy
              },
              distance: distanceInMeters
            }
          };
          setAttendancePairs(prev => [...prev, newPair]);
          console.log('New Check-in recorded:', newPair);
        }
      } else {
        // Only add check-out if there's an active check-in without checkout
        if (lastPair && !lastPair.checkOut) {
          const checkOutTime = new Date().toISOString();
          const updatedPair = {
            ...lastPair,
            checkOut: {
              timestamp: checkOutTime,
              location: {
                latitude: location.latitude,
                longitude: location.longitude,
                accuracy: location.accuracy
              },
              distance: distanceInMeters
            },
            duration: calculateDuration(lastPair.checkIn.timestamp, checkOutTime)
          };
          setAttendancePairs(prev => [...prev.slice(0, -1), updatedPair]);
          console.log('Check-out recorded:', updatedPair);
        }
      }
      
      setIsInside(currentlyInside);
      setLastStatusChange(new Date());
    }
  }, [location]);

  const getTodayPairs = () => {
    const today = new Date().toDateString();
    return attendancePairs.filter(pair => 
      new Date(pair.checkIn.timestamp).toDateString() === today
    );
  };

  const getTotalDuration = () => {
    return attendancePairs.reduce((total, pair) => {
      return total + (pair.duration || 0);
    }, 0);
  };

  const getLastPair = () => {
    return attendancePairs[attendancePairs.length - 1];
  };

  const handleCheckOut = async () => {
    // Add checkout logic here
    const checkOutData = {
      timestamp: new Date(),
      // ... other checkout data
    };
    
    // Update the current pair with checkout data
    // Update storage/database
  };

  const handleAutoCheckOut = () => {
    const lastPair = getLastPair();
    if (lastPair && !lastPair.checkOut && location) {
      const checkOutTime = new Date().toISOString();
      const updatedPair = {
        ...lastPair,
        checkOut: {
          timestamp: checkOutTime,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
            accuracy: location.accuracy
          },
          distance: distance
        },
        duration: calculateDuration(lastPair.checkIn.timestamp, checkOutTime)
      };
      setAttendancePairs(prev => [...prev.slice(0, -1), updatedPair]);
      console.log('Automatic Check-out recorded:', updatedPair);
    } else {
      console.log('Auto checkout not performed:', {
        hasLastPair: !!lastPair,
        hasCheckout: lastPair?.checkOut,
        hasLocation: !!location
      });
    }
  };

  return {
    isInside,
    attendancePairs,
    currentPair: getLastPair(),
    todayPairs: getTodayPairs(),
    totalDuration: getTotalDuration(),
    status: {
      isCheckedIn: isInside,
      lastChange: lastStatusChange,
      currentDistance: distance || null
    },
    handleAutoCheckOut
  };
};