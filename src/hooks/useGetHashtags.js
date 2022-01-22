import { useState, useEffect,  } from "react";
import { useDependency } from '../hooks/useDependency'
import Axios from "axios";
import { useTranslation } from "react-i18next";


export const useGetHashtags = (url) => {
  const { t } = useTranslation();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { dependency } = useDependency(); //when tweet btn clicked, again get all tweets

  //set token in headers
  const setHeaders = () => {
    const localToken = localStorage.getItem(`user`);
    Axios.defaults.headers.common["x-auth-token"] = JSON.parse(localToken);
  };

  useEffect(() => {
    let source = Axios.CancelToken.source();

    const fetchData = async () => {
      setIsPending(true);
      setError(null);
      setData(null);
      try {
        const res = await Axios.get(url, { cancelToken: source.token });
        setData(res.data);
        setIsPending(false);
        setError(null);
      } catch (err) {
        if (Axios.isCancel(err)) {
          console.log(`fetch aborted`);
        } else {
          console.log(err.response.data.message);
          setError(t("cantfetch"));
          setIsPending(false);
          setData(null);
        }
      }
    };
    setHeaders();
    fetchData();
    
    return () => source.cancel();
  }, [dependency, url, t]);

  return { error, data, isPending };
};
