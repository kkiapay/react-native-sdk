import { Linking } from 'react-native';

export const launchWave = async (url: string): Promise<boolean> => {
  try {
    await Linking.openURL(url);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ouverture de Wave:", error);
    return false;
  }
};
