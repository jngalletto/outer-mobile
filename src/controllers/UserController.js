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
      return result.data.user;
    } catch (error) {
      return error;
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
      return result.data.user;
    } catch (error) {
      return error;
    }
  }


  logout = () => null;
}

export default new UserController();
