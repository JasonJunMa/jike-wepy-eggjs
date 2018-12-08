import wepy from 'wepy';

export default class AuthIndex extends wepy.page {
    config = {
        usingComponents: {
            'inaver': '../../components/inaver/inaver',
        },
    }
    components = {
    }

    data = {
        ex1: '<inaver title="默认置顶标题栏" showBack="{{false}}" ></inaver>',
        ex2: '<inaver title="白色主题标题栏" colorTheme="black" background="#ffffff" showBack="{{true}}" fixedtop="{{false}}" ></inaver>',
        ex3: '<inaver title="页面加载中" isloading="{{true}}" fixedtop="{{false}}" ></inaver>',
        ex4: '<inaver bind:tapBackEvent="ontabbackhandler" title="自定义返回事件"  toBack="{{false}}" fixedtop="{{false}}" ></inaver>'
    }

    computed = {

    }

    methods = {
        ontabbackhandler(e) {
            console.log(e);
            wx.showModal({
                title: '点击了放回按钮',
                content: '在这个函数中你可以自定义跳转到任何地方',
            });
        },
    }

    onShow() {

    }

    events = {

    }

    onLoad() {

    }
}
