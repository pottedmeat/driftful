import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function WeekIndex() {
  const { week } = useLocalSearchParams<{ week: string }>();
  
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-foreground">Weeks {week}</Text>
    </View>
  );
}
