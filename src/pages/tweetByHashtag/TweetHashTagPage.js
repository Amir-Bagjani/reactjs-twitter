import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useGetTweetsHashtag } from '../../hooks/useGetTweetsHashtag';
import { useTranslation } from "react-i18next";

//components
import Header from "../../components/home/Header";
import TwitteList from "../../components/home/TwitteList";

//images
import Hashtag from "../../assets/hashtag.png";

//style
import "./TweetHashTagPage.css";

const TweetHashTagPage = () => {
  const { t } = useTranslation();
  const { hashtag } = useParams()
  const { isPending, tweetList, error } = useGetTweetsHashtag(`https://twitterapi.liara.run/api/getAllTweet`, hashtag)

  useEffect(() => {
    if(error){
        toast.error(error)
    }
}, [error])

  return (
    <>
      <Header src={Hashtag} title={hashtag} />
      {isPending && <p>{t("loading")}</p>}
      {tweetList && <TwitteList data={tweetList}/>}
    </>
  );
};

export default TweetHashTagPage;
