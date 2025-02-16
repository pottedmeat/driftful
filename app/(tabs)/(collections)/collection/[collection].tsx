import { Stack } from 'expo-router';
import { FrameView } from '~/components/frame-view';

export default function CollectionScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <FrameView />
    </>
  );
}