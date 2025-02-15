import { Redirect } from 'expo-router';

export default function PageIndex() {
  return <Redirect href="/(tabs)/(page)/page/today" />;
}