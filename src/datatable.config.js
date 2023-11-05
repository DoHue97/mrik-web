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
    { key: '', label: '', align: align.right, action: true, actionIcon: MoreIcon, actionType: actionType.func, actionFuncName: 'onShowMenuActions' },
]
