import { Stack } from 'expo-router';
import { FrameView } from '~/components/frame-view';

export default function WeeksScreen() {
  console.log('Pages');
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <FrameView />
    </>
  );
}