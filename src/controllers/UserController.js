import httpClient from './HttpClient';
import PersistenceController from './PersistenceController';

class UserController {
  constructor() {
    this.basePath = '/users';
  }

  signUp = async (email, password, firstName, lastName, username) => {
    try {
      const result = await httpClient.post(`${this.basePath}`, {
        user: {
          email,
          password,
          firstName,
          lastName,
          username,
        },
      });

      const accessToken = result.headers['access-token'];
      const { uid, client } = result.headers;
      await Promise.all([
        PersistenceController.saveAccessToken(accessToken),
        PersistenceController.saveClient(client),
        PersistenceController.saveUID(uid),
      ]);

      return Promise.resolve(result.data.user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  login = async (email, password) => {
    try {
      const result = await httpClient.post(`${this.basePath}/sign_in`, {
        user: {
          email,
          password,
        },
      });

      const accessToken = result.headers['access-token'];
      const { uid, client } = result.headers;
      await Promise.all([
        PersistenceController.saveAccessToken(accessToken),
        PersistenceController.saveClient(client),
        PersistenceController.saveUID(uid),
      ]);

      return Promise.resolve(result.data.user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  logout = async () => {
    try {
      await httpClient.delete(`${this.basePath}/sign_out`, { data: null });

      await Promise.all([
        PersistenceController.deleteAccessToken(),
        PersistenceController.deleteClient(),
        PersistenceController.deleteUID(),
      ]);
      return Promise.resolve(null);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new UserController();
