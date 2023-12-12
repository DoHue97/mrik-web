import { CartIcon, DashboardIcon, OffersIcon, ProductsIcon, UserIcon, WalletIcon, RequestMoneyIcon, ReportsIcon, PercentFillIcon, HomeGearFillIcon, DatabaseFillIcon } from "./components/Icons";
import { config_path } from "./router/config.path";


export const menu = [
    { id: 'MENU_DASHBOARD', title: 'dashboard', route: config_path.dashboard, icon: <DashboardIcon />},
    { id: 'MENU_USERS', title: 'users', route: config_path.users, icon: <UserIcon />},
    { id: 'MENU_REQUEST_MONEY', title: 'request_money', route: config_path.request_money, icon: <RequestMoneyIcon />},
    { id: 'MENU_OFFERS', title: 'offers', route: config_path.offers, icon: <OffersIcon />},
    { id: 'MENU_PRODUCTS', title: 'products', route: config_path.products, icon: <ProductsIcon />},
    { id: 'MENU_INVENTORY', title: 'inventory', route: config_path.inventory, icon: <HomeGearFillIcon />},
    { id: 'MENU_ORDERS', title: 'orders', route: config_path.orders, icon: <CartIcon />},
    { id: 'MENU_WALLET', title: 'wallet', route: config_path.wallet, icon: <WalletIcon />},
    { id: 'MENU_DISCOUNT', title: 'discounts', route: config_path.discounts, icon: <PercentFillIcon />},
    { id: 'MENU_REPORTS', title: 'reports', icon: <ReportsIcon />, sub_menu: true, sub_items: [
        {id: 'MENU_REPORT_1', title: 'reports_customer_revenue_level', route: config_path.report_customer_revenue_level, icon: <DatabaseFillIcon />}
    ]},
]

export const profile = [
    { id: 'MENU_PROFILE', title: 'profile' },
    { id: 'MENU_SETTINGS', title: 'settings' },
]

