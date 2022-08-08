import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../../../services/api";
import url from "../../../../url";
import pay from "../../../../assets/img/payment.gif"

const PaiementSuccess = () => {
    let { commandSlug } = useParams();
    const [message, setMessage] = useState('');

    useEffect(() => {
        apiClient
                .get(`paiement/success/${commandSlug}`)
                .then((res) => {
                    console.log(res);
                    setMessage(res.data.response);
                    if (false) {
                        
                        //console.log("user type change : " + res.data.type);
                    } else {
                        //console.log("user type not change : " + res.data.type);
                    }
                    
                })
                .catch((error) => {
                    console.log(error.response);
                });
    }, []);
    return (
        <>
            
            <div id="notfound">
                <div className="notfound">
                    <div>
                        <img src={pay} width="200" alt="" />
                    </div>
                    <h2 className="my-4">{message}</h2>
                    {/*<h1>404</h1>
                    
                    <p>
                        Désolé mais la page que vous cherchez n'existe pas. Peut-être que :
                        <ul>
                            <li>elle a été supprimés</li>
                            <li>son nom a changé</li>
                            <li>elle est temporairement indisponible</li>
                        </ul>
                    </p>*/}
                    <Link to={url.home} className="link">Retour à la page d'accueil</Link>
                </div>
            </div>
        </>
    );
};

export default PaiementSuccess;
