import { httpUtil } from "./httpUtil";
import { createCommonResult, createResult, ErrorCodes } from "./resultUtil";

export const orders = {
    getList,
    get,
    sendDelete,
    actions, //approve, cancel,...
}

async function getList({
    code,
    number,
    created_date,
    state,
    email,
    phone,
    search_value,
}){
    try {
        let response = await httpUtil.get({
            resourcePath: '/orders',
            queryParams: {
                code,
                number,
                created_date,
                state,
                email,
                phone,
                search_value,
            },
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA orders getList exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function get(id){
    try {
        let response = await httpUtil.get({
            resourcePath: '/orders/' + id,
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA orders get exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function sendDelete(id){
    try {
        let response = await httpUtil.sendDelete({
            resourcePath: '/orders/' + id,
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA orders deleteOrder exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function actions({
    action,
}, id){
    try {
        let response = await httpUtil.put({
            resourcePath: '/orders/' + id,
            body: {
                action: action
            },
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA orders actions exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}
