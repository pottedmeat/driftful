import { Tabs, useRouter } from 'expo-router';
import { CalendarRangeIcon, CalendarDaysIcon, BookOpenIcon, TagIcon } from 'lucide-react-native';
import { useState, useCallback } from 'react';
import { FileTextIcon } from '~/components/icons/FileTextIcon';
import { useFrameContext } from '~/contexts/FrameContextProvider';

export default function TabsLayout() {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const { resetFrame } = useFrameContext();
    const handleFocus = useCallback((e: { target?: string }) => {
        setActiveTab(e.target!);
    }, []);
    const handleTabPress = useCallback((e: { target?: string }) => {
        if (e.target === activeTab) {
            resetFrame();
        } else {
            setActiveTab(e.target!);
        }
    }, [activeTab, resetFrame]);
    
    return (
        <Tabs
            screenOptions={{
                headerShown: false
            }}
            screenListeners={{
                focus: handleFocus,
                tabPress: handleTabPress,
            }}
        >
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