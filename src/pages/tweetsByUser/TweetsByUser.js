import TwitteList from "../../components/home/TwitteList";
import Header from "../../components/home/Header";
import { useParams } from "react-router";
import { useGetTweetsUser } from '../../hooks/useGetTweetsUser'
import { useTranslation } from "react-i18next";

import "./TweetsByUser.css";

import User from "../../assets/user.png";

const TweetsByUser = () => {
  const { t } = useTranslation();
  const { user, id } = useParams();
  const { isPending, tweetList } = useGetTweetsUser(`https://twitterapi.liara.run/api/getAllTweet`, id)
  
  return (
    <>
      <Header src={User} title={user} />
      {isPending && <p>{t("loading")}</p>}
      {tweetList && tweetList.length !== 0 && <TwitteList data={tweetList} />}
      {!isPending && tweetList.length === 0 && <p style={{textAlign: `center`, marginTop: `5rem`}}>{t("notweet")}</p>}
    </>
  );
};

export default TweetsByUser;
