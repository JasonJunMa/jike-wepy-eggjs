// components/component-tag-name.js
Component({
    properties: {
        ref: {
            type: String,
            value: ''
        }
    },
    methods: {
        saveFormId: function (e) {
            e.detail.ref = this.data.ref
            this.triggerEvent('formbtnsubmit', e.detail)
        }
    }
})
