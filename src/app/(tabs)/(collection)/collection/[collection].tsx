import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function CollectionEntities() {
  const { collection } = useLocalSearchParams<{ collection: string }>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-foreground">Collection: {collection}</Text>
    </View>
  );
}