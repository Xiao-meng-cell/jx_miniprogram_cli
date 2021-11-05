// pages/tabBar_index/switch_city1/switch_city.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');





//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinceList:[],
    cityList:[],
    chooseProvince:"01001",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getCityList();
    this.getCityByCode();
    
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
    this.checkingLocatin();
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

  /**
   * 获取省份列表列表
   */
  getCityList:function(){
    http.get(
      app.globalData.host + "city/list",
      {
        pcode:"01"
      },
      (status, resultCode, message, data) => {
        this.setData({
          provinceList:data
        });
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '获取省份错误',
        })
      }
    );
  },

  /**
   * 点击省份，获取城市
   */
  getCityByCode:function(){ 
    http.get(
      app.globalData.host + "city/children",
      {
        pcode: this.data.chooseProvince
      },
      (status, resultCode, message, data) => {
        this.setData({
          cityList: data
        });
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '获取城市错误',
          icon:"none"
        })
      }
    );
  },

  /**
   * 选择省份,获取城市
   */
  chooseProvince:function(e){
    this.setData({
      chooseProvince: e.currentTarget.dataset.code
    });
    this.getCityByCode();
  },

  /**
   * 点击选择城市
   */
  chooseCity:function(e){
    http.get(
      app.globalData.host + "city",
      {
        city: e.currentTarget.dataset.name
      },
      (status, resultCode, message, data) => {
        app.globalData.city_info = data;
        app.globalData.changeCity = true;
        wx.navigateBack({
          delta: 1
        })
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '获取城市错误',
          icon:"none"
        })
      }
    );
  },

  /**
   * 检测用户是否有授权位置
   */
  checkingLocatin:function(){
    // wx.getSetting({
    //   success(res) {
    //     console.log(res);
    //     if (!res.authSetting["scope.userLocation"]) {
    //         wx.showModal({
    //           title: '位置授权',
    //           content: '当前获取位置未授权，可在设置中授权',
    //           confirmText: "去授权",
    //           cancelText: "取消",
    //           success: res => {
    //             if (res.confirm) {
    //               wx.navigateTo({
    //                 url: "/pages/tabBar_user_center/open_setting/open_setting",
    //               })
    //             }
    //             if (res.cancel) {
    //               wx.reLaunch({
    //                 url: "/pages/tabBar_index/index/index",
    //               })
    //             }

    //           }
    //         })
          
    //     }
    //   }
    // })
  }

})