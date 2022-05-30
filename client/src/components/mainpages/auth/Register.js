import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChangeFunction = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async event => {
        event.preventDefault()
        try {
            await axios.post("/user/register", { ...user })

            localStorage.setItem("logged", true)

            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <h2>Sign Un</h2>
            <form onSubmit={registerSubmit}>
                <input type="text" name="name" required placeholder="Enter your name" value={user.name} onChange={onChangeFunction} />
                <input type="email" name="email" value={user.email} required placeholder="Email" onChange={onChangeFunction} />
                <input type="password" name="password" value={user.password} required autoComplete="on" placeholder="Password" onChange={onChangeFunction} />
                <div className="row">
                    <button type="submit">SIGN UP</button>
                    <Link to="/login" >Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
