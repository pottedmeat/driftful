import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function YearEntities() {
  const { year } = useLocalSearchParams<{ year: string }>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Year: {year}</Text>
    </View>
  );
}