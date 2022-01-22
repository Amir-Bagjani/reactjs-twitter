import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSignup } from '../../hooks/useSignup'
import { useTranslation } from "react-i18next";

import "./SignupPage.css";

//toast
toast.configure()

const SignupPage = () => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { signup, isPending, error } = useSignup()


  const validation = (user) => {
    if(!user.fullName.match(/^[a-zA-Z].*[\s\.]*$/g)){
      return t("enterfullnameerr")
    }
    if(!user.username.match(/^[a-zA-Z].*[\s\.]*$/g)){
      return t("enterusernameerr")
    }
    if(!user.password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")){
      return t("chosepassworderr")
    }
    if(user.confirmPass === `` ){
      return t("enterconfirmerr")
    }
    if(user.password !== user.confirmPass){
      return t("samepassworderr")
    }
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validation({fullName, username, password, confirmPass})
    if(error){
      toast.error(error)
      return
    }
    signup(fullName, username, password);
  }

  //show error if exist
  useEffect(() => {
    if(error){
      toast.error(error)
    }
  }, [error])

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{t("signup")}</h2>
        <label>
          <span>{t("fullnamel")}</span>
          <input
            placeholder={t("fullnamep")}
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </label>
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
        <label>
          <span>{t("confirml")}</span>
          <input
            placeholder={t("confirmp")}
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </label>
        {isPending && <button className="btn" disabled>{t("loading")}</button>}
        {!isPending && <button className="btn">{t("signup")}</button>}
        <p>
          <Link to="/login">{t("signuptext")}</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
