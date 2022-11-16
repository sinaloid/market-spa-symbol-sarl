import React from "react";
import "./carousel.css";
import banner1 from "../../../assets/img/banner1.jpg";
import banner2 from "../../../assets/img/banner2.jpg";
import banner3 from "../../../assets/img/banner3.jpg";

const Carousel = () => {
    return (
        <div
            id="myCarousel"
            className="mx-auto carousel slide pointer-event"
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
                    <img
                        className="bd-placeholder-img"
                        width="100%"
                        height="auto"
                        src={banner2}
                        alt=""
                    />
                </div>
                <div className="carousel-item active">
                    <img
                        className="bd-placeholder-img"
                        width="100%"
                        height="auto"
                        src={banner1}
                        alt=""
                    />
                </div>
                <div className="carousel-item">
                    <img
                        className="bd-placeholder-img"
                        width="100%"
                        height="auto"
                        src={banner3}
                        alt=""
                    />
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;
