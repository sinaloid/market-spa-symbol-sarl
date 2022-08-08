import React from "react";
import { Link } from "react-router-dom";
import url from "../../../url";
import ProductCard from "./includes/ProductCard";

const HomeProduitList = ({datas = [], title}) => {

    return (
        <div className="container-fuild py-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4 mb-4">
            <h2 className="h3 mb-0 me-3 title-1">{title}</h2>
            <div className="row pt-3">
              <Link
                className="btn btn-outline-accent btn-sm txt-white-hover"
                to={url.produits}
              >
                Plus de products
                <i className="ci-arrow-right ms-1 me-n1"></i>
              </Link>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {datas.map((data, idx) => {
              return (
                <ProductCard key={idx} idx={idx} data={data} />
              );
            })}
          </div>
        </div>
    )
}

export default HomeProduitList;