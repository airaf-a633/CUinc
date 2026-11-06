import { useEffect, useState } from 'react';
import { Animated, BackHandler, Easing, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DropletLogo } from '@/components/icons';
import { formatPhone } from '@/data/format';
import type { User } from '@/data/types';
import { colors, fonts, layout, radius } from '@/theme/tokens';

const DRAWER_WIDTH = 288;
const DURATION = 220;

/**
 * Side panel opened by the hamburger. The designs do not include a menu (TBC with the client),
 * so contents are limited to what exists in the trial: the user, "Turn Ons" and "Sign out".
 * Rendered inside the screen (not a Modal) so on web it stays within the phone-width column.
 */
export function SideDrawer({
  open,
  onClose,
  user,
  onSignOut,
}: {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSignOut: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [progress] = useState(() => new Animated.Value(0));
  const [mounted, setMounted] = useState(open);
  const native = Platform.OS !== 'web';

  // Mount as soon as it is asked to open; unmount only after the close animation ends.
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: open ? 1 : 0,
      duration: DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: native,
    }).start(({ finished }) => {
      if (finished && !open) setMounted(false);
    });
  }, [open, progress, native]);

  // Android hardware back closes the drawer first.
  useEffect(() => {
    if (!open) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [open, onClose]);

  if (!mounted) return null;

  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [-DRAWER_WIDTH, 0] });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none" accessibilityViewIsModal>
      <Animated.View style={[styles.backdrop, { opacity: progress }]}>
        <Pressable accessibilityLabel="Close menu" accessibilityRole="button" style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.panel,
          { width: DRAWER_WIDTH, paddingTop: insets.top + 28, paddingBottom: Math.max(insets.bottom, 20), transform: [{ translateX }] },
        ]}>
        <View style={styles.header}>
          <DropletLogo width={22} height={31} />
          <Text style={styles.name} numberOfLines={1}>
            {user?.name}
          </Text>
          {user ? <Text style={styles.phone}>{formatPhone(user.phone)}</Text> : null}
        </View>

        <View style={styles.items}>
          <Pressable accessibilityRole="button" accessibilityState={{ selected: true }} onPress={onClose} style={[styles.item, styles.itemActive]}>
            <Text style={[styles.itemText, styles.itemTextActive]}>Turn Ons</Text>
          </Pressable>
        </View>

        <Pressable accessibilityRole="button" onPress={onSignOut} style={({ pressed }) => [styles.signOut, { opacity: pressed ? 0.7 : 1 }]}>
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: colors.overlay },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.white,
    borderTopRightRadius: radius.card,
    borderBottomRightRadius: radius.card,
    paddingHorizontal: layout.margin - 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 4, height: 0 },
    elevation: 16,
  },
  header: { paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: colors.inputFill },
  name: { fontFamily: fonts.black, fontSize: 20, color: colors.text, marginTop: 20 },
  phone: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, marginTop: 4 },
  items: { marginTop: 20, flex: 1 },
  item: { height: 52, borderRadius: radius.card - 4, justifyContent: 'center', paddingHorizontal: 16 },
  itemActive: { backgroundColor: colors.headerTint },
  itemText: { fontFamily: fonts.semibold, fontSize: 16, color: colors.text },
  itemTextActive: { color: colors.primary },
  signOut: { height: 52, borderRadius: radius.card - 4, justifyContent: 'center', paddingHorizontal: 16, backgroundColor: colors.inputFill },
  signOutText: { fontFamily: fonts.semibold, fontSize: 16, color: colors.error },
});
