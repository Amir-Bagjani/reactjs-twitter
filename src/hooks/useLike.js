import { useState, useEffect } from 'react';
import { useTweetContext } from './useTweetContext';
import Axios from 'axios'
import { useTranslation } from "react-i18next";

export const useLike = () => {
    const { t } = useTranslation();
    const { dispatch } = useTweetContext()
    const [error, setError] = useState(null)

    let source = Axios.CancelToken.source();

    const like = async(id) => {
        try{
            const localToken = localStorage.getItem(`user`)
            Axios.defaults.headers.common['x-auth-token'] = JSON.parse(localToken);
            await Axios.get(`https://twitterapi.liara.run/api/likeTweet/${id}`, {cancelToken: source.token})
            dispatch({type: 'LIKE_TWEET', payload: id})
        }catch(err){
            if(Axios.isCancel(err)){
                console.log(`fetch aborted`)
            }else{
                setError(t("faildlike"))
            }
        }
    }

    useEffect(() => {
        return () => source.cancel();
    }, [source])

    return {error, like}
}

