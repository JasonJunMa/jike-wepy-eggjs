'use strict';

const Service = require('egg').Service;
const tenpay = require('tenpay');

class OrderpayService extends Service {
    constructor(ctx) {
        super(ctx);
        // refund_url: '',
        const pfx = require('fs').readFileSync(require('path').join(__dirname, '../public/cert/apiclient_cert.p12'));
        this.payconfig = {
            appid: '',// 小程序appid
            mchid: '', //商户号
            partnerKey: '', //支付密匙 在微信支付后台设置
            pfx, // 支付证书 如上定义， 放在/public/cert目录下
            notify_url: '域名/api/orderpay/notify', // 支付成功回调接口
            refund_url: '',  // 退款成功回调接口
            spbill_create_ip: ''  // 服务器ip
        };
    }

    // 提现接口  withdraw 提现金额/元
    async transfers(withdraw) {
        const user = this.ctx.state.user.data._id;
        const ouser = await this.ctx.model.User.findOne({ _id: user }, 'openid  certification.name');
        const api = new tenpay(this.payconfig);
        const result = await api.transfers({
            partner_trade_no: withdraw._id.toHexString(),
            openid: ouser.openid,
            re_user_name: ouser.certification.name,
            amount: withdraw.value * 100,
            desc: new Date().toLocaleString() + ':激励奖金提现'
        });
        // console.log(result);
        return result;
    }
    
    // 创建支付订单， 生成订单id， 该id用于提交给微信支付 支付
    async create(payload) {
        payload.user = this.ctx.state.user.data._id;
        return this.ctx.model.Orderpay.create(payload);
    }

    async paysuccess(id) {
        const orderpay = await this.ctx.model.Orderpay.findOne({ _id: id });
        if (orderpay) {
            // 支付成功业务处理
        }
    }
    // 拉起支付
    /**
     * 
     * @param {} payload 
     * {
     *     total_fee: 支付金额（分）
     *     body: 支付明细
     * }
     */
    async pullpay(payload) {
        const api = new tenpay(this.payconfig);
        const user = this.ctx.state.user.data._id;
        const openid = await this.service.user.getopenid(user);
        const orderpay = await this.create({
            payed: false,
            insertTime: new Date(),
            cost: payload.total_fee
        });
        if (payload.total_fee === 0) {
            await this.paysuccess(orderpay.id);
            return {
                iszero: true
            };
        }
        const result = await api.getPayParams({
            out_trade_no: orderpay._id.toHexString(),
            body: payload.body,
            total_fee: payload.total_fee,
            openid
        });
        return result;
    }

    async refundsuccess(id) {
        const orderpay = await this.ctx.model.Orderpay.findOne({ _id: id }, 'message payed cost _id');
        // await
        if (orderpay) {
            // 退款成功
        }
    }

    //退款
    async refund(id) {
        // let message = await this.ctx.model.Message.findOne({_id: id}, 'payed cost')
        const orderpay = await this.ctx.model.Orderpay.findOne({ message: id }, 'payed cost _id refundstatus');
        if (orderpay.refundstatus === 2) {
            return {
                result: false,
                error: '不可重复退款'
            };
        }
        if (orderpay.cost === 0) {
            await this.refundsuccess(orderpay._id);
            return {
                result: true,
                error: '退款成功'
            };
        }
        if (orderpay && orderpay.payed) {
            const api = new tenpay(this.payconfig);
            await this.ctx.model.Orderpay.update({ _id: orderpay._id }, { refundstatus: 1 });
            const result = await api.refund({
                out_trade_no: orderpay._id.toHexString(),
                out_refund_no: orderpay._id.toHexString(),
                total_fee: orderpay.cost,
                refund_fee: orderpay.cost
            });
            if (result.result_code === 'SUCCESS') {
                await this.refundsuccess(orderpay._id);
            }
            return {
                result: true,
                error: '退款成功'
            };
        }
        return {
            result: false,
            error: '订单未支付'
        };
    }
}

module.exports = OrderpayService;
