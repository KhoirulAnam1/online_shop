import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Navbar from "./component/Navbar";
import Products from "./page/Products";
import User from "./page/User";
import Profil from "./page/Profil";
import Login from "./page/Login";
import Register from "./page/Register";
import Product from "./page/product";
import Cart from "./page/Cart";
import Orders from "./page/Orders";

class Main extends Component{
    render = () => {
        return(
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/products"> 
                <Navbar />
                <Products />
                </Route>
                <Route path="/user"> 
                <Navbar />
                <User />
                </Route>
                <Route path="/profil"> 
                <Navbar />
                <Profil />
                </Route>
                `<Route path="/client"> 
                <Navbar />  
                <Product />
                </Route>
                <Route path="/cart">
                <Navbar />
                <Cart />
                </Route>
                <Route path="/orders">
                <Navbar />
                <Orders />
                </Route>``
            </Switch>
        );
    }
}

export default Main;
