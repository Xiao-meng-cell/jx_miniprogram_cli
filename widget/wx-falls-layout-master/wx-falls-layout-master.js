// widget/wx-falls-layout-master/wx-falls-layout-master.js
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
var RSAKey = require('../../utils/rsa-client.js');
var base64 = require('../../utils/base64.js');
//获取应用实例
const app = getApp();
let col1H = 0;
let col2H = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    business_userid: {
      type: String,
      value: undefined,
    },
    storeCode: {
      type: String,
      value: undefined,
    },
    formTabBar: {
      type: Boolean,
      value: false,
    },
    tagCodes: {
      type: String,
      value: ""
    },
    sortType: {
      type: String,
      value: "time"
    },
    iPhone_X: {
      type: Boolean,
      value: false
    },
    categoryCode: {
      type: String,
      value: undefined,
    },
    userRole: {
      type: String,
      value: undefined,
    },
    topNum: {
      type: String,
      value: undefined,
    },
    typeCodes: {
      type: String,
      value: undefined,
    },
    sortType: {
      type: String,
      value: undefined,
    },
    sortOrder: {
      type: String,
      value: undefined,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    pageIndex: 1,
    business_activity_list: [],
    pageIndex_add: 0, //二维数组下标
    rolling_lock: false,
    topNum: 0,
    loadAll: false, //是否加载全部数据
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.35;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });


      }
    });
    wx.hideLoading();
  },

  ready() {
    this.getBusinessActivity();
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 处理数据
     */
    handlerData: function () {
      for (let i = 0; i < this.data.business_activity_list_new.length; i++) {
        let list = this.data.business_activity_list_new[i];
        let obj = {};
        obj.pic = JSON.parse(list.fileJson).illustration[0];
        if (obj.pic) {
          obj.type = util.getUrlType(JSON.parse(list.fileJson).illustration[0])
        }
        this.data.business_activity_list_new[i].illustration = obj.pic;
        this.data.business_activity_list_new[i].videoType = obj.type;
        this.data.business_activity_list_new[i].minPrice = util.priceSwitch(this.data.business_activity_list_new[i].minPrice);
        this.data.business_activity_list_new[i].dis = app.getDisance(this.data.business_activity_list_new[i].merchant.lat, this.data.business_activity_list_new[i].merchant.lng);
      }
      this.setData({
        loadingCount: this.data.business_activity_list.length,
        ['business_activity_list[' + this.data.pageIndex_add + ']']: this.data.business_activity_list_new
      });
      wx.hideLoading();
    },

    /**
     * 获取企业活动
     */
    getBusinessActivity: function () {
      wx.showLoading({
        title: '数据加载中',
        mask: true
      })
      let typeCodes = JSON.stringify([
        "original",
        "universalRebate",
      ])
      if (this.properties.typeCodes) {
        typeCodes = JSON.stringify([this.properties.typeCodes])
      }
      // } else {
      //   if (this.properties.userRole > -1) {
      //     typeCodes = JSON.stringify([
      //       "original",
      //       "universalRebate",
      //       "inreward",
      //     ])
      //   }
      // }
      http.get(
        app.globalData.business_host + "fastevent/storeHomePage", {
          pageIndex: this.data.pageIndex,
          pageLimit: 10,
          sortType: this.properties.formTabBar ? this.data.sortType : "time",
          locationCityId: app.globalData.locationCityId ? app.globalData.locationCityId : 1,
          lng: app.globalData.current_lng,
          lat: app.globalData.current_lat,
          userId: this.properties.formTabBar ? undefined : this.properties.business_userid, //判断是否tabBar点击进来，如果是就不传userId
          storeCode: this.properties.formTabBar ? undefined : this.properties.storeCode, //判断是否tabBar点击进来，如果是就不传storeCode
          categoryCode: this.properties.categoryCode == "" ? undefined : this.properties.categoryCode,
          statuses: JSON.stringify(["1"]),
          tagCodes: (this.properties.formTabBar && (this.properties.tagCodes != 0)) ? JSON.stringify([this.properties.tagCodes]) : undefined, //判断是否tabBar点击进来，如果是就不传userId
          typeCodes: typeCodes,
          sortType: this.properties.sortType ? this.properties.sortType : 'customize',
          sortOrder: this.properties.sortType == "price" ? this.properties.sortOrder : 'asc',
        },
        (status, resultCode, message, data) => {
          if (data.list.length < 1) {
            this.setData({
              loadAll: true,
            })
            wx.hideLoading();
          }
          this.setData({
            business_activity_list_new: data.list
          });
          this.handlerData();
        },
        (status, resultCode, message, data) => {
          wx.hideLoading()
        }
      );
    },


    /**
     * 跳转到商品详情
     */
    jumpBusinessActivityDetail: function (e) {
      wx.navigateTo({
        url: "/pages/tabBar_index/business_detail/business_detail?code=" + e.currentTarget.dataset.code + '&higherLevelCode=' + app.globalData.higherLevelCode + "&activityType=" + e.currentTarget.dataset.activitytype,
      })
    },

    /**
     * 加载更多数据
     */
    loadMore: function () {
      //避免无数据时触发触底加载
      if (!this.data.business_activity_list[0]) {
        return
      }
      if (!this.data.loadAll) {
        this.setData({
          pageIndex: this.data.pageIndex + 1,
          pageIndex_add: this.data.pageIndex_add + 1
        })
        this.getBusinessActivity();
      }
    },

    /**
     * 重新加载
     */
    reRoad: function () {
      this.setData({
        pageIndex: 1,
        pageIndex_add: 0,
        business_activity_list: [],
        loadAll: false,
      })
      this.getBusinessActivity();
    },

    /** 返回顶部 */
    goTop: function () {
      this.setData({
        topNum: this.properties.topNum,
      })
    },
  }
})