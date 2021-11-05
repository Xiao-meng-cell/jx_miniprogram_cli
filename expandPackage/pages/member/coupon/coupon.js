// expandPackage/pages/member/coupon/coupon.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delete: false,
    quantity: '',
    sum: 0,
    total_vip_price: 0,
    vipDiscount: 0, //用卷可减价格
    currentTab: 0,
    invalid: '',
    windowHeight: '',
    merchantCode: "", //商家编号
    onlyUsable: true, //只显示可用优惠券
    displayCheckbox: true, //是否显示复选框
    productCode: '',
    onshelfCode: '',
    eventCode: '',
    propertie: '',
    total_price: '',
    quantity: '1',
    couponCodes: [],
    couponIds: [],
    couponName: "",
    recharge: 0,
    topTips: true,
    type: "", //券类型（credit：预充值券）
    pageFrom: "", //页面来源（confirm:购物车结算页）
    enableDelFun: false, //启用删除功能
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          windowHeight: result.windowHeight
        })
      },
    })

    if (options.merchantCode) {
      this.setData({
        merchantCode: options.merchantCode,
      })
    }
    if (options.eventCode) {
      this.setData({
        eventCode: options.eventCode,
      })
    }
    if (options.productCode) {
      this.setData({
        productCode: options.productCode,
      })
    }
    if (options.onshelfCode) {
      this.setData({
        onshelfCode: options.onshelfCode,
      })
    }
    if (options.propertie) {
      this.setData({
        propertie: unescape(options.propertie),
      })
    }
    if (options.total_price) {
      this.setData({
        total_price: options.total_price,
      })
    }
    if (options.quantity) {
      this.setData({
        quantity: options.quantity,
      })
    }
    if (options.onlyUsable) {
      this.setData({
        onlyUsable: options.onlyUsable == "true" ? true : false,
      })
    }

    if (options.displayCheckbox) {
      this.setData({
        displayCheckbox: options.displayCheckbox == "true" ? true : false,
      })
    }

    if (options.couponCodes) {
      this.setData({
        couponCodes: options.couponCodes,
      })
    }

    if (options.couponIds) {
      this.setData({
        couponIds: options.couponIds,
      })
    }

    if (options.recharge) {
      this.setData({
        recharge: options.recharge,
      })
    }

    if (options.topTips) {
      this.setData({
        topTips: options.topTips == "true" ? true : false,
      })
    }

    if (options.type) {
      this.setData({
        type: options.type,
      })
    }

    if (options.pageFrom) {
      this.setData({
        pageFrom: options.pageFrom,
      })
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
    this.businessNews = this.selectComponent("#myCoupon1")
    this.businessNews.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
      if (e.target.dataset.current == '1') {
        that.setData({
          invalid: '1',
        })
        let myCoupon = this.selectComponent('#myCoupon2')
        myCoupon.vipCouponByParam(e.target.dataset.current)
      }
      if (e.target.dataset.current == '2') {
        that.setData({
          invalid: '2',
        })
        let myCoupon = this.selectComponent('#myCoupon3')
        myCoupon.vipCouponByParam(e.target.dataset.current)
      }
    }
  },

  goShopDetail: function () {
    this.setData({
      total_vip_price: (Number(this.data.total_price) - Number(this.data.vipDiscount)).toFixed(2)
    })
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      vipDiscount: this.data.vipDiscount,
      total_vip_price: this.data.total_vip_price,
      couponCodes: this.data.couponCodes,
      couponName: this.data.couponName,
      indChooseCoupon: true,
      merchantCode: this.data.merchantCode,
    })
    wx.navigateBack({
      delta: 1 //想要返回的层级
    })
  },

  /** 选中优惠券回调 */
  onMyEvent: function (e) {
    this.setData({
      sum: e.detail.sum,
      vipDiscount: e.detail.vipDiscount,
      couponCodes: e.detail.couponCodes,
      couponName: e.detail.couponName,
    })
  },

  /** 隐藏显示删除优惠券弹窗提示 */
  showDelete: function () {
    this.setData({
      delete: !this.data.delete
    })
  },

  /** 删除全部优惠券 */
  getDeleteAll: function () {
    var myCoupon = ""
    if (this.data.currentTab == 1) {
      myCoupon = this.selectComponent('#myCoupon2')
    } else if (this.data.currentTab == 2) {
      myCoupon = this.selectComponent('#myCoupon3')
    }
    myCoupon.deleteAll()
    this.showDelete()
  },

  /** 优惠券数量 */
  couponNum: function (e) {
    if (e.detail.couponNum > 0) {
      this.setData({
        enableDelFun: true,
      })
    }
  },
})