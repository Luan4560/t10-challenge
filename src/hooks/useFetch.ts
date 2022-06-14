import { useEffect, useState } from "react"
import { api } from "../service/api";

export const useFetch = <T = unknown>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFething] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.get(url)
    .then(response => {
      setData(response.data)
    })
    .catch(err => {
      setError(err);
    })
    .finally(() => {
      setIsFething(false)
    })
  }, [url])

  return {
    data, 
    isFetching, 
    error, 
  }
}