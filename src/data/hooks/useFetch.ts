import { api } from "@/data/services/api";

export const useFetch = () => ({
  getData: async (endpoint: string) => {
    try {
      const response = await api.get(endpoint, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },

  postData: async (endpoint: string, payload: any) => {
    try {
      const response = await api.post(endpoint, payload, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
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

  editData: async (endpoint: string, payload: any) => {
    try {
      const response = await api.put(endpoint, payload, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
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
