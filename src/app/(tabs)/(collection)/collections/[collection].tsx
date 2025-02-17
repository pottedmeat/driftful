import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function CollectionsIndexActive() {
  const { collection } = useLocalSearchParams<{ collection: string }>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-foreground">Collections {collection}</Text>
    </View>
  );
}
