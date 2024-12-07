import * as React from "react";
import { View, Image, Text } from "react-native";
import { MessageItem } from "../types/type";
import { IconListDetails } from "@tabler/icons-react-native";

interface MessageCardProps {
  message: MessageItem;
}

export function MessageCard({ message }: MessageCardProps) {
  return (
    <View className="w-full px-4 py-3 bg-white border-b border-gray-200">
      <View className="flex-row items-center">
        {/* <Image
          source={{ uri: message.image }}
          className="w-16 h-16 rounded-lg bg-gray-200"
          resizeMode="cover"
        /> */}
        <IconListDetails
          color={"#a855f7"}
          className="p-2"
          width={25}
          height={25}
        />

        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-center">
            <Text
              className="flex-1 text-base font-medium text-gray-900"
              style={{ fontFamily: "Poppins-Regular" }}
              numberOfLines={1}
            >
              {message.title}
            </Text>

            <Text className="text-xs text-gray-500 ml-2">{message.time}</Text>
          </View>

          <Text
            className="text-xs text-gray-500 mt-2"
            numberOfLines={2}
            style={{ fontFamily: "Poppins-Regular" }}
          >
            {message.description}
          </Text>
        </View>
      </View>
    </View>
  );
}
