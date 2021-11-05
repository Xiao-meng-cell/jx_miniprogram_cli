// miniprogram/pages/tabBar_user_center/dynamic/for_user.js
const app = getApp();
const http = require("../../../utils/http.js");
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [],
    currentTab: 0,
    navScrollLeft: 0,
    selectType: "",

    typeList: [],
    loadmore: true,
    tagCode: '',
    platform: null,
  },

  getPlatform: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          platform: res.platform
        });
        if (res.platform == "devtools") {} else if (res.platform == "ios") {} else if (res.platform == "android") {}
      }
    })
  },
  showVideo: function (e) {
    var current = e.currentTarget.dataset.src;

    var that = this;
    wx.navigateTo({
      url: '/pages/business/video_show/video_show?src=' + current,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  /**
   * 图片查看
   */
  toShowImgs: function (e) {
    var item = e.currentTarget.dataset.item;
    let strItem = JSON.stringify(item);
    wx.navigateTo({
      url: "/pages/business/dynamic_detail/dynamic_detail?newsId=" + item.id + '&higherLevelCode='+ app.globalData.higherLevelCode
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPlatform();
    this.data.selectType = options.type;
    this.data.tagCode = options.tagCode;
    this.setData({
      selectType: options.type,
      tagCode: options.tagCode
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getTypeListByType(this.data.selectType);

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })

    this.getTypes();
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
      var tempNav = this.data.navData;
      var typeS = tempNav[cur].type;
      this.setData({
        selectType: typeS
      });
      this.getTypeListByType(typeS);
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },

  /**
   * 获取企业动态类型列表
   */
  getTypes: function () {
    var that = this;
    http.get(
      app.globalData.host + 'biz/user/merchant/news/type/list', {
        tagCode: that.data.tagCode
      },
      (status, resultCode, message, data) => {
        var item = {
          id: -1,
          type: "",
          typeName: "全部",
          sort: -1,
        }
        var tempList = data;
        tempList.unshift(item);
        that.setData({
          navData: tempList
        })
        var cur = 0;
        for (var i = 0; i < tempList.length; i++) {
          if (that.data.selectType == tempList[i].type) {
            cur = i;
            break;
          }
        }
        //每个tab选项宽度占1/5
        var singleNavWidth = this.data.windowWidth / 5;
        //tab选项居中                            
        this.setData({
          navScrollLeft: (cur - 2) * singleNavWidth
        })
        if (this.data.currentTab == cur) {
          return false;
        } else {
          this.setData({
            currentTab: cur
          })
        }
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '获取列表异常',
          icon: "none",
          duration: 2000
        })
      }
    );
  },


  /**
   * 获取企业动态列表
   */
  getTypeListByType: function (type) {
    wx.showLoading({
      title: '正在加载...',
    })
    this.setData({
      loadmore: true,
    });
    var that = this;
    http.get(
      app.globalData.host + "/biz/user/merchant/news/list", {
        type: type,
        skip: 0,
        limit: 60,
        merchantCode: app.globalData.merchant_code
      },
      (status, resultCode, message, data) => {

        that.setData({
          typeList: data,
          loadmore: false,
        });
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
      }
    );
  },
  /*** 预览图片****/
  previewImage: function (e) {
    var current = e.currentTarget.dataset.src;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var tempUrls = [];
    var selectList = this.data.typeList[parentIndex].fileUrls;
    for (var i = 0; i < selectList.length; i++) {
      tempUrls.push(selectList[i]);
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接 
      urls: tempUrls // 需要预览的图片http链接列表  
    })
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //this.getTypeListByType(this.data.selectType);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})