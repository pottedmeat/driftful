import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { PagedView } from '../paged-view';
import { IndexedView } from '../indexed-view';
import { useFrameNavigation } from '~/contexts/frame-navigation';
import { Frame } from '~/types';
import { getFrameTypeAndWindow } from '~/utils/frame';

interface FrameViewProps {
  frame: Frame;
}

export function FrameView({ frame }: FrameViewProps) {
  const { title, frames, frame: activeFrame, onFrameChange, viewMode, setViewMode } = useFrameNavigation();
  const navigation = useNavigation();
  const currentIndex = activeFrame ? frames.findIndex(f => 
    JSON.stringify(f) === JSON.stringify(activeFrame)
  ) : -1;

  React.useEffect(() => {
    onFrameChange(frame);
  }, [frame, onFrameChange]);

  const handleViewModeToggle = React.useCallback(() => {
    if (viewMode === 'paged') {
      // Only allow switching to index if we have more than 1 frame
      if (frames.length > 1) {
        setViewMode('index');
      }
    } else {
      // Only allow switching to paged if active frame has a window
      if (activeFrame) {
        const [, window] = getFrameTypeAndWindow(activeFrame);
        if (window !== null) {
          setViewMode('paged');
        }
      }
    }
  }, [viewMode, frames.length, activeFrame, setViewMode]);

  const handleFrameChange = React.useCallback((newFrame: Frame | null) => {
    onFrameChange(newFrame);
    // If we're in index view and selecting a frame with a window, switch back to paged
    if (viewMode === 'index' && newFrame) {
      const [, frameWindow] = getFrameTypeAndWindow(newFrame);
      if (frameWindow !== null) {
        setViewMode('paged');
      }
    }
  }, [onFrameChange, viewMode, setViewMode]);

  const handlePrevFrame = React.useCallback(() => {
    if (currentIndex > 0) {
      onFrameChange(frames[currentIndex - 1]);
    }
  }, [currentIndex, frames, onFrameChange]);

  const handleNextFrame = React.useCallback(() => {
    if (currentIndex < frames.length - 1) {
      onFrameChange(frames[currentIndex + 1]);
    }
  }, [currentIndex, frames, onFrameChange]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity
          onPress={handleViewModeToggle}
          className="px-4 py-2">
          <Text className="text-lg font-semibold text-gray-800">
            {activeFrame?.title || title}
          </Text>
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
      headerLeft: ({ tintColor }: { tintColor: string }) => 
        viewMode === 'paged' ? (
          <TouchableOpacity
            disabled={currentIndex <= 0}
            onPress={handlePrevFrame}
            className="p-2 rounded-lg">
            <Ionicons
              name="chevron-back"
              size={24}
              color={currentIndex > 0 ? tintColor : '#9CA3AF'}
            />
          </TouchableOpacity>
        ) : null,
      headerRight: ({ tintColor }: { tintColor: string }) => 
        viewMode === 'paged' ? (
          <TouchableOpacity
            disabled={currentIndex >= frames.length - 1}
            onPress={handleNextFrame}
            className="p-2 rounded-lg">
            <Ionicons
              name="chevron-forward"
              size={24}
              color={currentIndex < frames.length - 1 ? tintColor : '#9CA3AF'}
            />
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, activeFrame, title, currentIndex, frames, handlePrevFrame, handleNextFrame, viewMode, handleViewModeToggle]);

  return (
    <View className="flex-1 bg-gray-100">
      {viewMode === 'paged' ? (
        <PagedView
          frames={frames}
          frame={activeFrame}
          onFrameChange={handleFrameChange}
        />
      ) : (
        <IndexedView
          frames={frames}
          frame={activeFrame}
          onFrameChange={handleFrameChange}
        />
      )}
    </View>
  );
}