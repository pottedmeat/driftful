import { Stack } from 'expo-router';
import { View } from 'react-native';
import { FrameNavigationProvider } from '~/contexts/frame-navigation';

export default function YearGroupLayout() {
  return (
    <FrameNavigationProvider>
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="years" />
          <Stack.Screen name="year" />
        </Stack>
      </View>
    </FrameNavigationProvider>
  );
}