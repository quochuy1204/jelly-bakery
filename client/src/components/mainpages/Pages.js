import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom'
import Products from './products/Products'
import Cart from './cart/Cart'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/notfound/NotFound'
import DetailProduct from './detailProduct/DetailProduct'
import { GlobalState } from '../../GlobalState';
import OrderHistory from './history/OrderHistory'
import OrderDetail from './history/OrderDetail'
import Payment from './admin/payment/Payment'
import PaymentDetail from './admin/payment/PaymentDetail'
import Categories from './category/Categories'
import CreateProduct from './admin/createproduct/CreateProduct'

function Pages(props) {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    return (
        <Switch>
            <Route path="/" exact component={Products} />

            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetail : NotFound} />

            <Route path="/payment" exact component={isAdmin ? Payment : NotFound} />
            <Route path="/payment/:id" exact component={isAdmin ? PaymentDetail : NotFound} />

            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />

            <Route path="/cart" exact component={Cart} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    );
}

export default Pages;