import React,{useLayoutEffect} from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app/assets/auth/auth.css";
import "./index.css";
import App from "./App";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AppContextProvider } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("app"));
export const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};
root.render(
    <AppContextProvider>
        <BrowserRouter>
            <Wrapper>
                <App />
            </Wrapper>
        </BrowserRouter>
    </AppContextProvider>
);
