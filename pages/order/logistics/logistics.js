// miniprogram/pages/order/logistics/logistics.js
var RSAKey = require('../../../utils/rsa-client.js');
var base64 = require('../../../utils/base64.js');
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetailsLogistics: null,
    addr: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      addr: options.addr
    });
    this.getLogistics(options.lognum);
  },

  /**
   * 根据物流单号查询物流列表
   */
  getLogistics: function (logisticsNum) {
    wx.showLoading({
      title: '正在加载中...',
    })
    var that = this;
    http.post(
      app.globalData.business_host + 'tracking/search', {
        num: logisticsNum
      },
      (status, resultCode, message, data) => {
        for (let i in data.list) {
          let item = data.list[i]
          item["dateStr"] = item.time.split(" ")[0]
          item["timeStr"] = item.time.split(" ")[1]
        }
        that.setData({
          orderDetailsLogistics: data,
        })
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: '获取数据失败！',
          duration: 2000
        })
      });
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },


  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }

  /**
   * 复制订单号
   */
  copyCode: function (e) {
    var code = e.currentTarget.dataset.code;
    wx.setClipboardData({
      data: code,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          duration: 2000
        })
      }
    });
  },
})