import { Stack } from 'expo-router';
import { View } from 'react-native';
import { FrameNavigationProvider } from '~/contexts/frame-navigation';
import { useFrameRoute } from '~/hooks/use-frame-route';

export default function YearGroupLayout() {
  const { frame } = useFrameRoute();
  
  return (
    <FrameNavigationProvider initialFrame={frame}>
      <View className="flex-1">
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="year" />
          <Stack.Screen name="years" />
        </Stack>
      </View>
    </FrameNavigationProvider>
  );
}
