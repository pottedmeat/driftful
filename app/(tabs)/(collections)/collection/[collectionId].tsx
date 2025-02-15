import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { FrameView } from '~/components/frame-view';

export default function CollectionScreen() {
  const { collectionId } = useLocalSearchParams<{ collectionId: string }>();

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <FrameView frame={{ collection: collectionId }} />
    </>
  );
}