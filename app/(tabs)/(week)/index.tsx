import { Redirect } from 'expo-router';
import { getTimeframeIntegers } from '~/utils/date/frame';

export default function WeekIndex() {
  const { week } = getTimeframeIntegers(new Date());
  return <Redirect href={`/week/week/${week}`} />;
}