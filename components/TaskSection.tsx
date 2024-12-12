import React from "react";
import { View, Text, ScrollView } from "react-native";
interface DayAttendanceProps {
  day: string;
  date: string;
  status: "present" | "absent" | "late";
}
const DayAttendance: React.FC<DayAttendanceProps> = ({ day, date, status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-500";
      case "absent":
        return "bg-red-500";
      case "late":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <View className="flex flex-col items-center mr-4">
      <Text className="text-sm font-medium text-gray-600">{day}</Text>
      <View
        className={`w-10 h-10 rounded-full ${getStatusColor(
          status
        )} flex items-center justify-center mt-2`}
      >
        <Text className="text-white font-bold">{date}</Text>
      </View>
      <Text className="text-xs mt-1 capitalize">{status}</Text>
    </View>
  );
};
interface AttendanceHistoryProps {
  pairs?: AttendancePair[];
}
export const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ pairs = [] }) => {
  const attendanceData: DayAttendanceProps[] = [
    { day: "Mon", date: "24", status: "present" },
    { day: "Tue", date: "25", status: "present" },
    { day: "Wed", date: "26", status: "late" },
    { day: "Thu", date: "27", status: "present" },
    { day: "Fri", date: "28", status: "absent" },
    { day: "Sat", date: "29", status: "present" },
    { day: "Sun", date: "30", status: "present" },
  ];
  return (
    <View className="flex flex-col px-4 py-3 mt-5 w-full bg-white rounded-lg max-w-[366px]">
      <View className="flex flex-row items-center justify-between mb-3">
        <Text
          className="text-2xl font-semibold text-gray-900"
          style={{ fontFamily: "Poppins-Bold" }}
        >
          Attendance History
        </Text>
      </View>
      <Text
        className="text-base text-gray-500 mb-3"
        style={{ fontFamily: "Poppins-Regular" }}
      >
        Your attendance for the last 7 days
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {attendanceData.map((day, index) => (
          <DayAttendance key={index} {...day} />
        ))}
      </ScrollView>
      <View className="flex-row justify-between mt-4">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
          <Text className="text-sm text-gray-600">Present</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-red-500 mr-2" />
          <Text className="text-sm text-gray-600">Absent</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
          <Text className="text-sm text-gray-600">Late</Text>
        </View>
      </View>
    </View>
  );
};
