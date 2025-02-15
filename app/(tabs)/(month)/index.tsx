import { Redirect } from 'expo-router';
import { getTimeframeIntegers } from '~/utils/date/frame';

export default function MonthIndex() {
  const { month } = getTimeframeIntegers(new Date());
  return <Redirect href={`/month/month/${month}`} />;
}