import React from 'react';
import { useLocation } from 'react-router-dom';

function Reset() {

    const location = useLocation();

    const login = (event) => {
        event.preventDefault();
    }

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Login</div>

                    <div className="card-body">
                        <form method="POST" action={process.env.APP_URL + '/login'}>
                            {/* csrf */}
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} wfd-invisible="true"></input>

                            <div className="row mb-3">
                                <label for="email" className="col-md-4 col-form-label text-md-end">Email Address</label>

                                <div class="col-md-6">
                                    {/* @error('email') is-invalid @enderror */}
                                    {/* old('email') */}
                                    <input id="email" type="email" className="form-control" name="email" value="" required autocomplete="email" autofocus/>

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
                                <label for="password" className="col-md-4 col-form-label text-md-end">Password</label>

                                <div className="col-md-6">
                                    {/* @error('password') is-invalid @enderror */}
                                    <input id="password" type="password" className="form-control" name="password" required autocomplete="current-password"/>

                                    {/*
                                        @error('password')
                                        <span className="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                        @enderror
                                    */}

                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6 offset-md-4">
                                    <div className="form-check">
                                        {/* {{ old('remember') ? 'checked' : '' }} */}
                                        <input className="form-check-input" type="checkbox" name="remember" id="remember" />

                                        <label className="form-check-label" for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type="submit" onClick={login} className="btn btn-primary">
                                        Login
                                    </button>

                                    {/*
                                        @if (Route::has('password.request'))
                                        <a className="btn btn-link" href="{{ route('password.request') }}">
                                            Forgot Your Password?
                                        </a>
                                        @endif
                                    */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Reset;

