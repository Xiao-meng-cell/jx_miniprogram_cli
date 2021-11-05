var crypto = require('crypto.js');
var RSAKey = require('rsa-client.js');
var base64 = require('base64.js');
var util = require('util.js');
var http = require('http.js');
const app = getApp();
console.log(app.globalData);

/** 获取手机验证码 
 * @param phone 手机号码
 * @param key 加密解密需要同一个key（16位随机数）
 * @param url 二维码获取地址
 */
function getCheckNum(phone, sureKey, url) {
  let key = sureKey; // PS:加密解密需要同一个key
  let keyValue = '';
  let serverUrl = crypto.aesEncrypt(key, url);
  http.get( //加密方法
    app.globalData.host + "rsa", {},
    (status, resultCode, message, data) => {
      let rsaKey = new RSAKey();
      rsaKey.setPublic(base64.b64tohex(data.modulus), base64.b64tohex(data.exponent));
      if (rsaKey == null) {
        return null;
      }
      keyValue = base64.hex2b64(rsaKey.encrypt(key));
      if (keyValue) {
        http.post(
          app.globalData.host + "captcha/client", {
            key: keyValue,
            url: serverUrl,
          },
          (status, resultCode, message, data) => {
            if (data) {
              let aesKey = crypto.aesDecrypt(key, data);
              getValidPhone(aesKey, phone, url);
            }
          },
          (status, resultCode, message, data) => {
            wx.showToast({
              title: message,
              icon: "none"
            })
          }
        );
      }
    },
    (status, resultCode, message, data) => {
      wx.showToast({
        title: message,
        icon: "none"
      })
    }
  );
}

/** 校验手机号，往手机发送验证码 */
function getValidPhone(aesKey, phone, url) {
  http.post(
    url, {
      key: util.random(16),
      phone: phone,
      captcha: aesKey,
      checkPhoneNotExist: false, //不校验手机是否存在
    },
    (status, resultCode, message, data) => {
      wx.showToast({
        title: '验证码已发送',
        icon: "none",
      })
    },
    (status, resultCode, message, data) => {
      wx.showToast({
        title: message,
        icon: "none"
      })
    }
  );
}

module.exports = {
  getCheckNum: getCheckNum
}