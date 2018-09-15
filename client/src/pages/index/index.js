import wepy from 'wepy';
import {featchData} from '../../utils/api/index';
export default class Index extends wepy.page {
    config = {
        enablePullDownRefresh: true
    }
    data = {
        storeInfo: [],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 500,
        storeName: '',
        className: '',
        oldPrice: 0,
        newPrice: 0

    }
    methods = {
        bindChange(e) {
            let index = e.detail.current;
            this.cityStoreInfo(index);
        }
    }
    cityStoreInfo(index) {
        this.storeName = this.storeInfo[index].storeName;
        this.className = this.storeInfo[index].className;
        this.oldPrice = this.storeInfo[index].oldPrice;
        this.newPrice = this.storeInfo[index].newPrice;
    }
    featchdata() {
        let that = this;
        let query = {cityName: '西安市'};
        return new Promise((resolve, reject) => {
            featchData(query).then(res => {
                that.storeInfo = res;
                that.cityStoreInfo(0);
                that.$apply();
                resolve();
            });
        });
    }
    getlocation() {
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                console.log(latitude);
                console.log(longitude);
            }
        });
    }
    onLoad(options) {
       // this.featchdata();
        this.getlocation(); // 只需要第一次加载页面进行位置获取（保存在缓存）
    }
    onShow() { // 每次进入页面进行数据渲染
        this.featchdata();
    }
    onPullDownRefresh() {
        this.featchdata().then(function() {
            wx.stopPullDownRefresh();
        });
    }
}
