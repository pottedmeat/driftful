import { Redirect } from 'expo-router';
import { useFrameRoute } from '~/hooks/use-frame-route';

export default function WeekIndex() {
  const { href } = useFrameRoute('week');
  if (!href) return null;
  return <Redirect href={href} />;
}