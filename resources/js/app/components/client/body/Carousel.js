import React from "react";
import './carousel.css'
import banner1 from '../../../assets/img/banner1.jpg'
import banner2 from '../../../assets/img/banner2.jpg'
import banner3 from '../../../assets/img/banner3.jpg'

const Carousel = () => {
  return (
    <div
      id="myCarousel"
      className="carousel slide pointer-event"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="0"
          className=""
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
          className="active"
          aria-current="true"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
          className=""
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item">
          
          <img className="bd-placeholder-img" width="100%" height="auto" src={banner2} alt="" />
          <div className="container">
            {/*<div className="carousel-caption text-start">
              <h1 className="display-1">Example headline.</h1>
              <p>
                Some representative placeholder content for the first slide of
                the carousel.
              </p>
              <p>
                <a className="btn btn-lg btn-afdefis-secondary" href="#">
                    J'achète
                </a>
              </p>
            </div>*/}
          </div>
        </div>
        <div className="carousel-item active">
        <img className="bd-placeholder-img" width="100%" height="auto" src={banner1} alt="" />
          

          <div className="container">
            {/*<div className="carousel-caption">
              <h1 className="display-1">Another example headline.</h1>
              <p>
                Some representative placeholder content for the second slide of
                the carousel.
              </p>
              <p>
                <a className="btn btn-lg btn-afdefis-secondary" href="#">
                  En savoir plus
                </a>
              </p>
            </div>*/}
          </div>
        </div>
        <div className="carousel-item">
          <img className="bd-placeholder-img" width="100%" height="auto" src={banner3} alt="" />
          <div className="container">
            {/*<div className="carousel-caption text-end">
              <h1 className="display-1">One more for good measure.</h1>
              <p>
                Some representative placeholder content for the third slide of
                this carousel.
              </p>
              <p>
                <a className="btn btn-lg btn-afdefis-secondary" href="#">
                  J'achète
                </a>
              </p>
            </div>*/}
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
