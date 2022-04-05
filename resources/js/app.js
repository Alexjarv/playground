import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import UserStore from './store/UserStore';
import App from './components/App';

export const Context = createContext(null);

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/Home');
require('./components/Navbar');
require('./components/Sidebar');
require('./components/App');

if (document.getElementById('app')) {
    ReactDOM.render(
        <Context.Provider value={{
            user: new UserStore()
         }}>
            < App / >
        </Context.Provider>
    , document.getElementById('app'));
}

