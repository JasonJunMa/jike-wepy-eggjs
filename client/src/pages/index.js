import wepy from 'wepy';
import inaver from '../components/inaver/inaver';

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText: '组件列表'
    }
    components = {
        inaver
    }

    data = {
        TitleText: '组件列表'
    }

    computed = {

    }

    methods = {

    }

    events = {

    }

    onLoad() {

    }
}
