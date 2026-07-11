import * as SplashScreen from 'expo-splash-screen';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const runOnLoad = async (setIsReady: React.Dispatch<React.SetStateAction<boolean>>) => {
  await SplashScreen.hideAsync();
  await delay(1000);
  setIsReady(true);
};
