import { View, Text, TouchableOpacity, FlatList } from 'react-native';
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
      const dates = getDatesFromTimeframeIntegers({ day: frame.page });
      return formatTitle(dates.day[0], dates.day[1]);
    }
    if ('week' in frame) {
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

  const renderItem = ({ item }: { item: LoadedFrame }) => (
    <TouchableOpacity
      className={`bg-white p-4 border-b border-gray-100 ${
        frame && JSON.stringify(item) === JSON.stringify(frame)
          ? 'bg-sky-50 border-sky-500'
          : ''
      }`}
      onPress={() => onFrameChange(item)}>
      <Text className="text-base font-medium text-gray-800">{renderFrameTitle(item)}</Text>
    </TouchableOpacity>
  );

  const ItemSeparator = () => <View className="h-px bg-gray-100" />;

  const ListEmptyComponent = () => (
    <View className="flex-1 items-center justify-center p-8">
      <Text className="text-gray-500 text-base text-center">
        No frames available
      </Text>
    </View>
  );

  return (
    <FlatList
      data={frames}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerClassName="flex-grow"
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
}