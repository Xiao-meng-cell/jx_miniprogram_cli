// miniprogram/pages/business/video_show/video_show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    hidden_poster:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var url = options.src;

    this.setData({
      url: url,
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
  onShow: function() {
    this.tagHiddenPoster();
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

  /**视频开始播放时执行 */
  videoPlay: function(e) {
    //执行全屏方法
    let vc = wx.createVideoContext('myVideo', this)
    vc.requestFullScreen()
  },

  /** 视频播放结束时执行 */
  videoEnd: function(e) {
    // 退出全屏方法
    let vc = wx.createVideoContext('myVideo', this)
    vc.exitFullScreen()
  },


  /**
   * 进度条改变
   */
  progressChange:function(e){
    // console.log("播放进度改变");
    // console.log(e.detail);
  },


  /**
   * 显示/隐藏封面
   */
  tagHiddenPoster:function(){
    setTimeout(() => {
      this.setData({
        hidden_poster: !this.data.hidden_poster
      });
    }, 1000);
  },

})