import { connection, portal_config } from "../portal.config";
import i18n from '../translations/i18n';
import Cookies from 'js-cookie'
import { cache } from './cache';
import { config_path } from "../router/config.path";

export const ACCESS_TOKEN = 'crmcom_access_token';
export const REFRESH_TOKEN = 'crmcom_refresh_token';
export const LANGUAGE = 'language_id';

var language_id = portal_config.default_language ? portal_config.default_language : 'VN';
var is_logout_call = false;

export function saveDataIntoAsyncStore(key, data) {
    localStorage.setItem(key, data);
}

export function getData(key) {
    let data = null;
    if (key) {
        data = localStorage.getItem(key);
    }
    return data;
}

export function initLanguage() {
    try {
        let storedLanguage = localStorage.getItem(LANGUAGE);
        if (!storedLanguage) {
            storeLanguageAsync(language_id, null);
        } else {
            language_id = storedLanguage;
            i18n.changeLanguage(language_id);
        }
    } catch (ex) {
        i18n.changeLanguage(language_id);
    }
    return language_id;
}

export function storeLanguageAsync(language) {
    try {
        i18n.changeLanguage(language);
        localStorage.setItem(LANGUAGE, language);
        language_id = language;
    }
    catch (err) {
        console.log("EXCEPTION  storeLanguageAsync ", err);
        throw err;
    }
}

export function getLanguage() {
    return language_id;
}

export async function logOut(isSessionExpire, navigate) {
    if (!is_logout_call || !isSessionExpire) {//bị hết hạn lần đầu hoặc logout chủ động
        clearSession();
        cache.clearStorage();
        navigate(config_path.login)
        is_logout_call = true;
    }
}

export function clearSession(key) {
    if (key)
        localStorage.removeItem(key);
    else {
        try {
            Cookies.remove(ACCESS_TOKEN, connection.cookiesConfig);
            Cookies.remove(REFRESH_TOKEN, connection.cookiesConfig);
            // localStorage.clear();
            localStorage.removeItem("communities");
        }
        catch (e) {
            console.log('clearSession e:', e)
        }
    }

}

