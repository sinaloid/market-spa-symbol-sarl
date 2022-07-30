import { createContext } from "react";


export const initialCart = {
    cart: []
}

export const CartContext = createContext({
    user: initialCart,
    onCartChange: (data) => {},
})