Component({
    properties: {
        url: {
            type: String,
            value: ''
        },
        refid: {
            type: String,
            value: ''
        },
        refindex: {
            type: Number,
            value: 0
        }
    },
    data: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        id: 'video',
        videocontext: null,
    },
    lifetimes: {
        ready() {
            // console.log('ready');
            let id = this.data.refid + this.data.id;
            this.setData({
                id
            });

            let that = this;
            let query = wx.createSelectorQuery();
            query.select(this.data.refid).boundingClientRect();
            query.exec(function(res) {
                // console.log(res);
                let value = res[0];
                if (value) {
                    // let videocontext = wx.createVideoContext(id, that);
                    // videocontext.play();
                    that.setData({
                        top: value.top,
                        left: value.left,
                        width: value.width,
                        height: value.height,
                    });
                }
            });
        },
    },
    methods: {
        videoplaywraptap(e) {
            // this.data.videocontext.pause();
            e.detail.ref = this.data.refindex;
            this.triggerEvent('videoplaywraptap', e.detail);
        },
        retrunfalse(e) {
            return false;
        }
    }
});
