// widget/map/map.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

//获取应用实例
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 地图组件坐标
    mapData: {
      type: Object,
      value: {
        latitude: 23.099994,
        longitude: 113.324520,
      }
    },
    //显示控件
    showControls: {
      type: Boolean,
      value: true
    },
    // 地图组件高度
    height: {
      type: Number,
      value: 200
    },
    //关键字
    keyword: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    ossPath: "http://izsyue.oss-cn-shenzhen.aliyuncs.com/assets/applets/enterpriseEdition/images/",
    icon_position: "icon_position_20@2x.png",
    enableSatellite: false, //是否启用卫星图
    scale: 16,
    markers: [],
    controls: [{
      id: 1,
      value: "交通",
      icon: "icon_bus@3x.png",
      activeIcon: "icon_blue_bus@3x.png",
      markerIcon: "position-bus.png"
    },
    {
      id: 2,
      value: "餐饮",
      icon: "icon_ranstuarant@3x.png",
      activeIcon: "icon_blue_ranstuarant@3x.png",
      markerIcon: "position_ranstuarant.png"
    },
    {
      id: 3,
      value: "学校",
      icon: "icon_school@3x.png",
      activeIcon: "icon_blue_school@3x.png",
      markerIcon: "potition-school.png"
    },
    {
      id: 4,
      value: "银行",
      icon: "icon_bank@3x.png",
      activeIcon: "icon_blue_bank@3x.png",
      markerIcon: "position-bank.png"
    },
    {
      id: 5,
      value: "医院",
      icon: "icon_hospital@3x.png",
      activeIcon: "icon_hospital-blue@3x.png",
      markerIcon: "position_hospital.png"
    },
    {
      id: 6,
      value: "购物",
      icon: "tab_cart_default.png",
      activeIcon: "tab_cart_selected.png",
      markerIcon: "position-shopping.png"
    }
  ],
  controlId:1,
  },
  created: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: app.globalData.qqMapKey
    });
    this.mapCtx = wx.createMapContext('map')
    if (this.data.showControls == false && this.data.keyword != '') {
      this.searchNearbyInfo(this.data.keyword)
    }else{
      this.searchNearbyInfo(this.data.controls[0].value);
    }
  },

  /**
   * 监听KeyWord
   */
  observers: {
    'keyword': function (keyword) {
      if (!this.data.showControls) {
        this.searchNearbyInfo(keyword)
      }
    },
    'mapData': function () {
      if (!this.data.showControls) {
        this.searchNearbyInfo(this.data.keyword)
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    //点击附近按钮
    controltap(e) {
      this.searchNearbyInfo(e.currentTarget.dataset.keyword)
      this.setData({
        controlId:e.currentTarget.dataset.id
      })
    },
    //搜索附近信息
    searchNearbyInfo: function (keyword) {
      let that = this
      qqmapsdk.search({
        keyword: keyword,
        location: {
          longitude: this.data.mapData.longitude,
          latitude: this.data.mapData.latitude
        },
        success: res => {
          console.log(res);
          var mark = []
          var projectNearbyList = res.data;
          var icon_position = that.data.icon_position;
          if (keyword == '交通') {
            icon_position = 'position-bus.png'
          } else if (keyword == '餐饮') {
            icon_position = 'position_ranstuarant.png'
          } else if (keyword == '学校') {
            icon_position = 'potition-school.png'
          } else if (keyword == '银行') {
            icon_position = 'position-bank.png'
          } else if (keyword == '医院') {
            icon_position = 'position_hospital.png'
          } else if (keyword == '购物') {
            icon_position = 'position-shopping.png'
          }
          for (let i in res.data) {
            mark.push({
              iconPath: that.data.ossPath +icon_position,
              title: res.data[i].title,
              id: i,
              longitude: res.data[i].location.lng,
              latitude: res.data[i].location.lat,
              width: 30,
              height: 30
            })
          }
          mark.push({
            iconPath: that.data.ossPath + 'file_address.png',
            id: res.data.length,
            longitude: that.data.mapData.longitude,
            latitude: that.data.mapData.latitude,
            width: 30,
            height: 30
          })
          that.setData({
            markers: mark
          })
          //周边数据回调
          this.triggerEvent('projectNearbyList', projectNearbyList)
        }
      })
    },
  }
})