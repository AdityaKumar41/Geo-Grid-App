import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { WorkingPeriodStats as WorkingPeriodStatsType } from "../types/type";

interface StatsBoxProps {
  icon: string;
  label: string;
  value: string;
}

const StatsBox: React.FC<StatsBoxProps> = ({ icon, label, value }) => (
  <View className="flex overflow-hidden flex-col flex-1 shrink items-start py-2.5 pr-8 pl-3 rounded-lg border border-gray-200 border-solid basis-0 bg-stone-50">
    <View className="flex gap-1 items-end text-xs font-medium tracking-tight text-slate-600">
      <Image
        source={{ uri: icon }}
        className="object-contain shrink-0 w-4 aspect-square "
      />
      <View>
        <Text className="font-[Poppins-Regular] ">{label}</Text>
      </View>
    </View>
    <View className="mt-2 text-2xl tracking-normal leading-7 text-gray-900">
      <Text className="font-[Poppins-Regular]">{value}</Text>
    </View>
  </View>
);

interface WorkingPeriodStatsProps {
  stats: WorkingPeriodStatsType;
  onCheckIn: () => void;
}

export const WorkingPeriodStats: React.FC<WorkingPeriodStatsProps> = ({
  stats,
  onCheckIn,
}) => {
  return (
    <View className="flex  z-10 flex-col px-4 pt-3 pb-4 mt-0 w-full bg-white rounded-lg max-w-[366px]">
      <View className="flex flex-col w-full leading-snug">
        <View className="gap-1 w-full text-sm font-semibold text-gray-900 font-[Poppins-Regular]">
          <Text className="font-[Poppins-Bold] ">Total Working Period</Text>
        </View>
        <View className="text-xs text-slate-600">
          <Text className="font-[Poppins-Regular]">
            Paid Period {stats.paidPeriod}
          </Text>
        </View>
      </View>
      <View className="flex flex-row gap-2 items-start mt-3 w-full">
        <StatsBox
          icon={
            "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/e2bb3d1c2e18a649bd79b09ec19faf8189c061635dbb0a186d30e1ee1591d0f7?apiKey=95a3c52e460440f58cf6776b478813ea&"
          }
          label="Total Work Hour"
          value={stats.totalWorkingHours}
        />
        <StatsBox
          icon="https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/e2bb3d1c2e18a649bd79b09ec19faf8189c061635dbb0a186d30e1ee1591d0f7?apiKey=95a3c52e460440f58cf6776b478813ea&"
          label="Total Break Hour"
          value={stats.totalBreakHours}
        />
      </View>
      <TouchableOpacity
        onPress={onCheckIn}
        className="overflow-hidden gap-2.5 self-stretch px-5 py-3.5 mt-3 w-full text-sm font-medium tracking-normal leading-5 text-center text-white border border-violet-400 border-solid shadow-sm min-h-[48px] rounded-[100px] bg-blue-600"
      >
        <Text className="text-white text-center">Check In Now</Text>
      </TouchableOpacity>
    </View>
  );
};
