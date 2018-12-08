import wepy from 'wepy';
import userauth from '../../components/auth/index';
import MediaShow from '../../components/MediaShow/index';
import { seesion, constants } from '../../util/session';

export default class AuthIndex extends wepy.page {
    config = {
        usingComponents: {
            'inaver': '../../components/inaver/inaver',
            'ky-video': '../../components/videoplay/index'
        },
        navigationBarTextStyle: 'black'
    }
    components = {
        userauth,
        MediaShow
    }

    data = {
        showplayer: false,
        playurl: '',
        playid: ''
    }

    computed = {

    }

    methods = {
        showplayerhandler(e) {
            let refid = '#' + e.currentTarget.dataset.refid;
            let url = 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400';
            this.playurl = url;
            this.playid = refid;
            this.showplayer = true;
            this.$apply();
        },
        videoplaywraptap(e) {
            this.showplayer = false;
            this.playurl = '';
            this.playid = '';
        },
    }

    onShow() {

    }

    events = {

    }

    onLoad() {

    }
}
