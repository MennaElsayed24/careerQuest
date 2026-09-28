import { api } from "../../lib/axios";

export const apiClient = {
  get: async <T>(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<T> => {
    const response = await api.get<T>(url, {
      params,
    });

    return response.data;
  },

  post: async <T, D>(
    url: string,
    data: D,
  ): Promise<T> => {
    const response = await api.post<T>(url, data);

    return response.data;
  },

  put: async <T, D>(
    url: string,
    data: D,
  ): Promise<T> => {
    const response = await api.put<T>(url, data);

    return response.data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const response = await api.delete<T>(url);

    return response.data;
  },
};