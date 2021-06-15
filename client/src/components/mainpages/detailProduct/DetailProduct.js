import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productitem/ProductItem'

function DetailProduct() {

    //get params from the address bar by using the useParams functional
    const params = useParams()

    //get the globalstate from GlobalState context
    const state = useContext(GlobalState)

    //Lấy hàm addcart từ state.userAPI.addcart
    const addCart = state.userAPI.addCart

    //get all products from state
    const [products] = state.productsAPI.products

    const [detailProduct, setdetailProduct] = useState([])

    useEffect(() => {

        //check if the params exist or not
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setdetailProduct(product)
            })
        }
    }, [params.id, products])


    if (detailProduct.length === 0) return null;

    return (
        <>
            <div className="detail-container">
                <div className="detail">
                    <img className="detail-image" src={detailProduct.images.url} alt="Product" />
                    <div className="detail-box">

                        <div className="row">
                            <h2 className="detail-product-title">{detailProduct.title}</h2>
                        </div>

                        <h3 className="detail-price">${detailProduct.price}</h3>

                        <p className="detail-sold">{detailProduct.sold} Sold</p>

                        <h5 className="description-title">Description</h5>
                        <p className="detail-description">{detailProduct.description}</p>
                        <p className="detail-content">{detailProduct.content}</p>

                        <Link to="#" onClick={() => addCart(detailProduct)} className="buynow-button">Buy Now</Link>
                    </div>
                </div>
            </div>
            <div className="similar-container">
                <div>
                    <h2 className="similar-title">SIMILAR PRODUCTS</h2>
                    <div className="products">
                        {
                            products.map(product => {
                                return product.category === detailProduct.category ?
                                    <ProductItem key={product._id} product={product} /> : null
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailProduct
