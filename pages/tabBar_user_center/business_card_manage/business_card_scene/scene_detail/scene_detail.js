// pages/tabBar_user_center/business_card_manage/business_card_scene/scene_detail/scene_detail.js
var http = require('../../../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //场景ID
    sceneObj: '', //场景信息
    creater: false, //场合创建人
    tagCodes: "", //行业标签,大类
    selected_tagCode: -1, //大行业标签选中的code
    selected_tagIndex: -1, //大行业标签选中的下标
    cardList: "", //名片列表
    fromPage: '', //来源页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let fromPage = ''
    if (options.fromPage) {
      fromPage = options.fromPage
    }
    this.setData({
      id: options.id,
      fromPage: fromPage,
    })
    this.getTagList()
    this.get_scene_info()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.fromPage == "joinScene") {
      wx.navigateTo({
        url: '/pages/tabBar_index/business_homepage/business_homepage' + '&higherLevelCode='+ app.globalData.higherLevelCode,
      })
    }
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
  // onShareAppMessage: function() {

  // },

  /** 获取场景信息 */
  get_scene_info: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.host + "/biz/clerksituation/getClerkBySituation", {
        id: this.data.id,
      },
      (status, resultCode, message, data) => {
        let bool = false
        if (data.situation.userId == wx.getStorageSync('user').id) {
          bool = true
        }
        wx.setNavigationBarTitle({
          title: data.situation.groupName + '（' + data.count + '）',
        })
        this.setData({
          sceneObj: data.situation,
          creater: bool,
        })
        this.loadCardList()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /** 获取分类列表 */
  getTagList: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.host + "/biz/clerksituation/getTagCodeBySituation", {
        id: this.data.id,
      },
      (status, resultCode, message, data) => {
        this.setData({
          tagCodes: data,
        })
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 改变行业,改变大类别
   */
  changeTagCode_index: function (e) {
    this.setData({
      selected_tagCode: e.currentTarget.dataset.code,
      selected_tagIndex: e.currentTarget.dataset.index,
    });
    this.loadCardList()
  },

  /** 加载名片列表 */
  loadCardList: function () {
    let tag_code = this.data.selected_tagCode
    if (tag_code == -1) {
      tag_code = 'all'
    }
    http.get(
      app.globalData.host + "/biz/clerkusersituationrel/getPageList", {
        groupId: this.data.sceneObj.id,
        orderBy: 'name',
        tagCode: tag_code,
      },
      (status, resultCode, message, data) => {
        console.log(data)
        this.setData({
          cardList: data,
        })
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /** 前往名片详情 */
  toCardDetail: function (e) {
    let item = e.currentTarget.dataset.item
    if (item.merchantCode == 'temporary') {
      wx.showToast({
        title: '临时名片不允许查看',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
    } else {
      wx.navigateTo({
        url: '/pages/clerk/show/show?workerId=' + item.clerkId + "&merchantCode=" + item.merchantCode + '&higherLevelCode='+ app.globalData.higherLevelCode,
      })
    }
  },

  /** 删除场景 */
  delScene: function (e) {
    let that = this
    if (that.data.creater) {
      wx.showModal({
        title: '退出提示',
        content: '您是场合创建人，退出场合将删除整个场合！',
        showCancel: true, //是否显示取消按钮
        success: function (res) {
          if (res.confirm) {
            let groupIds = []
            groupIds.push(that.data.id)
            http.post(
              app.globalData.host + "/biz/clerksituation/deleteByGroupIds", {
                groupIds: JSON.stringify(groupIds),
              },
              (status, resultCode, message, data) => {
                wx.showToast({
                  title: '删除场合成功！',
                  icon: 'none',
                  duration: 1500,
                  mask: false,
                })
                //刷新列表
                wx.setStorageSync('reloadPage', true)
                wx.navigateBack({
                  delta: 1,
                })
              },
              (status, resultCode, message, data) => {
                wx.hideLoading()
              }
            );
          }
        },
      })
    } else {
      let that = this
      wx.showModal({
        title: '退出提示',
        content: '是否退出该场合？',
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '处理中...',
              mask: true,
            })
            for (let i in that.data.cardList) {
              if (that.data.cardList[i].userId == wx.getStorageSync("user").id) {
                http.post(
                  app.globalData.host + "/biz/clerkusersituationrel/deleteByKey", {
                    id: that.data.cardList[i].id,
                  },
                  (status, resultCode, message, data) => {
                    console.log("退出场合成功！")
                  },
                  (status, resultCode, message, data) => {
                    console.log("退出场合失败！")
                    wx.hideLoading()
                  }
                );
              }
            }
            wx.hideLoading()
            //刷新列表
            wx.setStorageSync('reloadPage', true)
            wx.navigateBack({
              delta: 1,
            })
          }
        },
      })
    }
  },

  /** 分享场景 */
  shareScene: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/scene_code/scene_code?id=' + this.data.id,
    })
  },
})