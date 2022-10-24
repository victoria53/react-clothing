import { createContext, useContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    )

    if (existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        )
    } else if (existingCartItem.quantity == 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }

}

const clearCartItem = (cartItems, productToClear) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToClear.id
    )

    if (existingCartItem) {
        return cartItems.filter(cartItem => cartItem.id !== productToClear.id)
    } 

}

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    itemsCount: 0,
    setItemsCount: () => { },
    totalPrice: 0,
    setTotalPrice: () => { },
    clearItemFromCart: () => { }
});

export const CartProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [itemsCount, setItemsCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setItemsCount(newCartCount)
        const newTotalPrice = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
        setTotalPrice(newTotalPrice)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear))
    }

    const value = { isOpen, setIsOpen, addItemToCart, cartItems, itemsCount, removeItemFromCart, totalPrice, clearItemFromCart }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}