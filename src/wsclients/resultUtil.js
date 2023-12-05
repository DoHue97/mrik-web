

export const ErrorCodes = {
	OK: 'OK',
	UNKNOWN: 'UNKNOWN',
	UNCLASSIFIED_ERROR: 'UNCLASSIFIED_ERROR',
	INVALID_LOGIN: 'INVALID_LOGIN',
}

export function createResult(errorCode, data) {
	return {
		code: errorCode,
		data: data
	}
}

export function createCommonResult(response, requestType) {
	console.log("11111 response:", response);
	if (response.code == 'OK' || response.code == '204')
		return createResult(ErrorCodes.OK, response.data);
	else {
		return createResult(ErrorCodes.UNCLASSIFIED_ERROR, response.error);
	}
}