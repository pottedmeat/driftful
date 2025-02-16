import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from 'expo-router';
import { ChevronLeftIcon } from '~/lib/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '~/lib/icons/ChevronRightIcon';
import { PagedView } from '../paged-view';
import { IndexedView } from '../indexed-view';
import { useFrameNavigation } from '~/contexts/frame-navigation';

export function FrameView() {
  const { title, frames, frame: activeFrame, onFrameChange, viewMode, setViewMode } = useFrameNavigation();
  const navigation = useNavigation();
  
  const currentIndex = frames.indexOf(activeFrame);

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
          onPress={() => setViewMode(viewMode === 'paged' ? 'index' : 'paged')}
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
            <ChevronLeftIcon
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
            <ChevronRightIcon
              size={24}
              color={currentIndex < frames.length - 1 ? tintColor : '#9CA3AF'}
            />
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, activeFrame, title, currentIndex, frames, handlePrevFrame, handleNextFrame, viewMode, setViewMode]);

  return (
    <View className="flex-1 bg-gray-100">
      {viewMode === 'paged' ? (
        <PagedView
          frames={frames}
          frame={activeFrame}
          onFrameChange={onFrameChange}
        />
      ) : (
        <IndexedView
          frames={frames}
          frame={activeFrame}
          onFrameChange={onFrameChange}
        />
      )}
    </View>
  );
}
