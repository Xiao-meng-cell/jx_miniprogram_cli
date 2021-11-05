// pages/live/live.js 兼容旧版APP直播
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.query) {
      console.log("获取到跳转小程序的参数");
      console.log(options.query);
    }
    //页面跳转获取参数
    if (options.merchantCode) {
      this.setData({
        merchantCode: options.merchantCode,
      })
    }
    if (options.roomId) {
      this.setData({
        roomId: options.roomId,
      })
    }
    if (options.higherLevelCode) {
      app.globalData.higherLevelCode = options.higherLevelCode;
    }
    if (options.clerk_code) {
      this.setData({
        clerkCode: options.clerk_code,
      })
    }
    if (options.channelCode) {
      this.setData({
        sharerMerchantCode: options.channelCode,
      });
    }

    wx.redirectTo({
      url: '/livePackage/pages/live/live?merchantCode='+this.data.merchantCode+'&higherLevelCode='+ app.globalData.higherLevelCode+'&clerk_code='+this.data.clerkCode+'&sharerMerchantCode='+this.data.sharerMerchantCode,
    })
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