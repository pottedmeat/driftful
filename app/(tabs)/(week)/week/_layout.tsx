import { Stack } from 'expo-router';

export default function WeekLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[week]" />
    </Stack>
  );
}