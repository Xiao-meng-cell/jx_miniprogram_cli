var http = require('../../../../utils/http.js');
const util = require("../../../../utils/util.js");
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_list: [], //卡片列表数据
    pageIndex: 0, //翻页目录
    pageIndex_add: 0, //二维数组下标
    selectedCardObj: '', //选中名片
    groupName: '', //房间名称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取我的名片列表
    this.getMineCardList();
    //场合名称默认当前时间
    let nowDate = new Date()
    let groupName = nowDate.getFullYear() + "年" + (nowDate.getMonth() + 1) + "月" + nowDate.getDate() + "日"
    this.setData({
      groupName: groupName,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (wx.getStorageSync('reloadPage')) {
      this.setData({
        card_list: [],
      })
      this.getMineCardList();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      pageIndex: this.data.pageIndex + 10,
      pageIndex_add: this.data.pageIndex_add + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // },

  /**
   * 获取我的名片列表
   */
  getMineCardList: function() {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/mine/list", {
        skip: this.data.pageIndex,
        limit: 20
      },
      (status, resultCode, message, data) => {
        this.setData({
          ['card_list[' + this.data.pageIndex_add + ']']: data
        });
        this.usingCard();
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /** 选中名片 */
  selectedCard: function(e) {
    let index = e.currentTarget.dataset.index
    let card_list = this.data.card_list
    for (var i in card_list) {
      let cards = card_list[i]
      for (var j in cards) {
        let cart_obj = cards[j]
        if (j == index) {
          cart_obj.selected = true
          this.data.selectedCardObj = cart_obj
        } else {
          cart_obj.selected = false
        }
      }
    }
    this.setData({
      card_list: card_list,
    })
  },

  /** 新增临时名片 */
  addTempCard: function(e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/temp_card/temp_card',
    })
  },

  /** 输入房间名称 */
  groupNameInput: function(e) {
    this.setData({
      groupName: e.detail.value,
    })
  },

  /** 完成场合新建 */
  submitScene: function(e) {
    let that = this
    if (!that.data.selectedCardObj) {
      wx.showToast({
        title: '请选择名片！',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
      return
    }
    wx.showLoading({
      title: '创建中...',
    })
    let groupName = that.data.groupName
    if (groupName == '') {
      let nowDate = new Date()
      groupName = nowDate.getFullYear() + "年" + (nowDate.getMonth() + 1) + "月" + nowDate.getDate() + "日"
    }
    http.post(
      app.globalData.host + "/biz/clerksituation/add", {
        userId: that.data.selectedCardObj.userId,
        headimg: that.data.selectedCardObj.headimg,
        groupName: groupName,
        clerkId: that.data.selectedCardObj.id,
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.navigateTo({
          url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/scene_code/scene_code?id=' + data,
        })
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
        wx.showToast({
          title: data,
          icon: 'none',
          duration: 1500,
          mask: false,
        })
      }
    );
  },

  /** 使用名片 */
  usingCard: function() {
    let tempCardId = ''
    if (wx.getStorageSync('reloadPage')) {
      tempCardId = wx.getStorageSync('reloadPage')
      wx.removeStorageSync('reloadPage')
    }

    let card_list = this.data.card_list
    for (var i in card_list) {
      let cards = card_list[i]
      for (var j in cards) {
        let cart_obj = cards[j]
        if (tempCardId != '') {
          if (cart_obj.id == tempCardId) {
            cart_obj.selected = true
            this.data.selectedCardObj = cart_obj
          } else {
            cart_obj.selected = false
          }
        } else {
          cart_obj.selected = true
          this.data.selectedCardObj = cart_obj
          break
        }
      }
      if (tempCardId == '') {
        break
      }
    }
    this.setData({
      card_list: card_list,
    })
  },
})