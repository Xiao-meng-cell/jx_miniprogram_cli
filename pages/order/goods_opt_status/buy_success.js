// miniprogram/pages/order/goods_opt_status/buy_success.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCode:null,
    miniProText: "",
    type:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.orderCode){
      this.setData({
        orderCode: options.orderCode
      })
    }
    if (options.type){
      this.setData({
        type: options.type
      })
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (app.globalData.appId =='wx8e99b6918eb537ea'){
      this.setData({
        miniProText:"掌创人生企业版"
      })
    }
    if (app.globalData.appId == 'wx827e01ca3d4ec7d5') {
      this.setData({
        miniProText: "掌创人生"
      })
    }
    if (app.globalData.appId == 'wx00a71e008067167b') {
      this.setData({
        miniProText: "味熊烘焙馆"
      })
    }
    if (app.globalData.appId == 'wx7c568d2d5ef5d8ab') {
      this.setData({
        miniProText: "辰中照明"
      })
    }
    if (app.globalData.appId == 'wx777af4dca2a34200') {
      this.setData({
        miniProText: "广西翔盛建设工程有限公司"
      })
    }

    if (app.globalData.appId == 'wx71684e181e17a1bb') {
      this.setData({
        miniProText: "广西捷恩诚房地产开发集团"
      })
    }

    if (app.globalData.appId == 'wxcdfc45acbf1dc973') {
      this.setData({
        miniProText: "天同府"
      })
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
  // onShareAppMessage: function () {

  // },



  //查看详情
  toLookDetails: function () {
    if (this.data.type == 'tabThrees' || this.data.type == 'tabTwos'){
        wx.redirectTo({
          url: "/pages/order/order?type=" + this.data.type
        })
    } else if (this.data.type=="detail" && this.data.orderCode){
      wx.redirectTo({
        url: '/pages/order/detail/order_details?orderId=' + this.data.orderCode,
      })
    }
    
  },

  /**
   * 返回上一页
   */
  backUpPage:function(){
    wx.navigateBack({
      delta : 1
    })
  }
})