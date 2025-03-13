import axios from 'axios';
import { BASE_URL } from './urls';
import { API_RESPONSE } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}

export const makeRequest = async <T>({
  url,
  method,
  data,
  params,
  headers,
}: RequestConfig) => {
  try {
    const response = await api<API_RESPONSE<T>>({
      url,
      method,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors

      console.log('Axios error:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      // Handle non-Axios errors
      console.log('Unexpected error:', error);
      throw error;
    }
  }
};
