import React, { useContext, useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link, useNavigate } from "react-router-dom";
import register from "../../../assets/auth/register.svg";
import { AuthContext } from "../../../context/auth-context";
import apiClient from "../../../services/api";
import url from "../../../url";
import Loading from "../../Loading";
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Register = () => {
    const [name, setName] = useState("");
    const [numero, setNumero] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isRegister, setRegister] = useState(false);
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(()=>{
      apiClient
          .get("autocompleteCommune")
          .then((res) => {
              if (res.status === 200) {
                  
                 let tab = res.data.datas.map((item) =>{
                      return {
                          label: item.nom_commune,
                          id: item.id,
                          slug: item.slug,
                      }
                  })
                  setOptions(tab)
                  
              }
          })
          .catch((error) => {
              
              console.log(error)
          });
  },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        /*console.log({
          name: name,
          numero: numero,
          email: email,
          commune: selected[0].id,
          password: password,
      })*/
        apiClient
            .post("register", {
                nom: name,
                numero: numero,
                email: email,
                commune_id: selected[0].id,
                password: password,
            })
            .then((res) => {
                if (res.status === 201) {
                    console.log(res.data);
                    const data = {
                        isAuth: true,
                        type: res.data.type,
                        name: res.data.name,
                        name: res.data.numero,
                        email: res.data.email,
                        token: res.data.access_token,
                    };
                    setLoading(false);
                    setRegister(true);
                    setMessage(res.data.message);
                }
            })
            .catch((error) => {
                setLoading(false);
                if (
                    error.request.response &&
                    error.request.response.status === 422
                ) {
                    setMessage(error.response.data[0]);

                    //setAuthError(true);
                } else {
                    setMessage(error.response.data[0]);
                }
            });
    };

    return (
        <div className="form-content sign-up-mode mt-5">
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={handleSubmit} className="sign-up-form">
                        <h2 className="title">Inscrivez-vous</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nom Prenom"
                            />
                        </div>
                        <div className="input-field">
                            <i className="fa-solid fa-phone"></i>
                            <input
                                type="text"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                placeholder="Numero"
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="input-field">
                            <i className="fa-solid fa-location-pin"></i>
                            <Typeahead
                                id="basic"
                                onChange={setSelected}
                                options={options}
                                placeholder="Ville ou Commune"
                                selected={selected}
                            />
                        </div>

                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                        {message != "" ? (
                            <div
                                className={
                                    isRegister ? "text-success" : "text-danger"
                                }
                            >
                                {message}
                            </div>
                        ) : null}
                        {loading ? (
                            <Loading />
                        ) : (
                            <input
                                type="submit"
                                className="btn btn-afdefis"
                                value="S'inscrire"
                            />
                        )}

                        <p className="social-text">
                            Ou Inscrivez-vous avec les plateformes sociales
                        </p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel"></div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Vous êtes déjà inscrit ?</h3>
                            <p>
                            Plus besoin de vous inscrire si vous possédez déjà un compte
                            </p>
                            <Link to={url.login} aria-current="page">
                                <button
                                    className="btn transparent"
                                    id="sign-in-btn"
                                >
                                    S'identifier
                                </button>
                            </Link>
                        </div>
                        <img src={register} className="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
