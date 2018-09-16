import wepy from 'wepy';
import {getsysteminfo} from '../../util/api/systeminfo';
export default class Inaver extends wepy.component {
    props = {
        background: {
            type: String,
            default: 'rgba(70, 62, 77,0.9)'
        },
        colorTheme: {
            type: String,
            default: 'white'
        },
        showBack: {
            type: Boolean,
            default: true
        },
        showHome: {
            type: Boolean,
            default: true
        },
        protectCapsule: {
            type: Boolean,
            default: true
        },
        toBack: {
            type: Boolean,
            default: true
        },
        checkCompatibility: {
            type: Boolean,
            default: true
        },
        smartBack: {
            type: Boolean,
            default: true
        },
        protectInaver: {
            type: Boolean,
            default: true
        }
    }

    computed = {
        getColor: function() {
            if (this.colorTheme === 'black') {
                return '#000';
            } else {
                return '#FFF';
            }
        },
        // getSmartShowBack: function() {
        //     return this.showBack;
        // }
    }
    watch = {}
    data = {
        isIOS: true,
        loading: true,
    }
    onLoad() {
        let that = this;
        getsysteminfo().then(res => {
            console.log(res);
            that.isIOS = res.isIOS;
            that.$apply();
        });
    }
    onReady() {
        this.loading = false;
    }
    methods = {
        goBack: function() {
            if (this.toBack) {
                wepy.navigateBack();
            }
            this.$emit('back');
        }
    }
}
