import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import type { Frame, FrameChangeCallback, LoadedFrame } from '~/types';
import { getDatesFromTimeframeIntegers } from '~/utils/date/frame';
import { formatTitle } from '~/utils/date/formatTitle';

interface IndexedViewProps {
  frames: LoadedFrame[];
  frame: LoadedFrame;
  onFrameChange: FrameChangeCallback;
}

export function IndexedView({ frames, frame, onFrameChange }: IndexedViewProps) {
  const renderFrameTitle = (frame: LoadedFrame) => {
    if ('page' in frame) {
      if (frame.page === 'future') return 'Future';
      if (frame.page === null) return 'All Pages';
      const dates = getDatesFromTimeframeIntegers({ day: frame.page });
      return formatTitle(dates.day[0], dates.day[1]);
    }
    if ('week' in frame && frame.week !== null) {
      const dates = getDatesFromTimeframeIntegers({ week: frame.week });
      return formatTitle(dates.week[0], dates.week[1]);
    }
    if ('month' in frame && frame.month !== null) {
      const dates = getDatesFromTimeframeIntegers({ month: frame.month });
      return formatTitle(dates.month[0], dates.month[1]);
    }
    if ('year' in frame && frame.year !== null) {
      const dates = getDatesFromTimeframeIntegers({ year: frame.year });
      return formatTitle(dates.year[0], dates.year[1]);
    }
    if ('collection' in frame) {
      return frame.title || 'Untitled Collection';
    }
    return 'Unknown Frame';
  };

  return (
    <ScrollView className="flex-1">
      <View className="p-4 flex-row flex-wrap gap-4">
        {frames.map((f, index) => (
          <TouchableOpacity
            key={index}
            className={`bg-white rounded-lg p-4 w-full max-w-[300px] shadow-sm ${
              frame && JSON.stringify(f) === JSON.stringify(frame)
                ? 'bg-sky-50 border border-sky-500'
                : ''
            }`}
            onPress={() => onFrameChange(f)}>
            <Text className="text-base font-medium text-gray-800">{renderFrameTitle(f)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}