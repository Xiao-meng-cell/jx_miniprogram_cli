// widget/top-bar/top-bar.js
const app = getApp();
var util = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: '',
      value: ''
    },
    userDefalutBack: {
      type: '',
      value: true
    },
    isHeight: { //是否占有高度
      type: Boolean,
      value: true
    },
    sharing: { //是否分享中
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    iPhone_X: app.globalData.iPhone_X,
    wxVersion: "", //微信版本号
    capsuleTop: 0, //右上角胶囊按钮距上高度
    capsuleHeight: 0, //右上角胶囊按钮高度
  },
  ready: function () {
    this.setData({
      wxVersion: util.compareVersion(app.globalData.wxVersion, "7.0.0"),
      capsuleTop: app.globalData.capsuleTop,
      capsuleHeight: app.globalData.capsuleHeight,
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 返回上一页
     */
    backPreviousPage: function () {

      if (this.data.userDefalutBack) { //使用默认返回上一页
        app.globalData.homePageIsisRefresh = false; //默认不刷新首页
        var pages = getCurrentPages()
        if (pages.length > 1) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          this.backIndexPage()
        }
      } else { //自定义返回
        this.triggerEvent('backPreviousPage');
      }
    },

    /**
     * 返回首页
     */
    backIndexPage: function () {
      console.log('返回首页');
      app.globalData.homePageIsisRefresh = true;
      wx.navigateTo({
        url: '/pages/tabBar_index/business_homepage/business_homepage',
      })
    },
  }
})