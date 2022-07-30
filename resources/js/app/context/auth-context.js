import { values } from "lodash";
import { createContext, useState } from "react";
import apiClient from "../services/api";
import { getUser, setUser as updateUser } from "./action";


export const initialUser = {
    isAuth: false,
    type: 0,
    name: null,
    token: null,
}

export const AuthContext = createContext({
    user: initialUser,
    onUserChange: (data) => {},
})

export const AuthContextProvider = ({children}) => {
    const usrLocal = getUser('user') || initialUser //recuperation de l'utilisateur dans localStorage
    
    const [usr, setUser] = useState(usrLocal) // initialisation de l'utilisateur
    console.log(`user is get AuthContextProvider: ${usr}`)

    const handleAuthChange = (c) => { //fonction permetant de changer le status de l'utilisateur
        setUser(c);
        updateUser(c);
    }

    const contextValue = {
        user: usr,
        onUserChange: handleAuthChange,
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}