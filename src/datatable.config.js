import { MoreIcon } from "./components/Icons"

const valueType = {
    string: 'string',
    amount: 'amount',
    date: 'date',
    datetime: 'datetime'
}

const align = {
    left: 'left',
    right: 'right',
    center: 'center'
}
const component = {
    badge: 'badge',
    text: 'text' //default
}
const actionType = {
    func: 'func',
    redirect: 'redirect' //default
}

export const usersTableConfig = [
    { key: 'name', label: 'name' },
    { key: 'email', label: 'email' },
    { key: 'phone', label: 'phone' },
    { key: '', label: '', align: align.right, action: true, actionIcon: MoreIcon, actionType: actionType.func, actionFuncName: 'onShowMenuActions' },
]

export const ordersTableConfig = [
    { key: 'created_date', label: 'created_date', type: valueType.datetime },
    { key: 'number', label: 'number' },
    // { key: 'state', label: 'state' },
    {
        key: 'state', label: 'state', type: valueType.string, component: component.badge, align: align.left, sort: false, action: false, mappingValue: true,
        badgeConfig: {
            stylesConfig: {
                CANCELLED: 'error',
                NEW: 'info',
                IN_PROGRESS: 'warning',
                DELIVERED: 'success',
                PAID: 'secondary',
                STOCK_OUT_REQUEST: 'error',
            }
        }
    },
    { key: '', label: '', align: align.right, action: true, actionIcon: MoreIcon, actionType: actionType.func, actionFuncName: 'onShowMenuActions' },
]

export const productsTableConfig = [
    { key: 'code', label: 'product_code' },
    { key: 'name', label: 'product_name' },
    { key: '', label: '', align: align.right, action: true, actionIcon: MoreIcon, actionType: actionType.func, actionFuncName: 'onShowMenuActions' },
]

export const productPricesTableConfig = [
    { key: 'code', label: 'price_code' },
    { key: 'description', label: 'price_desc' },
    { key: 'value', label: 'price' },
    { key: '', label: '', align: align.right, action: true, actionIcon: MoreIcon, actionType: actionType.func, actionFuncName: 'onShowMenuActions' },
]

export const transactionsTableConfig = [
    { key: 'name', label: 'name' },
    { key: 'amount', label: 'amount' },
    { key: 'description', label: 'description' },
    { key: '', label: '', align: align.right, action: true, actionIcon: MoreIcon, actionType: actionType.func, actionFuncName: 'onShowMenuActions' },
]

export const inventoryTableConfig = [
    { key: 'date', label: 'created_date' },
    { key: 'code', label: 'inventory_code' },
    { key: 'product.code', label: 'product_code' },
    { key: 'name', label: 'product_name' },
    { key: 'quantity', label: 'quantity' },
    { key: '', label: '', align: align.right, action: true, actionIcon: MoreIcon, actionType: actionType.func, actionFuncName: 'onShowMenuActions' },
]
