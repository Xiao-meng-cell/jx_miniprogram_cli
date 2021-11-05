// pages/tabBar_user_center/menu_wallet/cashOutHickory/cashOutHickory.js
const app = getApp();
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
const {
  uniqueArr
} = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    networkType: true, //监听网络连接与断开
    date1: undefined,
    date2: undefined,
    data1_display: '起始日期',
    date2_display: '结束日期',
    hickory_list: [], //历史记录
    pickerGroupHidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    //默认展示所有的提现历史
    this.loadData(undefined, undefined)
  },

  /**监听网络变化 */
  watchBack: function (networkType) {
    this.setData({
      networkType: networkType
    });
    // console.log('==========网络监听==========', this.data.networkType);
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
  // onShareAppMessage: function() {

  // },

  bindDateChange: function (e) {
    this.setData({
      selectedDate: e.detail.value
    })
  },

  /** 加载出账单列表 */
  loadData: function (start, end) {
    var that = this;

    wx.showLoading({
      title: '正在加载中...',
    })
    http.get(
      app.globalData.host + 'fastSettlement/billouts', {
        statuses: JSON.stringify(["1", "2", "3"]),
        startTime: start,
        endTime: end,
      },
      (status, resultCode, message, data) => {
        that.setData({
          hickory_list: data,
        });
        wx.hideLoading();
        wx.stopPullDownRefresh();
      },
      (status, resultCode, message, data) => {
        this.setData({
          loadenable: false
        });
        wx.showToast({
          title: '获取数据失败',
          duration: 2000,
          icon: "none"
        })
        wx.stopPullDownRefresh();
      });
  },

  displayPickerGroup: function () {
    this.setData({
      pickerGroupHidden: false,
    })
  },

  // 时间段选择  
  bindDateChange1(e) {
    let that = this;
    this.setData({
      date1: e.detail.value,
      data1_display: util.tsFormatTime(e.detail.value, "Y年M月D日"),
      pickerGroupHidden: this.data.date2 ? true : false,
    })
    if (this.data.date2) {
      this.loadData(this.data.date1 + " 00:00:00", this.data.date2 ? this.data.date2 + " 23:59:59" : undefined);
    }

  },
  bindDateChange2(e) {
    let that = this;
    this.setData({
      date2: e.detail.value,
      date2_display: util.tsFormatTime(e.detail.value, "Y年M月D日"),
      pickerGroupHidden: this.data.date1 ? true : false,
    })
    if (this.data.date1) {
      this.loadData(this.data.date1 ? this.data.date1 + " 00:00:00" : undefined, this.data.date2 + " 23:59:59");
    }
  },

  hickoryDetail: function (e) {
    app.globalData.cashOutHickoryDetail = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/tabBar_user_center/menu_wallet/cashOutHickory/detail/cashOutHickoryDetail',
    })
  },
})