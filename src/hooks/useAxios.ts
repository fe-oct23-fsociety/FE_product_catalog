import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

export const useAxios = (params: AxiosRequestConfig<any> | null) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (arg: AxiosRequestConfig<any>): Promise<void> => {
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
  }, []);

  return [fetchData, loading, data, error] as const;
};
