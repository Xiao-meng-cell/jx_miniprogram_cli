// miniprogram/pages/clerk/show/show.js
import NumberAnimate from "../../../utils/numberAnimate";
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
var clerkUtil = require('../../../utils/clerk');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capsuleTop: 0,
    capsuleHeight: 0,
    networkType: true, //监听网络连接与断开
    tabPosition: '',
    tabNewsTitle: '',
    tabTitle: '',
    showMessage: true,
    albumUrlList: [], //海报名片图片
    lander: '',
    pageIndex: 1,
    pageLimit: 10,
    landerUserId: '',
    clerkTemplateType: "business", //名片模板类型
    cardStyleId: null,
    clerk: "", //名片数据
    card_name: "",
    card_position: "",
    card_phone: "",
    card_shortName: "",
    card_headimg: "",
    workerId: "",
    userId: "",
    card_email: "",
    card_qq: "",
    card_wx: "",
    card_merchantName: "",
    card_merchantShortName: "",
    card_urls: "",
    card_addr: "",
    card_message: "",
    merchant_code: "",
    shares: "",
    hot: "",
    pixelRatio: "",
    windowHeight: "",
    windowWidth: "",
    hidden_collection_window: true,
    hidden_card_list: true,
    isFollow: false, //是否收藏过
    card_list: [], //我的名片列表
    cardListCount: 0, //我的名片数量
    selectedCardObj: {}, //选中名片对象
    seen_list: "",
    showVisitorRecord: false, //是否显示访客记录
    goodsList: [], //产品列表
    hidden_send_message: true,
    merchant_err: false,
    clerk_code: "",
    slide_button: {
      left: 0,
      right: 0,
      top: 100,
      height: 45,
      width: 50,
      tStart: true
    },
    isMerchant: false, //当前登录用户是否是事业合伙人
    isParent: false, //当前登录用户是否是商家

    // 切页配置
    tab_config: {
      tabs: [{
          name: '商品列表',
          tabType: 'goods',
          id: 0
        },
        {
          name: '企业动态',
          tabType: 'news',
          id: 1
        }
      ], // tabs

      fixed: true, // tabbar是否固定宽度
      item_width: wx.getSystemInfoSync().screenWidth / 2,
      tab_left: 0, // 如果tabbar不是固定宽度，则目前左移的位置
      underline: {
        offset: 0 //下划线的位移
      }
    },
    switch_index: 0,
    //切页内容配置
    swipe_config: {
      indicator_dots: false, // 不显示小圆点
      autoplay: false, // 自动切换
      interval: 2000, // 自动切换频率
      duration: 500, // 切换时间
    },
    selectedTabIndex: 0, //tab下标
    mediaInfoHeight: 200, //多媒体名片信息高度
    mediaInfoHeight1: 800,
    mediaInfoPhotos: [], //图片相册
    audioPlaying: false, //语音是否播放
    controls: false, //是否显示播放控件
    currentTime: 0, //当前播放时间（秒）
    displayCT: "00:00", //显示用当前播放时间（分:秒）
    voiceTime: 0, //音频总长度（秒）
    displayVT: "00:00", //显示用音频总长度（分:秒）

    // 视频名片模板 数据 start
    mainVidUrl: "https://vod.vicpalm.com/630b85bea7bd4a61b6035aadfba49b47/6562220b28a7412aa7d79b010355fd4d-85bebe50149a995e5f1c6123711f3702-ld.mp4", //主视频URL
    userHead: "http://weclubbing.oss-cn-shenzhen.aliyuncs.com/upload/merchant/clert/2019/04/24/12/35/01/4911_xGcGlA.jpeg", //用户头像
    titleText: "名片", //标题
    autoplay: true, //是否自动播放·
    muted: false, //是否静音
    loop: true, //是否循环播放
    floatDiv: false, //是否显示按钮
    profile: false, //是否显示简介
    clicks: 0, //点击浏览数
    iphone_x: app.globalData.iPhone_X, //是否为iphonex
    wxVersion: "", //微信版本
    ctvGoodsTip: false,
    playBtnPosition: "center",
    ctvVideoPlaying: true, //视频模板视频是否播放
    phone_cover: false, //是否关联手机号码
    productListMask: true,
    displayStoreName: "", //显示企业名称
    // 视频名片模板 数据 end

    // 节日名片模板 数据 start
    ctfClerkFront: true, //名片正面
    onFlip: false, //翻转中，不可以做其他操作
    festival_bgm: "", //贺卡名片音频
    animation_festival: wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    }),
    animation_face: "",
    animation_back: "",
    namePositionWidth: 0, //姓名职位宽度
    nameWidth: 0, //姓名宽度
    positionWidth: 0, //职位宽度
    // 节日名片模板 数据 end
    business_info: "", //商家信息
    businessLevel: "", //商家等级 （企业，品牌厂家，品牌旗舰）
    forward_status: false, //是否正在转发
    isIOS: app.globalData.platform == "ios" ? true : false,
    showTextareaEdit: false,
    goodsTagList: [], //商品分类列表
    goodsTagSelectedIndex: 0, //选中商品分类下标
    goodsCategoryCode: "", //选中商品分类编号
    change_show_range: false, //是否展开服务范围内容
    clerkExist: true, //名片是否存在
    shareType: 'clerk',
    keepout: false,
    scrollLeft: '',
    scrollViewWidth: '',
    dyAry: [],
    time: 8,
    change_show_range: false,
    includePlatform: false,
    clerkMark: '1',
    goodsIndex: '',
    inviteDisplay: false,
    memberCount: '',
    scrollTop: '',
    fromCollectShow: false, //是否来自收藏夹
    userRole: null, //判断当前登入人身份
    userLander: null,
    navbarInitTop: 0, //导航栏初始化距顶部的距离
    isFixedTop: false, //是否固定顶部
    topNum: 0,
    liveClerkCode: '', //当前登录人的clerkCode

    totalStaff: 0, //公司旗下精英
    totalStaffDisplay: 0,
    totalStaffWan: false,
    totalCustomer: 0, //已服务客户
    totalCustomerDisplay: 0,
    totalCustomerWan: false,
    totalSalesVol: 0, //总销售额
    totalSalesVolDisplay: 0,
    totalSalesVolWan: false,
    totalOrder: 0, //总销售单量
    totalOrderDisplay: 0,
    totalOrderWan: false,

    numberAnimateDuration: 1500, //数字相加动画时长

    animation: "", //动画
    animationDuration: 1000,

    infoPage: 1, //信息显示页码
    iconUrls: "", //图标url集合

    isZk: false, //是否为智控
    mainMerchantCode: "",
    zkDataDisplay: true,
    conventWanMin: 1000000, //转换万元起始值
    phoneNumber: '', //企业电话
    isShowPhone: false, //联系电话点击
    tabType: null,
    newsTypes: '', //动态类型
    newsTypes_index: 0, //动态类型选中index
    newsTypes_select: {}, //选择动态类型
    tabHeight: 0, //动态类型高度
    tabTop: 0, //距离顶部的距离

    tabBarActive: -1,
    tabbar: app.globalData.tabBar,

    //雷达数据采集所需数据
    scene: '',
    timer: null, //雷达时间采集定时器
    startTime: null,
    sceneDT: '0',
    winHeight: 0, //窗口高度
    pageHeight: 0, //页面高度
    progress: 0, //浏览页面百分比
    showContact: null //隐藏联系方式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("计时")
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    if (!wx.getStorageSync('user')) {
      app.isUserLogin(function (isLogin) {})
    }

    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    app.getOptions(options, function (data, fromAPP) {
      that.initOptions(data)
      if (fromAPP == 1) {
        that.onShow()
      }
    }, function (data, qrcode_scene) {
      //旧小程序码
      //&是我们定义的参数链接方式
      if (qrcode_scene.split("$")[0]) {
        app.globalData.higherLevelCode = qrcode_scene.split("$")[0];
        app.globalData.isReloadThePage_tabBar_index = true;
        app.globalData.jumpIndex_fromApp = true;
      }
      if (qrcode_scene.split("$")[1]) {
        app.globalData.isReloadThePage_tabBar_index = true;

        that.setData({
          workerId: qrcode_scene.split("$")[1],
          hidden_video: true
        });
        that.addHot();
        that.getRecordsByClerkId();
      }
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧二维码
      let higherLevelCode = util.getQueryString(qrcode_scene, "user");
      let workerId = util.getQueryString(qrcode_scene, "id");
      //&是我们定义的参数链接方式
      if (higherLevelCode) {
        app.globalData.higherLevelCode = higherLevelCode;
        app.globalData.isReloadThePage_tabBar_index = true;
        app.globalData.jumpIndex_fromApp = true;
      }
      if (workerId) {
        app.globalData.isReloadThePage_tabBar_index = true;

        that.setData({
          workerId: workerId,
          hidden_video: true
        });
        that.addHot();
        that.getRecordsByClerkId();
      }
      that.initOptions(data)
    })
    var pages = getCurrentPages(); //页面指针数组
    var prepage = pages[pages.length - 2]; //上一页面指针
    if (prepage && prepage.route == "pages/tabBar_user_center/business_card_manage/business_card_favorites/business_card_favorites") {
      that.setData({
        fromCollectShow: true,
      })
    }
    this.initPageProgress()
  },

  //初始化参数
  initOptions(options) {
    if (options) {
      if (options.higherLevelCode) { //小卡片带分享码
        app.globalData.higherLevelCode = options.higherLevelCode;
        app.globalData.isReloadThePage_tabBar_index = true;
      }
      if (options.shareId && options.shareId != "undefined") { //小卡片企业留言参数
        this.setData({
          shareId: options.shareId
        });
        this.getShareMessage();
      } else {
        this.setData({
          change_card_show_range: true
        });

      }
      if (options.cover == 'phone') {
        this.setData({
          phone_cover: true
        });
      }
      if (options.workerId) {
        app.globalData.isReloadThePage_tabBar_index = true;
        this.setData({
          workerId: options.workerId,
          hidden_video: true
        });
        this.addHot();
        this.getRecordsByClerkId();
      }
      if (options.merchantCode && options.merchantCode !== '') { //企业code，必传
        this.setData({
          merchant_code: options.merchantCode
        });
        this.getTabConfig();
        this.getNewsTypeList();
        app.globalData.merchant_code = options.merchantCode;
        wx.setStorageSync('merchant_code', options.merchantCode)
      }
      //是否显示访客记录
      if (options.showVisitorRecord == "true") {
        this.setData({
          showVisitorRecord: options.showVisitorRecord,
        })
      }
      if (options.sceneType) {
        this.setData({
          scene: options.sceneType,
        });
      }
      if (options.sceneDT) {
        this.setData({
          sceneDT: options.sceneDT,
        });
      }
    }

    this.setData({
      lander: wx.getStorageSync('user'),
      iPhone_X: app.globalData.iPhone_X,
    });
    // console.log('当前登录人',wx.getStorageSync('user'))
  },

  /**监听网络变化 */
  watchBack: function (networkType) {
    this.setData({
      networkType: networkType
    });
    // console.log('==========网络监听==========', this.data.networkType);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.isZk) {
      this.businessChartMap = this.selectComponent("#businessChartMap")
    }
    this.setData({
      capsuleTop: app.globalData.capsuleTop,
      capsuleHeight: app.globalData.capsuleHeight,
    });
  },

  stopTouchMove: function () {
    return false;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (wx.getStorageSync('user')) {
      this.setData({
        userLander: wx.getStorageSync('user')
      });
      /**获取购物车数量 */
      app.loadCartNum(function (tabBar) {
        that.setData({
          tabbar: tabBar
        });
      })
    }
    this.data.startTime = util.timestamp();
    this.setData({
      forward_status: false,
      profile: false,
    })
    //检查名片是否已收藏
    if (this.data.clerkTemplateType == "video") {
      if (this.clerkTemplateVideoContext) {
        this.clerkTemplateVideoContext.play()
      }
    } else if (this.data.clerkTemplateType == "festival" && this.data.audioPlaying && this.data.festival_bgm.paused) {
      this.playOrPauseFestivalBgm();
    }

    //不为"视频"时，加载名片媒体信息
    if (this.data.clerkTemplateType != "video" && this.data.clerkTemplateType != "festival") {
      // this.homepage_button = this.selectComponent("#homepage_button");
      // this.setData({
      //   homepage_buttonDevice: setInterval(function () {
      //     that.homepage_button.setData({
      //       card_headimg: that.data.card_headimg,
      //       business_info: that.data.business_info,
      //     });
      //   }, 1000),
      // });
      this.clearIntervalByTime()
      this.getMediaInfoHeight()
    }
    this.getMineCardList();
    if (wx.getStorageSync('user') && app.globalData.higherLevelCode) {
      this.saveShareInfo()
    }
    this.stopTouchMove()
    if (wx.getStorageSync('user')) {
      this.setData({
        landerUserId: wx.getStorageSync('user').id,
      });
      this.checkUserClerk()
    }

    if (this.data.workerId) {
      this.getWorkerInfo();
    }


    var that = this;
    if (that.data.navbarInitTop == 0) {
      //获取节点距离顶部的距离
      wx.createSelectorQuery().select('#tabId').boundingClientRect(function (rect) {
        if (rect && rect.top > 0) {
          var navbarInitTop = parseInt(rect.top);
          that.setData({
            navbarInitTop: navbarInitTop
          });
        }
      }).exec();
    }

    /** 商务名片 */
    if (this.data.clerkTemplateType == "business") {
      //从上一页返回切回之前浏览中的切页
      let tabs = this.data.tab_config.tabs
      this.setData({
        tabType: tabs[this.data.selectedTabIndex].tabType,
      })
    }
    
  },

  /**
   * 监听页面滑动事件
   */
  onPageScroll: function (e) {
    var that = this;
    // 获取动态类型高度
    wx.createSelectorQuery().select('.tab-bar_business').boundingClientRect(function (rect) {
      if (rect) {
        that.setData({
          tabHeight: rect.height,
          tabTop: rect.top,
        })
      }
    }).exec();

    var scrollTop = parseInt(e.scrollTop); //滚动条距离顶部高度
    //判断'滚动条'滚动的距离 和 '元素在初始时'距顶部的距离进行判断
    var isSatisfy = scrollTop >= (that.data.navbarInitTop + 450) ? true : false;
    //为了防止不停的setData, 这儿做了一个等式判断。 只有处于吸顶的临界值才会不相等
    if (that.data.isFixedTop === isSatisfy) {
      return false;
    } else {
      that.setData({
        isFixedTop: isSatisfy
      });
    }

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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.timer);
    clearInterval(this.data.homepage_buttonDevice);
    if (this.data.clerkTemplateType == "festival") {
      this.playOrPauseFestivalBgm();
    }
    this.pauseAllAV()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.timer);
    clearInterval(this.data.homepage_buttonDevice);
    if (this.data.festival_bgm) {
      this.data.festival_bgm.destroy();
    }
    this.pauseAllAV()
    wx.setStorageSync('cardTemplateReturn', true)
    // var pages = getCurrentPages()
    // if (pages.length > 1) {
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // } 
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
    // this.data.Time = setInterval(() => {
    //   this.setData({
    //     time: --this.data.time
    //   })
    //   if (this.data.time <= 5) {
    //     clearInterval(this.data.Time)
    //     if (this.data.selectedTabIndex == 0) {
    //       this.setData({
    //         selectedTabIndex: 1,
    //       });
    //       let that= this;
    //       let query = wx.createSelectorQuery().in(that);
    //       query.selectViewport().scrollOffset()
    //       query.select("#tabId").boundingClientRect();
    //       query.exec(function (res) {
    //        console.log(res);
    //        let data= res[0].scrollTop + res[1].top - 50;   // 顶部距离该id值得距离
    //        wx.pageScrollTo({
    //         scrollTop:data,
    //         duration: 300
    //        });
    //           });
    //   }

    // }
    // }, 1000)
    // this.updateSelectedPage(this.data.selectedTabIndex) 

  },


  /**浏览时长统计 */
  postStayTime: function () {
    if (!wx.getStorageSync('user')) {
      clearInterval(this.data.timer);
      return;
    }
    http.post(
      app.globalData.host + "collect/pingClerkView", {
        batchShare: app.globalData.batchShare,
        merchantCode: this.data.merchant_code,
        stayTime: app.globalData.stayTime,
        userId: wx.getStorageSync('user').id,
        scene: this.data.scene == "" ? "wxapp" + this.data.merchant_code : this.data.scene,
        sceneDT: this.data.sceneDT,
        visitor: wx.getStorageSync('visitor'), //游客标识
        h5Once: this.data.startTime,
        higherLevelCode: app.globalData.higherLevelCode ? app.globalData.higherLevelCode : '',
        clerkUserCode: this.data.clerk_code ? this.data.clerk_code : '',
        progress: this.data.progress > 100 ? 100 : this.data.progress,
        clerkId: this.data.workerId,
        accessRoutes: app.globalData.accessRoutes,
        routesDescribe: app.globalData.routesDescribe,
        pageId: "pages/clerk/show/show",
        pageDescribe: "名片详情页",
      },
      (status, resultCode, message, data) => {

      },
      (status, resultCode, _message, data) => {

      }
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    if (app.globalData.platform != 'ios') {
      this.setData({
        forward_status: true
      })
    } else {
      if (this.data.clerkTemplateType == "video" || this.data.clerkTemplateType == 'festival') {
        this.setData({
          forward_status: true,
        })
      }
    }
    if (wx.getStorageSync('user')) {
      app.Shareacquisition(this.data.shareType, this.data.merchant_code, null, null, null, this.data.clerk_code, this.data.workerId, null)
    }
    this.setData({
      profile: false,
    })
    this.addShares();
    if (e.from === 'button') {
      // 来自页面内转发按钮
      if (e.target.dataset.operate && e.target.dataset.operate == "cardApply") {
        this.setData({
          inviteDisplay: false,
        })
        if (e.target.dataset.role == 2 || e.target.dataset.role == 1) {
          return {
            title: (this.data.business_info.shortName ? this.data.business_info.shortName : this.data.business_info.name) + "诚邀您的加入成为共享合伙人!",
            path: "pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply?higherLevelCode=" + wx.getStorageSync('user').userCode + "&invite=true" + "&merchantCode=" + this.data.business_info.code + "&role=0",
            imageUrl: this.data.business_info.bgUrls[0],
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
        }
      }
      if ((!e.target.dataset.useshots) && this.data.goodsList && this.data.goodsList.length > 0 && (!e.currentTarget.dataset.role)) {
        return {
          title: this.data.business_info.name,
          path: "pages/clerk/clerk_good_list/clerk_good_list?shareId=" + this.data.shareId + (wx.getStorageSync('user') ? ("&higherLevelCode=" + wx.getStorageSync('user').userCode) : "") + "&workerId=" + this.data.workerId + "&merchantCode=" + this.data.merchant_code + '&batchShare=' + app.globalData.batchShare,
          imageUrl: this.data.business_info.bgUrls[0],
          success: _res => {},
          fail: _res => {}
        }
      }
      if ((e.target.dataset.useshots) && this.data.goodsList && this.data.goodsList.length > 0 && (!e.target.dataset.role)) {
        return {
          title: this.data.card_message ? this.data.card_message : ((this.data.card_shortName ? this.data.card_shortName : this.data.business_info.name) + "  " + this.data.card_name + "的名片，请惠存"),
          path: "pages/clerk/show/show?shareId=" + this.data.shareId + (wx.getStorageSync('user') ? ("&higherLevelCode=" + wx.getStorageSync('user').userCode) : "") + "&workerId=" + this.data.workerId + "&merchantCode=" + this.data.merchant_code + '&batchShare=' + app.globalData.batchShare,
          imageUrl: "",
          success: _res => {},
          fail: _res => {}
        }
      }
      if (e.target.dataset.role) {
        let role = e.target.dataset.role;
        let card_role = this.data.clerk.role;
        this.setData({
          inviteDisplay: false,
        })
        if (role == 2) {
          // console.log('hhhhhhhhhhhhhhhhh', role, card_role)
          return {
            title: (this.data.business_info.shortName ? this.data.business_info.shortName : this.data.business_info.name) + "诚邀您的加入成为事业合伙人!",
            path: "pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply?higherLevelCode=" + wx.getStorageSync('user').userCode + "&invite=true" + "&merchantCode=" + this.data.business_info.code + "&role=" + card_role + '&batchShare=' + app.globalData.batchShare,
            imageUrl: this.data.business_info.bgUrls[0],
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
        } else {
          return {
            title: (this.data.business_info.shortName ? this.data.business_info.shortName : this.data.business_info.name) + "诚邀您的加入成为共享合伙人!",
            path: "pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply?higherLevelCode=" + wx.getStorageSync('user').userCode + "&invite=true" + "&merchantCode=" + this.data.business_info.code + "&role=" + card_role,
            imageUrl: this.data.business_info.bgUrls[0],
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
        }
      }
    } else {
      return {
        title: this.data.card_message ? this.data.card_message : ((this.data.card_shortName ? this.data.card_shortName : this.data.business_info.name) + "  " + this.data.card_name),
        path: "pages/clerk/show/show?shareId=" + this.data.shareId + (wx.getStorageSync('user') ? ("&higherLevelCode=" + wx.getStorageSync('user').userCode) : "") + "&workerId=" + this.data.workerId + "&merchantCode=" + this.data.merchant_code + '&batchShare=' + app.globalData.batchShare,
        imageUrl: "",
        success: _res => {},
        fail: _res => {}
      }
    }
  },

  /**
   * 获取职员信息 clerk/info
   */
  getWorkerInfo: function () {
    http.get(
      app.globalData.host + "biz/user/merchant/clerk/info", {
        id: this.data.workerId
      },
      (_status, _resultCode, _message, data) => {
        if (data == null || data == -1) {
          this.setData({
            clerkExist: false,
          })
          return
        }
        wx.setStorageSync('merchant_code', data.merchantCode)
        let that = this;
        this.setData({
          clerk: data,
          card_name: data.name,
          card_position: data.position,
          card_phone: data.phone,
          card_shortName: data.merchantShortName,
          card_headimg: data.headimg,
          workerId: data.id,
          userId: data.userId,
          card_email: data.email,
          card_qq: data.qq,
          card_wx: data.wx,
          card_merchantName: data.merchantName,
          card_merchantShortName: data.merchantShortName,
          card_urls: data.merchantBgUrls,
          card_addr: data.merchantAddr,
          merchant_code: data.merchantCode,
          mediaInfoPhotos: that.buildAlbumUrlList(data.albumUrlList),
          shares: data.shares,
          hot: data.hot,
          clerkTemplateType: data.styleType ? data.styleType : "business",
          cardStyleId: data.styleId ? data.styleId : null,
          ctvVideoPlaying: data.styleType == "video" ? true : false,
          audioPlaying: data.styleType == "festival" ? true : false,
          isZk: data.merchantType == "mainStore" || data.merchantType == "branchStore" ? true : false,
          mainMerchantCode: data.merchantType == "mainStore" || data.merchantType == "branchStore" ? data.mainMerchantCode : "",
        });
        this.postStayTime();
        clearInterval(this.data.timer);
        that.data.timer = setInterval(function () {
          that.postStayTime();
        }, app.globalData.stayTime);
        this.getVideoUrl();
        //检查名片是否已收藏
        this.getUserInfoByUserId();
        this.getBusinessInfo();
        this.getBusinessActivity();
        if (this.data.merchant_code) {
          this.getTabConfig();
          this.getNewsTypeList();
        }
        if (wx.getStorageSync('user')) {
          this.addBrowsing();
        }
        if (this.data.phone_cover) {
          this.getBusinessPhone(data.phone);
        }
        this.getGoodsType()
        //加载音视频
        this.loadAudioVideo()
        //根据名片模板获取图标
        this.getIcon()
        //智控门店获取统计数据
        if (this.data.isZk && data.styleType == "business") {
          this.getZkDataShow()
        }
        //名片模板为"视频"时，获取视频对象控件
        if (data.styleType == "video" && this.data.posterCard) {
          this.setData({
            floatDiv: true,
          })
          this.clerkTemplateVideoContext = wx.createVideoContext('clerkTemplateVideo')
        } else if (data.styleType == "festival" && this.data.audioPlaying) {
          this.initPlayFestivalBgm(true);
          //计算名字与职位宽度 start
          wx.createSelectorQuery().selectAll('.main_festival_content_name').boundingClientRect(function (rect) {
            that.setData({
              namePositionWidth: rect[0].width,
            })
          }).exec()
          wx.createSelectorQuery().selectAll('#txtName').boundingClientRect(function (rect) {
            that.setData({
              nameWidth: rect[0].width,
            })
          }).exec()
          wx.createSelectorQuery().selectAll('#txtPosition').boundingClientRect(function (rect) {
            that.setData({
              positionWidth: rect[0].width,
            })
          }).exec()
          if (this.data.nameWidth + this.data.positionWidth > this.data.namePositionWidth) {
            this.setData({
              nameWidth: this.data.namePositionWidth / 2,
              positionWidth: this.data.namePositionWidth / 2,
            })
          }
          //计算名字与职位宽度 end
        }
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 判断是不是事业合伙人（业务员）
   */
  checkUserClerk() {
    if (!wx.getStorageSync('user')) {
      return false;
    }
    let merchantCode=wx.getStorageSync('merchant_code')
    http.get(
      app.globalData.host + 'biz/user/merchant/clerk/status', {
        merchantCode: this.data.merchant_code?this.data.merchant_code:merchantCode,
        userId: this.data.landerUserId,
      },
      (status, resultCode, message, data) => {
        this.setData({
          userRole: data
        });
        if (data == 0 || data == 1) {
          this.setData({
            liveClerkCode: wx.getStorageSync('user').userCode
          });
        }

        this.getParentCount();
      },
      (status, resultCode, message, data) => {
        console.log("判断身份失败")
        // this.$toast.center(message);
      }
    );
  },

  /**获取旗下精英人数 */
  getParentCount() {
    let parentUserId = '';
    let merchantCode=wx.getStorageSync('merchant_code')
    if (this.data.userRole == 0 && this.data.clerk.parentUserId) { //共享合伙人
      parentUserId = this.data.clerk.parentUserId;
    } else {
      parentUserId = this.data.business_info.userId;
    }
    if (this.data.userRole == 1) { //事业合伙人
      parentUserId = this.data.clerk.userId;
    }
    if (this.data.userRole < 0 || this.data.userRole == 2) { //普通用户、商家
      parentUserId = this.data.business_info.userId;
    }
    http.get(
      app.globalData.host + 'biz/user/merchant/clerk/mine/countByParentUserIdAndCode', {
        merchantCode: this.data.merchant_code?this.data.merchant_code:merchantCode,
        userId: parentUserId, //发展该共享合伙人的父级userId，没有就传商家的userId
      },
      (status, resultCode, message, data) => {
        let isWan = false
        let totalStaffDisplay = data
        if (data > 10000) {
          totalStaffDisplay = Number((totalStaffDisplay / 10000).toFixed(2))
          isWan = true
        }
        this.setData({
          totalStaff: data,
          totalStaffDisplay: totalStaffDisplay,
          totalStaffWan: isWan,
        })
        if (this.data.landerUserId == this.data.userId) {
          this.setData({
            memberCount: data,
          })
        } else {
          if (data < 21) {
            this.setData({
              memberCount: '1-20',
            })
          } else {
            this.setData({
              memberCount: data,
            })
          }
        }
      },
      (status, resultCode, message, data) => {
        console.log("获取旗下合伙人数量失败")
        // this.$toast.center(message);
      }
    );
  },

  /***
   * 获取用户信息
   */
  getUserInfoByUserId: function () {
    http.get(
      app.globalData.host + 'personal/info', {
        userId: this.data.userId,
      },
      (_status, _resultCode, _message, data) => {
        // console.log(data);
        this.setData({
          clerk_code: data.code
        });
      },
      (_status, _resultCode, _message, _data) => {
        wx.showToast({
          title: '获取共享合伙人失败',
          icon: "none"
        })
      }
    );
  },

  /**
   * 展开或收起名片所有信息
   */
  changeCardShowRange: function () {
    this.setData({
      change_card_show_range: !this.data.change_card_show_range
    });
  },


  /**
   * 获取企业联系方式
   */
  getBusinessPhone: function (phone) {
    if (phone == null || phone == '' || phone.length == 0) {
      return
    }
    var phone_list = phone.split(',');
    if (phone_list.length > 0) {
      this.setData({
        business_phone: phone_list
      });
    }
  },


  /**
   * 保存联系人
   */
  save_phone: function () {
    if (!this.data.showContact) {
      wx.showModal({
        title: '提示',
        content: '该名片企业设置了不可相互查看名片',
      })
      return
    }
  
    wx.addPhoneContact({
      firstName: this.data.card_name,
      mobilePhoneNumber: this.data.card_phone,
      organization: this.data.business_info.name,
      title: this.data.card_position,
      success: () => {
        wx.showToast({
          title: '联系人添加成功',
          icon: "none"
        });
      },
      fail: _err => {
        wx.showToast({
          title: '联系人添加失败，请稍候重试',
          icon: "none"
        });
      }
    })
  },

  //图片点击事件查看大图
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list

    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList, // 需要预览的图片http链接列表
      success: _res => {},
      fail: _res => {}
    })
  },

  /**
   * 跳转到企业(需要雷达采集)
   */
  jumpBusiness: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.merchant_code + '&higherLevelCode=' + app.globalData.higherLevelCode + (this.data.phone_cover ? ("&cover=" + this.data.card_phone) : ("")) + '&sceneType=clerk' + this.data.merchant_code + '&sceneDT=' + this.data.clerkId,
    })
  },

  /**
   * 联系企业
   */
  contactBusiness: function (e) {
    if (!this.data.showContact) {
      wx.showModal({
        title: '提示',
        content: '该名片企业设置了不可相互查看名片',
      })
      return
    }
    // var business_phone = this.data.business_info.phone; 
    var business_phone = e.currentTarget.dataset.phone;
    if (business_phone) {
      clearTimeout(this.timeout1)
      clearTimeout(this.timeout2)
      this.setData({
        isShowPhone: true,
        phoneNumber: business_phone,
        animation: null //清除动画
      });
    } else {
      wx.showToast({
        title: '暂无联系方式',
        icon: "none"
      })
    }
  },

  /**拨打电话 */
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber
    })
  },

  /**保存到通讯录 */
  savePhone() {
    let that = this;
    wx.addPhoneContact({
      firstName: that.data.card_name,
      mobilePhoneNumber: that.data.phoneNumber,
      organization: (that.data.business_info.name && that.data.business_info.name != "") ? that.data.business_info.name : that.data.business_info.shortName, //公司
      title: that.data.card_position, //职位
      success(res) {
        that.setData({
          isShowPhone: false,
        });
        this.createAnimation(); //创建动画
      }
    })
  },

  /**联系电话-取消 */
  canclePhonePup() {
    this.setData({
      isShowPhone: false,
    });
  },

  /**
   * 收藏名片
   */
  addFollow: function (_e) {
    if (!this.data.showContact) {
      wx.showModal({
        title: '提示',
        content: '该名片企业设置了不可相互查看名片',
      })
      return
    }
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        if (that.data.userId == wx.getStorageSync('user').id) {
          wx.showToast({
            title: '自己的名片不能收藏',
            icon: "none"
          })
          return
        }

        if (that.data.workerId == "undefined" || !that.data.workerId) {
          return
        }
        if (!that.data.merchant_code || (that.data.merchant_code == "temporary") || (that.data.merchant_code == "undefined")) {
          return false
        }
        let url = 'biz/clerkusermerchantrel/add';
        let param = {}

        if (that.data.isFollow) {
          url = 'biz/clerkusermerchantrel/deleteByClerkIds';
          param = {
            merchantCode: that.data.merchant_code,
            clerkIds: JSON.stringify([that.data.workerId])
          }
        } else {
          param = {
            merchantCode: that.data.merchant_code,
            clerkId: that.data.workerId
          }
        }
        http.post(
          app.globalData.host + url, param,
          (_status, _resultCode, _message, _data) => {
            if (that.data.isFollow) {
              that.setData({
                isFollow: false,
              });
              wx.showToast({
                title: '取消收藏成功',
                icon: "none"
              })
            } else {
              that.setData({
                isFollow: true,
              });
              wx.showToast({
                title: '收藏成功',
                icon: "none"
              })
            }
          },
          (_status, _resultCode, message, _data) => {

          }
        );
      }
    })
  },


  /**
   * 检查是否收藏
   */
  checkFollow: function () {
    if (!wx.getStorageSync('user')) {
      return;
    } else {
      http.get(
        app.globalData.host + "/biz/clerkusermerchantrel/checkFollow", {
          clerkId: this.data.workerId
        },
        (_status, _resultCode, _message, data) => {
          this.setData({
            isFollow: data
          });
          // if (!this.data.isFollow) {
          //   this.addFollow();
          // }
          if (this.data.isFollow) {
            this.setData({
              hidden_collection_window: true
            });
          } else {
            if (this.data.userId != this.data.lander.id) {
              // this.setData({
              //   hidden_collection_window: false
              // });
            }
          }
        },
        (_status, _resultCode, _message, _data) => {}
      );
    }

  },

  /**
   * 是否收藏名片弹窗操作
   */
  collectionWindow: function (e) {
    if (e.currentTarget.dataset.otp == "false") {
      this.setData({
        hidden_collection_window: true
      });
      return
    } else {
      this.addFollow();

    }
  },


  /**
   * 添加名片浏览记录
   */
  addBrowsing: function () {
    if (!wx.getStorageSync('user')) {
      return false
    }
    if (this.data.workerId == "undefined" || !this.data.workerId) {
      return
    }
    if (!this.data.merchant_code || (this.data.merchant_code == "temporary") || (this.data.merchant_code == "undefined")) {
      return false
    }
    http.post(
      app.globalData.host + "/biz/clerkbrowsingrel/add", {
        merchantCode: this.data.merchant_code,
        clerkId: this.data.workerId
      },
      (_status, _resultCode, _message, _data) => {

      },
      (_status, _resultCode, _message, _data) => {

      }
    );
  },

  /**
   * 地图导航
   */
  mapNavigation: function () {
    var lat = this.data.business_info.lat;
    var lng = this.data.business_info.lng;
    if (lat && lng) {
      wx.openLocation({
        latitude: lat,
        longitude: lng,
        name: this.data.business_info.addr,
        address: this.data.business_info.addr
      })
    } else {
      wx.showToast({
        title: '企业未设置定位',
        icon: "none"
      })
    }
  },

  /**
   * 获取企业详情信息
   */
  getBusinessInfo: function () {
    http.get(
      app.globalData.host + "/biz/user/merchant/info", {
        merchantCode: this.data.merchant_code
      },
      (_status, _resultCode, _message, data) => {
        wx.setStorageSync('business_homepage_cache_data' + this.data.merchant_code, data)
        data.dis = app.getDisance(data.lat, data.lng)
        this.setData({
          merchantUserCode: data.userCode,
          business_info: data,
          custom_imageUrl: data.bgUrls[0],
          lookEachOther:data.lookEachOther
        });
        let landerUserId = wx.getStorageSync('user').id
        // console.log('ffffffffff0',data.lookEachOther,landerUserId,data.userId,this.data.userRole)
        this.checkUserClerk();
        if (data.lookEachOther == 1 || landerUserId == this.data.userId || landerUserId == data.userId || this.data.userRole < 0) {
          this.setData({
            showContact: true
          })
        }
        console.log('ffffffffff0',data.lookEachOther,landerUserId,data.userId,this.data.userId,this.data.userRole)
        wx.hideLoading();
        wx.setNavigationBarTitle({
          title: this.data.business_info.name
        })
        if (data.phone && !this.data.phone_cover) {
          this.getBusinessPhone(data.phone);
        }
        if (this.data.business_info.status == 0 || this.data.business_info.status == 3) {
          this.setData({
            merchant_err: true
          });
          wx.hideLoading();
        } else {
          this.checkFollow();
        }
        //处理显示商家名称
        let displayStoreName = this.data.business_info.name
        if (displayStoreName == null || displayStoreName == "") {
          displayStoreName = this.data.business_info.shortName
        }
        if (displayStoreName.length > 16) {
          displayStoreName = displayStoreName.substring(0, 16)
        }
        this.setData({
          displayStoreName: displayStoreName
        })

        //处理商家等级
        let businessLevel = "merchant"
        if (data.ultimate == 1) {
          businessLevel = "ultimate"
        } else {
          if (data.channel == 1) {
            businessLevel = "channel"
          }
        }
        this.setData({
          businessLevel: businessLevel,
        })
        if(!this.data.showContact){
          wx.hideShareMenu();
        }
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 复制信息
   */
  setCopyText: function (e) {
    if (!this.data.showContact) {
      wx.showModal({
        title: '提示',
        content: '该名片企业设置了不可相互查看名片',
      })
      return
    }
    if (e.currentTarget.dataset.text) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.text,
        success(_res) {
          wx.showToast({
            title: '复制成功',
            icon: "none"
          })
          wx.getClipboardData({
            success(_res) {}
          })
        }
      })
    }
  },

  /**
   * 获取我的名片列表
   */
  getMineCardList: function () {
    if (!wx.getStorageSync('user')) {
      return;
    }
    http.get(
      app.globalData.host + "biz/user/merchant/clerk/mine/list", {},
      (_status, _resultCode, _message, data) => {
        this.setData({
          card_list: data,
          cardListCount: data.length,
          floatDiv: this.data.hidden_card_list ? true : false,
        });
        this.usingCard()
        if (this.data.clerkTemplateType == "video" && !this.data.hidden_card_list) {
          this.clerkTemplateVideoContext.stop()
        }
      },
      (_status, _resultCode, _message, _data) => {
        console.log("获取我的名片列表失败")

      }
    );
  },

  /** 使用名片 */
  usingCard: function () {
    let card_list = this.data.card_list
    for (var i in card_list) {
      let cart_obj = card_list[i]
      if (i == 0) {
        cart_obj.selected = true
        this.data.selectedCardObj = cart_obj
      } else {
        cart_obj.selected = false
      }
    }
    this.setData({
      card_list: card_list,
    })
  },

  /** 选中名片 */
  selectedCard: function (e) {
    let id = e.currentTarget.dataset.id
    let card_list = this.data.card_list
    for (var i in card_list) {
      let cardObj = card_list[i]
      if (cardObj.id == id) {
        cardObj.selected = true
        this.data.selectedCardObj = cardObj
      } else {
        cardObj.selected = false
      }
    }
    this.setData({
      card_list: card_list,
    })
  },

  /** 新增名片 */
  addCard: function (_e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply',
    })
  },

  /** 交换名片 */
  exchangeCard: function (_e) {
    let that = this
    if (this.data.selectedCardObj) {
      http.post(
        app.globalData.host + "/biz/clerkusermerchantrel/exchangeClerk", {
          merchantCode: this.data.selectedCardObj.merchantCode,
          clerkId: this.data.selectedCardObj.id,
          hisUserId: this.data.userId,
          userId: this.data.selectedCardObj.userId,
        },
        (_status, _resultCode, _message, _data) => {
          this.setData({
            hidden_card_list: true,
            zkDataDisplay: false,
            floatDiv: true,
          });
          wx.showModal({
            title: '跳转提示',
            content: '交换名片成功，是否跳转至收藏夹？',
            showCancel: true,
            cancelText: '取消',
            confirmText: '跳转',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/tabBar_user_center/business_card_manage/business_card_favorites/business_card_favorites',
                })
              }
            },
          })
          wx.hideLoading()
          if (this.data.clerkTemplateType == "video") {
            this.clerkTemplateVideoContext.play()
          }
        },
        (_status, _resultCode, message, _data) => {
          this.setData({
            hidden_card_list: true,
            zkDataDisplay: false,
            floatDiv: true,
          });
          if (message == "biz.clerkusermerchantrel.exchangeClerk.repeat") {
            wx.showToast({
              title: '已交换过名片',
              icon: "none"
            })
          }
          wx.hideLoading()
          if (this.data.clerkTemplateType == "video") {
            this.clerkTemplateVideoContext.play()
            // this.setData({
            //   ctvGoodsTipTimer: setInterval(function () {
            //     that.setData({
            //       ctvGoodsTip: false,
            //     });
            //     clearInterval(that.data.ctvGoodsTipTimer);
            //   }, 5000),
            // });
          }
        }
      );
    } else {
      wx.showToast({
        title: '请选择需要交换的名片！',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    }
  },

  /** 关闭名片列表 */
  closeCardList: function (_e) {
    let that = this;
    this.setData({
      hidden_card_list: true,
      zkDataDisplay: false,
      floatDiv: true,
    });
    if (this.data.clerkTemplateType == "video") {
      this.clerkTemplateVideoContext.play()
      // this.setData({
      //   ctvGoodsTipTimer: setInterval(function () {
      //     that.setData({
      //       ctvGoodsTip: false,
      //     });
      //     clearInterval(that.data.ctvGoodsTipTimer);
      //   }, 5000),
      // });
    }
  },

  /**
   * 添加访问量
   */
  addHot: function () {
    http.post(
      app.globalData.host + "biz/usermerchantclerk/updateHotById", {
        clerkId: this.data.workerId,
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 获取最新的浏览记录
   */
  getRecordsByClerkId: function () {
    http.get(
      app.globalData.host + "biz/clerkbrowsingrel/getRecordsByClerkId", {
        clerkId: this.data.workerId,
      },
      (_status, _resultCode, _message, data) => {
        this.setData({
          seen_list: data
        });
        wx.hideLoading()
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },


  /**
   * 添加分享次数
   */
  addShares: function () {
    http.post(
      app.globalData.host + "biz/usermerchantclerk/updateSharesById", {
        clerkId: this.data.workerId,
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },


  /**
   * 新增留言信息
   */
  addMessage: function () {
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.showLoading({
          title: '保存中',
          mask: "true"
        })
        http.post(
          app.globalData.host + "biz/usershare/mine/add", {
            content: that.data.new_card_message,
            merchantCode: that.data.merchant_code,
            userId: wx.getStorageSync('user').id,
            title: "",
            url: "",

          },
          (_status, _resultCode, _message, data) => {
            that.setData({
              card_message: that.data.new_card_message,
              shareId: data,
              showTextareaEdit: false,
            });
            wx.hideLoading();
          },
          (_status, _resultCode, _message, _data) => {
            wx.hideLoading()
          }
        );
      }
    })
  },

  /**
   * 编辑企业留言
   */
  inputCardMessage: function (e) {
    this.setData({
      new_card_message: e.detail.value,
      card_message: e.detail.value
    });
  },

  /**
   * 关闭发送
   */
  closeSendMessage: function () {
    this.setData({
      hidden_send_message: !this.data.hidden_send_message
    });
  },

  /**
   * 根据shartId获取企业留言，详情
   */
  getShareMessage: function () {

    http.get(
      app.globalData.host + "/biz/usershare/get", {
        id: this.data.shareId,
      },
      (_status, _resultCode, _message, data) => {
        if (data) {
          this.setData({
            change_card_show_range: false
          })
        }
        // console.log(data)
        this.setData({
          custom_title: data.title,
          custom_imageUrl: data.url,
          card_message: data.content,
        });
        this.getMediaInfoHeight()
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 显示textarea
   */
  showTextareaEdit: function (_e) {
    this.setData({
      showTextareaEdit: true,
      profile: false,
    });
  },

  /**
   * 隐藏textarea
   */
  hideTextareaEdit: function (e) {
    if (e.detail.value) {
      this.setData({
        new_card_message: e.detail.value,
        card_message: e.detail.value,
      });
    }

    this.setData({
      showTextareaEdit: false
    });
  },

  /**
   * 去首页(需要雷达采集)
   */
  toIndex: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.merchant_code + '&higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=clerk' + this.data.merchant_code + '&sceneDT=' + this.data.clerkId,
    })
  },

  /**防止滑动冒泡 */
  doNotMove: function () {
    return false;
  },

  /**
   * 获取企业活动
   */
  getBusinessActivity: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    http.get(
      app.globalData.business_host + "fastevent/inrewardPage", {
        pageIndex: this.data.pageIndex,
        pageLimit: 20,
        storeCode: this.data.merchant_code,
        categoryCode: this.data.goodsCategoryCode == "" ? undefined : this.data.goodsCategoryCode,
        sortType: 'customize',
        sortOrder: 'asc'
      },
      (_status, _resultCode, _message, data) => {
        this.setData({
          goodsList: data.list
        });
        this.handlerList();
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 操作数据
   */
  handlerList: function () {
    for (let i = 0; i < this.data.goodsList.length; i++) {
      let list = this.data.goodsList[i];

      let obj = {};
      if (list.fileJson) {
        obj.pic = JSON.parse(list.fileJson).illustration[0];
        if (obj.pic) {
          obj.type = util.getUrlType(JSON.parse(list.fileJson).illustration[0])
        }
      }
      this.data.goodsList[i].shortName = list.title.length > 28 ? list.title.substring(0, 26) + "..." : list.title;
      this.data.goodsList[i].illustration = obj.pic;
      this.data.goodsList[i].videoType = obj.type;
      this.data.goodsList[i].product.price = util.priceSwitch(this.data.goodsList[i].product.price);
      this.data.goodsList[i].discountPrice = util.priceSwitch(this.data.goodsList[i].discountPrice);
      this.data.goodsList[i].dis = app.getDisance(this.data.goodsList[i].merchant.lat, this.data.goodsList[i].merchant.lng);
    }
    //优化需求：商品列表为空时直接隐藏不显示
    let tempTc = this.data.tab_config
    if (this.data.goodsList.length == 0) {
      tempTc.fixed = false
    }
    let tabType = "news"
    let tabs = this.data.tab_config.tabs
    //商品列表不为空并且当前选中切页为商品列表时，从其他页面返回时跳回原切页
    if (this.data.goodsList.length > 0 && tabs[this.data.selectedTabIndex].tabType == "goods") {
      tabType = "goods"
    }
    this.setData({
      goodsList: this.data.goodsList,
      tab_config: tempTc,
      tabType: tabType,
    });
    if (this.data.clerkTemplateType != "video" && this.data.clerkTemplateType != "festival") {
      this.getMediaInfoHeight()
    } else {
      if (this.data.clerkTemplateType == "video" && this.data.hidden_card_list) {
        // this.setData({
        //   ctvGoodsTipTimer: setInterval(function () {
        //     that.setData({
        //       ctvGoodsTip: false,
        //     });
        //     clearInterval(that.data.ctvGoodsTipTimer);
        //   }, 6000),
        // });
      }
    }
    wx.hideLoading();
  },


  /**
   * 跳转到详情(需要雷达采集)
   */
  goToDetail: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_detail/business_detail?code=' + e.currentTarget.dataset.code + '&sceneType=clerk' + this.data.merchant_code + '&sceneDT=' + this.data.clerkId + "&activityType=" + e.currentTarget.dataset.activitytype + "&clerk_code=" + this.data.clerk_code,
    })
  },

  /**
   * 跳转到商家首页
   */
  handlerPageTap: function () {
    this.jumpBusiness();
  },

  /**
   * 定时清除定时器
   */
  clearIntervalByTime: function () {
    setTimeout(() => {
      // console.log("1分钟后清除定时器");
      clearInterval(this.data.homepage_buttonDevice);
    }, 60000)
  },

  /** 处理tab切换 */
  handlerTabTap: function (e) {
    let that = this;
    let tabType = e.currentTarget.dataset.type;
    this.setData({
      tabType: tabType,
      tabPosition: e.currentTarget.dataset.index,
    })
    that.updateSelectedPage(e.currentTarget.dataset.index);
  },

  // 更换页面到指定page ，从0开始
  updateSelectedPage: function (page) {
    if (this.innerAudioContext) {
      this.innerAudioContext.pause()
    }
    if (this.videoContext) {
      this.videoContext.pause()
    }
    let {
      swipe_config
    } = this.data;
    this.setData({
      swipe_config: swipe_config,
      selectedTabIndex: page,
    });
    this.getMediaInfoHeight()
  },

  /** 切换 */
  swiperChange(e) {
    let type = e.currentTarget.dataset.type
    if (type == 'goods') {
      this.setData({
        tabType: 'goods'
      });
    }
    if (type == 'news') {
      this.setData({
        tabType: 'news'
      });
    }

    if (e.detail.source == 'touch') {
      this.updateSelectedPage(e.detail.current);
    }
  },

  /** 获取动态名片信息高度 */
  getMediaInfoHeight: function () {
    let that = this
    let query = wx.createSelectorQuery();
    if (this.data.tabType == 'goods') {
      query.select('#viewMI1').boundingClientRect()
      query.exec(function (res) {
        if (res[0]) {
          that.setData({
            mediaInfoHeight: res[0].height,
          })
        }
      })
    } else if (this.data.tabType == 'news') {
      query.select('#viewMI2').boundingClientRect()
      query.exec(function (res) {
        if (res[0]) {
          that.setData({
            mediaInfoHeight1: res[0].height,
          })
        }
      })
    }


  },

  /** 加载音频视频 */
  loadAudioVideo: function () {
    let that = this
    //获取视频对象
    this.videoContext = wx.createVideoContext('mediaInfo_video')
    //获取音频对象
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.src = this.data.clerk.voiceUrl
    this.innerAudioContext.onCanplay(() => {
      that.innerAudioContext.duration
      if (that.innerAudioContext.duration == 0 && !that.data.isIOS) {
        that.innerAudioContext.volume = 0
        that.innerAudioContext.play();
        that.innerAudioContext.stop();
        that.innerAudioContext.volume = 1;
      }
      // console.log(that.innerAudioContext);
      setTimeout(() => {
        let totalTime = Math.floor(that.innerAudioContext.duration)
        let displayTime = that.handlerTime(totalTime)
        // console.log("获取时长");
        that.setData({
          voiceTime: totalTime,
          displayVT: displayTime,
        })
        // console.log(that.data.voiceTime);
      }, 1000)
    })
  },

  /** 时间处理 */
  handlerTime: function (secord) {
    let min = (secord / 60).toString()
    let timeArray = min.split(".")

    let minStr = ""
    if (timeArray[0].length == 1) {
      minStr = "0" + timeArray[0]
    } else {
      minStr = timeArray[0]
    }

    let secordStr = ""
    if (timeArray[1]) {
      let tempStr = "0." + timeArray[1]
      let tempSecord = (parseFloat(tempStr) * 60).toFixed(0).toString()
      if (tempSecord.length == 1) {
        secordStr = "0" + tempSecord
      } else {
        secordStr = tempSecord
      }
    } else {
      secordStr = "00"
    }

    return minStr + ":" + secordStr
  },

  /** 音频播放暂停 */
  voicePlayPause: function () {
    let that = this
    if (this.innerAudioContext.paused) {
      this.innerAudioContext.play()
      this.innerAudioContext.onTimeUpdate(() => {
        let currentTime = Math.floor(this.innerAudioContext.currentTime)
        let displayTime = that.handlerTime(currentTime)
        that.setData({
          currentTime: currentTime,
          displayCT: displayTime,
        })
      })
      this.innerAudioContext.onEnded(() => {
        this.innerAudioContext.offEnded()
        this.innerAudioContext.offTimeUpdate()
        this.setData({
          audioPlaying: false,
        })
      })
    } else {
      this.innerAudioContext.pause()
    }
    this.setData({
      audioPlaying: this.innerAudioContext.paused,
    })
  },

  /** 显示名片简介*/
  showProfile: function () {
    this.setData({
      profile: !this.data.profile,
      showTextareaEdit: false,
    })
  },

  /** 隐藏显示按钮 */
  displayBtn: function () {
    this.setData({
      profile: false,
    })
  },

  ctvVideoPlay: function () {
    this.setData({
      ctvVideoPlaying: true,
    })
  },

  ctvVideoPause: function () {
    this.setData({
      ctvVideoPlaying: false,
    })
  },

  ctvVideoPlayPause: function () {
    if (this.data.ctvVideoPlaying) {
      this.clerkTemplateVideoContext.pause()
    } else {
      this.clerkTemplateVideoContext.play()
    }
  },

  /**
   * 显示产品列表层
   */
  showProductList: function () {
    if (this.data.goodsList.length < 1) {
      return
    }
    this.setData({
      productListMask: !this.data.productListMask
    });
  },
  showGoodsTip: function () {
    if (this.data.goodsList.length > 0) {
      this.setData({
        ctvGoodsTip: !this.data.ctvGoodsTip
      })
    } else {
      wx.showToast({
        title: '商家未发布商品',
      })
    }
  },
  descVideoPlayPause: function () {
    if (this.data.ctvVideoPlaying) {
      this.videoContext.pause()
    } else {
      this.videoContext.play()
    }
  },

  /** 切换名片正反面 */
  switchFrontBack: function (e) {
    this.rotateFn(e);
  },

  rotateFn: function (e) {
    let that = this
    if (this.data.onFlip) {
      return
    }
    this.setData({
      onFlip: true,
    });
    let id = e.currentTarget.dataset.id
    let animation_festival = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    // 点击正面
    if (id == 1) {
      this.setData({
        animation_face: animation_festival.rotateY(180).step().export(),
        animation_back: animation_festival.rotateY(0).step().export(),
        ctfClerkFront: !that.data.ctfClerkFront
      })
    } else { //点击反面
      this.setData({
        animation_face: animation_festival.rotateY(0).step().export(),
        animation_back: animation_festival.rotateY(180).step().export(),
        ctfClerkFront: !that.data.ctfClerkFront
      })
    }
    setTimeout(function () {
      that.setData({
        onFlip: false,
      })
    }, 1400);
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
   * 返回首页(需要雷达采集)
   */
  backIndexPage: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.merchant_code + '&higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=clerk' + this.data.merchant_code + '&sceneDT=' + this.data.clerkId,
    })
  },

  /** 暂停所有音视频 */
  pauseAllAV: function () {
    if (this.innerAudioContext) {
      this.innerAudioContext.pause()
    }
    if (this.clerkTemplateVideoContext) {
      this.clerkTemplateVideoContext.pause()
    }
    if (this.videoContext) {
      this.videoContext.pause()
    }
  },

  /**
   * 播放背景音乐
   */
  initPlayFestivalBgm: function () {
    this.data.festival_bgm = wx.createInnerAudioContext()
    this.data.festival_bgm.autoplay = true;
    this.data.festival_bgm.loop = true;
    this.data.festival_bgm.src = this.data.clerk.bgmUrl;
    this.data.festival_bgm.onPlay(() => {

    })

  },

  /**
   * 播放或者暂停背景音乐
   */
  playOrPauseFestivalBgm: function () {
    if (this.data.festival_bgm.paused) {
      this.data.festival_bgm.play(() => {})
    } else {
      this.data.festival_bgm.pause();
    }
    this.setData({
      audioPlaying: this.data.festival_bgm.paused,
    })
  },

  /**
   * 跳转名片商城
   */
  jumpClerkGoodList: function () {
    this.setData({
      productListMask: true,
    })
    if (this.data.workerId && this.data.merchant_code) {
      if (this.data.goodsList.length > 0) {
        wx.navigateTo({
          url: "/pages/clerk/clerk_good_list/clerk_good_list?shareId=" + this.data.shareId + "&higherLevelCode=" + this.data.clerk_code + "&workerId=" + this.data.workerId + "&merchantCode=" + this.data.merchant_code,
        })
      } else {
        wx.showToast({
          title: '商家未上架商品',
          duration: 2000,
          icon: "none"
        })
      }
    }
  },

  /**
   * 获取点播地址
   */
  getVideoUrl: function () {
    if (!this.data.clerk.videoUrl) {
      return
    }
    http.get(
      app.globalData.host + "convert/vod/info", {
        srcUri: this.data.clerk.videoUrl
      },
      (status, resultCode, message, data) => {
        this.data.clerk.videoUrl = data.desUri ? data.desUri : data.srcUri;
        this.setData({
          ['clerk.videoUrl']: data.desUri ? data.desUri : data.srcUri
        })
      },
      (status, resultCode, message, data) => {

      }
    );
  },

  /** 构建相册风采列表 */
  buildAlbumUrlList: function (list) {
    let urlList = []
    for (let i in list) {
      let item = list[i]
      let urls = JSON.parse(item)
      for (let j in urls) {
        urlList.push(urls[j])
      }
    }
    return urlList
  },

  /** 阻止鼠标事件 */
  stopMouseOperate: function () {

  },

  /** 保存分享信息 */
  saveShareInfo: function () {
    if (!wx.getStorageSync('user')) {
      return false
    }
    if (!app.globalData.higherLevelCode) {
      return false
    }
    http.post(
      app.globalData.business_host + "/userShare/saveShare", {
        storeCode: this.data.merchant_code,
        shareUser: app.globalData.higherLevelCode,
        source: "小程序",
      },
      (_status, _resultCode, _message, data) => {

      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

  /** 获取产品分类 */
  getGoodsType: function () {
    http.get(
      app.globalData.business_host + "eventType/getEventTypes", {
        storeCode: this.data.merchant_code,
        countEvent: 1,
        statuses: JSON.stringify(["1"]),
        typeCodes: JSON.stringify([
          "inreward",
        ]),
        excludeEmpty: 1,
        productStatuses: JSON.stringify(["1"]),
      },
      (_status, _resultCode, _message, _data) => {
        // console.log(_data.typeList)
        let gtl = []
        gtl.push({
          code: "",
          name: "全部商品"
        })
        gtl = gtl.concat(_data.typeList)
        this.setData({
          goodsTagList: gtl,
        })
      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

  /** 点击商品分类 */
  clickGoodsTag: function (e) {
    this.setData({
      goodsTagSelectedIndex: e.currentTarget.dataset.index,
      goodsCategoryCode: e.currentTarget.dataset.item.code,
    })
    this.getBusinessActivity();
  },

  /** 前往商品分类页 */
  goToGoodsCategory: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_activity/goods_category/goods_category?merchantCode=' + this.data.merchant_code + "&categoryTypeIndex=" + e.currentTarget.dataset.index + "&inreward=true&clerk_code=" + this.data.clerk_code,
    })
  },

  /**
   * 展开或收起服务范围字体
   */
  changeShowRange: function () {
    this.setData({
      change_show_range: !this.data.change_show_range
    });
  },

  /**
   * 跳转直播间(需要雷达采集)
   */
  jumpLive: function () {
    let merchantCode = this.data.merchant_code;
    wx.navigateTo({
      url: "/livePackage/pages/live/live?merchantCode=" + merchantCode + '&higherLevelCode=' + app.globalData.higherLevelCode + (this.data.liveClerkCode ? ('&clerk_code=' + this.data.liveClerkCode) : ('&clerk_code=' + this.data.clerk.userCode)) + '&sceneType=' + this.data.merchant_code + '&sceneDT=' + this.data.workerId,
    })
  },
  /**
   * 展开或收起服务范围字体
   */
  changeShowRange: function () {
    this.setData({
      change_show_range: !this.data.change_show_range
    });
  },

  displayCardList: function () {
    if (!this.data.showContact) {
      wx.showModal({
        title: '提示',
        content: '该名片企业设置了不可相互查看名片',
      })
      return
    }
    this.setData({
      hidden_card_list: !this.data.hidden_card_list,
      zkDataDisplay: !this.data.hidden_card_list,
    })
  },

  /**展示分类 */
  showClassify: function () {
    this.setData({
      keepout: !this.data.keepout,
    })
  },

  goodsCategoryFn: function (e) {
    let index = e.currentTarget.dataset.index1;
    let offsetLeft = e.currentTarget.offsetLeft;
    this.setData({
      keepout: !this.data.keepout,
      goodsIndex: index,
      goodsTagSelectedIndex: index,
      goodsCategoryCode: e.currentTarget.dataset.item1.code,
      selectedTab: e.currentTarget.dataset.item1,
      scrollLeft: index * 80 - offsetLeft
    })
    this.getBusinessActivity();
  },
  /** 邀请员工 */
  invitePersonnel: function () {
    this.setData({
      floatDiv: false,
      ctvGoodsTip: false,
      showMessage: false
    })
    if (this.data.business_info.status == 1) {
      // console.log(this.data.clerk.role)
      if (this.data.clerk.role > 0) {
        this.setData({
          inviteDisplay: true,
          zkDataDisplay: false,
        })
      } else {
        wx.showToast({
          title: '共享合伙人不能发起邀请！',
          icon: 'none',
          mask: true,
        })
      }
    } else {
      wx.showToast({
        title: '企业状态异常！',
        icon: 'error',
      })
    }
  },

  /** 关闭邀请 */
  closeInvite: function () {
    this.setData({
      inviteDisplay: false,
      floatDiv: true,
      showMessage: true,
      zkDataDisplay: true,
    })
  },

  /** 数字滚动特效 */
  animateNumber: function () {
    let totalStaff = this.data.totalStaff
    let totalCustomer = this.data.totalCustomer
    let totalSalesVol = this.data.totalSalesVol
    let totalOrder = this.data.totalOrder
    if (this.data.infoPage == 1) {
      let n1 = new NumberAnimate({
        from: totalStaff, //开始时的数字
        speed: this.data.numberAnimateDuration, // 总时间
        refreshTime: 100, //  刷新一次的时间
        decimals: 0, //小数点后的位数
        onUpdate: () => {
          this.setData({
            totalStaffDisplay: n1.tempValue
          });
        },
        onComplete: () => {}
      });

      let n2 = new NumberAnimate({
        from: totalCustomer,
        speed: this.data.numberAnimateDuration,
        decimals: 0,
        refreshTime: 100,
        onUpdate: () => {
          this.setData({
            totalCustomerDisplay: n2.tempValue
          });
        },
        onComplete: () => {
          this.createAnimation()
        }
      });
    } else if (this.data.infoPage == 2) {
      let n1 = new NumberAnimate({
        from: totalSalesVol, //开始时的数字
        speed: this.data.numberAnimateDuration, // 总时间
        refreshTime: 100, //  刷新一次的时间
        decimals: 2, //小数点后的位数
        onUpdate: () => {
          this.setData({
            totalSalesVolDisplay: n1.tempValue
          });
        },
        onComplete: () => {}
      });

      let n2 = new NumberAnimate({
        from: totalOrder,
        speed: this.data.numberAnimateDuration,
        decimals: 0,
        refreshTime: 100,
        onUpdate: () => {
          this.setData({
            totalOrderDisplay: n2.tempValue
          });
        },
        onComplete: () => {
          this.createAnimation()
        }
      });
    }
  },

  /** 创建动画 */
  createAnimation: function () {
    let animation = wx.createAnimation({
      duration: this.data.animationDuration,
      timingFunction: "linear",
    })
    this.animation = animation

    this.timeout1 = setTimeout(function () {
      clearTimeout(this.timeout1)
      this.setAnimation()
    }.bind(this), 3500);
  },

  /** 设置翻转动画 */
  setAnimation: function () {
    let animation = this.animation
    animation.rotateX(360).step()
    this.setData({
      animation: animation.export(),
    })
    this.timeout2 = setTimeout(() => {
      clearTimeout(this.timeout2)
      animation.rotateX(0).step()
      this.setData({
        animation: animation.export(),
        infoPage: this.data.infoPage == 1 ? 2 : 1,
      })
      this.animateNumber()
    }, this.data.animationDuration);
  },

  /** 获取智控信息 */
  getZkDataShow: function () {
    http.get(
      app.globalData.host + "biz/user/merchant/branch/data/show", {
        merchantCode: this.data.clerk.mainMerchantCode,
      },
      (_status, _resultCode, _message, _data) => {
        let value = _data.valueShow
        if (value && value != "" && JSON.parse(value)) {
          let temp = JSON.parse(value)
          //已服务客户
          let totalCustomer = Number(Number(temp.customerCount).toFixed(0))
          let totalCustomerWan = false
          if (totalCustomer >= this.data.conventWanMin) {
            totalCustomer = Math.floor(totalCustomer / 10000)
            totalCustomerWan = true
          }

          //订单总量
          let orderCount = Number(Number(temp.orderCount).toFixed(0))
          let orderCountWan = false
          if (orderCount >= this.data.conventWanMin) {
            orderCount = Math.floor(orderCount / 10000)
            orderCountWan = true

          }

          //销售总量
          let totalSalesVol = Number(Number(temp.amountSumYuan).toFixed(0))
          let totalSalesVolWan = false
          if (totalSalesVol >= this.data.conventWanMin) {
            totalSalesVol = Math.floor(totalSalesVol / 10000)
            totalSalesVolWan = true
          }

          this.setData({
            totalCustomer: totalCustomer,
            totalCustomerWan: totalCustomerWan,
            totalOrder: orderCount,
            totalOrderWan: orderCountWan,
            totalSalesVol: totalSalesVol,
            totalSalesVolWan: totalSalesVolWan,
          })
          if (this.data.totalStaff > 0) {
            this.animateNumber()
          } else {
            setTimeout(() => {
              this.animateNumber()
            }, 2000);
          }
        }
      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

  /** 根据名片模板获取图标 */
  getIcon: function () {
    let iconUrls = clerkUtil.getIconByStyle(this.data.clerk)
    this.setData({
      iconUrls: iconUrls,
    })
  },

  /**获取企业配置tab信息 */
  getTabConfig() {
    http.get(
      app.globalData.host + "biz/merchant/config/value/merchantConfig", {
        merchantCode: this.data.merchant_code,
      },
      (status, resultCode, message, data) => {
        // console.log("分组================", data);
        let temps = [];
        let value = null;
        let newName = null;
        let productName = null;
        if (data && data.length > 0) {
          for (let i in data) {
            let code = data[i].code;
            if (code == 'merchant.index.card') {
              value = data[i].value;
            }
            if (code == 'clerk.news.name') {
              newName = data[i].value;
            }
            if (code == 'clerk.product.name') {
              productName = data[i].value;
            }
          }

          if (value == '0') {
            temps = [{
              name: productName,
              id: 0,
              tabType: 'goods'
            }, {
              name: newName,
              id: 1,
              tabType: 'news'
            }]

          }
          if (value == '1') {
            temps = [{
              name: newName,
              id: 0,
              tabType: 'news'
            }, {
              name: productName,
              id: 1,
              tabType: 'goods'
            }]
          }
          // this.setData({
          //   tabPosition: value,
          //   ['tab_config.tabs']: temps,
          //   switch_index: temps[0].id
          // })
        }
        let tabType = temps[this.data.selectedTabIndex].tabType
        if (this.data.goodsList.length == 0) {
          tabType = "news"
        }
        this.setData({
          tabPosition: this.data.selectedTabIndex,
          ['tab_config.tabs']: temps,
          switch_index: temps[this.data.selectedTabIndex].id,
          tabType: tabType,
        });
      },
      (status, resultCode, message, data) => {
        // this.$toast.center(message);
      }
    );
  },
  /** 获取动态类型 */
  getNewsTypeList: function () {
    http.get(
      app.globalData.host + "biz/user/merchant/news/type/list", {
        merchantCode: this.data.merchant_code,
      },
      (_status, _resultCode, _message, _data) => {
        // console.log('获取动态类型成功',_data);
        this.handlerNewsType(_data)
      },
      (_status, _resultCode, _message, _data) => {
        console.log('获取动态类型失败', _data);
      }
    )
  },
  handlerNewsType: function (list) {
    list.unshift({
      id: "",
      type: "",
      typeName: "全部",
    })
    this.setData({
      newsTypes: list,
    })
  },
  //筛选点击
  onClickScreening: function (e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    let type = e.currentTarget.dataset.type;
    this.setData({
      newsTypes_index: index,
      newsTypes_select: item,
      tabType: type,
    })
    let businessNews = this.selectComponent("#business_news")
    businessNews.clearDataStatus()
    businessNews.getNewsList()
    setTimeout(function () {
      that.getMediaInfoHeight();
    }, 1000)
  },

  // 返回顶部
  onClickBackTo: function () {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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