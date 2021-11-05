// livePackage/pages/recordingVideo/recordingVideo.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    liveUrl:'',
    autoplay: true, //是否自动播放·
    muted: false, //是否静音
    loop: true, //是否循环播放
    controls: false, //是否显示播放控件
    ctvVideoPlaying:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.liveUrl){
      this.setData({
        liveUrl: options.liveUrl
      })
    }
      this.clerkTemplateVideoContext = wx.createVideoContext('clerkTemplateVideo')
    console.log(this.data.liveUrl)
  },
  ctvVideoPlay: function () {
    this.setData({
      ctvVideoPlaying: true,
    })
  },
  ctvVideoPause: function () {
    this.setData({
      ctvVideoPlaying: false,
    })
  },

  ctvVideoPlayPause: function () {
    if (this.data.ctvVideoPlaying) {
      this.clerkTemplateVideoContext.pause()
    } else {
      this.clerkTemplateVideoContext.play()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 
})