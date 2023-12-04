import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate, } from "react-router-dom"
import { config_path } from './config.path';
import LoginPage from '../pages/login/LoginController';
import HomePage from '../pages/home/HomeController';
import DashboardPage from '../pages/dashboard/DashboardController';
import UsersPage from '../pages/users/UsersController';
import ForgotPasswordPage from "../pages/forgot-password/ForgotPasswordController";
import WalletController from "../pages/wallet/WalletController";
import InventoryController from "../pages/inventory/InventoryController";
import OrdersController from "../pages/orders/OrdersController";
import ProductsController from "../pages/products/ProductsController";
import OffersController from "../pages/offers/OffersController";
import AddEditOfferController from "../pages/offers/AddEditOfferController";
import PageNotFound from "../pages/PageNotFound";
import AccessDenied from "../pages/AccessDenied";
import RequestWithDrawalController from "../pages/request-drawal/RequestWithDrawalController";
import AddEditProductController from "../pages/products/AddEditProductController";
import OrderDetailController from "../pages/orders/OrderDetailController";
import DiscountsController from "../pages/discounts/DiscountsController";
import ReportCustomerRevenueLevelController from "../pages/reports/ReportCustomerRevenueLevelController";

export default function Routers(props) {
    const navigate = useNavigate();

    useEffect(() => {
        var pathname = window.location.pathname;
        let paths = Object.values(config_path);
        // if(!paths.includes(pathname)){
        //     pathname = config_path.page_not_found;
        //     navigate(pathname)
        // }
    },[])

    return (
        <Routes>
            <Route exact path={config_path.login} element={<LoginPage />} />
            {/* <Route path={config_path.forgot_password} element={<ForgotPasswordPage />} /> */}
            <Route path={config_path.dashboard} element={<DashboardPage />} />
            <Route path={config_path.users} element={<CheckPermission><UsersPage /></CheckPermission>} />
            <Route path={config_path.products} element={<CheckPermission><ProductsController /></CheckPermission>} />
            <Route path={config_path.product_add} element={<CheckPermission><AddEditProductController /></CheckPermission>} />
            <Route path={config_path.product_edit} element={<CheckPermission><AddEditProductController /></CheckPermission>} />
            <Route path={config_path.orders} element={<CheckPermission><OrdersController /></CheckPermission>} />
            <Route path={config_path.orders_detail} element={<CheckPermission><OrderDetailController /></CheckPermission>} />
            <Route path={config_path.wallet} element={<CheckPermission><WalletController /></CheckPermission>} />
            <Route path={config_path.inventory} element={<CheckPermission><InventoryController /></CheckPermission>} />
            <Route path={config_path.offers} element={<CheckPermission><OffersController /></CheckPermission>} />
            <Route path={config_path.offer_add} element={<CheckPermission><AddEditOfferController /></CheckPermission>} />
            <Route path={config_path.offer_edit} element={<CheckPermission><AddEditOfferController /></CheckPermission>} />
            <Route path={config_path.request_with_drawal} element={<CheckPermission><RequestWithDrawalController /></CheckPermission>} />
            <Route path={config_path.discounts} element={<CheckPermission><DiscountsController /></CheckPermission>} />
            <Route path={config_path.report_customer_revenue_level} element={<CheckPermission><ReportCustomerRevenueLevelController /></CheckPermission>} />
            <Route path={config_path.page_not_found} element={<PageNotFound />} />
            <Route path={config_path.access_denied} element={<AccessDenied />} />
            <Route path={config_path.home} element={<DashboardPage />} />
        </Routes>
    )
}

function RequireAuth({ children }) {
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

function CheckSession({ children }) {
    var session = null;
    let location = useLocation();
    if (!session) {
        // clearSession();
        return children;
    } else {
        return <Navigate to={config_path.home} state={{ from: location }} replace />;
    }
}

function CheckPermission({ children }) {
    let location = useLocation();
    let hasPermission = true;
    if (hasPermission) return children;
    else return <Navigate to={config_path.access_denied} state={{ from: location }} replace />
}
