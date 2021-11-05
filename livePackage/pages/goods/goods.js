// miniprogram/pages/live/goods/goods.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
var RSAKey = require('../../../utils/rsa-client.js');
var base64 = require('../../../utils/base64.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchant_code: "", //商家code
    clerk_code: "", //名片code
    iPhone_X: "", //是否时苹果X
    pageIndex: 1,
    pageLimit: 20,
    business_activity_list: [],
    business_activity_list_new: [],
    pageIndex_add: 0, //二维数组下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.merchantCode) {
      this.setData({
        merchant_code: options.merchantCode
      });
      this.getBusinessInfo();
    }
    if (options.clerkCode) {
      this.setData({
        clerk_code: options.clerkCode,
      })
    }
    this.setData({
      lander: wx.getStorageSync('user'),
      iPhone_X: app.globalData.iPhone_X
    });
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
    if (this.data.merchant_code != "") {
      this.getBusinessActivity()
    }
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
    this.setData({
      pageIndex: this.data.pageIndex + 1,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getBusinessActivity();
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }

  /**
   * 获取企业详情信息
   */
  getBusinessInfo: function () {
    http.get(
      app.globalData.host + "/biz/user/merchant/info", {
        merchantCode: this.data.merchant_code
      },
      (status, resultCode, message, data) => {
        data.dis = app.getDisance(data.lat, data.lng)
        this.setData({
          business_info: data
        });
        wx.setNavigationBarTitle({
          title: this.data.business_info.name
        })
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: message,
          icon: "none"
        })
        if(status == 500){
          this.setData({
              merchant_err: true
          });
        }
        wx.hideLoading()
      }
    );
  },

  /**
   * 获取企业活动
   */
  getBusinessActivity: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    http.get(
      app.globalData.business_host + "fastevent/inrewardPage", {
        pageIndex: this.data.pageIndex,
        pageLimit: this.data.pageLimit,
        storeCode: this.data.merchant_code,
        sortType: 'customize',
        sortOrder: 'asc'
      },
      (status, resultCode, message, data) => {
        if (data.list.length < 1) {
          wx.hideLoading();
        }

        this.setData({
          business_activity_list_new: data.list,
        });
        this.handlerActivitiList();
      },
      (status, resqultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 处理活动列表
   */
  handlerActivitiList: function () {
    for (let i = 0; i < this.data.business_activity_list_new.length; i++) {
      let list = this.data.business_activity_list_new[i];
      if (!list) {
        wx.hideLoading();
        return
      }
      if (list.fileJson) {
        let key_title = list.title;
        let obj = {};
        obj.pic = JSON.parse(list.fileJson).illustration[0];
        if (obj.pic) {
          obj.type = util.getUrlType(JSON.parse(list.fileJson).illustration[0])
        }
        this.data.business_activity_list_new[i].illustration = obj.pic;
        this.data.business_activity_list_new[i].videoType = obj.type;
        this.data.business_activity_list_new[i].product.price = util.priceSwitch(this.data.business_activity_list_new[i].minPrice);
        this.data.business_activity_list_new[i].minPriceDisplay = util.priceSwitch(this.data.business_activity_list_new[i].minPrice);
        this.data.business_activity_list_new[i].maxPriceDisplay = util.priceSwitch(this.data.business_activity_list_new[i].maxPrice);
        this.data.business_activity_list_new[i].discountPrice = util.priceSwitch(this.data.business_activity_list_new[i].discountPrice);
        this.data.business_activity_list_new[i].dis = app.getDisance(this.data.business_activity_list_new[i].merchant.lat, this.data.business_activity_list_new[i].merchant.lng);
      } else {
        this.data.business_activity_list_new.splice(i, 1);
        i = i - 1;
      }

    }
    this.setData({
      ['business_activity_list[' + this.data.pageIndex_add + ']']: this.data.business_activity_list_new
    });
    wx.hideLoading();
  },

  /** 前往商品详情 */
  goToDetail: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_detail/business_detail?code=' + e.currentTarget.dataset.code + "&activityType=" + e.currentTarget.dataset.activitytype + "&clerk_code=" + this.data.clerk_code,
    })
  },

  /** 发送商品 */
  sendGoods: function (e) {
    let goods = e.currentTarget.dataset.goods
    console.log(goods);
    wx.setStorageSync('waitSendGoods', goods)
    wx.navigateBack({
      delta: 0,
    })
  },
})