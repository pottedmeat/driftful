import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { FrameView } from '~/components/frame-view';
import { Frame } from '~/types';
import { getTimeframeIntegers } from '~/utils/date/frame';

export default function WeekScreen() {
  const { weekInteger } = useLocalSearchParams<{ weekInteger: string }>();
  
  // Convert string to number
  const week = parseInt(weekInteger, 10);

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <FrameView frame={{ week }} />
    </>
  );
}