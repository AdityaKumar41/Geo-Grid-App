import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { LocationObject } from '../hooks/useLocations';

interface OnSiteMapProps {
  location: LocationObject | null;
  mapRef: React.RefObject<MapView>;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  targetLocation: {
    latitude: number;
    longitude: number;
  };
}

export const OnSiteMap: React.FC<OnSiteMapProps> = ({
  location,
  mapRef,
  region,
  targetLocation,
}) => {
  if (!location) return null;

  return (
    <View className="h-[300px] rounded-md overflow-hidden m-4" style={{ elevation: 5 }}>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker
          coordinate={targetLocation}
          title="Target Location"
          description="Destination"
          pinColor="red"
        />
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Your Location"
          description={`${Math.round(location.accuracy || 0)}m accuracy`}
          pinColor="#0284c7"
        />
      </MapView>
    </View>
  );
}; 