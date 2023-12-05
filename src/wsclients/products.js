import { httpUtil } from "./httpUtil";
import { createCommonResult, createResult, ErrorCodes } from "./resultUtil";

export const products = {
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
            resourcePath: '/products',
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
        console.log("AAAA products getList exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function get(id){
    try {
        let response = await httpUtil.get({
            resourcePath: '/products/' + id,
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA products get exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function add({
    name,
    code,
    description,
    content,
}){
    try {
        let response = await httpUtil.post({
            resourcePath: '/products',
            body: {
                name,
                code,
                description,
                content,
            },
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA products add exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function update({
    name,
    code,
    description,
    content,
}, id){
    try {
        let response = await httpUtil.put({
            resourcePath: '/products/' + id,
            body: {
                name,
                code,
                description,
                content,
            },
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA products update exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function sendDelete(id){
    try {
        let response = await httpUtil.sendDelete({
            resourcePath: '/products/' + id,
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA products sendDelete exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}
