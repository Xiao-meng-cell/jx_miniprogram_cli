// pages/clerk/dynamic /dynamic_card.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainVidUrl: "https://vod.vicpalm.com/630b85bea7bd4a61b6035aadfba49b47/6562220b28a7412aa7d79b010355fd4d-85bebe50149a995e5f1c6123711f3702-ld.mp4", //主视频URL
    userHead: "http://weclubbing.oss-cn-shenzhen.aliyuncs.com/upload/merchant/clert/2019/04/24/12/35/01/4911_xGcGlA.jpeg", //用户头像
    titleText: "名片", //标题
    autoplay: true, //是否自动播放
    controls: false, //是否显示播放控件
    muted: true, //是否静音
    loop: true, //是否循环播放
    btn: true, //是否显示按钮
    profile: false, //是否显示简介
    clicks: 0, //点击浏览数
    iphone_x: app.globalData.iPhone_X, //是否为iphonex
    wxVersion: "", //微信版本
    capsuleTop: "", //左上角胶囊距顶
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      wxVersion: util.compareVersion(app.globalData.wxVersion, "7.0.0"),
      capsuleTop: app.globalData.capsuleTop
    });
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

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // },

  /** 静音 */
  mute: function() {
    this.setData({
      muted: !this.data.muted,
    })
  },

  /** 隐藏显示按钮 */
  displayBtn: function() {
    this.setData({
      btn: !this.data.btn,
    })
  },

  /** 显示名片简介*/
  showProfile: function() {
    this.setData({
      profile: !this.data.profile,
    })
  },

  /** 阻止鼠标操作 */
  stopMouseOperate: function() {

  },
})