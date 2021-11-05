// pages/pay/pay.js
var http = require('../../utils/http.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCode: '', //预支付单号，从前面一个小程序传过来 2045926751302106868
    orderInfo: {}, //预付单信息
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options && options.referrerInfo){
      this.setData({
        orderCode: options.referrerInfo.extraData.orderCode //预支付单号，从前面一个小程序传过来
      })
    }
    this.toPayMoney();
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
  /**
   * 获取微信支付openid  第一步
   */
  toPayMoney: function (e) {
    wx.showLoading({
      title: '支付中',
      mask: true
    })
    wx.login({
      success: res => {
        this.setData({
          wxCode: res.code
        });
        http.post(
          app.globalData.host + 'wechat/authorization_minpro', {
            code: this.data.wxCode,
            appid: app.globalData.appId
          },
          (status, resultCode, message, data) => {
            // console.log('返回data=========',data);
            wx.hideLoading();
            this.getWeChatRecharge(data.openid);
          },
          (status, resultCode, message, data) => {
            wx.showToast({
              title: message,
              icon: "none"
            })
            wx.hideLoading();
          }
        );
      }
    })
  },

  /**
   * 
   * 支付第二步，获取支付订单信息、支付参数
   */
  getWeChatRecharge: function (openid) {
    http.post(
      app.globalData.host + 'thirdpay/settle', {
        openId: openid + "",
        appId: app.globalData.appId,
        orderCode: this.data.orderCode + ""
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        // console.log("付款信息==========", data);
        this.weChatRecharge(data.params, data.orderNo);
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: message,
          icon: "none"
        })
        wx.hideLoading();
      }
    );
  },
  /**
     * 获取微信支付需要用的参数
     */
    weChatRecharge: function(data, orderNo) {
      var that = this;
      wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign,
          success(res) {
            that.pollingOrder(orderNo);
          },
          fail(res) {
            console.log(res);
          }
      })
    },
       /**
     * 轮询结算单
     */
    pollingOrder: function(code) {
      http.get(
          app.globalData.host + 'biz/usersettlement/info', {
              code: code,
          },
          (status, resultCode, message, data) => {
              if (data.status == 4) {
                  //支付成功
                  wx.showToast({
                      title: '支付成功',
                      icon: "none"
                  })
                  wx.navigateBack({delta:1});
                  // wx.navigateTo({
                  //     url: '/pages/order/detail/order_details?orderId=' + this.data.orderId,
                  // })
              } else if (data.status == 5) {
                  wx.showToast({
                      title: '支付失败',
                      icon: "none"
                  })
                  wx.navigateBack({delta:1});
              } else { //继续轮询
                  this.pollingOrder(code);
              }
          },
          (status, resultCode, message, data) => {
              wx.showToast({
                  title: '支付失败',
                  icon: "none"
              })
          }
      );
  },
})