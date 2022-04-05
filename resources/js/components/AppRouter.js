import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, authRoutes } from '../routes';
import { HOME_ROUTE } from '../utils/consts';
import { Context } from '../app';


const AppRouter = () => {

    const {user} = useContext(Context);

    return (
        <Routes>
            {publicRoutes.map( ({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.isAuth && authRoutes.map( ({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={<Navigate to={HOME_ROUTE} />}/>
        </Routes>
    );
}

export default AppRouter;

