// pages/tabBar_index/logistics_info_detail/logistics_info_detail.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    province: "**省", //发货地省份
    city: "**市", //发货地城市
    area: "**区", //发货地城区
    chargeType: "", //计算方式(1：重量；2：件数)
    freeShippAreaList: [], //物流列表
    payAreaList: [], //付费列表
    notlogisticAreaList: [], //不配送列表
    unit: "**", //计算单位
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleData(options)
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
  // onShareAppMessage: function () {

  // },

  /** 处理数据 */
  handleData: function (obj) {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    if (obj.tcode == "null") {
      let goodsObj = app.globalData.goodsDetail
      this.setData({
        city: goodsObj.store.merchantCity.name + "市",
        province: goodsObj.store.merchantProvince ? goodsObj.store.merchantProvince.name : "",
        area: goodsObj.store.merchantArea ? goodsObj.store.merchantArea.name : "",
      })
      http.get(
        app.globalData.business_host + "city/list", {
          pcode: "01",
        },
        (status, resultCode, message, data) => {
          this.setData({
            freeShippAreaList: data,
          })
          wx.hideLoading()
        },
        (status, resultCode, message, data) => {
          wx.hideLoading()
        }
      );
      wx.hideLoading()
    } else {
      http.get(
        app.globalData.business_host + "logisticstemple/info", {
          code: obj.tcode,
        },
        (status, resultCode, message, data) => {
          console.log("查看物流模板成功！")
          console.log(data)
          if (data) {
            let unit = "**"
            if (data.chargeType == 1) {
              unit = "重量"
            } else if (data.chargeType == 2) {
              unit = "件"
            }

            this.setData({
              province: data.sourceProvinceName,
              city: data.sourceCityName,
              area: data.sourceAreaName,
              freeShippAreaList: data.freeShippAreaList,
              payAreaList: data.payAreaList,
              notlogisticAreaList: data.notlogisticAreaList,
              chargeType: data.chargeType,
              unit: unit,
            })
          } else {
            wx.showToast({
              title: '获取物流模板失败！',
              icon: 'none',
              mask: true,
            })
          }
          wx.hideLoading()
        },
        (status, resultCode, message, data) => {
          console.log("查看物流模板失败！")
          wx.hideLoading()
        }
      );
    }
  },
})