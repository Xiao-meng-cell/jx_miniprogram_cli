var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDefalutBack: false,
    capsuleTop: 0, //右上角胶囊按钮距顶高度
    wxVersion: "", //微信版本
    forwarding: false, //是否转发中
    windowHeight: app.globalData.windowHeight, //窗口高度
    windowWidth: app.globalData.windowWidth, //窗口宽度
    merchantCode: "", //商家code
    unitId: "", //户型ID
    unitData: "", //户型信息
    housePlans: "", //其他户型列表
    mainImgIndex: 1, //当前图片下标
    imgList: "", //图片列表
    videoURL: "", //视频链接
    existVideo: false, //是否存在视频
    selectedDisplayType: "img", //选中显示类型（vr:VR看房；vid:视频；img:图片）
    show_business_phone: true, //展示企业号码列表
    business_phone: {}, //企业电话列表
    eventCode: "",
    clerkState: false,
    clerkCode: '',
    trackUserInfo: {},
    productCode: '',

    //雷达数据采集所需数据
    timer: null, //雷达时间采集定时器
    startTime: null, //浏览开始时间
    scene: '',
    sceneDT: '0',
    winHeight: 0, //窗口高度
    pageHeight: 0, //页面高度
    progress: 0, //浏览页面百分比
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.getOptions(options, function (data) {
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧小程序码
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧二维码
      that.initOptions(data)
    })
    this.initPageProgress()
  },

  initOptions(options) {
    if (options.higherLevelCode) {
      app.globalData.higherLevelCode = options.higherLevelCode
      console.log('分享者code', app.globalData.higherLevelCode)
    }
    if (options.id) {
      this.setData({
        unitId: options.id,
      })
    }
    if (options.eventCode) {
      this.setData({
        eventCode: options.eventCode,
      })
    }
    if (options.productCode) {
      this.setData({
        productCode: options.productCode,
      })
    }
    if (options.clerkCode) {
      this.setData({
        clerkCode: options.clerkCode
      });

    }
    if (options.fromNews) {
      this.setData({
        fromNews: options.fromNews
      })
    }
    if (options.sceneType) {
      this.setData({
        scene: options.sceneType
      })
    }
    if (options.sceneDT) {
      this.setData({
        sceneDT: options.sceneDT
      })
    }
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      wxVersion: util.compareVersion(app.globalData.wxVersion, "7.0.0"),
      capsuleTop: app.globalData.capsuleTop
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      forwarding: false,
    })
    this.data.startTime = util.timestamp();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.timer);
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
    let clerkCode = this.data.clerkState ? wx.getStorageSync('user').userCode : this.data.clerkCode;
    if (wx.getStorageSync('user')) {
      app.Shareacquisition(this.data.shareType, this.data.merchantCode, this.data.eventCode, null, null, wx.getStorageSync('user').userCode, null, null)
    }
    console.log('我的code', clerkCode, this.data.clerkState, this.data.clerkCode);
    return {
      title: this.data.unitData.title,
      //+ "&clerkCode=" + clerkCode +
      path: "estatePackage/pages/houseLayout/houseLayout?id=" + this.data.unitId + "&clerkCode=" + clerkCode + "&eventCode=" + this.data.eventCode + "&batchShare=" + app.globalData.batchShare,
      success: res => {
        wx.showToast({
          title: '转发成功',
          icon: "none"
        })
      },
      fail: res => {
        wx.showToast({
          title: '转发失败',
          icon: "none"
        })
      }
    }
  },

  /**
   * 监听页面滑动事件
   */
  onPageScroll: function (e) {
    //计算页面深度用
    let scrollH = parseInt(e.scrollTop); // 滚动高度
    let pageHeight = this.data.pageHeight;
    let clientH = this.data.winHeight; //屏幕高度
    let result = Math.round(scrollH / Math.abs(pageHeight - clientH) * 100); // 百分比
    this.setData({ //滚动条距离顶部高度
      progress: result
    })
    console.log(this.data.progress)
  },

  /**
   * 判断是不是共享合伙人
   */
  checkUserClerk() {
    if (!wx.getStorageSync('user')) {
      return false
    }
    http.get(
      app.globalData.host + "biz/user/merchant/clerk/status", {
        merchantCode: this.data.unitData.merchantInfo.code,
        userId: wx.getStorageSync('user').id,
      },
      (_status, _resultCode, _message, data) => {
        console.log(data, wx.getStorageSync('user').id, this.data.merchantCode)
        if (data == 0 || data == 1) {
          this.setData({
            clerkState: true
          });
        }
      },

      (_status, _resultCode, _message, data) => {}
    );
  },

  /** 获取户型信息 */
  getData: function () {
    wx.showLoading({
      title: '数据加载中...',
    })
    http.get(
      app.globalData.business_host + "estate/unit/details", {
        id: this.data.unitId,
        isTrack: '1',
        userCode: this.data.clerkCode
      },
      (status, resultCode, message, data) => {
        //显示价格 start
        let displayPrice = ""
        if (data.sellingPriceType == "1" || data.sellingPriceType == "2") {
          if (data.isNegotiable == 0) {
            displayPrice = "￥" + data.price
          } else {
            displayPrice = "咨询价格"
          }
        } else if (data.sellingPriceType == 3) {
          displayPrice = "价格面议"
        }
        data["displayPrice"] = displayPrice
        let imageUrls = []
        let videoUrl = ""
        for (let i in data.medias) {
          let mediaObj = data.medias[i]
          if (mediaObj.type == "image") {
            imageUrls.push(mediaObj.url)
          } else if (mediaObj.type == "video") {
            videoUrl = mediaObj.url
          }
        }
        //VR看房
        if (data.panoramicUrl && data.panoramicUrl != "") {
          this.setData({
            vrUrl: data.panoramicUrl,
            selectedDisplayType: "vr",
          })
        }
        //  this.data.business_phone=data.trackUserInfo.phone;

        this.setData({
          unitData: data,
          existVideo: videoUrl != "" ? true : false,
          imgList: imageUrls,
          videoURL: videoUrl,
          merchantInfo: data.merchantInfo,
          business_phone: data.trackUserInfo.phone
        })
        // console.log('企业电话',this.data.business_phone)  ;
        this.getUnitList()
        this.checkUserClerk();
        this.postStayTime();
        let that = this;
        clearInterval(this.data.timer);
        that.data.timer = setInterval(function () {
          that.postStayTime();
        }, app.globalData.stayTime);
      },

      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**浏览时长统计 */
  postStayTime() {
    if (!wx.getStorageSync('user')) {
      clearInterval(this.data.timer);
      return;
    }
    http.post(
      app.globalData.host + "collect/pingGoodView", {
        eventCode: this.data.eventCode,
        stayTime: app.globalData.stayTime,
        merchantCode: this.data.merchantInfo.code,
        scene: this.data.scene == "" ? "wxapp" + this.data.merchant_code : this.data.scene,
        sceneDT: this.data.sceneDT,
        h5Once: this.data.startTime,
        batchShare: app.globalData.batchShare,
        visitor: wx.getStorageSync('visitor'), //游客标识
        higherLevelCode: app.globalData.higherLevelCode,
        clerkUserCode: this.data.clerkCode ? this.data.clerkCode : '',
        accessRoutes: app.globalData.accessRoutes,
        routesDescribe: app.globalData.routesDescribe,
        pageId: "estatePackage/pages/houseLayout/houseLayout",
        pageDescribe: "户型页",
        progress: this.data.progress > 100 ? 100 : this.data.progress,
      },
      (status, resultCode, message, data) => {
        // console.log("商品统计时间", this.data.stayTime);
      },
      (status, resultCode, _message, data) => {

      }
    );

  },

  /** 收藏 */
  favorite: function () {

  },

  /** 获取户型列表 */
  getUnitList: function () {
    http.get(
      app.globalData.business_host + "estate/unit/otherUnitInfos", {
        estateCode: this.data.unitData.estateCode,
        id: this.data.unitId,
      },
      (status, resultCode, message, data) => {
        for (let i in data.list) {
          let item = data.list[i]
          //显示价格 start
          let displayPrice = ""
          if (item.sellingPriceType == 1) {
            displayPrice = "售价："
            if (item.isNegotiable == 0) {
              displayPrice = displayPrice + item.price
            } else {
              displayPrice = displayPrice + "咨询价格"
            }
          } else if (item.sellingPriceType == 2) {
            displayPrice = "首付："
            if (item.isNegotiable == 0) {
              displayPrice = displayPrice + item.price
            } else {
              displayPrice = displayPrice + "咨询价格"
            }
          } else if (item.sellingPriceType == 3) {
            displayPrice = "价格面议"
          }
          item["displayPrice"] = displayPrice
          //显示价格 end
          for (let j in item.medias) {
            let mediaObj = item.medias[j]
            if (mediaObj.type == "image") {
              item["image"] = mediaObj.url
              break
            }
          }
        }
        this.setData({
          housePlans: data.list
        })
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /** 切换显示 */
  changeShow: function (e) {
    this.setData({
      selectedDisplayType: e.currentTarget.dataset.type,
      videoAutoPlay: e.currentTarget.dataset.type == "vid" ? true : false,
    })
  },

  imgListChange: function (e) {
    this.setData({
      mainImgIndex: e.detail.current + 1,
    })
  },

  /** 切换户型 */
  changeHousePlans: function (e) {
    let item = e.currentTarget.dataset.item
    this.setData({
      unitId: item.id,
    })
    this.getData()

  },

  /**
   * 返回上一页
   */
  backPreviousPage: function () {
    var pages = getCurrentPages()
    if (pages.length > 1) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      this.backIndexPage()
    }
  },

  /**
   * 展示企业号码列表
   */
  showBusinessPhoneList: function () {
    // if (this.data.merchantInfo.hiddenPhone != 0) {
    //   wx.showToast({
    //     title: '企业设置了隐私保护',
    //     icon: "none"
    //   })
    //   return
    // }
    if (this.data.business_phone = "") {
      wx.showToast({
        title: '暂无联系方式',
        icon: "none"
      })
      return
    } else {
      this.setData({
        show_business_phone: !this.data.show_business_phone
      });
    }


  },

  /**
   * 获取企业联系方式
   */
  getBusinessPhone: function (phone) {
    if (phone) {
      var phone_list = phone.split(',');
      if (phone_list.length > 0) {
        this.setData({
          business_phone: phone_list
        });
      }
    }
  },

  /**
   * 联系企业
   */
  contactBusiness: function (e) {
    var business_phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: business_phone
    })
    console.log(business_phone)
    this.showBusinessPhoneList()
  },

  /**
   * 获取企业详情信息
   */
  getBusinessInfo: function () {
    http.get(
      app.globalData.host + "/biz/user/merchant/info", {
        merchantCode: this.data.merchantCode
      },
      (status, resultCode, message, data) => {

        this.setData({
          business_info: data,
        })
      },
      (status, resultCode, message, data) => {}
    );
  },

  /** 前往商品详情页（需要雷达采集） */
  goToHomepage: function () {
    wx.navigateTo({
      url: "/pages/tabBar_index/business_detail/business_detail?code=" + this.data.eventCode + "&clerk_code=" + this.data.clerk_code + "&sceneType=order" + this.data.merchantCode + "&sceneDT=" + this.data.eventCode,
    })
  },

  /** 前往VR */
  goToVr: function () {
    wx.navigateTo({
      url: "/pages/web_view_html/web_view_html?webUrl=" + this.data.vrUrl
    })
  },

  /** 返回首页（需要雷达采集） */
  backIndexPage: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.unitData.merchantInfo.code + "&sceneType=order" + this.data.merchantCode + "&sceneDT=" + this.data.eventCode,
    })
  },

  /**获取相关高度 */
  initPageProgress: function () {
    let that = this
    /**获取可视区域 */
    getApp().getWindowInfo(function (win) {
      that.setData({
        winHeight: win.windowHeight
      });
    })

    /**获取页面内容总高度 */
    let view = '#main';
    setTimeout(() => {
      getApp().getPageHeight(function (res) {
        that.setData({
          pageHeight: res.height
        });
      }, view)
    }, 600);
  },
})