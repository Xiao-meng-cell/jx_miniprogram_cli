// expandPackage/pages/member/cardDetail/cardDetail.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
var memberUtil = require('../../../../utils/member.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxVersion: "",
    windowWidth: "", //可用宽度
    capsuleTop: "",
    capsuleHeight: "",
    lander: wx.getStorageSync('user'), //当前登录用户
    storeCode: "", //会员商家编号
    cardInfo: "", //会员卡详情信息
    levelUpDifference: 0, //下一级所需经验
    expPercentage: 0, //当前经验百分比
    noLevel: true, //无会员等级
    vipImgUrl: "",
    imgBgH: 0,
    imgBgMaskH: 0,
    cardInfoMarinTop: 0, //会员卡内容距顶高度
    bgMaskMarinTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.storeCode) {
      this.setData({
        storeCode: options.storeCode,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      wxVersion: util.compareVersion(app.globalData.wxVersion, "7.0.0"),
      capsuleTop: app.globalData.capsuleTop,
      capsuleHeight: app.globalData.capsuleHeight,
      windowWidth: app.globalData.windowWidth,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.enableMember) {
      this.loadCardDetail()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

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
  onShareAppMessage: function () {

  },

  /** 加载会员卡详情 */
  loadCardDetail: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.vip_host + "/vip/store/card/cardInfoForUser", {
        vipStoreCode: this.data.storeCode,
        userCode: this.data.lander.userCode,
      },
      (status, resultCode, message, data) => {
        let cardInfo = data
        console.log(data)
        cardInfo["styles"] = memberUtil.getStyleById(cardInfo)
        //升级所缺经验
        let levelUpDifference = 0
        if (data.vipLevelInfo.code != data.nextVipLevelInfo.code) {
          levelUpDifference = data.nextVipLevelInfo.initVal - data.growthValue
        }
        //当前经验在当前等级所占百分比
        let expPercentage = Number((data.growthValue / data.vipLevelInfo.finalVal * 100).toFixed(1))

        //当前等级
        let noLevel = true
        let vipImgUrl = [cardInfo.styles.flagVipPre + "vip.png"]
        if (data.vipLevelInfo.code != "00000") {
          noLevel = false
          let vipSrtArray = (data.vipLevelInfo.serialNum + "").split('')
          for (let i in vipSrtArray) {
            let temp = vipSrtArray[i]
            vipImgUrl.push(cardInfo.styles.flagVipPre + temp + ".png")
          }
        }

        this.setData({
          cardInfo: cardInfo,
          levelUpDifference: levelUpDifference,
          expPercentage: expPercentage,
          noLevel: noLevel,
          vipImgUrl: vipImgUrl,
        })
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 返回上一页
   */
  backPreviousPage: function () {
    var pages = getCurrentPages()
    if (pages.length > 1) {
      if (pages[pages.length - 2].route == "expandPackage/pages/member/cardDetail/cardDetail") {
        if (pages[pages.length - 3]) {
          wx.navigateBack({
            delta: 2
          })
        } else {
          wx.navigateTo({
            url: '/pages/tabBar_user_center/user_center',
          })
        }
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    } else {
      this.backIndexPage()
    }
  },

  /** 返回首页 */
  backIndexPage: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage',
    })
  },

  /** 前往记录 */
  goToRecord: function (e) {
    wx.navigateTo({
      url: '/expandPackage/pages/member/records/records/records?type=' + e.currentTarget.dataset.type + "&storeCode=" + this.data.cardInfo.storeCode,
    })
  },

  /** 前往优惠券 */
  goToCoupon: function () {
    wx.navigateTo({
      url: '/expandPackage/pages/member/coupon/coupon?merchantCode=' + this.data.cardInfo.storeCode + "&displayCheckbox=false&onlyUsable=false&topTips=false",
    })
  },

  /** 前往充值 */
  goToAddCredit: function () {
    if (this.data.cardInfo.storeHidden == 0 && this.data.cardInfo.storeStatus == 1) {
      wx.navigateTo({
        url: '/expandPackage/pages/member/credit/addCredit/addCredit?merchantCode=' + this.data.cardInfo.storeCode + "&vipStoreCode=" + this.data.storeCode,
      })
    } else {
      wx.showToast({
        title: '当前企业为下架或过期状态，无法充值',
        icon: "none",
      })
    }
  },

  /** 前往商家首页 */
  goToHomepage: function () {
    if (this.data.cardInfo.storeHidden == 0 && this.data.cardInfo.storeStatus == 1) {
      wx.navigateTo({
        url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.cardInfo.storeCode,
      })
    } else {
      wx.showToast({
        title: '当前企业为下架或过期状态，无法查看',
        icon: "none",
      })
    }
  },

  /** 背景图片加载完成 */
  imgBgLoad: function (e) {
    let imgH = e.detail.height / (e.detail.width / this.data.windowWidth)
    this.setData({
      imgBgH: imgH,
      cardInfoMarinTop: imgH * 0.36,
    })
    this.bgMaskMarinTop()
  },

  imgBgMaskLoad: function (e) {
    this.setData({
      imgBgMaskH: e.detail.height / (e.detail.width / this.data.windowWidth),
    })
    this.bgMaskMarinTop()
  },

  bgMaskMarinTop: function () {
    if (this.data.bgMaskMarinTop == 0 && this.data.imgBgH > 0 && this.data.imgBgMaskH > 0) {
      this.setData({
        bgMaskMarinTop: this.data.imgBgH - this.data.imgBgMaskH + 1,
      })
    }
  },
})