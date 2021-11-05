// miniprogram/pages/tabBar_user_center/business_card_manage/business_card_favorites/business_card_favorites.js
var http = require('../../../../utils/http.js');
const util = require("../../../../utils/util.js");
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    networkType: true, //监听网络连接与断开
    enterprise_list: [], //企业列表
    scene_list: [], //场合列表
    current_index: 0, //当前显示下标
    userId: '', //用户ID
    enterprise_tagCodes: "", //行业标签,大类
    selected_enterpriseTagCode: -1, //大行业标签选中的code
    selected_enterpriseTagIndex: 0, //大行业标签选中的下标
    enterpriseListOrderBy: 'name', //企业列表排序方式
    iphone_x: app.globalData.iPhone_X, //是否为iphonex
    nameSortAsc: false,
    timeSortAsc: false,
    capsuleTop: 0, //右上角胶囊按钮距上高度
    capsuleHeight: 0, //右上角胶囊按钮高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    this.setData({
      userId: wx.getStorageSync('user').id
    })
    //this.loadData()
  },

  /**监听网络变化 */
  watchBack: function (networkType) {
    this.setData({
      networkType: networkType
    });
    // console.log('==========网络监听==========', this.data.networkType);
  },

  /** 加载数据 */
  loadData: function () {
    this.getEnterpriseTag();
    this.getSceneList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    try {
      var res = wx.getSystemInfoSync();
      let queryBottom = wx.createSelectorQuery();
      this.setData({
        scrollHeight: res.windowHeight - 50,
        capsuleTop: app.globalData.capsuleTop,
        capsuleHeight: app.globalData.capsuleHeight,
      });
      let that = this;
      queryBottom.select('#tabBottom').boundingClientRect();
      queryBottom.selectViewport().scrollOffset();
      queryBottom.exec(function (res) {
        that.setData({
          scrollHeight: res[0].top
        })
      })
    } catch (e) {

    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('reloadPage')) {
      wx.removeStorageSync('reloadPage')
      this.setData({
        scene_list: [],
      })
    }
    this.loadData()
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
    if (app.globalData.jumpIndex_fromApp) {
      wx.navigateTo({
        url: '/pages/tabBar_index/business_homepage/business_homepage' + '&higherLevelCode=' + app.globalData.higherLevelCode,
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /** 获取加入场景列表 */
  getSceneList: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.host + "/biz/clerkusersituationrel/getJoinedList", {
        userId: wx.getStorageSync('user').id,
      },
      (status, resultCode, message, data) => {
        let scene_list = []
        for (var i in data) {
          let scene_obj = data[i]
          if (scene_obj.situation) {
            scene_obj.displayTime = util.tsFormatTime(scene_obj.situation.createdTime, "Y年M月D日 h:m:s")
          }
          scene_list.push(scene_obj)
        }
        this.setData({
          scene_list: scene_list
        });
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /** 显示企业 */
  showBusiness: function (e) {
    this.setData({
      current_index: 0,
    })
    // wx.setNavigationBarTitle({
    //   title: '企业',
    // })
  },

  /** 显示场合 */
  showScene: function (e) {
    this.setData({
      current_index: 1,
    })
    // wx.setNavigationBarTitle({
    //   title: '场合',
    // })
  },

  /** 进入场景详情 */
  toSceneDetail: function (e) {
    let scene = e.currentTarget.dataset.situation
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/scene_detail/scene_detail?id=' + scene.id,
    })
  },

  /**
   * 跳转到名片详情
   */
  jumpToBusiness: function (e) {
    if (e.currentTarget.dataset.code == "temporary") {
      wx.showToast({
        title: '临时名片无法查看详情',
        icon: "none"
      })
      return;
    } else {
      wx.navigateTo({
        url: '/pages/clerk/show/show?workerId=' + e.currentTarget.dataset.id + "&merchantCode=" + e.currentTarget.dataset.code + '&higherLevelCode=' + app.globalData.higherLevelCode,
      })
    }
  },

  /** 获取收藏企业类型 */
  getEnterpriseTag: function () {
    http.get(
      app.globalData.host + "/biz/clerkusermerchantrel/getTagCodeByUserId", {},
      (status, resultCode, message, data) => {
        this.setData({
          enterprise_tagCodes: data,
        })
        this.getEnterpriseList()
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
      selected_enterpriseTagCode: e.currentTarget.dataset.code,
      selected_enterpriseTagIndex: e.currentTarget.dataset.index,
    });
    this.getEnterpriseList()
  },

  /** 获取收藏企业列表 */
  getEnterpriseList: function () {
    wx.showLoading({
      title: '加载中',
    })
    let tag_code = this.data.selected_enterpriseTagCode
    let orderByType = undefined
    if (this.data.enterpriseListOrderBy == "name") {
      orderByType = this.data.nameSortAsc == true ? "asc" : "desc"
    } else if (this.data.enterpriseListOrderBy == "time") {
      orderByType = this.data.timeSortAsc == true ? "asc" : "desc"
    }
    http.get(
      app.globalData.host + "/biz/clerkusermerchantrel/pageList", {
        tagCode: tag_code,
        orderBy: this.data.enterpriseListOrderBy,
        orderByType: orderByType,
      },
      (status, resultCode, message, data) => {
        // this.setData({
        //   enterprise_list: data,
        // })
        // wx.hideLoading()
        this.buildEnterpriseList(data)
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /** 构建企业列表 */
  buildEnterpriseList: function (source) {
    let el = []
    for (var i in source) {
      let temp = source[i]
      if (temp.merchantCode != "temporary") {
        el.push(temp)
      }
    }
    this.setData({
      enterprise_list: el,
    })
    wx.hideLoading()
  },

  /** 排序切换 */
  enterpriseListOrderChange: function (e) {
    let value = e.currentTarget.dataset.order
    this.setData({
      enterpriseListOrderBy: value,
    })
    if (value == "name") {
      this.setData({
        nameSortAsc: !this.data.nameSortAsc,
      })
    } else if (value == "time") {
      this.setData({
        timeSortAsc: !this.data.timeSortAsc,
      })
    }
    this.getEnterpriseList()
  },
})