// miniprogram/pages/tabBar_activity/search_page/search_page.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotLabel: "",
    searchText: "",
    pageIndex: 1,
    pageLimit: 10,
    historyLabel: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getHistoryLabel();
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

  // }
  /**
   * 获取热门搜索标签searchHistory/hotList
   */
  getHotServiceTags: function () {
    http.get(
      app.globalData.host + "searchHistory/hotList", {
        pageIndex: 0,
        pageLimit: 10
      },
      (status, resultCode, message, data) => {
        this.setData({
          hotLabel: data
        })

      },
      (status, resultCode, message, data) => {

      }
    );
  },

  /**
   * 输入搜索内容
   */
  changeSearchText: function (e) {
    this.setData({
      searchText: e.detail.value
    });
  },

  /**
   * 搜索，跳转搜索结果页
   */
  jumpSearchResults: function () {
    this.saveSearchText(this.data.searchText);
    wx.navigateTo({
      url: '/pages/tabBar_activity/search_results/search_results?keyword=' + this.data.searchText,
    })
  },

  /**
   * 点击标签跳到搜索结果页
   */
  jumpSearchResult: function (e) {
    this.saveSearchText(e.currentTarget.dataset.keyword);
    wx.navigateTo({
      url: '/pages/tabBar_activity/search_results/search_results?keyword=' + e.currentTarget.dataset.keyword,
    })
  },

  /**
   * 保存历史记录
   */
  saveSearchText: function (value) {
    if (value || value.trim().length > 0) {
      var flag = true;
      for (var i = 0; i < this.data.historyLabel.length; i++) {
        if (this.data.historyLabel[i].keyword == value) {
          flag = false;
        }
      }

      if (flag) {
        var searchText_item = {};
        searchText_item.keyword = value;
        this.data.historyLabel.push(searchText_item)
        this.setData({
          historyLabel: this.data.historyLabel
        });
        wx.setStorageSync('historyLabel', this.data.historyLabel)
      }
    }
  },


  /**
   * 获取历史记录
   */
  getHistoryLabel: function () {
    var history_label = wx.getStorageSync('historyLabel');
    if (!history_label) {
      this.setData({
        historyLabel: []
      });
    } else {
      this.setData({
        historyLabel: history_label
      });
    }
  },

  /**
   * 清楚历史记录
   */
  clearHistory: function () {
    wx.showModal({
      title: '是否清空记录',
      content: '',
      success: res => {
        if (res.confirm) {
          try {
            wx.removeStorageSync('historyLabel');
            this.getHistoryLabel();
          } catch (e) {
            wx.showToast({
              title: '清除失败',
            })
          }
        } else if (res.cancel) {}
      }
    })

  }
})