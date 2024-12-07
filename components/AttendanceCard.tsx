import * as React from "react";
import { View, Text, Image } from "react-native";

interface AttendanceCardProps {
  date: string;
  totalHours: string;
  checkInTime: string;
  checkOutTime: string;
}

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  date,
  totalHours,
  checkInTime,
  checkOutTime,
}) => {
  return (
    <View className="flex flex-col p-5 mt-4 w-full bg-white rounded-2xl max-w-[366px] shadow-md border border-gray-100">
      {/* Header with Date */}
      <View className="flex-row items-center space-x-3 pb-4 border-b border-gray-100">
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/16f6c664b4f29f13aaa182995218257f12735585a9aa99ef85e20e95c346272d?apiKey=95a3c52e460440f58cf6776b478813ea&",
          }}
          className="w-5 h-5"
        />
        <Text className="flex-1 font-['Poppins-SemiBold'] text-base text-gray-800">
          {date}
        </Text>
      </View>

      {/* Details Section */}
      <View className="flex-row justify-between mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl border border-gray-100">
        {/* Total Hours */}
        <View className="space-y-2">
          <Text className="font-['Poppins-Medium'] text-xs text-gray-500">
            Total Hours
          </Text>
          <Text className="font-['Poppins-SemiBold'] text-lg text-gray-800">
            {totalHours}
          </Text>
        </View>

        {/* Check In/Out Times */}
        <View className="space-y-2">
          <Text className="font-['Poppins-Medium'] text-xs text-gray-500">
            Check in & Out
          </Text>
          <View className="flex-row items-center space-x-2">
            <Text className="font-['Poppins-SemiBold'] text-base text-gray-800">
              {checkInTime}
            </Text>
            <Text className="text-gray-400">—</Text>
            <Text className="font-['Poppins-SemiBold'] text-base text-gray-800">
              {checkOutTime}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
