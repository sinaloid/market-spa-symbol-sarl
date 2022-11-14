import React,{useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../../context/context";
import { urlImg } from "../../../../services/api";
import url from "../../../../url";

const ProductCard = ({ data, idx }) => {
  const cartCtx = useContext(AppContext);
  const { cart, onCartChange } = cartCtx;
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
    <div key={idx} className="col">
      <div className="card shadow-sm">
        <img
          className=""
          width={"100%"}
          src={urlImg+""+data.image}
          //src={`https://source.unsplash.com/random/800x600/?product=${data+idx}`}
          alt={data.image}
          loading="lazy"
        />
        <div className="card-body">
          <Link to="" className="text-muted categorie-name">
            {data.categorie}
          </Link>
          <h3>
            <Link to="" className="produit-name">
            {data.libelle}
            </Link>
          </h3>
          <div className="d-flex justify-content-between">
            <div className="product-price py-2">
              <span className="text-accent text-bold">
                {Intl.NumberFormat().format(data.prix)+" "}<small>FCFA</small>
              </span>
            </div>
            <div className="star-rating py-2">
              <i className="fa-solid fa-star" style={{ color: "#fea569" }}></i>
              <i className="fa-solid fa-star" style={{ color: "#fea569" }}></i>
              <i className="fa-solid fa-star" style={{ color: "#fea569" }}></i>
              <i className="fa-solid fa-star" style={{ color: "#fea569" }}></i>
              <i
                className="fa-regular fa-star-half-stroke"
                style={{ color: "#fea569" }}
              ></i> <br/>
              <span>{' '} en stock</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center ">
            <div className="btn-group pay">
              <Link data = {data} to={{
                pathname:`/produit/${data.slug}`,
                state: data
                }} className="btn btn-sm btn-afdefis-primary">
              Voir
              </Link>
              <button type="button" className="btn btn-sm btn-afdefis" onClick={()=>{addProduit()}}>
                <i className="fa-solid fa-cart-shopping fa-xl mx-1"></i>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
