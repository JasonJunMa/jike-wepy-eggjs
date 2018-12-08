import wepy from 'wepy';

export default class MediaShow extends wepy.component {
    props= {
        items: {
            type: Array
        },
        readmore: {
            type: String,
            default: ''
        }
    }
    data = {
        imageView2: '',
        imagePreview: ''
    }

    computed = {
        images() {
            let that = this;
            if (this.items && this.items.length !== 0) {
                return this.items.filter(item => {
                    return item.infoType === 'image';
                }).map(item => {
                    return item.content + that.imagePreview;
                });
            }
            return [];
        }
    }

    methods = {
        preViewImage(item) {
            wx.previewImage({
                current: item.content + this.imagePreview,
                urls: this.images,
                success: function(res) {
                    // success
                }
            });
        },
        goweburl() {
            wx.navigateTo({
                url: '/pages/webUrl/index?url=' + this.readmore
            });
        }
    }

    onLoad() {
    }
}
