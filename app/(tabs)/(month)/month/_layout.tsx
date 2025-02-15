import { Stack } from 'expo-router';

export default function MonthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[monthInteger]" />
    </Stack>
  );
}