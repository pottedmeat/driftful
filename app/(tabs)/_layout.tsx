import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FileTextIcon } from '~/lib/icons/FileTextIcon'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1f2937',
          borderTopWidth: 0,
          paddingBottom: 4,
          paddingTop: 4,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#9ca3af',
      }}>
      <Tabs.Screen
        name="(page)"
        options={{
          title: 'Page',
          tabBarIcon: ({ size, color }) => (
            <FileTextIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(week)"
        options={{
          title: 'Week',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(month)"
        options={{
          title: 'Month',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(year)"
        options={{
          title: 'Year',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="calendar-clear" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(collections)"
        options={{
          title: 'Collections',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bookmarks" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}