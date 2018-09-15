
'use strict';

function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000;
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') return [ '一', '二', '三', '四', '五', '六', '日' ][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return timeStr;
}

function formatTime(time, option) {
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚';
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
        return '1天前';
    }
    if (option) {
        return parseTime(time, option);
    }
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';

}

/**
 *
 * @param {Date}  time 要操作的时间
 * @param {Number} number 要增加的月份 可以为负数
 * @return {Date} -- 增加之后的时间
 */
function plusMonth(time = new Date(), number = 1) {
    time = new Date(time);
    const month = time.getMonth();
    const totalmonth = month + number;
    time.setMonth(totalmonth);
    // 打破引用
    return time;
}

function plusDay(time = new Date(), number = 1) {
    time = new Date(time);
    const day = time.getDate();
    const totalday = day + number;
    time.setDate(totalday);
    // 打破引用
    return time;
}

/**
 * 获取两个时间之间的天数
 * @param {String} startTime -- 开始时间 e. 2018-07-10
 * @param {String} endTime -- 结束时间  e. 2018-07-11
 * @return {Number} -- 时间间隔 e. 1
 */
function getIntervalDay(startTime, endTime) {
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    const min = endTime.getTime() - startTime.getTime();
    const days = Math.floor(min / (24 * 3600 * 1000));
    return days;
}

function groupBy(array, f) {
    const groups = {};
    array.forEach(function(o) {
        const group = f(o);
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function(group) {
        return {
            _id: group,
            number: groups[group].length
        };
    });
}

module.exports = {
    formatTime,
    parseTime,
    plusMonth,
    plusDay,
    getIntervalDay,
    groupBy
};
