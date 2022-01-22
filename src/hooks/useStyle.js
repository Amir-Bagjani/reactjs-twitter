import { useContext } from "react";
import { StyleContext } from "../context/StyleContext";

export const useStyle = () => {
    const style = useContext(StyleContext);

    if(!style){
        throw Error('useStyle must be used inside an StyleContextProvider')
    }
    
    return style
}
 
