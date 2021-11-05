// widget/cart/cart.js
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
var crypto = require('../../utils/crypto.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      let that = this;
      //先登入
      if (wx.getStorageSync('user')) {
        /**获取购物车数量 */
        app.loadCartNum(function (tabBar) {
          that.setData({
            cartNum: tabBar.list[2].number
          });
        })
      } else {
        this.setData({
          tabbar: app.globalData.tabBar
        });
      }
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /** 进入购物车 */
    goToCart: function () {
      app.isUserLogin(function (isLogin) {
        if (isLogin) {
          wx.navigateTo({
            url: '/pages/tabBar_index/cart/cart',
          })
        }
      })
    },
  }
})