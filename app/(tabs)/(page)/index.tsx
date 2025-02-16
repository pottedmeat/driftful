import { Redirect } from 'expo-router';
import { useFrameRoute } from '~/hooks/use-frame-route';

export default function PageIndex() {
  const { href } = useFrameRoute();
  if (!href) return null;
  return <Redirect href={href} />;
}