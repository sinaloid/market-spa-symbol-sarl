import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/context";
import apiClient from "../../services/api";
import url from "../../url";

const Cart = () => {
    const cartAuthCtx = useContext(AppContext);
    const { cart, onCartChange } = cartAuthCtx;
    const { user, onUserChange } = cartAuthCtx;
    const [userSlug, setUserSlug] = useState("");
    let [qt, setQt] = useState(null);
    let tabProduit = null;

    useEffect(() => {
        if (user.token != null) {
            apiClient
                .get("user", {
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                .then((res) => {
                    setUserSlug(res.data.slug);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const userIsConnect = (view) => {
        return userSlug != "" ? (
            <Link to={url.checkout}>
                <button
                    className="w-100 btn btn-sm btn-afdefis"
                    type="submit"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    Payer
                </button>
            </Link>
        ) : (
            <Link to={url.login}>
                <button
                    className="w-100 btn btn-sm btn-afdefis"
                    type="submit"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    Connexion/Inscription
                </button>
            </Link>
        );
    };

    const deleteItem = (data) => {
        //const {item} = e

        tabProduit = cart.content.filter((item) => item.id != data.id);

        if (tabProduit != null) {
            onCartChange({
                content: tabProduit,
                compteur: cart.compteur - data.quantite,
            });
        }
    };

    const Update = (data) => {};

    const pay = ()=>{

        if (user.token != null) {
            apiClient
                .get("userCommande", {
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                .then((res) => {
                    console.log(res.data);
                    //setUserSlug(res.data.slug);

                    /*if (user.isAuth === true && user.token != null) {
                        console.log(`connexion reussi, isAuth: ${user}`);
                        if(path.includes(app)){
                            return navigate("/app/profile" + "/" + url.dashboard_home);
                        }
                        return navigate(url.dashboard + "/" + url.dashboard_home);
                    }*/
                    
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }

    return (
        <div>
            <div
                className="offcanvas offcanvas-end card"
                tabIndex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
                data-bs-scroll="true"
            >
                <div className="offcanvas-header nav-header">
                    <h5 id="offcanvasRightLabel">
                        <span className="mx-2">
                            <i
                                className="fa-solid fa-cart-shopping fa-md"
                                style={{ color: "#0d6efd" }}
                            ></i>
                        </span>
                        <span>Panier</span>
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body bg">
                    <form onSubmit={Update}>
                        <table className="table table-responsive">
                            <thead className="thead-primary">
                                <tr className="text-center">
                                    <th>&nbsp;</th>
                                    <th>Produit</th>
                                    <th>Prix Unitaire</th>
                                    <th>Quantité</th>
                                    <th>Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.content.map((item, idx) => {
                                    return (
                                        <tr key={idx} className="text-center">
                                            <td className="image-prod">
                                                <img
                                                    className="rounded-circle m-0 avatar-sm-table"
                                                    width="50"
                                                    src={`https://source.unsplash.com/random/800x800/?product=${idx}`}
                                                    alt=""
                                                />
                                            </td>

                                            <td className="product-name">
                                                <p>{item.produit}</p>
                                            </td>

                                            <td className="price">
                                                {item.prix + " fcfa"}
                                            </td>
                                            <td className="quantity">
                                                <div className="input-group mb-3">
                                                    <input
                                                        type="number"
                                                        className="quantity form-control input-number"
                                                        value={item.quantite}
                                                        onChange={(e) => {
                                                            setQt(
                                                                e.target.value
                                                            );
                                                        }}
                                                        min="1"
                                                        max="100"
                                                    />
                                                </div>
                                            </td>

                                            <td className="total">
                                                <i
                                                    className="fa-solid fa-trash"
                                                    onClick={() => {
                                                        deleteItem(item);
                                                    }}
                                                ></i>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </form>

                    {userIsConnect()}
                </div>
            </div>
        </div>
    );
};

export default Cart;
