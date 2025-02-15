import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Frame, Entity } from '~/types';

interface FrameContentProps {
  frame: Frame;
}

export function FrameContent({ frame }: FrameContentProps) {
  const renderItem = ({ item }: { item: Entity }) => (
    <View className="bg-white rounded-lg p-4 shadow-sm">
      <Text className="text-gray-800">{item.content}</Text>
    </View>
  );

  const ItemSeparator = () => <View className="h-2" />;

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
      contentContainerClassName="p-4 grow"
      keyExtractor={item => item.entityId}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      bounces={true}
    />
  );
}