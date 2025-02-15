import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Frame } from '~/types';
import { PagedViewProps } from '.';
import { FrameContent } from '../frame-content';

export function PagedView({ frames, frame, onFrameChange }: PagedViewProps) {
  const pagerRef = useRef<PagerView>(null);
  const currentIndex = frame ? frames.findIndex(f => 
    f.frameType === frame.frameType && 
    JSON.stringify(f) === JSON.stringify(frame)
  ) : 0;

  useEffect(() => {
    if (pagerRef.current && currentIndex >= 0) {
      pagerRef.current.setPage(currentIndex);
    }
  }, [currentIndex]);

  const handlePageSelected = useCallback((e: any) => {
    const newFrame = frames[e.nativeEvent.position];
    if (newFrame) {
      onFrameChange(newFrame);
    }
  }, [frames, onFrameChange]);

  return (
    <View className="flex-1">
      <PagerView
        ref={pagerRef}
        className="flex-1"
        initialPage={currentIndex}
        onPageSelected={handlePageSelected}>
        {frames.map((frame, index) => (
          <View key={index} className="flex-1">
            <FrameContent frame={frame} />
          </View>
        ))}
      </PagerView>
    </View>
  );
}