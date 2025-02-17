import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function MonthEntities() {
  const { month } = useLocalSearchParams<{ month: string }>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Month: {month}</Text>
    </View>
  );
}