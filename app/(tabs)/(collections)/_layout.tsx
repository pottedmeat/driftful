import { Stack } from 'expo-router';
import { View } from 'react-native';
import { FrameNavigationProvider } from '~/contexts/frame-navigation';

export default function CollectionsGroupLayout() {
  return (
    <FrameNavigationProvider>
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="collections" />
          <Stack.Screen name="collection" />
        </Stack>
      </View>
    </FrameNavigationProvider>
  );
}