import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";

export interface LocationObject {
  latitude: number;
  longitude: number;
  timestamp: number;
  altitude?: number | null;
  accuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Return distance in kilometers
};

export const useLocation = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  const initializeLocation = async () => {
    try {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Permission to access location was denied");
        setLoading(false);
        return;
      }

      // Get initial position with high accuracy
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation
      });

      const initialLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp,
        altitude: position.coords.altitude,
        accuracy: position.coords.accuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
      };
      
      setLocation(initialLocation);
      setLoading(false);

      // Start watching position with high accuracy settings
      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 10000, // Update every second
          distanceInterval: 0.1, // Update every 0.1 meters
          mayShowUserSettingsDialog: true // Prompt user to enable high accuracy
        },
        (updatedPosition) => {
          // Only update if position has changed
          if (
            location?.latitude !== updatedPosition.coords.latitude ||
            location?.longitude !== updatedPosition.coords.longitude
          ) {
            const newLocation = {
              latitude: updatedPosition.coords.latitude,
              longitude: updatedPosition.coords.longitude,
              timestamp: updatedPosition.timestamp,
              altitude: updatedPosition.coords.altitude,
              accuracy: updatedPosition.coords.accuracy,
              heading: updatedPosition.coords.heading,
              speed: updatedPosition.coords.speed,
            };
            
            setLocation(newLocation);

            const targetLat = 34.122891;
            const targetLng = 74.841080;
            
            const distanceInMeters = Math.round(calculateDistance(
              newLocation.latitude,
              newLocation.longitude,
              targetLat,
              targetLng
            ) * 1000); // Convert km to meters
            
            console.log('Location Update:', {
              currentLocation: {
                lat: newLocation.latitude.toFixed(6),
                lng: newLocation.longitude.toFixed(6),
                accuracy: newLocation.accuracy
              },
              targetLocation: {
                lat: targetLat.toFixed(6),
                lng: targetLng.toFixed(6)
              },
              distance: `${distanceInMeters} meters`
            });

            if (distanceInMeters <= 200) {
              console.log(`Inside target zone - Distance: ${distanceInMeters} meters`);
            } else {
              console.log(`Outside target zone - Distance: ${distanceInMeters} meters`);
            }
          }
        }
      );
    } catch (err) {
      setError("Failed to get location");
      setLoading(false);
      console.error('Location Error:', err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    if (isMounted) {
      initializeLocation();
    }

    return () => {
      isMounted = false;
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
  }, []);

  return { location, loading, error, initializeLocation, calculateDistance };
};
