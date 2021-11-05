// expandPackage/pages/hotPartnerList/hotpartnerList.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
var RSAKey = require('../../../utils/rsa-client.js');
var base64 = require('../../../utils/base64.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      merchant_Code:'',
      clerkMark:'3',
      includePlatform:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.merchantCode) {
      this.setData({
        merchant_Code:options.merchantCode
      })
    }
    console.log(this.data.merchant_Code)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})