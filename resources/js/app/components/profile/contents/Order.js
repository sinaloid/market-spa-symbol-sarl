import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/context";
import apiClient from "../../../services/api";
import { BarChart } from "../charts/BarChart";
import { PieChart } from "../charts/PieChart";
import CardInfo from "../includes/CardInfo";
import OrderTable from "../includes/OrderTable";

const Order = () => {
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
                <h1 className="h2">Commandes</h1>
                
            </div>
            

            {
                autorisation(
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
                            <path d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM96 392c-13.25 0-24-10.75-24-24S82.75 344 96 344s24 10.75 24 24S109.3 392 96 392zM96 296c-13.25 0-24-10.75-24-24S82.75 248 96 248S120 258.8 120 272S109.3 296 96 296zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM304 384h-128C167.2 384 160 376.8 160 368C160 359.2 167.2 352 176 352h128c8.801 0 16 7.199 16 16C320 376.8 312.8 384 304 384zM304 288h-128C167.2 288 160 280.8 160 272C160 263.2 167.2 256 176 256h128C312.8 256 320 263.2 320 272C320 280.8 312.8 288 304 288z" />
                        </svg>
                    }
                    title="Commandes"
                    data={ data && data.nombre_commande}
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
                            <path d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32s-14.33 32-32 32S160 113.7 160 96S174.3 64 192 64zM282.9 262.8l-88 112c-4.047 5.156-10.02 8.438-16.53 9.062C177.6 383.1 176.8 384 176 384c-5.703 0-11.25-2.031-15.62-5.781l-56-48c-10.06-8.625-11.22-23.78-2.594-33.84c8.609-10.06 23.77-11.22 33.84-2.594l36.98 31.69l72.52-92.28c8.188-10.44 23.3-12.22 33.7-4.062C289.3 237.3 291.1 252.4 282.9 262.8z" />
                        </svg>
                    }
                    title="Livrer"
                    data={ data && data.nombre_livraison_teminer}
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
                            <path d="M368 0C394.5 0 416 21.49 416 48V96H466.7C483.7 96 499.1 102.7 512 114.7L589.3 192C601.3 204 608 220.3 608 237.3V352C625.7 352 640 366.3 640 384C640 401.7 625.7 416 608 416H576C576 469 533 512 480 512C426.1 512 384 469 384 416H256C256 469 213 512 160 512C106.1 512 64 469 64 416H48C21.49 416 0 394.5 0 368V48C0 21.49 21.49 0 48 0H368zM416 160V256H544V237.3L466.7 160H416zM160 368C133.5 368 112 389.5 112 416C112 442.5 133.5 464 160 464C186.5 464 208 442.5 208 416C208 389.5 186.5 368 160 368zM480 464C506.5 464 528 442.5 528 416C528 389.5 506.5 368 480 368C453.5 368 432 389.5 432 416C432 442.5 453.5 464 480 464z" />
                        </svg>
                    }
                    title="En cours"
                    data={ data && data.nombre_livraison_en_cours}
                    
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
                    title="Revenu"
                    data={ data && data.total_vente + " FCFA"}
                />
            </div>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 g-3">
                <BarChart title={"Commandes des 6 derni??res mois"} />
                <PieChart title={"Commandes des 6 derni??res mois par r??gion"} />
            </div>
                    </>
                )
            }
            

            <div className="container mt-4 d-flex position-relative p-0">
                <h2 className="mt-2">Liste</h2>
                <button
                    type="button"
                    className="btn btn-afdefis position-absolute end-0 mx-3"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                >
                    Cr??er
                </button>
            </div>

            <div className="card shadow-sm table-responsive">
                <OrderTable />
            </div>
        </>
    );
};

export default Order;
