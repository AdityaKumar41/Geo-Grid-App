import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const RootLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.topSection}>
        <Image
          source={require("../assets/iphone.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />

        <Text style={styles.heading} numberOfLines={2}>
          Easy way to confirm your attendance
        </Text>

        <Text style={styles.subheading} numberOfLines={2}>
          It is a long established fact that a reader will be distracted by the
          readable content.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/sign-in")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// StyleSheet for better maintainability
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "linear-gradient(180deg, #EFF6FF, #FFFFFF)",
  },
  image: {
    width: "90%",
    height: "90%",
  },
  bottomSheet: {
    height: "35%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  dragHandle: {
    width: 48,
    height: 6,
    backgroundColor: "#D1D5DB",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 28,
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "Poppins-Bold",
  },
  subheading: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "Poppins-Regular",
  },
  button: {
    backgroundColor: "#3B82F6",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default RootLayout;
