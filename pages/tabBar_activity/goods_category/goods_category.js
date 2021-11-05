// pages/tabBar_activity/goods_category/goods_category.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantCode: "", //商家编号
    categoryTypeIndex: 0, //选中分类下标
    goodsTagList: "", //商品分类列表
    sourceTagList: "", //货源分类列表
    isLogin: false, //是否登录
    isCheckIn: false, //是否入驻
    userRole: -1, //登录用户在该企业里所属角色（-1:路人;0:共享合伙人;1:事业合伙人;2:商家）
    inreward: false, //是否为名片商城
    tagBarHidden: false, //隐藏分类选择栏
    clerk_code: "" //用户code
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.merchantCode) {
      this.setData({
        merchantCode: options.merchantCode,
      })
    }
    if (options.categoryTypeIndex) {
      this.setData({
        categoryTypeIndex: options.categoryTypeIndex,
      })
    }
    if (options.userRole) {
      this.setData({
        userRole: options.userRole,
      })
    }
    if (options.inreward) {
      this.setData({
        inreward: true,
      })
    }
    if (options.clerk_code) {
      this.setData({
        clerk_code: options.clerk_code,
      })
    }

    if (options.tagBarHidden) {
      this.setData({
        tagBarHidden: options.tagBarHidden,
      })
    }
    this.checkUser()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getGoodsType()
    this.getSourceType()
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

  /** 切换分类类型 */
  changeCategoryType: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      categoryTypeIndex: index,
    })
  },

  /** 获取产品分类 */
  getGoodsType: function () {
    let typeCodes = JSON.stringify([
      "original",
      "universalRebate",
    ])
    if (this.data.inreward) {
      typeCodes = JSON.stringify([
        "inreward",
      ])
    }
    http.get(
      app.globalData.business_host + "eventType/getEventTypes", {
        storeCode: this.data.merchantCode,
        countEvent: 1,
        statuses: JSON.stringify(["1"]),
        typeCodes: typeCodes,
        excludeEmpty: 1,
        productStatuses: JSON.stringify(["1"]),
      },
      (_status, _resultCode, _message, _data) => {
        console.log(_data)
        let gtl = []
        gtl.push({
          code: "",
          name: "全部商品",
          count: _data.allCount
        })
        gtl = gtl.concat(_data.typeList)
        this.setData({
          goodsTagList: gtl,
        })
      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

  /** 获取货源分类 */
  getSourceType: function () {
    http.get(
      app.globalData.business_host + "eventType/getProductTypes", {
        storeCode: this.data.merchantCode,
        countProduct: 1,
        statuses: JSON.stringify(["1"]),
        excludeEmpty: 1,
        agency: 1,
      },
      (_status, _resultCode, _message, _data) => {
        console.log(_data)
        let gtl = []
        gtl.push({
          code: "",
          name: "全部仓货",
          count: _data.allCount
        })
        gtl = gtl.concat(_data.typeList)
        if (_data.otherCount > 0) {
          gtl.push({
            code: "0",
            name: "未分类",
            count: _data.otherCount
          })
        }
        this.setData({
          sourceTagList: gtl,
        })
      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

  /** 切换分类类型 */
  bindchange: function (e) {
    console.log(e)
    this.setData({
      categoryTypeIndex: e.detail.current,
    })
  },

  /** 检查用户状态 */
  checkUser: function () {
    let that = this
    let isCheckIn = false
    let isLogin = false
    if (wx.getStorageSync("myMerchantInfo") || app.globalData.myMerchantInfo != "") {
      isCheckIn = true
    }
    if (wx.getStorageSync('user')) {
      isLogin = true
    }

    wx.setNavigationBarTitle({
      title: that.data.inreward ? "商品分类" : !isLogin || !isCheckIn ? "商品分类" : "查看分类",
    })

    this.setData({
      isLogin: isLogin,
      isCheckIn: isCheckIn,
    })
  },

  stopTouchMove: function () {
    return false;
  },

  /** 前往商品列表 */
  goToGoodsList: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_activity/goods_list/goods_list?goodsTypeHidden=' + false + '&name=' + e.currentTarget.dataset.item.name + '&categoryCode=' + e.currentTarget.dataset.item.code + '&storeCode=' + this.data.merchantCode + "&userRole=" + this.data.userRole + "&inreward=" + this.data.inreward + "&clerk_code=" + this.data.clerk_code,
    })
  },

  /** 货源列表 */
  goToSourceList: function (e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    let preData = {}
    preData["index"] = e.currentTarget.dataset.index
    preData["item"] = e.currentTarget.dataset.item
    prevPage.setData({
      predata: preData,
    })
    wx.navigateBack({
      delta: 1,
    })
  },
})