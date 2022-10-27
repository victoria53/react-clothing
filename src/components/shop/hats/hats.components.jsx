import './hats.styles.scss'

import { useContext, Fragment, useEffect } from 'react';
import { CategoriesContext } from '../../../contexts/categories.context';
import ProductCart from "../../product-cart/product-cart.component";

const Hats = () => {
    const { categoriesMap, getSubcategory, subcategoryMap } = useContext(CategoriesContext);

    useEffect(() => {
        getSubcategory('hats');
        console.log(subcategoryMap);
    }, []);

    return (
        <>
            <div className='products-container'>
                {subcategoryMap.map((product) => (
                    <ProductCart
                        key={product.id}
                        product={product} />
                ))}
            </div>
        </>
    )
}

export default Hats;