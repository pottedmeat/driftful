import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { FrameView } from '~/components/frame-view';
import { Frame } from '~/types';
import { getTimeframeIntegers } from '~/utils/date/frame';

export default function PageScreen() {
  const { pageNumber } = useLocalSearchParams<{ pageNumber: string }>();
  
  // Convert special strings to day numbers
  let page: number | 'today' | 'future' = pageNumber;
  if (/^\d+$/.test(page)) {
    page = parseInt(pageNumber, 10);
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <FrameView frame={{ page }} />
    </>
  );
}