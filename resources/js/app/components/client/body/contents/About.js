import React from "react";
import banner4 from "../../../../assets/img/banner4.jpg"
import banner5 from "../../../../assets/img/banner5.jpg"
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="row">
      <div className="col-12 banier mx-auto px-0 py-4 d-flex flex-wrap">
        <div className="col-10 mx-auto">
          <h2 className="mt-5 text-center display-1">A propos</h2>
        </div>
      </div>
      <div className="col-12 col-md-10 mx-auto px-0 py-4 d-flex flex-wrap">
        <div className="col-12 col-lg-5">
          <span className="text-bold title-1">
            Notre missions
          </span>
          <p className="py-3">
          <span className="text-bold text-primary">Africadefis market</span> est une entreprise de e-commerce. 
          Elle a été créée par <span className="text-bold">Monsieur SANDWIDI Théodore</span>, un opérateur 
          économique résident dans la région du centre-est plus précisément 
          dans la ville de Koupéla. Elle est née de la volonté de créer 
          un marché digital où se rencontreront l'offre et la demande. 
          Africadefis a pour but principal la promotion des produits locaux 
          en leur donnant un cadre de se faire connaître et en recherchant 
          pour eux d'éventuels acheteurs partout au Burkina Faso, dans la sous-région et à
           l'international. Africadefis est une plateforme au sein de laquelle les entreprises (partenaires) 
          feront plus de la visibilité en y publiant leurs produits et aux clients (acheteurs) 
          de faire leur marché tout en restant chez eux. 
          Vous pouvez  
          <span className="text-bold"> retrouver africadefis au www.market-africadefis.com </span>
           ou <span className="text-bold"> télécharger l'application mobile Africa Défis sur playstore. </span>
          </p>
        </div>
        <div className="col-12 col-lg-7 mx-auto pt-3">
          <div className="p-4">
            <img className="bd-placeholder-img" width="100%" height="auto" src={banner4} alt="" />
          </div>
        </div>
      </div>
      <div className="col-12 col-md-10 mx-auto px-0 py-4 d-flex flex-wrap">
        <div className="col-12 col-lg-7 mx-auto pt-3">
          <div className="p-4">
            <img className="bd-placeholder-img" width="100%" height="auto" src={banner5} alt="" />
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <span className="text-bold title-1">
            Notre histoire
          </span>
          <p className="py-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna donec
            nec interdum netus sed urna. Aliquam nec aenean vulputate magna
            tellus est dolor. Dignissim duis adipiscing adipiscing nunc, leo.
            Morbi metus, mattis adipiscing et ac fermentum cursus. Vel sed
            dignissim senectus id in mauris amet mauris magna.Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Magna donec nec interdum
            netus sed urna. Aliquam nec aenean vulputate magna tellus est dolor.
            Dignissim duis adipiscing adipiscing nunc, leo. Morbi metus, mattis
            adipiscing et ac fermentum cursus. Vel sed dignissim senectus id in
            mauris amet mauris magna.
          </p>
        </div>
      </div>
      <hr className="w-50 mx-auto" />
        
      <div className="col-12 col-md-10 mx-auto px-0 py-4 d-flex flex-wrap">
        <div id="contact" className="col-12 col-lg-5">
          <span className="text-bold title-1">Contact</span> <br />
          <span className="text-bold">Africadefis</span>
          <p>
            <span className="text-bold">size:</span> 13801 Walsingham Road
            <br />
            A#119, Largo, Florida 33774 <br />
            <span className="text-bold">
              Email:
            </span> info@africadefis.com <br />
            <span className="text-bold">Tel:</span> +226 70-48-83-05
          </p>
          <div className="p-2" style={{ width: "fit-content" }}>
            <a className="mx-2" href="#">
              <i
                className="fa-brands fa-facebook fa-2xl"
                style={{ color: "#4267B2" }}
              ></i>
            </a>
            <a className="mx-2" href="#">
              <i className="fa-brands fa-instagram fa-2xl"></i>
            </a>
            <a className="mx-2" href="#">
              <i
                className="fa-brands fa-whatsapp fa-2xl"
                style={{ color: "#25D366 !important" }}
              ></i>
            </a>
          </div>
        </div>
        <div className="col-12 col-lg-7 pt-3">
          <form action="#">
            <div className="form-group w-100">
              <label htmlFor="email">Adresse email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                id="email"
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="pwd">Nom prenom:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                id="pwd"
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="comment">Message:</label>
              <textarea className="form-control" rows="5" id="comment">
                Entrer votre message
              </textarea>
            </div>
            <button type="submit" className="btn btn-primary my-2">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default About;
