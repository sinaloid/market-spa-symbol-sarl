import React from "react";
import app from '../../../assets/img/app.png'
import badge from '../../../assets/img/badge.png'

const DownloadApp = () => {
  return (
    <div className="card shadow-sm my-5 p-3">
      <div className="row featurette">
        <div className="col-md-7 order-md-2">
          <h2 className="featurette-heading fw-normal lh-1 title-1">
          Économisez du temps et de l'argent grâce aux 
            <span className="text-muted"> offres exclusives des meilleurs magasins.</span>
          </h2>
          <p className="lead">
          Commandez des produits et recevez votre livraison
          </p>
          <h5 className=" pb-3">Essayez notre application mobile</h5>
          <div className="d-flex flex-wrap justify-content-center justify-content-xl-start">
            <a className="btn-market btn-google mb-2" href="#" role="button">
              <img src={badge} alt="" width="136" loading="lazy" />
            </a>
          </div>
        </div>
        <div className="col-md-5 order-md-1">
        <img src={app} width="100%"  alt="app icone" loading="lazy"/>

        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
