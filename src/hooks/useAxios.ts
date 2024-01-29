import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type RequestParams = {
  method: 'get';
  url: string;
};

export const useAxios = <T>(
  params: AxiosRequestConfig<RequestParams> | null,
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | unknown | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (
    arg: AxiosRequestConfig<RequestParams>,
  ): Promise<void> => {
    try {
      const response = await axios.request(arg);

      setData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Axios Error with Message: ${err.message}`);
      } else {
        setError(err);
      }

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params) {
      fetchData(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [fetchData, loading, data, error] as const;
};
