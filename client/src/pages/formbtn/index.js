import wepy from 'wepy';
import { createformid } from './../../util/api/formid';

export default class FormBtnIndex extends wepy.page {
    config = {
        usingComponents: {
            'inaver': '../../components/inaver/inaver',
            'formbtn': '../../components/formbtn/index',
        },
        navigationBarTextStyle: 'black'
    }
    components = {
    }

    data = {
        formid: '',
        ref: ''
    }

    computed = {

    }

    methods = {
        tap(e) {
            console.log(e);
            let form_id = e.detail.formId;
            createformid(form_id);
            this.formid = form_id;
            this.ref = e.detail.ref;
        },
    }

    events = {

    }

    onLoad() {

    }
}
