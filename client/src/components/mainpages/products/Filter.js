import React, { useContext, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'

function Filter() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category

    const [sort, setSort] = state.productsAPI.sort

    const handleCategory = e => {
        setCategory(e.target.value)
    }

    useEffect(() => {
        console.log(sort)
    }, [sort])


    return (
        <div className="filter_menu">
            <div className="category-container" >
                <div className="row">
                    <select name="category" value={category} onChange={handleCategory}>
                        <option value="">Category</option>
                        {
                            categories.map(item => (
                                <option value={"category=" + item._id} key={item._id}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>


            {/* <input type="text" value={search} placeholder="Searching your favorite cakes"
                onChange={e => setSearch(e.target.value.toLowerCase())} /> */}

            <div className="row">
                <span>Sort by: </span>
                <select name="sort" value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best sales</option>
                    <option value="sort=-price">Price: Highest to lowest</option>
                    <option value="sort=price">Price: Lowest to highest</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
