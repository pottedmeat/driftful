import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Frame, LoadedFrame } from '~/types';
import { formatTitle } from '~/utils/date/formatTitle';
import { getDatesFromTimeframeIntegers } from '~/utils/date/frame';
import { getFrameTypeAndWindow, getPluralFrameTitle } from '~/utils/frame';

interface FrameNavigationContextType {
  title: string;
  frames: LoadedFrame[];
  frame: LoadedFrame;
  onFrameChange: (frame: Frame | null) => void;
  viewMode: 'paged' | 'index';
  setViewMode: (mode: 'paged' | 'index') => void;
  lastActiveWindow: number | string | 'future' | null;
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
].map((fixture) => {
  fixture.title = formatTitle(
    fixture.startDay ? getDatesFromTimeframeIntegers({ day: fixture.startDay }).day[0] : null,
    fixture.endDay ? getDatesFromTimeframeIntegers({ day: fixture.endDay }).day[0] : null
  );
  return fixture;
});

export interface FrameNavigationProviderProps {
  children: React.ReactNode;
}

export function FrameNavigationProvider({ children }: FrameNavigationProviderProps) {
  const [activeFrame, setActiveFrame] = useState<Frame | null>(null);
  const [lastActiveWindow, setLastActiveWindow] = useState<number | string | 'future' | null>(null);
  const [viewMode, setViewMode] = useState<'paged' | 'index'>('paged');

  // Get frame type and window from active frame
  const [frameType, frameWindow] = activeFrame ? getFrameTypeAndWindow(activeFrame) : ['page', null];

  // Compute title, frame and frames based on active frame
  const [title, frame, frames] = useMemo(() => {
    const pluralTitle = getPluralFrameTitle(frameType);
    
    let frame: LoadedFrame;
    let frames: LoadedFrame[] = [];

    if (frameType === 'page') {
      if (frameWindow === null) {
        frames = FIXTURES;
        frame = { page: null, title: pluralTitle, entities: [] };
      } else {
        frame = FIXTURES.find(p => p.page === (frameWindow === 'today' ? 2 : frameWindow === 'future' ? 3 : frameWindow)) || { page: frameWindow, title: pluralTitle, entities: [] };
        frames = FIXTURES;
      }
    } else {
      frame = { ...activeFrame, title: pluralTitle, entities: [] };
      frames = [frame];
    }

    return [pluralTitle, frame, frames];
  }, [frameType, frameWindow, activeFrame]);

  const handleFrameChange = useCallback((newFrame: Frame | null) => {
    if (newFrame) {
      const [, window] = getFrameTypeAndWindow(newFrame);
      if (window === null) {
        // Store the last active window when switching to index view
        setLastActiveWindow(frameWindow);
        setViewMode('index');
      } else {
        // Update the last active window when switching to a specific frame
        setLastActiveWindow(window);
        setViewMode('paged');
      }
    }
    setActiveFrame(newFrame);
  }, [frameWindow]);

  const value = useMemo(() => ({
    title,
    frames,
    frame,
    onFrameChange: handleFrameChange,
    viewMode,
    setViewMode,
    lastActiveWindow,
  }), [title, frames, frame, handleFrameChange, viewMode, lastActiveWindow]);

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