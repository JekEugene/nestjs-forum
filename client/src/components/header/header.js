import Login from "../login/login"
import Register from "../register/register"
import Logout from "../logout/logout"
import React, {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import "./header.css"
  
function Header(props) {

    let dropdown = ''
    if(props.role === 'guest' || props.role === 0){
        dropdown =  <><Login /><Register /></> 
    } else {
    dropdown = <><Link to={`/user/${props.id}`}><button className="btn btn-light">profile</button></Link>
                    <Logout logoutSubmit={props.logoutSubmit}/></> 
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <NavLink to="/">
                            <p class="nav-link">Home</p>
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/post/add">
                            <p class="nav-link">Add Post</p>
                        </NavLink>
                    </li>
                </ul>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {props.name}  
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                    <div class="btn-group-vertical" id="btn-group-header" role="group" aria-label="Basic example">
                        {dropdown}
                    </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header