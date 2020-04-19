import React, {Component} from 'react';
import {Link} from "react-router-dom";
class Navbar extends Component {
  Logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("role");
    localStorage.removeItem("users");
    window.location = "/login";
  }

  navGuest = () => {
    return(
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/sewa" className="nav-item nav-link text-align mr-4">Sewa</Link>
          </li>
          <li>
            <Link to="/login" className="nav-item nav-link text-align mr-4">Login</Link>
          </li>
        </ul>
      </div>
    )
  }

  navAdmin = () => {
    return (
        <div className="navbar-collapse collapse" id="navbarNav">
          <ul className="navbar-nav">

            <li className="navbar-item">
              <Link className="nav-link text-info"  to="/lapangan">Lapangan</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link text-info" to="/Member">Member</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link text-info" to="/nyewa">Sewa</Link>
            </li>
            <li className="navbar-item">
              <a className="nav-link text-danger" onClick={this.Logout}>Logout</a>
            </li>
          </ul>
        </div>
    )
  }

  navUser = () => {
    return (
        <div className="navbar-collapse collapse" id="navbarNav">
          <ul className="navbar-nav">

            <li className="navbar-item">
              <Link className="nav-link text-info"  to="/sewa">Sewa</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link text-info" to="/profil">Profil</Link>
            </li>
            <li className="navbar-item">
              <a className="nav-link text-danger" onClick={this.Logout}>Logout</a>
            </li>
          </ul>
        </div>
    )
  }

  render(){
    let auth = localStorage.getItem("Token")
    let role = localStorage.getItem("role")
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand ml-5 text-white" href="#">SEWA LAPANGAN</a>
          <button className="navbar-toggler btn-light" type="button" data-toggle="collapse"
          data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
          aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          { !auth ? this.navGuest() : role === "admin" ? this.navAdmin() : this.navUser() }
        </nav>
      </div>
    );
  }
}
export default Navbar;
