import React from "react";
import { View, Text } from "react-native";
import { ProfileItem } from "./ProfileItem";
import { ProfileSectionProps } from "../types/type";

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  items,
}) => (
  <View className="flex flex-col mt-6 max-w-full w-[360px] self-start">
    {/* Section Title */}
    <View className="mb-2 ">
      <Text
        className="text-base tracking-wide text-slate-800"
        style={{ fontFamily: "Poppins-SemiBold" }}
      >
        {title}
      </Text>
    </View>

    {/* Items Container */}
    <View className="flex flex-col overflow-hidden px-4 py-5 w-full bg-white rounded-xl shadow-md">
      {items.map((item, index) => (
        <ProfileItem key={index} {...item} />
      ))}
    </View>
  </View>
);
