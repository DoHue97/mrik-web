import { httpUtil } from "./httpUtil";
import { inventory } from "./inventory";
import { offers } from "./offers";
import { orders } from "./orders";
import { products } from "./products";
import { users } from "./users";
import { wallets } from "./wallets";

export default {
    orders: orders,
    wallets: wallets,
    products: products,
    users: users,
    inventory: inventory,
    offers: offers,
    setupChannel: httpUtil.setupChannel,
    getSession: httpUtil.getSession,
    startSession: httpUtil.startSession,
    cleanSession: httpUtil.startSession,
}
