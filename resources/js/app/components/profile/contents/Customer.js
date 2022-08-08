import React, { Suspense, useContext, useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import { AppContext } from "../../../context/context";
import { dashboardClientRoutes, getRoute } from "../../../routes";
import apiClient from "../../../services/api";
import url from "../../../url";
import ButtonGroup from "../includes/ButtonGroup";
import ButtonLink from "../includes/ButtonLink";
import CardInfo from "../includes/CardInfo";

const Customer = () => {

    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [data, setData] = useState([]);
    useEffect(() => {
        apiClient
            .get('compteur',{
              headers: { Authorization: `Bearer ${user.token}` },
          })
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data.response);
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

    const autorisation = (view) => {
        if (user.type == 2) {
            return view;
        }
    };
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Clients</h1>
                
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                <CardInfo
                    icon={
                        <svg
                            className="col"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100"
                            height="48"
                            viewBox="0 0 512 512"
                            fill="#ffffff"
                            strokeWidth="16"
                            stroke="#3292f0"
                        >
                            <path d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z" />
                        </svg>
                    }
                    title="Total"
                    data={data && data.nombre_user}
                />

                <CardInfo
                    icon={
                        <svg
                            className="col"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="48"
                            viewBox="0 0 512 512"
                            fill="#ffffff"
                            strokeWidth="16"
                            stroke="#3292f0"
                        >
                            <path d="M512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM368 400c0-16.69 3.398-32.46 8.619-47.36C374.3 352.5 372.2 352 369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h266.1C389.5 485.6 368 445.5 368 400zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 21.47-5.625 41.38-14.65 59.34C462.2 263.4 486.1 256 512 256c42.48 0 80.27 18.74 106.6 48h3.756C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192zM618.1 366.7c-5.025-16.01-13.59-30.62-24.75-42.71c-1.674-1.861-4.467-2.326-6.699-1.023l-19.17 11.07c-8.096-6.887-17.4-12.28-27.45-15.82V295.1c0-2.514-1.861-4.746-4.281-5.213c-16.56-3.723-33.5-3.629-49.32 0C484.9 291.2 483.1 293.5 483.1 295.1v22.24c-10.05 3.537-19.36 8.932-27.45 15.82l-19.26-11.07c-2.139-1.303-4.932-.8379-6.697 1.023c-11.17 12.1-19.73 26.71-24.66 42.71c-.7441 2.512 .2793 5.117 2.42 6.326l19.17 11.17c-1.859 10.42-1.859 21.21 0 31.64l-19.17 11.17c-2.234 1.209-3.164 3.816-2.42 6.328c4.932 16.01 13.49 30.52 24.66 42.71c1.766 1.863 4.467 2.328 6.697 1.025l19.26-11.07c8.094 6.887 17.4 12.28 27.45 15.82v22.24c0 2.514 1.77 4.746 4.188 5.211c16.66 3.723 33.5 3.629 49.32 0c2.42-.4648 4.281-2.697 4.281-5.211v-22.24c10.05-3.535 19.36-8.932 27.45-15.82l19.17 11.07c2.141 1.303 5.025 .8379 6.699-1.025c11.17-12.1 19.73-26.7 24.75-42.71c.7441-2.512-.2773-5.119-2.512-6.328l-19.17-11.17c1.953-10.42 1.953-21.22 0-31.64l19.17-11.17C618.7 371.8 619.7 369.2 618.1 366.7zM512 432c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32s32 14.33 32 32C544 417.7 529.7 432 512 432z" />
                        </svg>
                    }
                    title="Vendeurs"
                    data={data && data.nombre_vendeur}
                />

                <CardInfo
                    icon={
                        <svg
                            className="col"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="48"
                            viewBox="0 0 512 512"
                            fill="#ffffff"
                            strokeWidth="16"
                            stroke="#3292f0"
                        >
                            <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z" />
                        </svg>
                    }
                    title="Acheteurs"
                    data={data && data.nombre_acheteur}
                />

                <CardInfo
                    icon={
                        <svg
                            className="col"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="48"
                            viewBox="0 0 512 512"
                            fill="#ffffff"
                            strokeWidth="16"
                            stroke="#3292f0"
                        >
                            <path d="M425.1 482.6c-2.303-1.25-4.572-2.559-6.809-3.93l-7.818 4.493c-6.002 3.504-12.83 5.352-19.75 5.352c-10.71 0-21.13-4.492-28.97-12.75c-18.41-20.09-32.29-44.15-40.22-69.9c-5.352-18.06 2.343-36.87 17.83-45.24l8.018-4.669c-.0664-2.621-.0664-5.242 0-7.859l-7.655-4.461c-12.3-6.953-19.4-19.66-19.64-33.38C305.6 306.3 290.4 304 274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512H413.3c5.727 0 10.9-1.727 15.66-4.188c-2.271-4.984-3.86-10.3-3.86-16.06V482.6zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM610.5 373.3c2.625-14 2.625-28.5 0-42.5l25.75-15c3-1.625 4.375-5.125 3.375-8.5c-6.75-21.5-18.25-41.13-33.25-57.38c-2.25-2.5-6-3.125-9-1.375l-25.75 14.88c-10.88-9.25-23.38-16.5-36.88-21.25V212.3c0-3.375-2.5-6.375-5.75-7c-22.25-5-45-4.875-66.25 0c-3.25 .625-5.625 3.625-5.625 7v29.88c-13.5 4.75-26 12-36.88 21.25L394.4 248.5c-2.875-1.75-6.625-1.125-9 1.375c-15 16.25-26.5 35.88-33.13 57.38c-1 3.375 .3751 6.875 3.25 8.5l25.75 15c-2.5 14-2.5 28.5 0 42.5l-25.75 15c-3 1.625-4.25 5.125-3.25 8.5c6.625 21.5 18.13 41 33.13 57.38c2.375 2.5 6 3.125 9 1.375l25.88-14.88c10.88 9.25 23.38 16.5 36.88 21.25v29.88c0 3.375 2.375 6.375 5.625 7c22.38 5 45 4.875 66.25 0c3.25-.625 5.75-3.625 5.75-7v-29.88c13.5-4.75 26-12 36.88-21.25l25.75 14.88c2.875 1.75 6.75 1.125 9-1.375c15-16.25 26.5-35.88 33.25-57.38c1-3.375-.3751-6.875-3.375-8.5L610.5 373.3zM496 400.5c-26.75 0-48.5-21.75-48.5-48.5s21.75-48.5 48.5-48.5c26.75 0 48.5 21.75 48.5 48.5S522.8 400.5 496 400.5z" />
                        </svg>
                    }
                    title="Administrateurs"
                    data={data && data.nombre_administrateur}
                    
                    
                />
            </div>

            <div className="row my-2">
                <ButtonGroup>
                    <ButtonLink
                        url={url.dashboard_client_liste}
                        name="Liste"
                    />
                    <ButtonLink
                        url={url.dashboard_client_simple}
                        name="Clients"
                    />
                    <ButtonLink
                        url={url.dashboard_client_vendeur}
                        name="Vendeurs"
                    />
                </ButtonGroup>
            </div>
            <div className="row g-3 my-2">
            <Suspense fallback={<div>Chargement...</div>}>
                <Routes>
                    {dashboardClientRoutes.map((route, idx) => {
                        return getRoute(route, idx);
                    })}
                </Routes></Suspense>
            </div>


            {/*<div className="modal" id="edit">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Editer la commande</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <>
                        {
                            'On récupère l\'utilisateur ici'
                        
                        }
                        </>

                        <form
                            onSubmit={'handleSubmit'}
                            className="card py-2 needs-validation modal-body"
                        >
                            <div className="col-12">
                                <label
                                    for="validationCustom01"
                                    className="form-label"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="validationCustom01"
                                    value=""
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    for="validationCustom01"
                                    className="form-label"
                                >
                                    Role
                                </label>
                                <select className="form-select">
                                    <option>Sélectionnez le role</option>
                                    <option>Client</option>
                                    <option>Vendeur</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label
                                    for="validationCustom01"
                                    className="form-label"
                                >
                                    Status
                                </label>
                                <select className="form-select">
                                    <option>Sélectionnez le status</option>
                                    <option>Active</option>
                                    <option>Désactiver</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label
                                    for="validationCustom01"
                                    className="form-label"
                                >
                                    Mots de passe
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="validationCustom01"
                                    value=""
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    for="validationCustom01"
                                    className="form-label"
                                >
                                    Comfirmer mots de passe
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="validationCustom01"
                                    value=""
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
            </div>*/}
        </>
    );
};

export default Customer;
