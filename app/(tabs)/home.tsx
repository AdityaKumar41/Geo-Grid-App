import React, { useState } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { Header } from "../../components/Header";
import { DateSelector } from "../../components/DataSelector";
import { AttendanceSection } from "../../components/AttendanceSection";
import { TaskSection } from "../../components/TaskSection";
import { useLocation } from "../../hooks/useLocations";

// Add default location
const defaultLocation = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const Home: React.FC = () => {
  const { location, loading, error, refreshLocation } = useLocation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshLocation().finally(() => {
      setRefreshing(false);
    });
  }, []);

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
      <View className="flex-1 bg-slate-100 mt-2">
        <ScrollView className="max-w-[480px] mx-auto w-full">
          {location && !error && (
            <View
              className="h-[300px] rounded-md overflow-hidden m-4"
              style={{ elevation: 5 }}
            >
              <MapView
                style={{ width: "100%", height: "100%" }}
                initialRegion={{
                  latitude: location?.latitude || defaultLocation.latitude,
                  longitude: location.longitude || defaultLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
              >
                {location && (
                  <Marker
                    centerOffset={{ x: 0, y: -20 }}
                    coordinate={{
                      latitude: location.latitude || 0,
                      longitude: location.longitude || 0,
                    }}
                    title="Your Location"
                    description="You are here"
                    pinColor="#0284c7"
                  />
                )}
              </MapView>
            </View>
          )}
          <DateSelector />
          <AttendanceSection />

          <View className="space-y-4 p-4">
            <TaskSection />
            <TaskSection />
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View className="flex-1 ">
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
    </View>
  );
};

export default Home;
