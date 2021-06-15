import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../../GlobalState'
import { useParams, useHistory } from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'This is the new product This is the new product This is the new product This is the new product',
    content: 'This is the new product This is the new product This is the new product This is the new product This is the new product This is the new product',
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [accesstoken] = state.token
    const [products] = state.productsAPI.products
    const [onEdit, setonEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    const params = useParams()
    const history = useHistory()

    useEffect(() => {
        if (params.id) {
            setonEdit(true)
            products.forEach(item => {
                if (params.id === item._id) {
                    setProduct(item)
                    setImages(item.images)
                }
            })
        } else {
            setonEdit(false)
            setProduct(initialState)
            setImages(false)
        }

    }, [params.id, products])

    const handleUpload = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) {
                return alert("Administrator resource.")
            }

            const file = e.target.files[0]

            if (!file) return alert("Image not exists")

            if (file.size > 2048 * 2048) return alert("Image have to smaller than 2Mb")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') return alert("Image is not valid")

            let formData = new FormData()
            formData.append('file', file)


            const res = await axios.post('/api/uploadImage', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: accesstoken }
            })

            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDeleteImages = async () => {
        try {
            if (!isAdmin) return alert("Administrator resource.")
            await axios.post('/api/deleteImage', { public_id: images.public_id }, {
                headers: { Authorization: accesstoken }
            })

            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleOnchange = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("Administrator resource.")
            if (!images) return alert("Please upload product's image.")

            if (onEdit) {
                await axios.put(`/api/product/${product._id}`, { ...product, images }, {
                    headers: { Authorization: accesstoken }
                })
                history.push("/")
            } else {
                await axios.post("/api/product", { ...product, images }, {
                    headers: { Authorization: accesstoken }
                })
                window.location.reload()
            }

            setImages(false)
            setProduct(initialState)
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                <div id="file_img" style={styleUpload}>
                    <img src={images ? images.url : ''} alt="" />
                    <span onClick={handleDeleteImages}>X</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleOnchange} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required value={product.title} onChange={handleOnchange} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required value={product.price} onChange={handleOnchange} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required value={product.description} rows="7" onChange={handleOnchange} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required value={product.content} rows="7" onChange={handleOnchange} />
                </div>

                <div className="row">
                    <label htmlFor="category">Category </label>
                    <select name="category" value={product.category} onChange={handleOnchange}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button className="button-update" type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct
