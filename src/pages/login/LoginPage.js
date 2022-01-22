import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLogin } from "../../hooks/useLogin";
import { useTranslation } from "react-i18next";

//style
import "./LoginPage.css";

//toast
toast.configure()

const LoginPage = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const validation = (user) => {
    if(!user.username.match(/^[a-zA-Z].*[\s\.]*$/g)){
      return t("enterusernameerr")
    }
    if(user.password === ``){
      return t("enterpassworderr")
    }
    return null
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    e.preventDefault()
    const error = validation({username, password});
    if(error){
      toast.error(error)
      return
    }
    login(username, password);
  };

  // show error if exist
  useEffect(() => {
    if(error){
      toast.error(error)
    }
  }, [error])
  

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} className="form">
        <h2>{t("login")}</h2>
        <label>
          <span>{t("usernamel")}</span>
          <input
            placeholder={t("usernamep")}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <label>
          <span>{t("passwordl")}</span>
          <input
            placeholder={t("passwordp")}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {!isPending && <button className="btn">{t("login")}</button>}
        {isPending && <button className="btn" disabled>{t("loading")}</button>}
        <p><Link to="/signup">{t("logintext")}</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
