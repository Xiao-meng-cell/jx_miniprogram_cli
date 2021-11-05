// expandPackage/pages/afterService/uploadReturnInfo/uploadReturnInfo.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    afterSaleCode: "", //售后信息编号
    logisticsNum: "", //物流单号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.afterSaleCode && options.afterSaleCode != "") {
      this.setData({
        afterSaleCode: options.afterSaleCode,
      })
    } else {
      wx.showToast({
        title: '无法获取售后信息',
        icon: "none",
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1200);
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

  logisticsNumInput: function (e) {
    this.setData({
      logisticsNum: e.detail.value,
    })
  },

  /** 完成上传 */
  uploadReturnInfo: function () {
    if (this.data.logisticsNum == "") {
      wx.showToast({
        title: '请填写物流单号',
        icon: "none",
        mask: true,
      })
      return
    }

    http.post(
      app.globalData.business_host + 'aftersalereply/reply', {
        afterSaleCode: this.data.afterSaleCode,
        typeCode: "upload_return_info",
        content: JSON.stringify({
          "content": this.data.logisticsNum
        }),
        userCode: wx.getStorageSync('user').userCode,
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '上传成功',
          icon: "none",
          mask: true,
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1200);
      },
      (status, resultCode, message, data) => {}
    );
  },

  /** 扫描物流单号 */
  sacanLogisticsNum: function () {
    wx.scanCode({
      onlyFromCamera: false,
      success: (result) => {
        if (result.result) {
          this.setData({
            logisticsNum: result.result,
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '识别失败，请重新扫描！',
        })
      },
    })
  },
})