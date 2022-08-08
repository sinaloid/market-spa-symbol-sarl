import React from "react";
import { Link } from "react-router-dom";
import url from "../../../../url";
import "./not_found/css/style.css";

const PaiementFailed = () => {
    return (
        <>
            
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404"></div>
                    <h1>404</h1>
                    <h2 className="text-primary my-3">Oops! échec du paiement </h2>
                    <p style={{lineHeight: '150%'}}>
                        Désolé le paiement a échouer, veuillez verifier:
                        <ul>
                            <li>le code de paiement</li>
                            <li>le montant que vous aviez saisi et le montant attendu</li>
                        </ul>
                    </p>
                    <Link to={url.home} className="link">Retour à la page d'accueil</Link>
                </div>
            </div>
        </>
    );
};

export default PaiementFailed;
