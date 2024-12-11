import React, { useState } from 'react';
import { View, TextInput, ActivityIndicator, TouchableOpacity, Text, Keyboard } from 'react-native';
import MapView, { Marker } from "react-native-maps";

interface OffSiteMapProps {
  mapRef: React.RefObject<MapView>;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  offsiteLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  } | null;
  onMapPress: (event: any) => void;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  isSearching: boolean;
  searchResults: any[];
  onLocationSelect: (item: any) => void;
}

export const OffSiteMap: React.FC<OffSiteMapProps> = ({
  mapRef,
  region,
  offsiteLocation,
  onMapPress,
  searchQuery,
  onSearchChange,
  isSearching,
  searchResults,
  onLocationSelect,
}) => {
  const [showResults, setShowResults] = useState(true);

  const handleTextChange = (text: string) => {
    setShowResults(true);
    onSearchChange(text);
  };

  const handleSelectLocation = (item: any) => {
    setShowResults(false);
    Keyboard.dismiss();
    onLocationSelect(item);
  };

  return (
    <View className="p-4">
      <View className="mb-4 z-50">
        <TextInput
          className="h-12 px-4 bg-white rounded-lg shadow-sm"
          placeholder="Search location or drag marker on map"
          value={searchQuery}
          onChangeText={handleTextChange}
          returnKeyType="search"
          onFocus={() => setShowResults(true)}
        />
        
        {isSearching && (
          <ActivityIndicator className="mt-2" size="small" color="#4B5563" />
        )}

        {showResults && searchResults.length > 0 && (
          <View className="absolute top-12 left-0 right-0 bg-white rounded-lg shadow-lg z-50">
            {searchResults.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                className="p-4 border-b border-gray-200"
                onPress={() => handleSelectLocation(item)}
              >
                <Text className="text-gray-800 font-medium">{item.name}</Text>
                <Text className="text-gray-500 text-sm mt-1">{item.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View className="h-[300px] rounded-md overflow-hidden mb-4" style={{ elevation: 5 }}>
        <MapView
          ref={mapRef}
          style={{ width: "100%", height: "100%" }}
          region={region}
          onPress={onMapPress}
        >
          {offsiteLocation && (
            <Marker
              coordinate={{
                latitude: offsiteLocation.latitude,
                longitude: offsiteLocation.longitude,
              }}
              title="Selected Location"
              description={offsiteLocation.address || "Custom location"}
              pinColor="#0284c7"
              draggable
              onDragEnd={(e) => onMapPress(e)}
            />
          )}
        </MapView>
      </View>
    </View>
  );
}; 