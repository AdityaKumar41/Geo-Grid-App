import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";

// Extended LocationObject Interface
export interface LocationObject {
  latitude: number;
  longitude: number;
  timestamp: number; // Add timestamp property
  altitude?: number | null;
  accuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  const initializeLocation = async () => {
    try {
      // Clear existing subscription if any
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Permission to access location was denied");
        setLoading(false);
        return;
      }

      // Get initial position
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp,
        altitude: position.coords.altitude,
        accuracy: position.coords.accuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
      });
      setLoading(false);

      // Start watching position
      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (updatedPosition) => {
          setLocation({
            latitude: updatedPosition.coords.latitude,
            longitude: updatedPosition.coords.longitude,
            timestamp: updatedPosition.timestamp,
            altitude: updatedPosition.coords.altitude,
            accuracy: updatedPosition.coords.accuracy,
            heading: updatedPosition.coords.heading,
            speed: updatedPosition.coords.speed,
          });
        }
      );
    } catch (err) {
      setError("Failed to get location");
      setLoading(false);
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

  return { location, loading, error, initializeLocation };
};
