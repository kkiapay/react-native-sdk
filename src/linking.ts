import { Linking, Platform } from 'react-native';
import { WAVE_STORE_REDIRECT_URI, APP_STORE_REDIRECT_URI } from './typings';

export const launchWave = async (url: string): Promise<boolean> => {
  try {
    await Linking.openURL(url);
    return true;
    
  } catch (error) {
    console.error("Erreur lors de l'ouverture de Wave:", error);
    return false;
  }
};
