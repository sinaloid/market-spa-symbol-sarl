import React from "react";
import Body from "./client/Body";
import Footer from "./client/Footer";
import Header from "./client/Header";
import Panier from "./client/header/Panier";

const Client = () =>{
    const app = "app"
    const path = window.location.pathname
    return(

        <div className="col-12">
            {!path.includes(app)  && <Header />}
            <Body />
            {path.includes(app) && !path.includes('connexion') && !path.includes('faqs') && 
                <button class="float">
                <Panier color="#ffffff" classe="" size="fa-xl" />
                </button>
            }
            {!path.includes(app) && <Footer />}
        </div>
    );
}

export default Client;