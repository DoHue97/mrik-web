import { httpUtil } from "./httpUtil";
import { createCommonResult, createResult, ErrorCodes } from "./resultUtil";

export const offers = {
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
            resourcePath: '/offers',
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
        console.log("AAAA offers getList exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function get(id){
    try {
        let response = await httpUtil.get({
            resourcePath: '/offers/' + id,
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA offers get exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function add({
    name,
    code,
    content,
}){
    try {
        let response = await httpUtil.post({
            resourcePath: '/offers',
            body: {
                name,
                code,
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
        console.log("AAAA offers add exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function update({
    name,
    code,
    content,
}, id){
    try {
        let response = await httpUtil.put({
            resourcePath: '/offers/' + id,
            body: {
                name,
                code,
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
        console.log("AAAA offers update exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}

async function sendDelete(id){
    try {
        let response = await httpUtil.sendDelete({
            resourcePath: '/offers/' + id,
            withAccessToken: true,
        })
        if(response.code == 'OK'){
            return createResult(ErrorCodes.OK, response.data);
        } else {
            return createCommonResult(response);
        }
    } catch (error) {
        console.log("AAAA offers deleteOffer exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}
