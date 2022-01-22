import './Avatar.css'

import NullUser from '../assets/nulluser.png'

const Avatar = ({src, width = `60px`}) => {
    return (
        <div style={{width, height: width}} className="avatar">
            <img  src={src ? src : NullUser} alt="user avatar" />
        </div>
    );
}
 
export default Avatar;