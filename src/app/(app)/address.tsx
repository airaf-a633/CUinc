import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { BackButton, PrimaryButton, TopInset, noOutline, text } from '@/components/ui';
import { formatActivityDate } from '@/data/format';
import { repository } from '@/data/repository';
import type { Address } from '@/data/types';
import { useAuth } from '@/state/auth';
import { colors, fonts, layout, radius } from '@/theme/tokens';

export default function AddressDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [address, setAddress] = useState<Address | null | undefined>(undefined);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    repository.getAddress(id ?? '').then((a) => {
      setAddress(a);
      if (a) setNotes(a.notes);
    });
  }, [id]);

  async function markTurnedOn() {
    if (!address || !user || saving) return;
    setSaving(true);
    setError(null);
    try {
      setAddress(await repository.markTurnedOn(address.id, notes, user));
    } catch {
      setError('Could not save. Please try again.'); // not in the designs
    } finally {
      setSaving(false);
    }
  }

  if (address === undefined) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }
  if (address === null) {
    return (
      <View style={styles.center}>
        <Text style={text.body}>Address not found.</Text>
        <BackButton />
      </View>
    );
  }

  const done = address.status === 'turned_on';
  const rows: [string, string][] = [
    ['Address 1:', address.line1],
    ['Address 2:', address.line2],
    ['City:', address.city],
    ['State:', address.state],
    ['Zip:', address.zip],
  ];

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TopInset extra={24} />
          <BackButton />
          <View style={styles.rows}>
            {rows
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <View key={label} style={styles.row}>
                  <Text style={styles.label}>{label}</Text>
                  <Text style={styles.value}>{value}</Text>
                </View>
              ))}
          </View>
        </View>

        <View style={styles.body}>
          {done ? (
            <>
              <Text style={styles.sectionLabel}>Notes:</Text>
              <Text style={text.body}>{address.notes || 'No notes.'}</Text>
              <Text style={[styles.sectionLabel, styles.activityLabel]}>Activity:</Text>
              <Text style={text.body}>
                <Text style={styles.turnedOn}>Turned on</Text> by {address.turnedOnBy} on{' '}
                {address.turnedOnAt ? formatActivityDate(address.turnedOnAt) : ''}.
              </Text>
            </>
          ) : (
            <>
              <TextInput
                accessibilityLabel="Notes"
                placeholder="Notes"
                placeholderTextColor={colors.muted}
                value={notes}
                onChangeText={setNotes}
                multiline
                textAlignVertical="top"
                style={styles.notes}
              />
              {error ? (
                <Text accessibilityRole="alert" style={styles.error}>
                  {error}
                </Text>
              ) : null}
              <PrimaryButton label="Mark as Turned On" onPress={markTurnedOn} loading={saving} style={styles.button} />
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, padding: layout.margin },
  scroll: { paddingBottom: 32 },
  header: { backgroundColor: colors.headerTint, paddingHorizontal: layout.margin, paddingBottom: 30 },
  rows: { marginTop: 21, gap: 21 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  label: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 19, color: colors.text },
  value: { fontFamily: fonts.bold, fontSize: 14, lineHeight: 19, color: colors.text, flexShrink: 1, textAlign: 'right', marginLeft: 16 },
  body: { paddingHorizontal: layout.margin, paddingTop: 29 },
  notes: {
    minHeight: 292,
    borderRadius: radius.card,
    backgroundColor: colors.inputFill,
    padding: 20,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text,
    ...noOutline,
  },
  error: { fontFamily: fonts.regular, fontSize: 13, color: colors.error, marginTop: 10 },
  button: { marginTop: 20 },
  sectionLabel: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginBottom: 10 },
  activityLabel: { marginTop: 32 },
  turnedOn: { fontFamily: fonts.bold, color: colors.online },
});
