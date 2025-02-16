import { Redirect, useSegments } from 'expo-router';
import { getDefaultSegments } from './_layout';
import type { Join } from '~/types';

export default function YearIndex() {
  let segments = ['(tabs)', '(year)'] as ReturnType<typeof useSegments>;
  if (segments[0] === '(tabs)' && segments[1] === '(year)' && segments.length === 2) {
    segments = [...segments, ...getDefaultSegments()] as const;
  }
  return <Redirect href={`/${segments.join('/')}` as `/${Join<typeof segments, '/'>}`} />;
}