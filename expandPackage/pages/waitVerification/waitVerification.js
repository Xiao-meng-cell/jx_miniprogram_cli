// pages/travel/waitVerification/waitVerification.js
const app = getApp();
const http = require("../../../utils/http.js");
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantCode: "", //商家编号
    merchantInfo: "", //商家信息
    orderList: "", //订单列表
    selectedOrders: "", //选中订单列表
    showLoading: true,
  },

  //初始化参数
  initOptions: function (options) {
    if (options.merchantCode) {
      this.setData({
        merchantCode: options.merchantCode,
      })
      this.getMerchantInfo()
      this.getOrders()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.getOptions(options, function (data, fromAPP) {
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      var temp = {}
      temp.merchantCode = qrcode_scene
      that.initOptions(temp)
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

  /** 获取商家信息 */
  getMerchantInfo: function () {
    http.get(
      app.globalData.host + "merchant/info", {
        merchantCode: this.data.merchantCode,
        higherLevelCode: app.globalData.higherLevelCode == "" ? undefined : app.globalData.higherLevelCode,
      },
      (_status, _resultCode, _message, data) => {
        //处理显示头像
        data.merchant["displayHeadImg"] = util.getMerchantHeadImg(data.merchant)
        this.setData({
          merchantInfo: data.merchant,
        });
      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

  /** 获取订单 */
  getOrders: function () {
    if (this.data.showLoading) {
      wx.showLoading({
        title: '正在加载中...',
      })
    }
    http.get(
      app.globalData.business_host + 'fastorder/myPage', {
        pageIndex: 1,
        pageLimit: 1000,
        statuses: JSON.stringify([2]),
        typeCodes: JSON.stringify(["service", "logistics", "route", "scenic"]),
        addressTypes: JSON.stringify(["merchant", "none"]),
        onshelfStoreCode: this.data.merchantCode,
      },
      (status, resultCode, message, data) => {
        console.log('获取订单数据', data);
        let selectedOrders = []
        for (let i in data.list) {
          let item = data.list[i]
          item["selcted"] = true
          selectedOrders.push(item.code)
        }
        this.setData({
          orderList: data.list,
          selectedOrders: selectedOrders,
        })
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: '获取数据失败！',
          duration: 2000
        })
      });
  },

  /** 前往企业 */
  goToMerchant: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.merchantCode,
    })
  },

  /** 选中订单 */
  changeOrderItem: function (e) {
    let index = e.currentTarget.dataset.index
    let selectedOrders = []
    for (let i in this.data.orderList) {
      let item = this.data.orderList[i]
      if (i == index) {
        if (item.selcted) {
          item["selcted"] = false
        } else {
          item["selcted"] = true
          selectedOrders.push(item.code)
        }
      } else {
        if (item.selcted) {
          selectedOrders.push(item.code)
        }
      }
    }
    this.setData({
      orderList: this.data.orderList,
      selectedOrders: selectedOrders,
    })
  },

  /** 提交核销 */
  submit: function () {
    if (this.data.selectedOrders.length < 1) {
      wx.showToast({
        title: '请选中需要核销商品',
        icon: "none",
      })
      return
    }
    wx.showLoading({
      title: '核销中...',
      mask: true,
    })
    http.post(
      app.globalData.business_host + 'customerorder/finishOrders', {
        orderCodes: JSON.stringify(this.data.selectedOrders),
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
        this.setData({
          selectedOrders: [],
          showLoading: false,
        })
        this.getOrders()
        wx.showModal({
          cancelText: '取消',
          confirmColor: '#2f95fb',
          confirmText: '继续核销',
          content: '是否继续核销',
          showCancel: true,
          title: '核销成功',
          success: (result) => {
            if (result.cancel) {
              wx.redirectTo({
                url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.merchantCode,
              })
            }
          },
        })

      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      });
  },
})