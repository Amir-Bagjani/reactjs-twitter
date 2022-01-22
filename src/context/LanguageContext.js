import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageContext = createContext()

const LanguageContextProvider = ({children}) => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(false)
    const changeLang = () => {
        setLang(!lang)
    }

    useEffect(() => {
        const localLang = JSON.parse(localStorage.getItem(`language`))
        setLang(localLang ? localLang : false)
    }, [])

    useEffect(() => {
        i18n.changeLanguage(lang ? 'pe' : 'en');
        localStorage.setItem(`language`, JSON.stringify(lang))
    }, [lang, i18n])

    return (
        <LanguageContext.Provider value={{changeLang}}>
            {children}
        </LanguageContext.Provider>
    );
}
 
export default LanguageContextProvider;