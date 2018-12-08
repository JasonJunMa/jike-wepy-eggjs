import wepy from 'wepy';
import { openConfirm } from '../../util/utils';

export default class MediaAdd extends wepy.component {
    props= {
        item: {
            type: Object,
            default: '',
            twoWay: true
        },
        index: {
            type: Number,
            default: 0
        }
    }

    data ={
        imageView2: '?imageView2/2/w/300'
    }

    methods = {
        edit() {
            this.item.isEdit = !this.item.isEdit;
        },
        textInput(e) {
            this.item.content = e.detail.value;
        },
        textInputblur() {
            this.item.isEdit = false;
        },
        remove() {
            let that = this;
            openConfirm('提醒', '是否删除该项', () => {
                that.$emit('removeTextInfo', this.index);
            });
        },
        movedown() {
            this.$emit('movedownTextInfo', this.index);
        },
        moveup() {
            this.$emit('moveupTextInfo', this.index);
        },
        changeImage() {
            this.$emit('mediaInfoChangeImage', this.index);
        }
    }
}
