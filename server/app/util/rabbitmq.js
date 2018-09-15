'use strict';
const amqp = require('amqp');
const mqconfig = {
    host: '111.230.222.156',
    port: 5672,
    login: 'admin',
    password: 'hu!@#$1234',
    connectionTimeout: 10000,
    exchange: 'msgNotice',
    routingKey: 'hubbleMsg',
    exchangeType: 'direct',
    queue: 'hubbleMsg',
    reconnect: false
};

const connection = amqp.createConnection(mqconfig);
connection.setImplOptions({
    reconnect: false
});

connection.on('error', function(e) {
    console.log('Error from amqp: ', e);
});

let _exchange = null;
let _queue = null;
connection.on('ready', function () {
    connection.exchange(mqconfig.exchange, { type: mqconfig.exchangeType, autoDelete: false, durable: true }, exchange => {
        _exchange = exchange;
        console.log('_exchange');
        connection.queue(mqconfig.queue, { durable: false, autoDelete: false }, queue => {
            console.log('_queue');
            _queue = queue;
            _queue.bind(mqconfig.exchange, mqconfig.routingKey);
            // connection.disconnect();
        });

    });

});


function senMsg(msg) {
    return new Promise((resolve, reject) => {
        if (_exchange) {
            _exchange.publish(mqconfig.routingKey, msg, { deliveryMode: 2 }, res => {
                console.log(res);
            });
            resolve(msg);
        } else {
            reject('false');
        }
    });

}


module.exports = senMsg
;
