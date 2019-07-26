
import AsyncStorage from '@react-native-community/async-storage';
import { ACCESS_TOKEN, UID, CLIENT } from '../constants/PersistenceKeys';

class PersistenceController {
  saveAccessToken = async (token) => {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, token);
    } catch (e) {
      console.log('Error saving ACCESS_TOKEN:', e);
    }
  }

  getAccessToken = async () => {
    try {
      const value = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (value !== null) {
        return value;
      }
      return null;
    } catch (e) {
      console.log('Error fetching ACCESS_TOKEN:', e);
      return null;
    }
  }

  deleteAccessToken = async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
    } catch (e) {
      console.log('Error deleting ACCESS_TOKEN:', e);
    }
  }

  saveUID = async (uid) => {
    try {
      await AsyncStorage.setItem(UID, uid);
    } catch (e) {
      console.log('Error saving UID:', e);
    }
  }

  getUID = async () => {
    try {
      const value = await AsyncStorage.getItem(UID);
      if (value !== null) {
        return value;
      }
      return null;
    } catch (e) {
      console.log('Error fetching UID:', e);
      return null;
    }
  }

  deleteUID = async () => {
    try {
      await AsyncStorage.removeItem(UID);
    } catch (e) {
      console.log('Error deleting UID:', e);
    }
  }

  saveClient = async (client) => {
    try {
      await AsyncStorage.setItem(CLIENT, client);
    } catch (e) {
      console.log('Error saving CLIENT:', e);
    }
  }

  getClient = async () => {
    try {
      const value = await AsyncStorage.getItem(CLIENT);
      if (value !== null) {
        return value;
      }
      return null;
    } catch (e) {
      console.log('Error fetching CLIENT:', e);
      return null;
    }
  }

  deleteClient = async () => {
    try {
      await AsyncStorage.removeItem(CLIENT);
    } catch (e) {
      console.log('Error deleting CLIENT:', e);
    }
  }
}

export default new PersistenceController();
