const PRIMARY = {
  50: '#F2FAF6',
  100: '#D9F0E4',
  200: '#B3DFC8',
  300: '#8DCFAB',
  400: '#5AB985',
  500: '#019444',
  600: '#017E3A',
  700: '#016830',
  800: '#015125',
  900: '#013B1B',
};

const NEUTRAL = {
  0: '#FFFFFF',
  50: '#F7F8FA',
  100: '#EEF0F3',
  200: '#DFE3E8',
  300: '#C7CDD6',
  400: '#9AA3B2',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
  1000: '#000000',
};

const SEMANTIC = {
  success: '#1AA152',
  successBgLight: '#F0FDF4',
  successBgDark: '#0B2415',
  error: '#DC2626',
  errorBgLight: '#FEF2F2',
  errorBgDark: '#3B1414',
  warning: '#F59E0B',
  warningBgLight: '#FFFBEB',
  warningBgDark: '#3A2A05',
  info: '#2563EB',
  infoBgLight: '#EFF6FF',
  infoBgDark: '#0B2038',
};

export interface Theme {
  mode: 'light' | 'dark';
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  text: string;
  textMuted: string;
  textInverse: string;
  primary: string;
  primaryMuted: string;
  primaryPressed: string;
  onPrimary: string;
  success: string;
  successBg: string;
  error: string;
  errorBg: string;
  warning: string;
  warningBg: string;
  info: string;
  infoBg: string;
  overlay: string;
  disabled: string;
  disabledText: string;
  tabBarBg: string;
  tabBarInactive: string;
  statusBar: 'dark' | 'light';
}

const lightTheme: Theme = {
  mode: 'light',
  background: NEUTRAL[50],
  surface: NEUTRAL[0],
  surfaceElevated: NEUTRAL[0],
  border: NEUTRAL[200],
  text: NEUTRAL[900],
  textMuted: NEUTRAL[500],
  textInverse: NEUTRAL[0],
  primary: PRIMARY[500],
  primaryMuted: PRIMARY[50],
  primaryPressed: PRIMARY[600],
  onPrimary: NEUTRAL[0],
  success: SEMANTIC.success,
  successBg: SEMANTIC.successBgLight,
  error: SEMANTIC.error,
  errorBg: SEMANTIC.errorBgLight,
  warning: SEMANTIC.warning,
  warningBg: SEMANTIC.warningBgLight,
  info: SEMANTIC.info,
  infoBg: SEMANTIC.infoBgLight,
  overlay: 'rgba(0,0,0,0.5)',
  disabled: NEUTRAL[200],
  disabledText: NEUTRAL[400],
  tabBarBg: NEUTRAL[0],
  tabBarInactive: NEUTRAL[400],
  statusBar: 'dark' as const,
};

const darkTheme: Theme = {
  mode: 'dark',
  background: '#0E1210',
  surface: '#161B18',
  surfaceElevated: '#1E2521',
  border: '#2A322D',
  text: '#F4F6F5',
  textMuted: '#9CA6A0',
  textInverse: NEUTRAL[900],
  primary: PRIMARY[400],
  primaryMuted: '#0F2A1B',
  primaryPressed: PRIMARY[300],
  onPrimary: '#02150A',
  success: '#34C97A',
  successBg: SEMANTIC.successBgDark,
  error: '#F87171',
  errorBg: SEMANTIC.errorBgDark,
  warning: '#FBBF24',
  warningBg: SEMANTIC.warningBgDark,
  info: '#60A5FA',
  infoBg: SEMANTIC.infoBgDark,
  overlay: 'rgba(0,0,0,0.7)',
  disabled: '#2A322D',
  disabledText: '#5B655F',
  tabBarBg: '#121613',
  tabBarInactive: '#5B655F',
  statusBar: 'light' as const,
};

export { PRIMARY, NEUTRAL, SEMANTIC, lightTheme, darkTheme };
