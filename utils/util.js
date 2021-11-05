const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


var CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

//随机数
var random = function (n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 61);
    res += CHARS.charAt(id);
  }
  return res;
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

/**
 * 格式化日期
 */
function fmtDate(obj) {
  var date = new Date(obj);
  var y = 1900 + date.getYear();
  var m = "0" + (date.getMonth() + 1);
  var d = "0" + date.getDate();
  return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}

/**
 * 时间格式化
 */
function formatDateTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') //+ ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//JS日期系列：根据出生日期 得到周岁年龄               
//参数strBirthday已经是正确格式的2007.02.09这样的日期字符串
//后续再增加相关的如日期判断等JS关于日期处理的相关方法
function jsGetAge(strBirthday) {
  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];
  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();
  if (nowYear == birthYear) {
    returnAge = 0; //同年 则为0岁    
  } else {
    var ageDiff = nowYear - birthYear; //年之差        
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay; //日之差                
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth; //月之差                
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天 
    }
  }
  return returnAge; //返回周岁年龄   
}

/**
 * https://blog.csdn.net/u013474104/article/details/78630432
 * 用于判断空，Undefined String Array Object
 */
function isBlank(str) {
  if (Object.prototype.toString.call(str) === '[object Undefined]') { //空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  } else {
    return true
  }

}

/**
 * date转timestamp
 * @param date
 * @returns {timestamp}
 */
var timestamp = function (date = new Date()) {
  return date.getTime();
};

/**
 * timestamp转Date
 * @param time
 * @returns {Date}
 */
var date = function (timestamp) {
  if (timestamp) {
    return new Date(timestamp);
  }
  return new Date();
};

/*
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 ** xuanfeng 2014-08-28
 */

function randomWord(randomFlag, min, max) {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

/**
 * 号码屏蔽中间四位数
 */
function iphoneCheck(phoneNum) {
  var showPhone = "";
  var re = /^[1][34587]\d{9}$/; //手机号码验证正则表达式
  if (re.test(phoneNum)) {
    showPhone = phoneNum.substr(0, 3) + "****" + phoneNum.substr(7)
    return showPhone;
  } else {
    showPhone = phoneNum;
    return showPhone;
  }
}

/**
 * 图片等比例缩放 获取屏幕尺寸图片尺寸 自适应
 * https://blog.csdn.net/qq_31383345/article/details/53127804
 */
function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width; //图片原始宽 
  var originalHeight = e.detail.height; //图片原始高 
  var originalScale = originalHeight / originalWidth; //图片高宽比 
  //获取屏幕宽高 
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth; //屏幕高宽比 
      if (originalScale < windowscale) { //图片高宽比小于屏幕高宽比 
        //图片缩放后的宽为屏幕宽 
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else { //图片高宽比大于屏幕高宽比 
        //图片缩放后的高为屏幕高 
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }

    }
  })
  return imageSize;
}


/**
 * 提交备注或介绍或文本中的电话号码
 */
function textRemovePhone(string) {
  //var checkVX = string.replace(/([a-zA-Z])[a-zA-Z0-9_-]{5}([a-zA-Z0-9_-]{0,14})/g,"$1*****");
  var charArr = string.split("");
  var regNumber = /\d+/;
  var numArr = [];

  for (var i = 0; i < charArr.length; i++) {
    if (regNumber.test(charArr[i])) {
      numArr.push(i);
    }
  }

  //先去掉字符
  var num = string.replace(/[^0-9]/ig, "");
  var change = "";
  var str = string;

  if (num && num.length > 10) {
    change = num;
    for (var i = 0; i < num.length - 10; i++) {
      change = change.replace(/(1[3|4|5|7|8|9][0-9])\d{5}(\d{3})/g, "$1*****$2");
    }
    for (var i = 0; i < change.length; i++) {
      var before = str.substring(0, numArr[i]);
      var after = string.substring(numArr[i] + 1, string.length);
      if (before && after) {
        str = before + change[i] + after;
      }
    }
  }
  if (str) {
    return str;
  } else {
    var text = string.replace(/(1[3|4|5|7|8|9][0-9])\d{5}(\d{3})/g, "$1*****$2");
    return text;
  }
}

/**
 * 价格处理分转换元
 */
function priceSwitch(x) {
  //强制保留两位小数
  var num = x
  num = num * 0.01; //分到元
  num += ''; //转成字符串
  var f = parseFloat(num);
  if (isNaN(f)) return false;
  var f = Math.round(num * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length < (rs + 1) + 2) {
    s += '0';
  }
  //每三位用一个逗号隔开
  var leftNum = s.split(".")[0];
  var rightNum = "." + s.split(".")[1];
  var result;
  //定义数组记录截取后的价格
  var resultArray = new Array();
  if (leftNum.length > 3) {
    var i = true;
    while (i) {
      resultArray.push(leftNum.slice(-3));
      leftNum = leftNum.slice(0, leftNum.length - 3);
      if (leftNum.length < 4) {
        i = false;
      }
    }
    //由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
    var sortArray = new Array();
    for (var i = resultArray.length - 1; i >= 0; i--) {
      sortArray.push(resultArray[i]);
    }
    result = leftNum + sortArray.join("") + rightNum;
  } else {
    result = s;
  }
  return result;
}


