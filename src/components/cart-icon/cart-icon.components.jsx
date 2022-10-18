import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss'

const CartIcon = () => {
    const { isOpen, setIsOpen, itemsCount } = useContext(CartContext)

    const toggleIsOpen = () => setIsOpen(!isOpen)
    console.log(itemsCount);

    return (
        <div className='cart-icon-container' onClick={toggleIsOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{itemsCount}</span>
        </div>
    )
}

export default CartIcon;