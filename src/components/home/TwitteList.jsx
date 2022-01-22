import { useEffect } from "react";
import { useLocation, useHistory, Link } from 'react-router-dom'
import Avatar from "../Avatar";
import { useTweetContext } from "../../hooks/useTweetContext";
import { useLike } from "../../hooks/useLike";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//images
import Like from '../../assets/like.png'
import Retweet from '../../assets/retweet.png'

//styles
import './TwitteList.css'

//toast
toast.configure()

const TwitteList = ({data}) => {
    const history = useHistory()
    const location = useLocation()
    const { dispatch } = useTweetContext()
    const { error, like } = useLike()

    const renderTweets = (text) => {
        return {__html: text.replace(/#\S+/g, `<span style="color: var(--primary-color)" href='/hashtags/$&'>$&</span>`)}
    }

    const handleRetweet = (item) => {
        dispatch({type: 'SET_TWEET', payload: item.text.slice(0, 139)})
        if(item.image) dispatch({type: 'IMG_PATH', payload: item.image})
        if(location.pathname !== "/") history.push("/")
        window.scrollTo(0, 0)
    }

    //show like's error if exist
    useEffect(() => {
        if(error){
            toast.error(error)
        }
    }, [error])
 

    return (
        <div>
             {data.map(item => (
                   <div className="twitte-list" key={item._id}>
                       <div title={item.user.name}><Link to={`/users/${item.user.name}/${item.user._id}`}><Avatar src={item.user.image}/></Link></div>
                       <div className='up'>
                            <span style={{fontWeight: `bold`}}>{item.user.name}</span>
                            <span style={{color: `var(--text-color)`, marginLeft: `8px`}}>@{item.user.username}</span>
                            <h6>{item.date.split("T")[0]}</h6>
                            <div className="img-text">
                                <p dangerouslySetInnerHTML={renderTweets(item.text.slice(0,139))} ></p>
                                {item.image && <div className="img"><img src={item.image} alt="tweet" /></div>}
                            </div>
                            <div className="btns">
                                <img src={Retweet} alt="retweet" onClick={()=>handleRetweet(item)} />
                                <img src={Like} alt="like" onClick={()=>like(item._id)} />
                                <p style={{color: `var(--text-color)`}}>{item.likes}</p>
                            </div>
                        </div>
                   </div>
                ))}
        </div>
    );
}
 
export default TwitteList;