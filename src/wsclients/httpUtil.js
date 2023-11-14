import querystring from 'querystring';
import jwtDecode from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/common';

/** local variables */
let _storeKVFn;
let _getKVFn;
let _sessionInvalidCallback;
let _fetchFn;

let _apiKey;
let _accessToken;
let _refreshToken;
let _host;
let _sessionData;

export const httpUtil = {
    setupChannel,
    get,
    post,
    put,
    getSession,
    cleanSession,
    refreshToken,
    getToken,
    startSession,
}

async function setupChannel({
    storeKVFn,  //function to store key value
    getKVFn,    //function to get value by key from the storage
    sessionInvalidCallback, //function to call when api_key or token key is invalid and refresh token if available was failed
    apiKey,
    host,
    fetchFn,
}) {
    _storeKVFn = storeKVFn;
    _getKVFn = getKVFn;
    _sessionInvalidCallback = sessionInvalidCallback;
    _apiKey = apiKey;
    _host = host;
    if (fetchFn)
        _fetchFn = fetchFn;
    else
        _fetchFn = fetch;

    if (_getKVFn) {
        _accessToken = await _getKVFn(ACCESS_TOKEN ? ACCESS_TOKEN : 'access_token');
        _refreshToken = await _getKVFn(REFRESH_TOKEN ? REFRESH_TOKEN : 'refresh_token');
        try {
            if (_accessToken) {
                _sessionData = jwtDecode(_accessToken);
                await checkRefreshToken();
            }
            else if (_refreshToken) {
                await refreshToken(true);
            }
        } catch (e) {
            console.log('Failed to load session data: ', e);
            _sessionData = undefined;
        }
    }
    //TODO add silent refresh token here
}

async function checkRefreshToken() {
    let currentTime = Date.now();
    let tokenLiveInSec = (_sessionData.exp - currentTime / 1000);
    //console.log('tokenLiveInSec====', tokenLiveInSec)
    if (tokenLiveInSec > 60 * 60)
        return;
    else
        await refreshToken(true);
}

async function refreshToken() {
    try {
        console.log('_refreshToken:', _refreshToken);
        console.log('AAAAAAAAAAAAAAAAAA start to refresh:');
        console.log('AAAAAAAAAAAAAAAAAA start to refresh:');
        console.log('AAAAAAAAAAAAAAAAAA start to refresh:');
        console.log('AAAAAAAAAAAAAAAAAA start to refresh:');
        let path = '/contacts/refresh';

        let response = await postRefreshToken({
            resourcePath: path,
            body: {},
            isBackend: _isBackend
        });
        console.log('AAAAAAAAAAAAAAAAAA response:', response);
        if (response.status == "200") {
            let bodyText = await response.text()
            console.log('refreshToken bodyText:', bodyText);
            startSession(json2Obj(bodyText));
            return { code: "OK", data: bodyText ? json2Obj(bodyText) : null };
        } else {
            validateForceLogout(response, true);
            return response;
        }
    } catch (e) {
        validateForceLogout(e, true);
        return e;
    }
}

function startSession({ access_token, refresh_token }) {
    //TODO handle expiration
    _accessToken = access_token;
    _refreshToken = refresh_token;
    if (_storeKVFn) {
        _storeKVFn(REFRESH_TOKEN ? REFRESH_TOKEN : "refresh_token", refresh_token)
        _storeKVFn(ACCESS_TOKEN ? ACCESS_TOKEN : "access_token", access_token)
        _sessionData = jwtDecode(_accessToken);
    }

}

function cleanSession() {
    //TODO handle expiration
    _accessToken = undefined;
    _refreshToken = undefined;
    if (_storeKVFn) {
        _storeKVFn(REFRESH_TOKEN ? REFRESH_TOKEN : "refresh_token", undefined)
        _storeKVFn(ACCESS_TOKEN ? ACCESS_TOKEN : "access_token", undefined)
        console.log('Session cleared');
    }
    _sessionData = undefined;
    console.log("AAA _sessionData:", _sessionData);
}

function initOptionHeader() {
    return {
        'User-Agent': 'request',
        'Content-Type': 'application/json; charset=utf-8'
    }
}

async function postRefreshToken({
    resourcePath,
    body,
}) {
    try {
        let uri = getURI(resourcePath);
        var options = {};
        options.headers = initOptionHeader();
        options.method = "POST";
        options.credentials = 'omit';
        options.headers['Authorization'] = 'Bearer ' + _refreshToken;
        if (body)
            options.body = JSON.stringify(body);
        console.log('POST: ', uri, options);
        let response = await _fetchFn(uri, options);
        console.log('RESPONSE postRefreshToken: ', response);
        return response;
    } catch (e) {
        return e;
    }
}

