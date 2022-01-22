import { useEffect, useRef } from 'react'
import { useAxios } from "../../hooks/useAxios";
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTweetContext } from '../../hooks/useTweetContext'
import { useDependency } from '../../hooks/useDependency'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";

//components
import Avatar from "../../components/Avatar";

//image
import Pic from "../../assets/picture.png";

//toast
toast.configure()

const Tweet = () => {
  const { t } = useTranslation();
  const { response, postData } = useAxios()
  const { user } = useAuthContext()
  const { tweet, tweetImg, tweetImgPath, dispatch } = useTweetContext()
  const { changeDependency } = useDependency()
  const inputImage = useRef()

  const handleClick = async() => {
    if(tweet !== ``){
      const data = new FormData();
      data.append("text", tweet)
      if(tweetImg) data.append("image", tweetImg)
      if(tweetImgPath) data.append("image", tweetImgPath)
      await postData(`https://twitterapi.liara.run/api/newTweet`, data);
      changeDependency();//refetch the tweet list
      return
    }
    toast.error(`Empty tweet!?`)
  }

  const removeImage = () => {
    dispatch({type: 'SET_TWEET_IMG', payload: null})
    dispatch({type: 'IMG_PATH', payload: null})
  }

  const handleChange = (e) => {
    e.preventDefault();
    //first clear the state
    dispatch({type: 'SET_TWEET_IMG', payload: null})
    let selected = e.target.files[0]
    if(!selected) return
    if(!selected.type.includes(`image`)){
      toast.error(`Selected file must be an image`)
      return
    }
    dispatch({type: 'IMG_PATH', payload: URL.createObjectURL(selected)})
    dispatch({type: 'SET_TWEET_IMG', payload: selected})
  }
  
  //clear the textarea and img
  useEffect(() => {
    if(response.success){
      dispatch({type: 'IMG_PATH', payload: null})
      dispatch({type: 'SET_TWEET', payload: ``})
      dispatch({type: 'SET_TWEET_IMG', payload: null})
    }
  }, [dispatch, response.success])

  return (
    <div className="twitte">
      <div className="uper">
        <div><Avatar src={user.image} /></div>
        <div className='tweet-image'>
          <textarea placeholder={t("areaplaceh")} value={tweet} onChange={(e) => dispatch({type: 'SET_TWEET', payload: e.target.value.slice(0, 139)})}/>
          {(tweetImgPath) && <img style={{maxWidth: `100%`, maxHeight: `20rem`}} src={tweetImgPath} alt='tweet' />}
          {(tweetImgPath) && <div><button onClick={removeImage} className='remove-image'> Remove image</button></div>}
        </div>
      </div>
      <div className="btns">
        {!response.isPending && <button className="btn" onClick={handleClick}>{t("tweetbtn")}</button>}
        {response.isPending && <button disabled className="btn">{t("loading")}</button>}
        <img src={Pic} alt="upload-img" onClick={()=>inputImage.current.click()} />
        <input ref={inputImage} onChange={e=>handleChange(e)} type="file" style={{display: `none`}} />
      </div>
      {response.error && console.log(response.error)}
    </div>
  );
};

export default Tweet;
