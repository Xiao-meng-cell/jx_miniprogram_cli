// widget/goodsItem/goodsItem.js
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: null,
      observer: function (newVal, oldVal) {
        if (newVal != '') {
          this.setData({
            item: newVal
          })
        }
      }
    },

    clerkCode: {
      type: null,
      observer: function (newVal, oldVal) {
        if (newVal != '') {
          this.setData({
            clerkCode: newVal
          })
        }
      }
    },

    addCart: {
      type: null,
      observer: function (newVal, oldVal) {
        if (newVal != '') {
          this.setData({
            addCart: newVal == "false" ? false : true
          })
        }
      }
    },
    scene: {
      type: String,
      value: ''
    },
    sceneDT: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    item: "", //数据
    clerkCode: "",
    addCart: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 跳转到商品详情
     */
    jumpBusinessActivityDetail: function (e) {
      // console.log('业务员code');
      // console.log(this.data.clerkCode);
      // console.log(this.data.scene, '===========', this.data.sceneDT);
      let item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: "/pages/tabBar_index/business_detail/business_detail?code=" + item.code + '&sceneType=' + this.data.scene + '&sceneDT=' + this.data.sceneDT +  '&higherLevelCode=' + app.globalData.higherLevelCode + "&activityType=" + item.typeCode + (this.data.clerkCode && this.data.clerkCode != "" ? "&clerk_code=" + this.data.clerkCode : "")
      })
    },
  }
})