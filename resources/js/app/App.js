import React, { Suspense, useContext, useEffect } from "react";
import { Navigate, Routes } from "react-router-dom";
import { AppContext } from "./context/context";
import { appRoutes, getRoute } from "./routes";

const loader = document.querySelector(".preloader");

const showLoader = () => loader.classList.remove("preloader");
const addClass = () => loader.classList.add("loader-hide");

function App() {
    const path = window.location.pathname;
    const appTypeCtx = useContext(AppContext)
    const {appType, onAppTypeChange} = appTypeCtx
    useEffect(() => {
        showLoader();
        addClass();
        if(path.includes("app")){
            onAppTypeChange({mobile: true});
            console.log("url include app is "+appType.mobile)
        }
    }, []);
    return (
        <div className="row">
            <Routes>
                    {appRoutes.map((route, idx) => {
                        return getRoute(route, idx);
                    })}
            </Routes>
        </div>
    );
}

export default App;
