import { useState, useCallback } from "react";
import getAxiosClient from "../getAxiosClient";

const useAxios = ({ silent = true, showNotification = false } = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (requestParams, callback) => {
    setLoading(true);

    setError(null);

    const client = getAxiosClient();

    try {
      // 2. Fire the request
      const response = await client.request({
        ...requestParams,
        silent,
        showNotification,
      });

      const { status, data } = response;

      // 3. Handle success
      setResponse(response.data);
      if (callback && typeof callback === "function") {
        callback(status, data);
      }

      return response.data;
    } catch (err) {
      const { status } = err;
      // 4. Handle error
      setError(err);
      if (callback && typeof callback === "function") {
        callback(status, err);
      }
      throw err; // Re-throw so the component can catch it if needed
    } finally {
      // 5. Turn off loader
      setLoading(false);
    }
  }, []); // No dependencies needed now

  return { response, error, loading, fetchData };
};

export default useAxios;
