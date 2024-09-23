import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { findSessionToken } from 'src/utils';

export interface InterceptSuccessRequest {
  (request: AxiosRequestConfig): AxiosRequestConfig;
}

export interface InterceptSuccessResponse {
  (response: AxiosResponse): AxiosResponse;
}

export const interceptSuccessResponse: InterceptSuccessResponse = (response) => response;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const useAxios = () => {
  const accessToken = findSessionToken();
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        // ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      timeout: 6000,
    });

    instance.interceptors.response.use(interceptSuccessResponse);
    return instance;
  }, [accessToken]);

  return { axios: axiosInstance };
};
