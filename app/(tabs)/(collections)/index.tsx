import { Redirect } from 'expo-router';
import { useFrameRoute } from '~/hooks/use-frame-route';

export default function CollectionsIndex() {
  const { href } = useFrameRoute('collections');
  if (!href) return null;
  return <Redirect href={href} />;
}