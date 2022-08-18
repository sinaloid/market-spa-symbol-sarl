import React from "react";
import { urlImg } from "../../../../services/api";

const Brand = ({datas = []}) => {
  return (
    <section className="row pt-3 mb-4 pt-md-4">
      {/*<!-- Heading-->*/}
      <div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4">
        <h2 className="h3 mb-0 pt-3 me-3 title-1">Meilleures marques</h2>
        <div className="row pt-3">
          <a
            className="btn btn-outline-accent btn-sm txt-white-hover"
            href="#"
          >
            Voir toutes les marques
            <i className="ci-arrow-right ms-1 me-n1"></i>
          </a>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {datas.map((data, idx) => {
          return (
            <div key={idx} className="col mx-auto">
              <div className="card shadow-sm p-1">
                <img
                  className=""
                  width="100%"
                  height="100"
                  style={{objectFit: 'cover'}}
                  src={urlImg+"/marques/"+data.logo}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Brand;
