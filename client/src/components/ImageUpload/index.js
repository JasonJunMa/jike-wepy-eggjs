import wepy from 'wepy';
import { upload } from '../../util/api/upload';

export default class ImageUpload extends wepy.component {
    config = {

    }
    props = {
        // {
        //     url: '',
        //     loading: false,
        // }
        showimages: {
            type: Array,
            twoWay: true,
            default: [],
        },
        numbers: {
            type: Number,
            default: 1,
        },
        title: {
            type: String,
            default: '上传的图片'
        }
    }
    data = {

    }

    async addImages() {
        wx.showToast({
            title: '打开相册',
            icon: 'loading', // loading
            duration: 1500,
            mask: true
        });
        let files = await wepy.chooseImage({
            count: this.numbers - this.showimages.length, // 最多可以选择的图片张数,
            sizeType: ['compressed'],
        });
        let length = this.showimages.length;
        let plus = files.tempFilePaths.map(item => {
            return {
                url: item,
                loading: true,
            };
        });
        let that = this;
        this.showimages = this.showimages.concat(plus);
        this.$apply();
        for (let i = 0; i < files.tempFilePaths.length; i++) {
            const imageUrl = files.tempFilePaths[i];
            wx.showToast({
                title: '上传' + (i + 1) + '/' + files.tempFilePaths.length + '中',
                icon: 'loading', // loading
                duration: 3500,
                mask: true
            });
            // let res = await upload(imageUrl);
            upload(imageUrl, i).then(res => {

                that.showimages[res.index] = {
                    url: res.url,
                    loading: false,
                };
                if (res.index === length) {
                    wx.hideToast();
                }
                that.$apply();
            }).catch(index => {
                that.showimages.splice(index, 1);
                that.$apply();
            });
        }
    }

    methods = {
        previewImage(index) {
            let url = this.showimages[index].url;
            let images = this.showimages.map(item => {
                return item.url;
            });
            wepy.previewImage({
                current: url,
                urls: images
            });
        },
        deleteImage (index) {
            this.showimages.splice(index, 1);
        },
        chooseImage() {
            this.addImages();
        },
    }
    watch = {

    }
    computed = {

    }
}
