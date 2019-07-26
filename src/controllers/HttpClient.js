import axios from 'axios';
import humps from 'humps';
import { API_URL } from 'react-native-dotenv';
import PersistenceController from './PersistenceController';

/*
  Base client config for your application.
  Here you can define your base url, headers,
  timeouts and middleware used for each request.
*/
const client = axios.create({
  baseURL: API_URL,
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data),
  ],
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest,
  ],
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

client.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});

// Set access token for every request
client.interceptors.request.use(
  async (config) => {
    try {
      const token = await PersistenceController.getAccessToken();
      const uid = await PersistenceController.getUID();
      const clientKey = await PersistenceController.getClient();
      if (token && uid && clientKey) {
        config.headers = { // eslint-disable-line no-param-reassign
          'Content-Type': 'application/json',
          'access-token': token,
          client: clientKey,
          uid,
        };
      }
      console.debug(config.url); // eslint-disable-line no-console
    } catch (error) {
      console.debug(error); // eslint-disable-line no-console
    }
    return config;
  },
  (error) => {
    console.debug('Failed to make request with error:'); // eslint-disable-line no-console
    console.debug(error); // eslint-disable-line no-console
    return Promise.reject(error);
  },
);

client.interceptors.response.use(response => response, (error) => {
  console.debug('Request got response with error:'); // eslint-disable-line no-console
  console.debug(error); // eslint-disable-line no-console
  /*
    Returns the first error message that came from the API if present,
    otherwise, forwards the full error.
  */
  const { response } = error;
  if (response && response.data) {
    const { errors } = response.data;
    const errorResponse = errors.length && errors[0];
    return Promise.reject(errorResponse || error);
  }
  return Promise.reject(error);
});

export default client;
