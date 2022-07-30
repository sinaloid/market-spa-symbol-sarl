import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/context";
import apiClient from "../../../services/api";
import ButtonAction from "./ButtonAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactToastify, { notify } from "../../../ReactToastify";

const ProductFormCategorie = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [libelle, setLibelle] = useState([]);
    const [editeSlug, setEditeSlug] = useState("");
    const [datas, setDatas] = useState([]);
    const [refresh, setRefresh] = useState(0)
    useEffect(() => {
        apiClient
            .get("categorie", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data.response)
                } else {
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    notify("error", error.response.data.message);
                } else {
                    notify("error", error.response.data.message);
                }
            });
    },[refresh]);

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient
            .post(
                "categorie",
                {
                    nom_categorie: libelle,
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1)
                    setLibelle([])
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1)
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
                setRefresh(refresh + 1)
            });
    };
    const handleSubmitEdite = (e) => {
        e.preventDefault();

        apiClient
            .put(
                `categorie/${editeSlug}`,
                {
                    nom_categorie: libelle,
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1)
                }else{
                    notify("error", res.data.response);
                    setRefresh(refresh + 1)
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
            });
    };

    const setDataEdite = (data) => {
        setLibelle(data.nom_categorie);
        setEditeSlug(data.slug)
    }
    const onDelete = (slug) => {
        apiClient
            .delete(
                `categorie/${slug}`,
                {
                    headers: {Authorization: `Bearer ${user.token}`},
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1)
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1)

                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
            });
    };
    return (
        <>
            <div className="container mt-3 d-flex position-relative">
                <h2 className="mt-2 d-inline-block">Catégorie</h2>

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
                            <h4 className="modal-title">Catégorie</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="card py-2 needs-validation modal-body"
                        >
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Libellé
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={libelle}
                                    onChange={(e) => {
                                        setLibelle(e.target.value);
                                    }}
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

            <div className="modal" id="edit">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Editer la categorie</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <form
                            onSubmit={handleSubmitEdite}
                            className="card py-2 needs-validation modal-body"
                        >
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Libellé
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={libelle}
                                    onChange={(e) => {
                                        setLibelle(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="col-12 py-2">
                                <button
                                    className="btn btn-afdefis"
                                    type="submit"
                                    data-bs-dismiss="modal"
                                >
                                    Modifier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ReactToastify />
            <div className="card py-2 table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Libellé</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, idx) => {
                            return (
                                <tr key={data.slug}>
                                    <td>{idx + 1}</td>
                                    <td>{data.nom_categorie}</td>
                                    <td>
                                        <ButtonAction slug={data.slug} dataEdite={data} setDataEdite={setDataEdite} onDelete={onDelete} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ProductFormCategorie;
