import * as React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { AttendanceCard } from "../../components/AttendanceCard";
import { WorkingPeriodStats } from "../../components/WorkingPeriod";
import { AttendanceRecord } from "../../types/type";

const attendanceData: AttendanceRecord[] = [
  {
    date: "27 September 2024",
    totalHours: "08:00:00 hrs",
    checkInTime: "09:00 AM",
    checkOutTime: "05:00 PM",
  },
  {
    date: "26 September 2024",
    totalHours: "08:00:00 hrs",
    checkInTime: "09:00 AM",
    checkOutTime: "05:00 PM",
  },
  {
    date: "25 September 2024",
    totalHours: "08:00:00 hrs",
    checkInTime: "09:00 AM",
    checkOutTime: "05:00 PM",
  },
];

const AttendanceScreen: React.FC = () => {
  const handleCheckIn = () => {
    // Handle check in logic
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <View className="flex-1 items-center pb-6 bg-slate-50">
        {/* Header Section */}
        <View className="w-full bg-blue-600 rounded-b-[32px] px-6 pt-16 pb-8 shadow-lg">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="font-[Poppins-SemiBold] text-3xl text-white mb-2">
                Let's Check-In!
              </Text>
              <Text className="font-[Poppins-Regular] text-violet-100">
                Don't miss your check in schedule
              </Text>
            </View>
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/719efc411d482435a860bc9d13011a3d2f3fd395aaeee3d3e473f7e8f3c805ff?apiKey=95a3c52e460440f58cf6776b478813ea&",
              }}
              className="w-24 h-24 object-contain"
            />
          </View>
        </View>

        {/* Stats Section */}
        <View className="px-4 w-full mt-4">
          <WorkingPeriodStats
            stats={{
              totalWorkingHours: "00:00 Hrs",
              totalBreakHours: "32:00 Hrs",
              paidPeriod: "1 Sept 2024 - 30 Sept 2024",
            }}
            onCheckIn={handleCheckIn}
          />

          {/* Attendance List */}
          <View className="mt-6">
            {attendanceData.map((record, index) => (
              <View key={index} className="mb-4">
                <AttendanceCard
                  date={record.date}
                  totalHours={record.totalHours}
                  checkInTime={record.checkInTime}
                  checkOutTime={record.checkOutTime}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AttendanceScreen;
