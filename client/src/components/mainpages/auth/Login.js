import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const onChangeFunction = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/user/login", { ...user })

            localStorage.setItem("logged", true)

            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={loginSubmit}>
                <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeFunction} />
                <input type="password" name="password" required placeholder="Password" value={user.password} onChange={onChangeFunction} autoComplete="on" />
                <div className="row">
                    <button type="submit">LOGIN</button>
                    <Link to="/register">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
