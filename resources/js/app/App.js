import React, { Suspense, useEffect } from "react";
import { Navigate, Routes } from "react-router-dom";
import Client from "./components/Client";
import { appRoutes, getRoute } from "./routes";

const loader = document.querySelector(".preloader");

const showLoader = () => loader.classList.remove("preloader");
const addClass = () => loader.classList.add("loader-hide");

function App() {
    useEffect(() => {
        showLoader();
        addClass();
    }, []);
    return (
        <div className="row">
            <Routes>
                <Route path="/*" element= {<Client />} />
                    {appRoutes.map((route, idx) => {
                        return getRoute(route, idx);
                    })}
            </Routes>
        </div>
    );
}

export default App;
