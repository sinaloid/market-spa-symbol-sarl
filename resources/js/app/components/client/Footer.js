import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="container">
            <footer className="container py-5">
                <div className="row">
                    <div className="col-12 col-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="d-block mb-2"
                            role="img"
                            viewBox="0 0 24 24"
                        >
                            <title>Product</title>
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path>
                        </svg>
                        <small className="d-block mb-3 text-muted">
                            © 2017–2021
                        </small>
                    </div>
                    <div className="col-6 col-md-3">
                        <h5>Africadefis market</h5>
                        <ul className="list-unstyled text-small">
                            <li>
                                <span className="link-secondary">
                                    Une plateforme conçue pour répondre à vos
                                    besoins de commerce en ligne.
                                </span>
                            </li>
                            <li>
                                <span className="mx-1 link-secondary">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <i className="px-2"></i>
                                    Ouagadougou
                                </span>
                            </li>
                            <li>
                                <span className="mx-1 link-secondary">
                                    <i className="fa-solid fa-phone"></i>
                                    <i className="px-2"></i>
                                    +226 70-48-83-05
                                </span>
                            </li>
                            <li>
                                <span className="mx-1 link-secondary">
                                    <i className="fa-solid fa-envelope"></i>
                                    <i className="px-2"></i>
                                    info@africadefis.com
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Catégories</h5>
                        <ul className="list-unstyled text-small">
                            <li>
                                <Link to="#" className="link-secondary">
                                    Électronique
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Autos et motos
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Ordinateurs
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    bureau et sécurité
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Téléphones et télécommunications
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Sports et loisirs
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Informations</h5>
                        <ul className="list-unstyled text-small">
                            <li>
                                <Link to="#" className="link-secondary">
                                    Qui sommes-nous ?
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Nous contacter
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Equipe
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Historique
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Termes & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-md">
                        <h5>Service</h5>
                        <ul className="list-unstyled text-small">
                            <li>
                                <Link to="#" className="link-secondary">
                                    Mon compte
                                </Link>
                            </li>
                            <li>
                                <a className="link-secondary" href="#">
                                    Locations
                                </a>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Mes commandes
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Mes produits
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Mes demandes
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-secondary">
                                    Aide
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
