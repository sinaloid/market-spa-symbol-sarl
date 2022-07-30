import React from "react";
import { Link } from "react-router-dom";
import url from "../../../../../url";
import "../not_found/css/style.css";

const NotFound = () => {
    return (
        <>
            
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404"></div>
                    <h1>404</h1>
                    <h2>Oops! Page introuvable</h2>
                    <p>
                        Désolé mais la page que vous cherchez n'existe pas. Peut-être que :
                        <ul>
                            <li>elle a été supprimés</li>
                            <li>son nom a changé</li>
                            <li>elle est temporairement indisponible</li>
                        </ul>
                    </p>
                    <Link to={url.home} className="link">Retour à la page d'accueil</Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;
