import { httpUtil } from "./httpUtil";
import { ErrorCodes, createResult, createCommonResult } from "./resultUtil";

export const authentication = {
    authenticate,
}

async function authenticate(contact, startSession = true){
    try {
        let response = await httpUtil.post({
            resourcePath: '/users/authenticate',
            body: contact,
            logOutIfSessionInvalid: false,
        });
        if (startSession == true && response.code == "OK" && response.data && response.data.access_token) {
            httpUtil.startSession(response.data);
        }
        if(response.code == 'OK'){
            if(response.data.access_token){
                return createResult(ErrorCodes.OK, response.data);
            } else {
                return createResult(ErrorCodes.INVALID_LOGIN, response.error);
            }
        } else {
            return createResult(ErrorCodes.UNCLASSIFIED_ERROR, response.error);
        }
    } catch (error) {
        console.log("AAAA authenticate exception: ", error)
        return createResult(ErrorCodes.UNKNOWN, error);
    }
}
