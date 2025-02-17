import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { ChevronLeftIcon } from '../components/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { Pressable, Text } from 'react-native';
import { useGlobalSearchParams, useSegments, useRouter } from 'expo-router';
import type { FrameType, FrameTypeGroup, FrameTypeWindow, FrameTypePlural } from '~/types';
import { FRAME_TYPE_MAPPINGS, FRAME_TYPES_GROUP, FRAME_TYPES_PLURAL } from '~/lib/constants';
import { formatFrameTitle } from '~/lib/utils/date/formatFrameTitle';
import { getTimeframeIntegers } from '~/lib/utils/date/getTimeframeIntegers';

type FrameContextType = {
  title: string;
  goToNextFrame: () => void;
  goToPreviousFrame: () => void;
  toggleIndex: () => void;
  resetFrame: () => void;
  index: boolean;
};

const FrameContext = createContext<FrameContextType | undefined>(undefined);

export function FrameContextProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const params = useGlobalSearchParams<{
    [key in FrameType]: string;
  }>();

  const [title, setTitle] = useState('Driftful');
  const [frameType, setFrameType] = useState<FrameType>('page');
  const [frameWindow, setFrameWindow] = useState<FrameTypeWindow>(100); // TODO: Get the page where end_day is null
  const [index, setIndex] = useState<boolean>(false);

  useEffect(() => {
    if (segments.length > 2) {
      if (segments[1] && FRAME_TYPES_GROUP.includes(segments[1] as unknown as FrameTypeGroup)) {
        const index = FRAME_TYPES_PLURAL.includes(segments[2] as unknown as FrameTypePlural);
        console.log({index, segments})
        setIndex(index);
        const frameType = segments[1].slice(1, -1) as FrameType;
        setFrameType(frameType);
        let frameWindow: FrameTypeWindow | null = null;
        if (frameType === 'page') {
          if (params.page === 'future') {
            frameWindow = 'future';
          } else if (params.page === 'today') {
            // TODO: Get the page where end_day is null
            frameWindow = 100;
          }
        }
        if (frameWindow === null && /^\d+$/.test(params[frameType])) {
          frameWindow = parseInt(params[frameType], 10);
        }
        if (frameWindow === null && frameType !== 'collection') {
          throw new Error(`Invalid frame window for ${frameType}`);
        }
        setFrameWindow(frameWindow);
      }
    }
  }, [segments, params, setFrameType, setFrameWindow]);

  useEffect(() => {
    if (index) {
      setTitle(FRAME_TYPE_MAPPINGS[frameType].pluralName);
    } else {
      setTitle(formatFrameTitle(frameType, frameWindow)); 
    }
  }, [frameType, frameWindow, index]);

  const goToNextFrame = useCallback(() => {
    if (typeof frameWindow === 'number') {
      router.push(`/${index ? FRAME_TYPE_MAPPINGS[frameType].plural : frameType}/${frameWindow + 1}`);
    }
  }, [frameType, frameWindow, index, router]);
  
  const goToPreviousFrame = useCallback(() => {
    if (typeof frameWindow === 'number') {
      router.push(`/${index ? FRAME_TYPE_MAPPINGS[frameType].plural : frameType}/${frameWindow - 1}`);
    }
  }, [frameType, frameWindow, index, router]);

  const toggleIndex = useCallback(() => {
    if (!frameWindow) return;
    if (index) {
      router.push(`/${frameType}/${frameWindow}`);
    }
    else {
      router.push(`/${frameType}s/${frameWindow}`);
    }
  }, [frameType, frameWindow, index]);

  const resetFrame = useCallback(() => {
    if (frameType === 'page') {
      router.push(`/${index ? FRAME_TYPE_MAPPINGS[frameType].plural : frameType}/today`);
    } else if (frameType !== 'collection') {
      const timeFrameInteger = getTimeframeIntegers();
      router.push(`/${index ? FRAME_TYPE_MAPPINGS[frameType].plural : frameType}/${timeFrameInteger[frameType]}`);
    }
  }, [frameType, index, router]);

  const value = {
    title,
    goToNextFrame,
    goToPreviousFrame,
    toggleIndex,
    resetFrame,
    index
  };

  return (
    <FrameContext.Provider value={value}>
      {children}
    </FrameContext.Provider>
  );
}

export function useFrameContext() {
  const context = useContext(FrameContext);
  if (context === undefined) {
    throw new Error('useFrame must be used within a FrameContextProvider');
  }
  return context;
}

export function FrameLeftButton() {
  const { goToPreviousFrame, index } = useFrameContext();
  if (index) return null;
  return (
    <Pressable onPress={goToPreviousFrame}>
      <ChevronLeftIcon className="text-foreground" />
    </Pressable>
  );
}

export function FrameRightButton() {
  const { goToNextFrame, index } = useFrameContext();
  if (index) return null;
  return (
    <Pressable onPress={goToNextFrame}>
      <ChevronRightIcon className="text-foreground" />
    </Pressable>
  );
}

export function FrameHeaderTitle() {
  const { title, toggleIndex } = useFrameContext();
  return (
    <Pressable onPress={toggleIndex}>
      <Text>{title}</Text>
    </Pressable>
  );
} 