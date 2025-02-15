import { Redirect } from 'expo-router';
import { getTimeframeIntegers } from '~/utils/date/frame';

export default function YearIndex() {
  const { year } = getTimeframeIntegers(new Date());
  return <Redirect href={`/(tabs)/(year)/year/${year}`} />;
}