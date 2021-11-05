// pages/tabBar_user_center/menu_wallet/menu_wallet.js
const app = getApp();
const http = require("../../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    networkType: true, //监听网络连接与断开
    walletInfo: {
      'waiting': 0,
      'pending': 0,
      'bankCards': 0,
    },
    isHave: false,
    check: undefined,
    questionDisplay: false,
    enableMember: app.globalData.enableMember,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    that.data.check = wx.getStorageSync('user');
    if (that.data.check) {
      let uId = that.data.check.id;
      that.data.userId = uId;
      that.getDatas();
      that.checkPay();
    } else {
      wx.showToast({
        title: '请先登录！',
        duration: 1500
      })
    }
  },

  /**监听网络变化 */
  watchBack: function (networkType) {
    this.setData({
      networkType: networkType
    });
    // console.log('==========网络监听==========', this.data.networkType);
  },

  /** 获取数据 */
  getDatas: function () {
    var that = this;
    var url = '/settlement/sum';
    wx.showLoading({
      title: '正在加载中...',
    })
    http.get(
      app.globalData.host + url, {},
      (status, resultCode, message, data) => {
        this.setData({
          walletInfo: data,
        });

        wx.stopPullDownRefresh();
      },
      (status, resultCode, message, data) => {
        this.setData({
          loadenable: false
        });
        wx.showToast({
          title: '获取数据失败',
          duration: 2000,
          icon: "none"
        })
        wx.stopPullDownRefresh();
      });
    wx.hideLoading()
  },

  checkPay: function () {
    var that = this;
    var url = 'personal/havePin';
    http.post(
      app.globalData.host + url, {},
      (status, resultCode, message, data) => {
        this.setData({
          isHave: data
        });
      },
      (status, resultCode, message, data) => {});
  },

  /** 记录列表 */
  details: function (event) {
    var status = event.currentTarget.dataset.status;
    var moneyType = event.currentTarget.dataset.moneytype;
    wx.navigateTo({
      url: "/pages/tabBar_user_center/menu_wallet/balancerecord/balancerecord?moenytype=" + moneyType + "&status=" + status
    })
  },

  /** 充值 */
  recharge: function () {
    wx.navigateTo({
      url: "/pages/tabBar_user_center/menu_wallet/recharge/recharge"
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
    this.checkPay();
    var that = this;
    let pages = getCurrentPages(); //打赏
    let currPage = pages[pages.length - 1];
    if (currPage.data.updateCoins == true) {
      that.data.check = wx.getStorageSync('user');
      if (that.data.check) {
        var uId = that.data.check.id;
        that.data.userId = uId;
        that.getDatas();
      } else {
        wx.showToast({
          title: '请先登录！',
          duration: 1500
        })
      }
      currPage.data.updateCoins = false;
    };
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
    var that = this;
    if (that.data.check) {
      var uId = that.data.check.id;
      that.data.userId = uId;
      that.getDatas();
      that.checkPay();
    } else {
      wx.showToast({
        title: '请先登录！',
        duration: 1500
      })
    }
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

  // }

  /** 点击 我的银行卡 */
  tipUseApp: function () {
    wx.showModal({
      title: '请使用掌创人生APP操作',
      showCancel: false,
      content: '该功能已迁移至掌创人生APP:【工作台】-【我的收益】',
    })
  },

  /** 显示常见金额问题 */
  goToQuestion: function () {
    wx.navigateTo({
      url: "/pages/web_view_html/web_view_html?webUrl=https://oss.vicpalm.com/static/weclubbing/protocol-zcrs/about_wallets.html",
    })
  },

  /**
   * 体现历史
   */
  cashOutHickory: function () {
    wx.navigateTo({
      url: "/pages/tabBar_user_center/menu_wallet/cashOutHickory/cashOutHickory",
    })
  },

  /** 支付设置 */
  paySetting: function () {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/menu_wallet/paySetting/paySetting',
    })
  },
})