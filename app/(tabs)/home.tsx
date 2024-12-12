import React, { useState , useRef , useEffect } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { Header } from "../../components/Header";
import { DateSelector } from "../../components/DataSelector";
import { AttendanceSection } from "../../components/AttendanceSection";
import { AttendanceHistory } from "../../components/TaskSection";
import { useLocation, calculateDistance } from "../../hooks/useLocations";
import Geocoding from 'react-native-geocoding';
import { nanoid } from 'nanoid/non-secure';
import 'react-native-get-random-values';
import { useAttendancePairs } from '../../hooks/useAttendancePair';

// Update the region state type
interface RegionType {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

// Add this type declaration
type TimeoutHandle = ReturnType<typeof setTimeout>;

// Replace TARGET_LOCATIONS with a single office location
const OFFICE_LOCATION = {
  latitude: 34.122891,
  longitude: 74.841080,
  name: 'Office Location',
};

const Home: React.FC = () => {
  const { location, loading, error, initializeLocation } = useLocation();
  const [refreshing, setRefreshing] = useState(false);
  const [region, setRegion] = useState<RegionType>({
    latitude: OFFICE_LOCATION.latitude,
    longitude: OFFICE_LOCATION.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const mapRef = useRef<MapView>(null);
  const [activeTab, setActiveTab] = useState<'onsite' | 'offsite'>('onsite');
  const [offsiteLocation, setOffsiteLocation] = useState<{
    latitude: number;
    longitude: number;
    address?: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimeout = useRef<TimeoutHandle>();
  const [destinationMarker, setDestinationMarker] = useState<{
    latitude: number;
    longitude: number;
    address?: string;
  } | null>(null);
  const { 
    isInside, 
    currentPair, 
    todayPairs, 
    totalDuration,
    status 
  } = useAttendancePairs();

  useEffect(() => {
    if (location && activeTab === 'onsite') {
      const newRegion: RegionType = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  }, [location, activeTab]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    initializeLocation().finally(() => {
      setRefreshing(false);
    });
  }, []);

  // Tab switcher component
  const TabSwitcher = () => (
    <View className="flex-row bg-white mx-4 mt-4 rounded-lg p-1" style={{ elevation: 2 }}>
      <TouchableOpacity 
        onPress={() => setActiveTab('onsite')}
        className={`flex-1 py-2 rounded-md ${activeTab === 'onsite' ? 'bg-blue-600' : ''}`}
      >
        <Text 
          className={`text-center font-medium ${
            activeTab === 'onsite' ? 'text-white' : 'text-gray-600'
          }`}
          style={{ fontFamily: 'Poppins-Medium' }}
        >
          Onsite
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => setActiveTab('offsite')}
        className={`flex-1 py-2 rounded-md ${activeTab === 'offsite' ? 'bg-blue-600' : ''}`}
      >
        <Text 
          className={`text-center font-medium ${
            activeTab === 'offsite' ? 'text-white' : 'text-gray-600'
          }`}
          style={{ fontFamily: 'Poppins-Medium' }}
        >
          Offsite
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Update handleMapPress function
  const handleMapPress = async (event: {
    nativeEvent: {
      coordinate: {
        latitude: number;
        longitude: number;
      };
    };
  }) => {
    if (activeTab === 'offsite') {
      const { coordinate } = event.nativeEvent;
      
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${coordinate.latitude}&lon=${coordinate.longitude}&format=json`
        );
        const data = await response.json();
        const address = data.display_name || 'Location address not found';

        // Update the region
        const newRegion = {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        
        setRegion(newRegion);
        setOffsiteLocation({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          address: address
        });

        // Calculate distance from office
        const distanceInMeters = calculateDistance(
          coordinate.latitude,
          coordinate.longitude,
          OFFICE_LOCATION.latitude,
          OFFICE_LOCATION.longitude
        ) * 1000;

        if (distanceInMeters > 200) {
          Alert.alert(
            'Warning',
            `This location is ${Math.round(distanceInMeters)}m from the office. Maximum allowed distance is 200m.`
          );
        }
      } catch (error) {
        console.error('Error setting location:', error);
        Alert.alert('Error', 'Failed to set location. Please try again.');
      }
    }
  };

  // Update handleOffsiteSubmit with more detailed logging
  const handleOffsiteSubmit = async () => {
    if (!offsiteLocation) {
      Alert.alert('Error', 'Please select a location first');
      return;
    }

    try {
      const distanceInMeters = calculateDistance(
        offsiteLocation.latitude,
        offsiteLocation.longitude,
        OFFICE_LOCATION.latitude,
        OFFICE_LOCATION.longitude
      ) * 1000; // Convert km to meters

      // Check if within 200 meters radius
      if (distanceInMeters > 200) {
        Alert.alert(
          'Location Too Far',
          `You are ${Math.round(distanceInMeters)}m away from office. Maximum allowed distance is 200m.`
        );
        return;
      }

      const offsiteData = {
        id: nanoid(),
        timestamp: new Date().toISOString(),
        type: 'offsite',
        officeLocation: OFFICE_LOCATION,
        offsiteLocation: {
          latitude: offsiteLocation.latitude,
          longitude: offsiteLocation.longitude,
          address: offsiteLocation.address || 'Custom location'
        },
        distanceFromOffice: {
          meters: Math.round(distanceInMeters),
          kilometers: (distanceInMeters / 1000).toFixed(2)
        }
      };

      console.log('Offsite attendance details:', JSON.stringify(offsiteData, null, 2));
      setOffsiteLocation(null);
      Alert.alert('Success', 'Offsite attendance recorded successfully');
    } catch (error) {
      console.error('Error recording offsite attendance:', error);
      Alert.alert('Error', 'Failed to record offsite attendance');
    }
  };

  // Add these utility functions at the top
  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return 'Location address not found';
    }
  };

  // Update the search functionality
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

  // Update handleLocationSelect to set initial marker
  const handleLocationSelect = (item: any) => {
    const newLocation = {
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      address: item.display_name,
    };
    
    const newRegion = {
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    
    // Set both region and initial marker position
    setRegion(newRegion);
    setOffsiteLocation(newLocation);
    mapRef.current?.animateToRegion(newRegion, 1000);
    setSearchResults([]); 
    setSearchQuery(item.display_name);
    Alert.alert(
      'Location Selected',
      'You can tap anywhere on the map or drag the marker to adjust the location',
      [{ text: 'OK' }]
    );
  };

  // Update the map rendering in renderContent
  const renderMap = () => {
    if (activeTab === 'onsite') {
      return (
        <MapView
          ref={mapRef}
          style={{ width: "100%", height: "100%" }}
          region={region}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Marker
            coordinate={OFFICE_LOCATION}
            title="Office Location"
            description="Main Office"
            pinColor="red"
          />
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location"
              description={`${Math.round(location.accuracy || 0)}m accuracy`}
              pinColor="#0284c7"
            />
          )}
        </MapView>
      );
    } else {
      return (
        <MapView
          ref={mapRef}
          style={{ width: "100%", height: "100%" }}
          region={region}
          onPress={handleMapPress}
          onLongPress={handleMapLongPress}
          showsUserLocation={true}
        >
          <Marker
            coordinate={OFFICE_LOCATION}
            title="Office Location"
            description="Main Office"
            pinColor="red"
          />
          
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Current Location"
              description={`${Math.round(location.accuracy || 0)}m accuracy`}
              pinColor="#22c55e"
            />
          )}
          
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
              onDragEnd={(e) => handleMapPress(e)}
            />
          )}

          {destinationMarker && (
            <Marker
              coordinate={{
                latitude: destinationMarker.latitude,
                longitude: destinationMarker.longitude,
              }}
              title="Destination"
              description={destinationMarker.address || "Where you need to go"}
              pinColor="#f59e0b"
            />
          )}
        </MapView>
      );
    }
  };

  // Update the SearchBar component
  const SearchBar = () => {
    const [showResults, setShowResults] = useState(true);

    const handleTextChange = (text: string) => {
      setSearchQuery(text);
      
      // Clear any existing timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      
      // Only search if text length is 3 or more
      if (text.length >= 3) {
        // Reduced timeout from 5000ms to 800ms for better responsiveness
        debounceTimeout.current = setTimeout(() => {
          searchLocation(text);
        }, 800); // Changed from 5000 to 800
      } else {
        setSearchResults([]);
      }
    };

    return (
      <View className="mb-4 z-50">
        <TextInput
          className="h-12 px-4 bg-white rounded-lg shadow-sm"
          placeholder="Search location to center the map"
          value={searchQuery}
          onChangeText={handleTextChange}
          onFocus={() => setShowResults(true)}
          autoCorrect={false}
          autoCapitalize="none"
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
                onPress={() => {
                  handleLocationSelect({
                    lat: item.latitude,
                    lon: item.longitude,
                    display_name: item.name
                  });
                  setShowResults(false);
                  // Keyboard.dismiss();
                }}
              >
                <Text className="text-gray-800 font-medium">{item.name}</Text>
                <Text className="text-gray-500 text-sm mt-1">{item.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  // Update the map view in renderContent
  const renderContent = () => {
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#a855f7" />
          <Text className="mt-2 text-gray-600">Getting your location...</Text>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-slate-100">
        <View className="max-w-[480px] mx-auto w-full">
          <TabSwitcher />
          <View className="px-4 mt-4">
            {/* No LocationSelector component needed */}
          </View>
          
          {activeTab === 'onsite' ? (
            <>
              <View
                className="h-[300px] rounded-md overflow-hidden m-4"
                style={{ elevation: 5 }}
              >
                {renderMap()}
              </View>
              <DateSelector />
              <AttendanceSection 
                isWithinRange={isInside}
                currentPair={currentPair}
                todayPairs={todayPairs}
                totalDuration={totalDuration}
                status={status}
              />
              <View className="space-y-4 p-4">
                <AttendanceHistory pairs={todayPairs} />
              </View>
            </>
          ) : (
            <View className="p-4">
              <SearchBar />
              <View className="h-[300px] rounded-md overflow-hidden mb-4" style={{ elevation: 5 }}>
                {renderMap()}
              </View>
              <DateSelector />
              <AttendanceSection 
                isWithinRange={isInside}
                currentPair={currentPair}
                todayPairs={todayPairs}
                totalDuration={totalDuration}
                status={status}
              />
              <View className="space-y-4 mt-4">
                <AttendanceHistory pairs={todayPairs} />
              </View>

              <TouchableOpacity
                onPress={handleOffsiteSubmit}
                disabled={!offsiteLocation}
                className={`mt-4 p-4 rounded-lg ${
                  offsiteLocation ? 'bg-blue-600' : 'bg-gray-400'
                }`}
              >
                <Text className="text-white text-center font-medium">
                  Record Offsite Attendance
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  // Add function to handle long press for setting destination
  const handleMapLongPress = async (event: {
    nativeEvent: {
      coordinate: {
        latitude: number;
        longitude: number;
      };
    };
  }) => {
    const { coordinate } = event.nativeEvent;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${coordinate.latitude}&lon=${coordinate.longitude}&format=json`
      );
      const data = await response.json();
      const address = data.display_name || 'Location address not found';

      setDestinationMarker({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        address: address
      });

      Alert.alert(
        'Destination Set',
        'This marker shows where you need to go',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error setting destination:', error);
      Alert.alert('Error', 'Failed to set destination. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]}
            tintColor="#689F38"
          />
        }
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;