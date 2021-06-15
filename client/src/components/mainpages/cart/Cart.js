import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [total, setTotal] = useState(0)
    const [accesstoken] = state.token

    //Hàm updateCart để update lại giỏ hàng của khách hàng trong MongoDB sau mỗi thay đổi
    const updateCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: accesstoken }
        })
    }

    //Hàm computeTotal để tính tổng giá tiền mỗi khi có sự thay đổi của cart
    // const computeTotal = () => {
    //     const total = cart.reduce((prev, item) => {
    //         return prev + (item.price * item.quantity)
    //     }, 0)
    //     setTotal(total)
    // }

    //Hàm buttonplus dùng để tăng số lượng sản phẩm mỗi khi khách hàng nhấn vào button +
    const buttonplus = (id) => {
        cart.forEach(product => {
            if (product._id === id) {
                product.quantity += 1
            }
        })
        setCart([...cart])
        updateCart(cart)
    }

    //Hàm buttonminus dùng để giảm số lượng sản phẩm mỗi khi khách hàng nhấn vào button -
    const buttonminus = (id) => {
        cart.forEach(product => {
            if (product._id === id) {
                if (product.quantity === 1) {
                    return
                } else {
                    product.quantity -= 1
                }
            }
        })
        setCart([...cart])
        updateCart(cart)
    }

    //Hàm buttonremove dùng để xóa sản phẩm khỏi giỏ hàng mỗi khi khách hàng
    //nhấn vào button XÓA
    const buttonremove = (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa bỏ sản phẩm này?")) {
            cart.forEach((product, index) => {
                if (product._id === id) {
                    cart.splice(index, 1)
                }
            })
        }
        setCart([...cart])
        updateCart(cart)
    }

    //Hàm báo thành công khi thanh toán bằng paypal hoàn tất
    const tranSuccess = async (payment) => {

        const { paymentID, address } = payment

        const res = await axios.post('/api/payment', { total, cart, paymentID, address }, {
            headers: { Authorization: accesstoken }
        })
        setCart([])
        updateCart([])
        window.location.reload()
        alert(res.data.msg)
    }

    useEffect(() => {
        const computeTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(total)
        }
        computeTotal()
    }, [cart])

    if (cart.length === 0) {
        return <h2 className="empty-cart" style={{ textAlign: 'center', fontSize: '2rem' }}>Your shopping cart is empty</h2>
    }
    return (
        <div className="cart-container">
            {
                cart.map(product => {
                    return (
                        <div className="detail cart" key={product._id}>
                            <img src={product.images.url} alt="Product" className="img_container" />
                            <div className="detail-box">

                                <h4>{product.title}</h4>

                                <h2 className="product-price">${product.price * product.quantity}</h2>

                                <div className="amount">
                                    <h6>Quantity</h6>
                                    <button onClick={() => buttonminus(product._id)}> - </button>
                                    <span> {product.quantity} </span>
                                    <button onClick={() => buttonplus(product._id)} > + </button>
                                    <div className="delete" onClick={() => buttonremove(product._id)} >Delete</div>
                                </div>


                                {/* <h5 className="product-description">Description</h5>
                                <p>{product.description}</p> */}

                            </div>
                        </div>
                    )
                })
            }
            <div className="total">
                <h3>Total ({cart.length} products): ${total} </h3>
                <PaypalButton total={total} tranSuccess={tranSuccess} />
            </div>
        </div>
    )
}

export default Cart
