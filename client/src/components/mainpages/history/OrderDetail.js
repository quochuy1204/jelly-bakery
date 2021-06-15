import React, { useState, useContext, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { useParams } from 'react-router-dom'

function OrderDetail() {
    const state = useContext(GlobalState)
    const [orderhistory] = state.userAPI.orderhistory
    const [orderdetail, setOrderDetail] = useState([])
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            orderhistory.forEach(item => {
                if (item._id === params.id) {
                    setOrderDetail(item)
                }
            })
        }
    }, [params.id, orderhistory])

    if (orderdetail.length === 0) return null;
    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Customer's Name</th>
                        <th>Address</th>
                        <th>ZIP Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderdetail.address.recipient_name}</td>
                        <td>{orderdetail.address.line1 + " " + orderdetail.address.city + " " + orderdetail.address.state}</td>
                        <td>{orderdetail.address.postal_code}</td>
                        <td>{orderdetail.address.country_code}</td>
                    </tr>
                </tbody>
            </table>
            <table style={{ margin: "30px 0" }}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product's Name</th>
                        <th>Quantity</th>
                        <th>Price ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderdetail.cart.map(item => (
                            <tr key={item._id}>
                                <td> <img src={item.images.url} alt="" /> </td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price * item.quantity}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetail
