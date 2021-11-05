// pages/tab_index/search_results/search_results.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');

//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    pageLimit: 10,
    pageIndex_add: 0, //二维数组下标
    business_list_data: [], //企业列表数据
    networkType: true, //网络连接标识
    orderBy: "distance" //按什么排序
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keyword: options.keyword
    });
    this.getServiceListByKeyword();
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
    if (app.globalData.openLocations) {
      this.setData({
        openLocations: app.globalData.openLocations
      });
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
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 2000,
      complete: res => {
        this.reloadThePage();
        wx.stopPullDownRefresh()

      }
    })
  },

  /**
   * 重新加载页面
   */
  reloadThePage: function () {
    this.setData({
      pageIndex: 0,
      pageIndex_add: 0,
      pageLimit: 10,
      business_list_data: [], //企业列表数据
    });
    this.getServiceListByKeyword();
  },





  /**
   * 获取某类别的列表
   */
  getServiceListByKeyword: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    this.setData({
      scanCount: 0, //当前循环下表
      scanCountMax: "", //当前循环数字的长度
      business_list_data_temp: [], //临时存放取出来的企业列表
    });
    http.get(
      app.globalData.host + "/biz/user/merchant/list", {
        skip: this.data.pageIndex,
        limit: this.data.pageLimit,
        lng: app.globalData.current_lng,
        lat: app.globalData.current_lat,
        merchantCityId: app.globalData.city_info.id ? app.globalData.city_info.id : 1,
        type: "country",
        orderBy: this.data.orderBy,
        filter: this.data.keyword
      },
      (status, resultCode, message, data) => {
        if (data.length < 1) {
          this.setData({
            noMore: true
          });
        } else {
          this.setData({
            noMore: false
          });
        }
        this.setData({
          business_list_data_temp: data,
          scanCountMax: data.length
        })
        this.handleBusinessListData(data);
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },


  /**
   * 处理列表数据
   */
  handleBusinessListData: function (business_list_data_temp) {
    if (business_list_data_temp.length == 0) {
      wx.hideLoading()
      if (this.data.business_list_data.length == 0) {
        this.setData({
          hidden_business_list_data: true,
        });
      }
      return
    }
    for (var i = 0; i < business_list_data_temp.length; i++) {
      business_list_data_temp[i].dis = app.getDisance(business_list_data_temp[i].lat, business_list_data_temp[i].lng);
      if (business_list_data_temp[i].code == '2051926198357107716' || business_list_data_temp[i].code == '2035726524029101538' || business_list_data_temp[i].code == '2051726199507104615' || business_list_data_temp[i].code == '2031926253218105346' || business_list_data_temp[i].code == '2051926235889101484' || business_list_data_temp[i].code == '2031926202784107139' || business_list_data_temp[i].code == '2041926294948107448' || business_list_data_temp[i].code == '2051926313601105151' || business_list_data_temp[i].code == '2031726268702109829' || business_list_data_temp[i].tagName.indexOf('中医') > -1 || business_list_data_temp[i].tagName.indexOf('医') > -1 || business_list_data_temp[i].tagName.indexOf('保健') > -1) {
        business_list_data_temp.splice(i, 1);
        i = i - 1;
      }
    }
    this.setData({
      ['business_list_data[' + this.data.pageIndex_add + ']']: business_list_data_temp
    });
    wx.hideLoading();
  },



  /**
   * 上拉加载更多
   */
  onReachBottom: function () {
    this.setData({
      pageIndex: this.data.pageIndex + 10,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getServiceListByKeyword();
  },






  /**
   * 跳转至企业首页
   */
  navigationBusinessDetails: function (e) {
    wx.showLoading({
      title: '跳转中',
    })
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + e.currentTarget.dataset.merchantcode + '&tagCode=' + e.currentTarget.dataset.tagcode + '&userId=' + e.currentTarget.dataset.userid,
    })
  },

  /**
   * 执行搜索
   */
  executeSearch: function (e) {
    this.setData({
      keyword: e.detail
    });
    this.reloadThePage();
  },


  /**
   * 跳到搜索结果页
   */
  jumpSearchResults: function (e) {
    wx.navigateTo({
      url: '../search_results/search_results?keyword=' + e.currentTarget.dataset.keyword,
    })
  },

})