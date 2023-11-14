const list_languages = 'list_languages';
const currency = 'currency';
const currency_code = 'currency_code';

export const cache = {
    setLanguages,
    getLanguages,
    setCurrency,
    getCurrency,
    setCurrencyCode,
    getCurrencyCode,
    clearStorage,
}

function setLanguages(languages) {
    languages = JSON.stringify(languages);
    localStorage.setItem(list_languages, languages);
}

function getLanguages() {
    let data = localStorage.getItem(list_languages);
    if (data) {
        data = JSON.parse(data);
    }
    return data;
}

function setCurrency(_currency) {
    _currency = JSON.stringify(_currency);
    localStorage.setItem(currency, _currency);
}

function getCurrency() {
    let data = localStorage.getItem(currency);
    if (data) {
        data = JSON.parse(data);
    }
    return data
}

function setCurrencyCode(code) {
    code = JSON.stringify(code);
    localStorage.setItem(currency_code, code);
}

function getCurrencyCode() {
    let data = localStorage.getItem(currency_code);
    if (data) {
        data = JSON.parse(data);
    }
    return data
}

function clearStorage() {
    localStorage.removeItem(currency_code);
}
