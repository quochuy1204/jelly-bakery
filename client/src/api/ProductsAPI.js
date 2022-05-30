import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductsAPI() {

    //Initialize the useState function with products state name
    //and setProducts function
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)

    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    //assign getProducts functional to get product api from backend
    //by using the axios.get method
    // const getProducts = async () => {
    //     //assign the api to res 
    //     const res = await axios.get(`/api/product?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`)

    //     //set the setProducts function to set the products list
    //     //equal to res.data.products (This will return the products array)
    //     setProducts(res.data.products)

    //     setResult(res.data.result)
    // }

    //using useEffect functional to call the getProducts function
    //when the component rendered
    useEffect(() => {
        const getProducts = async () => {
            //assign the api to res 
            const res = await axios.get(`/api/product?limit=${page * 15}&${category}&${sort}&title[regex]=${search}`)

            //set the setProducts function to set the products list
            //equal to res.data.products (This will return the products array)
            setProducts(res.data.products)

            setResult(res.data.result)

        }
        getProducts()
    }, [callback, category, sort, page, search])

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        page: [page, setPage],
        search: [search, setSearch],
        result: [result, setResult]
    }
}

export default ProductsAPI

