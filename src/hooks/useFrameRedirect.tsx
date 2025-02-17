import { Redirect, useSegments } from 'expo-router';
import React from 'react';
import { FRAME_TYPES_GROUP } from '~/lib/constants';
import { getTimeframeIntegers } from '~/lib/utils/date/getTimeframeIntegers';
import { FrameType, FrameTypeGroup } from '~/types';

export function useFrameRedirect() {
  const segments = useSegments();
  
  if (FRAME_TYPES_GROUP.includes(segments[1] as unknown as FrameTypeGroup)) {
    const frameType = segments[1]?.slice(1, -1) as FrameType;
    if (frameType === 'collection') {
      return <Redirect href="/collections" />;
    } else if (frameType === 'page') {
      return <Redirect href="/page/today" />;
    }
    const timeFrameInteger = getTimeframeIntegers();
    return <Redirect href={`/${frameType}/${timeFrameInteger[frameType]}`} />;
  }
  
  return null;
}