import { Stack } from 'expo-router';
import { View } from 'react-native';
import { FrameNavigationProvider } from '~/contexts/frame-navigation';

export default function MonthGroupLayout() {
  return (
    <FrameNavigationProvider>
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="month" />
          <Stack.Screen name="months" />
        </Stack>
      </View>
    </FrameNavigationProvider>
  );
}