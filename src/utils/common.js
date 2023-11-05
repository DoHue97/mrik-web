import { portal_config } from "../portal.config";
import i18n from '../translations/i18n';

export const LANGUAGE = 'language_id';

var language_id = portal_config.default_language ? portal_config.default_language : 'VN';

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
