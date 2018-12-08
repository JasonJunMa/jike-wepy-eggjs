import wepy from 'wepy';
import userauth from '../../components/auth/index';
import { seesion, constants } from '../../util/session';

export default class AuthIndex extends wepy.page {
    config = {
        usingComponents: {
            'inaver': '../../components/inaver/inaver',
            'i-button': '../../components/iview/button/index',
            'wxc-popup': '../../components/@minui/wxc-popup/dist/index',
        },
    }
    components = {
        userauth
    }

    data = {
        userinfo: ''
    }

    computed = {

    }

    methods = {
        handleClick() {
            let token = seesion.get(constants.token);
            token.userinfo = null;
            seesion.set(constants.token, token);
            this.userinfo = '';
            wx.redirectTo({
                url: '/pages/mine/index'
            });
        }
    }

    events = {
        getuserinfo(userinfo) {
            this.userinfo = JSON.stringify(userinfo);
        }
    }

    onLoad() {

    }
}
