import { useState, useEffect } from 'react';
import Axios from 'axios'
import { useAuthContext } from './useAuthContext'
import { useTranslation } from "react-i18next";

export const useSignup = () => {
    const { t } = useTranslation();
    const [isCancelled, setIsCancelled] = useState(false)
    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async(name, username, password) => {
        setError(null)
        setIsPending(true)
        try{
            //signup
            const res = await Axios.post(`https://twitterapi.liara.run/api/register`, {name, username, password})
            console.log(res.data);
           if(!isCancelled){
            localStorage.setItem(`user`, JSON.stringify(res.data['x-auth-token']))
            setError(null)
            setIsPending(false)
            dispatch({type: 'LOGIN', payload: res.data})
           }
        }catch(err){
            if(!isCancelled){
                setError(t("sameuser"))
                setIsPending(false)
            }
        }
    }


    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return {signup, isPending, error}
}
 
