import React, { Suspense } from "react";
import { Routes } from "react-router-dom";
import { bodyRoutes, getRoute } from "../../routes";
import Cart from "./Cart";
import Panier from "./header/Panier";

const Body = () => {
    return (
        <div className="container main">
            <Suspense fallback={<div>Chargement...</div>}>
            <Routes>
                {bodyRoutes.map((route, idx) => {
                    return getRoute(route, idx)
                })}
            </Routes>

            <Cart />
            </Suspense>
        </div>
    );
};

export default Body;
