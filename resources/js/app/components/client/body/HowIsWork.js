import React from "react";
import img1 from "./assets/imgs/01.png"
import img2 from "./assets/imgs/02.png"
import img3 from "./assets/imgs/03.png"

const HowIsWork = () => {
  return (
    <section className="pt-2 mb-4 mb-md-5">
      <h2 className="h3 text-center mb-grid-gutter pb-4 title-1">Comment ça fonctionne ?</h2>
      <div className="row g-0 bg-light rounded-3">
        <div className="col-xl-4 col-lg-12 col-md-4 border-end">
          <div className="py-3">
            <div
              className="d-flex align-items-center mx-auto py-3 px-3"
              style={{maxWidth: "362px"}}
            >
              <div className="display-3 fw-normal opacity-15 me-4">01</div>
              <div className="ps-2">
                <img
                  className="d-block my-2"
                  src={img1}
                  alt="Order online"
                  width="72"
                />
                <p className="mb-3 pt-1">Vous commandez vos produits préférés en ligne</p>
              </div>
            </div>
            <hr className="d-md-none d-lg-block d-xl-none" />
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-4 border-end">
          <div className="py-3">
            <div
              className="d-flex align-items-center mx-auto py-3 px-3"
              style={{maxWidth: "362px"}}
            >
              <div className="display-3 fw-normal opacity-15 me-4">02</div>
              <div className="ps-2">
                <img
                  className="d-block my-2"
                  src={img2}
                  alt="Grocery collected"
                  width="72"
                />
                <p className="mb-3 pt-1">
                  Un assistant personnel récupère les produits de votre liste
                </p>
              </div>
            </div>
            <hr className="d-md-none d-lg-block d-xl-none" />
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-4">
          <div className="py-3">
            <div
              className="d-flex align-items-center mx-auto py-3 px-3"
              style={{maxWidth: "362px"}}
            >
              <div className="display-3 fw-normal opacity-15 me-4">03</div>
              <div className="ps-2">
                <img
                  className="d-block my-2"
                  src={img3}
                  alt="Delivery"
                  width="72"
                />
                <p className="mb-3 pt-1">
                  Nous livrons à la porte à une heure qui vous convient
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIsWork;