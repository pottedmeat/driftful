import type { Frame, FrameTypeTuple, FrameType } from '~/types';

export function getFrameTypeAndWindow(frame: Frame): FrameTypeTuple {
  if ('page' in frame) return ['page', frame.page];
  if ('week' in frame) return ['week', frame.week];
  if ('month' in frame) return ['month', frame.month];
  if ('year' in frame) return ['year', frame.year];
  if ('collection' in frame) return ['collection', frame.collection];
  throw new Error('Invalid frame type');
}

export function getPluralFrameTitle(frameType: FrameType): string {
  switch (frameType) {
    case 'page':
      return 'Pages';
    case 'week':
      return 'Weeks';
    case 'month':
      return 'Months';
    case 'year':
      return 'Years';
    case 'collection':
      return 'Collections';
    default:
      return 'Items';
  }
}