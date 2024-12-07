import { useState, useEffect } from "react";
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
  let subscription: Location.LocationSubscription | null = null;

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setError("Permission to access location was denied");
          setLoading(false);
          return;
        }

        const position = await Location.getCurrentPositionAsync({});
        const formattedLocation: LocationObject = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
          altitude: position.coords.altitude,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
        };
        setLocation(formattedLocation);
        setLoading(false);

        // Start watching position
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000, // Update every 1 second
            distanceInterval: 1, // Update when the user moves 1 meter
          },
          (updatedPosition) => {
            const updatedLocation: LocationObject = {
              latitude: updatedPosition.coords.latitude,
              longitude: updatedPosition.coords.longitude,
              timestamp: updatedPosition.timestamp,
              altitude: updatedPosition.coords.altitude,
              accuracy: updatedPosition.coords.accuracy,
              heading: updatedPosition.coords.heading,
              speed: updatedPosition.coords.speed,
            };
            setLocation(updatedLocation);
          }
        );
      } catch (err) {
        setError("Failed to get location");
        setLoading(false);
      }
    };

    getCurrentLocation();

    return () => {
      // Cleanup subscription on unmount
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const refreshLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const position = await Location.getCurrentPositionAsync({});
      const refreshedLocation: LocationObject = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp,
        altitude: position.coords.altitude,
        accuracy: position.coords.accuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
      };
      setLocation(refreshedLocation);
      setLoading(false);
      return refreshedLocation;
    } catch (err) {
      setError("Failed to get location");
      setLoading(false);
      throw err;
    }
  };

  return { location, loading, error, refreshLocation };
};
