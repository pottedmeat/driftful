import { Stack } from 'expo-router';
import { FrameView } from '~/components/frame-view';

export default function CollectionsScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <FrameView frame={{ collection: null }} />
    </>
  );
}