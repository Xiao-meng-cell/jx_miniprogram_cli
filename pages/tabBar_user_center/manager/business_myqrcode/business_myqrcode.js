// miniprogram/pages/tabBar_user_center/manager/business_myqrcode/business_myqrcode.js
const app = getApp();
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteCode: undefined, //我的邀请码
    myQRCodeUrl: undefined, //我的二维码地址
    myMerchantInfo: app.globalData.myMerchantInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getLocationUserInfo();
    this.getUserQRCode();
    // this.getBusinessServiceType();
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
  // onShareAppMessage: function () {

  // },

  /**
   * 获取本地个人信息
   */
  getLocationUserInfo: function() {
    if (!wx.getStorageSync('user').id || wx.getStorageSync('user').userCode) {
      this.setData({
        myMerchantInfo: wx.getStorageSync("myMerchantInfo"),
        inviteCode: wx.getStorageSync("userCode")
      });
    }

  },


  /**
   * 获取商家小程序码
   */
  getUserQRCode: function() {
    var that = this;
    http.get(
      app.globalData.host + 'wechat/wxmlQrcodeMap', {
        userId: wx.getStorageSync('user').id,
        merchantCode: app.globalData.myMerchantInfo.code,
        size: 450,
        scene: wx.getStorageSync('user').userCode + "$" + app.globalData.myMerchantInfo.code,
        page: "pages/tabBar_index/business_homepage/business_homepage",
        appId: app.globalData.appId
      },
      (status, resultCode, message, data) => {
        that.setData({
          myQRCodeUrl: data,
        });
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
      });
  },

  /**
   * 保存到按钮
   */
  saveImage: function() {
    var that = this;
    if (that.data.myQRCodeUrl == undefined || that.data.myQRCodeUrl == null) {
      wx.showToast({
        title: '不能保存',
        duration: 2000,
        icon: "none"
      });
      return;
    }
    var imgUrl = that.data.myQRCodeUrl;
    var newUrl = imgUrl.replace('http://', 'https://');
    wx.showLoading({
      title: '保存中...',
    });
    wx.downloadFile({
      url: newUrl,
      success: function(res) {
        if (res.statusCode === 200) {
          let img = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success(res) {
              wx.hideLoading();
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000,
                icon: "none"
              });
            },
            fail(res) {
              wx.hideLoading();
              wx.showToast({
                title: '保存失败',
                duration: 2000,
                icon: "none"
              });
            }
          });
        }
      },
      fail:function(res){
        wx.hideLoading();
        wx.showToast({
          title: '保存失败',
          icon: "none"
        });
      }
    });
  },

 



})