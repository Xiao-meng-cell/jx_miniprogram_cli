// expandPackage/pages/member/credit/creditUsage/creditUsage.js
var util = require('../../../../../utils/util.js');
var http = require('../../../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ableList: [], //可用预充值列表
    unableList: [], //不可用预充值列表

    lightColor: "#2F95FB",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = null; //上一个页面
    if (pages.length >= 2) {
      prevPage = pages[pages.length - 2]; //上一个页面
    }
    if (prevPage) {
      if (prevPage.route == "pages/tabBar_index/cart/confirm_order_cart/confirm_order_cart") {
        this.setData({
          unableList: prevPage.data.unableList,
          ableList: prevPage.data.ableList,
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  /** 前往充值 */
  goToAddCredit: function (e) {
    wx.redirectTo({
      url: '/expandPackage/pages/member/credit/addCredit/addCredit?merchantCode=' + e.currentTarget.dataset.item.storeCode,
    })
  },
})