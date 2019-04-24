
// plugin/components/inaver/inaver.js
import {getsysteminfo} from '../../util/api/systeminfo';
import { getStatusBar } from './../../util/api/systeminfo';

Component({
  /**
   * 组件的属性列表
   */
    properties: {
        fixedtop: {
            type: Boolean,
            value: true
        },
        background: {
            type: String,
            value: 'rgba(0, 0, 0,1)'
        },
        colorTheme: {
            type: String,
            value: 'white'
        },
        showBack: {
            type: Boolean,
            value: true
        },
        protectCapsule: {
            type: Boolean,
            value: true
        },
        toBack: {
            type: Boolean,
            value: true
        },
        protectInaver: {
            type: Boolean,
            value: true
        },
        title: {
            type: String,
            value: ''
        },
        isloading: {
            type: Boolean,
            value: false
        }
    },

  /**
   * 组件的初始数据
   */
    data: {
        isIOS: true,
        statusbarh: 20,
        barh: 50,
    },

    lifetimes: {
        attached: function() {
            let that = this;
            getStatusBar().then(res => {
                that.setData({
                    statusbarh: res
                });
            });
        }
    },

  /**
   * 组件的方法列表
   */
    methods: {
        isIOS(system = 'iOS 0.0.1') {
            system = system.toLowerCase();
            let index = system.indexOf('ios');
            return index >= 0;
        },
        goBack: function () {
            if (this.data.toBack) {
                wx.navigateBack({
                    delta: 1
                });
                let pages = getCurrentPages();
                if (pages.length === 1) {
                    wx.redirectTo({
                        url: '/pages/welcome/index'
                    });
                }
            }
            this.triggerEvent('tapBackEvent', {}, {});
        },
        gotop() {
            wx.pageScrollTo({
                scrollTop: 0
            });
        }
    }
});
