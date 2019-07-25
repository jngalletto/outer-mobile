import httpClient from './HttpClient';

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
      return Promise.resolve(result.data.user);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  logout = () => null;
}

export default new UserController();
