import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { DateItemProps } from "../types/type";

const DateItem: React.FC<DateItemProps> = ({ day, weekday, isActive }) => {
  return (
    <TouchableOpacity
      className={`px-4 py-3 rounded-xl min-w-[75px] min-h-[75px] items-center justify-center ${
        isActive ? "bg-blue-600" : "bg-gray-50"
      }`}
    >
      <Text
        style={{ fontFamily: "Poppins-Bold" }}
        className={`text-lg ${isActive ? "text-white" : "text-gray-900"}`}
      >
        {day}
      </Text>
      <Text
        style={{ fontFamily: "Poppins-Regular" }}
        className={`text-xs mt-1 ${isActive ? "text-white" : "text-gray-500"}`}
      >
        {weekday}
      </Text>
    </TouchableOpacity>
  );
};

export const DateSelector: React.FC = () => {
  const dates: DateItemProps[] = [
    { day: 22, weekday: "Fri", isActive: true },
    { day: 23, weekday: "Sat" },
    { day: 24, weekday: "Sun" },
    { day: 25, weekday: "Mon" },
    { day: 26, weekday: "Tue" },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View className="flex-row gap-3 ">
        {dates.map((date, index) => (
          <DateItem key={index} {...date} />
        ))}
      </View>
    </ScrollView>
  );
};
