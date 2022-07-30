import React, { Suspense, useEffect, useState } from "react";
import apiClient from "../../../services/api";
import BestSeller from "./BestSeller";
import Carousel from "./Carousel";
import DiscountedProduct from "./DiscountedProduct";
import DownloadApp from "./DownloadApp";
import HomeProduitList from "./HomeProduitList";
import HomeProduitListCarousel from "./HomeProduitListCarousel";
import HowIsWork from "./HowIsWork";
import Brand from "./includes/Brand";
import NewProduct from "./NewProduct";
import Recommandation from "./Recommadation";

const Home = () => {
    const path = window.location.pathname;
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [editeSlug, setEditeSlug] = useState([]);
    const [refresh, setRefresh] = useState([]);

    const [datas, setDatas] = useState([]);
    useEffect(() => {
        apiClient
            .get(`productAll`)
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data);
                } else {
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    //notify("error", error.response.data.message);
                } else {
                    //notify("error", error.response.data.message);
                }
            });
    }, []);
    const getCarousel = (datas, title) =>{
      console.log(datas)
      return(
        <HomeProduitListCarousel datas={datas.reduction} title={title} />
      )
    }
    return (
        <main>
            <Carousel />

            <HowIsWork />

            {datas.reduction != [] && (
                <HomeProduitListCarousel datas={datas.reduction} title={"Produits à prix réduit"} />

            )}
            {datas.meilleurVente != [] && (
                <HomeProduitListCarousel datas={datas.meilleurVente} title={"Meilleures ventes"} />
            )}

            {datas.marque != [] && (
                <Brand datas={datas.marque} />
            )}
            <div className="py-2">
                {datas.nouveau != [] && (
                    <HomeProduitList datas={datas.nouveau} title={"Nouveaux produits"} />
                )}
                {datas.recommandation != [] && (
                    <HomeProduitList datas={datas.recommandation} title={"Nos recommandations"} />
                )}
            </div>
            {path != "/app" && (
                <DownloadApp />
            )}
        </main>
    );
};

export default Home;
