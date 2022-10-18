import { createContext, useContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id == productToAdd.id
    )

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id == productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    itemsCount: 0,
    setItemsCount: () => { }
});

export const CartProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [itemsCount, setItemsCount] = useState(0);

    const addItemToCart = (productToAdd) => {
        setItemsCount(itemsCount + 1)
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = { isOpen, setIsOpen, addItemToCart, cartItems, itemsCount }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}