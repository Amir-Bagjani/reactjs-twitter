import { useState, useEffect  } from "react";
import  Axios  from "axios";
import { useTranslation } from "react-i18next";

export const useFetch = (url) => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  //set token in headers
  const setHeaders = () => {
    const localToken = localStorage.getItem(`user`)
    Axios.defaults.headers.common['x-auth-token'] = JSON.parse(localToken);
  }
  
  useEffect(() => {
    let source = Axios.CancelToken.source();
   
    const fetchData = async() => {
      setIsPending(true);
      setError(null);
      setData(null);
      try{
        const res = await Axios.get(url, {cancelToken: source.token})
        setData(res.data);
        setIsPending(false);
        setError(null);
      }catch(err){
        if(Axios.isCancel(err)){
          console.log(`fetch aborted`)
        }else{
          setError(t("cantfetch"))
          setIsPending(false);
          setData(null);
        }
      }
    };
    setHeaders();
    fetchData();

    return () => source.cancel()

  }, [url, t]);

  return { isPending, data, error };
};
