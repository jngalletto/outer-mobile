
import AsyncStorage from '@react-native-community/async-storage';
import { ACCESS_TOKEN, UID, CLIENT } from '../constants/PersistenceKeys';

class PersistenceController {
  saveAccessToken = token => AsyncStorage.setItem(ACCESS_TOKEN, token);

  getAccessToken = () => AsyncStorage.getItem(ACCESS_TOKEN);

  deleteAccessToken = () => AsyncStorage.removeItem(ACCESS_TOKEN);

  saveUID = uid => AsyncStorage.setItem(UID, uid);

  getUID = () => AsyncStorage.getItem(UID);

  deleteUID = () => AsyncStorage.removeItem(UID);

  saveClient = client => AsyncStorage.setItem(CLIENT, client);

  getClient = () => AsyncStorage.getItem(CLIENT);

  deleteClient = () => AsyncStorage.removeItem(CLIENT);
}

export default new PersistenceController();
