'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const imageSchema = new mongoose.Schema({
        name: { type: String, required: true },
        url: { type: String, required: true },
        cutUrl: { type: String, required: true },
        extra: { type: mongoose.Schema.Types.Mixed }
    });
    return mongoose.model('image', imageSchema);
};
