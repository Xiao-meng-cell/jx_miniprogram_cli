// miniprogram/pages/tabBar_user_center/manager/inputqrcode/inputqrcode.js
var RSAKey = require('../../../../utils/rsa-client.js');
var base64 = require('../../../../utils/base64.js');
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
// 引入SDK核心类
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    landers: '', //用户
    merchantName: null, //1企业名称
    checkedTypeBean: null, //2企业分类
    defaultPhoneNum: null, //3默认的联系电话号码
    array: [], //默认显示一个
    inputVal: [], //3所有input的内容
    addr_selected: "",
    address: null, //4企业定位
    recommender: null, //5推荐人
    checkinList: [], //优惠价格列表
    selectedPrice: '0', //已经选择的价格
    selectedUnit: '未选', //已经选择的单位
    selectedType: null, //6已经选择的价格类型
    latitude: 0,
    longitude: 0,
    headImage: null, //7店家封面
    cityId: '', //城市id
    cityName: null, //城市名称
    postParams: null, //提交的总参数
    qrcode: "", //优惠券码
    vasCoupon: "", //增值服务券
    checkInType: 'business', //入驻类型，默认：普通企业
    operate: "checkin",
    operateName: "入驻",
    vasSeleced: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      checkInType: options.checkInType,
    });
    if (options.operate) {
      let operateName = ""
      switch (options.operate) {
        case "checkin":
          operateName = "入驻"
          break;
        case "upgrade":
          operateName = "升级"
          break;
        case "renew":
          operateName = "续费"
          break;
        default:
          break;
      }
      this.setData({
        operate: options.operate,
        operateName: operateName,
      })
    }
    if (options.vas) {
      this.setData({
        vasSeleced: options.vas == "true" ? true : false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 获取优惠券码
   */
  getQRCodeInputVal: function (e) {
    var val = e.detail.value; //获取输入的值
    this.setData({
      qrcode: val
    })
  },

  /**
   * 获取优惠券码
   */
  getVasCouponInputVal: function (e) {
    var val = e.detail.value; //获取输入的值
    this.setData({
      vasCoupon: val
    })
  },

  /**
   * 获取入驻费列表
   */
  submitQRCode: function () {
    console.log("获取入驻费列表")
    var that = this;
    let services = []
    if (that.data.vasCoupon != "") {
      services.push({
        code: "merchant.public.flow",
        ticketCode: that.data.vasCoupon,
      })
    }
    var params = {
      ticketCode: that.data.qrcode,
      merchantType: that.data.checkInType,
      services: services.length > 0 ? JSON.stringify(services) : undefined,
    };
    let url = ""
    if (this.data.operate == "checkin") {
      url = "biz/user/merchant/pay/batch/checkin/fee/info"
    } else if (this.data.operate == "upgrade") {
      url = "biz/user/merchant/pay/batch/upgrade/fee/info"
    } else if (this.data.operate == "renew") {
      url = "biz/user/merchant/pay/batch/renew/fee/info"
    } else if (this.data.operate == "vas") {
      url = "biz/user/merchant/pay/batch/service/fee/info"
    }
    wx.showLoading({
      title: '正在加载中...',
    })
    http.get(
      app.globalData.host + url, params,
      (status, resultCode, message, data) => {
        wx.hideLoading();
        app.globalData.coupon_code = that.data.qrcode
        app.globalData.vasCoupon = that.data.vasCoupon
        var pages = getCurrentPages(); // 获取页面栈
        var prevPage = pages[pages.length - 2]; // 上一个页面
        prevPage.setData({
          ticketCode: that.data.qrcode,
          vasCoupon: that.data.vasCoupon,
        })
        if (this.data.operate == "checkin") {
          prevPage.getCheckInPrice();
        } else if (this.data.operate == "upgrade") {
          prevPage.loadCheckinInfo()
        } else if (this.data.operate == "renew") {
          prevPage.getCheckInPrice()
        } else if (this.data.operate == "vas") {
          prevPage.getCheckInPrice()
        }
        wx.navigateBack({
          delta: 1
        })
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        let msg = message
        if (message == "优惠券不能在续费时使用!") {
          msg = "优惠券类型错误"
        }
        wx.showToast({
          title: msg,
          icon: "none",
          duration: 2000
        })
      });
  },

  /**
   * 点击选择地址
   */
  chooseLocation: function () {
    wx.chooseLocation({
      success: res => {
        this.setData({
          addr_selected: res,
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude,
        })
        // 调用接口
        var that = this;
        var qqmapsdk = new QQMapWX({
          key: app.globalData.qqMapKey
        });
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            that.cityName = res.result.address_component.city;
            that.getCityId();
            that.setData({
              cityName: res.result.address_component.city
            });
          },
          fail: function (res) {},
          complete: function (res) {}
        });
      },
      fail: res => {
        wx.getSetting({
          success(res) {
            if (!res.authSetting["scope.userLocation"]) {
              wx.showModal({
                title: '位置授权',
                content: '当前获取位置未授权，可在设置中授权',
                confirmText: "去授权",
                cancelText: "取消",
                success: res => {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: "/pages/tabBar_user_center/open_setting/open_setting",
                    })
                  }

                }
              })
            }

          }
        })
      }
    })
  },

  /**
   * 获取选择的城市id
   */
  getCityId: function () {
    var that = this;
    let simpleCity = that.cityName.length > 2 ? that.cityName.replace("市", "") : that.cityName;
    var params = {
      city: simpleCity
    };
    http.get(
      app.globalData.host + 'city', params,
      (status, resultCode, message, data) => {
        that.setData({
          cityId: data.id,
        });
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '获取数据失败！',
          duration: 2000
        })
      });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      qrcode: app.globalData.coupon_code,
      vasCoupon: app.globalData.vasCoupon,
    })
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
  // onShareAppMessage: function() {

  // }
})