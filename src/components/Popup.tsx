import { useTheme } from '@/src/theme/ThemeProvider';
import React, { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { s, ScaledSheet } from 'react-native-size-matters';
interface PopupProps {
  children: ReactNode;
  onClose?: () => void;
  noPadding?: boolean;
}
const Popup = ({ children, onClose, noPadding }: PopupProps) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.wrapper, { backgroundColor: theme.overlay }]}>
      <Pressable
        onPress={onClose}
        style={{
          zIndex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />
      <View
        style={{
          zIndex: 2,
          padding: noPadding ? 0 : s(16),
          borderRadius: s(10),
          width: '100%',
          position: 'relative',
          backgroundColor: theme.surface,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default Popup;
const styles = ScaledSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingHorizontal: '16@s',
    zIndex: 9999,
    elevation: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
