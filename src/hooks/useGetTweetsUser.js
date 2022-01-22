import { useState, useEffect } from "react";
import { useTweetContext } from "./useTweetContext";
import Axios from "axios";

export const useGetTweetsUser = (url, id) => {
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
        const res = await Axios.post(url, {user: id}, {cancelToken: source.token})
        setIsPending(false);
        dispatch({type: 'SET_TWEETLIST', payload: [...res.data]});
        setError(null);
      }catch(err){
        if(Axios.isCancel(err)){
          console.log(`fetch aborted`)
        }else{
          setError(`could not fetch the data`)
          setIsPending(false);
          dispatch({type: 'SET_TWEETLIST', payload: []});
        }
      }
    };
    setHeaders();
    fetchData();

    return () => source.cancel();
  }, [dispatch, url, id]);

  return { tweetList, error, isPending };
};
