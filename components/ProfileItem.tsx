import React from "react";
import { View, Text, Image } from "react-native";

import { ProfileItemProps } from "../types/type";
import { Icon2fa, IconTags } from "@tabler/icons-react-native";

export const ProfileItem: React.FC<ProfileItemProps> = ({
  icon,
  label,
  showArrow = false,
}) => (
  <View className="flex-row gap-2 w-full p-2">
    {/* <Image
      source={{ uri: icon }}
      className="object-contain  aspect-square w-[18px] "
    style={{}}
    /> */}
    <IconTags color={"#212121"} />
    <View>
      <Text
        className={`${label === "Logout" ? "text-red-500" : ""}`}
        style={{ fontFamily: "Poppins-Regular" }}
      >
        {label}
      </Text>
    </View>
    {showArrow && (
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/ce3be6d2f7cc89de31febbc70134acfbd1619dfd2b3244628f9ad8ed0eb84fa7?apiKey=95a3c52e460440f58cf6776b478813ea&",
        }}
        className="object-contain w-4 "
      />
    )}
  </View>
);
