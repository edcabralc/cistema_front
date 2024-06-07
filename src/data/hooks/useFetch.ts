import { useState, useEffect, useRef } from "react";
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { api } from "../services/api";

interface TypeHttpRequest<T> {
  loading: boolean | null;
  error: string | null;
  data: T | null;
}

export const useFetch = <T>(
  url: string,
  config?: AxiosRequestConfig
): TypeHttpRequest<T> => {
  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const configRef = useRef(config);
  configRef.current = config;

  const controllerRef = useRef<AbortController | null>(null);
  controllerRef.current = new AbortController();
  const { signal } = controllerRef.current;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<T> = await api(url, {
          signal,
          ...configRef.current,
        });

        if (response.status !== 200) {
          throw new Error("Erro ao obter os dados");
        }
        setData(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error.message);
        }
      }
    };

    fetchData();

    // return () => {
    //   if (controllerRef.current) {
    //     controllerRef.current?.abort();
    //   }
    // };
  }, [url]);

  return { loading, error, data };
};

// export const useFetch = () => ({
//   getData: async <T>(endpoint: string): Promise<AxiosResponse<T[]>> => {
//     try {
//       const response: AxiosResponse<T[]> = await api.get<T[]>(endpoint);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   postData: async <T>(
//     endpoint: string,
//     payload: T
//   ): Promise<AxiosResponse<T>> => {
//     try {
//       const response: AxiosResponse<T> = await api.post<T>(endpoint, payload, {
//         withCredentials: true,
//       });

//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },
//   uploadFile: async (endpoint: string, payload: any) => {
//     try {
//       const response = await api.post(endpoint, payload, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       return response;
//     } catch (error) {
//       return error;
//     }
//   },
//   deleteData: async (endpoint: string, payload: any) => {
//     try {
//       const response = await api.delete(endpoint, {
//         withCredentials: true,
//       });

//       return response;
//     } catch (error) {
//       return error;
//     }
//   },

//   editData: async <T>(
//     endpoint: string,
//     payload: T
//   ): Promise<AxiosResponse<T>> => {
//     try {
//       const response: AxiosResponse<T> = await api.patch<T>(endpoint, payload, {
//         withCredentials: true,
//       });

//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   deleteClient: async (id: string) => {
//     const endpoint = `/client/${id}`;
//     try {
//       const response = await api.delete(endpoint, {
//         withCredentials: true,
//       });

//       return response;
//     } catch (error) {
//       return error;
//     }
//   },

//   deleteCompany: async (id: string) => {
//     const endpoint = `/company/${id}`;
//     try {
//       const response = await api.delete(endpoint, {
//         withCredentials: true,
//       });

//       return response;
//     } catch (error) {
//       return error;
//     }
//   },
// });
