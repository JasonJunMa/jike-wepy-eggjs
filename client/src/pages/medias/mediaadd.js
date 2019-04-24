import wepy from 'wepy';
import MediaAdd from '../../components/MediaAdd/index';
import {
    upload
} from '../../util/api/upload';

export default class Index extends wepy.page {
    config = {
        usingComponents: {
            'inaver': '../../components/inaver/inaver',
            'i-button': '../../components/iview/button/index',
        },
        'navigationBarTextStyle': 'black',
    }
    components = {
        mediaadd: MediaAdd
    }

    data = {
        store: {},
        textInfos: [],
        readmore: '',
    }

    computed = {

    }

    addtext() {
        this.textInfos.push({
            infoType: 'text',
            content: '',
            isEdit: true,
        });
    }
    addimage() {
        let that = this;
        wx.showToast({
            title: '打开相册',
            icon: 'loading', // loading
            duration: 1500,
            mask: true
        });
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
            success: function (res) {
                wx.showToast({
                    title: '正在上传',
                    icon: 'loading', // loading
                    duration: 3500,
                    mask: true
                });
                that.$apply();
                upload(res.tempFilePaths[0]).then(res => {
                    wx.hideToast();
                    that.textInfos.push({
                        content: res.url,
                        infoType: 'image'
                    });
                    that.$apply();
                });
            },
            fail: function (err) {
                console.log(err);
            }
        });
    }

    methods = {
        addtextinfos() {
            let that = this;
            wx.showActionSheet({
                itemList: ['文字', '图片'],
                success: function(e) {
                    // console.log(e);
                    if (e.tapIndex === 0) {
                        that.addtext();
                        that.$apply();
                    } else if (e.tapIndex === 1) {
                        that.addimage();
                    }
                }
            });
        },
        handleClick() {
            let pages = getCurrentPages();
            let prevpage = pages[pages.length - 2];
            prevpage.data.textInfos = this.textInfos;
            prevpage.data.readmore = this.readmore;
            wx.navigateBack({
                delta: 1
            });
        },
        onInput(e) {
            this.readmore = e.detail.value;
        }
    }
    events = {
        removeTextInfo(index) {
            this.textInfos.splice(index, 1);
        },
        mediaInfoChangeImage(index) {
            let that = this;
            wx.showToast({
                title: '打开相册',
                icon: 'loading', // loading
                duration: 1500,
                mask: true
            });
            wx.chooseImage({
                count: 1, // 最多可以选择的图片张数，默认9
                sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
                success: function (res) {
                    wx.showToast({
                        title: '正在上传',
                        icon: 'loading', // loading
                        duration: 3500,
                        mask: true
                    });
                    upload(res.tempFilePaths[0]).then(res => {
                        wx.hideToast();
                        that.textInfos[index].content = res.url;
                        that.$apply();
                    });
                },
                fail: function (err) {
                    console.log(err);
                }
            });
        },
        moveupTextInfo(index) {
            if (index === 0) {
                return;
            }
            let prv = Object.assign({}, this.textInfos[index - 1]);
            this.textInfos[index - 1] = this.textInfos[index];
            this.textInfos[index] = prv;
        },
        movedownTextInfo(index) {
            if (index === this.textInfos.length - 1) {
                return;
            }
            let next = Object.assign({}, this.textInfos[index + 1]);
            this.textInfos[index + 1] = this.textInfos[index];
            this.textInfos[index] = next;
        }
    }
    featchData() {
    }
    onLoad(options) {
        this.textInfos = JSON.parse(options.textInfos);
        this.readmore = options.readmore;
    }
    onShow() {

    }
    onReady() {

    }
    onPullDownRefresh() {

    }
}
