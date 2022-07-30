import React from "react";
import ProductCard from "./includes/ProductCard";

const NewProduct = ({datas = []}) => {

    return(
        <div className="container-fuild">
          <div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4 mb-4">
            <h2 className="h3 mb-0 me-3 title-1">Nouveaux produits</h2>
            <div className="row pt-3">
              <a
                className="btn btn-outline-accent btn-sm"
                href="grocery-catalog.html"
              >
                Plus de products
                <i className="ci-arrow-right ms-1 me-n1"></i>
              </a>
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

export default NewProduct;