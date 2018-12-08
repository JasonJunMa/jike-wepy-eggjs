export function openCancel(title = '提示', content = '简单的提示', confirm, cancel) {
    wx.showModal({
        title: title,
        content: content,
        cancelColor: '#22c184',
        confirmColor: '#000000',
        success: function(res) {
            if (res.confirm) {
                confirm()
            } else if (res.cancel) {
                if (cancel) {
                    cancel()
                }
                console.log('用户点击取消')
            }
        }
    })
}

export function openConfirm(title = '提示', content = '简单的提示', confirm, cancel, confirmText = '确认', cancelText = '取消') {
    wx.showModal({
        title: title,
        content: content,
        confirmText: confirmText,
        cancelText: cancelText,
        confirmColor: '#22c184',
        success: function(res) {
            if (res.confirm) {
                confirm()
            } else if (res.cancel) {
                if (cancel) {
                    cancel()
                }
                console.log('用户点击取消')
            }
        }
    })
}
/**
 * error 文字
 */
export function showError(error) {
    wx.showToast({
        title: error,
        icon: 'none', // loading
        duration: 1500,
        mask: false
    })
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return timeStr
}

export function formatTime(time, option) {
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

/**
 *
 * @param {Date}  time 要操作的时间
 * @param {Number} number 要增加的月份 可以为负数
 */
export function plusMonth(time = new Date(), number = 1) {
    time = new Date(time)
    let month = time.getMonth()
    let totalmonth = month + number
    time.setMonth(totalmonth)
    // 打破引用
    return time
}

export function plusDay(time = new Date(), number = 1) {
    time = new Date(time)
    let day = time.getDate()
    let totalday = day + number
    time.setDate(totalday)
    // 打破引用
    return time
}

/**
 * 获取两个时间之间的天数
 * @param {String} startTime -- 开始时间 e. 2018-07-10
 * @param {String} endTime -- 结束时间  e. 2018-07-11
 * @returns {Number} -- 时间间隔 e. 1
 */
export function getIntervalDay(startTime, endTime) {
    startTime = new Date(startTime)
    endTime = new Date(endTime)
    let min = endTime.getTime() - startTime.getTime()
    let days = Math.floor(min / (24 * 3600 * 1000))
    return days
}

export function getMonthDay(now = new Date()) {
           /* 获取当前月份 */
    const curMonth = new Date(now).getMonth()
           /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    now.setMonth(curMonth + 1)
           /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
    now.setDate(0)
           /* 返回当月的天数 */
    return now.getDate()
}

/**
 * 比较两个时间,但是不关心day time1 大 返回 true time2大返回false 如果完全一样 true
 * @param {Date} time1 --时间1
 * @param {Date} time2 --时间2
 * @return {Boolean} res -- ture || fals
 */
export function T1GTT2(time1 = new Date(), time2 = new Date()) {
    const h1 = time1.getHours()
    const h2 = time2.getHours()
    const m1 = time1.getMinutes()
    const m2 = time2.getMinutes()
    if (h1 > h2) {
        return true
    } else if (h1 === h2) {
        return m1 >= m2
    }
    return false
}

/**
 *
 * @param {Number} total --总共的秒
 * @param {string} inserttime --插入时间
 */
export function restime(total, inserttime) {
    let now = new Date().getTime()
    inserttime = new Date(inserttime).getTime()
    let intval = parseInt((now - inserttime) / 1000)
    let restime = total - intval
    return restime
}

export function makephonecall(phone) {
    openConfirm('拨打电话', '拨打: ' + phone, () => {
        wx.makePhoneCall({
            phoneNumber: phone
        })
    })
}

export function getdistance(distance = 0) {
    if (distance < 1000) {
        distance = distance.toFixed(1)
        return distance + ' m'
    } else {
        distance = (distance / 1000).toFixed(1)
        return distance + ' km'
    }
}

export function ToFixed(number, s) {
    return parseInt(number * Math.pow(10, s) + 0.5) / Math.pow(10, s)
}
