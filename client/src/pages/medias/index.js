import wepy from 'wepy';
import userauth from '../../components/auth/index';
import MediaShow from '../../components/MediaShow/index';
import { seesion, constants } from '../../util/session';

export default class AuthIndex extends wepy.page {
    config = {
        usingComponents: {
            'inaver': '../../components/inaver/inaver',
            'i-button': '../../components/iview/button/index',
            'wxc-popup': '../../components/@minui/wxc-popup/dist/index',
            'wxc-abnor': '../../components/@minui/wxc-abnor/dist/index',
        },
    }
    components = {
        userauth,
        MediaShow
    }

    data = {
        userinfo: '',
        textInfos: [],
        readmore: ''
    }

    computed = {

    }

    methods = {
        goaddtextInfos() {
            let textInfos = JSON.stringify(this.textInfos);
            wx.navigateTo({
                url: './mediaadd?textInfos=' + textInfos + '?readmore=' + this.readmore
            });
        }
    }

    onShow() {
        /** 在添加图文 */
        this.textInfos = this.$wxpage.data.textInfos || this.textInfos;
        this.readmore = this.$wxpage.data.readmore || this.readmore;
    }

    events = {

    }

    onLoad() {

    }
}
