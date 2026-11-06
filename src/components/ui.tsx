import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AlertIcon, BackArrow } from '@/components/icons';
import { colors, fonts, layout, radius } from '@/theme/tokens';

export function PrimaryButton({
  label,
  onPress,
  loading,
  disabled,
  dark,
  style,
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  dark?: boolean;
  style?: ViewStyle;
}) {
  const inactive = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!inactive, busy: !!loading }}
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: dark ? colors.text : colors.primary, opacity: inactive ? 0.6 : pressed ? 0.85 : 1 },
        style,
      ]}>
      {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.buttonLabel}>{label}</Text>}
    </Pressable>
  );
}

export function BackButton({ onPress }: { onPress?: () => void }) {
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/routes'));
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      hitSlop={16}
      onPress={onPress ?? goBack}
      style={styles.back}>
      <BackArrow />
    </Pressable>
  );
}

/** Top safe-area spacer so content clears the notch/status bar on iOS and Android. */
export function TopInset({ extra = 0 }: { extra?: number }) {
  const insets = useSafeAreaInsets();
  // Browsers report no top inset; keep a small gap so web matches the design's status-bar space.
  const top = Platform.OS === 'web' ? Math.max(insets.top, 32) : insets.top;
  return <View style={{ height: top + extra }} />;
}

export function Field({
  error,
  ...props
}: TextInputProps & { error?: string | null }) {
  return (
    <View>
      <View style={[styles.input, error ? styles.inputError : null]}>
        <TextInput
          placeholderTextColor={colors.muted}
          style={styles.inputText}
          accessibilityLabel={props.placeholder}
          {...props}
        />
        {error ? <AlertIcon /> : null}
      </View>
      {error ? (
        <Text accessibilityRole="alert" style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export const text = StyleSheet.create({
  title: { fontFamily: fonts.black, fontSize: 26, lineHeight: 42, color: colors.text },
  subtitle: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.muted, marginTop: 2 },
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.text },
  muted: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted },
});

// Browsers draw a default focus rectangle inside the rounded field; the design has none.
// (react-native-web accepts outlineStyle 'none'; the React Native typings only list solid/dotted/dashed.)
export const noOutline = (Platform.OS === 'web' ? { outlineStyle: 'none' } : {}) as TextStyle;

const styles = StyleSheet.create({
  button: {
    height: layout.buttonHeight,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: { fontFamily: fonts.semibold, fontSize: 14, color: colors.white },
  back: { alignSelf: 'flex-start', paddingVertical: 8 },
  input: {
    height: layout.inputHeight,
    borderRadius: radius.pill,
    backgroundColor: colors.inputFill,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputError: { borderColor: colors.error, backgroundColor: colors.white },
  inputText: { flex: 1, fontFamily: fonts.regular, fontSize: 14, color: colors.text, height: '100%', ...noOutline },
  errorText: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18, color: colors.error, marginTop: 9, marginLeft: 2 },
});
