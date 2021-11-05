// miniprogram/pages/tabBar_user_center/learning_garden/learning_garden.js
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
    pageId: "", //学习园地ID
    title: "", //标题
    url: "", //链接
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.getOptions(options, function (data, newShare) {
      that.initOptions(data, newShare == 1 ? true : false, )
    }, function (data, qrcode_scene) {
      //旧小程序码
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧二维码
      that.initOptions(data)
    })

  },

  //初始化参数
  initOptions(options, newShare = false) {
    if (options.title) {
      this.setData({
        title: options.title
      })
    }
    if (options.pageId) {
      this.setData({
        pageId: options.pageId
      })
    }
    if (options.higherLevelCode) {
      app.globalData.higherLevelCode = options.higherLevelCode;
      app.globalData.isReloadThePage_tabBar_index = true;
    }
    this.getDetail();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onShareAppMessage: function () {
    return {
      title: this.data.gardenData.title,
      path: "pages/tabBar_user_center/learning_garden/learning_garden?title=" + this.data.title + "pageId=" + this.data.pageId + "&higherLevelCode=" + wx.getStorageSync('user').userCode + '&batchShare=' + app.globalData.batchShare
    }
  },

  /**
   * 获取学习园地详情
   */
  getDetail: function () {
    wx.showLoading({
      title: '加载中...',
    })
    http.get(
      app.globalData.host + "biz/learn/public/web/get/detailed", {
        id: this.data.pageId
      },
      (status, resultCode, message, data) => {
        wx.setNavigationBarTitle({
          title: data.detailed.title,
        })
        this.handlerDetail(data)
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
      }
    );
  },

  /** 处理学习园地详情 */
  handlerDetail: function (obj) {
    let detailObj = obj.detailed;
    this.setData({
      title: detailObj.title,
      pageId: detailObj.id
    })
    let url = ""
    let urlPre = "https://h5.vicpalm.com/testprojectonline";
    if (app.globalData.business_host == 'https://www.vicpalm.com/weclubbing/order/') {
      urlPre = "https://h5.vicpalm.com/weclubbing";
    }
    if (detailObj.media == 'editor' && detailObj.isWeb == 1) { //外部链接形式
      url = detailObj.url + '&title=' + this.data.title + "&userId=" + wx.getStorageSync('user').id + "&higherLevelCode=" + wx.getStorageSync('user').userCode;
    } else {
      url = urlPre + "/learningClassify?pageId=" + this.data.pageId + '&title=' + this.data.title + "&userId=" + wx.getStorageSync('user').id + "&higherLevelCode=" + wx.getStorageSync('user').userCode;
    }
    wx.hideLoading()
    let webUrl = encodeURIComponent(url); //编码
    // console.log(webUrl);
    wx.redirectTo({
      url: '/pages/web_view_html/web_view_html?webUrl=' + webUrl
    })
  },

})