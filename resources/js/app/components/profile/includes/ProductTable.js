import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/context";
import ReactToastify, { notify } from "../../../ReactToastify";
import apiClient, { urlImg } from "../../../services/api";
import ButtonAction from "./ButtonAction";

const ProcductTable = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [libelle, setLibelle] = useState([]);
    const [image, setImage] = useState([]);
    const [deleteImg, setDeleteImg] = useState("");
    const [sku, setSku] = useState([]);
    const [stock, setStock] = useState([]);
    const [listCategorie, setListCategorie] = useState([]);
    const [prix, setPrix] = useState([]);
    const [description, setDescription] = useState("");
    const [categorie, setCategorie] = useState("");
    const [editeSlug, setEditeSlug] = useState([]);
    const [refresh, setRefresh] = useState([]);

    const [datas, setDatas] = useState([]);
    useEffect(() => {
        apiClient
            .get("productAndCategorie", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data.product);
                    setListCategorie(res.data.categorie);
                    //console.log(datas)
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

        const data = new FormData();
        data.append("libelle", libelle);
        data.append("sku", sku);
        data.append("stock", stock);
        data.append("prix", prix);
        data.append("description", description);
        data.append("categorie_id", categorie);
        for (let i = 0; i < image.length; i++) {
            data.append("images[]", image[i]);
        }
        //console.log(data)
        apiClient
            .post("product", data, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1);
                    setLibelle([]);
                    setImage([]);
                    setSku([]);
                    setStock([]);
                    setCategorie([]);
                    setDescription([]);
                    setPrix([]);
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1);
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
                setRefresh(refresh + 1);
            });
    };
    const handleSubmitEdite = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("libelle", libelle);
        data.append("sku", sku);
        data.append("stock", stock);
        data.append("prix", prix);
        data.append("description", description);
        data.append("categorie_id", categorie);
        for (let i = 0; i < image.length; i++) {
            //console.log(image[i])
            data.append("images[]", image[i]);
        }
        data.append('_method', 'PATCH')
        console.log(data)
        apiClient
            .post(`product/${editeSlug}`,data,
                {
                    headers: { Authorization: `Bearer ${user.token}`,
                 },
                    
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1);
                    setLibelle([]);
                    setImage([]);
                    setSku([]);
                    setStock([]);
                    setCategorie([]);
                    setDescription([]);
                    setPrix([]);
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1);
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
            });
    };

    const setDataEdite = (data) => {
        setLibelle(data.libelle);
        setImage(data.image);
        setSku(data.sku);
        setStock(data.stock);
        setCategorie(data.categorie_slug);
        setPrix(data.prix);
        setDescription(data.description);
        setImage(data.image);
        setEditeSlug(data.slug);
    };
    const onDelete = (slug) => {
        apiClient
            .delete(`product/${slug}`, {
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

    const onDeleteImg = () => {
        apiClient
            .delete(`image/detele/${deleteImg}`, {
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
    const handleChange = (e) => {
        const imagesArray = [];
        let isValid = "";

        for (let i = 0; i < e.target.files.length; i++) {
            imagesArray.push(e.target.files[i]);
        }
        setImage(imagesArray);
    };
    return (
        <>
            <ReactToastify />
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Produit</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="card py-2 needs-validation modal-body"
                            encType="multipart/form-data"
                        >
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Libellé
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={libelle}
                                    onChange={(e) => {
                                        setLibelle(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    SKU
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={sku}
                                    onChange={(e) => {
                                        setSku(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Stock
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) => {
                                        setStock(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Prix
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={prix}
                                    onChange={(e) => {
                                        setPrix(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12 py-1">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Categorie
                                </label>
                                <select
                                    className="form-select"
                                    value={categorie}
                                    onChange={(e) => {
                                        setCategorie(e.target.value);
                                    }}
                                >
                                    <option>Sélectionnez la categorie</option>
                                    {listCategorie.map((cat, idx) => {
                                        return (
                                            <option key={idx} value={cat.slug}>
                                                {cat.nom_categorie}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    image
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    className="form-control"
                                    //value={image}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Description
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
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
                            <h4 className="modal-title">Editer le produit</h4>
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
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Libellé
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={libelle}
                                    onChange={(e) => {
                                        setLibelle(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    SKU
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={sku}
                                    onChange={(e) => {
                                        setSku(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Stock
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) => {
                                        setStock(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Prix
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={prix}
                                    onChange={(e) => {
                                        setPrix(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-12 py-1">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Categorie
                                </label>
                                <select
                                    className="form-select"
                                    value={categorie}
                                    onChange={(e) => {
                                        setCategorie(e.target.value);
                                    }}
                                >
                                    <option>Sélectionnez la categorie</option>
                                    {listCategorie.map((cat, idx) => {
                                        return (
                                            <option key={idx} value={cat.slug}>
                                                {cat.nom_categorie}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    image
                                </label>
                                <div className="w-100">
                                    {image.map((img, idx) => {
                                        if(img.nom_image =="")
                                            return
                                        return (
                                            <div key={idx} className="d-inline-block me-2">
                                                    <img
                                                        className="m-0 avatar-sm-table"
                                                        width={64}
                                                        src={
                                                            urlImg +
                                                            "" +
                                                            img.nom_image
                                                        }
                                                        alt=""
                                                    />
                                                    <br />
                                                    <i 
                                                        className="fa-solid fa-trash" 
                                                        style={{color:"red"}}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#deleteImage"
                                                        onClick={()=>setDeleteImg(img.nom_image)}
                                                        ></i>
                                                </div>
                                        );
                                    })}
                                </div>
                                <input
                                    type="file"
                                    multiple
                                    className="form-control"
                                    //value={image}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Description
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
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

            <div className="modal" id="deleteImage">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Suppression d'image
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <span>
                                Attention vous sur le point de supprimer l'image ! 
                            </span><br/>
                            <span>Voulez vous continuer ?</span>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-afdefis-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    onDeleteImg();
                                }}
                            >
                                Continuer
                            </button>
                            <button
                                type="button"
                                className="btn btn-afdefis"
                                data-bs-dismiss="modal"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table text-center text-nowrap" id="user_table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Libellé</th>
                        <th scope="col">Image</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Vendeur</th>
                        <th scope="col">Prix unitaire</th>
                        <th scope="col">Categorie</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, idx) => {
                        return (
                            <tr key={data.slug}>
                                <td>{idx + 1}</td>
                                <td>{data.libelle}</td>
                                <td>
                                    <img
                                        className="rounded-circle m-0 avatar-sm-table"
                                        width={24}
                                        src={ data.image[0] ? data.image[0].nom_image &&
                                            urlImg +
                                            "" + data.image[0].nom_image : ''
                                        }
                                        alt=""
                                    />
                                </td>
                                <td>{data.stock}</td>
                                <td>{data.vendeur}</td>
                                <td>
                                    {Intl.NumberFormat().format(data.prix) +
                                        " FCFA"}
                                </td>
                                <td>{data.categorie}</td>
                                <td>
                                    <ButtonAction
                                        slug={data.slug}
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

export default ProcductTable;