async function validateForceLogout(response, logOutIfSessionInvalid) {
    console.log("response:", response);
    console.log("logOutIfSessionInvalid:", logOutIfSessionInvalid);
    try {
        if (logOutIfSessionInvalid == true && _sessionInvalidCallback && response.status == '401') {
            await _sessionInvalidCallback(true);
            cleanSession();
        } else {
            return response;
        }
    } catch (e) {
        console.log(e);
        return e;
    }
}

function getSession() {
    return _sessionData;
}

async function processRefreshToken(uri, logOutIfSessionInvalid, returnText) {
    try {
        var refreshResult = await refreshToken(logOutIfSessionInvalid);
        console.log('AAAAAAAAAAAAAAAAAA GET refreshResult:', refreshResult);
        if (refreshResult.code == 'OK') {
            var options = {};
            options.headers = initOptionHeader();
            options.method = "GET";
            options.credentials = 'omit';            
            options.headers = { ...options.headers, Authorization: "Bearer " + refreshResult.data.access_token };
            options = { ...options, headers: options.headers };
            var response = await _fetchFn(uri, options);
            var bodyText = await response.text()
            if (response.status == '200') {
                if (returnText)
                    return { code: "OK", data: bodyText };
                return { code: "OK", data: bodyText ? json2Obj(bodyText) : null };
            }
            return { code: response.status, bodyText: bodyText, error: json2Obj(bodyText) };
        } else {
            validateForceLogout(refreshResult, true);
        }
    } catch (error) {
        console.log("process refreshtoken exception:", error);
        validateForceLogout(error, true);
    }
}

function getToken() {
    return _accessToken;
}

function getURI(resourcePath) {
    return _host + resourcePath;
}

function is200OK(result) {
    if (result && result.status && result.status == '200')
        return true;
    else
        return false;
}

function cleanObj(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
}

async function get({
    resourcePath,
    queryParams,
    withAccessToken = false,
    logOutIfSessionInvalid = true,
    returnText = false,
    unauthorize = false,
    returnBlob = false,
    isRefreshToken = false,
    accessToken = null,
    withoutApikey = false,
}) {
    console.log("withAccessToken:", withAccessToken);
    console.log("unauthorize:", unauthorize);
    try {
        let uri = getURI(resourcePath, isMiddleware);
        var options = {};
        options.headers = initOptionHeader();
        options.method = "GET";
        options.credentials = 'omit';
        if (withAccessToken == true || logOutIfSessionInvalid == true || isRefreshToken == true) {
            console.log("AAAAAAAAAAAAAAAAAAAA b111111111111111111111:");
            if (isRefreshToken)
                options.headers['Authorization'] = 'Bearer ' + _refreshToken;
            else if (accessToken) {
                options.headers['Authorization'] = 'Bearer ' + accessToken;
            }
            else
                options.headers['Authorization'] = 'Bearer ' + _accessToken;
        }
        else if (!withoutApikey) {
            options.headers['api_key'] = _apiKey;
        }
        if (queryParams)
            uri = uri + '?' + querystring.encode(cleanObj(queryParams));
        console.log('GET: ', uri, options);
        let response = await _fetchFn(uri, options);
        console.log("response:", response);
        if (response.status == '200') {
            if (returnText) {
                let bodyText = await response.text()
                console.log('Response - ', response.status, ' - Body text:', bodyText);
                return { code: "OK", data: bodyText };
            } else if (returnBlob) {
                let blob = await response.blob();
                console.log('Response - ', response.status, ' - Body blob:', blob);
                return { code: "OK", data: blob ? blob : null };
            } else {
                let bodyText = await response.text()
                console.log('Response - ', response.status, ' - Body:', json2Obj(bodyText));
                return { code: "OK", data: bodyText ? json2Obj(bodyText) : null };
            }
        } else if (response.status == '401') {
            var result = await processRefreshToken(uri, logOutIfSessionInvalid, returnText);
            return result;
        } else {
            let bodyText = await response.text()
            return { code: response.status, bodyText: bodyText, error: json2Obj(bodyText) };
        }
    } catch (e) {
        console.log("AAA e:", e);
        let bodyText = await e.text();
        return { code: e.status, bodyText: bodyText, error: json2Obj(bodyText) };
    }
}

