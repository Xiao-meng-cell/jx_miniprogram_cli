// expandPackage/pages/businessDynamic/businessDynamic.js
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDefalutBack: false,
    capsuleTop: 0,
    merchantCode: "", //商家编号
    newsTypes: "", //动态类型
    newsTypeItemWidth: 80,
    selectedTabIndex: 0,
    selectedTab: "",
    offset: 0,
    showTitle: false,
    newsIndex: 0,
    keepout: false,
    scrollLeft: '',
    scrollViewWidth: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.merchantCode) {
      this.setData({
        merchantCode: options.merchantCode,
      })
    }else{
      this.setData({
        merchantCode: app.globalData.defaultMerchantCode,
      })
    }
    this.getNewsTypeList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      capsuleTop: app.globalData.capsuleTop,
    });
    wx.createSelectorQuery().select('.scvNewsType').boundingClientRect((rect) => {
      this.data.scrollViewWidth = Math.round(rect.width)
    }).exec()
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
    this.businessNews = this.selectComponent("#business_news")
    this.businessNews.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

    /**
   * 返回上一页
   */
  backPreviousPage: function () {
    var pages = getCurrentPages();
    if (this.data.keepout) {
      this.setData({
        keepout: false
      });
    } else {
      if (pages.length > 1) {
        wx.navigateBack({
          delta: 1
        })
      } else {
        this.backIndexPage()
      }
    }
  },

  /**
   * 返回首页
   */
  backIndexPage: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage',
    })
  },

  /** 获取动态类型 */
  getNewsTypeList: function () {
    http.get(
      app.globalData.host + "biz/user/merchant/news/type/list", {
        merchantCode: this.data.merchantCode,
      },
      (_status, _resultCode, _message, _data) => {
        this.handlerNewsType(_data)
      },
      (_status, _resultCode, _message, _data) => {}
    )
  },

  handlerNewsType: function (list) {
    if (list && list.length > 0) {
      list.unshift({
        id: "",
        type: "",
        typeName: "全部",
      })
      this.setData({
        newsTypes: list,
      })
    }
  },

  /** 选择动态类型 */
  changeNewsType: function (e) {
    let offsetLeft = e.currentTarget.offsetLeft;
    this.setData({
      selectedTab: e.currentTarget.dataset.item,
      selectedTabIndex: e.currentTarget.dataset.index,
      newsIndex: e.currentTarget.dataset.index,
      offset: e.currentTarget.dataset.index * this.data.newsTypeItemWidth,
      scrollLeft: offsetLeft - this.data.scrollViewWidth / 2
    })
    this.businessNews = this.selectComponent("#business_news")
    this.businessNews.clearDataStatus()
    this.businessNews.getNewsList()
  },
  /**展示分类 */
  showClassify: function () {
    this.setData({
      keepout: !this.data.keepout,
    })
  },
  newsCategoryFn: function (e) {
    let index = e.currentTarget.dataset.index1;
    let offsetLeft = e.currentTarget.offsetLeft;
    this.setData({
      keepout: !this.data.keepout,
      newsIndex: index,
      selectedTabIndex: index,
      selectedTab: e.currentTarget.dataset.item1,
      offset: index * this.data.newsTypeItemWidth,
      scrollLeft: index * this.data.newsTypeItemWidth - offsetLeft
    })
      this.businessNews = this.selectComponent("#business_news")
      this.businessNews.clearDataStatus()
      this.businessNews.getNewsList()
  },
})