import { useState, useEffect } from 'react'
import axios from 'axios'

//Hàm UserAPI được dùng để lấy thông tin của tài khoản đăng nhập vào hệ thống
//Sau đó lấy thông tin role của tài khoản và lưu lại trong state của hệ thống
//Thuận lợi cho việc quản lý state 
function UserAPI(accesstoken) {
    //initialize the isLogged and isAdmin state and set the value = false
    const [isLogged, setisLogged] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [ordered, setOrdered] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        //Kiểm tra xem accesstoken state có tồn tại hay không
        if (accesstoken) {
            //Nếu accesstoken tồn tại thì khởi tạo hàm getUserInfor
            const getUserInfor = async () => {
                try {
                    //Dùng axios gủi get request về server và cho vào 
                    //headers: Authorization một giá trị = accesstoken
                    const res = await axios.get("/user/infor", {
                        headers: { Authorization: accesstoken }
                    })

                    //Nếu accesstoken tồn tại tức là người dùng đã đăng nhập
                    //Nên set state isLogged == true
                    setisLogged(true)

                    //Mỗi lần reload lại page hoặc có một tài khoản đăng nhập mới thì
                    //lấy cart của tài khoản đó set cho state cart
                    setCart(res.data.cart)

                    //Lấy ra giá trị role trong tập response.data trả về từ server
                    //Giá trị này là role của tài khoản đã đăng nhập
                    const role = res.data.role

                    //Nếu role của tài khoản đó === 1 tức là admin
                    //Nên ta set state isAdmin == true
                    if (role === 1) {
                        setisAdmin(true)
                    }
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUserInfor()
        }
    }, [accesstoken])

    //Function getOrderHistory dùng để get all payment của tài khoản
    useEffect(() => {
        if (accesstoken) {
            const getOrderHistory = async () => {
                const response = await axios.get('/user/history', {
                    headers: { Authorization: accesstoken }
                })

                setHistory(response.data)
            }
            getOrderHistory()
        }
    }, [accesstoken])

    //Function getOrdered dùng để get all payment về cho admin
    useEffect(() => {
        if (isAdmin) {
            const getOrdered = async () => {
                const res = await axios.get("/api/payment", {
                    headers: { Authorization: accesstoken }
                })
                setOrdered(res.data)
            }
            getOrdered()
        }
    }, [isAdmin, accesstoken])

    //Hàm addCart sẽ thêm sản phẩm vào cart State và tiến hành lưu cart của người dùng vào MongoDB
    const addCart = async (product) => {
        if (!isLogged) return window.location.href = "/login"

        const check = cart.every(item => {
            //check xem trong số các item đã thêm vào giỏ hàng
            //có item nào trùng với sản phẩm muốn thêm vào không
            if (item._id === product._id) {
                return false
            } else {
                return true
            }
        })

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])
            //Nếu sản phẩm chưa có trong danh sách giỏ hàng
            //thì gửi patch request về server để save cart vào MongoDB
            await axios.patch('/user/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: accesstoken }
            })
        } else {
            alert("This products already in your cart.")
        }
    }

    return {
        isLogged: [isLogged, setisLogged],
        isAdmin: [isAdmin, setisAdmin],
        cart: [cart, setCart],
        orderhistory: [history, setHistory],
        ordered: [ordered, setOrdered],
        callback: [callback, setCallback],
        addCart: addCart
    }
}

export default UserAPI
