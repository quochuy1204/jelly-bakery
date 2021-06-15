import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productitem/ProductItem'
import Filter from './Filter'
import LoadMore from './LoadMore'
function Products() {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [products] = state.productsAPI.products
    const [accesstoken] = state.token

    return (
        <>
            <Filter />
            <div className="products">
                {products.map(product => {
                    return <ProductItem key={product._id} product={product} isAdmin={isAdmin} accesstoken={accesstoken} />
                })}
            </div>
            <LoadMore />
        </>
    )
}

export default Products

