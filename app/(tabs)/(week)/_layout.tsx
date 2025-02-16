import { Stack } from 'expo-router';
import { View } from 'react-native';
import { FrameNavigationProvider } from '~/contexts/frame-navigation';
import { useFrameRoute } from '~/hooks/use-frame-route';

export default function WeekGroupLayout() {
  const { frame } = useFrameRoute();
  if (!frame) {
    return null;
  }
  return (
    <FrameNavigationProvider initialFrame={frame}>
      <View className="flex-1">
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="week" />
          <Stack.Screen name="weeks" />
        </Stack>
      </View>
    </FrameNavigationProvider>
  );
}
