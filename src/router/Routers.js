import React from "react";
import { Routes, Route, Navigate, useLocation, } from "react-router-dom"
import { config_path } from './config.path';
import LoginPage from '../pages/login/LoginController';
import HomePage from '../pages/home/HomeController';
import DashboardPage from '../pages/dashboard/DashboardController';
import UsersPage from '../pages/users/UsersController';

export default function Routers(props){
    return(
        <Routes>
            <Route exact path={config_path.login} element={<LoginPage />} />
            <Route path={'/'} element={<DashboardPage />}/>
            <Route path={config_path.dashboard} element={<DashboardPage />}/>
            <Route path={config_path.users} element={<UsersPage />}/>
            <Route path={config_path.home} element={<HomePage />}/>
        </Routes>
    )
}

function RequireAuth({ children }: { children: JSX.Element }) {
    var session = null;
    let location = useLocation();
    console.log("AAAA RequireAuth location.pathname:", location.pathname);
    if (!session) {
        // clearSession();
        return <Navigate to={config_path.login} state={{ from: location }} replace />;
    } else {
        return children;
    }
}

function CheckSession({ children }: { children: JSX.Element }) {
    var session = null;
    let location = useLocation();
    if (!session) {
        // clearSession();
        return children;
    } else {
        return <Navigate to={config_path.home} state={{ from: location }} replace />;
    }
}