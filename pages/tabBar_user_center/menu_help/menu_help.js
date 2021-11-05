// const allOrderUtils = require("../../../utils/myorder_active.js");
const http = require("../../../utils/http.js");
const app = getApp();
Page({
  data: {
    networkType: true, //监听网络连接与断开
    operateList: [{
        title: '使用协议',
        remark: '',
        url: '/pages/tabBar_user_center/menu_help/protocol_use',
      },
      {
        title: '关于我们',
        remark: '',
        url: '/pages/tabBar_user_center/menu_help/aboutus',
      },
    ],
    vicpalmMain: app.globalData.vicpalmMain, //是否掌胜科技为主体
    merchant: "",
  },

  onLoad: function () {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    if (!this.data.vicpalmMain) {
      this.getBusinessInfo()
    }
  },

  /**监听网络变化 */
  watchBack: function (networkType) {
    this.setData({
      networkType: networkType
    });
    // console.log('==========网络监听==========', this.data.networkType);
  },

  onShow: function () {},

  callPhone: function () {
    let phoneNumber = "400-003-2229"
    if (!this.data.vicpalmMain) {
      phoneNumber = this.data.merchant.phone
    }
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  },

  /** 获取商家信息 */
  getBusinessInfo: function () {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    http.get(
      app.globalData.host + "merchant/info", {
        merchantCode: app.globalData.defaultMerchantCode,
      },
      (_status, _resultCode, _message, data) => {
        this.setData({
          merchant: data.merchant,
        })
        wx.hideLoading()
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },
})