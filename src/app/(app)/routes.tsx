import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SideDrawer } from '@/components/drawer';
import { MenuIcon } from '@/components/icons';
import { TopInset, text } from '@/components/ui';
import { repository } from '@/data/repository';
import type { TurnOnRoute } from '@/data/types';
import { useAuth } from '@/state/auth';
import { useOnline } from '@/state/online';
import { colors, fonts, layout, radius } from '@/theme/tokens';

export default function Routes() {
  const { user, signOut } = useAuth();
  const online = useOnline();
  const [routes, setRoutes] = useState<TurnOnRoute[] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    repository.listRoutes().then(setRoutes);
  }, []);

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    router.replace('/');
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <TopInset extra={34} />
        <View style={styles.topRow}>
          <Pressable accessibilityRole="button" accessibilityLabel="Open menu" hitSlop={16} onPress={() => setMenuOpen(true)}>
            <MenuIcon />
          </Pressable>
          <Text style={styles.user} numberOfLines={1}>
            {user?.name}
          </Text>
        </View>

        <Text style={[text.title, styles.title]}>{'Consolidated\nUtilities, Inc.'}</Text>

        <View style={styles.sectionRow}>
          <Text style={text.muted}>Turn Ons</Text>
          <View style={styles.status} accessibilityLiveRegion="polite">
            <View style={[styles.dot, { backgroundColor: online ? colors.online : colors.offline }]} />
            <Text style={[styles.statusText, { color: online ? colors.online : colors.offline }]}>
              {online ? 'You are online' : 'You are offline'}
            </Text>
          </View>
        </View>

        {routes === null ? (
          <ActivityIndicator color={colors.primary} style={styles.loader} />
        ) : (
          routes.map((r) => (
            <Pressable
              key={r.id}
              accessibilityRole="button"
              accessibilityLabel={`${r.name} route`}
              onPress={() => router.push({ pathname: '/addresses', params: { routeId: r.id } })}
              style={({ pressed }) => [styles.card, { backgroundColor: r.color, opacity: pressed ? 0.8 : 1 }]}>
              <Text style={styles.cardLabel}>{r.name}</Text>
            </Pressable>
          ))
        )}
      </ScrollView>

      <SideDrawer open={menuOpen} onClose={closeMenu} user={user} onSignOut={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: layout.margin, paddingBottom: 32 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  user: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, flexShrink: 1, marginLeft: 16 },
  title: { marginTop: 30 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 29, marginBottom: 31 },
  status: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  statusText: { fontFamily: fonts.regular, fontSize: 14 },
  loader: { marginTop: 40 },
  card: { height: 96, borderRadius: radius.card, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  cardLabel: { fontFamily: fonts.bold, fontSize: 20, color: colors.text },
});
