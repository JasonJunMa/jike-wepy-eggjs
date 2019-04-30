import {
    request
} from '../request';

export function createformid(form_id) {
    return request('get', {form_id}, '/api/weapp/formid');
}
