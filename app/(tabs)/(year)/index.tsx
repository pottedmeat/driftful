import { Redirect } from 'expo-router';
import { useFrameRoute } from '~/hooks/use-frame-route';

export default function YearIndex() {
  const { href } = useFrameRoute('year');
  if (!href) return null;
  return <Redirect href={href} />;
}