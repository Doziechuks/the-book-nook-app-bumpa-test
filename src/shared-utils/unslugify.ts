export const unslugify = (slug: string): string => {
  if (!slug) return '';

  return slug
    .replace(/[-_]+/g, ' ') // Replace dashes and underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

export function strip(word: string) {
  if (word) {
    const newString = word.toString();
    const string = newString.split('-');
    const result = string.slice(0, 2).join('-');
    return result.split('-').join(' ').split('_').join(' ');
  }
  return '';
}
