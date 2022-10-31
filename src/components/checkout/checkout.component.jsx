import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../checkout-item/checkout-item.component";
import Button from '../button/button.component';
import './checkout.styles.scss'

const mobileMessengerShare = () => {
    window.open('fb-messenger://share?link=' + encodeURIComponent("https://www.google.com") + '&app_id=' + encodeURIComponent("521270401588372"));
}

const webMessengerShare = () => {
        window.open(
      "https://www.facebook.com/dialog/send?link=" +
      encodeURIComponent("https://www.yourdaye.com") +
      "&app_id=" +
      encodeURIComponent("521270401588372")
    );

    // window.open("https://www.facebook.com/dialog/send?app_id=521270401588372&link=http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html")
    // window.open("https://www.facebook.com/dialog/send?link=https://yourdaye.com&redirect_uri=https://yourdaye.com&app_id=521270401588372")

}

const Checkout = () => {

    const { cartItems, totalPrice } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <Button onClick={mobileMessengerShare}>
                Click for mobile messenger share
            </Button>
            <Button onClick={webMessengerShare}>
                Click for WEB messenger share
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