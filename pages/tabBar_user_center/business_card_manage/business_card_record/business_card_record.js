// pages/tabBar_user_center/business_card_manage/business_card_record/business_card_record.js
var http = require('../../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    networkType: true, //监听网络连接与断开
    card_list: [], //名片列表
    pageIndex: 0, //翻页目录
    pageIndex_add: 0, //二维数组下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    this.getBrowseRecords()
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
    this.setData({
      pageIndex: this.data.pageIndex + 10,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getBrowseRecords()
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // },

  /** 获取名片浏览记录 */
  getBrowseRecords: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.host + "/biz/clerkbrowsingrel/getListByUserId", {
        skip: this.data.pageIndex,
        limit: 10,
      },
      (status, resultCode, message, data) => {

        this.setData({
          ['card_list[' + this.data.pageIndex_add + ']']: data
        });
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 跳转到名片详情
   */
  jumpToBusiness: function (e) {
    if (e.currentTarget.dataset.code == "temporary") {
      wx.showToast({
        title: '临时名片无法查看详情',
        icon: "none"
      })
      return;
    } else {
      wx.navigateTo({
        url: '/pages/clerk/show/show?workerId=' + e.currentTarget.dataset.id + "&merchantCode=" + e.currentTarget.dataset.code + '&higherLevelCode='+ app.globalData.higherLevelCode,
      })
    }
  },
})