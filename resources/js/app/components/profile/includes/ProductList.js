import faker from "@faker-js/faker";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/context";
import ReactToastify, { notify } from "../../../ReactToastify";
import apiClient from "../../../services/api";
import ButtonAction from "./ButtonAction";

const ProductList = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [libelle, setLibelle] = useState([]);
    const [image, setImage] = useState([]);
    const [stock, setStock] = useState([]);
    const [vendeur, setVendeur] = useState([]);
    const [prix, setPrix] = useState([]);
    const [categories, setCategories] = useState([]);

    const [datas, setDatas] = useState([]);
    useEffect(() => {
        apiClient
            .get("product", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data.response)
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
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient
            .post(
                "categorie",
                {
                    nom_categorie: libelle,
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1)
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1)
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
                setRefresh(refresh + 1)
            });
    };
    const handleSubmitEdite = (e) => {
        e.preventDefault();

        apiClient
            .put(
                `categorie/${editeSlug}`,
                {
                    nom_categorie: editeLibelle,
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1)
                }else{
                    notify("error", res.data.response);
                    setRefresh(refresh + 1)
                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
            });
    };
    const onDelete = (slug) => {
        apiClient
            .delete(
                `categorie/${slug}`,
                {
                    headers: {Authorization: `Bearer ${user.token}`},
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    notify("success", res.data.response);
                    setRefresh(refresh + 1)
                } else {
                    notify("error", res.data.response);
                    setRefresh(refresh + 1)

                }
            })
            .catch((error) => {
                notify("error", error.response.data.message);
            });
    };

    return (
        <>
        <ReactToastify />
            <div className="container mt-3 d-flex position-relative">
                <h2 className="mt-2">Liste</h2>
            </div>
            <div className="card shadow-sm table-responsive">
                <table className="table text-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Libellé</th>
                            <th scope="col">Image</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Propriétaire</th>
                            <th scope="col">Prix</th>
                            <th scope="col">Categories</th>
                            {/**<th scope="col">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, idx) => {
                            return (
                                <tr key={data.slug}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>{data.libelle}</td>
                                    <td>
                                        <img
                                            className="rounded-circle m-0 avatar-sm-table"
                                            width={24}
                                            src={`https://source.unsplash.com/random/800x800/?product=${idx}`}
                                            alt=""
                                        />
                                    </td>
                                    <td>
                                        {data.stock}
                                    </td>
                                    <td>{data.vendeur}</td>
                                    <td>
                                        {Intl.NumberFormat().format(data.prix) +" FCFA"}
                                    </td>
                                    <td>{data.categorie}</td>
                                    {/*<td>
                                        <ButtonAction />
                                    </td>*/}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ProductList;
