var length = 5;

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function countdown(that) {
    console.log('count down');
    var seconds = that.data.seconds;
    console.log(seconds);
    var captchaLabel = that.data.captchaLabel;
    if (seconds <= 1) {
        captchaLabel = '获取验证码';
        seconds = length;
        that.setData({
            captchaDisabled: false
        });
    } else {
        captchaLabel = --seconds + '秒后重新发送'
    }
    that.setData({
        seconds: seconds,
        captchaLabel: captchaLabel
    });
}

/**
 * 智能倒计时
 * XX天XX时XX秒
 * 不足1天时转换为XX时XX分XX秒
 */
function countdownIntellect(timestamp) {
    var endDate = new Date(tsFormatTime(timestamp, "Y/M/D h:m:s"))

    //获取结束时间  
    var end = endDate.getTime();
    //当前时间
    var date = new Date();
    var now = date.getTime();

    let result = {}
    if (now > end) {
        //已结束
        result["timeEnable"] = false
        result["d"] = 0
        result["h"] = 0
        result["m"] = 0
        result["s"] = 0
    } else {
        //时间差  
        var leftTime = end - now;
        //定义变量 d,h,m,s保存倒计时的时间  
        var d, h, m, s;
        if (leftTime > 0) {
            d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
            h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
            m = Math.floor(leftTime / 1000 / 60 % 60);
            s = Math.floor(leftTime / 1000 % 60);
            result["d"] = d < 10 ? "0" + d : d + ""
            result["h"] = h < 10 ? "0" + h : h + ""
            result["m"] = m < 10 ? "0" + m : m + ""
            result["s"] = s < 10 ? "0" + s : s + ""
            result["timeEnable"] = true
        }
    }
    return result
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * ts: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
function tsFormatTime(timestamp, format) {

    const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    let returnArr = [];

    let date = new Date(timestamp);
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    returnArr.push(year, month, day, hour, minute, second);

    returnArr = returnArr.map(formatNumber);

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

module.exports = {
    countdown: countdown,
    countdownIntellect: countdownIntellect,
    length: length
}