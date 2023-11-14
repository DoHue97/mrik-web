import { CartIcon, DashboardIcon, ProductsIcon, UserIcon, WalletIcon } from "./components/Icons";
import { config_path } from "./router/config.path";


export const menu = [
    { id: 'dashboard', title: 'dashboard', route: config_path.dashboard, icon: <DashboardIcon />},
    { id: 'orders', title: 'orders', route: config_path.orders, icon: <CartIcon />},
    { id: 'products', title: 'products', route: config_path.products, icon: <ProductsIcon />},
    { id: 'wallet', title: 'wallet', route: config_path.wallet, icon: <WalletIcon />},
    { id: 'users', title: 'users', route: config_path.users, icon: <UserIcon />},
]

export const profile = [
    { id: 'home', title: 'home' },
    { id: 'profile', title: 'profile' },
    { id: 'settings', title: 'settings' },
]

