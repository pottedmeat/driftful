import { useLocalSearchParams, useSegments } from 'expo-router';
import { getTimeframeIntegers } from '~/utils/date/frame';
import type { Frame, Join } from '~/types';

type FrameType = 'page' | 'week' | 'month' | 'year' | 'collection';

const defaultSegments = {
  page: ['page', '[page]'] as const,
  week: ['week', '[week]'] as const,
  month: ['month', '[month]'] as const,
  year: ['year', '[year]'] as const,
  collection: ['collections'] as const,
} as const;

export function useFrameRoute() {
  const segments = useSegments();
  const params = useLocalSearchParams<{
    pageNumber?: string;
    weekInteger?: string;
    monthInteger?: string;
    year?: string;
    collectionId?: string;
  }>();

  // Early return if not in a frame route
  if (
    !segments[0] || !segments[1] || segments[0] !== '(tabs)' ||
    !segments[1].startsWith('(')
  ) {
    return { frame: { page: null } as Frame, href: null };
  }

  // Extract frame type from segment
  const frameType = segments[1].slice(1, -1);
  let frame: Frame = { [frameType]: null } as Record<FrameType, null>;
  let redirectSegments = segments;

  // Handle root redirects
  if (segments.length === 2) {
    if (segments[1] === '(page)') {
      redirectSegments = [...segments, ...defaultSegments.page];
    } else if (segments[1] === '(week)') {
      redirectSegments = [...segments, ...defaultSegments.week];
    } else if (segments[1] === '(month)') {
      redirectSegments = [...segments, ...defaultSegments.month];
    } else if (segments[1] === '(year)') {
      redirectSegments = [...segments, ...defaultSegments.year];
    } else if (segments[1] === '(collections)') {
      redirectSegments = [...segments, ...defaultSegments.collection];
    }

    // Set default values for parameters
    const { week, month, year } = getTimeframeIntegers(new Date());
    switch (frameType) {
      case 'page':
        params.pageNumber = 'today';
        frame = { page: 'today' };
        break;
      case 'week':
        params.weekInteger = week.toString();
        frame = { week };
        break;
      case 'month':
        params.monthInteger = month.toString();
        frame = { month };
        break;
      case 'year':
        params.year = year.toString();
        frame = { year };
        break;
      case 'collection':
        frame = { collection: null };
        break;
    }
  } else {
    // Parse frame values
    switch (frameType) {
      case 'page':
        frame = { page: 'today' };
        if (params.pageNumber === 'today' || params.pageNumber === 'future') {
          frame = { page: params.pageNumber };
        } else if (params.pageNumber && /^\d+$/.test(params.pageNumber)) {
          frame = { page: parseInt(params.pageNumber, 10) };
        }
        break;

      case 'week':
        if (params.weekInteger && /^\d+$/.test(params.weekInteger)) {
          frame = { week: parseInt(params.weekInteger, 10) };
        }
        break;

      case 'month':
        if (params.monthInteger && /^\d+$/.test(params.monthInteger)) {
          frame = { month: parseInt(params.monthInteger, 10) };
        }
        break;

      case 'year':
        if (params.year && /^\d+$/.test(params.year)) {
          frame = { year: parseInt(params.year, 10) };
        }
        break;

      case 'collection':
        if (params.collectionId) {
          frame = { collection: params.collectionId };
        }
        break;
    }
  }

  return {
    frame,
    href: `/${redirectSegments.join('/')}` as `/${Join<
        typeof redirectSegments,
        '/'
      >}`
  };
}
