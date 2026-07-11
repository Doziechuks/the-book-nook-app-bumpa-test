/**
 * Formats a phone number by removing the first character and attaching a country code
 * @param phoneNumber - The phone number to format (e.g., "08012345678")
 * @param countryCode - The country code to attach (e.g., "+234" or "234")
 * @returns Formatted phone number with country code (e.g., "+2348012345678")
 */
export const formatPhoneWithCountryCode = (phoneNumber: string, countryCode: string): string => {
  // Remove the first character from the phone number
  const numberWithoutFirst = phoneNumber.slice(1);

  // Combine country code with the phone number
  return `${countryCode}${numberWithoutFirst}`;
};
