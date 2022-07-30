import React, { useContext, useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { AppContext } from "../../../context/context";
import ReactToastify, { notify } from "../../../ReactToastify";
import apiClient from "../../../services/api";
import ButtonAction from "./ButtonAction";
import "react-bootstrap-typeahead/css/Typeahead.css";

const CustomerTable = ({clientType}) => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [nom, setNom] = useState([]);
    const [image, setImage] = useState([]);
    const [email, setEmail] = useState([]);
    const [numero, setNumero] = useState([]);
    const [role, setRole] = useState('');
    const [commune, setCommune] = useState([]);
    const [password, setPassword] = useState([]);
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);
    const [editeSlug, setEditeSlug] = useState([]);
    const [refresh, setRefresh] = useState([]);
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        apiClient
            .get(clientType, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data.response);
                    let tab = res.data.communes.map((item) => {
                        return {
                            label: item.nom_commune,
                            id: item.id,
                            slug: item.slug,
                        };
                    });
                    setOptions(tab);
                    //console.log(res.data.response);
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
    }, [refresh]);
    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient
            .post(
                "clientVendeur",
                {
                    image: image,
                    nom: nom,
                    email: email,
                    numero: numero,
                    type: role == "vendeur" ? 1 : 0,
                    commune_id: selected[0].id,
                    password: password,
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1);
                    init()
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1);
                    init()
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
                setRefresh(refresh + 1);
                init()
            });
    };
    const handleSubmitEdite = (e) => {
        e.preventDefault();
        apiClient
            .put(
                `clientVendeur/${editeSlug}`,
                {
                    image: image,
                    nom: nom,
                    email: email,
                    numero: numero,
                    type: role == "vendeur" ? 1 : 0,
                    commune_id: selected[0],
                    password: password,
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1);
                    init()
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1);
                    init()
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
                init()
            });
    };

    const setDataEdite = (data) => {
        console.log(data);
        setImage(data.image);
        setNom(data.nom);
        setEmail(data.email);
        setNumero(data.numero);
        setRole(data.type == 1 ? "vendeur" : "acheteur");
        setSelected([data.commune]);
        setPassword(data.password);
        setEditeSlug(data.id);
    };
    const onDelete = (slug) => {
        apiClient
            .delete(`clientVendeur/${slug}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1);
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1);
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
            });
    };

    const init = () => {
        setImage([]);
        setNom([]);
        setEmail([]);
        setNumero([]);
        setRole([]);
        setCommune([]);
        setSelected([]);
        setPassword([]);
    };
    return (
        <>
            <ReactToastify />

            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-capitalize">{clientType}</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="card py-2 needs-validation modal-body"
                        >
                            <div className="col-12">
                                <label htmlFor="nom" className="form-label">
                                    Nom Prénom
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nom"
                                    value={nom}
                                    onChange={(e) => {
                                        setNom(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="image" className="form-label">
                                    Avatar
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="image"
                                    value={image}
                                    onChange={(e) => {
                                        setImage(e.target.value);
                                    }}
                                    
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label" htmlFor="numero">
                                    Numero
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="numero"
                                    value={numero}
                                    onChange={(e) => {
                                        setNumero(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="role" className="form-label">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    className="form-select"
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                    }}
                                >
                                    <option>Sélectionnez le role</option>
                                    <option value="acheteur">Acheteur</option>
                                    <option value="vendeur">Vendeur</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label htmlFor="commune" className="form-label">
                                    Entrer la
                                </label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="commune">
                                        commune
                                    </span>
                                    <Typeahead
                                        id="basic"
                                        onChange={setSelected}
                                        options={options}
                                        selected={selected}
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="password" className="form-label">
                                    Mots de passe
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="col-12 py-2">
                                <button
                                    className="btn btn-afdefis"
                                    type="submit"
                                    data-bs-dismiss="modal"
                                >
                                    Créer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal" id="edit">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Editer {(clientType == 'acheteur') ? "l'"+clientType : "le "+clientType}</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <form
                            onSubmit={handleSubmitEdite}
                            className="card py-2 needs-validation modal-body"
                        >
                            <div className="col-12">
                                <label htmlFor="nom" className="form-label">
                                    Nom Prénom
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nom"
                                    value={nom}
                                    onChange={(e) => {
                                        setNom(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="image" className="form-label">
                                    Avatar
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="image"
                                    value={image}
                                    onChange={(e) => {
                                        setImage(e.target.value);
                                    }}
                                    
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label" htmlFor="numero">
                                    Numero
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="numero"
                                    value={numero}
                                    onChange={(e) => {
                                        setNumero(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="role" className="form-label">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    className="form-select"
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                    }}
                                >
                                    <option>Sélectionnez le role</option>
                                    <option value="acheteur">Acheteur</option>
                                    <option value="vendeur">Vendeur</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label htmlFor="commune" className="form-label">
                                    Entrer la
                                </label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="commune">
                                        commune
                                    </span>
                                    <Typeahead
                                        id="basic"
                                        onChange={setSelected}
                                        options={options}
                                        selected={selected}
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="password" className="form-label">
                                    Mots de passe
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    
                                />
                            </div>

                            <div className="col-12 py-2">
                                <button
                                    className="btn btn-afdefis"
                                    type="submit"
                                    data-bs-dismiss="modal"
                                >
                                    Modifier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <table className="table text-center text-nowrap" id="user_table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Nom Prenom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Numero</th>
                        <th scope="col">Role</th>
                        <th scope="col">Commune</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                    <img
                                        className="rounded-circle m-0 avatar-sm-table"
                                        width={24}
                                        src={`https://source.unsplash.com/random/800x800/?product=${idx}`}
                                        alt=""
                                    />
                                </td>
                                <td>{data.nom}</td>
                                <td>{data.email}</td>
                                <td>{data.numero}</td>
                                <td>
                                    {data.type == 2
                                        ? "Administrateur"
                                        : data.type == 1
                                        ? "Vendeur"
                                        : "Acheteur"}
                                </td>
                                <td>{data.commune}</td>
                                <td>
                                    <span className="badge bg-success">
                                        Active
                                    </span>
                                </td>
                                <td>
                                    <ButtonAction
                                        slug={data.id}
                                        dataEdite={data}
                                        setDataEdite={setDataEdite}
                                        onDelete={onDelete}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default CustomerTable;
