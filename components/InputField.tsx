import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TextInputProps,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label: string;
  iconUrl: string;
  hasEndIcon?: boolean;
  endIconUrl?: string;
  onEndIconPress?: () => void;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  iconUrl,
  hasEndIcon,
  endIconUrl,
  onEndIconPress,
  error,
  ...props
}) => {
  return (
    <View className="w-full mb-4">
      <Text
        style={{ fontFamily: "Poppins-Regular" }}
        className="text-base mb-2"
      >
        {label}
      </Text>

      <View
        className={`flex-row items-center  px-4 py-2 bg-white rounded-lg border-2 ${
          error ? "border-red-500" : "border-gray-200 focus:border-blue-500"
        }`}
      >
        <Image
          source={{ uri: iconUrl }}
          className="w-5 h-5 mr-2"
          resizeMode="contain"
        />

        <TextInput
          className="flex-1 text-base text-gray-900  "
          style={{ fontFamily: "Poppins-Regular" }}
          placeholderTextColor="#9CA3AF"
          {...props}
        />

        {hasEndIcon && (
          <TouchableOpacity onPress={onEndIconPress}>
            <Image
              source={{ uri: endIconUrl }}
              className="w-5 h-5"
              style={{ tintColor: "#6B7280" }} // Adding gray tint color
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
