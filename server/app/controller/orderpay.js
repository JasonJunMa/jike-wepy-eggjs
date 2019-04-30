'use strict';

const Controller = require('egg').Controller;
const xml2js = require('xml2js').parseString;

class OrderpayController extends Controller {
    async notify() {  // 支付成功回调处理
        const {
            ctx,
            service
        } = this;
        let data = '';
        ctx.req.setEncoding('utf8');
        ctx.req.on('data', function(chunk) {
            data += chunk;
        });
        const getxml = await new Promise(function(resolve) {
            ctx.req.on('end', function() {
                resolve(data);
            });
        });
        const parseObj = await new Promise(function(resolve) {
            xml2js(getxml, {
                explicitArray: false,
            }, function(err, json) {
                resolve(json);
            });
        });
        if (parseObj.xml.return_code === 'SUCCESS') {
            const id = parseObj.xml.out_trade_no;
            service.orderpay.paysuccess(id);
        }
        // console.log('parseObj :', typeof parseObj);
        // console.log(parseObj);
        ctx.body = 'success';
    }

    async refundnotify() {
        const {
            ctx,
            service
        } = this;
        let data = '';
        ctx.req.setEncoding('utf8');
        ctx.req.on('data', function(chunk) {
            data += chunk;
        });
        const getxml = await new Promise(function(resolve) {
            ctx.req.on('end', function() {
                resolve(data);
            });
        });
        const parseObj = await new Promise(function(resolve) {
            xml2js(getxml, {
                explicitArray: false,
            }, function(err, json) {
                resolve(json);
            });
        });
        if (parseObj.xml.return_code === 'SUCCESS') {
            const id = parseObj.xml.out_trade_no;
            service.orderpay.refundsuccess(id);
        }
        // console.log('parseObj :', typeof parseObj);
        console.log(parseObj);
        ctx.body = 'success';
    }

    async refund() { // 退款回调成功处理
        const {
            ctx,
            service
        } = this;
        const id = ctx.params.id || {};
        const res = await service.orderpay.refund(id);
        ctx.helper.success(ctx, res);
    }

    // 拉起支付
    async pullpay() {   // 拉起支付
        const {
            ctx,
            service
        } = this;
        const payload = ctx.request.body || {};
        const res = await service.orderpay.pullpay(payload);
        ctx.helper.success(ctx, res);
    }
}

module.exports = OrderpayController;
