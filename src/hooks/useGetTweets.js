import { useState, useEffect } from "react";
import { useTweetContext } from "./useTweetContext";
import Axios from "axios";
import { useTranslation } from "react-i18next";

export const useGetTweets = (url, dep) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { tweetList, dispatch } = useTweetContext()

 

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
      dispatch({type: 'SET_TWEETLIST', payload: []});
      try{
        const res = await Axios.post(url, {cancelToken: source.token})
        dispatch({type: 'SET_TWEETLIST', payload: [...res.data]});
        setIsPending(false);
        setError(null);
      }catch(err){
        if(Axios.isCancel(err)){
          console.log(`fetch aborted`)
        }else{
          setError(t("cantfetch"))
          setIsPending(false);
          dispatch({type: 'SET_TWEETLIST', payload: []});
        }
      }
    };
    setHeaders();
    fetchData();

    return () => source.cancel();
  }, [dispatch, dep, url, t]);

  return { tweetList, error, isPending };
};
