export const config_path = {
    login: '/login',
    register: '/register',
    // forgot_password: '/forgot_password',
    home: '/',
    dashboard: '/dashboard',
    users: '/users',
    inventory: '/inventory',
    orders: '/orders',
    orders_detail: '/orders/detail/:id',
    wallet: '/wallet',
    products: '/products',
    product_add: '/products/add',
    product_edit: '/products/edit/:id',
    product_prices: '/products/:id/prices',
    offers: '/offers',
    offer_add: '/offers/new',
    offer_edit: '/offers/edit/:id',
    page_not_found: '/page-not-found',
    access_denied: '/access-denied',
    request_with_drawal: '/request-with-drawal',
    discounts: '/discounts',
    report_customer_revenue_level: '/reports/customer-revenue-level',
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
