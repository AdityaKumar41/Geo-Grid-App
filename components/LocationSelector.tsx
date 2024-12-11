import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface LocationSelectorProps {
  locations: Array<{
    id: string;
    name: string;
  }>;
  selectedId: string;
  onSelect: (id: string) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  locations,
  selectedId,
  onSelect,
}) => {
  return (
    <View className="flex-row flex-wrap gap-2">
      {locations.map((location) => (
        <TouchableOpacity
          key={location.id}
          onPress={() => onSelect(location.id)}
          className={`px-4 py-2 rounded-full ${
            selectedId === location.id ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <Text
            className={`text-sm ${
              selectedId === location.id ? 'text-white' : 'text-gray-700'
            }`}
          >
            {location.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}; 