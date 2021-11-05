// livePackage/pages/liveInfo/liveInfo.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capsuleTop: "",
    merchantCode: '',
    business_info: {}, //商家信息
    roomId: '',
    videoData: [], //视频列表
    beginTime: '',
    recordingInfo: {},
    liveInfo: {},
    onlineTotal: '',
    olTotal_timeDevice: '',
    merchantFavorites: false, //是否收藏关注企业
    show_business_phone: true, //展示企业号码列表
    business_phone: "", //企业电话和私人电话
    liveClerkCode: '',
    merchantUserCode: '',
    userRole: '',
    onlineTotalInterval: null,
    recordingInfoInterval: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.getOptions(options, function (data, fromApp) {
      that.initOptions(data)
      if (fromApp == 1) {
        that.onShow()
      }
    }, function (data, qrcode_scene) {
      //旧小程序码
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧二维码
      that.initOptions(data)
    })
  },

  initOptions(options) {
    if (options) {
      if (options.merchantCode) {
        this.setData({
          merchantCode: options.merchantCode
        })
      }
      if (options.roomId) {
        this.setData({
          roomId: options.roomId
        })
      }
      if (options.higherLevelCode) {
        app.globalData.higherLevelCode = options.higherLevelCode;
      }
    }
    if (wx.getStorageSync('user')) {
      this.logonCallback();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      capsuleTop: app.globalData.capsuleTop
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        if (that.data.merchantCode && that.data.roomId) {
          that.logonCallback();
        }
      }
    })
  },

  /**
   * 登录成功回调
   */
  logonCallback: function () {
    this.getOnlineTotal()
    this.getChatroomInfo();
    this.getRecordingInfo();
    let that = this;
    this.setData({
      recordingInfoInterval: setInterval(function () {
        that.getRecordingInfo();
      }, 5 * 60 * 1000),
    });
    this.getVideoList();
    this.getBusinessInfo();
    this.checkUserClerk();
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
    clearInterval(this.data.recordingInfoInterval);
    clearInterval(this.data.onlineTotalInterval);
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
    if (wx.getStorageSync('user')) {
      app.Shareacquisition(this.data.shareType, this.data.merchantCode, null, null, null, this.data.clerkCode, null, null)
    }
    let title = (this.data.liveTitle && this.data.liveTitle != "") ? (this.data.liveTitle + '的直播，快来看！') : ((!this.data.business_info.shortName || this.data.business_info.shortName == "") ? (this.data.business_info.name + '的直播间，快来看！') : (this.data.business_info.shortName + '的直播间，快来看！'));
    let imgUrl = this.data.liveBg ? this.data.liveBg : this.data.business_info.headimg
    return {
      imageUrl: imgUrl,
      title: title,
      path: "livePackage/pages/live/live?merchantCode=" + this.data.merchantCode + "&roomId=" + this.data.roomId + (wx.getStorageSync('user') ? ("&higherLevelCode=" + wx.getStorageSync('user').userCode) : "") + "&clerk_code=" + (this.data.userRole >= 0 ? wx.getStorageSync('userCode') : this.data.clerkCode) + '&batchShare=' + app.globalData.batchShare
    }
  },


  /**
   * 获取企业详情信息
   */
  getBusinessInfo: function () {
    http.get(
      app.globalData.host + "merchant/info", {
        merchantCode: this.data.merchantCode,
        higherLevelCode: app.globalData.higherLevelCode == "" ? undefined : app.globalData.higherLevelCode,
      },
      (_status, _resultCode, _message, data) => {
        this.setData({
          merchantUserCode: data.userCode,
          business_info: data.merchant,
          merchantFavorites: data.merchant.isFavorites == 0 ? false : true,
          business_phone: data.merchant.userPhone,
        });

      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );

  },

  //获取预播时间
  getRecordingInfo: function () {
    http.get(
      app.globalData.im + "/recording/precast/next", {
        chatroomId: this.data.roomId,
      },
      (_status, _resultCode, _message, data) => {
        clearInterval(this.data.recordingInfoInterval);
        if (data.beginTime) {
          let beginTime = util.tsFormatTime(data.beginTime * 1000, "Y-M-D h:m")
          this.setData({
            recordingInfo: data,
            beginTime: beginTime
          })
        }
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /** 获取直播间信息 */
  getChatroomInfo: function () {
    let that = this
    if (!wx.getStorageSync('user')) {
      return false;
    }
    http.get(
      app.globalData.im + "/chatroom/getChatroomByCode", {
        merchantCode: this.data.merchantCode,
      },
      (_status, _resultCode, _message, data) => {
        this.setData({
          liveTitle: data.description ? data.description : "",
          liveBg: data.bgUrl ? data.bgUrl : "",
        })
        let that = this;
        this.setData({
          onlineTotalInterval: setInterval(function () {
            that.getOnlineTotal();
          }, 5000),
        });

        wx.hideLoading()
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },


  /** 获取在线总人数 */
  getOnlineTotal: function () {
    http.get(
      app.globalData.im + "chatroom/chatroomAffiliationsCount", {
        chatroomId: this.data.roomId,
      },
      (_status, _resultCode, _message, _data) => {
        clearInterval(this.data.onlineTotalInterval);
        this.setData({
          onlineTotal: _data > 0 ? _data : this.data.onlineTotal,
        })
      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

  //获取视频列表
  getVideoList: function () {
    if (!wx.getStorageSync('user')) {
      return false;
    }

    http.get(
      app.globalData.im + "/recording/history/page", {
        chatroomId: this.data.roomId,
        index: '1',
        limit: '20'
      },
      (_status, _resultCode, _message, data) => {
        let list = data.list
        for (let i in list) {
          list[i].start_time = util.tsFormatTime(list[i].start_time * 1000, "Y-M-D h:m")
          this.setData({
            videoData: list,
          })
        }

      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /** 收藏企业 */
  merchantFavorites: function () {
    let that = this;
    let url = "userCollect/collect"
    if (that.data.merchantFavorites) {
      url = "userCollect/cancelCollect"
    }
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        http.post(
          app.globalData.host + url, {
            contentCode: that.data.merchantCode,
            type: app.globalData.collectTypeCompany,
          },
          (_status, _resultCode, _message, data) => {
            wx.showToast({
              title: !that.data.merchantFavorites ? '收藏成功' : '取消收藏成功',
              icon: "none"
            })
            that.setData({
              merchantFavorites: !that.data.merchantFavorites
            });
          },
          (_status, _resultCode, _message, _data) => {}
        )
      }
    })
  },

  /** 拨打电话 */
  callUp: function () {
    this.setData({
      show_business_phone: false,
    })
  },
  /**
   * 展示企业号码列表
   */
  showBusinessPhoneList: function () {
    if (!this.data.business_phone) {
      wx.showToast({
        title: '暂无联系方式',
        icon: "none"
      })
    } else {
      this.setData({
        show_business_phone: !this.data.show_business_phone
      });
    }
  },
  /**
   * 联系企业
   */
  contactBusiness: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.business_phone
    })
  },
  /**防止滑动冒泡 */
  doNotMove: function () {
    return false;
  },
  /** 前往商家动态 */
  goToBusinessDynamic: function () {
    wx.navigateTo({
      url: '/expandPackage/pages/businessDynamic/businessDynamic?merchantCode=' + this.data.merchantCode,
    })
  },

  /**
   * 判断是不是共享合伙人
   */
  checkUserClerk: function () {
    if (!wx.getStorageSync('user')) {
      return false
    }
    http.get(
      app.globalData.host + "biz/user/merchant/clerk/status", {
        merchantCode: this.data.merchantCode,
        userId: wx.getStorageSync('user').id,
      },
      (_status, _resultCode, _message, data) => {
        this.setData({
          userRole: data
        });
        if (data == 0 || data == 1) {
          this.setData({
            liveClerkCode: wx.getStorageSync('user').userCode
          });
        } else {
          this.setData({
            liveClerkCode: ''
          });
        }
      },
      (_status, _resultCode, _message, data) => {
        // this.$toast.center(message);
      }
    );
  },
  /**
   * 跳转到直播间
   */
  goLiveRoom: function () {
    let merchantCode = this.data.merchantCode;
    wx.navigateTo({
      url: "/livePackage/pages/live/live?merchantCode=" + merchantCode + '&higherLevelCode=' + app.globalData.higherLevelCode + (this.data.liveClerkCode ? ('&clerk_code=' + this.data.liveClerkCode) : ('&clerk_code=' + this.data.merchantUserCode)),
    })

  },
  goRecordingVideo: function (e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: "/livePackage/pages/recordingVideo/recordingVideo?liveUrl=" + url,
    })

  },
  /**
   * 跳转到企业
   */
  jumpBusiness: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.merchantCode + '&higherLevelCode=' + app.globalData.higherLevelCode
    })
  },
})