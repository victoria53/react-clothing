import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../checkout-item/checkout-item.component";
import Button from '../button/button.component';
import { FacebookMessengerShareButton } from "react-share";
import { FacebookMessengerIcon } from 'react-share';
import './checkout.styles.scss'

import { IgApiClient } from 'instagram-private-api';
import { sample } from 'lodash';

const mobileInstagramShare = () => {
    window.open('instagram://sharesheet?text=https://yourdaye.com/');
}

const mobileMessengerShare = () => {
    window.open('instagram://sharesheet?text=https://google.com/')
    window.open('fb-messenger://share?link=' + encodeURIComponent("https://www.google.com") + '&app_id=' + encodeURIComponent("638726327698555"));
}

const webMessengerShare = () => {
    window.open(
        "https://www.facebook.com/dialog/send?link=" +
        encodeURIComponent("https://www.yourdaye.com") +
        "&app_id=" +
        encodeURIComponent("638726327698555")
    );
}

const Checkout = () => {

    const { cartItems, totalPrice } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <FacebookMessengerShareButton
                url="https://yourdaye.com"
                redirectUri="https://yourdaye.com"
                appId="638726327698555"
            >
                            <FacebookMessengerIcon size={34} round />

            </FacebookMessengerShareButton>

            <Button onClick={mobileInstagramShare}>
                Instagram App Share
            </Button>

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