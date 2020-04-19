import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Navbar from "./component/Navbar";
import Sewa from "./page/sewa";
import Lapangan from "./page/Lapangan";
import Login from "./page/Login";
import Register from "./page/Register";
import Member from "./page/Member";
import Nyewa from "./page/Nyewa";
import Profil from "./page/Profil";


class Main extends Component{
    render = () => {
        return(
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/sewa"> 
                <Navbar />
                <Sewa />
                </Route>
                <Route path="/lapangan"> 
                <Navbar />
                <Lapangan />
                </Route>
                <Route path="/member"> 
                <Navbar />
                <Member />
                </Route>
                <Route path="/nyewa"> 
                <Navbar />
                <Nyewa />
                </Route>
                <Route path="/profil"> 
                <Navbar />
                <Profil />
                </Route>
            </Switch>
        );
    }
}

export default Main;
