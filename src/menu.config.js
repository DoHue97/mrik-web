import { CartIcon, DashboardIcon, OffersIcon, ProductsIcon, UserIcon, WalletIcon, RequestWithDrawalIcon } from "./components/Icons";
import { config_path } from "./router/config.path";


export const menu = [
    { id: 'MENU_DASHBOARD', title: 'dashboard', route: config_path.dashboard, icon: <DashboardIcon />},
    { id: 'MENU_USERS', title: 'users', route: config_path.users, icon: <UserIcon />},
    // { id: 'MENU_REQUEST_WITHDRAWAL', title: 'request_withdrawal', route: config_path.request_with_drawal, icon: <RequestWithDrawalIcon />},
    { id: 'MENU_OFFERS', title: 'offers', route: config_path.offers, icon: <OffersIcon />},
    { id: 'MENU_PRODUCTS', title: 'products', route: config_path.products, icon: <ProductsIcon />},
    // { id: 'MENU_ORDERS', title: 'orders', route: config_path.orders, icon: <CartIcon />},
    // { id: 'MENU_WALLET', title: 'wallet', route: config_path.wallet, icon: <WalletIcon />},
]

export const profile = [
    { id: 'MENU_HOME', title: 'home' },
    { id: 'MENU_PROFILE', title: 'profile' },
    { id: 'MENU_SETTINGS', title: 'settings' },
]

