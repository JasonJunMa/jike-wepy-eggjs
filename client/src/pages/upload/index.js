import wepy from 'wepy';
import userauth from '../../components/auth/index';
import ImageUpload from '../../components/ImageUpload/index';

export default class AuthIndex extends wepy.page {
    config = {
        usingComponents: {
            'inaver': '../../components/inaver/inaver',
            'i-button': '../../components/iview/button/index',
            'wxc-popup': '../../components/@minui/wxc-popup/dist/index',
        },
    }
    components = {
        userauth,
        ImageUpload
    }

    data = {
        userinfo: '',
        coverlength: 3,
        coverimages: [],
    }

    computed = {

    }

    methods = {

    }

    events = {

    }

    onLoad() {

    }
}
