import { Linking, Platform } from 'react-native';
import { WAVE_STORE_REDIRECT_URI, APP_STORE_REDIRECT_URI } from './typings';

export const launchWave = async (url: string): Promise<boolean> => {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      const storeUrl =
        Platform.OS === 'ios'
          ? APP_STORE_REDIRECT_URI
          : WAVE_STORE_REDIRECT_URI;
      await Linking.openURL(storeUrl);
      return true;
    } else {
      await Linking.openURL(url);
      return true;
    }
  } catch (error) {
    console.error("Erreur lors de l'ouverture de Wave:", error);
    return false;
  }
};
