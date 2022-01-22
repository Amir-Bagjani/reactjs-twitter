import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const StyleContext = createContext()

const StyleContextProvider = ({children}) => {
    const location = useLocation()

    const [showR, setShowR] = useState(false)
    const [showL, setShowL] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const closeModal = () => {
        setShowR(false)
        setShowL(false)
        setShowMenu(false)
    }

    //if page changed close tha all modal
    useEffect(() => {
        closeModal()
      }, [location.pathname])

    return (
        <StyleContext.Provider value={{showR, setShowR, showL, setShowL, showMenu, setShowMenu, closeModal}}>
            {children}
        </StyleContext.Provider>
    );
}
 
export default StyleContextProvider;