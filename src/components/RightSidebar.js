import { Link } from 'react-router-dom'
import { useGetHashtags } from '../hooks/useGetHashtags'
import { useStyle } from '../hooks/useStyle';
import { useTranslation } from "react-i18next";

//images
import TwitteLogo from '../assets/twitter.png'
import Hashtag from '../assets/hashtag.png'

//styles
import './RightSidebar.css'

const RightSidebar = () => {
    const { t } = useTranslation();
    const { showMenu } = useStyle()
    const { isPending, data: hashTags } = useGetHashtags(`https://twitterapi.liara.run/api/getAllHashTags`)

    return (
        <div className="right-sidebar" style={{ zIndex: showMenu ? `-1`: `0`}}>
            <Link to='/'>
                <div className="logo">
                    <img src={TwitteLogo} alt="twitter-logo" />
                    <h1>Twitter</h1>
                </div>
            </Link>
            <div className="hashtags">
                <p style={{fontWeight: `bold`}}>{t("hottesthashtag")}</p>
                <ul>
                {isPending && <p>{t("loading")}</p>}
                {hashTags && hashTags.map(item => (
                    <li key={item._id}>
                        <Link to={`/hashtags/${item.text}`}>
                            <img src={Hashtag} alt="hashtag" />
                            <p>{item.text}</p>
                        </Link>
                    </li>
                ))}
                </ul>
            </div>

        </div>
    );
}
 
export default RightSidebar;