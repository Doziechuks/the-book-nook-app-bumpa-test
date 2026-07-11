import { useTheme } from '@/src/theme/ThemeProvider';
import { FONT_SIZES, FONTS } from '@/src/theme/typography';
import { SymbolView } from 'expo-symbols';
import React, { useEffect, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDebouncedCallback } from 'use-debounce';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
  autoFocus?: boolean;
}

const SearchBar = ({
  value = '',
  placeholder = 'Search books or authors',
  onSearch,
  autoFocus,
}: SearchBarProps) => {
  const { theme } = useTheme();
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const debouncedSearch = useDebouncedCallback(onSearch, 350);

  const handleChange = (next: string) => {
    setText(next);
    debouncedSearch(next);
  };

  const handleClear = () => {
    setText('');
    debouncedSearch.cancel();
    onSearch('');
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <SymbolView
        name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
        size={18}
        tintColor={theme.textMuted}
      />
      <TextInput
        value={text}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        autoFocus={autoFocus}
        style={[styles.input, { color: theme.text }]}
        returnKeyType="search"
        accessibilityLabel="Search books"
      />
      {text.length > 0 && (
        <Pressable onPress={handleClear} hitSlop={8} accessibilityLabel="Clear search">
          <SymbolView
            name={{ ios: 'xmark.circle.fill', android: 'close', web: 'close' }}
            size={18}
            tintColor={theme.textMuted}
          />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;

const styles = ScaledSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8@s',
    borderWidth: 1,
    borderRadius: '12@s',
    paddingHorizontal: '12@s',
    height: '44@s',
  },
  input: {
    flex: 1,
    fontFamily: FONTS.outfit_regular,
    fontSize: FONT_SIZES.base,
  },
});
