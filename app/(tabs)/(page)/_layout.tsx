import { Stack } from 'expo-router';
import { View } from 'react-native';
import { FrameNavigationProvider } from '~/contexts/frame-navigation';

export default function PageGroupLayout() {
  return (
    <FrameNavigationProvider>
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="pages" />
          <Stack.Screen name="page" />
        </Stack>
      </View>
    </FrameNavigationProvider>
  );
}