import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductCard from "./includes/ProductCard";
import { setProduit } from "../../../context/action";

const BestSeller = (datas) => {
    const options = {
        margin: 16,
        responsiveClass: true,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 6000,
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
    const [produit, setProduit] = useState(datas)
    const [content, setContent] = useState()
    useEffect(()=>{
      //setProduit(datas)
      console.log(produit)
      if(produit){
        setContent(prod())
      }
    },[1])
    const prod = () => {
        return (
            <OwlCarousel
                items={4}
                className="owl-carousel owl-theme"
                loop
                nav
                {...options}
            >
                {produit.map((data, idx) => {
                    return <ProductCard key={idx} idx={idx} data={data} />;
                })}
            </OwlCarousel>
        );
    };
    return (
        <section className="row pt-3 pt-md-4">
            {/*<!-- Heading-->*/}
            <div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4 mb-4">
                <h2 className="h3 mb-0 pt-3 me-3 title-1">Meilleures ventes</h2>
                <div className="row pt-3">
                    <a
                        className="btn btn-outline-accent btn-sm"
                        href="grocery-catalog.html"
                    >
                        Plud de produits
                        <i className="ci-arrow-right ms-1 me-n1"></i>
                    </a>
                </div>
            </div>

            <div className="container-fluid">
              {
                //setProduit(datas);
                //prod()
                content
              }
            </div>
        </section>
    );
};

export default BestSeller;
