var Session = {
    get: function (key) {
        return wx.getStorageSync(key) || null;
    },

    set: function (key, session) {
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
    },

};

module.exports = Session;
