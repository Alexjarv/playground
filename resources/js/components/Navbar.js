import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../app';

function Navbar() {

    const {user} = useContext(Context);
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left Side Of Navbar */}
                    <ul className="navbar-nav me-auto">

                    </ul>

                    {/* Right Side Of Navbar */}
                    <ul className="navbar-nav ms-auto">

                        {/* Authentication Links */}

                        {/* if guest */}
                        {!user.isAuth ?
                                <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>

                                <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                                </li>
                                </>
                        :
                        <li className="nav-item dropdown">
                            <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre="true">
                                {user.name ? user.name : 'Guest'}
                            </a>

                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/logout"
                                onClick={(event) => {
                                    event.preventDefault(); document.getElementById('logout-form').submit()
                                }}>

                                    Logout
                                </a>

                                <form id="logout-form" action="/logout" method="POST" className="d-none">
                                    {/* csrf */}
                                    <input type="hidden" name="_token" value="" wfd-invisible="true"></input>
                                </form>
                            </div>
                        </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

