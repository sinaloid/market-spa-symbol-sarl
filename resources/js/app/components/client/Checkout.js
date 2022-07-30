import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/img/logo/logo.jpeg";
import { AppContext } from "../../context/context";
import apiClient from "../../services/api";

const Checkout = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const cartCtx = useContext(AppContext);
    const { cart, onCartChange } = cartCtx;
    const [info, setInfo] = useState([]);
    const [total, setTotal] = useState(0);
    const {userSlug} = useParams()

    useEffect(() => {
        if (user.token != null) {
            apiClient
                .get(`userCommande/${userSlug}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                .then((res) => {
                    if (user.type != res.data.type) {
                        user.type = res.data.type;
                        setType(user.type);
                        onUserChange(user);
                        //console.log("user type change : " + res.data.type);
                    } else {
                        //console.log("user type not change : " + res.data.type);
                    }
                    setInfo(res.data);
                    let prxTotal = 0;
                    cart.content.forEach((data) => {
                        prxTotal += data.prix * data.quantite;
                    });
                    setTotal(prxTotal);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }, []);

    const calltouchpay = (montant) => {
        sendPaymentInfos(
            new Date().getTime(),
            "BFSYM1874",
            "BXO4O$xdC6MR^GuTPEQF88M?WkW@%t0s1KL$AbGxcrVZYWNh7q",
            "symbol.bf",
            "http://africadefis.com/market/public/success",
            "http://africadefis.com/market/public/failed",
            montant,
            info.commune,
            info.email,
            info.nom,
            "",
            ""
        );
        /*SendPaymentInfos(order_number,agency_code,secure_code,domain_name,url_redirection_suc
            cess,url_redirection_failed,amount,city,email,clientFirstName,clientLastName,)*/
    };
    return (
        <main>
            <div className="row">
                <div
                    className="col-12"
                    style={{
                        lineHeight: "150%",
                    }}
                >
                    <div className="toolbar hidden-print">
                        <div className="text-center my-2">
                            <button
                                type="button"
                                className="btn btn-lg btn-afdefis-secondary ms-1 my-1"
                                onClick={() => {
                                    calltouchpay(total * 1.18);
                                }}
                            >
                                <i className="fa fa-money"></i> Payer par mobile
                                money
                            </button>
                            <a
                                href="#"
                                className="btn btn-lg btn-afdefis-secondary ms-1 my-1"
                            >
                                Valider et payer ultérieurement
                            </a>
                            <a
                                id="printInvoice"
                                className="btn btn-afdefis ms-1 my-1"
                            >
                                <i className="fa fa-print"></i> Imprimer
                            </a>
                            <a href="#" className="btn btn-afdefis ms-1 my-1">
                                <i className="fa fa-file-pdf-o"></i> Export PDF
                            </a>
                        </div>
                    </div>
                    <div className="my-2">
                        <div className="overflow-auto">
                            <div
                                className="bg-white mx-auto"
                                style={{
                                    minWidth: "600px",
                                    width: "80%",
                                    padding: "15px",
                                    border: "0.5rem solid #516d8e",
                                }}
                            >
                                <header>
                                    <div className="row border-bottom">
                                        <div className="col-lg-2">
                                            <a
                                                target="_blank"
                                                href="https://lobianijs.com"
                                            >
                                                <img
                                                    src={logo}
                                                    data-holder-rendered="true"
                                                />
                                            </a>
                                        </div>
                                        <div className="col-lg-10 text-end">
                                            <p className="m-0">
                                                <Link
                                                    target="_blank"
                                                    to="https://www.africadefis.com"
                                                    style={{
                                                        fontSize: "1.5rem",
                                                        fontWeight: "700",
                                                        color: "#406a9b",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    AFRICADEFIS MARKET
                                                </Link>
                                            </p>
                                            <div className="p-0">
                                                <small>
                                                    01 BP Ouaga, BURKINA-FASO
                                                </small>
                                                <br />
                                                <small>
                                                    (+226) 70 48 83 05
                                                </small>
                                                <br />
                                                <small>
                                                    info@africadefis.com
                                                </small>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </header>
                                <div>
                                    <div className="row">
                                        <div className="col-12 text-start">
                                            <div className="text-gray-light">
                                                FACTURE DE:
                                            </div>
                                            <p
                                                className="m-0"
                                                style={{
                                                    fontSize: "1.2rem",
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {info.nom}
                                            </p>
                                            <div>
                                                <small>
                                                    +226 {info.numero}
                                                </small>
                                                <br />
                                                <small>{info.email}</small>
                                            </div>
                                        </div>
                                        <div className="col-12 text-end">
                                            <p
                                                style={{
                                                    fontSize: "1.5rem",
                                                    fontWeight: "700",
                                                    color: "#406a9b",
                                                }}
                                            >
                                                FACTURE {info.fact}
                                            </p>
                                            <div className="date">
                                                <small>
                                                    {"Date de la facture: " +
                                                        info.date}
                                                </small>
                                            </div>
                                            <div className="date">
                                                <small>
                                                    {"Date d'impression: " +
                                                        info.date}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <table
                                        className="table"
                                        cellSpacing="0"
                                        cellPadding="0"
                                    >
                                        <thead>
                                            <tr className="text-center1">
                                                <th>#</th>
                                                <th className="text-left">
                                                    PRODUIT(S)
                                                </th>
                                                <th className="text-right">
                                                    QUANITE
                                                </th>
                                                <th className="text-right">
                                                    MONTANT(XOF)
                                                </th>
                                                <th className="text-right">
                                                    TOTAL(XOF)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.content.map((item, idx) => {
                                                return (
                                                    <tr
                                                        key={idx}
                                                        className="text-center1"
                                                    >
                                                        <td className="no">
                                                            {idx + 1}
                                                        </td>

                                                        <td className="text-left">
                                                            <p
                                                                style={{
                                                                    fontSize:
                                                                        "1.2rem",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                {item.produit}
                                                            </p>
                                                        </td>
                                                        <td className="unit">
                                                            {Intl.NumberFormat().format(
                                                                item.quantite
                                                            )}
                                                        </td>
                                                        <td className="qty">
                                                            {Intl.NumberFormat().format(
                                                                item.prix
                                                            ) + " FCFA"}
                                                        </td>
                                                        <td className="total">
                                                            {Intl.NumberFormat().format(
                                                                item.prix *
                                                                    item.quantite
                                                            ) + " FCFA"}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="2"></td>
                                                <td colSpan="2">SOUS TOTAL</td>
                                                <td>
                                                    {Intl.NumberFormat().format(
                                                        total
                                                    ) + " FCFA"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2"></td>
                                                <td colSpan="2">TVA 18%</td>
                                                <td>
                                                    {Intl.NumberFormat().format(
                                                        total * 0.18
                                                    ) + " FCFA"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2"></td>
                                                <td colSpan="2">TOTAL</td>
                                                <td>
                                                    {Intl.NumberFormat().format(
                                                        total * 1.18
                                                    ) + " FCFA"}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <footer className="text-center">
                                    <strong style={{ fontSize: "12px" }}>
                                        NOTICE
                                    </strong>
                                    :
                                    <small>
                                        Le montant de la facture n'inclue pas le
                                        transport qui est calculé selon la zone
                                        de livraison.
                                    </small>
                                </footer>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div className="toolbar hidden-print">
                        <div className="text-center my-2">
                            <button
                                type="button"
                                className="btn btn-lg btn-afdefis-secondary ms-1 my-1"
                                onClick={() => {
                                    calltouchpay(total * 1.18);
                                }}
                            >
                                <i className="fa fa-money"></i> Payer par mobile
                                money
                            </button>
                            <a
                                href="#"
                                className="btn btn-lg btn-afdefis-secondary ms-1 my-1"
                            >
                                Valider et payer ultérieurement
                            </a>
                            <a
                                id="printInvoice"
                                className="btn btn-afdefis ms-1 my-1"
                            >
                                <i className="fa fa-print"></i> Imprimer
                            </a>
                            <a href="#" className="btn btn-afdefis ms-1 my-1">
                                <i className="fa fa-file-pdf-o"></i> Export PDF
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;
