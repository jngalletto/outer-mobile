import axios from 'axios';
import humps from 'humps';
import { API_URL } from 'react-native-dotenv';

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
  headers: { 'content-type': 'application/json' },
});

client.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

client.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});

client.interceptors.request.use(config => config, (error) => {
  console.log('Failed to make request with error:');
  console.log(error);
  return Promise.reject(error);
});

client.interceptors.response.use(response => response, (error) => {
  console.log('Request got response with error:');
  console.log(error);
  return Promise.reject(error);
});

export default client;
