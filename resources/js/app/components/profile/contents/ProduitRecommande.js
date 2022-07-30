import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/context";
import ReactToastify, { notify } from "../../../ReactToastify";
import apiClient from "../../../services/api";
import ButtonAction from "../includes/ButtonAction";

const ProduitRecommande = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [product, setProduct] = useState("");
    const [pourcentage, setPourcentage] = useState([]);
    const [dure, setDure] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [editeSlug, setEditeSlug] = useState([]);
    const [refresh, setRefresh] = useState([]);

    const [datas, setDatas] = useState([]);
    useEffect(() => {
        apiClient
            .get("reduction", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data.reduction);
                    setListProduct(res.data.product);
                    //console.log(res.data.reduction)
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
    }, [refresh]);
    const handleSubmit = (e) => {
        e.preventDefault();
            
        apiClient
            .post(
                "reduction",
                {
                    product_slug: product,
                    pourcentage: pourcentage,
                    dure: dure,
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1);
                    setProduct([]);
                    setDure([]);
                    setPourcentage([]);
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1);
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
                setRefresh(refresh + 1);
            });
    };
    const handleSubmitEdite = (e) => {
        e.preventDefault();

        apiClient
            .put(
                `reduction/${editeSlug}`,
                {
                    product_slug: product,
                    pourcentage: pourcentage,
                    dure: dure,
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1);
                    setProduct([]);
                    setDure([]);
                    setPourcentage([]);
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1);
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
            });
    };

    const setDataEdite = (data) => {
        setPourcentage(data.pourcentage);
        setDure(data.dure);
        setProduct(data.product_slug);
        setEditeSlug(data.id);
    };
    const onDelete = (slug) => {
        apiClient
            .delete(`reduction/${slug}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1);
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1);
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
            });
    };
    return (
        <>
            <ReactToastify />
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Recommandations</h1>
            </div>

            <div className="container mt-3 p-0 d-flex position-relative">
                <h2 className="mt-2">Listes des produits recommandés</h2>
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
                            <h4 className="modal-title">Nouvelle recommandation</h4>
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
                                    Produit
                                </label>
                                <select
                                    className="form-select"
                                    value={product}
                                    onChange={(e)=>{setProduct(e.target.value)}}
                                    >
                                    <option>Sélectionnez le produit</option>
                                    {
                                        listProduct.map((product, idx)=>{
                                            return(
                                                <option key={idx} value={product.slug}>{product.libelle}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Pourcentage de la réduction
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={pourcentage}
                                    onChange={(e)=>{setPourcentage(e.target.value)}}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Durée de la réduction en jour
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={dure}
                                    onChange={(e)=>{setDure(e.target.value)}}
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
                            <h4 className="modal-title">Editer la réduction</h4>
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
                                    Produit
                                </label>
                                <select
                                    className="form-select"
                                    value={product}
                                    onChange={(e)=>{setProduct(e.target.value)}}
                                    >
                                    <option>Sélectionnez le produit</option>
                                    {
                                        listProduct.map((product, idx)=>{
                                            return(
                                                <option key={idx} value={product.slug}>{product.libelle}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Pourcentage de la réduction
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={pourcentage}
                                    onChange={(e)=>{setPourcentage(e.target.value)}}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Durée de la réduction en jour
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={dure}
                                    onChange={(e)=>{setDure(e.target.value)}}
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

            <div className="card shadow-sm table-responsive">
                <table className="table text-center text-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Produit</th>
                            <th scope="col">Pourcentage de la réduction</th>
                            <th scope="col">Durée de la réduction en jour</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx+1}</td>
                                    <td>{data.product_nom}</td>
                                    <td>{data.pourcentage +" %"}</td>
                                    <td>{data.dure + " jours"}</td>
                                    <td>
                                        <ButtonAction slug={data.id} dataEdite={data} setDataEdite={setDataEdite} onDelete={onDelete} />
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

export default ProduitRecommande;
