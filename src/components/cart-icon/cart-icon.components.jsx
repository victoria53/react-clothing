import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { IconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
    const { isOpen, setIsOpen, itemsCount } = useContext(CartContext)

    const toggleIsOpen = () => setIsOpen(!isOpen)

    return (
        <IconContainer onClick={toggleIsOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{itemsCount}</ItemCount>
        </IconContainer>
    )
}

export default CartIcon;