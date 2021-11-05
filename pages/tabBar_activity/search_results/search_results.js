// miniprogram/pages/tabBar_activity/search_results/search_results.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "", //搜索关键字
    pageIndex: 1,
    pageLimit: 10,
    pageIndex_add: 0, //二维数组下标
    business_activity_list_new: [],
    business_activity_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options) {
      if (options.keyword) {
        this.setData({
          keyword: options.keyword,
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getBusinessActivity();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }

  /**
   * 获取企业活动
   */
  getBusinessActivity: function() {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    http.get(
      app.globalData.business_host + "fastevent/homePage", {
        pageIndex: this.data.pageIndex,
        pageLimit: this.data.pageLimit,
        locationCityId: app.globalData.locationCityId ? app.globalData.locationCityId : 1,
        lng: app.globalData.current_lng,
        lat: app.globalData.current_lat,
        statuses: JSON.stringify(["1"]),
        keyword: this.data.keyword,
        typeCodes: JSON.stringify([
          "original",
          "universalRebate"
        ]),
      },
      (status, resultCode, message, data) => {
        if (data.list.length < 1) {
          wx.hideLoading();
          this.setData({
            rolling_lock: false
          });
          return
        }
        this.setData({
          business_activity_list_new: data.list,
          rolling_lock: false
        });
        this.handlerActivitiList();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 处理活动列表
   */
  handlerActivitiList: function() {
    for (let i = 0; i < this.data.business_activity_list_new.length; i++) {
      let list = this.data.business_activity_list_new[i];
      let key_title = list.title;
      if (key_title.indexOf('穴位') > -1 || key_title.indexOf('中医') > -1 || key_title.indexOf('养生') > -1 || key_title.indexOf('眼液') > -1 || key_title.indexOf('病毒') > -1|| key_title.indexOf('保健') > -1 || key_title.indexOf('药') > -1 || key_title.indexOf('治疗') > -1 || key_title.indexOf('医疗') > -1 || key_title.indexOf('贴') > -1) {
        this.data.business_activity_list_new.splice(i, 1);
        i--;
        continue;
      }
      let obj = {};
      obj.pic = JSON.parse(list.fileJson).illustration[0];
      if (obj.pic) {
        obj.type = util.getUrlType(JSON.parse(list.fileJson).illustration[0])
      }
      this.data.business_activity_list_new[i].illustration = obj.pic;
      this.data.business_activity_list_new[i].videoType = obj.type;
      this.data.business_activity_list_new[i].minPrice = util.priceSwitch(this.data.business_activity_list_new[i].minPrice);
      this.data.business_activity_list_new[i].dis = app.getDisance(this.data.business_activity_list_new[i].merchant.lat, this.data.business_activity_list_new[i].merchant.lng);
    }
    this.setData({
      ['business_activity_list[' + this.data.pageIndex_add + ']']: this.data.business_activity_list_new
    });
    wx.hideLoading();
    console.log(this.data.business_activity_list);
  },


  /**
   * 重新加载
   */
  reRoad: function() {
    this.setData({
      pageIndex: 1,
      pageIndex_add: 0,
      business_activity_list: [],
    })
    this.getBusinessActivity();
  },

  /**
   * 加载更多数据
   */
  loadMore: function() {
    if (this.data.rolling_lock) {
      wx.showToast({
        title: '亲,操作太频繁了',
        icon: "none"
      })
      return
    }
    this.setData({
      rolling_lock: true,
      pageIndex: this.data.pageIndex + 1,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getBusinessActivity();
  },

  /**
   * 跳转到商品详情
   */
  jumpBusinessActivityDetail: function(e) {
    wx.navigateTo({
      url: "/pages/tabBar_index/business_detail/business_detail?code=" + e.currentTarget.dataset.code + '&higherLevelCode=' + app.globalData.higherLevelCode + "&activityType=" + e.currentTarget.dataset.activitytype,
    })
  },

  /**
   * 输入搜索内容
   */
  changeSearchText: function(e) {
    this.setData({
      keyword: e.detail.value
    });
  },
})