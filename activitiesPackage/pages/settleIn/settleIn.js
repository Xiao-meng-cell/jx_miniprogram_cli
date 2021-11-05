// activitiesPackage/pages/settleIn/settleIn.js
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courtesy1: [],
    courtesy2: [],
    courtesy3: [],
    courtesy4: [],
    courtesy5: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEventData();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getEventData: function () {
    http.get(
      app.globalData.business_host + "platformAlliance/page/filter", {
        sortOrder: 'asc',
        sortType: 'customizeKey',
        platformType: '2',
        groupCode: 'precise.marketing.tool.poster' //平台type 1-骆越广西, 2-掌创人生
      },
      (status, resultCode, message, data) => {
        let courtesy1 = this.data.courtesy1;
        let courtesy2 = this.data.courtesy2;
        let courtesy3 = this.data.courtesy3;
        let courtesy4 = this.data.courtesy4;
        let courtesy5 = this.data.courtesy5;
        for (let i in data.list) {
          if (data.list[i].customizeKey.indexOf('HL1') != -1) {
            courtesy1.push(data.list[i]);
          }
          if (data.list[i].customizeKey.indexOf('HL2') != -1) {
            courtesy2.push(data.list[i]);
          }
          if (data.list[i].customizeKey.indexOf('HL3') != -1) {
            courtesy3.push(data.list[i]);
          }
          if (data.list[i].customizeKey.indexOf('HL4') != -1) {
            courtesy4.push(data.list[i]);
          }
          if (data.list[i].customizeKey.indexOf('HL5') != -1) {
            courtesy5.push(data.list[i]);
          }
        }
        this.setData({
          courtesy1: courtesy1,
          courtesy2: courtesy2,
          courtesy3: courtesy3,
          courtesy4: courtesy4,
          courtesy5: courtesy5
        });
        // console.log('==========', this.data.courtesy1);
      },
      (status, resultCode, message, data) => {
      }
    );
  },

  /**立即购买详情 */
  goGoodsDetail: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_detail/business_detail?code=' + e.currentTarget.dataset.code,
    })
  }
})