import { httpUtil } from "./httpUtil";
import { createCommonResult, createResult, ErrorCodes } from "./resultUtil";

export const wallets = {
    getList,
}

async function getList({
    email,
    phone,
    search_value,
}){
    try {
        let response = await httpUtil.get({
            resourcePath: '/wallets',
            queryParams: {
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
        console.log("AAAA wallets getList exception: ", error);
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}