import React, { Suspense, useEffect, useState } from "react";
import apiClient from "../../../services/api";
import Carousel from "./Carousel";
import ProductCard from "./includes/ProductCard";

const Produit = () => {
    const path = window.location.pathname;
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [editeSlug, setEditeSlug] = useState([]);
    const [refresh, setRefresh] = useState([]);

    const [datas, setDatas] = useState([]);
    useEffect(() => {
        apiClient
            .get(`productAll`)
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data.all);
                    console.log(res.data.recommandation);
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
        <main>
            <div className="container-fuild py-3">
                <div className="d-flex flex-lg-row flex-column align-items-lg-center justify-content-between py-4 pt-lg-3">
                    <div className="d-flex flex-wrap">
                        {/*<!-- Categories-->*/}
                        <div className="dropdown mb-lg-3 mb-2 me-lg-3 me-2">
                            <button
                                className="btn btn-sm btn-afdefis dropdown-toggle w-100"
                                type="button"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Categories
                            </button>
                            <div
                                className="dropdown-menu mt-lg-2 mt-1"
                                style={{ minWidth: "260px" }}
                            >
                                <div className="widget px-3">
                                    <ul className="widget-list list-unstyled">
                                        <li className="d-flex justify-content-between align-items-center mb-1">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="all"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="all"
                                                >
                                                    Tous les produits
                                                </label>
                                            </div>
                                            <span className="fs-xs text-muted">
                                                498
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center mb-1">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="premium"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="premium"
                                                >
                                                    Électronique
                                                </label>
                                            </div>
                                            <span className="fs-xs text-muted">
                                                25
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center mb-1">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="art"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="art"
                                                >
                                                    Autos et motos
                                                </label>
                                            </div>
                                            <span className="fs-xs text-muted">
                                                112
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center mb-1">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="photography"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="photography"
                                                >
                                                    bureau et sécurité
                                                </label>
                                            </div>
                                            <span className="fs-xs text-muted">
                                                93
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center mb-1">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="music"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="music"
                                                >
                                                    Téléphones et
                                                    télécommunications
                                                </label>
                                            </div>
                                            <span className="fs-xs text-muted">
                                                48
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center mb-1">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="gaming"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="gaming"
                                                >
                                                    Sports et loisirs
                                                </label>
                                            </div>
                                            <span className="fs-xs text-muted">
                                                82
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center mb-1">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="sports"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="sports"
                                                >
                                                    Jouets et enfants
                                                </label>
                                            </div>
                                            <span className="fs-xs text-muted">
                                                51
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center mb-1">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="collections"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="collections"
                                                >
                                                    Beauté et santé
                                                </label>
                                            </div>
                                            <span className="fs-xs text-muted">
                                                11
                                            </span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center mb-1">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="utility"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="utility"
                                                >
                                                    Bricolage et outils
                                                </label>
                                            </div>
                                            <span className="fs-xs text-muted">
                                                24
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<!-- Total-->*/}
                    <div className="mb-3 fs-sm text-muted">1240 results</div>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    {datas.map((data, idx) => {
                        return (
                          <ProductCard key={idx} idx={idx} data={data} />
                        );
                    })}
                </div>
            </div>

            <hr className="mt-4 mb-3" />
            <nav
                className="d-flex justify-content-between pt-2"
                aria-label="Page navigation"
            >
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#">
                            <i className="ci-arrow-left me-2"></i>Prev
                        </a>
                    </li>
                </ul>
                <ul className="pagination">
                    <li className="page-item d-sm-none">
                        <span className="page-link page-link-static">
                            1 / 5
                        </span>
                    </li>
                    <li
                        className="page-item active d-none d-sm-block"
                        aria-current="page"
                    >
                        <span className="page-link">
                            1<span className="visually-hidden">(current)</span>
                        </span>
                    </li>
                    <li className="page-item d-none d-sm-block">
                        <a className="page-link" href="#">
                            2
                        </a>
                    </li>
                    <li className="page-item d-none d-sm-block">
                        <a className="page-link" href="#">
                            3
                        </a>
                    </li>
                    <li className="page-item d-none d-sm-block">
                        <a className="page-link" href="#">
                            4
                        </a>
                    </li>
                    <li className="page-item d-none d-sm-block">
                        <a className="page-link" href="#">
                            5
                        </a>
                    </li>
                </ul>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            Next<i className="ci-arrow-right ms-2"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </main>
    );
};

export default Produit;
