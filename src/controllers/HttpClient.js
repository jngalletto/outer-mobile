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
        config.headers.common['access-token'] = token; // eslint-disable-line no-param-reassign
        config.headers.common.client = clientKey; // eslint-disable-line no-param-reassign
        config.headers.common.uid = uid; // eslint-disable-line no-param-reassign
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

client.interceptors.request.use(config => config, (error) => {
  console.log('Failed to make request with error:');
  console.log(error);
  return Promise.reject(error);
});

export default client;
