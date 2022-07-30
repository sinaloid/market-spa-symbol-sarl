import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/context";
import ReactToastify, { notify } from "../../../ReactToastify";
import apiClient from "../../../services/api";

const UserProfile = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [nom, setNom] = useState([]);
    const [numero, setNumero] = useState([]);
    const [type, setType] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [commune, setCommune] = useState([]);
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        apiClient
            .get("user", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data);
                   // console.log(res.data);
                    setNom(res.data.nom);
                    setNumero(res.data.numero);
                    setType(res.data.type);
                    setPhoto(res.data.type);
                    setEmail(res.data.email);
                    setPassword([]);
                    setCommune(res.data.commune_id);
                } else {
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    notify("error", error.response.data.message);
                } else {
                    notify("error", error.response.data.message);
                }
            });
    }, []);
    return (
        <>
            <ReactToastify />
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Profile</h1>
            </div>

            <div>
                <form
                    onSubmit={"handleSubmit"}
                    className="card py-2 needs-validation modal-body"
                >
                    <div className="col-12">
                        <label for="validationCustom01" className="form-label">
                            Nom Prénom
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={nom}
                            onChange={()=>{(e)=>{setNom(e.target.value)}}}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label for="validationCustom01" className="form-label">
                            Avatar
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            
                            
                        />
                    </div>

                    <div className="col-12">
                        <label for="validationCustom01" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label for="validationCustom01" className="form-label">
                            Role
                        </label>
                        <select 
                            class="form-select"
                            value={type}
                            onChange={()=>{(e)=>{setType(e.target.value)}}}
                            >
                            <option>Sélectionnez le role</option>
                            {
                                (type != 2) ? <>
                                <option value="1">Client</option>
                                <option value="2">Vendeur</option>
                                </> : <option value="2">Administrateurs</option>
                            }
                        </select>
                    </div>
                    <div className="col-12">
                        <label for="validationCustom01" className="form-label">
                            Commune
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            value={commune}
                            onChange={()=>{(e)=>{setCommune(e.target.value)}}}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label for="validationCustom01" className="form-label">
                            Mots de passe
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={()=>{(e)=>{setPassword(e.target.value)}}}
                            required
                        />
                    </div>
                    <div className="col-12 py-2">
                        <button
                            className="btn btn-afdefis"
                            type="submit"
                            data-bs-dismiss="modal"
                        >
                            Modifiez
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UserProfile;
