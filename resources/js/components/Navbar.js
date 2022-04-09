import React, { useContext } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../app';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

function Navbar(props) {

    const navigate = useNavigate();
    const {user} = useContext(Context);
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left Side Of Navbar */}
                    <ul className="navbar-nav me-auto">

                    </ul>

                    {/* Right Side Of Navbar */}
                    <ul className="navbar-nav ms-auto">

                        {/* Authentication Links */}

                        {/* loading user? */}
                        {props.loading ?
                            <Spinner animation={'border'} variant={'primary'}/>
                        :
                        <>
                            {/* if guest */}
                            {!user.isAuth ?
                                    <>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={(e) => {e.preventDefault(), navigate(LOGIN_ROUTE)}} href={LOGIN_ROUTE}>Login</a>
                                    </li>

                                    <li className="nav-item">
                                    <a className="nav-link" onClick={(e) => {e.preventDefault(), navigate(REGISTRATION_ROUTE)}} href={REGISTRATION_ROUTE}>Register</a>
                                    </li>
                                    </>
                            :
                            <li className="nav-item dropdown">
                                <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre="true">
                                    {user.user ? user.user.name : 'Guest'}
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
                                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} wfd-invisible="true"></input>
                                    </form>
                                </div>
                            </li>
                            }
                        </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

