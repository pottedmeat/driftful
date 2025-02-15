---
description: How to group tabs into combined paths.
globs: 
---
Grouping Routes: /items and /item/[id] Under a Single Tab

When you want a single tab to remain active whether the user is viewing the list at /items (plural) or an individual item at /item/[id] (singular), you need to group the related routes under a hidden parent folder. This ensures that the tab bar only shows one “Items” tab for both routes.

File Structure

app/
└── (tabs)/
    └── (items)/              // Group folder: hidden from the URL due to parentheses
         _layout.tsx         // A Stack navigator for the Items group
         items.tsx           // Renders the /items route (e.g. a list or placeholder)
         item/               // Folder for the singular "item" segment
             [id].tsx        // Dynamic route: /item/[id]

Step-by-Step Implementation
	1.	Group Layout for the Items Tab
Create a layout file for the group to set up a Stack navigator. This will ensure both the list and detail screens share the same navigation context.

// app/(tabs)/(items)/_layout.tsx
import { Stack } from 'expo-router';

export default function ItemsGroupLayout() {
  return <Stack />;
}


	2.	List Screen: /items
This file renders your list view (or a placeholder) and corresponds to the /items route.

// app/(tabs)/(items)/items.tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function ItemsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Items List (or empty screen)</Text>
    </View>
  );
}


	3.	Dynamic Detail Screen: /item/[id]
This file handles displaying details for a specific item using a dynamic parameter.

// app/(tabs)/(items)/item/[id].tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ItemDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Item Detail: {id}</Text>
    </View>
  );
}


	4.	Tabs Layout: Registering the Single Tab
In your tabs layout file, register only one tab for the “Items” group. Note that the icon now uses Ionicons and it uses the size passed from the callback.

// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="items" // This corresponds to the "items.tsx" file in the group
        options={{
          title: 'Items',
          href: '/items', // Default deep link to the list view
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      {/* Other tabs can be added here */}
    </Tabs>
  );
}

How It Works
	•	Grouping: The (items) folder groups both the list and detail screens. Its name is hidden from the URL because of the parentheses.
	•	Navigation Context: The _layout.tsx inside (items) sets up a Stack navigator so that both items.tsx (for /items) and item/[id].tsx (for /item/[id]) share the same navigation stack.
	•	Single Tab Registration: In your main tabs layout, you register only one tab (named "items"). This tab points to the /items route by default. Navigating to /item/12 (or any other /item/[id]) remains within the same group, keeping the “Items” tab active.
	•	Ionicons: By using Ionicons and passing the size parameter from the callback, the icon will render with the size that Expo Router passes automatically—making your UI more flexible and consistent.

This pattern allows you to generically group any two related routes (such as /items and /item/[id]) under one tab, ensuring a clean and unified navigation experience.