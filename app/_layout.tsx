import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const Root = () => {
  const [loaded, error] = useFonts({
    "Poppins-Black": require("../assets/font/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/font/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/font/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/font/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (loaded) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <StatusBar style="auto" />
    </Stack>
  );
};

export default Root;
