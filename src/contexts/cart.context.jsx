import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    TOGGLE_OPEN: 'TOGGLE_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.TOGGLE_OPEN:
            return {
                ...state,
                isOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }

}

const INITIAL_STATE = {
    isOpen: false,
    cartItems: [],
    itemsCount: 0,
    totalPrice: 0
}

export const CartProvider = ({ children }) => {
    const [{ isOpen, cartItems, itemsCount, totalPrice }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    console.log(cartItems);

    const setIsOpen = (isOpen) => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_OPEN, isOpen)
        )
    }

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        const newTotalPrice = newCartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newTotalPrice,
                itemsCount: newCartCount
            })
        )
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear)
        updateCartItemsReducer(newCartItems)
    }

    const value = { isOpen, setIsOpen, addItemToCart, cartItems, itemsCount, removeItemFromCart, totalPrice, clearItemFromCart }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}