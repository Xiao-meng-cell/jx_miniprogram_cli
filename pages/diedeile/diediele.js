
//获取应用实例
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
var crypto = require('../../utils/crypto.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventCode:"",
    shareUserId:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //解析参数
    // getApp().getOptions(options).then(op => {
      if(options.shareUserId){
        this.setData({ shareUserId:options.shareUserId })
      }
      if(options.eventCode){
        this.setData({ eventCode:options.eventCode })
      }
      console.log('webViewLive: ',options);
    // });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //强制登录
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '/pages/authorization/authorization',
      })
    }else{
      //加一个延迟，防止getOptions执行太久
      setTimeout(() => {
        this.getLoginToken()
      }, 500);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取登录令牌
   getLoginToken:function(){
    let {
      shareUserId,
      eventCode
    } = this.data
    http.get(
      app.globalData.host + "login/token", {
      },
      (_status, _resultCode, _message, data) => {
        let ssdid = wx.getStorageSync("ssdid") ? wx.getStorageSync("ssdid") : random(32);
        let principal = wx.getStorageSync("principal") || '';
        let urlPre = "https://h5.vicpalm.com/weclubbing";
        if (app.globalData.h5PathTest) {
          urlPre = "https://h5.vicpalm.com/testprojectonline";
        }
        // let url= urlPre + '/totalCoupon?shareUserId=' + wx.getStorageSync('user').id +'&eventCode='+this.data.eventCode
        let baseUrl = urlPre + '/totalCoupon?shareUserId=' + shareUserId +'&eventCode='+ eventCode
        baseUrl += '&ssdid=' + ssdid + '&token=' + data + '&fromType=wxApp' + '&principal=' + principal  + '&batchShare=' + getApp().globalData.batchShare
        console.log('baseUrl: ',baseUrl)
        let webUrl = encodeURIComponent(baseUrl); //编码
        wx.redirectTo({
          url: "/pages/web_view_html/web_view_html?webUrl=" + webUrl
        })
        // utils.router('webView', 'webUrl=' + webUrl , {
        //   type: 'redirect',
        //   checkLogin: false
        // });
      },
      (_status, _resultCode, _message, _data) => {}
  )
  },
})