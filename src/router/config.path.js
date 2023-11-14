export const config_path = {
    login: '/login',
    register: '/register',
    forgot_password: '/forgot_password',
    home: '/home',
    dashboard: '/dashboard',
    users: '/users',
    inventory: '/inventory',
    orders: '/orders',
    wallet: '/wallet',
    products: '/products',
}

const _IN_SESSION = 0;
const _OUT_SESSION = 2;
const _IN_OUT_SESSION = 3;

export const SCOPE = {
    _IN_SESSION,
    _OUT_SESSION,
    _IN_OUT_SESSION
}
export const routeACL = {
    [config_path.login]: _OUT_SESSION,
    [config_path.register]: _OUT_SESSION,
    [config_path.forgot_password]: _OUT_SESSION,
    [config_path.home]: _IN_SESSION,
}
