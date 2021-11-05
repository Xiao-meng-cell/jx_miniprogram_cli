// expandPackage/pages/member/cardList/cardList.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
var memberUtil = require('../../../../utils/member.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: [], //会员卡列表
    loadAll: false, //加载全部数据
    pageIndex: 1, //翻页目录
    pageIndex_add: 0, //二维数组下标
    pageLimit: 20,
    lander: wx.getStorageSync('user'),
    inputFocus: false, //输入框焦点
    keyword: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.enableMember) {
      this.getMineCardList()
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
    if (!this.data.loadAll) {
      this.loadMore()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取我的会员卡
   */
  getMineCardList: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.vip_host + "vip/store/card/pageListForUser", {
        index: this.data.pageIndex,
        limit: this.data.pageLimit,
        userCode: this.data.lander.userCode,
        filter: this.data.keyword != "" ? this.data.keyword : undefined,
      },
      (status, resultCode, message, data) => {
        this.handleCardData(data)
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 处理名片数据
   */
  handleCardData: function (list) {
    if (!list || list.list.length < this.data.pageLimit) {
      this.setData({
        loadAll: true,
      })
      // if (list.list.length == 0) {
      //   this.setData({
      //     cardList: "",
      //   })
      //   wx.hideLoading()
      //   return
      // }
    }
    let finalList = []
    for (let i in list.list) {
      let item = list.list[i]
      item["styles"] = memberUtil.getStyleById(item)
      finalList.push(item)
    }
    this.setData({
      ['cardList[' + this.data.pageIndex_add + ']']: finalList,
    });
    wx.hideLoading();
  },

  /**
   * 加载更多数据
   */
  loadMore: function () {
    this.setData({
      pageIndex: this.data.pageIndex + 1,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    if (app.globalData.enableMember) {
      this.getMineCardList()
    }

  },

  /** 前往会员卡详情 */
  goToCardDetail: function (e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/expandPackage/pages/member/cardDetail/cardDetail?storeCode=' + item.vipStoreCode,
    })
  },

  inputFocus: function () {
    this.setData({
      inputFocus: !this.data.inputFocus,
    })
  },

  bindinput: function (e) {
    this.setData({
      keyword: e.detail.value,
      inputFocus: e.detail.value == "" ? false : true,
    })
    this.initParams()
  },

  /** 初始化参数 */
  initParams: function () {
    this.setData({
      loadAll: false,
      pageIndex: 0,
      pageIndex_add: 0,
      cardList: [],
    })
    if (app.globalData.enableMember) {
      this.getMineCardList()
    }

  }
})