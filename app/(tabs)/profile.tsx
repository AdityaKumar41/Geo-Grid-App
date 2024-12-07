import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { ProfileSection } from "../../components/ProfileSection";

const contactItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/4aa0675692cb8fd58928cbaa66f4d3fda9fa73c637d8e925b55f562df6aca761?apiKey=95a3c52e460440f58cf6776b478813ea&",
    label: "Tonald@gmail.com",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/8792ba30da8aefb32418f2c189b09c15dde87356113658d0e1e2a60655917d63?apiKey=95a3c52e460440f58cf6776b478813ea&",
    label: "Taman Anggrek",
  },
];

const accountItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/ff21fc4a38d8c965308427dfa94033f56857d1df6adbfe4003976d7005f7a07a?apiKey=95a3c52e460440f58cf6776b478813ea&",
    label: "Personal Data",
    showArrow: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/dd12b1bb6d42d434beab9da8cebe262d9da4900ffcf323dbe40e2701df1c0f36?apiKey=95a3c52e460440f58cf6776b478813ea&",
    label: "Office Assets",
    showArrow: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/55b5ea90137a12a081b814ba9f30d945baab937f6d3857873845381cf089f165?apiKey=95a3c52e460440f58cf6776b478813ea&",
    label: "Payroll & Tax",
    showArrow: true,
  },
];

const settingsItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/f3149fdf4c574c790907b5020fad988d12cb86d22ee2e115497758b0b00b8ed9?apiKey=95a3c52e460440f58cf6776b478813ea&",
    label: "Change Password",
    showArrow: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/eaa250f6649f21fe27e255a357c60755a012cd7c8f71e7cd775f50efb7a7eab8?apiKey=95a3c52e460440f58cf6776b478813ea&",
    label: "Versioning",
    showArrow: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/b84fcbfcc42cbc6eac3409257e15c9b3a31de748a6296d375319e0ca5fcbdc3d?apiKey=95a3c52e460440f58cf6776b478813ea&",
    label: "FAQ and Help",
    showArrow: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/2a8333addde5616340a34f0d0915671ef78616e13cbad5b2a4701bee5bd3b81d?apiKey=95a3c52e460440f58cf6776b478813ea&",
    label: "Logout",
    showArrow: true,
  },
];

const Profile: React.FC = () => {
  return (
    <ScrollView className="bg-gray-100">
      <View className="flex flex-col items-center w-full bg-blue-600 py-6 px-4">
        {/* Header Section */}
        <View className="flex flex-row items-center justify-between w-full max-w-md">
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/cf27b2a95d61229669c91d335d4fbfb46be58e2ac65d41ea6d37f2e98542c65b?apiKey=95a3c52e460440f58cf6776b478813ea&",
            }}
            className="w-10 h-10 rounded-full"
          />
          <Text
            className="text-lg text-white"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            My Profile
          </Text>
          <View className="w-10 h-10"></View>
        </View>

        {/* Profile Picture */}
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/d6954879c6447b5b7d4cb004f31f770ede1b0a30c57fa508d0fbb42671a80517?apiKey=95a3c52e460440f58cf6776b478813ea&",
          }}
          className="mt-6 w-28 h-28 rounded-full border-4 border-white shadow-lg"
        />

        {/* User Info */}
        <View className="mt-4 items-center">
          <Text
            className="text-xl font-semibold text-white"
            style={{ fontFamily: "Poppins-Bold" }}
          >
            Tonald Drump
          </Text>
          <Text
            className="text-sm font-medium text-violet-200"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Junior Full Stack Developer
          </Text>
        </View>
      </View>

      {/* Content Section */}
      <View className="p-4 space-y-4">
        <ProfileSection title="CONTACT" items={contactItems} />
        <ProfileSection title="ACCOUNT" items={accountItems} />
        <ProfileSection title="SETTINGS" items={settingsItems} />
      </View>
    </ScrollView>
  );
};

export default Profile;
