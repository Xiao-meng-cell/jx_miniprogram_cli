// miniprogram/pages/web_view_html/web_view_html.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    web_url: "",
    title: "",
    shareUserId:'',//叠叠乐活动参数
    eventCode:''//叠叠乐活动参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let op = decodeURIComponent(options.webUrl); //解码
    if(options.shareUserId){
      this.setData({ shareUserId:options.shareUserId })
    }
    if(options.eventCode){
      this.setData({ eventCode:options.eventCode })
    }
    console.log(op);
    this.setData({
      web_url: op,
    })
    if (op.title) {
      wx.setNavigationBarTitle({
        title: op.title,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
if(!this.data.shareUserId){
  wx.hideShareMenu();
}
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
     if(this.data.shareUserId){
      return {
        title: '叠叠乐活动',
        path: "pages/diedeile/diediele?shareUserId=" + wx.getStorageSync('user').id + "&eventCode="+ this.data.eventCode,
        success: res => {
            wx.showToast({
                title: '转发成功',
                icon: "none"
            })
        },
        fail: res => {
            wx.showToast({
                title: '转发失败',
                icon: "none"
            })
        }
    }
     }
  }
})