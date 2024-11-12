import { api } from "@/services/api";
import { AxiosResponse } from "axios";

export const useApi = () => ({
  getData: async <T>(endpoint: string): Promise<AxiosResponse<T[]>> => {
    try {
      const response: AxiosResponse<T[]> = await api.get<T[]>(endpoint);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postData: async <T>(
    endpoint: string,
    payload: T
  ): Promise<AxiosResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await api.post<T>(endpoint, payload, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  uploadFile: async (endpoint: string, payload: any) => {
    try {
      const response = await api.post(endpoint, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  deleteData: async (endpoint: string, payload: any) => {
    try {
      const response = await api.delete(endpoint, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },

  editData: async <T>(
    endpoint: string,
    payload: T
  ): Promise<AxiosResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await api.patch<T>(endpoint, payload, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteClient: async (id: string) => {
    const endpoint = `/client/${id}`;
    try {
      const response = await api.delete(endpoint, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },

  deleteCompany: async (id: string) => {
    const endpoint = `/company/${id}`;
    try {
      const response = await api.delete(endpoint, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
});
