import { useLocalSearchParams, useSegments } from 'expo-router';
import { getTimeframeIntegers } from '~/utils/date/frame';
import type { Frame, Join, FrameType, FrameVariants } from '~/types';

const defaultSegments: {
  [K in FrameType]: DefaultSegmentValue<K>;
} = {
  page: ['page', '[page]'],
  week: ['week', '[week]'],
  month: ['month', '[month]'],
  year: ['year', '[year]'],
  collection: ['collections'],
} as const;

export function useFrameRoute(caller: ReturnType<typeof useSegments>[2]) {
  const segments = useSegments();
  const params = useLocalSearchParams<Record<FrameType, string>>();
  
  // Early return if not in a frame route
  if (
    !segments[0] || !segments[1] || segments[0] !== '(tabs)' || segments[1] !== `(${caller})`
  ) {
    return { frame: null, href: null };
  }

  // Extract frame type from segment
  let frame: Frame;
  let redirectSegments = segments;

  // Handle root redirects e.g. /(tabs)/(page)
  if (segments.length === 2) {
    const { week, month, year } = getTimeframeIntegers(new Date());
    if (segments[1] === '(page)') {
      params.page = 'today';
      frame = { page: 'today' };
      redirectSegments = [...segments, ...defaultSegments.page];
    } else if (segments[1] === '(week)') {
      params.week = week.toString();
      frame = { week };
      redirectSegments = [...segments, ...defaultSegments.week];
    } else if (segments[1] === '(month)') {
      params.month = month.toString();
      frame = { month };
      redirectSegments = [...segments, ...defaultSegments.month];
    } else if (segments[1] === '(year)') {
      params.year = year.toString();
      frame = { year };
      redirectSegments = [...segments, ...defaultSegments.year];
    } else if (segments[1] === '(collections)') {
      frame = { collection: null };
      redirectSegments = [...segments, ...defaultSegments.collection];
    } else {
      return { frame: null, href: null };
    }
  } else {
    // Parse frame values e.g. /(tabs)/(page)/page/[page]
    if (segments[1] === '(page)') {
      frame = { page: 'today' };
      if (params.page === 'today' || params.page === 'future') {
        frame = { page: params.page };
      } else if (params.page && /^\d+$/.test(params.page)) {
        frame = { page: parseInt(params.page, 10) };
      }
    } else if (segments[1] === '(week)') {
      frame = { week: null };
      if (params.week && /^\d+$/.test(params.week)) {
        frame = { week: parseInt(params.week, 10) };
      }
    } else if (segments[1] === '(month)') {
      frame = { month: null };
      if (params.month && /^\d+$/.test(params.month)) {
        frame = { month: parseInt(params.month, 10) };
      }
    } else if (segments[1] === '(year)') {
      frame = { year: null };
      if (params.year && /^\d+$/.test(params.year)) {
        frame = { year: parseInt(params.year, 10) };
      }
    } else if (segments[1] === '(collections)') {
      frame = { collection: null };
      if (params.collection) {
        frame = { collection: params.collection };
      }
    } else {
      return { frame: null, href: null };
    }
  }

  return {
    frame,
    localSearchParams: params,
    href: `/${redirectSegments.join('/')}` as `/${Join<typeof redirectSegments, '/'>}`
  };
}

/** Helper types */
type DefaultSegmentValue<K extends FrameType> =
  | [K, FrameVariants[K]['dynamic']]
  | [FrameVariants[K]['plural']];