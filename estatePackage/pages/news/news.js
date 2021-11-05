// estatePackage/pages/news/news.js
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
    newsType: "",
    eventCode: "",
    clerk_code: "",
    productCode: "",
    houseList: [],
    loadAll: false,
    pageIndex: 1,
    listEmpty: false,

    //雷达数据采集所需数据
    scene: '',
    sceneDT: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.getOptions(options, function (data, fromApp) {
      that.initOptions(data)
      if (fromApp == 1) {
        that.onShow()
      }
    })
  },

  //初始化参数
  initOptions(options) {
    if (options.merchantCode) {
      this.setData({
        merchantCode: options.merchantCode,
      })
    }
    if (options.newsType) {
      this.setData({
        newsType: options.newsType,
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
    if (options.clerk_code) {
      this.setData({
        clerk_code: options.clerk_code,
      })
    }
    if (options.sceneType) {
      this.setData({
        scene: options.sceneType
      });
    }
    if (options.sceneDT) {
      this.setData({
        sceneDT: options.sceneDT
      });
    }
    this.getEstateList();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.newsType != 1 || this.data.newsType == '') {
      this.businessNews = this.selectComponent("#business_news")
      this.businessNews.loadMore()
    } else {
      //避免无数据时触发触底加载
      if (!this.data.houseList[0]) {
        return
      }
      if (!this.data.loadAll) {
        this.setData({
          pageIndex: this.data.pageIndex + 1,
        })
        this.getEstateList()
      }
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  /*
   *监听屏幕滚动 判断上下滚动
   */
  onPageScroll: function (ev) {
    //计算页面深度用
    let scrollH = parseInt(ev.scrollTop); // 滚动高度
    let pageHeight = this.data.pageHeight;
    let clientH = this.data.winHeight; //屏幕高度
    let result = Math.round(scrollH / Math.abs(pageHeight - clientH) * 100); // 百分比
    this.setData({ //滚动条距离顶部高度
      progress: result
    })
    console.log(this.data.progress)
  },

  //获取户型列表
  getEstateList: function () {
    wx.showLoading({
      title: '数据加载中...',
    })
    http.get(
      app.globalData.business_host + "estate/unit/list", {
        index: this.data.pageIndex,
        limit: 20,
        merchantCode: this.data.merchantCode,
      },
      (_status, _resultCode, _message, data) => {
        if (data.count == 0) {
          this.setData({
            listEmpty: true
          })
        }
        if (data.list.length < 1 || data.list.length < 20) {
          this.setData({
            loadAll: true,
          })
          wx.hideLoading();
        }
        this.setData({
          houseList: data.list,
          // showEstate:!this.data.showEstate
        })
        if (data.list.length > 0) {
          this.handlerHousesData(data.list)
        }
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },
  handlerHousesData: function (list) {
    for (let i in list) {
      let item = list[i]
      //显示价格 start
      let displayPrice = ""
      if (item.sellingPriceType == 1) {
        displayPrice = "售价："
        if (item.isNegotiable == 0) {
          displayPrice = displayPrice + item.price
        } else {
          displayPrice = displayPrice + "咨询价格"
        }
      } else if (item.sellingPriceType == 2) {
        displayPrice = "首付："
        if (item.isNegotiable == 0) {
          displayPrice = displayPrice + item.price
        } else {
          displayPrice = displayPrice + "咨询价格"
        }
      } else if (item.sellingPriceType == 3) {
        displayPrice = "价格面议"
      }
      item["displayPrice"] = displayPrice
      //显示价格 end
      for (let j in item.medias) {
        let mediaObj = item.medias[j]
        if (mediaObj.type == "image") {
          item["image"] = mediaObj.url
          break
        }
      }
    }
    this.setData({
      houseList: list,
      // showEstate:!this.data.showEstate
    })
    wx.hideLoading()
  },

  /** 跳转户型页 */
  goToHouseLayout: function (e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/estatePackage/pages/houseLayout/houseLayout?id=' + item.id + '&higherLevelCode=' + app.globalData.higherLevelCode + '&fromNews=false&sceneType=' + this.data.scene + "&sceneDT=" + this.data.sceneDT + "&clerkCode=" + this.data.clerk_code,
    })
  },
})