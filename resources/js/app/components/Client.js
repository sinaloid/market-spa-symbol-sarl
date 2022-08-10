import React, { useContext } from "react";
import { AppContext } from "../context/context";
import Body from "./client/Body";
import Footer from "./client/Footer";
import Header from "./client/Header";
import Panier from "./client/header/Panier";

const Client = () =>{
    const appTypeCtx = useContext(AppContext)
    const {appType} = appTypeCtx
    const path = window.location.pathname
    return(

        <div className="col-12">
            {!appType.mobile  && <Header />}
            <Body />
            {appType.mobile && !path.includes('connexion') && !path.includes('faqs') && 
                <button className="float">
                <Panier path={'app'} color="#ffffff" className="" size="fa-xl" />
                </button>
            }
            {!appType.mobile && <Footer />}
        </div>
    );
}

export default Client;