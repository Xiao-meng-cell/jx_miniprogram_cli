// miniprogram/pages/tabBar_user_center/promoters/promoters.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
var RSAKey = require('../../../utils/rsa-client.js');
var base64 = require('../../../utils/base64.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.scene) { //扫小程序码获取的参数，未调试
      let qrcode_scene = decodeURIComponent(options.scene).trim();
      //&是我们定义的参数链接方式
      if (qrcode_scene.split("$")[0]) {
        app.globalData.higherLevelCode = qrcode_scene.split("$")[0];
        app.globalData.isReloadThePage_tabBar_index = true;
      }
      if (qrcode_scene.split("$")[1]) {
        this.setData({
          recommender: qrcode_scene.split("$")[1]
        });
      }
    }
    if (options.q) { //扫二维码获取的参数
      let qrcode_scene = decodeURIComponent(options.q);
      let higherLevelCode = util.getQueryString(qrcode_scene, "user");
      let recommender = util.getQueryString(qrcode_scene, "code");
      //&是我们定义的参数链接方式
      if (higherLevelCode) {
        app.globalData.higherLevelCode = higherLevelCode;
        app.globalData.isReloadThePage_tabBar_index = true;
        app.globalData.jumpIndex_fromApp = true;
      }
      if (recommender) {
        app.globalData.isReloadThePage_tabBar_index = true;
        this.setData({
          recommender: recommender,
        });
      }


      if (options.higherLevelCode) {
        app.globalData.higherLevelCode = options.higherLevelCode;
        app.globalData.isReloadThePage_tabBar_index = true;
      }
      if (options.recommender) {
        this.setData({
          recommender: options.recommender
        });
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(!wx.getStorageSync('user')){
      app.isUserLogin(function (isLogin) {})
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.checkUser();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }

  /**
   * 通知父级页面，把onPhone设置为true
   */
  setNoPhone: function (e) {
    if (!wx.getStorageSync('user').phone) {
      this.setData({
        noPhone: true
      });
    } else {
      this.setData({
        noPhone: false
      });

      this.checkUser();
    }
  },


  /**
   * 检查用户是否是推广员
   */
  checkUser: function () {
    if (wx.getStorageSync('user')) {
      http.get(
        app.globalData.host + 'personal/info', {
          userId: wx.getStorageSync('user').id
        },
        (status, resultCode, message, data) => {
          // debugger
          wx.stopPullDownRefresh();
          if (data.promoter == 1) {
            wx.showModal({
              title: '您已经是推广员',
              content: '您已经是推广员啦，更多信息请前往掌创人生APP查看',
              success(res) {
                wx.navigateTo({
                  url: '/pages/tabBar_index/business_homepage/business_homepage' + '&higherLevelCode=' + app.globalData.higherLevelCode,
                })
              }
            })
          }
          if (data.promoter == 2) {
            wx.showModal({
              title: '您已经申请推广员',
              content: '您已经申请推广员啦，当前正在审核中，更多信息请前往掌创人生APP查看',
              success(res) {
                wx.navigateTo({
                  url: '/pages/tabBar_index/business_homepage/business_homepage' + '&higherLevelCode=' + app.globalData.higherLevelCode,
                })
              }
            })
          }
          // if (data.promoter == 1 || data.promoter == 2 || data.promoter == 3) {
          //   this.setData({
          //     already_promoter: true
          //   });
          // } else {
          //   this.setData({
          //     already_promoter: false
          //   });
          // }
        },
        (status, resultCode, message, data) => {
          wx.stopPullDownRefresh();
        });
    }

  },

  /**
   * 提交推广员申请 /biz/user/merchant/promoter/apply   applyName  promoterCityId ownerCode
   */
  submit: function () {
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        http.post(
          app.globalData.host + "biz/promoter/relation/user", {
            ownerCode: that.data.recommender
          },
          (status, resultCode, message, data) => {
            console.log("提交成功")
            console.log(data)
            wx.showModal({
              title: '申请成功',
              content: '恭喜您已成为推广员，相关信息请前往掌创人生APP查看',
              success(res) {
                wx.navigateTo({
                  url: '/pages/tabBar_index/business_homepage/business_homepage' + '&higherLevelCode=' + app.globalData.higherLevelCode,
                })
              }
            })
            wx.hideLoading();
          },
          (status, resultCode, message, data) => {
            wx.showModal({
              title: message,
              content: '',
            })
            wx.hideLoading();
          }
        );
      }
    })
  },


  /**
   * 推广员说明 https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/weclubbing/protocol/promoter_note.html
   */
  jumpWebView: function (e) {
    wx.navigateTo({
      url: "/pages/web_view_html/web_view_html?webUrl=" + e.currentTarget.dataset.url + "&title=" + e.currentTarget.dataset.title,
    })
  },
})