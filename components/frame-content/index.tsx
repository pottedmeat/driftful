import { View, Text, FlatList } from 'react-native';
import type { Entity, LoadedFrame } from '~/types';

interface FrameContentProps {
  frame: LoadedFrame;
}

export function FrameContent({ frame }: FrameContentProps) {
  const renderItem = ({ item }: { item: Entity }) => (
    <View className="bg-white p-4 border-b border-gray-100">
      <Text className="text-base font-medium text-gray-800">{item.content}</Text>
    </View>
  );

  const ItemSeparator = () => <View className="h-px bg-gray-100" />;

  const ListEmptyComponent = () => (
    <View className="flex-1 items-center justify-center p-8">
      <Text className="text-gray-500 text-base text-center">
        No items to display
      </Text>
    </View>
  );

  return (
    <FlatList
      data={frame.entities}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerClassName="flex-grow"
      keyExtractor={item => item.entityId}
      showsVerticalScrollIndicator={false}
    />
  );
}