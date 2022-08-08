import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import login from "../../../assets/auth/log.svg";
import { setUser } from "../../../context/action";
import { AppContext } from "../../../context/context";
import apiClient from "../../../services/api";
import url from "../../../url";
import Loading from "../../Loading";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const navigate = useNavigate();
    const app = "app"
    const path = window.location.pathname

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("")

        apiClient
            .post("login", {
                email: email,
                password: password,
            })
            .then((res) => {
                if (res.status == 200) {
                    const data = {
                        isAuth: true,
                        type: res.data.type,
                        name: res.data.name,
                        token: res.data.access_token,
                    };
                    onUserChange(data);
                    setUser(data);
                    setLoading(false);
                    
                }
            })
            .catch((error) => {
                setLoading(false);
                if (error.response && error.response.status === 422) {
                    setMessage(error.response.data.message);
                } else {
                    console.log(error.response.data.message)
                    setMessage(error.response.data.message);
                }
            });
    };
    if (user.isAuth === true && user.token != null) {
        console.log(`connexion reussi, isAuth: ${user}`);
        if(path.includes(app)){
            return navigate("/app/profile" + "/" + url.dashboard_home);
        }
        return navigate(url.dashboard + "/" + url.dashboard_home);
    }

    return (
        <div className="form-content mt-5">
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={handleSubmit} className="sign-in-form">
                        <h2 className="title">Connectez-vous</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="Votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Votre mots de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {message != "" ? (
                            <div className="text-danger">{message}</div>
                        ) : null}
                        {loading ? (
                            <Loading />
                        ) : (
                            <input
                                type="submit"
                                value="Connexion"
                                className="btn btn-afdefis solid"
                            />
                        )}
                        <p className="social-text">
                            Ou connectez-vous avec les plateformes sociales
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
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Vous n'avez pas de compte ?</h3>
                            <p>
                            Incrivez vous pour acheter facilement et suivre l'évolution de votre commande
                            </p>
                            <Link to={url.register} aria-current="page">
                                <button
                                    className="btn transparent"
                                    id="sign-up-btn"
                                >
                                    Inscription
                                </button>
                            </Link>
                        </div>
                        <img src={login} className="image" alt="" />
                    </div>
                    <div className="panel right-panel"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
