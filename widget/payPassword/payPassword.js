// widget/payPassword/payPassword.js
var RSAKey = require('../../utils/rsa-client.js');
var base64 = require('../../utils/base64.js');
var http = require('../../utils/http.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /** 商家（用于商品详情页单个商品结算） */
    merchant: {
      type: Object,
      observer: function (obj) {
        if (obj && obj != '') {
          if (obj.name.length > 16) {
            obj["nameDisplay"] = obj.name.substring(0, 16) + "..."
          } else {
            obj["nameDisplay"] = obj.name
          }
          this.setData({
            merchant: obj,
          })
        }
      }
    },
    /** 预付款金额 */
    amount: {
      type: Number,
    },
    /** 标题 */
    title: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: "", //set:设置支付密码;error:错误提示;check:校验密码
    payPasswordHidden: true, //隐藏支付密码组件
    passwordStr: "",
    length: 6,
  },

  lifetimes: {
    ready: function () {
      this.pwdInput = this.selectComponent("#pwdInput")
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    stopMouseOperate: function () {

    },

    /** 关闭支付密码 */
    closePayPassword: function () {
      this.setData({
        payPasswordHidden: true,
      })
      this.triggerEvent("close", true)
    },

    /** 前往支付密码设置 */
    goToPaySetting: function () {
      let that = this
      wx.navigateTo({
        url: '/pages/tabBar_user_center/menu_wallet/paySetting/paySetting',
        success: function (res) {
          that.closePayPassword()
        }
      })
    },

    /** 忘记密码 */
    forgetPassword: function () {
      wx.navigateTo({
        url: '/pages/tabBar_user_center/menu_wallet/paySetting/paySetting?operate=reset',
      })
    },

    /** 监听密码改变 */
    passwordChange: function (e) {
      this.setData({
        passwordStr: e.detail,
      })
      if (e.detail.length == this.data.length) {
        this.verifyPic()
      }
    },

    /** 重试密码 */
    tryAgain: function () {
      this.setData({
        status: "check",
      })
      this.pwdInput.clear()
    },

    /** 检查支付密码  */
    checkPic: function () {
      this.setData({
        payPasswordHidden: false,
      })
      http.post(
        app.globalData.host + "personal/havePin", {},
        (status, resultCode, message, data) => {
          if (data) {
            this.tryAgain()
          } else {
            this.setData({
              status: "set",
            })
          }
        },
        (status, resultCode, message, data) => {
          wx.showToast({
            title: '检查支付密码失败',
            icon: "none",
            mask: true,
          })
          wx.hideLoading()
        });
    },

    /** 校验支付密码 */
    verifyPic: function () {
      wx.showLoading({
        title: '校验中...',
        mask: true,
      })
      let keyValue = ''
      http.get( //加密方法
        app.globalData.host + "rsa", {},
        (status, resultCode, message, data) => {
          let rsaKey = new RSAKey();
          rsaKey.setPublic(base64.b64tohex(data.modulus), base64.b64tohex(data.exponent));
          if (rsaKey == null) {
            return null;
          }
          keyValue = base64.hex2b64(rsaKey.encrypt(this.data.passwordStr));
          if (keyValue) {
            http.post(
              app.globalData.host + "personal/checkPin", {
                pin: keyValue,
              },
              (status, resultCode, message, data) => {
                wx.hideLoading()
                if (data) {
                  this.setData({
                    payPasswordHidden: true,
                  })
                  this.triggerEvent("verifyPic", keyValue)
                } else {
                  //支付密码错误
                  this.setData({
                    status: "error",
                  })
                }
              },
              (status, resultCode, message, data) => {
                wx.showToast({
                  title: '校验支付密码失败',
                  icon: "none",
                  mask: true,
                })
                wx.hideLoading()
              });
          }
        },
        (status, resultCode, message, data) => {}
      );
    }
  }
})