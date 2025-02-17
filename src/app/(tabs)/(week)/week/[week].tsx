import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function WeekEntities() {
  const { week } = useLocalSearchParams<{ week: string }>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Week: {week}</Text>
    </View>
  );
}