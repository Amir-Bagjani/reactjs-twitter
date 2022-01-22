import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import './NotFound.css'

import NF from '../assets/404.jpg'

const NotFound = () => {
    const { t } = useTranslation();

    return ( 
        <div className="not-found">
            <div>
                <Link to='/'>{t("notfound")}</Link>
                <img src={NF} alt="not-found-page" />
            </div>
        </div>
    );
}
 
export default NotFound;