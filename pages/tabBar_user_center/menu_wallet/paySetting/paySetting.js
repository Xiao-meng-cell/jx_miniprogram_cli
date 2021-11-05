// pages/tabBar_user_center/menu_wallet/paySetting/paySetting.js
const app = getApp();
const http = require("../../../../utils/http.js");
const util = require("../../../../utils/util.js");
const crypto = require('../../../../utils/crypto.js');
const captcha = require('../../../../utils/captcha.js');
const RSAKey = require('../../../../utils/rsa-client.js');
const base64 = require('../../../../utils/base64.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    operate: "edit", //操作（edit:修改支付密码；reset:重置支付密码)
    lander: "",
    passwordLength: 6, //密码长度
    phone: "",
    title: "验证支付密码", //主标题
    subTitle: "请输入当前支付密码验证身份", //副标题
    displayForgetPassword: false, //显示忘记密码
    isHave: true, //拥有支付密码
    step: -1, //步骤
    checkNum: "", //验证码
    passwordStr: "", //密码
    passwordOld: "", //旧密码
    passwordNew: "", //新密码
    op: "",
    np: "",
    countdownCaptcha: 0, //重发验证码倒计时
    captchaTimer: "", //重发验证码计时器
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.operate) {
      if (options.operate == "reset") {
        this.forgetPassword()
        this.getCaptcha()
      }
    } else {
      this.havePin()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let lander = wx.getStorageSync('user')
    if (lander) {
      let temp = lander.phone.split("")
      temp.splice(3, 0, " ")
      temp.splice(8, 0, " ")
      this.setData({
        phone: temp.join(""),
        lander: lander,
      })
    }
    this.inPassword = this.selectComponent("#inPassword");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.captchaTimer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.captchaTimer)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /** 获取密码 */
  getPassword: function (e) {
    console.log(e.detail)
    this.setData({
      passwordStr: e.detail,
    })
    if (e.detail.length == this.data.passwordLength) {
      if (this.data.operate == "reset") {
        this.reset()
      } else if (this.data.operate == "edit") {
        if (this.data.passwordOld == "" && this.data.isHave) {
          this.setData({
            title: "设置新支付密码",
            subTitle: "请输入6位数字密码",
            displayForgetPassword: false,
            passwordOld: e.detail,
          })
          this.inPassword.clear()
        } else {
          this.setData({
            passwordNew: e.detail,
          })
          this.edit()
        }
      }
    }
  },

  /** 检查支付密码设置 */
  havePin: function () {
    http.post(
      app.globalData.host + "personal/havePin", {},
      (status, resultCode, message, data) => {
        if (data) {
          wx.setNavigationBarTitle({
            title: '支付设置',
          })
        } else {
          wx.setNavigationBarTitle({
            title: '设置支付密码',
          })
        }
        this.setData({
          isHave: data,
          step: data ? 2 : 1,
          displayForgetPassword: data,
        });
      },
      (status, resultCode, message, data) => {});
  },

  /** 验证码输入 */
  codeInput: function (e) {
    this.setData({
      checkNum: e.detail.value,
    })
  },

  /** 忘记密码 */
  forgetPassword: function () {
    wx.setNavigationBarTitle({
      title: '重置支付密码',
    })
    this.setData({
      step: 1,
      operate: "reset",
    })
  },

  /** 获取验证码 */
  getCaptcha: function () {
    let that = this
    let url = ""
    if (this.data.operate == "reset") {
      url = app.globalData.host + "personal/pin/reset/captcha/client"
    }
    captcha.getCheckNum(this.data.lander.phone, util.random(16), url)
    this.setData({
      countdownCaptcha: 60,
      captchaTimer: setInterval(function () {
        that.setData({
          countdownCaptcha: that.data.countdownCaptcha - 1,
        })
        if (that.data.countdownCaptcha == 0) {
          clearInterval(that.data.captchaTimer)
        }
      }, 1000),
    })
  },

  /** 下一步 */
  nextStep: function () {
    if (this.data.checkNum == "") {
      wx.showToast({
        title: '请输入验证码',
        icon: "none",
      })
      return
    }

    this.setData({
      title: "设置新支付密码",
      subTitle: "请输入6位数字密码",
      step: 2,
      displayForgetPassword: false,
    })
  },

  /** 重置支付密码 */
  reset: function () {
    wx.showLoading({
      title: '重置中...',
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
            app.globalData.host + "personal/pin/reset", {
              captcha: this.data.checkNum,
              pin: keyValue,
            },
            (status, resultCode, message, data) => {
              wx.showToast({
                title: message,
                icon: "none"
              })
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1200)
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
      (status, resultCode, message, data) => {}
    );
  },

  /** 修改密码 */
  edit: function () {
    let that = this
    wx.showLoading({
      title: '修改中...',
      mask: true,
    })

    this.encryption(this.data.passwordOld, "op")
    this.encryption(this.data.passwordNew, "np")
    this.tempTimer = setInterval(function () {
      if (that.data.op != "" && that.data.np != "") {
        clearInterval(that.tempTimer)
        http.post(
          app.globalData.host + "personal/setPin", {
            oldPin: that.data.isHave ? that.data.op : undefined,
            newPin: that.data.np,
          },
          (status, resultCode, message, data) => {
            wx.showToast({
              title: message,
              icon: "none"
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1,
              })
            }, 1500)
          },
          (status, resultCode, message, data) => {
            wx.showToast({
              title: message,
              icon: "none"
            })
          }
        );
      }
    }, 500)
  },

  encryption: function (str, name) {
    let keyValue = ''
    http.get( //加密方法
      app.globalData.host + "rsa", {},
      (status, resultCode, message, data) => {
        let rsaKey = new RSAKey();
        rsaKey.setPublic(base64.b64tohex(data.modulus), base64.b64tohex(data.exponent));
        if (rsaKey == null) {
          return null;
        }
        keyValue = base64.hex2b64(rsaKey.encrypt(str));
        if (keyValue) {
          if (name == "op") {
            this.setData({
              op: keyValue,
            })
          } else if (name == "np") {
            this.setData({
              np: keyValue,
            })
          }
        }
      },
      (status, resultCode, message, data) => {

      }
    );
  },
})