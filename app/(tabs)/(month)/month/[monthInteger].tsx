import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { FrameView } from '~/components/frame-view';
import { Frame } from '~/types';
import { getTimeframeIntegers } from '~/utils/date/frame';

export default function MonthScreen() {
  const { monthInteger } = useLocalSearchParams<{ monthInteger: string }>();
  
  // Convert string to number
  const month = parseInt(monthInteger, 10);

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <FrameView frame={{ month }} />
    </>
  );
}