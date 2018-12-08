import {constants, seesion} from '../session/index';

export function getToken() {
    let tokenobj = seesion.get(constants.token);
    if (tokenobj && tokenobj !== null) {
        return tokenobj.token;
    } else {
        return '';
    }
}

export function buildAuthHeaders() {
    let token = 'Bearer ' + getToken();
    let headers = {};
    headers['Authorization'] = token;
    return headers;
}
