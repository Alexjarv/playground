import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../http/userAPI';
import { Context } from '../app';
import { HOME_ROUTE, LOGIN_ROUTE, RESET_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';

const Login = observer(() => {

    const _token = document.querySelector('meta[name="csrf-token"]').content;

    const location = useLocation();
    const navigate  = useNavigate();

    const {user} = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    let handleSubmit = async (e) => {
        e.preventDefault();

        try{
            res = await login(email, password, _token);

            user.setIsAuth(true);
            navigate(HOME_ROUTE);

        } catch(e){
            if(e.response && e.response.data.message.password){
                setMessage('Sorry, the password is too short');
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
                        <form method="POST" onSubmit={handleSubmit} action='/login'>
                            {/* csrf */}
                            <input type="hidden" name="_token" value={_token} wfd-invisible="true"></input>

                            <div className="row mb-3">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>

                                <div className="col-md-6">
                                    {/* @error('email') is-invalid @enderror */}
                                    {/* old('email') */}
                                    <input id="email" onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" name="email" value={email} required autoComplete="email" autoFocus/>

                                    {/*
                                        @error('email')
                                        <span className="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                        @enderror
                                    */}

                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>

                                <div className="col-md-6">
                                    <input id="password" type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" name="password" value={password} required autoComplete="current-password"/>

                                    {message ?
                                        <span className="invalid-feedback" role="alert">
                                        <strong>{message}</strong>
                                        </span>
                                    :
                                        ''
                                    }

                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6 offset-md-4">
                                    <div className="form-check">
                                        {/* {{ old('remember') ? 'checked' : '' }} */}
                                        <input className="form-check-input" type="checkbox" name="remember" id="remember" />

                                        <label className="form-check-label" htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>

                                    <a className="btn btn-link" href={RESET_ROUTE}>
                                            Forgot Your Password?
                                    </a>
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