/**
 * 判断该路径是否是视频
 */
function getUrlType(url) {
  if (url != undefined) {
    var index = url.lastIndexOf(".");
    var end = url.length;
    var res = url.substring(index, end);
    res = res.toLowerCase()
    if (res == ".mp4" || res == ".rm" || res == ".rmvb" || res == ".mov" || res == ".m4v" || res == ".avi" || res == ".dat" || res == ".mkv" || res == ".flv" || res == ".3gp" || res == ".wmv" || res == ".asf" || res == ".3gp") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}


/**
 * 根据url获取参数
 */
function getQueryString(url, name) {
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    return r[2]
  }
  return "";
}

/**
 * 比较微信版本号
 */
function compareVersion(v1, v2) {

  v1 = v1.split('.')

  v2 = v2.split('.')

  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {

    v1.push('0')

  }

  while (v2.length < len) {

    v2.push('0')

  }

  for (var i = 0; i < len; i++) {

    var num1 = parseInt(v1[i])

    var num2 = parseInt(v2[i])

    if (num1 > num2) {

      return 1

    } else if (num1 < num2) {

      return -1

    }

  }

  return 0

}

/**
 * 对比排序（降序）
 * @propertyName 对比属性
 */
function compareSort(propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value2 < value1) {
      return -1;
    } else if (value2 > value1) {
      return 1;
    } else {
      return 0;
    }
  }
}

/**
 * 计算总邮费
 * 计数类别type, 基础价格basePrice, 增量价格increasePrice, 购买数量num, 单位重量weight, 临界值basicNum，增量数量increaseNum, 包邮起始量freePostageNum
 */
function countLogisticsPrice(type, basePrice, increasePrice, num, weight, basicNum, increaseNum, freePostageNum) {
  let totalPrice = 0;
  let total_num_weight = 1;
  if (type == 1) { //按重量
    let unitWeight = weight <= 0 ? 1 : weight;
    total_num_weight = num * unitWeight <= basicNum ? basicNum : num * unitWeight
    if (freePostageNum && freePostageNum != 0) {
      if (total_num_weight >= freePostageNum) {
        basePrice = 0;
        increasePrice = 0;
      }
    }
  } else if (type == 2) { //按件
    total_num_weight = num <= basicNum ? basicNum : num;
    if (freePostageNum && freePostageNum != 0) {
      if (num >= freePostageNum) {
        basePrice = 0;
        increasePrice = 0;
      }
    }
  }
  totalPrice = basePrice + Math.ceil((total_num_weight - basicNum) / increaseNum) * increasePrice
  if (typeof totalPrice === 'number' && !isNaN(totalPrice)) {

  } else {
    totalPrice = 0;
  }
  return totalPrice;
}


/**
 * js 两数相乘 精确版
 */
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {}
  try {
    m += s2.split(".")[1].length
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}


/**
 * js 两数相加 精确版
 */
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}


/**
 * js 两数相除 精确版
 */
function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * pow(10, t2 - t1);
}



/**
 * 减法
 * @param arg1
 * @param arg2
 * @returns
 */
function accSubtr(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}


/** 判断是否为同一天 */
function isSameDate(timestamp1, timestamp2) {
  let date1 = new Date(timestamp1);
  let date2 = new Date(timestamp2);
  if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
    return true
  } else {
    return false
  }
}

/**判断是否是手机号*/
function isMobileNumber(phone) {
  var message = "";
  var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
  if (myreg.test(phone)) {
    message = phone.substring(0, 3) + "****" + phone.substring(7);
  } else {
    message = phone;
  }
  return message;
}

function isPhoneNumber(phone) {
  if (phone.length > 9) {
    return true
  } else {
    return false
  }
}

/** 获取商家显示头像 */
function getMerchantHeadImg(marchant) {
  let displayHeadImg = ""
  if (marchant.headimg) {
    displayHeadImg = marchant.headimg
  }
  if (displayHeadImg == "") {
    if (marchant.bgUrls.length > 0) {
      displayHeadImg = marchant.bgUrls[0]
    } else {
      displayHeadImg = marchant.userHeadimg
    }
  }
  return displayHeadImg
}

/** 处理VR 
 * @param url VR地址
 * @param appId AppId
 */
function vrUrlHandler(url, appId) {
  if (appId == 'wx827e01ca3d4ec7d5') {
    if (url.indexOf("guv7jy4k6p") > -1) {
      url = url.replace('guv7jy4k6p', '3vbxm3q6yn');
    }
    if (url.indexOf("wxapp5") > -1) {
      url = url.replace('wxapp5', '3vbxm3q6yn');
    }
  } else if (appId == 'wx8e99b6918eb537ea') {
    if (url.indexOf("3vbxm3q6yn") > -1) {
      url = url.replace('3vbxm3q6yn', 'guv7jy4k6p');
    }
    if (url.indexOf("wxapp5") > -1) {
      url = url.replace('wxapp5', 'guv7jy4k6p');
    }
  }
  return url
}

