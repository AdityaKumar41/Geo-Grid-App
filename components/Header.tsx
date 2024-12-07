import React from "react";
import { View, Image, Text, Pressable, Animated } from "react-native";
import { HeaderProps } from "../types/type";
import { IconBell, IconNotification } from "@tabler/icons-react-native";
import { router } from "expo-router";

export const Header: React.FC<HeaderProps> = ({
  name,
  role,
  avatar,
  verifiedIcon,
  notificationIcon,
  menuIcon,
}) => {
  const scaleAnim = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="flex flex-col self-stretch py-4 w-full  bg-white border-b border-gray-200 shadow-sm">
      <View className="flex flex-row justify-between items-center px-4 w-full">
        <View className="flex flex-1 flex-row shrink gap-2.5 items-center self-stretch my-auto font-medium text-center basis-0 min-w-[240px]">
          <Image
            source={{ uri: avatar }}
            className="object-contain shrink-0 self-stretch my-auto w-11 rounded-full aspect-square"
          />
          <View className="flex flex-col self-stretch">
            <Text
              className="text-black"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              {name}
            </Text>
            <Text
              className="text-indigo-500"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              {role}
            </Text>
          </View>
        </View>
        <View className="flex items-center">
          <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            // onPress={onNotificationPress}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <IconBell
                size={24}
                color="#F87171"
                onPress={() => router.push("/notification")}
              />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
