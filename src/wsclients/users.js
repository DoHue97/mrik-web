import { httpUtil } from "./httpUtil";
import { createCommonResult, createResult, ErrorCodes } from "./resultUtil";

export const users = {
    getList,
    get,
    add,
    update,
    sendDelete,
}

async function getList({
    name,
    code,
    search_value,
}){
    try {
        let response = await httpUtil.get({
            resourcePath: '/users',
            queryParams: {
                name,
                code,
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
        console.log("AAAA users getList exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function get(id){
    try {
        let response = await httpUtil.get({
            resourcePath: '/users/' + id,
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA users get exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function add({
    email,
    first_name,
    last_name,
    phone,
}){
    try {
        let response = await httpUtil.post({
            resourcePath: '/users',
            body: {
                email,
                first_name,
                last_name,
                phone,
            },
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA users add exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function update({
    email,
    first_name,
    last_name,
    phone,
}, id){
    try {
        let response = await httpUtil.put({
            resourcePath: '/users/' + id,
            body: {
                email,
                first_name,
                last_name,
                phone,
            },
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA users update exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function sendDelete(id){
    try {
        let response = await httpUtil.sendDelete({
            resourcePath: '/users/' + id,
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA users sendDelete exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}
