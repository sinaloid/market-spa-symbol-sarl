import React from "react";
import { Link } from "react-router-dom";

const ButtonAction = ({ onDelete, slug, dataEdite, setDataEdite }) => {
    return (
        <>
            <Link
                to="#"
                className="text-success mx-2"
                onClick={() => {
                    setDataEdite(dataEdite);
                }}
            >
                <i
                    className="fa-solid fa-pen fa-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#edit"
                ></i>
            </Link>
            <Link to="#" className="text-danger mx-2">
                <i
                    className="fa-solid fa-trash"
                    data-bs-toggle="modal"
                    data-bs-target="#delete"
                ></i>
            </Link>

            <div className="modal" id="delete">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Suppression de données
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <span>
                                Attention vous sur le point de supprimer des
                                données ! 
                            </span><br/>
                            <span>Voulez vous continuer ?</span>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-afdefis-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    onDelete(slug);
                                }}
                            >
                                Continuer
                            </button>
                            <button
                                type="button"
                                className="btn btn-afdefis"
                                data-bs-dismiss="modal"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ButtonAction;
