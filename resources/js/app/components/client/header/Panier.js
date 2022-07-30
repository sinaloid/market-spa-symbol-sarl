import React, { useContext } from "react";
import { AppContext } from "../../../context/context";

const Panier = ({classe, size, color="#0d6efd"}) => {
    const cartCtx = useContext(AppContext);
    const { cart, onCartChange } = cartCtx;
    return (
        <span
            className={`${classe}`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
        >
            <i className={`fa-solid fa-cart-shopping ${size}`} style={{ color: color }}></i>

            <span
                className="cart position-relative d-inline-flex"
                aria-label="View your shopping cart"
            >
                <span className="cart-basket d-flex align-items-center justify-content-center">
                    {cart.compteur}
                </span>
            </span>
        </span>
    );
};

export default Panier;
