import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { SplashLogo } from '@/components/icons';
import { PrimaryButton } from '@/components/ui';
import { useAuth } from '@/state/auth';
import { colors, fonts } from '@/theme/tokens';

export default function Splash() {
  const { user, loading } = useAuth();

  return (
    <View style={styles.screen}>
      <View style={styles.center}>
        <SplashLogo />
        <Text style={styles.title}>LiftStation.cloud</Text>
        <Text style={styles.tagline}>Send well and lift station data to the cloud. Generate reports automatically.</Text>
        <PrimaryButton
          dark
          label="Get Started"
          disabled={loading}
          onPress={() => router.push(user ? '/routes' : '/login')}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primary, justifyContent: 'center', paddingHorizontal: 30 },
  center: { alignItems: 'center' },
  title: { fontFamily: fonts.black, fontSize: 27, color: colors.white, marginTop: 34, textAlign: 'center' },
  tagline: {
    fontFamily: fonts.regular,
    fontSize: 14.5,
    lineHeight: 20,
    color: colors.white,
    textAlign: 'center',
    marginTop: 28,
    maxWidth: 260,
  },
  button: { alignSelf: 'stretch', marginTop: 76 },
});
