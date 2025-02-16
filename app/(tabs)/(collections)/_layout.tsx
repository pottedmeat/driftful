import { Stack } from 'expo-router';
import { View } from 'react-native';
import { FrameNavigationProvider } from '~/contexts/frame-navigation';
import { useFrameRoute } from '~/hooks/use-frame-route';

export default function CollectionsGroupLayout() {
  const { frame } = useFrameRoute('collections');
  if (!frame) {
    return null;
  }
  return (
    <FrameNavigationProvider initialFrame={frame}>
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="collection" />
          <Stack.Screen name="collections" />
        </Stack>
      </View>
    </FrameNavigationProvider>
  );
}
