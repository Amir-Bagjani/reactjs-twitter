import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useStyle } from "../../hooks/useStyle";

import "./Header.css";

import TwitteLogo from "../../assets/twitter.png";
import HamMenu from "../../assets/hammenu.png";
import HashMenu from "../../assets/hashmenu.png";

const Header = ({ src, title }) => {
  const { setShowL, setShowR } = useStyle()
  
  //when scroll change the bc color of header
  const [scroll, setScroll] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScroll(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  return (
    <div className="head"  >
      <div className="top" style={{backgroundColor: scroll ? `#e2f0f8` : `#fff`}}>
        <div className="ham-menu">
          <img onClick={()=>setShowL(true)} width={`32px`} src={HamMenu} alt="menu" />
        </div>
        <Link to="/">
          <div className="logo">
            <img src={TwitteLogo} alt="twitter-logo" />
            <h1>Twitter</h1>
          </div>
        </Link>
        <div >
          <img onClick={()=>setShowR(true)} width={`32px`} src={HashMenu} alt="menu" />
        </div>
      </div>
      <div className="header" style={{backgroundColor: scroll ? `#e2f0f8` : `#fff`}}>
        <img src={src} alt="icon" />
        <p>{title}</p>
      </div>
    </div>
  );
};
export default Header;
