import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../checkout-item/checkout-item.component";
import './checkout.styles.scss'

const Checkout = () => {

    const { cartItems, totalPrice } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <span className='header-block'>Description</span>
                <span className='header-block'>Quantity</span>
                <span className='header-block'>Price</span>
                <span className='header-block'>Remove</span>
            </div>
            {cartItems.map((cartItem) =>
                <CheckoutItem key={cartItem.id} checkoutItem={cartItem} />
            )}
            <h1 className='total'>Total: {totalPrice}</h1>
        </div>
    )
}

export default Checkout;