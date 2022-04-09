import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { forgot, login, register, reset } from '../http/userAPI';
import { Context } from '../app';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, RESET_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import CSRF from '../utils/CSRF';

const Login = observer(() => {

    const _token = document.querySelector('meta[name="csrf-token"]').content;

    const location = useLocation();
    const navigate  = useNavigate();

    const isLogin = location.pathname === LOGIN_ROUTE;
    const isRegister = location.pathname === REGISTRATION_ROUTE;
    const isReset = location.pathname === RESET_ROUTE;

    const {user} = useContext(Context);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [remember, setRemember] = useState(true);

    const handleSubmit = async (e) => {

        e.preventDefault();
            let res;
            try{
                if(isLogin){
                    res = await login(email, password, remember, _token);
                } else if (isRegister){
                    if(password !== confirmPassword){
                        return setMessage("Your passwords don't match");
                    }
                    res = await register(name, email, password, confirmPassword, _token);
                } else if (isReset){
                    res = await forgot(email, _token);
                }

                setMessage(res.data.message);

                user.setUser(res.data.data);
                user.setIsAuth(true);

                navigate(HOME_ROUTE);

            }catch(e){
                console.log('e: ' + e);
                if(e.response && e.response.data.message.password){
                    if(e.response.data.message.password.Min){
                        setMessage('Sorry, your password is too short');
                    } else {
                        setMessage("Your passwords don't match");
                    }
                } else if (e.response && e.response.data.message.email){
                    setMessage("The user with given email already exists");
                } else {
                    setMessage(e.response.data.message);
                }
            }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Login</div>

                        <div className="card-body">
                            <form method="POST" onSubmit={handleSubmit}>
                                {/* csrf */}
                                <CSRF/>

                                {isRegister &&
                                    <div className="row mb-3">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Name</label>

                                        <div className="col-md-6">
                                            <input id="name" onChange={(event) => setName(event.target.value)} type="text"
                                            className="form-control" name="name" value={name} required autoComplete="name" autoFocus/>
                                        </div>
                                        {isReset &&
                                            <>
                                                {message ?
                                                    <span className="invalid-feedback offset-md-4" role="alert">
                                                        <strong>{message}</strong>
                                                    </span>
                                                :
                                                    ''
                                                }
                                            </>
                                        }
                                    </div>
                                }

                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>

                                    <div className="col-md-6">
                                        {/* old('email') */}
                                        <input id="email" onChange={(event) => setEmail(event.target.value)} type="email"
                                        className="form-control" name="email" value={email} required autoComplete="email" autoFocus/>
                                    </div>
                                    {isReset &&
                                            <>
                                                {message ?
                                                    <span className="invalid-feedback offset-md-4" role="alert">
                                                        <strong>{message}</strong>
                                                    </span>
                                                :
                                                    ''
                                                }
                                            </>
                                        }
                                </div>

                                {(isLogin || isRegister) &&
                                    <div className="row mb-3">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>

                                        <div className="col-md-6">
                                            <input id="password" type="password" onChange={(event) => setPassword(event.target.value)}
                                            className="form-control" name="password" value={password} required autoComplete="current-password"/>
                                        </div>
                                        {isLogin &&
                                            <>
                                                {message ?
                                                    <span className="invalid-feedback offset-md-4" role="alert">
                                                        <strong>{message}</strong>
                                                    </span>
                                                :
                                                    ''
                                                }
                                            </>
                                        }
                                    </div>
                                }
                                {isRegister &&
                                    <div className="row mb-3">
                                        <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-end">Confirm Password</label>

                                        <div className="col-md-6">
                                            <input id="password-confirm" onChange={(event) => setConfirmPassword(event.target.value)} type="password"
                                            className="form-control" name="password_confirmation" value={confirmPassword} required autoComplete="new-password"/>
                                        </div>
                                        {message ?
                                            <span className="invalid-feedback offset-md-4" role="alert">
                                                <strong>{message}</strong>
                                            </span>
                                        :
                                            ''
                                        }
                                    </div>
                                }

                                {isLogin &&
                                    <div className="row mb-3">
                                        <div className="col-md-6 offset-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" onChange={(e) => setRemember(e.target.checked)} defaultChecked={remember} type="checkbox" name="remember" id="remember" />

                                                <label className="form-check-label" htmlFor="remember">
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                }

                                <div className="row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            {isLogin &&
                                                "Login"
                                            }
                                            {isRegister &&
                                                "Register"
                                            }
                                            {isReset &&
                                                "Reset"
                                            }
                                        </button>
                                        {isLogin &&
                                            <a className="btn btn-link" onClick={(e) => {e.preventDefault(), navigate(RESET_ROUTE)}} href={RESET_ROUTE}>
                                                Forgot Your Password?
                                            </a>
                                        }

                                        {isReset &&
                                            <a className="btn btn-link" onClick={(e) => {e.preventDefault(), navigate(LOGIN_ROUTE)}} href={LOGIN_ROUTE}>
                                                Remember password?
                                            </a>
                                        }

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Login;

