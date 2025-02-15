import { Stack } from 'expo-router';

export default function YearLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[year]" />
    </Stack>
  );
}