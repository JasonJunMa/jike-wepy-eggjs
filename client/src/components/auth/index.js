import wepy from 'wepy';
import {
    updateUser, getlocalUserInfo
} from '../../util/weapp-clien-sdk/login';
import {openConfirm} from '../../util/utils';

export default class UserAuth extends wepy.component {
    config = {
        usingComponents: {
            'wxc-popup': '../../components/@minui/wxc-popup/dist/index',
            'i-button': '../../components/iview/button/index'
        }
    }
    hideMask(selector) {
        let $mask = this.$wxpage.selectComponent(selector);
        $mask && $mask.hide();
    }
    openMask(selector) {
        let $mask = this.$wxpage.selectComponent(selector);
        $mask && $mask.show();
    }
    props = {

    }
    data = {

    }
    methods = {
        retrunfalse() {
            return false;
        },
        getUserInfo(res) {
            if (this.loading) return;
            let obj = res.detail;
            this.loading = true;
            let that = this;
            wx.showToast({
                title: '正在认证',
                icon: 'loading', // loading
                duration: 1500,
                mask: true
            });
            updateUser(obj).then(res => {

                that.loading = false;
                wx.hideToast();
                that.hideMask('.J_Popup');
                that.$apply();
                that.$emit('getuserinfo', res);
            }).catch(err => {
                that.loading = false;
                that.$apply();
                openConfirm('授权错误', '请重新尝试', function() {

                }, () => {

                });
            });
        }
    }
    watch = {

    }
    computed = {

    }
    onLoad() {
        let that = this;
        getlocalUserInfo().then(res => {
            // console.log(res);
            that.$emit('getuserinfo', res);
        }).catch(err => {
            that.openMask('.J_Popup');
        });
    }
}
