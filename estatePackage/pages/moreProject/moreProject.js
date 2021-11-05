// estatePackage/pages/moreProject/moreProject.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: "", //数据列表
    dataList_new: "",
    merchantCode: "", //商家编号
    pageIndex: 1,
    pageLimit: 20,
    pageIndex_add: 0, //二维数组下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.merchantCode) {
      this.setData({
        merchantCode: options.merchantCode,
      })
      this.getList()
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
    this.setData({
      pageIndex: this.data.pageIndex + 1,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

  /** 获取数据*/
  getList: function () {
    wx.showLoading({
      title: '数据加载中...',
    })
    http.get(
      app.globalData.business_host + "estate/list", {
        index: this.data.pageIndex,
        limit: this.data.pageLimit,
        storeCode: this.data.merchantCode
      },
      (status, resultCode, message, data) => {
        console.log(data)
        this.setData({
          dataList_new: data.list
        })
        this.handlerData()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },
  /** 查看货源 */
  goToChannelGoods: function () {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/channel/goodsList/goodsList?merchantCode=' + this.data.merchantCode,
    })
  },

  /** 处理数据 */
  handlerData: function () {
    if (this.data.dataList_new.length < 1) {
      wx.hideLoading()
      return
    }
    for (let i in this.data.dataList_new) {
      let item = this.data.dataList_new[i]
      item["displayPrice"] = item.orderRealEstateAttach.price
      item["fileJson"] = JSON.parse(item.fileJson)
      item["editAddr"] = JSON.parse(item.orderRealEstateAttach.editAddr)
    }

    this.setData({
      ['dataList[' + this.data.pageIndex_add + ']']: this.data.dataList_new
    });
    
    wx.hideLoading()
  },

  goToDetail: function (e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/tabBar_index/business_detail/business_detail?code=' + item.code + "&activityType=" + item.typeCode,
    })
  },
})