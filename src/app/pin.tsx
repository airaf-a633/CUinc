import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BackButton, Field, PrimaryButton, TopInset, text } from '@/components/ui';
import { useAuth } from '@/state/auth';
import { clearPendingPhone, getPendingPhone } from '@/state/pendingPhone';
import { colors, layout } from '@/theme/tokens';

export default function EnterPin() {
  const phone = getPendingPhone();
  const { user, signIn } = useAuth();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (busy) return;
    if (pin.length !== 6) {
      setError('Enter your 6 digit PIN'); // not in the designs: our validation message
      return;
    }
    setBusy(true);
    setError(null);
    const result = await signIn(phone, pin);
    setBusy(false);
    if (result.ok) {
      clearPendingPhone(); // the redirect below moves on to /routes
    } else if (result.reason === 'wrong_pin') {
      setError('Incorrect PIN'); // not in the designs: our wording
      setPin('');
    } else {
      router.replace('/login');
    }
  }

  if (user) return <Redirect href="/routes" />;
  // Opened directly (e.g. page refresh) without a phone number: go back to Login.
  if (!phone) return <Redirect href="/login" />;

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <TopInset extra={8} />
        <BackButton />
        <Text style={[text.title, styles.title]}>Enter Pin</Text>
        <Text style={text.subtitle}>Confirm your PIN code</Text>
        <View style={styles.form}>
          <Field
            placeholder="Enter 6 digit PIN"
            value={pin}
            onChangeText={(v) => {
              setPin(v.replace(/\D/g, '').slice(0, 6));
              if (error) setError(null);
            }}
            keyboardType="number-pad"
            secureTextEntry
            maxLength={6}
            textContentType="oneTimeCode"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={submit}
            error={error}
          />
          <PrimaryButton label="Confirm" onPress={submit} loading={busy} style={styles.button} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: layout.margin, paddingBottom: 24 },
  title: { marginTop: 48 },
  form: { marginTop: 48 },
  button: { marginTop: 30 },
});
