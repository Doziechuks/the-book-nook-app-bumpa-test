// utils/linking.ts
import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';

/**
 * Open a URL in the device's default browser
 * @param url - The URL to open
 * @param options - Optional configuration
 */
export const openURL = async (url: string): Promise<void> => {
  try {
    // Check if the device can open the URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.message ?? 'Failed to open url',
      text2Style: { color: '#F50101' },
    });
    return;
  }
};

/**
 * Open phone dialer with a phone number
 * @param phoneNumber - The phone number to dial
 */
export const openPhoneDialer = (phoneNumber: string): void => {
  const telUrl = `tel:${phoneNumber}`;
  openURL(telUrl);
};

/**
 * Open email client with pre-filled email
 * @param email - The email address
 * @param subject - Optional subject
 * @param body - Optional body
 */
export const openEmail = (email: string, subject?: string, body?: string): void => {
  let mailUrl = `mailto:${email}`;

  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);

  if (params.toString()) {
    mailUrl += `?${params.toString()}`;
  }

  openURL(mailUrl);
};

/**
 * Open maps with a location
 * @param address - The address or location
 * @param lat - Latitude (optional)
 * @param lng - Longitude (optional)
 */
export const openMaps = (address: string, lat?: number, lng?: number): void => {
  let mapsUrl: string;

  if (lat !== undefined && lng !== undefined) {
    // Use coordinates if available
    mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
  } else {
    // Use address
    const encodedAddress = encodeURIComponent(address);
    mapsUrl = `https://maps.google.com/?q=${encodedAddress}`;
  }

  openURL(mapsUrl);
};
