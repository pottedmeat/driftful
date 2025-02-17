import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function YearIndex() {
  const { year } = useLocalSearchParams<{ year: string }>();
  
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-foreground">Years {year}</Text>
    </View>
  );
}
