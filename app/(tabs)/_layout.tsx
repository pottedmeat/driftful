import { Tabs } from 'expo-router';
import { FileTextIcon } from '~/lib/icons/FileTextIcon'
import { CalendarRangeIcon } from '~/lib/icons/CalendarRangeIcon'
import { CalendarDaysIcon } from '~/lib/icons/CalendarDaysIcon'
import { BookOpenIcon } from '~/lib/icons/BookOpenIcon'
import { TagIcon } from '~/lib/icons/TagIcon'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        lazy: false,
        tabBarStyle: {
          backgroundColor: '#1f2937',
          borderTopWidth: 0,
          paddingBottom: 4,
          paddingTop: 4,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#9ca3af',
        popToTopOnBlur: false,
        freezeOnBlur: true,
      }}>
      <Tabs.Screen
        name="(page)"
        options={{
          title: 'Page',
          tabBarIcon: ({ size, color }) => (
            <FileTextIcon size={size} color={color} />
          ),
          lazy: false,
        }}
      />
      <Tabs.Screen
        name="(week)"
        options={{
          title: 'Week',
          tabBarIcon: ({ size, color }) => (
            <CalendarRangeIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(month)"
        options={{
          title: 'Month',
          tabBarIcon: ({ size, color }) => (
            <CalendarDaysIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(year)"
        options={{
          title: 'Year',
          tabBarIcon: ({ size, color }) => (
            <BookOpenIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(collections)"
        options={{
          title: 'Collections',
          tabBarIcon: ({ size, color }) => (
            <TagIcon size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
