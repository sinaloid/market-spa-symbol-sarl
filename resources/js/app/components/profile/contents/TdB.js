import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/context";
import apiClient from "../../../services/api";
import url from "../../../url";
import { BarChart } from "../charts/BarChart";
import { PieChart } from "../charts/PieChart";
import ButtonLink from "../includes/ButtonLink";
import CardInfo from "../includes/CardInfo";
import CustomerTable from "../includes/CustomerTable";
import OrderTable from "../includes/OrderTable";
import ProcductTable from "../includes/ProductTable";

const TdB = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const [data, setData] = useState([]);
    useEffect(() => {
        apiClient
            .get("compteur", {
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
                <h1 className="h2">TdB</h1>
            </div>
            {autorisation(
                <>
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
                                    <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
                                </svg>
                            }
                            title="Utilisateurs"
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
                                    <path d="M171.7 191.1H404.3L322.7 35.07C316.6 23.31 321.2 8.821 332.9 2.706C344.7-3.409 359.2 1.167 365.3 12.93L458.4 191.1H544C561.7 191.1 576 206.3 576 223.1C576 241.7 561.7 255.1 544 255.1L492.1 463.5C484.1 492 459.4 512 430 512H145.1C116.6 512 91 492 83.88 463.5L32 255.1C14.33 255.1 0 241.7 0 223.1C0 206.3 14.33 191.1 32 191.1H117.6L210.7 12.93C216.8 1.167 231.3-3.409 243.1 2.706C254.8 8.821 259.4 23.31 253.3 35.07L171.7 191.1zM191.1 303.1C191.1 295.1 184.8 287.1 175.1 287.1C167.2 287.1 159.1 295.1 159.1 303.1V399.1C159.1 408.8 167.2 415.1 175.1 415.1C184.8 415.1 191.1 408.8 191.1 399.1V303.1zM271.1 303.1V399.1C271.1 408.8 279.2 415.1 287.1 415.1C296.8 415.1 304 408.8 304 399.1V303.1C304 295.1 296.8 287.1 287.1 287.1C279.2 287.1 271.1 295.1 271.1 303.1zM416 303.1C416 295.1 408.8 287.1 400 287.1C391.2 287.1 384 295.1 384 303.1V399.1C384 408.8 391.2 415.1 400 415.1C408.8 415.1 416 408.8 416 399.1V303.1z" />
                                </svg>
                            }
                            title="Commandes"
                            data={data && data.nombre_commande}
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
                                    <path d="M568.2 336.3c-13.12-17.81-38.14-21.66-55.93-8.469l-119.7 88.17h-120.6c-8.748 0-15.1-7.25-15.1-15.99c0-8.75 7.25-16 15.1-16h78.25c15.1 0 30.75-10.88 33.37-26.62c3.25-20-12.12-37.38-31.62-37.38H191.1c-26.1 0-53.12 9.25-74.12 26.25l-46.5 37.74L15.1 383.1C7.251 383.1 0 391.3 0 400v95.98C0 504.8 7.251 512 15.1 512h346.1c22.03 0 43.92-7.188 61.7-20.27l135.1-99.52C577.5 379.1 581.3 354.1 568.2 336.3zM279.3 175C271.7 173.9 261.7 170.3 252.9 167.1L248 165.4C235.5 160.1 221.8 167.5 217.4 179.1s2.121 26.2 14.59 30.64l4.655 1.656c8.486 3.061 17.88 6.095 27.39 8.312V232c0 13.25 10.73 24 23.98 24s24-10.75 24-24V221.6c25.27-5.723 42.88-21.85 46.1-45.72c8.688-50.05-38.89-63.66-64.42-70.95L288.4 103.1C262.1 95.64 263.6 92.42 264.3 88.31c1.156-6.766 15.3-10.06 32.21-7.391c4.938 .7813 11.37 2.547 19.65 5.422c12.53 4.281 26.21-2.312 30.52-14.84s-2.309-26.19-14.84-30.53c-7.602-2.627-13.92-4.358-19.82-5.721V24c0-13.25-10.75-24-24-24s-23.98 10.75-23.98 24v10.52C238.8 40.23 221.1 56.25 216.1 80.13C208.4 129.6 256.7 143.8 274.9 149.2l6.498 1.875c31.66 9.062 31.15 11.89 30.34 16.64C310.6 174.5 296.5 177.8 279.3 175z" />
                                </svg>
                            }
                            title="Ventes"
                            data={data && Intl.NumberFormat().format(data.total_vente) + " FCFA"}
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
                                    <path d="M512 80C512 98.01 497.7 114.6 473.6 128C444.5 144.1 401.2 155.5 351.3 158.9C347.7 157.2 343.9 155.5 340.1 153.9C300.6 137.4 248.2 128 192 128C183.7 128 175.6 128.2 167.5 128.6L166.4 128C142.3 114.6 128 98.01 128 80C128 35.82 213.1 0 320 0C426 0 512 35.82 512 80V80zM160.7 161.1C170.9 160.4 181.3 160 192 160C254.2 160 309.4 172.3 344.5 191.4C369.3 204.9 384 221.7 384 240C384 243.1 383.3 247.9 381.9 251.7C377.3 264.9 364.1 277 346.9 287.3C346.9 287.3 346.9 287.3 346.9 287.3C346.8 287.3 346.6 287.4 346.5 287.5L346.5 287.5C346.2 287.7 345.9 287.8 345.6 288C310.6 307.4 254.8 320 192 320C132.4 320 79.06 308.7 43.84 290.9C41.97 289.9 40.15 288.1 38.39 288C14.28 274.6 0 258 0 240C0 205.2 53.43 175.5 128 164.6C138.5 163 149.4 161.8 160.7 161.1L160.7 161.1zM391.9 186.6C420.2 182.2 446.1 175.2 468.1 166.1C484.4 159.3 499.5 150.9 512 140.6V176C512 195.3 495.5 213.1 468.2 226.9C453.5 234.3 435.8 240.5 415.8 245.3C415.9 243.6 416 241.8 416 240C416 218.1 405.4 200.1 391.9 186.6V186.6zM384 336C384 354 369.7 370.6 345.6 384C343.8 384.1 342 385.9 340.2 386.9C304.9 404.7 251.6 416 192 416C129.2 416 73.42 403.4 38.39 384C14.28 370.6 .0003 354 .0003 336V300.6C12.45 310.9 27.62 319.3 43.93 326.1C83.44 342.6 135.8 352 192 352C248.2 352 300.6 342.6 340.1 326.1C347.9 322.9 355.4 319.2 362.5 315.2C368.6 311.8 374.3 308 379.7 304C381.2 302.9 382.6 301.7 384 300.6L384 336zM416 278.1C434.1 273.1 452.5 268.6 468.1 262.1C484.4 255.3 499.5 246.9 512 236.6V272C512 282.5 507 293 497.1 302.9C480.8 319.2 452.1 332.6 415.8 341.3C415.9 339.6 416 337.8 416 336V278.1zM192 448C248.2 448 300.6 438.6 340.1 422.1C356.4 415.3 371.5 406.9 384 396.6V432C384 476.2 298 512 192 512C85.96 512 .0003 476.2 .0003 432V396.6C12.45 406.9 27.62 415.3 43.93 422.1C83.44 438.6 135.8 448 192 448z" />
                                </svg>
                            }
                            title="Dépenses"
                            data={data && Intl.NumberFormat().format(data.total_depense) + " FCFA"}
                        />
                    </div>
                    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 g-3">
                        <BarChart title={"Ventes des 6 dernières mois"} />
                        <PieChart
                            title={"Ventes des 6 dernières mois par région"}
                        />
                    </div>
                </>
            )}

            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 g-3 py-4">
                <div className="col">
                    <div className="card o-hidden mb-4">
                        <div className="card-header d-flex position-relative">
                            <h3 className="w-50 float-left card-title m-0">
                                Commandes
                            </h3>
                            <ButtonLink
                                className="btn-sm position-absolute end-0 mx-3"
                                url={`/profile/${url.dashboard_commandes}`}
                                name="Ajouter"
                            />
                        </div>
                        <div>
                            <div className="table-responsive">
                                <OrderTable />
                            </div>
                        </div>
                    </div>
                    <div className="card o-hidden mb-4">
                        <div className="card-header d-flex position-relative">
                            <h3 className="w-50 float-left card-title m-0">
                                Produits
                            </h3>
                            <div className="position-absolute end-0 mx-3">
                                <ButtonLink
                                    className="mx-1"
                                    url={`/profile/produit/${url.dashboard_produit_ajout}`}
                                    name="Produit"
                                />
                                <ButtonLink
                                    className="mx-1"
                                    url={`/profile/produit/${url.dashboard_produit_categorie}`}
                                    name="Categorie"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="table-responsive">
                                <ProcductTable />
                            </div>
                        </div>
                    </div>
                </div>
                {autorisation(
                    <div className="col">
                        <div className="card o-hidden mb-4">
                            <div className="card-header d-flex position-relative">
                                <h3 className="w-50 float-left card-title m-0">
                                    Vendeurs
                                </h3>
                                <ButtonLink
                                    className="btn-sm position-absolute end-0 mx-3"
                                    url={`/profile/produit/${url.dashboard_produit_ajout}`}
                                    name="Ajouter"
                                />
                            </div>
                            <div>
                                <div className="table-responsive">
                                    <CustomerTable clientType={"acheteur"} />
                                </div>
                            </div>
                        </div>
                        <div className="card o-hidden mb-4">
                            <div className="card-header d-flex position-relative">
                                <h3 className="w-50 float-left card-title m-0">
                                    Acheteur
                                </h3>
                                <ButtonLink
                                    className="btn-sm position-absolute end-0 mx-3"
                                    url={`/profile/produit/${url.dashboard_produit_ajout}`}
                                    name="Ajouter"
                                />
                            </div>
                            <div>
                                <div className="table-responsive">
                                    <CustomerTable clientType={"vendeur"} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default TdB;
