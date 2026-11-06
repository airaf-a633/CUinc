import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { PinIcon } from '@/components/icons';
import { BackButton, TopInset, text } from '@/components/ui';
import { repository } from '@/data/repository';
import type { Address, AddressStatus } from '@/data/types';
import { colors, fonts, layout, radius } from '@/theme/tokens';

// ASSUMPTION: card/pin color encodes status (see data/types.ts).
const STATUS_COLORS: Record<AddressStatus, { card: string; pin: string; label: string }> = {
  pending: { card: colors.cardRed, pin: colors.pinRed, label: 'Pending' },
  turned_on: { card: colors.cardGreen, pin: colors.pinGreen, label: 'Turned on' },
  follow_up: { card: colors.cardBlue, pin: colors.pinBlue, label: 'Follow-up' },
};

const oneLine = (a: Address) =>
  [[a.line1, a.line2].filter(Boolean).join(', '), a.city, `${a.state} ${a.zip}`].join(', ');

export default function Addresses() {
  const { routeId } = useLocalSearchParams<{ routeId: string }>();
  const [items, setItems] = useState<Address[] | null>(null);

  // Reload on focus so a status change on the detail screen shows immediately when going back.
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      repository.listAddresses(routeId ?? '').then((list) => alive && setItems(list));
      return () => {
        alive = false;
      };
    }, [routeId]),
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={items ?? []}
        keyExtractor={(a) => a.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <TopInset extra={24} />
            <BackButton />
            <Text style={[text.title, styles.title]}>Addresses</Text>
          </View>
        }
        ListEmptyComponent={
          items === null ? (
            <ActivityIndicator color={colors.primary} style={styles.loader} />
          ) : (
            <Text style={[text.muted, styles.empty]}>No addresses on this route.</Text>
          )
        }
        renderItem={({ item }) => {
          const s = STATUS_COLORS[item.status];
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${oneLine(item)}, ${s.label}`}
              onPress={() => router.push({ pathname: '/address', params: { id: item.id } })}
              style={({ pressed }) => [styles.card, { backgroundColor: s.card, opacity: pressed ? 0.8 : 1 }]}>
              <PinIcon color={s.pin} />
              <Text style={styles.address}>{oneLine(item)}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: layout.margin, paddingBottom: 32 },
  header: { marginBottom: 29 },
  title: { marginTop: 12 },
  loader: { marginTop: 40 },
  empty: { marginTop: 24 },
  card: {
    minHeight: 88,
    borderRadius: radius.card,
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  address: { flex: 1, marginLeft: 16, fontFamily: fonts.regular, fontSize: 15, lineHeight: 24, color: colors.text },
});
