// pages/tab_index/open_setting/open_setting.js
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  openSetting:function(){
    wx.openSetting({
      success: res => {
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
        if (res.authSetting["scope.userLocation"]){
          wx.getLocation({
            type: 'wgs84',
            success: res => {
              var qqmapsdk = new QQMapWX({
                key: app.globalData.qqMapKey
              });
              // 调用接口
              var that = this;
              app.globalData.current_lat = res.latitude;
              app.globalData.current_lng = res.longitude;
              qqmapsdk.reverseGeocoder({
                location: {
                  latitude: res.latitude,
                  longitude: res.longitude
                },
                success: function (res) {

                  app.globalData.city_info.name = res.result.address_component.city;
                  app.globalData.city_info.cityInit = res.result.address_component.city.substr(0, res.result.address_component.city.length - 1)
                  app.globalData.city_info.district = res.result.address_component.district;

                  app.getCurrentCity(app.globalData.city_info.name);
                  app.getCityId(app.globalData.city_info.name, app.globalData.city_info.district, app.globalData.current_lng, app.globalData.current_lat);
                },
                fail: function (res) {
                  
                },
                complete: function (res) {
                  
                }
              });
              

            },
            fail: res => {
              
            }
          });
        }
        
      },
      fail: res => {
        
      }
    })
  }
})