import React, { createContext, useState, useEffect } from 'react'
import ProductsAPI from './api/ProductsAPI'
import axios from 'axios'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {

    //Khởi tạo state tên là token và hàm setState là setToken
    const [accessToken, setaccessToken] = useState(false)

    //Hàm rfreshToken này sẽ gửi get request về server
    //Hàm này sẽ lấy refreshToken từ cookie của client 
    //Và trả về accesstoken mới cho client
    // const refreshToken = async () => {
    //     const res = await axios.get("/user/refresh_token")

    //     setaccessToken(res.data.accesstoken)
    // }

    useEffect(() => {
        // //Kiểm tra xem user đã đăng nhập hay chưa
        // //Vì sau mỗi lần đăng ký hay đăng nhập chúng ta đều lưu 1 giá trị
        // //có tên là firstLogin vào localStorage
        // const logged = localStorage.getItem("logged")

        // //Nếu như firstLogin tồn tại, tức là user đã đăng nhập hoặc đã đăng ký
        // //Tức đã có refreshtoken trong cookie của client
        // //Thì cho chạy hàm refreshtoken
        // if (logged) {
        //     refreshToken()
        // }
        const logged = localStorage.getItem('logged')
        if (logged) {
            const refreshToken = async () => {
                const res = await axios.get("/user/refresh_token")

                setaccessToken(res.data.accesstoken)
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }

            refreshToken()
        }
    }, [])

    //Tạo ra một tập oject có tên là state 
    //Để lưu và quản lý các GlobalState hay các state quan trọng
    const state = {
        token: [accessToken, setaccessToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(accessToken),
        categoriesAPI: CategoriesAPI()
    }

    //Hàm DataProvider sẽ trả về một Provider của tập context GlobalState 
    //Hàm này sẽ mang theo tập value là state
    //Và truyền các value vào các component children
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}