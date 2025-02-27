import axios, { type AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5278';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

const handleRequest = async <T>(request: Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await request;
    return { data: response.data, error: null };
  } catch(error: any) {
    if (axios.isAxiosError(error)) {
      return { data: null, error: error.message };
    }

    return { data: null, error: 'An unexpected error occurred.' };
  }
}

export const apiService = {
  async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return handleRequest(axios.get(`${API_BASE_URL}${url}`, { params }));
  },

  async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return handleRequest(axios.post(`${API_BASE_URL}${url}`, data));
  },

  async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return handleRequest(axios.put(`${API_BASE_URL}${url}`, data));
  }
}
