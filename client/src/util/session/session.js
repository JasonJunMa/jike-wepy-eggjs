var Session = {
    get: function (key) {
        let res = wx.getStorageSync(key);
        if (res) {
            if (typeof res === 'object') {
                if (res.expirtime > new Date().getTime()) {
                    return res;
                }
            } else {
                return res;
            }

        }
        return null;
    },

    set: function (key, session) {
        let expirtime = new Date().setDate(new Date().getDate() + 1);
        if (typeof session === 'object') { session.expirtime = expirtime; }
        wx.setStorageSync(key, session);
    },

    clear: function (key) {
        wx.removeStorageSync(key);
    },

    setsync: function (key, session, callback) {
        wx.setStorage({
            key: key,
            data: session,
            success: function(res) {
                if (callback) { callback(res); };
            }
        });
    }

};

module.exports = Session;
