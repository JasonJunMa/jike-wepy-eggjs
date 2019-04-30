'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const miniformidSchema = new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        formid: { type: String },
        expirationTime: { type: Date, default: Date.now, index: true },
        insertTime: { type: Date, default: Date.now }
    });
    return mongoose.model('miniformid', miniformidSchema);
};

// 用于收集用户formid