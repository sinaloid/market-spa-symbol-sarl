import React from "react";
import Panier from "./Panier";


const HeaderSearch = () => {
        
    return (
        <header className="container py-3 px-3  border-bottom">
            <div className="row">
                <a
                    href="/"
                    className="col-12 px-3 col-md-4 d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-decoration-none"
                >
                    <span className="fs-4 text-bolder text-uppercase">
                        <span className="text-primary">Africa</span>
                        <span className="text-secondary">défis</span>
                    </span>
                </a>
                <form className="col-10 col-md-6 col-lg-auto1 mb-3 mb-lg-0">
                    <input
                        id="search"
                        name="search"
                        type="search"
                        className="form-control"
                        placeholder="Recherche..."
                        aria-label="Search"
                    />
                </form>
                
                <div className="col-2 position-relative d-flex align-items-center mb-3 mb-lg-0 me-lg-auto ml-auto">
                    <Panier classe="position-absolute end-0" size="fa-2xl" />
                </div>
            </div>
        </header>
    );
};

export default HeaderSearch;
