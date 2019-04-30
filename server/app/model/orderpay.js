'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const orderpaySchema = new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
        insertTime: { type: Date, defatul: Date.now },
        cost: { type: Number }, // 价格
        refundstatus: { type: Number, default: 0 }, // 0 默认值 1申请退款 2 退款成功
    });
    return mongoose.model('orderpay', orderpaySchema);
};
