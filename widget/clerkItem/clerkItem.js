// widget/clerkItem/clerkItem.js
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //显示标题
    data: {
      type: null,
      observer: function (newVal, oldVal) {
        if (newVal != '') {
          this.setData({
            item: newVal
          })
          this.setClerkBg()
        }
      }
    },
    isBoss:{
      type: Boolean,
      value: undefined
    },
  },

  /**i
   * 组件的初始数据
   */
  data: {
    isBoss:false,
    item: "", //数据
  },

  show: function () {
    this.setData({
      isBoss:this.properties.isBoss
    })
 
  },

  ready: function () {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 查看旗下员工
     */
    lookMembers: function (e) {
      if (e.currentTarget.dataset.merchantstatus == 0) {
        wx.showModal({
          title: "温馨提示",
          content: '该企业已注销',
          success: res => {}
        })
        return
      }
      if (e.currentTarget.dataset.merchantstatus == 3) {
        wx.showModal({
          title: "温馨提示",
          content: '该企业已过期,续费后可查看团队成员',
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: "/pages/tabBar_user_center/renewals/renewals",
              })
            }
          }
        })
        return
      }
      wx.navigateTo({
        url: '/pages/tabBar_user_center/business_card_manage/business_card_members/business_card_members?merchantCode=' + app.globalData.myMerchantInfo.code + "&role=3",
      })
    },

    /**
     * 查看我其他企业团队
     */
    lookMineTeam: function (e) {
      let item = e.currentTarget.dataset.item
      if (item.merchantstatus == 0) {
        wx.showModal({
          title: "温馨提示",
          content: '该企业已注销',
        })
        return
      }
      if (item.merchantstatus == 3) {
        wx.showModal({
          title: "温馨提示",
          content: '该企业已过期',
        })
        return
      }
      if (item.status == 2) {
        wx.showToast({
          title: '您还未通过审核，无法进入',
          icon: "none",
        })
        return
      }
      wx.navigateTo({
        url: '/pages/tabBar_user_center/business_card_manage/business_card_members/business_card_members?merchantCode=' + item.merchantCode + "&role=1&userId=" + wx.getStorageSync("user").id,
      })
    },

    /**
     * 查看申请列表
     */
    toApplyList: function () {
      wx.navigateTo({
        url: '/pages/tabBar_user_center/manager/apply_manager/apply_manager',
      })
    },

    /** 分享名片 */
    shareCardCode: function (e) {
      wx.navigateTo({
        url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/scene_code/scene_code?id=' + e.currentTarget.dataset.id + "&type=clerk",
      })
    },

    /**
     * 跳转到卡片详情
     */
    jumpCardDetail: function (e) {
      if (e.currentTarget.dataset.status == 2) {
        wx.showToast({
          title: '名片审核中',
          icon: "none"
        })
        return
      }
      if (e.currentTarget.dataset.merchantcode == "temporary") {
        wx.navigateTo({
          url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/temp_card/temp_card?read=true&cardId=' + e.currentTarget.dataset.id,
        })
        return
      } else {
        wx.navigateTo({
          url: '/pages/clerk/show/show?merchantCode=' + e.currentTarget.dataset.merchantcode + "&workerId=" + e.currentTarget.dataset.id + '&higherLevelCode='+ app.globalData.higherLevelCode,
        })
      }
    },

    jumpWebView: function (e) {
      let urlPre = "https://h5.vicpalm.com/weclubbing";
      if (app.globalData.h5PathTest) {
        urlPre = "https://h5.vicpalm.com/testprojectonline";
      }
      let url = urlPre + "/operatingPoint?merchantCode=" + e.currentTarget.dataset.merchantcode
      url = url + "&fromType=wxApp"
      wx.hideLoading()
      let webUrl = encodeURIComponent(url); //编码   
      console.log(webUrl);
      wx.redirectTo({
        url: '/pages/web_view_html/web_view_html?webUrl=' + webUrl
      })
    },

    /** 捕获鼠标操作 */
    catchMouseOperate: function () {

    },

    /** 删除我的名片 */
    delMineClerk: function (e) {
      let that = this
      wx.showModal({
        title: '提示',
        content: '是否要删除该名片',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确认',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '删除中...',
            })
            http.post(
              app.globalData.host + "/biz/user/merchant/clerk/del", {
                id: e.currentTarget.dataset.item.id,
                merchantCode: e.currentTarget.dataset.item.merchantCode,
              },
              (status, resultCode, message, data) => {
                wx.showToast({
                  icon: "none",
                  title: '删除成功',
                })
                that.triggerEvent('refreshData', "");
              },
              (status, resultCode, message, data) => {
                wx.hideLoading()
              }
            );
          }
        },
      })
    },

    /** 设置名片背景 */
    setClerkBg: function () {
      let item = this.data.item
      let clerkBgClass = "card_item_default"
      if (item.merchantType == "mainStore" || item.merchantType == "branchStore") { //智控总店分店
        clerkBgClass = "card_item_zhikong"
      } else { //非智控
        if (item.ultimate == 1) {
          clerkBgClass = "card_item_ultimate"
        } else if (item.channel == 1) {
          clerkBgClass = "card_item_channel"
        }
      }
      item["clerkBgClass"] = clerkBgClass
      this.setData({
        item: item,
      })
      //{{item.ultimate == 1 ? "card_item_ultimate" : item.channel == 1 ? "card_item_channel" : "card_item_default"}}
    },
  }
})