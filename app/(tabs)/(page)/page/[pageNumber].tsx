import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { FrameView } from '~/components/frame-view';

export default function PageScreen() {
  console.log('[pageNumber]');
  const { pageNumber } = useLocalSearchParams<{ pageNumber: string }>();

  // Convert special strings to day numbers
  let page: number | 'today' | 'future' = 'today';
  if (pageNumber === 'today' || pageNumber === 'future') {
    page = pageNumber;
  } else if (/^\d+$/.test(pageNumber)) {
    page = parseInt(pageNumber, 10);
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <FrameView frame={{ page }} />
    </>
  );
}