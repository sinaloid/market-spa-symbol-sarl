import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductCard from "./includes/ProductCard";
import apiClient from "../../../services/api";

const HomeProduitListCarousel = ({datas, title}) => {
    const options = {
        margin: 16,
        responsiveClass: true,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        /*navText: ["Prev", "Next"],*/
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 1,
            },
            576: {
                items: 2,
            },
            766: {
                items: 3,
            },
            992: {
                items: 4,
            },
        },
    };
    return (
        <div className="container-fuild py-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4 mb-4">
                <h2 className="h3 mb-0 me-3 title-1">{title}</h2>
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
                {datas && (
                    <OwlCarousel
                        items={4}
                        className="owl-carousel owl-theme"
                        loop
                        nav
                        {...options}
                    >
                        {datas.map((data, idx) => {
                            return (
                                <ProductCard key={idx} idx={idx} data={data} />
                            );
                        })}
                    </OwlCarousel>
                )}
            </div>
        </div>
    );
};

export default HomeProduitListCarousel;
