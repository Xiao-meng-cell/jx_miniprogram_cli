// pages/authorization/authorization.js
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
var crypto = require('../../utils/crypto.js');

const app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
      session_key: '', //
      key: '', // 加密和解密时用的key
      showWxLogin: true, // 是否显示微信授权按钮
      isNewUser: false, // 是不是新用户
      showPhone: false, // 显示获取手机号码按钮
      phoneInput: false, // 通过微信未获取到电话时，是否显示电话输入
      showTime: false, // 倒计时显示
      disabled: false, // 获取验证码按钮是否禁用
      code: '获取验证码', // 获取验证码按钮文字
      mobile: '', // 手机号输入框的值
      timer: null,
  },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(){
    getApp().globalData.login.wxLogin();
  },


  /**
   * 手机号码一键登录
   */
  async getPhoneNumber(event) {
      //拒绝授权弹窗
      if (event.detail.errMsg === 'getPhoneNumber:fail user deny') return wx.showToast({
          title: '用户拒绝手机号授权，请重新授权',
          icon: 'none'
      })
      // 微信用户只要允许授权了，就能获取到加密信息
      let {
          encryptedData,
          iv
      } = event.detail
      // 检查是session_key是否有效，无效则需要重新登录
      await this.checkWxLogin()
    
      let {
          session_key
      } = getApp().globalData
      let data = await this.getUnionid(session_key, encryptedData, iv)
      // 授权选择的手机号
      let newData = JSON.parse(data)
      //新用户手机号绑定注册
      let newUserData = await this.userBindAndRegister(newData.phoneNumber)
      // 设置用户信息
      await this.setUserInfo(newUserData)
      wx.navigateBack({
          delta: 1,
      })

  },
  /**
   * 检查是session_key是否有效，无效则需要重新登录
   */
  async checkWxLogin() {
      let result;
      try {
          // 验证session_key状态
          result = await wx.checkSession()
      } catch (err) {
          result = false
      }
      if (!this.data.session_key || !result) {
          console.log('没有登录，或者session_key过期失效')
          await getApp().globalData.login.wxLogin()
      }
  },

  /**
   * 新用户注册绑定
   * @param {*} phone 手机号码
   */
  userBindAndRegister(phone) {
      // console.log('新用户注册绑定', phone)
      return new Promise(async (resolve, reject) => {
          // 用户手机号绑定注册
          try {
              // 获取加密key
              let keyData = await getApp().globalData.login.getRsaKey();
              let params = {
                  appId: getApp().globalData.appId,
                  openId: getApp().globalData.openId,
                  unionId: getApp().globalData.unionId,
                  key: keyData.keyValue,
                  phone: phone,
                  inviteCode: getApp().globalData.higherLevelCode || "",
              }
              console.log("=======>params", params)
              // 获取用户信息
              let uersInfo = await getApp().globalData.login.miniprogramLogin(params)
              console.log("登录====uersInfo", uersInfo)
              // AES 解密
              let digestKey = crypto.aesDecrypt(keyData.key, uersInfo.salt)
              wx.setStorageSync('digestKey', digestKey)
              wx.setStorageSync('principal', uersInfo.username)
              wx.setStorageSync('userCode', uersInfo.userCode)
              // store.data.isLogin = true
              // wx.setStorageSync('isLogin', store.data.isLogin)
              getApp().globalData.isNewUser = false
              resolve(uersInfo)
          } catch (err) {
              reject(err)
              getApp().globalData.isNewUser = true
          }
      })
  },

  /**
   * 手机号输入
   */
  mobileInput(e) {
      // console.log('e', e)
      this.setData({
          mobile: e.detail.value
      })
  },

  /**
   * 验证码输入
   */
  smsCodeInput(e) {
      this.setData({
          smsCode: e.detail.value
      })
  },

  /**
   * 倒计时函数
   * @param {*} count 倒计时秒数，默认60
   */
  countdown(count = 60) {
      let nsecond = count;

      this.setData({
          code: `${count}秒后重发`,
          disabled: true
      })

      this.data.timer = setInterval(() => {
          nsecond--
          this.setData({
              second: nsecond
          })
          if (nsecond > 0) {
              this.setData({
                  code: `${nsecond}秒后重发`
              })
          } else {
              clearInterval(this.data.timer)
              this.setData({
                  code: '获取验证码',
                  disabled: false
              })
          }
      }, 1000);
  },

  /**
   * 获取手机验证码
   */
  getSmsCode() {
      if (!this.data.mobile) return wx.showToast({
          title: '手机号码不能为空',
          icon: 'none'
      })
      // 判断手机输入格式是否正确
      let is_mobile = /^1[3456789]\d{9}$/.test(this.data.mobile)

      if (!is_mobile) return wx.showToast({
          title: '请填写正确的手机号码',
          icon: 'none'
      })

      // 倒计时
      this.countdown()

      this.getCaptcha()
  },

  /**
   * 获取验证码
   */
  async getCaptcha() {
      let keyData = await getApp().globalData.login.getRsaKey();
      let url = crypto.aesEncrypt(keyData.key, app.globalData.host + 'valid/phone/captcha/client');
      this.setData({
          key: keyData.key,
          keyValue: keyData.keyValue
      })
      if (keyData.keyValue) {

          let parmas = {
              url: url,
              key: keyData.keyValue
          }
          let data = await this.captchaAesDecrypt(parmas)
          let aesKey = crypto.aesDecrypt(keyData.key, data)
          let sureKey = util.random(16)
          let params = {
              key: sureKey,
              phone: this.data.mobile,
              captcha: aesKey,
              checkPhoneNotExist: false //不校验手机是否存在
          }
      
          let validData= await this.validPhoneAndSendCaptcha(params)

          this.setData({
              sureKey
          })

          validData.result && wx.showToast({
              title: validData.message,
              icon: 'none'
          })
      }
  },
  // 用户验证码解密
  async captchaAesDecrypt(parmas) {
      return new Promise((resolve, reject) => {
          http.post(
              app.globalData.host + "captcha/client", parmas,
              (status, resultCode, message, data) => {
                  resolve(data)
              },
              (status, resultCode, message, data) => {
                  reject(data)
              })
      })
  },
  // 发送验证码
  async validPhoneAndSendCaptcha(parmas) {
      return new Promise((resolve, reject) => {
          http.post(
              app.globalData.host + "valid/phone/captcha/client", parmas,
              (status, resultCode, message, data) => {
                  resolve(data)
              },
              (status, resultCode, message, data) => {
                  reject(data)
              })
      })
  },

  /**
   * 确定绑定
   */
  async confirmBind() {
      let {
          mobile,
          smsCode,
          sureKey
      } = this.data
      try {
          if (!mobile) return wx.showToast({
              title: '请填写正确的手机号码',
              icon: 'none'
          })
          if (!smsCode) return wx.showToast({
              title: '请填写正确的验证码',
              icon: 'none'
          })
          let params = {
              key: sureKey,
              phone: mobile,
              captcha: smsCode,
              checkPhoneNotExist: false
          }

          let result = await this.validPhone(params)

          let userParams = {
              appId: getApp().globalData.appId,
              openId: getApp().globalData.openId,
              unionId: getApp().globalData.unionId,
              key: this.data.key,
              phone: this.data.mobile,
              inviteCode: getApp().globalData.higherLevelCode || "",
          }

          // 获取用户信息
          let userInfo = await getApp().globalData.login.miniprogramLogin(userParams)

          // AES 解密
          let digestKey = crypto.aesDecrypt(this.data.key, userInfo.salt)
          wx.setStorageSync('digestKey', digestKey)
          wx.setStorageSync('principal', userInfo.username)
          wx.setStorageSync('userCode', userInfo.userCode)

          // userInfo && (store.data.isLogin = true)
          // 设置用户信息
          await this.setUserInfo(userInfo)
          getApp().globalData.isNewUser = fasle
          wx.showToast({
              title: '登录成功',
              icon: 'none',
              duration: 3000,
              success: () => {
                  this.hideModal()
                  wx.navigateBack({
                      delta: 1
                  })
              }
          })
      } catch (err) {

          throw new Error(err)
      }
  },
  /**校验手机号码 */
  async validPhone(parmas) {
      return new Promise((resolve, reject) => {
          http.post(
              getApp().globalData.host + "valid/phone", parmas,
              (status, resultCode, message, data) => {
                  resolve(data)
              },
              (status, resultCode, message, data) => {
                  wx.showToast({
                      title: message,
                      icon: 'none'
                  })
                  reject(data)
              })
      })
  },

  /**
   * 隐藏弹窗
   */
  hideModal() {
      this.setData({
          inputPhoneHidden: false,
          mobile: '',
          smsCode: '',
          code: '获取验证码',
          disabled: false

      })
      clearInterval(this.data.timer)
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      clearInterval(this.data.timer);

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      clearInterval(this.data.timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      clearInterval(this.data.timer);
  },

  /**设置用户信息 */
  async setUserInfo(data) {
      let user = data;
      wx.setStorageSync("user", user)
      this.loginLetter(user.id);
    //   app.getLocationByUser();
      app.getLenderBusinessInfo();
      app.globalData.homePageIsisRefresh = true;
      //  this.getUserWechatInfoByUserId();

  },

  /**
   * 注册环信
   */
  async loginLetter(userId) {
      http.get(
          app.globalData.im + 'user/auth/pc', {
              userId: userId
          },
          (status, resultCode, message, data) => {
              wx.hideLoading();
          },
          (status, resultCode, message, data) => {
              wx.hideLoading();

          }
      );
  },

  /**
   * 获取unionid
   */
  async getUnionid(session_key, encryptedData, iv) {
     
      return new Promise((resolve, reject) => {
          http.post(
              getApp().globalData.host + 'wechat/decrypt_wxml', {
                  sessionKey: session_key,
                  encryptedData: encryptedData,
                  ivData: iv
              },
              (status, resultCode, message, data) => {
                  resolve(data)
              },
              (status, resultCode, message, data) => {
                  reject(data)
              }
          );
      })
  },

  /** 隐藏输入手机 */
  inputPhoneHidden: function () {
      this.setData({
          inputPhoneHidden: false,
          phone: '',
          checkNum: ''
      })
  },

  /** 输入手机号码 */
  inputPhoneStr: function (e) {
      this.setData({
          phone: e.detail.value
      })
  },

  /**输入验证码 */
  inputCheckNum: function (e) {
      this.setData({
          checkNum: e.detail.value
      })
  },
     /**
  * 其他手机号码登录
  */
 otherPhoneLogin() {
     this.setData({
         mobile: '',
         smsCode: '',
         inputPhoneHidden: true,
         code: '获取验证码',
         disabled: false
     })
     clearInterval(this.data.timer)
 },



})