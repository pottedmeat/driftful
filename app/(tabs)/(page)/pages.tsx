import { Stack } from 'expo-router';
import { FrameView } from '~/components/frame-view';

export default function WeeksScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <FrameView frame={{ page: null }} />
    </>
  );
}