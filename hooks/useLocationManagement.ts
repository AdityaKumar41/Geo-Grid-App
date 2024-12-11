import { useState, useRef } from 'react';
import { Alert } from 'react-native';

type TimeoutHandle = ReturnType<typeof setTimeout>;

interface LocationState {
  latitude: number;
  longitude: number;
  address?: string;
}

export const useLocationManagement = (initialRegion: { latitude: number; longitude: number }) => {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimeout = useRef<TimeoutHandle>();

  const searchLocation = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&limit=5&addressdetails=1&countrycodes=in`,
        {
          headers: {
            'User-Agent': 'AttendanceApp/1.0',
            'Accept-Language': 'en'
          }
        }
      );
      
      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      
      const formattedResults = data.map((item: any) => ({
        id: item.place_id,
        name: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        type: item.type,
        importance: item.importance
      }));

      setSearchResults(formattedResults);
    } catch (error) {
      console.error('Error searching location:', error);
      Alert.alert('Search Error', 'Failed to search location. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    if (text.length >= 3) {
      debounceTimeout.current = setTimeout(() => {
        searchLocation(text);
      }, 800);
    } else {
      setSearchResults([]);
    }
  };

  const handleLocationSelect = (item: any) => {
    const newLocation = {
      latitude: parseFloat(item.latitude || item.lat),
      longitude: parseFloat(item.longitude || item.lon),
      address: item.name || item.display_name,
    };
    
    setLocation(newLocation);
    setSearchResults([]);
    setSearchQuery('');
    
    // Return the new location for immediate use
    return newLocation;
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    
    // Set location from map press
    setLocation({
      latitude,
      longitude,
      address: 'Selected location'
    });

    // Reverse geocode to get address
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    )
      .then(response => response.json())
      .then(data => {
        if (data.display_name) {
          setLocation(prev => ({
            ...prev!,
            address: data.display_name
          }));
        }
      })
      .catch(error => console.error('Reverse geocoding error:', error));
  };

  return {
    location,
    setLocation,
    searchQuery,
    searchResults,
    isSearching,
    handleSearchChange,
    handleLocationSelect,
    handleMapPress,
  };
}; 