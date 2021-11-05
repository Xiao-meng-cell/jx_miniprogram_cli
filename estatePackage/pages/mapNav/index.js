// estatePackage/pages/mapNav/index.js
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ossPath: "http://izsyue.oss-cn-shenzhen.aliyuncs.com/assets/applets/enterpriseEdition/images/",
    lat: 23.099994,
    lng: 113.324520,
    enableSatellite: false, //是否启用卫星图
    scale: 16,
    markers: [],
    hight: 0,
    title: '',
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hight: app.globalData.windowHeight
    })
    qqmapsdk = new QQMapWX({
      key: app.globalData.qqMapKey
    });
    this.mapCtx = wx.createMapContext('map')
    this.initMap(options);
  },
  initMap(options) {
    console.log('options',options)
 
    wx.setNavigationBarTitle({
      title: options.title
    })
    let that = this
    let markers = []
    let keyword = options.keyword 
    let icon_position = "position@3x.png"
    if (keyword == '交通') {
      icon_position = 'position-bus@3x.png'
    } else if (keyword == '餐饮') {
      icon_position = 'position_ranstuarant@3x.png'
    } else if (keyword == '学校') {
      icon_position = 'potition-school@3x.png'
    } else if (keyword == '银行') {
      icon_position = 'position-bank@3x.png'
    } else if (keyword == '医院') {
      icon_position = 'position-hospital@3x.png'
    } else if (keyword == '购物') {
      icon_position = 'position-shopping@3x.png'
    }
    markers.push({
      iconPath: that.data.ossPath + icon_position,
      title: options.title,
      id: 0,
      longitude: options.lng,
      latitude: options.lat,
      width: 30,
      height: 35,
      callout: {
        content: options.title || '',
        fontSize: 12,
        borderRadius:4,
        bgColor: "#FFF",
        padding: 4,
        display: "ALWAYS",
        textAlign: "center"
        }  
    })
    this.setData({
      lat: options.lat,
      lng: options.lng,
      title: options.title,
      keyword: options.keyword,
      markers: markers
    })
    

  },
  scaleTap(e) {
    this.setData({
      scale: this.data.scale + e.currentTarget.dataset.scale
    })
  },
  //启用、关闭微信他
  satelliteChange(e) {
    this.setData({
      enableSatellite: e.currentTarget.dataset.id
    })
  },
})