import { useRef, useEffect, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { useAxios } from "../hooks/useAxios";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import { useStyle } from "../hooks/useStyle";

import "./Menu.css";

//toast
toast.configure()

const Menu = () => {
  const { t } = useTranslation();
  const { closeModal } = useStyle()
  const { changeLang } = useContext(LanguageContext)
  const { logout } = useLogout();
  const inputImage = useRef()
  const { dispatch } = useAuthContext()
  const { postData, response } = useAxios()

  const handleChange = (e) => {
    e.preventDefault();
    let selected = e.target.files[0]
    if(!selected) return
    if(!selected.type.includes(`image`)){
      toast.error(`Selected file must be an image`)
      return
    }
    const data = new FormData();
    data.append("image", selected)
    postData(`https://twitterapi.liara.run/api/uploadUserPhoto`, data)
  }

  const changeAvatar = () => {
    inputImage.current.click()
    closeModal()//close the all modal
  };

  const changeLanguage = () => {
    changeLang()
    closeModal()//close the all modal
  }
  const handleLogout = () => {
    logout()
    closeModal()//close the all modal
  }

  useEffect(() => {
      if(response.error){
        toast.error(`Failed!! please try again`)
      }
      if(response.success){
        toast.success(`Your Avatar just changed`)
      }
      if(response.data){
        dispatch({type: 'AVATAR_CHANGE', payload: response.data.imagePath})
      }
  }, [dispatch, response.error, response.success, response.data])

  return (
    <>
      <input ref={inputImage} onChange={e=>handleChange(e)} type="file" style={{display: `none`}} />
      <div className="menu">
        <ul>
          <li onClick={changeAvatar}>{t("avatar")}</li>
          <li onClick={changeLanguage}>{t("lang")}</li>
          <li onClick={handleLogout}>{t("logout")}</li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
