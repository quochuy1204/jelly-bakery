import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import Cart from './icon/shopping_bag.svg'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged, setisLogged] = state.userAPI.isLogged
    const [isAdmin, setisAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [search, setSearch] = state.productsAPI.search
    const [searchInput, setSearchInput] = useState('')

    //Logout functional
    const logoutUser = async () => {
        try {
            await axios.get("/user/logout")
            localStorage.clear()
            setisAdmin(false)
            setisLogged(false)
            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const adminRouter = () => {
        return (
            <>
                <li>
                    <Link to="/create_product">Add Product</Link>
                </li>
                <li>
                    <Link to="/category">Category</Link>
                </li>
                <li>
                    <Link to="/payment">Ordered</Link>
                </li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                {isAdmin ? '' : <li>
                    <Link to="/history">My Purchase</Link>
                </li>}

                <li>
                    <Link to="/" onClick={logoutUser}>Logout</Link>
                </li>
            </>
        )
    }

    const userRouter = () => {
        return (
            <>
                <li>
                    <Link to="/register">Sign Up</Link>
                </li>
                <li>|</li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </>
        )
    }

    const handleSearch = () => {
        setSearch(searchInput)
    }

    const handleChange = e => {
        setSearch(e.target.value.toLowerCase())
        setSearchInput(e.target.value.toLowerCase())
    }

    const reloadPage = () => {
        window.location.href = "/"
    }
    return (
        <header>

            <div className="logo">
                <h2>
                    <Link to="/" onClick={() => reloadPage()}>Jelly Bakery</Link>
                </h2>
            </div>

            <div className="search-bar">
                <input type="text" name="search" value={search} placeholder="Searching your favorite cakes"
                    onChange={handleChange} />
                <button type="submit" className="search-button" onClick={() => handleSearch()}>
                    <i className="fas fa-search"></i>
                </button>
            </div>

            <div className="menu">
                <ul>
                    {
                        isAdmin && <li>Admin Panel</li>
                    }
                    {
                        isAdmin && adminRouter()
                    }

                    {
                        isLogged ? loggedRouter() : userRouter()
                    }

                </ul>
            </div>
            {
                isAdmin ? '' :
                    <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={Cart} alt="" width="23" />
                        </Link>
                    </div>
            }



        </header>
    );
}

export default Header;