import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { IconHome, IconHistory, IconUser } from "@tabler/icons-react-native";
import { Header } from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({
  focused,
  name,
  Icon,
  color,
}: {
  focused: boolean;
  name: string;
  color: string;
  Icon: React.ComponentType<any>;
}) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 60, // Ensure fixed width to prevent wrapping
        height: 60,
      }}
    >
      <Icon size={24} color={focused ? color : "#888888"} />
      <Text
        style={{
          color: focused ? color : "#888888",
          fontSize: 12,
          fontFamily: "Poppins-Regular",
          marginTop: 4,
          textAlign: "center",
          flexShrink: 1, // Prevent text wrapping
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <SafeAreaView>
        <Header
          name="Tonald Drump"
          role="Junior Full Stack Developer"
          avatar="https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/8381f3b2cf5c2302ad1c0321193ff295a47d1888d56ced95f0668f6f9b47c073?apiKey=95a3c52e460440f58cf6776b478813ea&"
          verifiedIcon="https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/bb62b1648a71a99eabf6ed576197c4a35697c5e98596614ec3f2596e280ed775?apiKey=95a3c52e460440f58cf6776b478813ea&"
          notificationIcon="https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/c3ba3b344bb7d7523d59c3ec0d57c3ac4625d7a1446274bca69ed4ce356eac5d?apiKey=95a3c52e460440f58cf6776b478813ea&"
          menuIcon="https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/1981321d6b32f38327085e239f700c7d7bf0dc1352891f2819240e70861f3a53?apiKey=95a3c52e460440f58cf6776b478813ea&"
        />
        <StatusBar backgroundColor="#FFFFFF" />
      </SafeAreaView>

      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0",
          },
          tabBarInactiveTintColor: "#000000",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={IconHome}
                color={color}
                focused={focused}
                name="Home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={IconHistory}
                color={color}
                focused={focused}
                name="History"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={IconUser}
                color={color}
                focused={focused}
                name="Profile"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
