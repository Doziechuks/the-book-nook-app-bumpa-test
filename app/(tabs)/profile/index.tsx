import Button from '@/src/components/Button';
import { ROUTES } from '@/src/constants/routes';
import { useOrdersStore } from '@/src/store/ordersStore';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SFSymbol, SymbolView } from 'expo-symbols';
import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { s, ScaledSheet } from 'react-native-size-matters';

const MOCK_USER = {
  name: 'Doziechuks',
  email: 'doziechuks1010@gmail.com',
  avatar: 'https://i.pravatar.cc/150?img=47',
};

const SETTINGS_ITEMS: { icon: SFSymbol; label: string }[] = [
  { icon: 'bell.fill', label: 'Notifications' },
  { icon: 'creditcard.fill', label: 'Payment Methods' },
  { icon: 'questionmark.circle.fill', label: 'Help & Support' },
];

const ProfileScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const orders = useOrdersStore((state) => state.orders);

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => {} },
    ]);
  };

  return (
    <ScrollView
      style={[styles.wrapper, { backgroundColor: theme.background }]}
      contentContainerStyle={{
        paddingTop: insets.top + s(16),
        paddingBottom: s(40),
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileHeader}>
        <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} contentFit="cover" />
        <Text style={[styles.name, { color: theme.text }]}>{MOCK_USER.name}</Text>
        <Text style={[styles.email, { color: theme.textMuted }]}>{MOCK_USER.email}</Text>
      </View>

      <View style={styles.section}>
        <Pressable
          onPress={() => router.push(ROUTES.ORDERS)}
          style={[styles.settingRow, { borderColor: theme.border }]}
          accessibilityRole="button"
          accessibilityLabel={`View orders (${orders.length})`}
        >
          <SymbolView
            name={{ ios: 'bag.fill', android: 'shopping_bag', web: 'shopping_bag' }}
            size={18}
            tintColor={theme.textMuted}
          />
          <Text style={[styles.settingLabel, { color: theme.text }]}>Orders</Text>
          <View style={[styles.countBadge, { backgroundColor: theme.primaryMuted }]}>
            <Text style={[styles.countBadgeText, { color: theme.primary }]}>{orders.length}</Text>
          </View>
          <SymbolView
            name={{
              ios: 'chevron.right',
              android: 'chevron_right',
              web: 'chevron_right',
            }}
            size={16}
            tintColor={theme.textMuted}
          />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Settings</Text>
        {SETTINGS_ITEMS.map((item) => (
          <View key={item.label} style={[styles.settingRow, { borderColor: theme.border }]}>
            <SymbolView
              name={{ ios: item.icon, android: 'settings', web: 'settings' }}
              size={18}
              tintColor={theme.textMuted}
            />
            <Text style={[styles.settingLabel, { color: theme.text }]}>{item.label}</Text>
            <SymbolView
              name={{
                ios: 'chevron.right',
                android: 'chevron_right',
                web: 'chevron_right',
              }}
              size={16}
              tintColor={theme.textMuted}
            />
          </View>
        ))}
      </View>

      <View style={styles.logoutWrapper}>
        <Button variant="outline" onPress={handleLogout} accessibilityLabel="Log out">
          Log Out
        </Button>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = ScaledSheet.create({
  wrapper: { flex: 1 },
  profileHeader: { alignItems: 'center', marginBottom: '24@vs' },
  avatar: { width: '84@s', height: '84@s', borderRadius: '42@s' },
  name: {
    fontFamily: FONTS.outfit_semi_bold,
    fontSize: FONT_SIZES.xl,
    marginTop: '12@vs',
  },
  email: {
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.sm,
    marginTop: '2@vs',
  },
  section: { paddingHorizontal: '16@s', marginBottom: '24@vs' },
  sectionTitle: {
    fontFamily: FONTS.outfit_semi_bold,
    fontSize: FONT_SIZES.lg,
    marginBottom: '10@vs',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12@s',
    borderBottomWidth: 1,
    paddingVertical: '12@vs',
  },
  settingLabel: {
    flex: 1,
    fontFamily: FONTS.outfit_medium,
    fontSize: FONT_SIZES.sm,
  },
  countBadge: {
    borderRadius: '10@s',
    minWidth: '22@s',
    paddingHorizontal: '6@s',
    paddingVertical: '2@vs',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeText: { fontFamily: FONTS.outfit_semi_bold, fontSize: FONT_SIZES.xs },
  logoutWrapper: { paddingHorizontal: '16@s', marginTop: '8@vs' },
});
