import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Frame, LoadedFrame, FrameChangeCallback, FrameTypeTuple } from '~/types';
import { formatTitle } from '~/utils/date/formatTitle';
import { getDatesFromTimeframeIntegers } from '~/utils/date/frame';
import { getFrameTypeAndWindow, getPluralFrameTitle } from '~/utils/frame';

interface FrameNavigationContextType {
  title: string;
  frames: LoadedFrame[];
  frame: LoadedFrame;
  onFrameChange: FrameChangeCallback;
  viewMode: 'paged' | 'index';
  setViewMode: (mode: 'paged' | 'index') => void;
}

const FrameNavigationContext = createContext<FrameNavigationContextType | null>(null);

// Temporary fixtures - replace with actual data fetching
const FIXTURES = [
  { page: 1, startDay: 1, endDay: 600, entities: [
    { entityId: 'first', type: 'task', content: 'Do Stuff', day: 550 }
  ] },
  { page: 2, startDay: 601, entities: [
    { entityId: 'second', type: 'task', content: 'Doing Stuff', day: 700 }
  ] },
  { page: 'future', entities: [
    { entityId: 'third', type: 'task', content: 'Done Stuff', day: 20000 }
  ] }
].map(fixture => {
  return {
    ...fixture,
    title: formatTitle(
      fixture.startDay ? getDatesFromTimeframeIntegers({ day: fixture.startDay }).day[0] : null,
      fixture.endDay ? getDatesFromTimeframeIntegers({ day: fixture.endDay }).day[0] : null
    )
  };
}) as LoadedFrame[];

export interface FrameNavigationProviderProps {
  children: React.ReactNode;
  initialFrame: Frame;
}

const canUsePagedMode = (frame: Frame | null) => {
  if (!frame) return false;
  const [frameType, frameWindow] = getFrameTypeAndWindow(frame);
  return frameWindow !== null || frameType !== 'collection';
};

const canUseIndexMode = (frame: Frame | null, frames: LoadedFrame[]) => {
  return frames.length > 1 || (frame && 'collection' in frame);
};

const getInitialViewMode = (frame: Frame, frames: LoadedFrame[]): 'paged' | 'index' => {
  const [, frameWindow] = getFrameTypeAndWindow(frame);
  if (!frameWindow && canUseIndexMode(frame, frames)) {
    return 'index';
  }
  return 'paged';
};

export function FrameNavigationProvider({ children, initialFrame }: FrameNavigationProviderProps) {
  const [activeFrame, setActiveFrame] = useState<Frame | null>(initialFrame || null);
  
  // Get frame type and window from active frame
  const [frameType, frameWindow] = activeFrame ? getFrameTypeAndWindow(activeFrame) : (['page', null] as FrameTypeTuple);

  // Compute title, frame and frames based on active frame
  const [title, frame, frames] = useMemo(() => {
    const pluralTitle = getPluralFrameTitle(frameType);
    
    let frame: LoadedFrame;
    let frames: LoadedFrame[] = [];

    if (frameType === 'page') {
      if (frameWindow === null) {
        frames = FIXTURES;
        frame = { page: 2, title: pluralTitle, entities: [] };
      } else {
        frame = FIXTURES.find(p => 'page' in p && p.page === (frameWindow === 'today' ? 2 : frameWindow === 'future' ? 'future' : frameWindow)) || { page: frameWindow as number | 'future', title: pluralTitle, entities: [] } as LoadedFrame;
        frames = FIXTURES;
      }
    } else {
      frame = { ...activeFrame, title: pluralTitle, entities: [] } as LoadedFrame;
      frames = [frame];
    }

    return [pluralTitle, frame, frames];
  }, [frameType, frameWindow, activeFrame]);

  const [viewMode, setViewModeInternal] = useState<'paged' | 'index'>(() => {
    return getInitialViewMode(initialFrame, frames)
  });

  const setViewMode = useCallback((newMode: 'paged' | 'index') => {
    if (newMode === 'paged' && canUsePagedMode(activeFrame)) {
      setViewModeInternal('paged');
    } else if (newMode === 'index' && canUseIndexMode(activeFrame, frames)) {
      setViewModeInternal('index');
    }
  }, [activeFrame, frames]);

  const handleFrameChange = useCallback((newFrame: Frame) => {
    setActiveFrame(newFrame);
    // Determine appropriate view mode based on frame properties
    const [, frameWindow] = getFrameTypeAndWindow(newFrame);
    setViewMode(frameWindow ? 'paged' : 'index');
  }, [setViewMode]);

  const value = useMemo(() => ({
    title,
    frames,
    frame,
    onFrameChange: handleFrameChange,
    viewMode,
    setViewMode,
  }), [title, frames, frame, handleFrameChange, viewMode]);

  return (
    <FrameNavigationContext.Provider value={value}>
      {children}
    </FrameNavigationContext.Provider>
  );
}

export function useFrameNavigation() {
  const context = useContext(FrameNavigationContext);
  if (!context) {
    throw new Error('useFrameNavigation must be used within a FrameNavigationProvider');
  }
  return context;
}