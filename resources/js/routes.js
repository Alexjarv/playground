import {HOME_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";

import Home from "./components/Home";
//import Login from "./components/Login";
//import Register from "./components/Register";
//import Admin from "./components/Admin";

export const authRoutes = [
    /*
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    */
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    // {
    //     path: LOGIN_ROUTE,
    //     Component: Login
    // },
    // {
    //     path: REGISTRATION_ROUTE,
    //     Component: Register
    // },
];
