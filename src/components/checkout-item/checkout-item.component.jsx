import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout-item.styles.scss'

const CheckoutItem = ({ checkoutItem }) => {

    const { name, quantity, price, imageUrl } = checkoutItem
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <div className='quantity'>
                <button onClick={() => removeItemFromCart(checkoutItem)}>&#10094;</button>
                <span>{quantity}</span>
                <button onClick={() => addItemToCart(checkoutItem)}>&#10095;</button>
            </div>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => clearItemFromCart(checkoutItem)}>&#10005;</div>

        </div>
    )
}

export default CheckoutItem;