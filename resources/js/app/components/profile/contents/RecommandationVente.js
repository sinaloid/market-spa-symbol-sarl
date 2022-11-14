import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/context";
import ReactToastify, { notify } from "../../../ReactToastify";
import apiClient from "../../../services/api";
import ButtonAction from "../includes/ButtonAction";

const RecommandationVente = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [product, setProduct] = useState("");
    const [type, setType] = useState("");
    const [listProduct, setListProduct] = useState([]);
    const [editeSlug, setEditeSlug] = useState([]);
    const [refresh, setRefresh] = useState([]);

    const [datas, setDatas] = useState([]);
    useEffect(() => {
        apiClient
            .get("meilleureVR", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data.vr);
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
                "meilleureVR",
                {
                    product_slug: product,
                    type: type,
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
                    setType([]);
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
                `meilleureVR/${editeSlug}`,
                {
                    product_slug: product,
                    type: type,
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
                    setType([]);
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
        setType(data.type);
        setProduct(data.product_slug);
        setEditeSlug(data.id);
    };
    const onDelete = (slug) => {
        apiClient
            .delete(`meilleureVR/${slug}`, {
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
                <h1 className="h2">Meilleures ventes et recommandations</h1>
            </div>

            <div className="container mt-3 p-0 d-flex position-relative">
                <h2 className="mt-2">Listes V&R</h2>
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
                            <h4 className="modal-title">Nouvelle suggestion</h4>
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
                                                <option key={idx} value={projet.slug}>{projet.libelle}</option>
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
                                    Type
                                </label>
                                <select 
                                    className="form-select" 
                                    value={type}
                                    onChange={(e) =>{setType(e.target.value)}}>
                                    <option>Sélectionnez le type</option>
                                    <option value="Meilleure vente">Meilleure vente</option>
                                    <option value="Produit recommandé">Produit recommandé</option>
                                </select>
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
                                                <option key={idx} value={projet.slug}>{projet.libelle}</option>
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
                                    Type
                                </label>
                                <select 
                                    className="form-select"
                                    value={type}
                                    onChange={(e)=>{setType(e.target.value)}}
                                    >
                                    <option>Sélectionnez le type</option>
                                    <option value="Meilleure vente">Meilleure vente</option>
                                    <option value="Produit recommandé">Produit recommandé</option>
                                </select>
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

            <div className="card shadow-sm table-responsive">
                <table className="table text-center text-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Produit</th>
                            <th scope="col">Type</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx+1}</td>
                                    <td>{data.projet_nom}</td>
                                    <td>{data.type}</td>
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

export default RecommandationVente;
