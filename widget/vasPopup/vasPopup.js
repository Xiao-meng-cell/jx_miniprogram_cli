// expandPackage/widget/vasPopup/vasPopup.js
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
const app = getApp();
Component({

  properties: {
    code: {
      type: null,
      observer: function (newVal, oldVal) {
        if (newVal != '') {
          this.setData({
            code: newVal
          })
        }
      }
    },
  },

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    code: "",
    vas: "", //增值服务
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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

  methods: {
    hiddenPopup: function () {
      this.setData({
        hidden: !this.data.hidden,
      })
    },

    /** 停止鼠标操作 */
    stopMouseOperate: function () {

    },

    getVasInfo: function () {
      wx.showLoading({
        title: '加载中...',
      })
      http.get(
        app.globalData.host + "biz/user/merchant/pay/service/info", {
          serviceCode: this.properties.code,
        },
        (status, resultCode, message, data) => {
          this.setData({
            vas: data
          })
          wx.hideLoading()
        },
        (status, resultCode, message, data) => {
          wx.hideLoading()
        }
      );
    },
  }
})