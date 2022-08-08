import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/context";
import ReactToastify, { notify } from "../../../ReactToastify";
import apiClient from "../../../services/api";
import url from "../../../url";
import ButtonAction from "./ButtonAction";

const OrderTable = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [acheteurs, setAcheteur] = useState([]);
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [etat, setEtat] = useState("");
    const [editeSlug, setEditeSlug] = useState([]);
    const [refresh, setRefresh] = useState([]);

    const [datas, setDatas] = useState([]);
    useEffect(() => {
        apiClient
            .get("commande", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data.commandes);
                    setAcheteur(res.data.acheteurs);
                    //console.log(res.data.commandes)
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
                "commande",
                {
                    email: email,
                    date: date,
                    etat_livraison: etat,
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1);
                    setEmail([]);
                    setDate([]);
                    setEtat([]);
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
                `commande/${editeSlug}`,
                {
                    email: email,
                    date: date,
                    etat_livraison: etat,
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1);
                    setEmail([]);
                    setDate([]);
                    setEtat([]);
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
        setEmail([data.email]);
        setDate([data.date]);
        setEtat([data.etat]);
        setEditeSlug(data.id);
    };
    const onDelete = (slug) => {
        apiClient
            .delete(`commande/${slug}`, {
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
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Commande</h4>
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
                                    htmlFor="acheteur"
                                    className="form-label"
                                >
                                    Acheteur
                                </label>
                                <select
                                    id="acheteur"
                                    className="form-select"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                >
                                    <option>
                                        Sélectionnez l'email de l'acheteur
                                    </option>
                                    {acheteurs.map((usr, idx) => {
                                        return (
                                            <option key={idx} value={usr.email}>
                                                {usr.email}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Date de la commande
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Etat livraison
                                </label>
                                <select
                                    className="form-select"
                                    value={etat}
                                    onChange={(e) => {
                                        setEtat(e.target.value);
                                    }}
                                >
                                    <option>
                                        Sélectionnez l'etat de la livraison
                                    </option>
                                    <option value="Livrer">Livrer</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Annuler">Annuler</option>
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
                            <h4 className="modal-title">Editer le produit</h4>
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
                                    htmlFor="acheteur"
                                    className="form-label"
                                >
                                    Acheteur
                                </label>
                                <select
                                    id="acheteur"
                                    className="form-select"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                >
                                    <option>
                                        Sélectionnez l'email de l'acheteur
                                    </option>
                                    {acheteurs.map((usr, idx) => {
                                        return (
                                            <option key={idx} value={usr.email}>
                                                {usr.email}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Date de la commande
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Etat livraison
                                </label>
                                <select
                                    className="form-select"
                                    value={etat}
                                    onChange={(e) => {
                                        setEtat(e.target.value);
                                    }}
                                >
                                    <option>
                                        Sélectionnez l'etat de la livraison
                                    </option>
                                    <option value="Livrer">Livrer</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Annuler">Annuler</option>
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
            <table className="table text-center text-nowrap" id="user_table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">N° Commande</th>
                        <th scope="col">Acheteur</th>
                        <th scope="col">Email</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Date</th>
                        <th scope="col">Prix total</th>
                        <th scope="col">Etat livraison</th>
                        <th scope="col">Panier</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, idx) => {
                        return (
                            <tr key={idx}>
                                <th scope="row">{idx + 1}</th>
                                <td>{data.numero_commande}</td>
                                <td>{data.nom}</td>
                                <td>{data.email}</td>
                                <td>{data.numero}</td>
                                <td>{data.date}</td>
                                <td>{Intl.NumberFormat().format(data.prix_total) +" FCFA"}</td>
                                <td>
                                    <span className="badge bg-success">
                                        {data.etat}
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        to={"/paiement/"+data.slug}
                                        className="text-danger mx-2"
                                    >
                                        <i className="fa-solid fa-cart-shopping fa-md" style={{ color: "#0d6efd" }}></i>
                                    </Link>
                                </td>
                                <td>
                                    <ButtonAction
                                        slug={data.id}
                                        dataEdite={data}
                                        setDataEdite={setDataEdite}
                                        onDelete={onDelete}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default OrderTable;
