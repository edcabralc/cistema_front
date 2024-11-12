import { api } from "@/services/api";
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

interface TypeHttpRequest<T> {
  loading: boolean | null;
  error: string | null;
  data: T | null;
  reload: () => void;
  updateList: (d: any) => void;
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

  useEffect(() => {
    fetchData();

    return () => {
      // if (controllerRef.current) {
      //   controllerRef.current?.abort();
      // }
    };
  }, [url]);

  const reload = () => fetchData();

  const updateList = (d: any) => {
    setData({ ...data, ...d });
    console.log("dentro do useFetch", d);
    console.log("dentro do useFetch", data);
  };

  return { loading, error, data, reload, updateList };
};
