import { setAndroidNavBar } from '@/src/shared-utils/useAndroidNavBar';
import { useCartItemCount } from '@/src/store/cartStore';
import { useFlyAnimationStore } from '@/src/store/flyAnimationStore';
import { useTheme } from '@/src/theme/ThemeProvider';
import { FONTS } from '@/src/theme/typography';
import { Tabs, useFocusEffect } from 'expo-router';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import React, { useCallback, useRef } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const TabIcon = ({ name, color }: { name: SymbolViewProps['name']; color: string }) => (
  <SymbolView name={name} tintColor={color} size={24} />
);

const CartTabIcon = ({ color }: { color: string }) => {
  const itemCount = useCartItemCount();
  const setCartIconPosition = useFlyAnimationStore((state) => state.setCartIconPosition);
  const iconRef = useRef<View>(null);

  const measure = useCallback(() => {
    requestAnimationFrame(() => {
      iconRef.current?.measureInWindow((x, y, w, h) => {
        setCartIconPosition({ x: x + w / 2, y: y + h / 2 });
      });
    });
  }, [setCartIconPosition]);

  return (
    <View ref={iconRef} onLayout={measure} style={styles.cartIconWrapper}>
      <SymbolView
        name={{
          ios: 'cart.fill',
          android: 'shopping_cart',
          web: 'shopping_cart',
        }}
        tintColor={color}
        size={24}
      />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount > 99 ? '99+' : itemCount}</Text>
        </View>
      )}
    </View>
  );
};

export default function TabLayout() {
  const { theme } = useTheme();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(theme.statusBar === 'dark' ? 'dark-content' : 'light-content');
      setAndroidNavBar(theme.statusBar);
    }, [theme.statusBar]),
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.tabBarBg,
          borderTopColor: theme.border,
        },
        tabBarLabelStyle: { fontFamily: FONTS.outfit_medium, fontSize: 11 },
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabIcon name={{ ios: 'house.fill', android: 'home', web: 'home' }} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products/index"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => (
            <TabIcon
              name={{
                ios: 'books.vertical.fill',
                android: 'menu_book',
                web: 'book',
              }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <CartTabIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabIcon
              name={{ ios: 'person.fill', android: 'person', web: 'person' }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen name="products/[id]" options={{ href: null }} />
      <Tabs.Screen name="profile/orders" options={{ href: null }} />
    </Tabs>
  );
}

const styles = ScaledSheet.create({
  cartIconWrapper: { position: 'relative' },
  badge: {
    position: 'absolute',
    top: '-6@s',
    right: '-10@s',
    backgroundColor: '#DC2626',
    borderRadius: '9@s',
    minWidth: '18@s',
    height: '18@s',
    paddingHorizontal: '3@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: FONTS.outfit_semi_bold,
  },
});
