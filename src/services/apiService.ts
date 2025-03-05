import axios, { type AxiosResponse } from 'axios';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number | null;
}

const handleRequest = async <T>(request: Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await request;
    return { data: response.data, error: null, status: response.status };
  } catch(error: any) {
    if (axios.isAxiosError(error)) {
      return { data: null, error: error.message, status: null };
    }

    return { data: null, error: 'An unexpected error occurred.', status: null };
  }
}

export const apiService = {
  async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return handleRequest(axios.get(`${url}`, { params }));
  },

  async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return handleRequest(axios.post(`${url}`, data));
  },

  async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return handleRequest(axios.put(`${url}`, data));
  },

  async delete<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return handleRequest(axios.delete(`${url}`, { params }));
  },

  async patch<T>(url: string, data: any, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return handleRequest(axios.patch(`${url}`, data, { params }));
  },
}
