// widget/logon/logon.js
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
var crypto = require('../../utils/crypto.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    wxCode: "",
    session_key: "",
    unionid: "",
    openid: "",
    hidden_logon_buttom: false, //隐藏微信登录按钮
    hidden_bindPhone_buttom: true, //隐藏绑定手机号按钮
    hidden_logon_widget: true,
    callnumber: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    doNotMove: function (e) {
      return false;
    },


    /**
     * 获取微信用户信息，登陆
     */
    getUserInfo: function (e) {
      wx.showLoading({
        title: '正在登录',
      })
      app.globalData.userInfo = e.detail.userInfo;
      if (app.globalData.userInfo) {
        this.authorization_wxml();
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '用户未授权',
          icon: 'none'
        })
      }
    },

    /**
     * 获取手机号码
     */
    getPhoneNumber: function (e) {
      if (e.detail.encryptedData) {
        if (this.data.session_key) {
          this.decrypt_wxml(e.detail.encryptedData, e.detail.iv);
        } else {
          this.authorization_wxml_phone(e.detail.encryptedData, e.detail.iv);
        }

      } else {

      }

    },
    /**
     * 绑定手机号获取sesson——key
     */
    authorization_wxml_phone: function (encryptedData, iv) {
      wx.login({
        success: res => {
          this.setData({
            wxCode: res.code
          });
          http.post(
            app.globalData.host + 'wechat/authorization_wxml2', {
              code: this.data.wxCode,
            },
            (status, resultCode, message, data) => {
              this.setData({
                session_key: data.session_key,
              });
              this.decrypt_wxml(encryptedData, iv);

            },
            (status, resultCode, message, data) => {}
          );
        },
        fail: res => {
          wx.showToast({
            title: '获取登陆信息失败,请重新登陆',
            icon: "none"
          })
        }
      })
    },

    /**
     * 获取手机号码
     */
    decrypt_wxml: function (encryptedData, iv) {
      http.post(
        app.globalData.host + 'wechat/decrypt_wxml', {
          sessionKey: this.data.session_key,
          encryptedData: encryptedData,
          ivData: iv
        },
        (status, resultCode, message, data) => {
          var temp = JSON.parse(data)
          this.bindWXPhone(temp.phoneNumber);
        },
        (status, resultCode, message, data) => {}
      );
    },






    /**
     * 获取opengid，sessionkey
     */
    authorization_wxml: function () {
      wx.login({
        success: res => {
          this.setData({
            wxCode: res.code
          });
          wx.showLoading({
            title: '正在登陆',
          });
          // http.post(
          //   app.globalData.host + 'wechat/authorization_wxml2', {
          //     code: this.data.wxCode,
          //   },
          http.post(
            app.globalData.host + 'wechat/authorization_minpro', {
              code: this.data.wxCode,
              appid: app.globalData.appId
            },
            (status, resultCode, message, data) => {
              app.globalData.ssdid = data.openid;
              wx.setStorage({
                key: 'ssdid',
                data: app.globalData.ssdid,
                success: res => {}
              })
              app.globalData.openid = data.openid;
              this.setData({
                session_key: data.session_key,
                openid: data.openid
              });
              if (!data.unionid) {
                wx.getUserInfo({
                  success: res => {
                    var userInfo = res.userInfo
                    var rawData = res.rawData
                    var signature = res.signature
                    var encryptedData = res.encryptedData
                    var iv = res.iv
                    this.getUnionid(data.session_key, res.encryptedData, res.iv)
                    wx.hideLoading();
                  },
                  fail: res => {
                    wx.hideLoading();
                    wx.showToast({
                      title: '未授权将无法注册用户',
                    })
                  }
                })
              } else {
                this.wxmlLoginHandler(data.openid, data.session_key, data.unionid);
              }
              //登陆，取到用户信息
            },
            (status, resultCode, message, data) => {}
          );
        },
        fail: res => {
          wx.showToast({
            title: '获取登陆信息失败,请重新登陆',
            icon: "none"
          })
        }
      })

    },

    /**
     * 登陆
     */
    wxmlLoginHandler: function (openid, session_key, unionid) {
      if (this.data.callnumber >= 3) {
        return false
      }
      var key = util.random(16);
      http.post(
        app.globalData.host + 'wechat/wxmlLoginHandler', {
          openid: openid,
          session_key: session_key,
          unionid: unionid,
          key: app.globalData.encrypt(key),
          nickname: app.globalData.userInfo.nickName,
          sex: app.globalData.userInfo.gender,
          headimgurl: app.globalData.userInfo.avatarUrl,
          inviteCode: app.globalData.higherLevelCode
        },
        (status, resultCode, message, data) => {
          let user = data;
          wx.setStorageSync('user', user)
          this.loginLetter(user.id);
          wx.setStorageSync("user", user)
          app.globalData.principal = user.username;
          app.globalData.digestKey = crypto.aesDecrypt(key, user.salt);
          app.globalData.myShareCode = wx.getStorageSync('user').userCode;
          wx.setStorageSync("userCode", wx.getStorageSync('user').userCode);
          wx.setStorageSync("digestKey", app.globalData.digestKey)
          app.getLocationByUser();
          app.getLenderBusinessInfo();
          wx.hideLoading();
          this.setData({
            hidden_logon_widget: true,
            hidden_bindPhone_buttom: true,
            hidden_logon_buttom: true,
          });
          this.triggerEvent('logonCallback', user);
          this.triggerEvent('setNoPhone', user.phone);
          this.triggerEvent('saveShareInfo', "已完成登录");
          this.getUserWechatInfoByUserId();

        },
        (status, resultCode, message, data) => {
          wx.hideLoading();
          wx.showToast({
            title: '登陆失败',
            icon: "none"
          })
        }
      );
    },

    /**
     * 注册环信
     */
    loginLetter: function (userId) {
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
    getUnionid: function (session_key, encryptedData, iv) {
      http.post(
        app.globalData.host + 'wechat/decrypt_wxml', {
          sessionKey: session_key,
          encryptedData: encryptedData,
          ivData: iv
        },
        (status, resultCode, message, data) => {
          var temp = JSON.parse(data)
          this.setData({
            unionid: temp.unionId
          });
          this.wxmlLoginHandler(this.data.openid, session_key, this.data.unionid);
        },
        (status, resultCode, message, data) => {}
      );

    },


    /**
     * 绑定手机
     */
    bindWXPhone: function (phone) {
      http.post(
        app.globalData.host + 'personal/cert/savePhone', {
          phone: phone,
          wxPhone: phone
        },
        (status, resultCode, message, data) => {
          wx.showToast({
            title: '绑定成功',
            icon: "none"
          })
          let user = wx.getStorageSync('user');
          user.phone = phone;
          wx.setStorageSync('user', user);
          this.setData({
            hidden_logon_widget: true,
            hidden_bindPhone_buttom: true,
            hidden_logon_buttom: true,
          });
          this.triggerEvent('setNoPhone', wx.getStorageSync('user').phone);
          this.triggerEvent('addFollow', "已完成绑定手机");

        },
        (status, resultCode, message, data) => {
          wx.showToast({
            title: '绑定失败',
            icon: "none"
          })
        }
      );
    },

    /**
     * 取消授权
     */
    cancelLogin: function () {
      this.setData({
        hidden_logon_widget: true,
        hidden_bindPhone_buttom: true,
        hidden_logon_buttom: true,
      });
    },


    /**
     * 获取用户微信库信息,调用路哥接口
     */
    getUserWechatInfoByUserId: function () {
      http.get(
        app.globalData.host + 'personal/wechat', {},
        (status, resultCode, message, data) => {
          if (data) {

          } else {
            this.setData({
              callnumber: this.data.callnumber + 1
            });
            this.wxmlLoginByStepHandler(this.data.openid, this.data.session_key, this.data.unionid);
          }

        },
        (status, resultCode, message, data) => {
          wx.showToast({
            title: '微信入库失败',
            icon: "none"
          })
        }
      );
    },


  }
})