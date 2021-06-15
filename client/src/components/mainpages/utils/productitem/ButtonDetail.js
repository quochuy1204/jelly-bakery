import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

function ButtonDetail({ product, deleteProduct }) {
    const state = useContext(GlobalState)

    const [isAdmin] = state.userAPI.isAdmin

    const addCart = state.userAPI.addCart

    return (
        <div className="row_button" >
            {
                isAdmin ?
                    <>
                        <Link id="button_buy" to="#!" onClick={deleteProduct} >
                            Delete
                        </Link>
                        <Link id="button_detail" to={`/edit_product/${product._id}`} >
                            Edit
                        </Link>
                    </>
                    :
                    <>
                        <Link id="button_buy" to="#!" onClick={() => addCart(product)}>
                            Add to cart
                        </Link>
                        <Link id="button_detail" to={`/detail/${product._id}`} >
                            Detail
                        </Link>
                    </>
            }

        </div>
    )
}

export default ButtonDetail