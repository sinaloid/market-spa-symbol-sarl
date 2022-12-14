import faker from "@faker-js/faker";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/context";
import ReactToastify, { notify } from "../../../ReactToastify";
import apiClient from "../../../services/api";
import ButtonAction from "./ButtonAction";

const PayTable = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [datas, setDatas] = useState([]);

    const [refresh, setRefresh] = useState([]);

    useEffect(() => {
        apiClient
            .get("paiement/list", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setDatas(res.data.response);
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
    }, [refresh]);

    const onDelete = (slug) => {
        apiClient
            .delete(`paiement/detele/${slug}`, {
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
    return (
        <>
            <ReactToastify />
            <table className="table text-center text-nowrap" id="user_table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Client</th>
                        <th scope="col">Email</th>
                        <th scope="col">Numero</th>
                        <th scope="col">N?? Commande</th>
                        <th scope="col">Montant</th>
                        <th scope="col">date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, idx) => {
                        return (
                            <tr key={idx}>
                                <th scope="row">{idx + 1}</th>
                                <td>{data.nom}</td>
                                <td>{data.email}</td>
                                <td>{data.numero}</td>
                                <td>{data.date}</td>
                                <td>
                                    {Intl.NumberFormat().format(
                                        data.prix_total
                                    ) + " FCFA"}
                                </td>
                                <td>{data.numero_commande}</td>
                                <td>
                                    <ButtonAction
                                        slug={data.slug}
                                        dataEdite={data}
                                        setDataEdite={""}
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

export default PayTable;
