//Functional này dùng để lấy dữ liệu về category được lưu trong state ở DataProvider
//Từ đó hiện thị về cho client
//Trong functional này chúng ta cũng sẽ tiến hành Edit và Delete Category

import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'


function Categories() {
    const state = useContext(GlobalState)
    const [accesstoken] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [edit, setEdit] = useState(false)
    const [id, setID] = useState('')

    //Functional tạo thêm Category
    const createCategory = async (e) => {
        e.preventDefault()
        try {
            if (edit) {
                const res = await axios.put(`/api/category/${id}`, { name: category }, {
                    headers: { Authorization: accesstoken }
                })
                alert(res.data.msg)
            } else {
                const res = await axios.post("/api/category", { name: category }, {
                    headers: { Authorization: accesstoken }
                })
                alert(res.data.msg)
            }
            setEdit(false)
            setCategory('')
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    //Function dùng để khi click vào button sửa thì sẽ lấy thông tin của category đó hiện thị lên input
    const editCategory = async (id, name) => {
        setID(id)
        setCategory(name)
        setEdit(true)
    }

    //Function dùng để xóa Category
    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: { Authorization: accesstoken }
            })
            setCallback(!callback)
            alert(res.data.msg)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required onChange={e => setCategory(e.target.value)} />
                <button type="submit"> {edit ? "Update" : "Save"}</button>
            </form>
            <div className="col">
                {
                    categories.map(item => (
                        <div className="row" key={item._id}>
                            <p>{item.name}</p>
                            <div>
                                <button onClick={() => editCategory(item._id, item.name)}>Edit</button>
                                <button onClick={() => deleteCategory(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
