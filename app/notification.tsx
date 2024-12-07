import * as React from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { MessageCard } from "../components/MessageCard";
import { messageData } from "../types/data";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";

function Notification() {
  const navitation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-1 bg-slate-100">
          {/* Header Section */}
          <View className="bg-white border-b border-gray-200 py-4">
            <View className="flex-row items-center px-4">
              <TouchableOpacity
                className="p-2"
                onPress={() => navitation.goBack()}
              >
                <IconArrowLeft
                  size={24}
                  color="#212121"
                  className="bg-gray-50"
                />
              </TouchableOpacity>

              <Text
                style={{ fontFamily: "Poppins-Bold" }}
                className="flex-1 text-xl text-center text-gray-900"
              >
                Messages
              </Text>
              {/* Empty View for balanced spacing */}
              <View style={{ width: 40 }} />
            </View>
          </View>

          <View className="flex flex-col w-full">
            {messageData.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Notification;
