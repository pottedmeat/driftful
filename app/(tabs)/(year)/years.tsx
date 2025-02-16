import { Stack } from 'expo-router';
import { FrameView } from '~/components/frame-view';

export default function YearsScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <FrameView />
    </>
  );
}