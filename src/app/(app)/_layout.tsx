import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/state/auth';
import { colors } from '@/theme/tokens';

// Everything inside (app) requires a signed-in user.
export default function AppLayout() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Redirect href="/login" />;
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />;
}
