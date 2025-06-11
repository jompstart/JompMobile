import axios from 'axios';
import { BASE_URL } from './urls';
import { API_RESPONSE } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../routes/RootNavigation';
import { StackActions } from '@react-navigation/native';
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
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
interface RequestConfig<D> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: D;
  params?: any;
  headers?: Record<string, string>;
}

export const makeRequest = async <T, D = any>({
  url,
  method,
  data,
  params,
  headers,
}: RequestConfig<D>) => {
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
    if (axios.isAxiosError(error)) {
      console.log(`Error making request to ${url}:`, error);
      // Handle Axios-specific errors

      if (error.response?.status === 401) {
        await AsyncStorage.removeItem('token');

        navigationRef.current?.dispatch(StackActions.replace('Login'));
        
      }
      throw error.response?.data || error.message;
    } else {
      // Handle non-Axios errors
      console.log('Unexpected error:', error);
      throw error;
    }
  }
};
