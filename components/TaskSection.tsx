import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { TaskItemProps } from "../types/type";

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  icon,
  status,
  priority,
  progress,
  assignees,
  dueDate,
  commentCount,
}) => {
  return (
    <View className="flex flex-col justify-center p-3 mt-3 w-full bg-gray-50 rounded-xl border border-gray-200">
      <View className="flex flex-col w-full">
        <View className="flex flex-row items-center w-full text-sm font-medium tracking-tight text-zinc-800">
          <Image
            source={{ uri: icon }}
            alt="Task Icon"
            className="object-contain w-6 aspect-square"
          />
          <Text className="ml-2">{title}</Text>
        </View>

        <View className="flex flex-row mt-3 space-x-2">
          <View className="flex flex-row items-center px-2 py-1 bg-gray-200 rounded-full text-slate-600">
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/4d565cf50b910fa7fa199de57893b5adf23a5a1a892d9e7c905a1c6ee23da900?apiKey=95a3c52e460440f58cf6776b478813ea&",
              }}
              alt="Status Icon"
              className="object-contain w-2.5 h-2.5"
            />
            <Text className="ml-1">{status}</Text>
          </View>
          <View className="flex flex-row items-center px-2 py-1 bg-rose-500 text-white rounded-full">
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/bb4d608bca285626b81badc13682bcc84e36a142c0f7de70698a1c28c0c5eb86?apiKey=95a3c52e460440f58cf6776b478813ea&",
              }}
              alt="Priority Icon"
              className="object-contain w-2.5 h-2.5"
            />
            <Text className="ml-1">{priority}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-3 w-full rounded-full">
          <View className="w-full h-1 bg-neutral-200 rounded-full">
            <View
              className="h-1 bg-violet-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>

        <View className="flex flex-row justify-between items-center mt-3">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row space-x-2"
          >
            {assignees.map((assignee, idx) => (
              <Image
                key={idx}
                source={{ uri: assignee }}
                alt={`Assignee ${idx + 1}`}
                className="object-contain w-8 h-8 rounded-full"
              />
            ))}
          </ScrollView>
          <View className="flex flex-row space-x-3">
            <View className="flex flex-row items-center px-2 py-1 bg-white rounded-full">
              <Image
                source={{
                  uri: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/1bf9f8deb8bd5c43ce3e1c9b31a3c2b533ffeecd706bbd87b6762988e883c899?apiKey=95a3c52e460440f58cf6776b478813ea&",
                }}
                alt="Due Date Icon"
                className="w-4 h-4"
              />
              <Text className="ml-1">{dueDate}</Text>
            </View>
            <View className="flex flex-row items-center px-2 py-1 bg-white rounded-full">
              <Image
                source={{
                  uri: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/727df9f7f968f2414d6e0d8f4c41c170121bef9a629824d684ec7b5cabb86b03?apiKey=95a3c52e460440f58cf6776b478813ea&",
                }}
                alt="Comments Icon"
                className="w-4 h-4"
              />
              <Text className="ml-1">{commentCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export const TaskSection: React.FC = () => {
  const tasks: TaskItemProps[] = [
    {
      title: "Wiring Dashboard Analytics",
      icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/02bfafd64a13db0b635d6a5f37c7422d938fe29a3b493ccd598c08433466c8ce?apiKey=95a3c52e460440f58cf6776b478813ea&",
      status: "In Progress",
      priority: "High",
      progress: 60,
      assignees: [
        "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/e5d0b0a64ae8df74ea5c9262c1f7551b2dd1c0b0c0c101edffd636e03dc45406?apiKey=95a3c52e460440f58cf6776b478813ea&",
      ],
      dueDate: "27 April",
      commentCount: 2,
    },
    {
      title: "Code Review Task",
      icon: "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/02bfafd64a13db0b635d6a5f37c7422d938fe29a3b493ccd598c08433466c8ce?apiKey=95a3c52e460440f58cf6776b478813ea&",
      status: "Pending",
      priority: "Medium",
      progress: 30,
      assignees: [
        "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/e5d0b0a64ae8df74ea5c9262c1f7551b2dd1c0b0c0c101edffd636e03dc45406?apiKey=95a3c52e460440f58cf6776b478813ea&",
        "https://cdn.builder.io/api/v1/image/assets/95a3c52e460440f58cf6776b478813ea/4d565cf50b910fa7fa199de57893b5adf23a5a1a892d9e7c905a1c6ee23da900?apiKey=95a3c52e460440f58cf6776b478813ea&",
      ],
      dueDate: "30 April",
      commentCount: 5,
    },
  ];

  return (
    <View className="flex flex-col px-4 py-3 mt-5 w-full bg-white rounded-lg max-w-[366px]">
      <View className="flex flex-row items-center justify-between mb-3">
        <Text
          className="text-2xl font-semibold text-gray-900"
          style={{ fontFamily: "Poppins-Bold" }}
        >
          Today's Tasks
        </Text>
        <View className="flex items-center justify-center w-8 h-8 bg-violet-200 rounded-full">
          <Text
            style={{ fontFamily: "Poppins-SemiBold" }}
            className="text-base text-violet-600"
          >
            {tasks.length}
          </Text>
        </View>
      </View>
      <Text
        className="text-base text-gray-500 mb-3"
        style={{ fontFamily: "Poppins-Regular" }}
      >
        The tasks assigned to you for today
      </Text>
      {tasks.map((task, index) => (
        <TaskItem key={index} {...task} />
      ))}
    </View>
  );
};
