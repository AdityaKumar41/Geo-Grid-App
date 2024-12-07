import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import { InputField } from "../../components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    console.log({ email, password });
    ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
    router.push("/home");
  };

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   // Clear form data
  //   setEmail("");
  //   setPassword("");
  //   setShowPassword(false);

  //   // Simulate network request
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 1000);
  // }, []);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        className="flex-1 px-6"
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        <Image
          source={require("../../assets/icon.png")}
          className="w-40 h-40 mx-auto"
          resizeMode="contain"
        />
        <View className="mt-8 mb-8">
          <Text
            style={{ fontFamily: "Poppins-Bold" }}
            className="text-4xl text-gray-900"
          >
            Welcome Back
          </Text>
          <Text
            style={{ fontFamily: "Poppins-Bold" }}
            className="text-4xl text-blue-700"
          >
            Hr Attendee
          </Text>
          <Text
            className="text-gray-500 mt-2"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Hello there login to continue
          </Text>
        </View>

        <View className="space-y-6">
          <InputField
            label="Email"
            iconUrl="https://img.icons8.com/?size=100&id=86875&format=png&color=228BE6"
            placeholder="Enter Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            label="Password"
            iconUrl="https://img.icons8.com/?size=100&id=88113&format=png&color=228BE6"
            placeholder="My Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            hasEndIcon={true}
            endIconUrl="https://img.icons8.com/?size=100&id=85130&format=png&color=228BE6"
            onEndIconPress={() => setShowPassword(!showPassword)}
          />
        </View>

        <TouchableOpacity
          className="bg-blue-700 rounded-full py-4 mt-8"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-6">
          <Text
            className="text-violet-500 text-center text-lg"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            Already have an account? Sign in here
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
