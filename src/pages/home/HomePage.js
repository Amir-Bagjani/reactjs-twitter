import { useDependency } from '../../hooks/useDependency';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGetTweets } from '../../hooks/useGetTweets';
import { useTranslation } from "react-i18next";

//components
import Header from '../../components/home/Header';
import Tweet from './Tweet';
import TwitteList from '../../components/home/TwitteList';

//images
import Home from '../../assets/home.png'

//styles
import './HomePage.css'

const HomePage = () => {
    const { t } = useTranslation();
    const { dependency } = useDependency()
    const { isPending, tweetList, error } = useGetTweets(`https://twitterapi.liara.run/api/getAllTweet`, dependency)

    useEffect(() => {
        if(error) toast.error(error)
    }, [error])

    return (
        <div className="home-page">
            <Header src={Home} title={t("home")}/>
            <Tweet />
            {isPending && <p>Loading...</p>}
            {tweetList && <TwitteList data={tweetList}/>}
        </div>
    );
}
 
export default HomePage;