//Function này dùng để gửi một get request về server để lấy toán bộ Category từ MongoDB
import { useState, useEffect } from 'react'
import axios from 'axios'

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    //Hàm getCategory
    const getCategory = async () => {
        const res = await axios.get("/api/category")
        setCategories(res.data)
    }

    useEffect(() => {
        getCategory()

    }, [callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI
