import {HOME_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, RESET_ROUTE} from "./utils/consts";

import Home from "./components/Home";
import Auth from "./pages/Auth";
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
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: RESET_ROUTE,
        Component: Auth
    },
];
