import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/context";
import { Link, useParams } from "react-router-dom";
import apiClient, { SITE_URL, urlImg } from "../../../../services/api";
import url from "../../../../url";
import { CKEditor } from "ckeditor4-react";
import HomeProduitListCarousel from "../HomeProduitListCarousel";
import HomeProduitList from "../HomeProduitList";

const ProductDetail = () => {
    const cartCtx = useContext(AppContext);
    const { cart, onCartChange } = cartCtx;
    const { id } = useParams();

    const [data, setDatas] = useState([]);
    const [prdt, setPrdt] = useState([]);
    useEffect(() => {
        apiClient
            .get(`prod/${id}`)
            .then((res) => {
                setDatas(res.data.response);
                    setPrdt(res.data.all);
                if (res.status === 200) {
                    
                    //console.log(res.data.all);
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
    }, [window.location.pathname]);

    let tabProduit = [];
    let findItem = false;
    const prod = {
        id: data.slug,
        produit: data.libelle,
        prix: data.prix,
        quantite: 1,
    };
    //console.log(cart.content)
    const addProduit = () => {
        tabProduit = cart.content.map((item) => {
            if (data.slug == item.id) {
                item.quantite++;
                findItem = true;
            }
            return item;
        });

        //console.log(tabProduit)
        if (!findItem) {
            onCartChange({
                content: [...cart.content, prod],
                compteur: cart.compteur + 1,
            });
        } else {
            onCartChange({ content: tabProduit, compteur: cart.compteur + 1 });
        }
    };
    return (
        <div className="container mt-5 mb-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="images p-3">
                                    <div className="text-center p-4">
                                        <img
                                            id="main-image"
                                            src={urlImg + "" + data.image}
                                            width="100%"
                                        />
                                    </div>
                                    {/**
                                         * <div className="thumbnail text-center">
                                        <img
                                            onclick="change_image(this)"
                                            src="https://i.imgur.com/Rx7uKd0.jpg"
                                            width="70"
                                        />
                                        <img
                                            onclick="change_image(this)"
                                            src="https://i.imgur.com/Dhebu4F.jpg"
                                            width="70"
                                        />
                                    </div>
                                         */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product p-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <i className="fa fa-long-arrow-left"></i>
                                            <Link
                                                to={url.home}
                                                className="mx-1 link"
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                Retour
                                            </Link>
                                        </div>
                                        <i
                                            data-bs-toggle="offcanvas"
                                            data-bs-target="#offcanvasRight"
                                            aria-controls="offcanvasRight"
                                            className="fa-solid fa-shopping-cart text-muted"
                                            style={{ color: "#3292f0" }}
                                        ></i>
                                    </div>
                                    <div className="mt-4 mb-3">
                                        <span className="text-uppercase text-muted brand">
                                            {data.categorie}
                                        </span>
                                        <h5 className="text-uppercase">
                                            {data.libelle}
                                        </h5>
                                        <div className="price d-flex flex-row align-items-center">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <small className="dis-price">
                                                    {Intl.NumberFormat().format(
                                                        data.prix
                                                    ) + " FCFA"}
                                                </small>
                                                
                                                {data.reduction && (
                                                    <span>
                                                        {data.reduction +
                                                            "% de reduction"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="about">{data.description}</p>

                                    <div className="cart mt-4 d-flex justify-content-between align-items-center">
                                        <button
                                            className="btn btn-afdefis-secondary  text-uppercase mr-2 px-4"
                                            onClick={() => {
                                                addProduit();
                                            }}
                                        >
                                            Ajouter au panier
                                        </button>
                                        <span>
                                        <i className="fa fa-heart text-muted mx-1"></i>
                                        <i 
                                            className="fa fa-share-alt text-muted mx-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#myModal"
                                        ></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="modal fade" id="myModal">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title">
                                                    Partager le projet sur les
                                                    réseaux sociaux
                                                </h4>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                ></button>
                                            </div>

                                            <div className="modal-body">
                                                <span className="d-inline-block me-3 my-1">
                                                    <i
                                                        className="fa-brands fa-facebook fa-3x"
                                                        title="Partager sur Facebook"
                                                        type="button"
                                                        style={{
                                                            color: "#4267B2",
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (
                                                                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                                                                    navigator.userAgent
                                                                )
                                                            ) {
                                                                window.open(
                                                                    "fb-messenger://share/?" +
                                                                        SITE_URL +
                                                                        "/produit/" +
                                                                        id,
                                                                    "facebook-share-dialog",
                                                                    "width=800,height=600"
                                                                );
                                                            } else {
                                                                window.open(
                                                                    "https://www.facebook.com/sharer/sharer.php?u=" +
                                                                    SITE_URL +
                                                                    "/produit/" +
                                                                    id,
                                                                    "facebook-share-dialog",
                                                                    "width=800,height=600"
                                                                );
                                                            }
                                                        }}
                                                    ></i>
                                                </span>
                                                {"   "}
                                                <span className="d-inline-block me-3 my-1">
                                                    <i
                                                        className="fa-brands fa-telegram fa-3x"
                                                        title="Partager sur Telegram"
                                                        type="button"
                                                        style={{
                                                            color: "#00B2FF",
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.open(
                                                                "https://t.me/share/url?url=" +
                                                                    encodeURIComponent(
                                                                        SITE_URL +
                                                                        "/produit/" +
                                                                        id,
                                                                    ) +
                                                                    "&text=" +
                                                                    encodeURIComponent(
                                                                        document.title
                                                                    ),
                                                                "",
                                                                "width=800,height=600"
                                                            );
                                                        }}
                                                    ></i>
                                                </span>
                                                {"   "}
                                                <span className="d-inline-block me-3 my-1">
                                                    <i
                                                        className="fa-brands fa-twitter fa-3x"
                                                        title="Partager sur Twitter"
                                                        type="button"
                                                        style={{
                                                            color: "#1DA1F2",
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.open(
                                                                "https://twitter.com/intent/tweet?url=" +
                                                                SITE_URL +
                                                                "/produit/" +
                                                                id,
                                                                "width=800,height=600"
                                                            );
                                                        }}
                                                    ></i>
                                                </span>
                                                {"   "}
                                                <span className="d-inline-block me-3 my-1">
                                                    <i
                                                        className="fa-brands fa-linkedin fa-3x"
                                                        title="Partager sur Linkedin"
                                                        type="button"
                                                        style={{
                                                            color: "#0A66C2",
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.open(
                                                                "https://www.linkedin.com/shareArticle?mini=true&summary=africadefis&title=Projet Crowfunding&url=" +
                                                                    encodeURIComponent(
                                                                        SITE_URL +
                                                                        "/produit/" +
                                                                        id
                                                                    ),
                                                                "name",
                                                                "width=800,height=600"
                                                            );
                                                        }}
                                                    ></i>
                                                </span>
                                                {"   "}
                                                <span className="d-inline-block me-3 my-1">
                                                    <i
                                                        className="fa-brands fa-whatsapp fa-3x"
                                                        title="Partager sur Whatsapp"
                                                        type="button"
                                                        style={{
                                                            color: "#25D366",
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (
                                                                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                                                                    navigator.userAgent
                                                                )
                                                            ) {
                                                                window.open(
                                                                    "whatsapp://send?text=" +
                                                                        encodeURIComponent(
                                                                            SITE_URL +
                                                                        "/produit/" +
                                                                        id
                                                                        ),
                                                                    "name",
                                                                    "width=800,height=600"
                                                                );
                                                            } else {
                                                                window.open(
                                                                    "https://web.whatsapp.com/send?text=" +
                                                                        encodeURIComponent(
                                                                            SITE_URL +
                                                                        "/produit/" +
                                                                        id
                                                                        ),
                                                                    "name",
                                                                    "width=800,height=600"
                                                                );
                                                            }
                                                        }}
                                                    ></i>
                                                </span>
                                                {"   "}
                                                <span className="d-inline-block me-3 my-1">
                                                    <i
                                                        className="fa-solid fa-envelope fa-3x"
                                                        title="Partager par Email"
                                                        type="button"
                                                        style={{
                                                            color: "#4267B2",
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.open(
                                                                "mailto:?subject=Projet Crowfunding&body=" +
                                                                SITE_URL +
                                                                "/produit/" +
                                                                id
                                                            );
                                                        }}
                                                    ></i>
                                                </span>
                                                {"   "}
                                                <span className="d-inline-block me-3 my-1">
                                                    <i
                                                        className="fa-solid fa-link fa-3x"
                                                        title="Copier le lien"
                                                        type="button"
                                                        data-bs-dismiss="modal"
                                                        style={{
                                                            color: "#4267B2",
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            navigator.clipboard.writeText(
                                                                SITE_URL +
                                                                        "/produit/" +
                                                                        id
                                                            );
                                                        }}
                                                    ></i>
                                                </span>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-afdefis"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Fermer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-10 mx-auto mt-5">
                {prdt != [] && (
                    <HomeProduitList
                        datas={prdt}
                        title={"Vous pourriez aussi aimer"}
                    />
                )}
            </div>
            <div className="col-12 col-md-10 mx-auto mt-5">
                <div className="row">
                    <div className="card my-2">
                        <div className="row">
                            <div className="col-4 col-md-2 text-center pt-2">
                                <img
                                    className="circle"
                                    src="https://source.unsplash.com/random/800x600/?product=1"
                                    alt=""
                                />
                            </div>
                            <div className="col-8 col-md-10 px-2">
                                <p>
                                    <span
                                        className="text-bold"
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Ouedraogo Salif
                                    </span>{" "}
                                    <br />
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Adipisci quaerat
                                    architecto illo quis, eveniet atque officia
                                    blanditiis ipsa rerum, accusantium quam
                                    voluptatum cumque placeat odio velit labore!
                                    Accusamus
                                </p>
                                <div>
                                    <span>
                                        <i className="fa-regular fa-clock"></i>{" "}
                                        1h
                                        {"  "}
                                    </span>
                                    {"  "}|
                                    <span>
                                        {"  "}
                                        <i className="fa-sharp fa-regular fa-comment"></i>{" "}
                                        Repondre{" "}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card my-2">
                        <div className="row">
                            <div className="col-4 col-md-2  text-center pt-2">
                                <img
                                    className="circle"
                                    src="https://source.unsplash.com/random/800x600/?product=1"
                                    alt=""
                                />
                            </div>
                            <div className="col-8 col-md-10 px-2">
                                <p>
                                    <span
                                        className="text-bold"
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Traore Ali
                                    </span>{" "}
                                    <br />
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Adipisci quaerat
                                    architecto illo quis, eveniet atque officia
                                    blanditiis ipsa rerum, accusantium quam
                                    voluptatum cumque placeat odio velit labore!
                                    Accusamus
                                </p>
                                <div>
                                    <span>
                                        <i className="fa-regular fa-clock"></i>{" "}
                                        1h{" "}
                                    </span>{" "}
                                    |
                                    <span>
                                        {" "}
                                        <i className="fa-sharp fa-regular fa-comment"></i>{" "}
                                        Repondre{" "}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-4">
                    <hr />
                    <CKEditor
                        initData="<p>Entrez votre commentaire !</p>"
                        onInstanceReady={() => {
                            /*alert("Editor is ready!");*/
                        }}
                    />
                    <div className="my-2 d-flex justify-content-center">
                        <button className="btn btn-sm btn-afdefis">
                            Commenter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
