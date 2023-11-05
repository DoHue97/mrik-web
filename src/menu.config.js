import { CartIcon, DashboardIcon, UserIcon } from "./components/Icons";
import { config_path } from "./router/config.path";


export const menu = [
    { id: 'dashboard', title: 'dashboard', route: config_path.dashboard, icon: <DashboardIcon />},
    { id: 'products', title: 'products', route: config_path.products, icon: <CartIcon />},
    { id: 'users', title: 'users', route: config_path.users, icon: <UserIcon />},
]

export const profile = [
    { id: 'home', title: 'home' },
    { id: 'profile', title: 'profile' },
    { id: 'settings', title: 'settings' },
]

