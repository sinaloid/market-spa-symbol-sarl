import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/context";
import { useParams } from "react-router-dom";
import apiClient, { urlImg } from "../../../../services/api";

const ProductDetail = () => {
    const cartCtx = useContext(AppContext);
    const { cart, onCartChange } = cartCtx;
    const {id} = useParams()

    const [data, setDatas] = useState([]);
    useEffect(() => {
        apiClient
            .get(`prod/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data.response);
                    //console.log(res.data.response);
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
    }, []);

    
    
    let tabProduit = []
    let findItem = false
    const prod = {
      id: data.slug,
      produit: data.libelle,
      prix: data.prix,
      quantite: 1
    }
    //console.log(cart.content)
    const addProduit = () => {
  
      tabProduit = cart.content.map((item) => {
        if(data.slug == item.id){
          item.quantite++
          findItem = true
        }
        return item
      })
  
      //console.log(tabProduit)
      if(!findItem){
        onCartChange({content:[...cart.content,prod],compteur: cart.compteur + 1})
      }else{
        onCartChange({content:tabProduit, compteur: cart.compteur + 1})
      }
    } 
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
                                            src={urlImg+""+data.image}
                                            width="250"
                                        />
                                    </div>
                                    {
                                        /**
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
                                         */
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product p-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <i className="fa fa-long-arrow-left"></i>
                                            <span className="ml-1">Back</span>
                                        </div>
                                        <i className="fa fa-shopping-cart text-muted"></i>
                                    </div>
                                    <div className="mt-4 mb-3">
                                        <span className="text-uppercase text-muted brand">
                                        {data.categorie}
                                        </span>
                                        <h5 className="text-uppercase">
                                            {data.libelle}
                                        </h5>
                                        <div className="price d-flex flex-row align-items-center">
                                            <div className="ml-2">
                                                <small className="dis-price">
                                                {Intl.NumberFormat().format(data.prix) + " FCFA"}
                                                </small>
                                                <br />
                                                {
                                                    (data.reduction) && <span>{data.reduction + "% de reduction"}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <p className="about">
                                        {data.description}
                                    </p>
                                    
                                    <div className="cart mt-4 align-items-center">
                                        <button
                                            className="btn btn-danger text-uppercase mr-2 px-4"
                                            onClick={() => {
                                                addProduit();
                                            }}
                                        >
                                            Ajouter au panier
                                        </button>
                                        <i className="fa fa-heart text-muted"></i>
                                        <i className="fa fa-share-alt text-muted"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
