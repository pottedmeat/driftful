import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function PageEntities() {
  const { page } = useLocalSearchParams<{ page: string }>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-foreground">Page {page}</Text>
    </View>
  );
}
