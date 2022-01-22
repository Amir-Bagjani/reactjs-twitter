import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import { useStyle } from "../hooks/useStyle";
//components
import Avatar from "./Avatar";
import Menu from "./Menu";

//images
import DotMenu from "../assets/dot-menu.png";

//styles
import "./LeftSidebar.css";

//toast
toast.configure()

const LeftSidebar = () => {
  const { t } = useTranslation();
  const { isPending, data, error } = useFetch(`https://twitterapi.liara.run/api/getAllUser`);
  const { user } = useAuthContext();

  //modal menu
  const { showMenu, setShowMenu, closeModal } = useStyle()

  //show error if exist
  useEffect(() => {
    if(error){
      toast.error(error)
    }
  }, [error])

  
  return (
    <div className="left-sidebar">
      {showMenu && <div onClick={()=>closeModal()} className="backDrop"></div>}
      {/*modal*/}
      <div className="menu-section" style={{ display: showMenu ? `block` : `none` }}><Menu /></div>
      <div className="leftbarTop">
        <div className="user">
          <div>
            <Avatar src={user.image} />
          </div>
          <div>
          <p style={{marginBottom: `0.3rem`}}>{user.name}</p>
          <p style={{color: `#777`, fontSize: `0.9rem`}}>@{user.username}</p>
          </div>
        </div>
        <div style={{ cursor: `pointer`, marginTop: `-24px` }}>
          <img onClick={() => setShowMenu(true)} src={DotMenu} alt="menu" style={{ height: `20px` }}/>
        </div>
      </div>
      <div className="best-reporters">
        <p>{t("allusers")}</p>
        <ul>
          {isPending && <p>Loading...</p>}
          {data && data.map((user) => (
              <li key={user._id}>
                <Link to={`/users/${user.name}/${user._id}`}>
                  <div><Avatar width={`50px`} src={user.image} /></div>
                  <div style={{ marginLeft: `0.9rem` }}>
                    <p>{user.name}</p>
                    <p style={{ color: `var(--text-color)` }}>@{user.username}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
