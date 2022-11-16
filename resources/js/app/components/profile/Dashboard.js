import React, { Suspense, useContext, useEffect, useState } from "react";
import { Link, Navigate, Routes } from "react-router-dom";
import "./dashboard.css";
import { dashboardRoutes, getRoute } from "../../routes";
import url from "../../url";
import { deleteUser } from "../../context/action";
import apiClient from "../../services/api";
import { AppContext, initialUser } from "../../context/context";

const Dashboard = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const icSize = { fontSize: "1.2em" };
    const [type, setType] = useState(user.type);
    const app = "app"
    const path = window.location.pathname
    /* (function () {
      setInterval(function () {
        axios.get('/route/to/partial/view',)
            .then(function(response){
                    document.querySelector('#partial')
                            .innerHtml(response.data);
            }); // do nothing for error - leaving old content.
        }); 
    }, 60000); // milliseconds
  })();*/

    useEffect(() => {
        if (user.token != null) {
            //console.log('token: ',user.token)
            setInterval(() => {
                apiClient
                    .get("user", {
                        headers: { Authorization: `Bearer ${user.token}` },
                    })
                    .then((res) => {
                        if (user.type != res.data.type) {
                            user.type = res.data.type;
                            setType(user.type);
                            onUserChange(user);
                            //console.log("user type change : " + res.data.type);
                        } else {
                            //console.log("user type not change : " + res.data.type);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                    });
            }, 5000);
        }
    }, []);

    const deconnect = () => {
        onUserChange(initialUser);
        deleteUser();
    };

    const autorisation = (view) => {
        if (type == 2) {
            return view;
        }
    };
    return (
        <>
            {user.isAuth ? (
                <>
                    <header className="navbar navbar-dark sticky-top bg-white flex-md-nowrap p-0 shadow">
                        <Link
                            className="navbar-brand col-md-3 col-lg-2 bg-primary me-0 px-3"
                            to={url.dashboard_home}
                        >
                            {user.name}
                        </Link>
                        <button
                            className="navbar-toggler custom-toggler position-absolute d-md-none collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <input
                            className="form-control form-control-dark w-100"
                            type="text"
                            placeholder="Recherche"
                            aria-label="Search"
                        />
                        <div className="navbar-nav">
                            <div className="nav-item text-nowrap ">
                                <Link
                                    className="nav-link text-black px-3"
                                    to={url.home}
                                    onClick={() => deconnect()}
                                >
                                    Déconnexion
                                </Link>
                            </div>
                        </div>
                    </header>

                    <div className="container-fluid">
                        <div className="row">
                            <nav
                                id="sidebarMenu"
                                className="col-md-3 col-lg-2 d-md-block sidebar collapse card"
                            >
                                <div className="position-sticky pt-3">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link active py-0"
                                                aria-current="page"
                                                to={url.dashboard_home}
                                            >
                                                {console.log(
                                                    url.dashboard_home
                                                )}
                                                <i
                                                    className="fa-solid fa-house ic"
                                                    style={icSize}
                                                ></i>
                                                <span
                                                    className="py-0 mx-1"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target=".collapse.show"
                                                >
                                                    Votre compte
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to={url.dashboard_commandes}
                                            >
                                                <i
                                                    className="fa-solid fa-file-pen ic"
                                                    style={icSize}
                                                ></i>
                                                <span
                                                    className="py-0 mx-2"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target=".collapse.show"
                                                >
                                                    Commandes
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to={
                                                    url.dashboard_produit +
                                                    "/" +
                                                    url.dashboard_produit_liste
                                                }
                                            >
                                                <i
                                                    className="fa-solid fa-cart-shopping ic"
                                                    style={icSize}
                                                ></i>
                                                <span
                                                    className="py-0 mx-2"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target=".collapse.show"
                                                >
                                                    Produits
                                                </span>
                                            </Link>
                                        </li>
                                        {autorisation(
                                            <li className="nav-item">
                                                <Link
                                                    className="nav-link"
                                                    to={
                                                        url.dashboard_client +
                                                        "/" +
                                                        url.dashboard_client_liste
                                                    }
                                                >
                                                    <i
                                                        className="fa-solid fa-user-group ic"
                                                        style={icSize}
                                                    ></i>
                                                    <span
                                                        className="py-0 mx-2"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target=".collapse.show"
                                                    >
                                                        Clients
                                                    </span>
                                                </Link>
                                            </li>
                                        )}

                                        <li className="nav-item">
                                            {/*<Link
                                                className="nav-link"
                                                to={url.dashboard_rapports}
                                            >
                                                <i
                                                    className="fa-solid fa-chart-column ic"
                                                    style={icSize}
                                                ></i>
                                                <span
                                                    className="py-0 mx-2"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target=".collapse.show"
                                                >
                                                    Rapports
                                                </span>
                                            </Link> */}
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to={url.dashboard_paiements}
                                            >
                                                <i
                                                    className="fa-solid fa-credit-card ic"
                                                    style={icSize}
                                                ></i>
                                                <span
                                                    className="py-0 mx-2"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target=".collapse.show"
                                                >
                                                    Paiements
                                                </span>
                                            </Link>
                                        </li>
                                        {/*<li className="nav-item">
                  <Link className="nav-link" to={url.dashboard_messages}>
                    <i className="fa-regular fa-message"></i>
                    <i> </i>
                    Messages
                  </Link>
                </li>*/}
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to={url.dashboard_reductions}
                                            >
                                                <i
                                                    className="fa-solid fa-wallet ic"
                                                    style={icSize}
                                                ></i>
                                                <span
                                                    className="py-0 mx-2"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target=".collapse.show"
                                                >
                                                    Réductions
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to={url.dashboard_meilleures_marques}
                                            >
                                                <i
                                                    className="fa-solid fa-wallet ic"
                                                    style={icSize}
                                                ></i>
                                                <span
                                                    className="py-0 mx-2"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target=".collapse.show"
                                                >
                                                    Marques
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to={url.dashboard_ventes_reco}
                                            >
                                                <i
                                                    className="fa-solid fa-wallet ic"
                                                    style={icSize}
                                                ></i>
                                                <span
                                                    className="py-0 mx-2"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target=".collapse.show"
                                                >
                                                    Meilleures V&R
                                                </span>
                                            </Link>
                                        </li>
                                        
                                        
                                        <li className="nav-item dropdown">
                                            <Link
                                                className="nav-link dropdown-toggle"
                                                data-bs-toggle="dropdown"
                                                to="#"
                                                role="button"
                                                aria-expanded="false"
                                            >
                                                <i
                                                    className="fa-solid fa-gear ic"
                                                    style={icSize}
                                                ></i>
                                                <span
                                                    className="py-0 mx-2"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target=".collapse.show"
                                                >
                                                    Paramètres
                                                </span>
                                            </Link>
                                            <ul className="dropdown-menu border-0 p-0">
                                                <li>
                                                    <Link
                                                        to={url.dashboard_parametres_user}
                                                        className="dropdown-item"
                                                        
                                                    >
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to={url.dashboard_parametres_faq}
                                                        className="dropdown-item"
                                                        
                                                    >
                                                        FAQs
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to={url.home}
                                            >
                                                <i className="fa-solid fa-circle-arrow-left ic" style={icSize}></i>
                                                <span
                                                    className="py-0 mx-2"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target=".collapse.show"
                                                >
                                                    Retour
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>

                            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <Suspense fallback={<div>Chargement...</div>}>
                                <Routes>
                                    {dashboardRoutes.map((route, idx) => {
                                        return getRoute(route, idx);
                                    })}
                                </Routes></Suspense>

                                <footer className="py-4 bg-light mt-auto">
                                    <div className="container-fluid px-4">
                                        <div className="d-flex align-items-center justify-content-between small">
                                            <div className="text-muted">
                                                Copyright &copy; Africa defis
                                                2022
                                            </div>
                                            {/*<div>
                                                <a href="#">Privacy Policy</a>
                                                &middot;
                                                <a href="#">
                                                    Terms &amp; Conditions
                                                </a>
                                            </div>*/}
                                        </div>
                                    </div>
                                </footer>
                            </main>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Navigate to={url.login} />

                    
                
                </>
                
            )}
        </>
    );
};

export default Dashboard;
