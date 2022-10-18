import { useContext } from "react";

// import SHOP_DATA from '../../shop-data.json'
import { ProductsContext } from "../../contexts/products.context";
import ProductCart from "../product-cart/product-cart.component";
import './shop.styles.scss'

const Shop = () => {
    const { products } = useContext(ProductsContext)
    return (
        <div className='products-container'>
            {products.map((product) => (
                <ProductCart 
                key={product.id}
                product={product} />
            ))}
        </div>
    )
}

export default Shop;