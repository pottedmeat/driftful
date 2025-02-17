import { Tabs } from 'expo-router';
import { CalendarRangeIcon, CalendarDaysIcon, BookOpenIcon, TagIcon } from 'lucide-react-native';
import { FileTextIcon } from '~/components/icons/FileTextIcon';

export default function TabsLayout() {
    return (
        <Tabs initialRouteName="(page)" screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen
                name="(page)"
                options={{
                    title: 'Page',
                    tabBarIcon: ({ color, size }) => (
                        <FileTextIcon color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(week)"
                options={{
                    title: 'Week',
                    tabBarIcon: ({ color, size }) => (
                        <CalendarRangeIcon color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="(month)"
                options={{
                    title: 'Month',
                    tabBarIcon: ({ color, size }) => (
                        <CalendarDaysIcon color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="(year)"
                options={{
                    title: 'Year',
                    tabBarIcon: ({ color, size }) => (
                        <BookOpenIcon color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="(collection)"
                options={{
                    title: 'Collections',
                    tabBarIcon: ({ color, size }) => (
                        <TagIcon color={color} size={size} />
                    )
                }}
            />
        </Tabs>
    );
}