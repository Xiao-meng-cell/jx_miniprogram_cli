// pages/tabBar_user_center/menu_wallet/record_details/record_details.js
const app = getApp();
const http = require("../../../../utils/http.js");
const util = require("../../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productName: '',
    productDescription: '',
    amountYuan: '',
    num: '',
    productUnit: '',
    productImg: '',
    code: '',
    createdTime: '',
    settledTime: '',
    price: '',
    totalPrice: '',
    status: '',
    statusName: '',
    result: '',
    bankcard: '',
    bankname: '',
    batchName: '',
    displayOriginDetail: true,
    relationType: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      productName: options.productName,
      productDescription: options.productDescription,
      amountYuan: options.amountYuan,
      num: options.num,
      productUnit: options.productUnit,
      productImg: options.productImg,
      code: options.code,
      createdTime: options.createdTime,
      settledTime: options.settledTime,
      price: options.price,
      totalPrice: options.totalPrice,
      status: options.status,
      statusName: options.statusName,
      result: options.result,
      bankcard: options.bankcard,
      bankname: options.bankname,
      batchName: options.batchName,
      displayOriginDetail: options.displayOriginDetail,
      relationType: options.relationType,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 复制订单号
   */
  copyOrderCode: function(e) {
    var that = this;
    var orderBean = e.currentTarget.dataset.bean;
    wx.setClipboardData({
      data: orderBean,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
          duration: 1500
        })
      }
    });
  },
})