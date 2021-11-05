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
        title: ''
      }
    },
    // 地图组件高度
    height: {
      type: Number,
      value: 100
    },
    //标签
    mapTag: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    ossPath: "http://izsyue.oss-cn-shenzhen.aliyuncs.com/assets/applets/enterpriseEdition/images/",
    icon_position: "position@3x.png",
    enableSatellite: false, //是否启用卫星图
    scale: 16,
    markers: [],
    mapControls: [{
        id: 1,
        value: "交通",
        icon: "icon_bus@3x.png",
        activeIcon: "icon_blue_bus@3x.png",
        markerIcon: "position-bus@3x.png"
      },
      {
        id: 2,
        value: "餐饮",
        icon: "icon_ranstuarant@3x.png",
        activeIcon: "icon_blue_ranstuarant@3x.png",
        markerIcon: "position_ranstuarant@3x.png"
      },
      {
        id: 3,
        value: "学校",
        icon: "icon_school@3x.png",
        activeIcon: "icon_blue_school@3x.png",
        markerIcon: "potition-school@3x.png"
      },
      {
        id: 4,
        value: "银行",
        icon: "icon_bank@3x.png",
        activeIcon: "icon_blue_bank@3x.png",
        markerIcon: "position-bank@3x.png"
      },
      {
        id: 5,
        value: "医院",
        icon: "icon_hospital@3x.png",
        activeIcon: "icon_hospital-blue@3x.png",
        markerIcon: "position-hospital@3x.png"
      },
      {
        id: 6,
        value: "购物",
        icon: "tab_cart_default.png",
        activeIcon: "tab_cart_selected.png",
        markerIcon: "position-shopping@3x.png"
      }
    ],
    controlId: 1,
    projectNearbyCurrentIndex: 1,
    projectNearbyKeyword: '',
    projectNearbyList: [],
    mapTags: []
  },
  created: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: app.globalData.qqMapKey
    });
    this.mapCtx = wx.createMapContext('map')
    if (this.data.mapTag != '') {
      this.initMapTags(this.data.mapTag);
    }
  },

  /**
   * 监听KeyWord
   */
  observers: {
    'mapData': function () {
      this.initMapTags(this.data.mapTag);
    },
    'mapTag': function () {
      this.initMapTags(this.data.mapTag);
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
        controlId: e.currentTarget.dataset.id
      })
    },
    initMapTags(mTags) {
      console.log('mTags=========', mTags);
      let tags = mTags.replace("[", "").replace("]", "").split(",");
      let mapControls = this.data.mapControls
      let mapTags = []
      for (let i in mapControls) {
        for (let j in tags) {
          if (tags[j] == mapControls[i].value) {
            mapTags.push(mapControls[i]);
          }
        }
      }
      this.setData({
        mapTags: mapTags,
        projectNearbyKeyword: mapTags[0].value
      });
      if (this.data.mapTags.length > 0)
        this.searchNearbyInfo(this.data.mapTags[0].value)

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
          for (let i in res.data) {
            mark.push({
              iconPath: that.data.ossPath + icon_position,
              title: res.data[i].title,
              id: i,
              longitude: res.data[i].location.lng,
              latitude: res.data[i].location.lat,
              keyword: keyword,
              width: 30,
              height: 30
            })
          }
          mark.push({
            iconPath: that.data.ossPath + 'file_address.png',
            id: res.data.length,
            longitude: that.data.mapData.longitude,
            latitude: that.data.mapData.latitude,
            title: that.data.mapData.title,
            keyword: 'project',
            width: 30,
            height: 30
          })

          for (let index in projectNearbyList) {
            projectNearbyList[index].addressArr = projectNearbyList[index].address.split(',');
          }
          that.setData({
            markers: mark,
            projectNearbyList: projectNearbyList
          })
        }
      })
    },
    //Markerd点击
    onMarkertap(e) {
      console.log('onMarkertap', e.detail.markerId);
      let markerId = e.detail.markerId
      let markers = this.data.markers

      for (let i in markers) {
        if (markers[i].id == markerId) {
          let item = markers[i]
          console.log('onMarkertapitem', item);
          wx.navigateTo({
            url: '/estatePackage/pages/mapNav/index?lat=' + item.latitude + '&lng=' + item.longitude + '&title=' + item.title + '&keyword=' + item.keyword
          })
        }
      }

    },
    //项目周边tab时调用
    projectNearbyTabTitleClick: function (e) {
      this.setData({
        projectNearbyCurrentIndex: e.currentTarget.dataset.idx,
        projectNearbyKeyword: e.currentTarget.dataset.keyword
      })
      this.searchNearbyInfo(e.currentTarget.dataset.keyword);
    },
    toNav(e) {
      console.log(JSON.stringify(e.currentTarget.dataset.item));
      let item = e.currentTarget.dataset.item

      wx.navigateTo({
        url: '/estatePackage/pages/mapNav/index?lat=' + item.location.lat + '&lng=' + item.location.lng + '&title=' + item.title + '&keyword=' + this.data.projectNearbyKeyword
      })
    }
  },


})