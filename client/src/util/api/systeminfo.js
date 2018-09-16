import {seesion, constants} from '../session/index';

export function isIOS(system = 'iOS 0.0.1') {
    system = system.toLowerCase();
    let index = system.indexOf('ios');
    return index >= 0;
}

export function getsysteminfo() {
    return new Promise((resolve, reject) => {
        let systeminfo = seesion.get(constants.systeminfo);
        if (systeminfo) {
            resolve(systeminfo);
            return;
        }
        wx.getSystemInfo({
            success: function(res) {
                res.isIOS = isIOS(res.system);
                res.isAndroid = !res.isIOS;
                seesion.set(constants.systeminfo, res);
                resolve(res);
            },
            fail: function(err) {
                reject(err);
            }
        });
    });
}
