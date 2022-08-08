import React, { Suspense, useContext, useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import { AppContext } from "../../../context/context";
import { dashboardProduitRoutes, getRoute } from "../../../routes";
import apiClient from "../../../services/api";
import url from "../../../url";
import ButtonGroup from "../includes/ButtonGroup";
import ButtonLink from "../includes/ButtonLink";
import CardInfo from "../includes/CardInfo";

const Product = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [data, setData] = useState([]);
    useEffect(() => {
        apiClient
            .get('compteur',{
              headers: { Authorization: `Bearer ${user.token}` },
          })
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data.response);
                } else {
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    //notify("error", error.response.data.message);
                } else {
                    //notify("error", error.response.data.message);
                }
            });
    }, []);
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Produits</h1>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                <CardInfo
                    icon={
                        <svg
                            className="col"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100"
                            height="48"
                            viewBox="0 0 512 512"
                            fill="#ffffff"
                            strokeWidth="16"
                            stroke="#3292f0"
                        >
                            <path d="M472.8 168.4C525.1 221.4 525.1 306.6 472.8 359.6L360.8 472.9C351.5 482.3 336.3 482.4 326.9 473.1C317.4 463.8 317.4 448.6 326.7 439.1L438.6 325.9C472.5 291.6 472.5 236.4 438.6 202.1L310.9 72.87C301.5 63.44 301.6 48.25 311.1 38.93C320.5 29.61 335.7 29.7 344.1 39.13L472.8 168.4zM.0003 229.5V80C.0003 53.49 21.49 32 48 32H197.5C214.5 32 230.7 38.74 242.7 50.75L410.7 218.7C435.7 243.7 435.7 284.3 410.7 309.3L277.3 442.7C252.3 467.7 211.7 467.7 186.7 442.7L18.75 274.7C6.743 262.7 0 246.5 0 229.5L.0003 229.5zM112 112C94.33 112 80 126.3 80 144C80 161.7 94.33 176 112 176C129.7 176 144 161.7 144 144C144 126.3 129.7 112 112 112z" />
                        </svg>
                    }
                    title="Catégories"
                    data={data && data.nombre_categorie}
                    
                />

                <CardInfo
                    icon={
                        <svg
                            className="col"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="48"
                            viewBox="0 0 512 512"
                            fill="#ffffff"
                            strokeWidth="16"
                            stroke="#3292f0"
                        >
                            <path d="M0 155.2C0 147.9 2.153 140.8 6.188 134.7L81.75 21.37C90.65 8.021 105.6 0 121.7 0H518.3C534.4 0 549.3 8.021 558.2 21.37L633.8 134.7C637.8 140.8 640 147.9 640 155.2C640 175.5 623.5 192 603.2 192H36.84C16.5 192 .0003 175.5 .0003 155.2H0zM64 224H128V384H320V224H384V464C384 490.5 362.5 512 336 512H112C85.49 512 64 490.5 64 464V224zM512 224H576V480C576 497.7 561.7 512 544 512C526.3 512 512 497.7 512 480V224z" />
                        </svg>
                    }
                    title="Produits"
                    data={data && data.nombre_produit}
                />
            </div>
            <div className="row my-2">
                <ButtonGroup>
                    <ButtonLink
                        url={url.dashboard_produit_liste}
                        name="Liste"
                    />
                    <ButtonLink
                        url={url.dashboard_produit_ajout}
                        name="Produits"
                    />
                    <ButtonLink
                        url={url.dashboard_produit_categorie}
                        name="Categories"
                    />
                </ButtonGroup>
            </div>

            <div className="row g-3 my-2">
                <Suspense fallback={<div>Chargement...</div>}>
                    <Routes>
                        {dashboardProduitRoutes.map((route, idx) => {
                            return getRoute(route, idx);
                        })}
                    </Routes>
                </Suspense>
            </div>
        </>
    );
};

export default Product;
