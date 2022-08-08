import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import logo from "../../assets/img/logo/logo.jpeg";
import { AppContext } from "../../context/context";
import apiClient from "../../services/api";
import url from "../../url";

const Checkout = () => {
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    const cartCtx = useContext(AppContext);
    const { cart, onCartChange } = cartCtx;
    const [info, setInfo] = useState([]);
    const [total, setTotal] = useState(0);
    const [action, setAction] = useState({
        typeCommande:'',
        pay:false
    });
    let { commandSlug } = useParams();
    const payNow = "ne pas enregistrer";
    const payAfter = "enregistrer";
    const path = window.location.pathname;
    

    useEffect(() => {
        if (user.token != null) {
            let url = commandSlug ? `commande/${commandSlug}` : "userCommande";
            console.log(url);

            apiClient
                .get(url, {
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                .then((res) => {
                    console.log(res);
                    if (user.type != res.data.user.type) {
                        user.type = res.data.user.type;
                        setType(user.type);
                        onUserChange(user);
                        //console.log("user type change : " + res.data.type);
                    } else {
                        //console.log("user type not change : " + res.data.type);
                    }
                    setInfo(res.data.user);
                    console.log(res.data.response);
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

    const handleSubmit = (type = "", pay) => {
        //e.preventDefault();

        const data = new FormData();
        data.append("etat_commande", type);
        data.append("commandSlug", commandSlug);
        data.append("produit", JSON.stringify(cart.content));
        //console.log(data.get("produit"))
        apiClient
            .post("paiement", data, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => {
                //console.log(res.data)
                if (res.data.status === 200) {
                    //notify("success", res.data.response);
                    //setRefresh(refresh + 1);
                    commandSlug = res.data.commandSlug;
                    if (pay) {
                        calltouchpay(res.data.response);
                    }
                } else {
                    //notify("error", res.data.response);
                    //setRefresh(refresh + 1);
                }
            })
            .catch((error) => {
                //notify("error", error.response.data.message);
                //setRefresh(refresh + 1);
            });
    };

    const calltouchpay = (montant) => {
        sendPaymentInfos(
            new Date().getTime(),
            "BFSYM1874",
            "BXO4O$xdC6MR^GuTPEQF88M?WkW@%t0s1KL$AbGxcrVZYWNh7q",
            "symbol.bf",
            `http://market.africadefis.com/paiement/success/${commandSlug}`,
            "http://market.africadefis.com/paiement/echec",
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
    const detectDevice = () =>{
        if(isMobile){
            alert("Mobile")
        }else{
            alert("Desktop")

        }
    }
    const handleOnClickShare = () => {
        if (navigator.share) {
          navigator
            .share({
                url: `https://market.africadefis.com/paiement/app/${commandSlug}`,
                text: "Ouvrez le lien dans un navigateur pour continuer le payment",
                title: "Paiement AfricaDefis",
            })
            .then(() => {
              console.log('Successfully shared');
            })
            .catch(error => {
              console.error('Something went wrong sharing the blog', error);
            });
        }
      };

      window.mobileCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };
    
    return (
        <>
            {user.isAuth ? (
                <>
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
                                            data-bs-toggle="modal"
                                            data-bs-target="#myModal"
                                            onClick={() => {
                                                setAction({
                                                    typeCommande:payNow,
                                                    pay:true
                                                })
                                            }}
                                        >
                                            <i className="fa fa-money"></i>{" "}
                                            Payer par mobile money
                                        </button>
                                        <Link
                                            to="#"
                                            className="btn btn-lg btn-afdefis-secondary ms-1 my-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#myModal"
                                            onClick={() => {
                                                setAction({
                                                    typeCommande:payAfter,
                                                    pay:false
                                                })
                                            }}
                                        >
                                            Valider et payer ultérieurement
                                        </Link>
                                        <button
                                            id="printInvoice"
                                            className="btn btn-afdefis ms-1 my-1"
                                            onClick={()=>{
                                                if(! window.mobileCheck){
                                                    alert("mobile browser")
                                                }else{
                                                    alert("desktop browser")
                                                }
                                            }}
                                        >
                                            <i className="fa fa-print"></i>{" "}
                                            Imprimer
                                        </button>
                                        <Link
                                            to="#"
                                            className="btn btn-afdefis ms-1 my-1"
                                            onClick={()=>{detectDevice()}}
                                        >
                                            <i className="fa fa-file-pdf-o"></i>{" "}
                                            Export PDF
                                        </Link>
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
                                                                    fontSize:
                                                                        "1.5rem",
                                                                    fontWeight:
                                                                        "700",
                                                                    color: "#406a9b",
                                                                    textDecoration:
                                                                        "none",
                                                                }}
                                                            >
                                                                AFRICADEFIS
                                                                MARKET
                                                            </Link>
                                                        </p>
                                                        <div className="p-0">
                                                            <small>
                                                                01 BP Ouaga,
                                                                BURKINA-FASO
                                                            </small>
                                                            <br />
                                                            <small>
                                                                (+226) 70 48 83
                                                                05
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
                                                                fontSize:
                                                                    "1.2rem",
                                                                fontWeight:
                                                                    "700",
                                                            }}
                                                        >
                                                            {info.nom}
                                                        </p>
                                                        <div>
                                                            <small>
                                                                +226{" "}
                                                                {info.numero}
                                                            </small>
                                                            <br />
                                                            <small>
                                                                {info.email}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 text-end">
                                                        <p
                                                            style={{
                                                                fontSize:
                                                                    "1.5rem",
                                                                fontWeight:
                                                                    "700",
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
                                                        {cart.content.map(
                                                            (item, idx) => {
                                                                return (
                                                                    <tr
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="text-center1"
                                                                    >
                                                                        <td className="no">
                                                                            {idx +
                                                                                1}
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
                                                                                {
                                                                                    item.produit
                                                                                }
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
                                                                            ) +
                                                                                " FCFA"}
                                                                        </td>
                                                                        <td className="total">
                                                                            {Intl.NumberFormat().format(
                                                                                item.prix *
                                                                                    item.quantite
                                                                            ) +
                                                                                " FCFA"}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td colSpan="2"></td>
                                                            <td colSpan="2">
                                                                SOUS TOTAL
                                                            </td>
                                                            <td>
                                                                {Intl.NumberFormat().format(
                                                                    total
                                                                ) + " FCFA"}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2"></td>
                                                            <td colSpan="2">
                                                                TVA 18%
                                                            </td>
                                                            <td>
                                                                {Intl.NumberFormat().format(
                                                                    total * 0.18
                                                                ) + " FCFA"}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2"></td>
                                                            <td colSpan="2">
                                                                TOTAL
                                                            </td>
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
                                                <strong
                                                    style={{ fontSize: "12px" }}
                                                >
                                                    NOTICE
                                                </strong>
                                                :
                                                <small>
                                                    Le montant de la facture
                                                    n'inclue pas le transport
                                                    qui est calculé selon la
                                                    zone de livraison.
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
                                            data-bs-toggle="modal"
                                            data-bs-target="#myModal"
                                            onClick={() => {
                                                setAction({
                                                    typeCommande:payNow,
                                                    pay:true
                                                })
                                            }}
                                        >
                                            <i className="fa fa-money"></i>{" "}
                                            Payer par mobile money
                                        </button>
                                        <Link
                                            to="#"
                                            className="btn btn-lg btn-afdefis-secondary ms-1 my-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#myModal"
                                            onClick={() => {
                                                setAction({
                                                    typeCommande:payAfter,
                                                    pay:false
                                                })
                                            }}
                                        >
                                            Valider et payer ultérieurement
                                        </Link>
                                        <a
                                            id="printInvoice"
                                            className="btn btn-afdefis ms-1 my-1"
                                        >
                                            <i className="fa fa-print"></i>{" "}
                                            Imprimer
                                        </a>
                                        <a
                                            href="#"
                                            className="btn btn-afdefis ms-1 my-1"
                                        >
                                            <i className="fa fa-file-pdf-o"></i>{" "}
                                            Export PDF
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <div class="modal" id="myModal">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">{
                                        (action.pay) ? "Paiement maintenant" : "Paiement prochainement"
                                    }</h4>
                                    <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                    ></button>
                                </div>

                                <div class="modal-body">
                                    {
                                        (action.pay) ? "Vous êtes sur le point de faire un paiement" : "Vous êtes sur le point de valider un paiement ultérieur"
                                    }
                                </div>

                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-afdefis-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={()=>{
                                            handleSubmit(action.typeCommande, action.pay)
                                        }}
                                    >
                                        Continuer
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-afdefis"
                                        data-bs-dismiss="modal"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {path.includes(app) ? (
                        <Navigate to={url.app_login} />
                    ) : (
                        <Navigate to={url.login} />
                    )}
                </>
            )}
        </>
    );
};

export default Checkout;
