import { values } from "lodash";
import { createContext, useState } from "react";
import apiClient from "../services/api";
import { getProduit, getUser, setProduit, setUser as updateUser } from "./action";


export const initialUser = {
    isAuth: false,
    type: 0,
    name: null,
    token: null,
}

export const initialCart = {
    compteur: 0,
    content: []
}

export const initAppType = {
    mobile: false
}

export const AppContext = createContext({
    user: initialUser,
    onUserChange: (data) => {},

    cart: initialCart,
    onCartChange: (data) => {},

    appType: initAppType,
    onAppTypeChange: (data) => {},
})


export const AppContextProvider = ({children}) => {
    const usrLocal = getUser('user') || initialUser //recuperation de l'utilisateur dans localStorage
    const cartLocal = getProduit() || initialCart
    
    
    const [usr, setUser] = useState(usrLocal) // initialisation de l'utilisateur
    console.log(`user is get AuthContextProvider: ${usr}`)

    const handleAuthChange = (c) => { //fonction permetant de changer le status de l'utilisateur
        setUser(c);
        updateUser(c);
    }

    const [crt, setCart] = useState(cartLocal)
    const handleCartChange = (c) => {
        setCart(c)
        setProduit(c)
    }

    const [appType, setAppType] = useState(initAppType)
    const handleAppTypeChange = (c) => {
        setAppType(c)
    }

    

    const contextValue = {
        user: usr,
        onUserChange: handleAuthChange,
        cart: crt,
        onCartChange: handleCartChange,
        appType: appType,
        onAppTypeChange:handleAppTypeChange,
    }

    return(
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}