import React, { useContext } from 'react'
import ButtonDetail from './ButtonDetail'
import axios from 'axios'
import { GlobalState } from '../../../../GlobalState'


function ProductItem({ product, isAdmin, accesstoken }) {
    const state = useContext(GlobalState)
    const [callback, setCallback] = state.productsAPI.callback

    const deleteProduct = async () => {
        try {
            const deleteImages = axios.post('/api/deleteImage', { public_id: product.images.public_id }, {
                headers: { Authorization: accesstoken }
            })

            const deleteItem = axios.delete(`/api/product/${product._id}`, {
                headers: { Authorization: accesstoken }
            })

            await deleteImages
            await deleteItem
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        
        <div className="product_card">
            <div className="product_image">
                <img src={product.images.url} alt="product images" />
            </div>

            <div className="product_title">
                <h5 title={product.title}>{product.title}</h5>
            </div>

            <div className="product_detail">
                <div className="product_price">
                    <span className="price_symbol">$</span>
                    <span className="span_price">{product.price}</span>
                </div>
                <ButtonDetail product={product} deleteProduct={deleteProduct} />
                {/* {
                    // isAdmin && <p>Ẩn sản phẩm: <input type="checkbox" checked={product.checked} /></p>

                    isAdmin && <p>Ẩn sản phẩm: <input type="checkbox" /></p>
                } */}
            </div>
        </div>
    )
}

export default ProductItem
