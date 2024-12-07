import React from "react";
import { View, Text, Image } from "react-native";
import { AttendanceItemProps } from "../types/type";

const AttendanceItem: React.FC<AttendanceItemProps> = ({
  type,
  time,
  status,
  icon,
}) => {
  return (
    <View className="flex flex-col flex-1 items-start px-4 py-3 bg-violet-100 rounded-xl shadow-md">
      <View className="flex flex-row items-center gap-3 w-full">
        <Image source={{ uri: icon }} className="object-contain w-6 h-6" />
        <Text
          style={{ fontFamily: "Poppins-Bold" }}
          className="text-lg uppercase text-violet-700"
        >
          {type}
        </Text>
      </View>
      <Text
        style={{ fontFamily: "Poppins-Medium" }}
        className="mt-2 text-base text-gray-800"
      >
        {time}
      </Text>
      <Text
        style={{ fontFamily: "Poppins-Regular" }}
        className="mt-1 text-sm text-gray-600"
      >
        {status}
      </Text>
    </View>
  );
};

export const AttendanceSection: React.FC = () => {
  const attendanceData: AttendanceItemProps[] = [
    {
      type: "checkin",
      time: "10:30 am",
      status: "On time",
      icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/748e2f6c66d3fd907177c259dc7b44da19435fb2aee05a041088409017a4a770?apiKey=95a3c52e460440f58cf6776b478813ea&",
    },
    {
      type: "checkout",
      time: "5:00 pm",
      status: "On time",
      icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/4b7c80f76c9acb0ba320c67aa103b633d6f4c3579932527cf3f782f674c3d002?apiKey=95a3c52e460440f58cf6776b478813ea&",
    },
  ];

  return (
    <View className="flex flex-col px-6 py-5 mt-4 w-full bg-white rounded-2xl shadow-lg mx-auto max-w-[366px]">
      <View className="flex flex-row items-center justify-between w-full">
        <View className="flex flex-row items-center gap-3">
          <Text
            style={{ fontFamily: "Poppins-Bold" }}
            className="text-2xl text-gray-900"
          >
            Today Attendance
          </Text>
          <View className="flex items-center justify-center w-8 h-8 bg-violet-200 rounded-full">
            <Text
              style={{ fontFamily: "Poppins-SemiBold" }}
              className="text-base text-violet-600"
            >
              {attendanceData.length}
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{ fontFamily: "Poppins-Regular" }}
        className="mt-1 text-sm text-gray-500"
      >
        Your Attendance for the day
      </Text>
      <View className="flex flex-row gap-4 pt-4">
        {attendanceData.map((item, index) => (
          <AttendanceItem key={index} {...item} />
        ))}
      </View>
    </View>
  );
};
