import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DropletLogo } from '@/components/icons';
import { Field, PrimaryButton, TopInset, text } from '@/components/ui';
import { formatPhone, nationalDigits } from '@/data/format';
import { repository } from '@/data/repository';
import { useAuth } from '@/state/auth';
import { setPendingPhone } from '@/state/pendingPhone';
import { colors, layout } from '@/theme/tokens';

export default function Login() {
  const { user } = useAuth();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (busy) return;
    const digits = nationalDigits(phone);
    if (digits.length !== 10) {
      setError('Enter a 10-digit phone number'); // not in the designs: our validation message
      return;
    }
    setBusy(true);
    setError(null);
    const user = await repository.checkPhone(digits);
    setBusy(false);
    if (!user) {
      setError('Number not found in system'); // wording from the design
      return;
    }
    setPendingPhone(digits);
    router.push('/pin');
  }

  if (user) return <Redirect href="/routes" />;

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <TopInset extra={8} />
        <DropletLogo />
        <Text style={[text.title, styles.title]}>Welcome</Text>
        <Text style={text.subtitle}>Sign in to continue</Text>
        <View style={styles.form}>
          <Field
            placeholder="Phone Number"
            value={phone}
            onChangeText={(v) => {
              setPhone(formatPhone(v));
              if (error) setError(null);
            }}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            autoComplete="tel"
            autoFocus
            returnKeyType="go"
            onSubmitEditing={submit}
            error={error}
          />
          <PrimaryButton label="Authenticate with PIN" onPress={submit} loading={busy} style={styles.button} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: layout.margin, paddingBottom: 24 },
  title: { marginTop: 42 },
  form: { marginTop: 48 },
  button: { marginTop: 30 },
});
