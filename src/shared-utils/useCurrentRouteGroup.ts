import { useSegments } from 'expo-router';

export const useCurrentRouteGroup = () => {
  const segments = useSegments();
  return segments[0];
};

export const useIsAuthPage = () => {
  const group = useCurrentRouteGroup();
  return (group as string) === '(auth)';
};
