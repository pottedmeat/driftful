import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { FrameView } from '~/components/frame-view';
import { Frame } from '~/types';
import { getTimeframeIntegers } from '~/utils/date/frame';

export default function YearScreen() {
  const { year } = useLocalSearchParams<{ year: string }>();
  
  // Convert string to number
  const yearNumber = parseInt(year, 10);

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <FrameView frame={{ year: yearNumber }} />
    </>
  );
}