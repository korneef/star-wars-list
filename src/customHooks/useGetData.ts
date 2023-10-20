import { useEffect, useRef, useState } from 'react';

function useGetData<T>(query: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const isMounted = useRef(true);

  useEffect(() => {
    if (query === '') {
      setIsLoading(false);
      setData(null);
      setIsError(false);
      return
    }

    const controller = new AbortController()
    setIsLoading(true);
    setIsError(false);
    fetch(query, {
      signal: controller.signal
    })
      .then(async (res) => await res.json())
      .then((res: T) => {
        if (isMounted) {
          setIsLoading(false);
          setIsError(false);
          setData(res);
        }
      })
      .catch((err) => {
        if (!(err.name === 'AbortError') && isMounted.current) setIsError(true);
      })
    return () => {
      isMounted.current = false;
      controller.abort();
    }
  }, [query])

  return {
    data,
    isLoading,
    isError
  };
}

export default useGetData;
