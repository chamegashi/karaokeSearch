import type { AxiosResponse } from "axios";
import axios from "axios";
import { useCallback, useState } from "react";

// const hostname = process.env.NEXT_PUBLIC_BASE_URI;
const hostname = "https://dry-lake-67755.herokuapp.com/";

export type contentsResponse = {
  damResponce: content[];
  joyResponce: content[];
};

export type content = {
  artist: string,
  song: string,
  songId: string,
}

export const GetContentsData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<contentsResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getFn = useCallback(async (keyword: string) => {
    setLoading(true);

    let url = `${hostname}/api/search?keyword=` + keyword;

    await axios
      .get<contentsResponse>(url)
      .then(async (res) => {
        const responseData = await res.data;
        setResponse(responseData);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { loading, error, response, getFn };};
