import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function MonthIndex() {
  const { month } = useLocalSearchParams<{ month: string }>();
  
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-foreground">Months {month}</Text>
    </View>
  );
}
