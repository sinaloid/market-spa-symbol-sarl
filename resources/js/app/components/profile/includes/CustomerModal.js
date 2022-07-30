import React from "react";

const CustomerModal = ({ name }) => {
    return (
        <>
            <div className="container mt-3 d-flex position-relative">
                <h2 className="mt-2">{name + "s"}</h2>
                <button
                    type="button"
                    className="btn btn-afdefis position-absolute end-0 mx-3"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                >
                    Créer
                </button>
            </div>
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{name}</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <form
                            onSubmit={"handleSubmit"}
                            className="card py-2 needs-validation modal-body"
                        >
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Nom Prénom
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="validationCustom01"
                                    value=""
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Avatar
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="validationCustom01"
                                    value=""
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="validationCustom01"
                                    value=""
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Role
                                </label>
                                <select className="form-select">
                                    <option>Sélectionnez le role</option>
                                    <option>Client</option>
                                    <option>Vendeur</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Commune
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="validationCustom01"
                                    value=""
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Mots de passe
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="validationCustom01"
                                    value=""
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Comfirmer mots de passe
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="validationCustom01"
                                    value=""
                                    required
                                />
                            </div>
                            <div className="col-12 py-2">
                                <button
                                    className="btn btn-afdefis"
                                    type="submit"
                                    data-bs-dismiss="modal"
                                >
                                    Créer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerModal;