/**
 * 判断货源类型归属哪种商品
 * @param {*} typeCode 货源类型
 */
function getTypeCodeType(typeCode) {
  var type = "";
  if (typeCode == 'virtual' || typeCode == 'deposit' || typeCode == 'estate') {
    type = 'VirtualProduct';
  } else if (typeCode == 'logistics' || typeCode == 'service') {
    type = 'EntityProduct';
  } else if (typeCode == 'fresh') {
    type = 'FreshProduct';
  }
  return type;
}

// 结束时间距离现在还有 XXX 结束 单位时间戳，毫秒
function getEndTimeSrt(endTime) {
  var nowTime = new Date().getTime();
  var strEndTime = "";

  var days = 0;
  var hours = 0;
  var minutes = 0;
  var seconds = 0;

  if (endTime) {
    if (nowTime < endTime) {
      days = Math.floor((endTime - nowTime) / (24 * 3600 * 1000));

      //计算出小时数
      var leave1 = (endTime - nowTime) % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      hours = Math.floor(leave1 / (3600 * 1000));
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      minutes = Math.floor(leave2 / (60 * 1000));
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
      seconds = Math.round(leave3 / 1000);
      var dayStr = days > 0 ? days + '天 ' : '';
      var hourStr = hours < 10 ? '0' + hours : hours;
      var minStr = minutes < 10 ? '0' + minutes : minutes;
      var secStr = seconds < 10 ? '0' + seconds : seconds;
      if (days > 365) {
        strEndTime = '长期有效';
      } else {
        strEndTime = dayStr + hourStr + " : " + minStr + " : " + secStr;
      }
    } else {
      strEndTime = '已结束';
    }
  }
  return {
    strEndTime: strEndTime,
    day: days,
    hour: hours,
    minute: minutes,
    second: seconds
  };
}

/*函数节流*/
function throttle(fn, interval) {
  var enterTime = 0; //触发的时间
  var gapTime = interval || 300; //间隔时间，如果interval不传，则默认300ms
  return function () {
    var context = this;
    var backTime = new Date(); //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
function debounce(fn, wait) {
  var timer = null;
  return function () {
    if (timer !== null) clearTimeout(timeout);
    timer = setTimeout(fn, wait);
  }
}
// function debounce(func, wait, immediate) {
//   let timeout, args, context, timestamp, result

//   const later = function() {
//    // 据上一次触发时间间隔
//     const last = +new Date() - timestamp

//    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
//     if (last < wait && last > 0) {
//       timeout = setTimeout(later, wait - last)
//     } else {
//       timeout = null
//      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
//       if (!immediate) {
//         result = func.apply(context, args)
//         if (!timeout) context = args = null
//       }
//     }
//   }

//   return function(...args) {
//     context = this
//     timestamp = +new Date()
//     const callNow = immediate && !timeout
//    // 如果延时不存在，重新设定延时
//     if (!timeout) timeout = setTimeout(later, wait)
//     if (callNow) {
//       result = func.apply(context, args)
//       context = args = null
//     }

//     return result
//   }
// }

/**数组去重 */
function uniqueArr(arr) {
  for (var i = 0; i < arr.length; i++) {
    let cityCode1 = arr[i].cityCode;
    for (var j = i + 1; j < arr.length; j++) {
      let cityCode2 = arr[j].cityCode;
      if (cityCode1 == cityCode2) { //第一个等同于第二个，splice方法删除第二个
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}

module.exports = {
  date: date,
  format: tsFormatTime,
  timestamp: timestamp,
  formatTime: formatTime,
  formatDateTime: formatDateTime,
  random: random,
  tsFormatTime: tsFormatTime,
  fmtDate: fmtDate,
  jsGetAge: jsGetAge,
  isBlank: isBlank,
  iphoneCheck: iphoneCheck,
  randomWord: randomWord,
  imageUtil: imageUtil,
  textRemovePhone: textRemovePhone,
  priceSwitch: priceSwitch,
  getUrlType: getUrlType,
  getQueryString: getQueryString,
  compareVersion: compareVersion,
  compareSort: compareSort,
  countLogisticsPrice: countLogisticsPrice,
  accMul: accMul,
  accAdd: accAdd,
  accDiv: accDiv,
  accSubtr: accSubtr,
  isSameDate: isSameDate,
  isMobileNumber: isMobileNumber,
  getMerchantHeadImg: getMerchantHeadImg,
  vrUrlHandler: vrUrlHandler,
  isPhoneNumber: isPhoneNumber,
  getTypeCodeType: getTypeCodeType,
  getEndTimeSrt: getEndTimeSrt,
  uniqueArr: uniqueArr,
  throttle: throttle,
  debounce: debounce
}