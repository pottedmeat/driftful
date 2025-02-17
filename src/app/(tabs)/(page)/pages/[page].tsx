import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function PageIndex() {
  const { page } = useLocalSearchParams<{ page: string }>();
  
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-foreground">Pages {page}</Text>
    </View>
  );
}
