/* eslint-disable */
// 倒计时
export const countdown = ({remain, timeout, cb, end}) => {
    let date2second = 24 * 60 * 60 * 1000;
    let hour2second = 60 * 60 * 1000;
    let minute2second = 60 * 1000;

    let date = parseInt(remain / date2second);
    let hour = parseInt((remain - date * date2second) / hour2second);
    let minute = parseInt((remain - date * date2second - hour * hour2second) / minute2second);
    let second = parseInt((remain - date * date2second - hour * hour2second - minute * minute2second) / 1000, 10);
    let millisecond = parseInt((remain - date * date2second - hour * hour2second - minute * minute2second - second * 1000) / 100);

    setTimeout(() => {
        cb({date, hour, minute, second, millisecond});
        remain -= timeout;
        if (remain > 0) {
            countdown({remain, timeout, cb, end});
        } else {
            end();
        }
    }, timeout);
};

// 时间戳格式化
export const dateFormat = (fmt, timestamp) => {
    let date = new Date(timestamp * 1000);
    let o = {
        'M+': date.getMonth() + 1,                     //月份
        'd+': date.getDate(),                          //日
        'h+': date.getHours(),                         //小时
        'm+': date.getMinutes(),                       //分
        's+': date.getSeconds(),                       //秒
        'q+': Math.floor((date.getMonth() + 3) / 3),   //季度
        'S': date.getMilliseconds()                    //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};
