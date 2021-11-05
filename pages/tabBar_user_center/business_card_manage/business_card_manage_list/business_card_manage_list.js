// miniprogram/pages/tabBar_user_center/business_card_manage/business_card_manage_list/business_card_manage_list.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
var RSAKey = require('../../../../utils/rsa-client.js');
var base64 = require('../../../../utils/base64.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_list: [], //卡片列表数据
    pageIndex: 0, //翻页目录
    pageIndex_add: 0, //二维数组下标
    myMerchantInfo: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      myMerchantInfo: app.globalData.myMerchantInfo
    });
    this.getMineCardList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideShareMenu()
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
    this.setData({
      pageIndex: this.data.pageIndex + 10,
      pageIndex_add: this.data.pageIndex_add + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // },


  /**
   * 获取我的职位列表
   */
  getMineCardList: function() {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/mine/list", {
        skip: this.data.pageIndex,
        limit: 20
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
   * 跳转到申请名片详情
   */
  jumpApplyDetail: function() {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply',
    })
  },

  /**
   * 跳转到卡片详情
   */
  jumpCardDetail: function(e) {
    if (e.currentTarget.dataset.status == 2) {
      wx.showToast({
        title: '名片审核中',
        icon: "none"
      })
      return
    }
    wx.navigateTo({
      url: '/pages/clerk/show/show?merchantCode=' + e.currentTarget.dataset.merchantcode + "&workerId=" + e.currentTarget.dataset.id,
    })
    // wx.navigateTo({
    //   url: '/pages/tabBar_user_center/business_card_manage/business_card_detail/business_card_detail?merchantCode=' + e.currentTarget.dataset.merchantcode + "&workerId=" + e.currentTarget.dataset.id,
    // })
  },

  /**
   * 制作店主名片
   */
  jumpMineBusinessCard: function(e) {
    if (!this.data.myMerchantInfo) {
      wx.showToast({
        title: '企业未入驻',
        icon: "none"
      })
      return
    }
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply?merchantCode=' + e.currentTarget.dataset.code,
    })
  },

  /**
   * 申请列表
   */
  jumpApplyList: function() {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/manager/apply_manager/apply_manager',
    })
  }
})