async function post({
    resourcePath,
    body,
    queryParams,
    withAccessToken = false,
    withoutApikey = false,
    logOutIfSessionInvalid = true,
    isRefreshToken,
    accessToken,
    returnText,
}) {
    try {
        let uri = getURI(resourcePath);
        var options = {};
        options.headers = initOptionHeader();
        options.method = "POST";
        options.credentials = 'omit';
        if (withAccessToken == true || logOutIfSessionInvalid == true || isRefreshToken == true) {
            console.log("AAAAAAAAAAAAAAAAAAAA b111111111111111111111:");
            if (isRefreshToken)
                options.headers['Authorization'] = 'Bearer ' + _refreshToken;
            else if (accessToken) {
                options.headers['Authorization'] = 'Bearer ' + accessToken;
            }
            else
                options.headers['Authorization'] = 'Bearer ' + _accessToken;
        }
        else if (!withoutApikey) {
            options.headers['api_key'] = _apiKey;
        }
        console.log("options:", options);
        if (body)
            options.body = JSON.stringify(body);
        
        if (queryParams)
            uri = uri + '?' + querystring.encode(queryParams);
        console.log('POST: ', uri, options);
        let response = await _fetchFn(uri, options);
        if (response.status == '200' || response.status == '201' || response.status == '204') {
            if (returnText) {
                let bodyText = await response.text()
                console.log('Response - ', response.status, ' - Body text:', bodyText);
                return { code: "OK", data: bodyText };
            } else {
                let bodyText = await response.text()
                console.log('Response - ', response.status, ' - Body:', json2Obj(bodyText));
                return { code: "OK", data: bodyText ? json2Obj(bodyText) : null };
            }
        } else if (response.status == '401') {
            var refreshResult = await refreshToken(logOutIfSessionInvalid);
            console.log('AAAAAAAAAAAAAAAAAA POST refreshResult:', refreshResult);
            if (refreshResult.code == 'OK') {
                options.headers = { ...options.headers, Authorization: "Bearer " + refreshResult.data.access_token };
                options = { ...options, headers: options.headers };
                response = await _fetchFn(uri, options);
                let bodyText = await response.text()
                if (response.status == '200') {
                    return { code: "OK", data: bodyText ? json2Obj(bodyText) : null };
                }
                return { code: response.status, bodyText: bodyText, error: json2Obj(bodyText) };
            } else {
                validateForceLogout(refreshResult, true);
            }
        } else {
            let bodyText = await response.text()
            validateForceLogout(response, logOutIfSessionInvalid);
            return { code: response.status, bodyText: bodyText, error: json2Obj(bodyText) };
        }
    } catch (e) {
        let bodyText = await e.text();
        return { code: e.status, bodyText: bodyText, error: returnText ? bodyText : json2Obj(bodyText) };
    }
}

async function put({
    resourcePath,
    body,
    queryParams,
    withAccessToken = false,
    withoutApikey = false,
    logOutIfSessionInvalid = true,
    isRefreshToken,
    accessToken,
    returnText,
}) {
    try {
        let uri = getURI(resourcePath);
        var options = {};
        options.headers = initOptionHeader();
        options.method = "PUT";
        options.credentials = 'omit';
        if (withAccessToken == true || logOutIfSessionInvalid == true || isRefreshToken == true) {
            console.log("AAAAAAAAAAAAAAAAAAAA b111111111111111111111:");
            if (isRefreshToken)
                options.headers['Authorization'] = 'Bearer ' + _refreshToken;
            else if (accessToken) {
                options.headers['Authorization'] = 'Bearer ' + accessToken;
            }
            else
                options.headers['Authorization'] = 'Bearer ' + _accessToken;
        }
        else if (!withoutApikey) {
            options.headers['api_key'] = _apiKey;
        }
        console.log("PUT options:", options);
        if (body)
            options.body = JSON.stringify(body);
        
        if (queryParams)
            uri = uri + '?' + querystring.encode(queryParams);
        console.log('PUT: ', uri, options);
        let response = await _fetchFn(uri, options);
        if (response.status == '200' || response.status == '201' || response.status == '204') {
            if (returnText) {
                let bodyText = await response.text()
                console.log('Response - ', response.status, ' - Body text:', bodyText);
                return { code: "OK", data: bodyText };
            } else {
                let bodyText = await response.text()
                console.log('Response - ', response.status, ' - Body:', json2Obj(bodyText));
                return { code: "OK", data: bodyText ? json2Obj(bodyText) : null };
            }
        } else if (response.status == '401') {
            var refreshResult = await refreshToken(logOutIfSessionInvalid);
            console.log('AAAAAAAAAAAAAAAAAA PUT refreshResult:', refreshResult);
            if (refreshResult.code == 'OK') {
                options.headers = { ...options.headers, Authorization: "Bearer " + refreshResult.data.access_token };
                options = { ...options, headers: options.headers };
                response = await _fetchFn(uri, options);
                let bodyText = await response.text()
                if (response.status == '200') {
                    return { code: "OK", data: bodyText ? json2Obj(bodyText) : null };
                }
                return { code: response.status, bodyText: bodyText, error: json2Obj(bodyText) };
            } else {
                validateForceLogout(refreshResult, true);
            }
        } else {
            let bodyText = await response.text()
            validateForceLogout(response, logOutIfSessionInvalid);
            return { code: response.status, bodyText: bodyText, error: json2Obj(bodyText) };
        }
    } catch (e) {
        let bodyText = await e.text();
        return { code: e.status, bodyText: bodyText, error: returnText ? bodyText : json2Obj(bodyText) };
    }
}
