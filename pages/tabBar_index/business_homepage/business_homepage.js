// pages/tabBar_index/business_homepage/business_homepage.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    networkType: true, //监听网络连接与断开
    channelGoodsCount: null,
    tabType: null,
    tabPosition: '',
    tabNewsTitle: '',
    tabTitle: '',
    mediaInfoHeight: 300,
    mediaInfoHeight1: 800,
    tabBarActive: 0,
    tabbar: app.globalData.tabBar,
    business_userid: "", //企业id
    defaultMerchantCode: app.globalData.defaultMerchantCode,
    business_info: {}, //企业信息
    userLander: null,
    parentCount: 0,
    businessStatus: {}, //企业状态
    merchantPageTemplate: "normal", //企业主页模板（normal：通用；estate：房地产）
    merchantFavorites: false, //是否收藏关注企业
    userRole: -1, //登录用户在该企业里所属角色（-1:路人;0:共享合伙人;1:事业合伙人;2:商家）
    business_phone: "", //企业电话和私人电话
    bgAlbumList: [], //背景相册列表（用于顶部展示）
    show_business_phone: true, //展示企业号码列表
    switch_index: 0, //切换菜单index
    business_dynamic: [], //企业动态列表
    custom_title: "", //自定义标题
    custom_imageUrl: "", //自定义图片
    all_rank: "", //所有排名（热度，全国）
    tagCode_rank: "", //行业排名
    business_users: [], //企业旗下精英
    lander: wx.getStorageSync('user'),
    card_message: "",
    shareId: "",
    business_activity_list: [],
    iPhone_X: app.globalData.iPhone_X,
    change_show_range: false, //是否展开服务范围内容
    tagCode: "", //企业行业的code
    workerId: false, //职员id
    userId: '', //用户ID
    slide_menu: {
      windowWidth: 0,
      menuWidth: 0,
      offsetRght: 0,
      tStart: true
    },
    slide_button: {
      left: 0,
      right: 0,
      top: 100,
      height: 45,
      width: 50,
      tStart: true
    },

    noActivity: true, //是否没活动
    scrollTop: null,
    navScrollLeft: 0,
    newsPageIndex: 1,
    newsPageIndex_add: 0, //二维数组下标
    news_loadAll: false,
    isTop: false,
    autoTop: 0,
    tagCodeTemp: '',
    fromApp: false, //是否从app过来
    app_parameter: "", //返回给app的参数
    hidden_video: false, //是否隐藏视频
    platform: null, //当前系统是ios还是android平台等
    isFollow: false, //是否收藏过
    phone_cover: false, //是否提升名片上的号码为商家号码
    hidden_collection_window: true, //是否显示收藏弹窗
    showStorePhone: true, //是否展示电话号码
    showVisitorRecord: false, //是否显示访客记录
    hidden_send_message: true,
    seen_list: "",
    hot: "",
    shares: "",
    errorImg: "https://oss.vicpalm.com/defaultNoPic.jpg",
    showTextareaEdit: false,
    merchant_err: false,
    wxVersion: "",
    capsuleTop: "",
    capsuleHeight: "",
    isLogin: false, //是否登录
    isMerchant: false, //是否为商家
    isCheckIn: false, //是否入驻
    official: false, //是否为公共事务
    forwarding: false, //是否转发中
    goodsTagList: [], //商品分类列表
    goodsTagSelectedIndex: 0, //选中商品分类下标
    goodsCategoryCode: "", //选中商品分类编号
    goodsTypeSelectedIndex: 1, //点击商品排序下标
    priceSortAsc: true, //价格排序是否为升序
    activityTypeText: "玩法选择",
    activityTypeList: [{
      code: "original",
      name: "原价商品"
    }, {
      code: "universalRebate",
      name: "全民赚佣"
    }], //玩法列表
    activityTypeHidden: true, //玩法列表隐藏
    screening_top: true,
    goodsHeadHeight: 0,
    topNum: 0, //产品列表滚动量
    goodsTypeList: [], //商品类型列表
    goodsTypeCode: "", //选中商品类型编号
    goodsTypeSelectedIndex_simply: 0, //选中商品类型下标
    goodsSortSelectedIndex: 1, //点击商品排序下标
    hotSortAsc: true, //销量排序是否为升序
    activityTypeText_simply: "全部玩法",
    activityTypeList_simply: [{
      code: "",
      name: "全部玩法"
    }, {
      code: "original",
      name: "原价商品"
    }, {
      code: "universalRebate",
      name: "全民赚佣"
    }], //玩法列表
    pageIndex: 1,
    pageIndex_add: 0, //二维数组下标
    prePadingTop: 0,
    sortTypeCode: "",
    cartDisplay: false, //购物车是否显示
    quantity: 1,
    sku_url: "",
    sku_priceYuan: "",
    chooseSkus: [], //已选择的规格
    freePostageNum: 0,
    order_addr: "", //收货地址
    isShareGoods: false, //是否分享商品（是：商品；否：商家）
    couponIdList: [], //优惠券id数组
    couponList: "", //优惠券id数组
    todayDate: "",
    // 房地产相关
    productList: [], //商品列表
    productInfo: {
      title: "",
      id: null
    }, //商品信息
    mapData: {
      latitude: 0,
      longitude: 0,
    },
    estateSellingPriceTypeMap: {
      "1": "售价",
      "2": "首付",
      "3": "价格面议"
    },
    projectNearbyCurrentIndex: 1, //项目周边索引
    projectNearbyKeyword: '交通', //项目周边关键词
    projectNearbyList: [], //项目周边列表
    databank: [], //资料库
    databankPageIndex: 1,
    databankPageIndex_add: 0, //二维数组下标
    navbarInitTop: 0, //导航栏初始化距顶部的距离
    navbarInitTop2: 0, //导航栏初始化距顶部的距离2
    navbarCurrentIndex: 0, //吸顶菜单索引
    isFixedTop: false, //是否固定顶部
    fileInfo: {},
    showFileBox: false, //显示文件
    shareType: 'merchant', //分享类型
    tabBarDisplay: true,
    loginTip: false, //是否弹出过登录提示
    clerkCode: '',
    merchant_code: '',
    certified: true, //企业是否过审
    fromClerkShow: false, //是否来自名片展示页
    liveClerkCode: '',
    merchantUserCode: '',
    mainStoreCode: "", //总店code
    isZk: false,
    newsListEmpty: false, //动态列表为空
    signInData_isShowSignIn: false, //是否有权限显示
    signInData_signInSuccess: false, //是否签到成功
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
    //切页内容配置
    swipe_config: {
      indicator_dots: false, // 不显示小圆点
      autoplay: false, // 自动切换
      interval: 2000, // 自动切换频率
      duration: 500, // 切换时间
    },
    showChannle: true, //分店店长是否能看到其他
    newsTypes: '', //动态类型
    newsTypes_index: 0, //动态类型选中index
    newsTypes_select: {}, //选择动态类型
    tabHeight: 0, //tab的高度
    productCode: '',
    eventCode: "",
    estateList: [{
        icon: "info.png",
        text: "项目概况"
      },
      {
        icon: "photos.png",
        text: "项目图册"
      },
      {
        icon: "address.png",
        text: "项目区位"
      },
      {
        icon: "estateShow.png",
        text: "户型展示"
      },
      {
        icon: "3d.png",
        text: "三维动画"
      },
      {
        icon: "green.png",
        text: "环保科技"
      },
      {
        icon: "trees.png",
        text: "园林景观"
      },
      {
        icon: "park.png",
        text: "公园广场"
      },
      {
        icon: "sevrice.png",
        text: "物业服务"
      },
      {
        icon: "phone.png",
        text: "联系我们"
      },
    ],

    //雷达数据采集所需数据
    timer: null, //雷达时间采集定时器
    startTime: null,
    scene: '',
    sceneDT: '0',
    winHeight: 0, //窗口高度
    pageHeight: 0, //页面高度
    progress: 0, //浏览页面百分比

    swiperImgHeight: 0, //顶部滚动主图高度

    //获取首页动态参数
    includePlatform: true, //是否包含平台资讯
    scope: "merchant", //资讯范围（merchat：商家首页；clerk：名片页）
    clerkMark: 0, //是否在名片展示
  },

  /** 获取平台 */
  getPlatform: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          platform: res.platform,
        });
        if (res.platform == "devtools") {} else if (res.platform == "ios") {} else if (res.platform == "android") {}
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    if (!wx.getStorageSync('user')) {
      app.isUserLogin(function (isLogin) {})
    }
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    this.getPlatform();
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    app.getOptions(options, function (data, fromApp) {
      that.initOptions(data)
      if (fromApp == 1) {
        that.setData({
          fromApp: true,
        })
        that.onShow()
      }
    }, function (data, qrcode_scene) {
      //旧小程序码
      //&是我们定义的参数链接方式
      if (qrcode_scene.split("$")[0]) {
        app.globalData.higherLevelCode = qrcode_scene.split("$")[0];
        app.globalData.isReloadThePage_tabBar_index = true;
      }
      if (qrcode_scene.split("$")[1]) {
        that.setData({
          merchant_code: qrcode_scene.split("$")[1]
        });
        app.globalData.merchant_code = qrcode_scene.split("$")[1];
        wx.setStorageSync('merchant_code', qrcode_scene.split("$")[1])
      }
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧二维码
      let higherLevelCode = util.getQueryString(qrcode_scene, "user");
      let id = util.getQueryString(qrcode_scene, "id");
      //&是我们定义的参数链接方式
      if (higherLevelCode) {
        app.globalData.higherLevelCode = higherLevelCode;
        app.globalData.isReloadThePage_tabBar_index = true;
        app.globalData.jumpIndex_fromApp = true;
      }
      if (id) {
        app.globalData.isReloadThePage_tabBar_index = true;
        that.setData({
          merchant_code: id
        });
        app.globalData.merchant_code = id;
        wx.setStorageSync('merchant_code', id)
      }
      that.initOptions(data)
    })
    var pages = getCurrentPages(); //页面指针数组
    var prepage = pages[pages.length - 2]; //上一页面指针
    this.getMerchantService();
    if (app.globalData.enableMember) {
      this.getSignInInfo();
    }
    if (prepage && prepage.route == "pages/clerk/show/show") {
      this.setData({
        fromClerkShow: true,
        scene: 'live',
        sceneDT: this.data.merchant_code,
        // includePlatform: false,
        // scope: "clerk",
        // clerkMark: 1,
      })
    }

    this.initPageProgress()
  },

  /**监听网络变化 */
  watchBack: function (networkType) {
    this.setData({
      networkType: networkType
    });
    // console.log('==========网络监听==========', this.data.networkType);
  },

  //初始化参数
  initOptions(options) {
    if (options) {
      //小卡片带分享码
      if (options.higherLevelCode) {
        app.globalData.higherLevelCode = options.higherLevelCode;
        app.globalData.isReloadThePage_tabBar_index = true;
      }
      if (options.clerk_code) {
        this.setData({
          clerkCode: options.clerk_code
        });
      }
      if (options.cover) {
        this.setData({
          phone_cover: true,
          card_phone: options.cover
        });
        this.getBusinessPhone(options.cover);
      }
      if (options.showStorePhone && options.showStorePhone != 1) {
        this.setData({
          showStorePhone: false
        });
      }
      if (options.userId) {
        this.setData({
          business_userid: options.userId
        });
      }
      if (options.sceneType) {
        this.setData({
          scene: options.sceneType
        });
      }
      if (options.sceneDT) {
        this.setData({
          sceneDT: options.sceneDT
        });
      }
      //新版电商版 start
      let mCode = this.data.defaultMerchantCode
      // if (options.merchantCode) { //企业code，必传
      //   mCode = options.merchantCode
      //   wx.setStorageSync('merchant_code', mCode)
      // }
      //  else {
      //   let mc = wx.getStorageSync('merchant_code')
      //   if (mc && mc != "") {
      //     mCode = mc
      //   } else {
      //     wx.setStorageSync('merchant_code', mCode)
      //   }
      // }
      this.setData({
        merchant_code: mCode
      });
      wx.setStorageSync('merchant_code', mCode)
      // if (!this.data.merchant_code || this.data.merchant_code == '') {
      //   this.setData({
      //     merchant_code: mCode
      //   });
      // }
      this.getTabConfig();
      this.getNewsTypeList();
      this.getSupplyData();
      if (wx.getStorageSync('user')) {
        this.checkUserClerk()
      }
      //新版电商版 end

      if (options.tagCode) { //企业行业，必传，获取行业排行
        this.setData({
          tagCode: options.tagCode
        });
      } else {

      }
      if (options.workerId) {
        app.globalData.isReloadThePage_tabBar_index = true;
        this.setData({
          workerId: options.workerId,
          hidden_video: true
        });
      }
      //是否显示访客记录
      if (options.showVisitorRecord == "true") {
        this.setData({
          showVisitorRecord: options.showVisitorRecord,
        })
      }

      this.setData({
        todayDate: util.formatDateTime(new Date()),
      })
    }
    this.setData({
      lander: wx.getStorageSync('user'),
      iPhone_X: app.globalData.iPhone_X
    });
    this.addIncreaseAccess(5);
    this.getBusinessActivity();
    this.checkClerkApply();
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.homepage_button = this.selectComponent("#homepage_button");
    this.setData({
      wxVersion: util.compareVersion(app.globalData.wxVersion, "7.0.0"),
      capsuleTop: app.globalData.capsuleTop,
      capsuleHeight: app.globalData.capsuleHeight,
    });
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('=========', app.globalData.networkType);
    this.data.startTime = util.timestamp();
    this.setData({
      userLander: wx.getStorageSync('user')
    });
    let that = this
    if (wx.getStorageSync('user')) {
      /**获取购物车数量 */
      app.loadCartNum(function (tabBar) {
        that.setData({
          tabbar: tabBar
        });
      })
      if (!that.data.fromApp) {
        that.postStayTime()
      }
      clearInterval(that.data.timer);
      that.data.timer = setInterval(function () {
        that.postStayTime();
      }, app.globalData.stayTime);
    }
    this.setData({
      forwarding: false,
    })
    if (this.data.merchant_code && this.data.merchant_code != "") {
      this.getBusinessInfo();
      this.getSelledGoodsType();
    }

    var obj = wx.getLaunchOptionsSync();
    if (obj.scene == 1007 || obj.scene == 1008) {
      app.globalData.scene1089 = true;
      wx.setStorageSync("scene1089", true)
    }

    if (app.globalData.myMerchantInfo == "") {
      this.getLenderBusinessInfo()
    } else {
      this.judgeChannelDisplay()
    }
    if (wx.getStorageSync('user') && app.globalData.higherLevelCode) {
      this.saveShareInfo()
    }
    if (that.data.navbarInitTop == 0) {
      //获取吸顶节点距离顶部的距离
      wx.createSelectorQuery().select('#navbarflag1').boundingClientRect(function (rect) {
        if (rect && rect.top > 0) {
          var navbarInitTop = parseInt(rect.top);
          that.setData({
            navbarInitTop: navbarInitTop
          });
        }
      }).exec();
      wx.createSelectorQuery().select('#navbarflag2').boundingClientRect(function (rect) {
        if (rect && rect.top > 0) {
          var navbarInitTop2 = parseInt(rect.top);
          that.setData({
            navbarInitTop2: navbarInitTop2
          });
        }
      }).exec();
      this.getMediaInfoHeight()
    }
    // console.log('商家编码', this.data.merchant_code)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (app.globalData.scene1089) {
      wx.setStorageSync("scene1089", true)
    }
    clearInterval(this.data.timer);
    clearInterval(this.data.setInter);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.timer);
    clearInterval(this.data.setInter);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**浏览时长统计 */
  postStayTime() {
    if (!wx.getStorageSync('user')) {
      clearInterval(this.data.timer);
      return;
    }
    let tempDate = new Date()
    // console.log('浏览时长统计: ' + tempDate.getHours() + ":" + tempDate.getMinutes() + ":" + tempDate.getSeconds());
    http.post(
      app.globalData.host + "collect/pingMerchantView", {
        batchShare: app.globalData.batchShare,
        merchantCode: this.data.merchant_code,
        userId: wx.getStorageSync('user').id,
        scene: this.data.scene == "" ? "wxapp" + this.data.merchant_code : this.data.scene,
        sceneDT: this.data.sceneDT,
        visitor: wx.getStorageSync('visitor'), //游客标识
        stayTime: app.globalData.stayTime,
        h5Once: this.data.startTime,
        higherLevelCode: app.globalData.higherLevelCode ? app.globalData.higherLevelCode : '',
        clerkUserCode: this.data.clerk_code ? this.data.clerk_code : '',
        accessRoutes: app.globalData.accessRoutes,
        routesDescribe: app.globalData.routesDescribe,
        pageId: "pages/tabBar_index/business_homepage/business_homepage",
        pageDescribe: "商家主页",
        progress: this.data.progress > 100 ? 100 : this.data.progress,
      },
      (status, resultCode, message, data) => {
        let tempDate2 = new Date()
        // console.log('浏览时间统计成功：' + tempDate2.getHours() + ":" + tempDate2.getMinutes() + ":" + tempDate2.getSeconds());
      },
      (status, resultCode, _message, data) => {}
    )
  },

  swiperTransition(e) {},

  //滚动记录之前的滚动位置
  scroll: function (e) {
    var self = this;
    // setTimeout(function() {
    //     console.log(e.detail.scrollTop);
    //     var list = self.data.list;
    //     if (list[self.data.curListId]) {
    //         list[self.data.curListId].scrollTop = e.detail.scrollTop;
    //         self.setData({
    //             list
    //         })
    //     }
    // }, 300);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    if (this.data.merchantPageTemplate == "estate") {
      this.businessNews = this.selectComponent("#business_news")
      this.businessNews.loadMore()
    } else {
      if (this.data.tabType == 'goods') {
        if (!this.data.loadAll) {
          this.setData({
            pageIndex: this.data.pageIndex + 1,
            pageIndex_add: this.data.pageIndex_add + 1
          })
          this.getBusinessActivity();
        }
      } else {
        this.businessNews = this.selectComponent("#business_news")
        this.businessNews && this.businessNews.loadMore();
        that.getMediaInfoHeight();
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    let clerkCode = this.data.clerkState ? wx.getStorageSync('user').userCode : this.data.clerkCode;
    if (wx.getStorageSync('user')) {
      app.Shareacquisition(this.data.shareType, this.data.merchant_code, null, null, null, wx.getStorageSync('user').userCode, null, null)
    }
    if (this.data.isShareGoods) {
      this.shareAttendByReward()
      return {
        title: this.data.business_detail.title,
        path: "pages/tabBar_index/business_detail/business_detail?code=" + this.data.business_detail.code + (wx.getStorageSync('user') ? ("&higherLevelCode=" + wx.getStorageSync('user').userCode) : "") + "&clerk_code=" + clerkCode + '&batchShare=' + app.globalData.batchShare,
        imageUrl: this.data.goodsDefaultImg,
      }
    } else {
      console.log("我分享========================")
      console.log(this.data.merchant_code)
      this.setData({
        forwarding: true,
      })
      if (this.data.workerId) {
        this.addShares();
      }
      return {
        title: this.data.business_info.name,
        path: "pages/tabBar_index/business_homepage/business_homepage?merchantCode=" + this.data.merchant_code,
        // imageUrl: this.data.bgAlbumList[0],
      }
    }
  },


  /*
   *监听屏幕滚动 判断上下滚动
   */
  onPageScroll: function (ev) {
    let that = this;
    //计算tab动态吸顶高度
    wx.createSelectorQuery().select('#tabId').boundingClientRect(function (rect) {
      // console.log('滑动触发', rect, that.data.tabHeight);
      if (rect) {
        that.setData({
          tabHeight: rect.height
        })
      }
    }).exec();
    var scrollTop = parseInt(ev.scrollTop); //滚动条距离顶部高度
    if (this.data.merchantPageTemplate == "estate") {
      //判断'滚动条'滚动的距离 和 '元素在初始时'距顶部的距离进行判断
      var isSatisfy = scrollTop >= that.data.navbarInitTop ? true : false;
      //为了防止不停的setData, 这儿做了一个等式判断。 只有处于吸顶的临界值才会不相等
      let navbarCurrentIndex = 0
      if (scrollTop >= that.data.navbarInitTop2) {
        navbarCurrentIndex = 1
      }
      that.setData({
        navbarCurrentIndex: navbarCurrentIndex
      });

      if (that.data.isFixedTop === isSatisfy) {
        return false;
      }
      that.setData({
        isFixedTop: isSatisfy,
      });
    } else {
      var isSatisfy = scrollTop >= that.data.navbarInitTop + 440 ? true : false;
      //为了防止不停的setData, 这儿做了一个等式判断。 只有处于吸顶的临界值才会不相等
      if (that.data.isFixedTop === isSatisfy) {
        return false;
      } else {
        that.setData({
          isFixedTop: isSatisfy,
        });
      }

    }

    //计算页面深度用
    let scrollH = parseInt(ev.scrollTop); // 滚动高度
    let pageHeight = this.data.pageHeight;
    let clientH = this.data.winHeight; //屏幕高度
    let result = Math.round(scrollH / Math.abs(pageHeight - clientH) * 100); // 百分比
    this.setData({ //滚动条距离顶部高度
      progress: result
    })
    console.log(this.data.progress)
  },

  /**防止滑动冒泡 */
  doNotMove: function () {
    return false;
  },

  /**
   * 获取企业详情信息
   */
  getBusinessInfo: function () {
    console.log("获取企业详情信息")
    console.log(this.data.merchant_code)
    if (this.data.merchant_code == "") {
      return
    }
    http.get(
      app.globalData.host + "merchant/info", {
        merchantCode: this.data.merchant_code,
        higherLevelCode: app.globalData.higherLevelCode == "" ? undefined : app.globalData.higherLevelCode,
      },
      (_status, _resultCode, _message, data) => {
        wx.setStorageSync('business_homepage_cache_data' + this.data.merchant_code, data)
        data.dis = app.getDisance(data.merchant.lat, data.merchant.lng)
        //处理显示头像
        data.merchant["displayHeadImg"] = util.getMerchantHeadImg(data.merchant)
        this.setData({
          merchantUserCode: data.userCode,
          business_info: data.merchant,
          custom_imageUrl: data.merchant.bgUrls[0],
          merchantFavorites: data.merchant.isFavorites == 0 ? false : true,
          certified: data.merchant.certified == 1 ? true : false,
          isZk: data.merchant.merchantType == "mainStore" || data.merchant.merchantType == "branchStore" ? true : false,
          mainStoreCode: data.mainStoreCode && data.mainStoreCode != "" ? data.mainStoreCode : "",
        });
        this.getParentCount();
        this.getBusinessStatus()
        this.getGoodsType()
        wx.setNavigationBarTitle({
          title: this.data.business_info.name
        })
        if (data.merchant.phone && !this.data.phone_cover) {
          this.getBusinessPhone(data.merchant.phone);
        }

        if (this.data.business_info.status == 0) {
          this.setData({
            merchant_err: true
          });
        }
        this.checkUser()
        // 公共事务 tagCode = 190423106111
        if (data.merchant.tagCodeBig == ",official,") {
          this.setData({
            official: true,
          });
        }
        this.getAlbumList()

        //房地产判断
        if (data.merchant.template && data.merchant.template.templateCode == "estate") {
          this.getProductList()
          this.checkClerkApply()
          if (!this.data.loginTip) {
            this.getDatabank()
          }
          this.setData({
            merchantPageTemplate: data.merchant.template.templateCode,
            tabBarDisplay: false,
          })
        }
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /**获取旗下精英人数 */
  getParentCount() {
    if (!wx.getStorageSync('user')) {
      return;
    }
    http.get(
      app.globalData.host + 'biz/user/merchant/clerk/mine/countByParentUserIdAndCode', {
        merchantCode: this.data.merchant_code,
        userId: this.data.business_info.userId, //发展该共享合伙人的父级userId，没有就传商家的userId
      },
      (status, resultCode, message, data) => {
        // consoel.log('旗下合伙人=========', data);
        this.setData({
          parentCount: data
        });
      },
      (status, resultCode, message, data) => {
        console.log("获取旗下合伙人数量失败")
      }
    );
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
   * 展示企业号码列表
   */
  showBusinessPhoneList: function () {
    this.setData({
      show_business_phone: !this.data.show_business_phone
    });
  },

  /**
   * 联系企业
   */
  contactBusiness: function (e) {
    var business_phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: business_phone
    })
  },

  /**
   * 地图导航
   */
  mapNavigation: function () {
    var address = this.data.mapData;
    console.log(address)
    var lat = this.data.business_info.lat;
    lat: 22.766768
    var lng = this.data.business_info.lng;
    lng: 108.37312

    //非房地产商家主页地址导航
    if (lat && lng && address.latitude == '0' && address.longitude == '0') {

      wx.openLocation({
        latitude: lat,
        longitude: lng,
        name: this.data.business_info.addr,
        address: this.data.business_info.addr
      })
    }
    //房地产商家主页地址导航
    else if (address) {
      wx.openLocation({
        latitude: Number(address.latitude),
        longitude: Number(address.longitude),
        name: this.data.productInfo.address,
        address: this.data.productInfo.address,
      })
    } else {
      wx.showToast({
        title: '企业未设置定位',
        icon: "none"
      })
    }
  },


  /**
   *房地产迭代(需要雷达采集)
   */
  onEstateClick: function (e) {
    let type = e.currentTarget.dataset.type;
    console.log(type)
    if (type == '项目区位') {
      if (this.data.productList.length > 0) {
        this.mapNavigation()
      } else {
        wx.showToast({
          title: '暂无地址',
        })
      }
    } else if (type == '户型展示') {
      if (this.data.productList.length > 0) {
        wx.navigateTo({
          url: '/estatePackage/pages/news/news?merchantCode=' + this.data.merchant_code + '&eventCode=' + this.data.productInfo.goodsCode + '&clerkCode=' + this.data.clerk_code + '&newsType=1&sceneType=merchant' + this.data.merchant_code + '&sceneDT=' + this.data.merchant_code,
        })
      } else {
        wx.showToast({
          title: '暂无户型',
        })
      }

    } else if (type == '联系我们') {
      this.showBusinessPhoneList()
    } else {
      wx.navigateTo({
        url: '/estatePackage/pages/news/news?merchantCode=' + this.data.merchant_code + '&newsType=' + type + '&sceneType=merchant' + this.data.merchant_code + '&sceneDT=' + this.data.merchant_code
      })

    }
  },
  /** 处理tab切换 */
  handlerTabTap: function (e) {
    let that = this;
    let tabType = e.currentTarget.dataset.type;
    this.setData({
      tabType: tabType,
    })
    that.tab_menu(e.currentTarget.dataset.index);
  },
  /**
   * 切换详情，动态，接龙
   */
  tab_menu: function (page) {
    let {
      swipe_config
    } = this.data;
    this.setData({
      switch_index: page,
      swipe_config: swipe_config,
    });
    if (!this.data.screening_top) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
    this.getMediaInfoHeight()
  },
  /** 切换 */
  swiperChange(e) {
    let type = e.currentTarget.dataset.type
    if (type == 'goods') {
      this.setData({
        tabType: 'news'
      });
    }
    if (type == 'news') {
      this.setData({
        tabType: 'goods'
      });
    }

    if (e.detail.source == 'touch') {
      this.tab_menu(e.detail.current);
    }
  },
  //图片点击事件查看大图
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list

    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList, // 需要预览的图片http链接列表
    })
  },

  //跳转货源
  toChannelGoodsList() {
    console.log('toChannelGoodsList')
    wx.navigateTo({
      url: '/pages/tabBar_user_center/channel/goodsList/goodsList?merchantCode=' + this.data.merchant_code
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
   * 增加访问量
   */
  addIncreaseAccess: function (viewValue) {
    http.post(
      app.globalData.host + "/biz/user/merchant/hot", {
        merchantCode: this.data.merchant_code,
        viewValue: viewValue ? viewValue : undefined
      },
      (_status, _resultCode, _message, _data) => {

      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 用户点击屏幕
   */
  handlerPageTap: function (_e) {
    let {
      slide_menu
    } = this.data;
    if (slide_menu.offsetRght != 0) {
      slide_menu.offsetRght = 0;
      this.setData({
        slide_menu: slide_menu,
        hidden_video: false
      })
    } else {
      slide_menu.offsetRght = this.windowWidth * 1;
      this.setData({
        slide_menu: slide_menu,
        hidden_video: true
      })
    }
    this.homepage_button.setData({
      slide_menu: slide_menu
    });
  },


  /**
   * 获取职员信息 clerk/info
   */
  getWorkerInfo: function (workerId) {
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/info", {
        id: workerId
      },
      (_status, _resultCode, _message, data) => {
        if (data == null || data == -1) {
          return
        }
        this.setData({
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
          shares: data.shares,
          hot: data.hot
        });
        if (this.data.phone_cover) {
          this.getBusinessPhone(data.phone);
        }
        this.addHot();
        this.getRecordsByClerkId();
        this.homepage_button.setData({
          card_headimg: data.headimg,
          business_info: this.data.business_info
        });
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading();
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
   * 复制信息
   */
  setCopyText: function (e) {
    if (e.currentTarget.dataset.text) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.text,
        success(_res) {
          wx.showToast({
            title: '复制成功',
            icon: "none"
          })
          wx.getClipboardData({
            success(_res) {

            }
          })
        }
      })
    }
  },

  /***
   * 禁止打电话
   */
  forbidPhone: function () {
    wx.showToast({
      title: '企业设置了隐私保护',
      icon: "none"
    })
    return
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
   * 关闭发送
   */
  closeSendMessage: function () {
    this.setData({
      hidden_send_message: !this.data.hidden_send_message
    });
  },

  /**
   * 显示textarea
   */
  showTextareaEdit: function (_e) {
    this.setData({
      showTextareaEdit: true
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

  /** 检查用户状态 */
  checkUser: function () {
    let isMerchant = false
    let isLogin = false
    let isCheckIn = false
    if (wx.getStorageSync('user')) {
      isLogin = true
      if (this.data.business_info.userId == wx.getStorageSync('user').id) {
        isMerchant = true
      }
    }
    this.setData({
      isMerchant: isMerchant,
      isLogin: isLogin,
      isCheckIn: isCheckIn,
    })
  },

  /** 前往升级渠道商 */
  goToChannel: function () {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/channel/upgradeChannel/upgradeChannel',
    })
  },

  /** 查看货源 */
  goToChannelGoodsDetail: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/channel/goodsDetail/goodsDetail?code=' + e.currentTarget.dataset.item.code,
    })
  },

  /** 前往招聘详情 */
  goToRecruitDetail: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_index/recruit/detail/recruit_detail?id=' + e.currentTarget.dataset.item.id,
    })
  },

  /**
   * 获取当前登录人的上企业信息
   */
  getLenderBusinessInfo: function () {
    if (!wx.getStorageSync('user')) {
      return
    }
    http.get(
      app.globalData.host + "biz/user/merchant/info", {
        userId: wx.getStorageSync('user').id
      },
      (_status, _resultCode, _message, data) => {
        app.globalData.myMerchantInfo = data;
        wx.setStorageSync("myMerchantInfo", app.globalData.myMerchantInfo);
        this.judgeChannelDisplay()
        this.checkUser()
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading({
          title: "获取登录人企业信息失败"
        })
      }
    );
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
      (_status, _resultCode, _message, _data) => {

      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

  /** 获取商家相册 */
  getAlbumList: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    http.get(
      app.globalData.host + "/biz/user/merchant/album/list", {
        merchantCode: this.data.merchant_code,
        type: "bg",
      },
      (_status, _resultCode, _message, _data) => {
        let bgAlbumList = [];
        if (_data.length > 0 && _data[0].fileUrls && _data[0].fileUrls.length > 0) {
          for (let i in _data[0].fileUrls) {
            bgAlbumList.push(_data[0].fileUrls[i]);
          }
        }
        this.setData({
          bgAlbumList: bgAlbumList,
        })
        wx.hideLoading()
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /** 获取产品分类 */
  getGoodsType: function () {
    let typeCodes = JSON.stringify([
      "original",
      "universalRebate",
    ])
    http.get(
      app.globalData.business_host + "eventType/getEventTypes", {
        storeCode: this.data.merchant_code,
        countEvent: 0,
        statuses: JSON.stringify(["1"]),
        typeCodes: typeCodes,
        excludeEmpty: 1,
        productStatuses: JSON.stringify(["1"]),
      },
      (_status, _resultCode, _message, _data) => {
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
    console.log("点击商品分类")
    console.log(e.currentTarget.dataset)
    this.setData({
      goodsTagSelectedIndex: e.currentTarget.dataset.index,
      goodsCategoryCode: e.currentTarget.dataset.item.code,
    })
    this.getBusinessActivity()
  },

  /** 前往商品分类页 */
  goToGoodsCategory: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_activity/goods_category/goods_category?merchantCode=' + this.data.merchant_code + "&categoryTypeIndex=" + e.currentTarget.dataset.index + "&userRole=" + this.data.userRole,
    })
  },

  /** 申请名片 */
  applyCard: function () {
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.navigateTo({
          url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply?merchantCode=' + that.data.merchant_code + "&noInviteRock=true",
        })
      }
    })
  },

  /** 选择商品排序 */
  changeGoodsSort: function (e) {
    let index = e.currentTarget.dataset.index
    let sortTypeCode = index == 3 ? "price" : index == 4 ? "hot" : ""
    this.setData({
      goodsTypeSelectedIndex: index,
      priceSortAsc: index == 3 ? !this.data.priceSortAsc : this.data.priceSortAsc,
      activityTypeHidden: index == 2 ? false : true,
      sortTypeCode: sortTypeCode,
      typeCodes: index == 1 ? undefined : this.data.typeCodes,
      activityTypeText: index == 1 ? "玩法选择" : this.data.activityTypeText,
    })
    if (index != 2) {
      this.reRoad()
    }
  },

  /** 点击玩法选择 */
  clickActivityType: function (e) {
    this.setData({
      activityTypeText: e.currentTarget.dataset.item.name == "全部玩法" ? "玩法选择" : e.currentTarget.dataset.item.name,
      activityTypeText_simply: e.currentTarget.dataset.item.name,
      activityTypeHidden: true,
      selectCheckInType: false,
      typeCodes: e.currentTarget.dataset.item.code != "" ? e.currentTarget.dataset.item.code : undefined,
    })
    this.getBusinessActivity()
  },

  /** 关闭玩法选择 */
  closeActivityTypeContent: function () {
    this.setData({
      activityTypeHidden: true,
    })
  },

  /**
   * 重新加载
   */
  reRoad: function () {

  },

  /** 点击商品类型 */
  clickGoodsType: function (e) {
    this.setData({
      goodsTypeSelectedIndex_simply: e.currentTarget.dataset.index,
      goodsTypeCode: e.currentTarget.dataset.item.typeCode,
    })
    this.getBusinessActivity()
  },

  /** 获取在售商品类型 */
  getSelledGoodsType: function () {
    http.get(
      app.globalData.business_host + "fastevent/storeHomePageTypeCodes", {
        storeCode: this.data.merchant_code,
      },
      (status, resultCode, message, data) => {
        let goodsTypess = [{
          typeCodeName: "全部",
          typeCode: ""
        }]
        goodsTypess = goodsTypess.concat(data)
        this.setData({
          goodsTypeList: goodsTypess,
        })
      },
      (status, resultCode, message, data) => {}
    );
  },

  /** 选择商品排序 */
  changeGoodsSort_simply: function (e) {
    let index = e.currentTarget.dataset.index
    let sortTypeCode = index == 2 ? "hot" : index == 3 ? "price" : ""
    this.setData({
      goodsSortSelectedIndex: index,
      hotSortAsc: index == 2 ? !this.data.hotSortAsc : this.data.hotSortAsc,
      priceSortAsc: index == 3 ? !this.data.priceSortAsc : this.data.priceSortAsc,
      activityTypeHidden: index == 1 ? false : true,
      sortTypeCode: sortTypeCode,
      typeCodes: index == 1 ? undefined : this.data.typeCodes,
    })
    if (index == 2 || index == 3) {
      this.getBusinessActivity()
    }
  },

  changeGoodsSort_simply2: function (e) {
    // wx.pageScrollTo({
    //   scrollTop: this.data.prePadingTop,
    // });
    // this.setData({
    //   screening_top: false,
    // })
    this.setData({
      selectCheckInType: true,
    })
    // this.changeGoodsSort_simply(e)
  },

  /**
   * 获取企业活动
   */
  getBusinessActivity: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    let typeCodes = JSON.stringify([
      "original",
      "universalRebate",
    ])
    if (this.data.typeCodes) {
      typeCodes = JSON.stringify([this.data.typeCodes])
    }

    let sortOrder = undefined
    if (this.data.sortTypeCode == "hot") {
      sortOrder = "desc"
      if (this.data.hotSortAsc) {
        sortOrder = "asc"
      }
    }

    if (this.data.sortTypeCode == "price") {
      sortOrder = "desc"
      if (this.data.priceSortAsc) {
        sortOrder = "asc"
      }
    }
    http.get(
      app.globalData.business_host + "fastevent/storeHomePage", {
        pageIndex: this.data.pageIndex,
        pageLimit: 10,
        locationCityId: app.globalData.locationCityId ? app.globalData.locationCityId : 1,
        lng: app.globalData.current_lng,
        lat: app.globalData.current_lat,
        storeCode: this.data.merchant_code,
        categoryCode: this.data.goodsCategoryCode ? this.data.goodsCategoryCode : undefined,
        statuses: JSON.stringify(["1"]),
        productTypeCode: this.data.goodsTypeCode == "" ? undefined : this.data.goodsTypeCode,
        typeCodes: typeCodes,
        sortType: this.data.sortTypeCode != "" ? this.data.sortTypeCode : 'customize',
        sortOrder: 'asc',
      },
      (status, resultCode, message, data) => {
        if (data.list.length < 1) {
          this.setData({
            loadAll: true,
          })
          wx.hideLoading();
        }
        this.setData({
          business_activity_list_new: data.list
        });
        if (data.list.length > 0) {
          this.handlerData()
        }
        if (this.data.prePadingTop == 0) {
          this.getTop()
        }
        //判断显示切页
        // let tabType = '1'
        if (this.data.business_activity_list.length < 1 || this.data.fromClerkShow == true) {
          this.setData({
            tabType: 'news',
          })
        }
        this.setData({
          noActivity: this.data.business_activity_list.length == 0 ? true : false,
          // tabType: '',
        })
        this.getMediaInfoHeight()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    )
  },

  /**
   * 处理数据
   */
  handlerData: function () {
    for (let i = 0; i < this.data.business_activity_list_new.length; i++) {
      let list = this.data.business_activity_list_new[i];
      let obj = {};
      if (list.fileJson && list.fileJson != "{}") {
        obj.pic = JSON.parse(list.fileJson).illustration ? JSON.parse(list.fileJson).illustration[0] : ""
      }
      if (obj.pic) {
        obj.type = util.getUrlType(obj.pic)
      }
      this.data.business_activity_list_new[i].illustration = obj.pic;
      this.data.business_activity_list_new[i].videoType = obj.type;
      this.data.business_activity_list_new[i].minPrice = util.priceSwitch(this.data.business_activity_list_new[i].minPrice);
      this.data.business_activity_list_new[i].dis = app.getDisance(this.data.business_activity_list_new[i].merchant.lat, this.data.business_activity_list_new[i].merchant.lng);
    }
    this.setData({
      loadingCount: this.data.business_activity_list.length,
      ['business_activity_list[' + this.data.pageIndex_add + ']']: this.data.business_activity_list_new
    });
    wx.hideLoading();
  },


  /** 获取主页需要贴顶距离 */
  getTop: function () {
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
  },

  /** 拨打电话 */
  callUp: function () {
    this.setData({
      show_business_phone: false,
    })
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
        wx.showLoading({
          title: '处理中...',
        })
        http.post(
          app.globalData.host + url, {
            contentCode: that.data.merchant_code,
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
          (_status, _resultCode, _message, _data) => {
            wx.hideLoading()
          }
        )
      }
    })
  },

  /** 点击加入购物车 */
  clickAddCart: function (e) {
    let item = e.currentTarget.dataset.item
    this.setData({
      eventCode: item.code,
      goodsDefaultImg: item.illustration,
      choose_skuProperties: "",
    })
    this.getBusinessDetail()
  },

  /** 显示购物车选项 */
  showCart: function () {
    this.setData({
      cartDisplay: !this.data.cartDisplay,
      isShareGoods: !this.data.isShareGoods,
    })
  },

  /**
   * 排列组合sku
   */
  arrangeSku: function () {
    let array = this.data.chooseSkus;
    let resData = [];
    let len = array.length;
    if (len == 1) {
      resData.push(array[0])
    }
    if (len == 2) {
      resData.push(array[0] + '&' + array[1]);
      resData.push(array[1] + '&' + array[0]);
    }
    if (len == 3) {
      resData.push(array[0] + '&' + array[1] + '&' + array[2]);
      resData.push(array[1] + '&' + array[0] + '&' + array[2]);
      resData.push(array[2] + "&" + array[0] + '&' + array[1]);
      resData.push(array[2] + "&" + array[1] + '&' + array[0]);
      resData.push(array[0] + "&" + array[2] + '&' + array[1]);
      resData.push(array[1] + "&" + array[2] + '&' + array[0]);
    }
    return resData;
  },


  /**
   * 选中后匹配sku
   */
  matchingSku: function () {
    let key = this.arrangeSku();
    let skus = this.data.skus;
    for (var i = 0; i < skus.length; i++) {
      for (let j = 0; j < key.length; j++) {
        if (key[j] == skus[i].properties) {
          this.setData({
            sku_priceYuan: skus[i].priceYuan,
            sku_url: skus[i].url,
            sku_stock: skus[i].stock,
            sku_weight: skus[i].weight,
            damagePriceYuan: skus[i].damagePriceYuan ? skus[i].damagePriceYuan : 0,
            choose_skuProperties: key[j],
          });

          let array = key[j].split("&");
          let str1 = array[0].split("=")
          let str2 = "";
          if (array.length > 1) {
            str2 = array[1].split("=")
          }
          this.setData({
            selected_text: str2.length > 1 ? str1[1] + "-" + str2[1] : str1[1]
          })
          if (this.data.eventProducts[i] && key[j] == this.data.eventProducts[i].skuProperties) {
            this.setData({
              ["business_detail.discountPrice"]: this.data.eventProducts[i].discountPrice
            });
          }
          this.operatePrice();
          return
        }
      }
    }
  },

  /**
   * 获取sku规格
   */
  getSpecList: function (productCode) {
    http.get(
      app.globalData.business_host + '/product/specList', {
        productCode: productCode
      },
      (status, resultCode, message, data) => {
        this.setData({
          specList: this.handlerSkuData(data)
        });
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
      }
    );
  },

  /**处理sku数据
   * 
   */
  handlerSkuData: function (data) {
    let data_productSpecs = {};
    let selected_skuValue = ""
    let chooseSkus = []
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].productSpecs.length; j++) {
          data_productSpecs = data[i].productSpecs[j];
          data_productSpecs.key = i;
          data_productSpecs.lock = (j == 0) ? 1 : 0;
          data[i].productSpecs[j] = data_productSpecs;
          if (j == 0) {
            chooseSkus.push(data[i].productSpecs[j].specCode + "=" + data[i].productSpecs[j].value);
            selected_skuValue = selected_skuValue + " " + data[i].productSpecs[j].value
          }
        }
      }
    }
    this.setData({
      chooseSkus: chooseSkus,
    });
    this.matchingSku();
    return data;
  },

  /**
   * 获取活动商品详情
   */
  getBusinessDetail: function () {
    http.get(
      app.globalData.business_host + "event/info", {
        eventCode: this.data.eventCode
      },
      (status, resultCode, message, data) => {
        this.setData({
          business_detail: this.handleBusinessDetail(data),
          couponIdList: [],
          couponList: [],
        });
        this.getSkuEventProducts()
        this.getDefaultAaddr()
        this.showCart()
        this.getCouponList()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 处理取出来的互动详情
   */
  handleBusinessDetail: function (obj) {
    //补全库存与重量
    let onshelfSkus = obj.onshelf.onshelfSkus
    for (let i in onshelfSkus) {
      let onshelfSkuObj = onshelfSkus[i]
      for (let j in obj.product.skus) {
        if (onshelfSkuObj.properties == obj.product.skus[j].properties) {
          onshelfSkuObj["stock"] = obj.product.skus[j].stock
          onshelfSkuObj["weight"] = obj.product.skus[j].weight
          onshelfSkuObj["damagePriceYuan"] = obj.product.skus[j].damagePriceYuan
        }
      }
    }
    this.setData({
      productCode: obj.productCode,
      skus: onshelfSkus,
      sku_priceYuan: obj.onshelf.onshelfSkus[0].priceYuan,
      sku_url: obj.onshelf.onshelfSkus[0].url,
      sku_stock: obj.product.skus[0].stock ? obj.product.skus[0].stock : "",
      sku_weight: obj.product.skus[0].weight ? obj.product.skus[0].weight : 1,
      product_activityType: obj.product.typeCode,
      damagePriceYuan: obj.product.skus[0].damagePriceYuan ? obj.product.skus[0].damagePriceYuan : "",
      endtime_display: util.tsFormatTime(obj.onshelf.endTime, "Y-M-D h:m:s"),
    });
    let array = obj.onshelf.onshelfSkus;
    let arrayLength = obj.onshelf.onshelfSkus.length;
    array.sort(function (a, b) {
      return a.price - b.price
    })
    this.setData({
      minPrice: obj.onshelf.onshelfSkus[0].priceYuan,
      maxPrice: obj.onshelf.onshelfSkus[arrayLength - 1].priceYuan,
    });
    if (!this.data.choose_skuProperties) {
      this.getSpecList(obj.productCode);
    } else {
      this.matchingSku();
    }
    app.globalData.goodsDetail = obj.product
    return obj
  },

  /** 减少数量 */
  delQuantity: function () {
    let num = this.data.quantity
    if (num > 1) {
      num = num - 1
    }
    this.setData({
      quantity: num,
    })
    this.operatePrice()
  },

  /** 增加数量 */
  addQuantity: function () {
    let num = this.data.quantity
    if (num < this.data.business_detail.product.stock) {
      num = num + 1
    }
    this.setData({
      quantity: num,
    })
    this.operatePrice()
  },

  /**
   * 获取sku对应的优惠
   */
  getSkuEventProducts: function () {
    //eventProducts
    if (this.data.business_detail.typeCode == "original") {
      this.setData({
        eventProducts: this.data.business_detail.originalEventProducts
      });
    } else if (this.data.business_detail.typeCode == "reward") {
      this.setData({
        eventProducts: this.data.business_detail.rewardEventProducts
      });
    } else if (this.data.business_detail.typeCode == "discount") {
      this.setData({
        eventProducts: this.data.business_detail.discountEventProducts
      });
    } else if (this.data.business_detail.typeCode == "inreward") {
      this.setData({
        eventProducts: this.data.business_detail.inRewardEventProduct
      });
    } else if (this.data.business_detail.typeCode == "universalRebate") {
      this.setData({
        eventProducts: this.data.business_detail.rebateEventProducts
      });
    }
    this.searcrShareDiscount()
  },

  /** 搜索分享优惠 */
  searcrShareDiscount: function () {
    let shareDiscount = false
    let shareDiscountPrice = 0
    for (let i in this.data.eventProducts) {
      let product = this.data.eventProducts[i]
      if (product.discountPrice != 0) {
        shareDiscount = true
        shareDiscountPrice = util.priceSwitch(product.discountPrice)
        break
      }
    }
    this.setData({
      shareDiscount: shareDiscount,
      shareDiscountPrice: shareDiscountPrice,
    })
  },

  /** 运算价格 */
  operatePrice: function () {
    let dataObj = this.data.business_detail
    let discountPrice = 0
    dataObj["spzj"] = (this.data.sku_priceYuan * this.data.quantity).toFixed(2)
    let damagePriceTotal = (this.data.damagePriceYuan * this.data.quantity).toFixed(2)
    this.setData({
      business_detail: dataObj,
      damagePriceTotal: damagePriceTotal,
    })
  },

  /**
   * 选择sku动态改变图片或者价格
   */
  chooseSkus: function (e) {
    let key = e.currentTarget.dataset.key;
    let choose = e.currentTarget.dataset.id;
    let speccode = e.currentTarget.dataset.speccode;
    let value = e.currentTarget.dataset.value;
    let lock = e.currentTarget.dataset.lock;
    // if (lock == 2) {
    //   return
    // }
    let length = this.data.specList.length;
    for (var i = 0; i < this.data.specList[key].productSpecs.length; i++) {
      let productSpecs = this.data.specList[key].productSpecs;
      if (length > 1) {
        for (var j = 0; j < productSpecs.length; j++) {
          if (lock == 1) { //取消选择
            this.data.specList[key].productSpecs[j].lock = 0;
            this.data.chooseSkus[key] = {};
          } else { //选择
            if (productSpecs[j].id != choose) {
              // this.data.specList[key].productSpecs[j].lock = 2;
              this.data.specList[key].productSpecs[j].lock = 0;
            } else {
              this.data.specList[key].productSpecs[j].lock = 1;
            }
            this.data.chooseSkus[key] = speccode + "=" + value;
          }
        }
      } else {
        for (var j = 0; j < productSpecs.length; j++) {
          if (lock == 1) { //取消选择
            // this.data.specList[key].productSpecs[j].lock = 0;
            // this.data.chooseSkus[key] = {};
          } else { //选择
            if (productSpecs[j].id != choose) {
              this.data.specList[key].productSpecs[j].lock = 0;
            } else {
              this.data.specList[key].productSpecs[j].lock = 1;
            }
            this.data.chooseSkus[key] = speccode + "=" + value;
          }
        }
      }
    }

    this.setData({
      ['specList[' + key + '].productSpecs']: this.data.specList[key].productSpecs,
    });
    this.matchingSku();
  },


  /** 插入购物车 */
  joinCart: function () {
    let name = ""
    let phone = ""
    let addr = "";
    let provinceCode = "";
    let provinceName = "";
    let cityCode = "";
    let cityName = "";
    let areaCode = "";
    let areaName = "";
    if (this.data.order_addr) {
      name = this.data.order_addr.name
      phone = this.data.order_addr.phone
      addr = this.data.order_addr.addrdetail
      provinceCode = this.data.order_addr.provinceCode
      provinceName = this.data.order_addr.provinceName
      cityCode = this.data.order_addr.cityCode
      cityName = this.data.order_addr.cityName
      areaCode = this.data.order_addr.areaCode
      areaName = this.data.order_addr.areaName
    }
    http.post(
      app.globalData.business_host + "cart/newCart", {
        eventCode: this.data.eventCode,
        skuProperties: this.data.choose_skuProperties,
        onshelfCode: this.data.business_detail.onshelfCode,
        num: this.data.quantity,
        provinceCode: provinceCode,
        provinceName: provinceName,
        cityCode: cityCode,
        cityName: cityName,
        areaCode: areaCode,
        areaName: areaName,
        address: addr,
        phone: phone,
        linkman: name,
        refUserCode: this.data.activityType == "inreward" ? this.data.clerkCode : app.globalData.higherLevelCode,
      },
      (status, resultCode, message, data) => {
        this.showCart()
      },
      (status, resultCode, message, data) => {}
    );
  },

  /**
   * 获取用户默认的收货地址 /customeraddress/default
   */
  getDefaultAaddr: function () {
    if (this.data.order_addr != "") {
      return
    }
    //到店产品
    if (this.data.business_detail.product.typeCode == "service" || (this.data.business_detail.product.typeCode == "logistics" && this.data.business_detail.addressType == "merchant")) {
      let obj = {};
      obj.addrdetail = this.data.business_detail.merchant.addr
      obj.name = this.data.business_detail.merchant.userName
      obj.phone = this.data.business_detail.merchant.userPhone
      obj.provinceCode = this.data.business_detail.provinceCode
      obj.provinceName = this.data.business_detail.provinceName
      obj.cityCode = this.data.business_detail.cityCode
      obj.cityName = this.data.business_detail.cityName
      obj.areaCode = this.data.business_detail.areaCode
      obj.areaName = this.data.business_detail.areaName
      this.setData({
        serviceAddr: obj,
        order_addr: obj,
      });
      wx.hideLoading()
    } else {
      http.get(
        app.globalData.business_host + "customeraddress/default", {},
        (status, resultCode, message, data) => {
          if (data) {
            let obj = data;
            obj.addrdetail = data.provinceName + data.cityName + data.areaName + data.address;
            obj.name = data.linkman;
            obj.phone = data.phone;
            app.globalData.userHarvestAddress = obj;
            this.setData({
              order_addr: app.globalData.userHarvestAddress,
              targetAddr: app.globalData.userHarvestAddress.cityName,
            });
            //虚拟、定金商品设置用户名与电话 start
            if (this.data.business_detail.product.typeCode == "virtual" || this.data.business_detail.product.typeCode == "deposit") {
              let phoneStr = ""
              if (data.phone != null && data.phone != "") {
                phoneStr = data.phone
              }
              if (phoneStr == "") {
                phoneStr = wx.getStorageSync('user').phone
              }
              this.setData({
                name: data.linkman != null && data.linkman != '' ? data.linkman : "",
                phone: phoneStr,
              })
            }
            //虚拟、定金商品设置用户名与电话 end
          }
          wx.hideLoading()
        },
        (status, resultCode, message, data) => {
          wx.hideLoading()
        }
      );
    }
  },

  /** 显示选择入驻类型 */
  selectCheckInType: function () {
    this.setData({
      selectCheckInType: !this.data.selectCheckInType,
    })
  },

  /**
   * 判断是不是共享合伙人
   */
  checkUserClerk: function () {
    // if (!wx.getStorageSync('user')) {
    //   return false
    // }
    http.get(
      app.globalData.host + "biz/user/merchant/clerk/status", {
        merchantCode: this.data.merchant_code,
        userId: wx.getStorageSync('user').id,
      },
      (_status, _resultCode, _message, data) => {
        // console.log(data)
        this.setData({
          userRole: data
        });
        if (data == 0 || data == 1) {
          this.setData({
            clerkState: true,
            liveClerkCode: wx.getStorageSync('user').userCode
          });
        }
      },
      (_status, _resultCode, _message, data) => {
        // this.$toast.center(message);
      }
    );
  },

  /**
   * 分享后参加互动
   */
  shareAttendByReward: function () {
    let funName = ""
    if (this.data.business_detail.typeCode == "discount") {
      funName = "discountevent/attend"
    } else if (this.data.business_detail.typeCode == "reward") {
      funName = "rewardevent/attend"
    } else if (this.data.business_detail.typeCode == "inreward") {
      funName = "internalrewardevent/attend"
    } else if (this.data.business_detail.typeCode == "original") {
      funName = "originalevent/attend"
    } else if (this.data.business_detail.typeCode == "universalRebate") {
      funName = "rebateevent/attend"
    }
    http.post(
      app.globalData.business_host + funName, {
        eventCode: this.data.business_detail.code
      },
      (status, resultCode, message, data) => {
        this.setData({
          isShare: true,
        });
        this.getCouponList();
      },
      (status, resultCode, message, data) => {
        if (resultCode == "duplicate_error") {}
        if (resultCode == "repeated_error") {
          wx.showModal({
            title: message,
            content: '',
          })
        }
      }
    );
  },

  /**
   * 获取优惠券
   */
  getCouponList: function () {
    http.get(
      app.globalData.business_host + "coupon/myCouponList", {
        onshelfCode: this.data.business_detail.onshelfCode,
        skuProperties: this.data.choose_skuProperties,
      },
      (status, resultCode, message, data) => {
        this.setData({
          couponList: data,
          couponIdList: this.handleCouponList(data)
        });
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 处理优惠券列表
   */
  handleCouponList: function (array) {
    let obj = [];
    for (let i = 0; i < array.length; i++) {
      obj = obj.concat(array[i].id)
    }
    return obj;
  },

  /**
   * 跳转到直播间(需要雷达采集)
   */
  goLivePage: function () {
    let merchantCode = this.data.merchant_code;
    wx.navigateTo({
      url: "/livePackage/pages/live/live?merchantCode=" + merchantCode + '&higherLevelCode=' + app.globalData.higherLevelCode + (this.data.liveClerkCode ? ('&clerk_code=' + this.data.liveClerkCode) : ('&clerk_code=' + this.data.merchantUserCode)) + '&sceneType=merchant' + merchantCode + '&sceneDT=' + merchantCode,
    })
  },

  /** 查看货源 */
  goToChannelGoods: function () {
    if (wx.getStorageSync("myMerchantInfo") || app.globalData.myMerchantInfo != "") {
      wx.navigateTo({
        url: '/pages/tabBar_user_center/channel/goodsList/goodsList?merchantCode=' + this.data.merchant_code,
      })
    } else {
      wx.showModal({
        confirmColor: '#2F95FB',
        confirmText: '确定',
        content: '您未完成企业入驻，无权查看此页面!请前往“掌创人生”APP完成企业入驻',
        showCancel: false,
        title: '温馨提示',
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    }
  },

  //获取房产项目
  getProductList: function () {
    let that = this;
    http.get(
      app.globalData.business_host + "estate/list", {
        index: 1,
        limit: 10,
        storeCode: this.data.merchant_code,
      },
      (_status, _resultCode, _message, data) => {
        // console.log('productList==============================', data);
        that.handlerActivitiList(data.list);
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },
  //封装数据
  handlerActivitiList: function (data) {
    console.log('商品列表==========', data);
    let productList = [];
    let productInfo = {};
    let mapData = {};
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let info = item.orderRealEstateAttach;
      let obj = {};
      obj.pic = JSON.parse(item.fileJson).illustration[0];
      if (obj.pic) {
        obj.type = util.getUrlType(JSON.parse(item.fileJson).illustration[0]);
      }
      obj.title = info.title;
      obj.code = info.code;
      obj.id = data[i].id;
      obj.infoType = '暂无数据'
      if (info.type != null && info.type != '') {
        obj.infoType = info.type;
      }
      obj.buildingArea = '暂无数据'
      if (info.buildingArea != null && info.buildingArea != '') {
        obj.buildingArea = info.buildingArea;
      }
      obj.unitDesc = '暂无数据'
      if (info.unitDesc != null && info.unitDesc != '') {
        obj.unitDesc = info.unitDesc;
      }
      obj.estateStatus = info.estateStatus;
      obj.price = info.price;
      obj.sellingPriceType = this.data.estateSellingPriceTypeMap[info.sellingPriceType + ""];
      obj.lng = info.lng;
      obj.lat = info.lat;
      obj.estateExpand = info.estateExpandModules[0] ? info.estateExpandModules[0].entry : "";
      obj.address = info.address;
      obj.mapTags = info.estateSurroundingInfos[0] ? info.estateSurroundingInfos[0].title : "";
      obj.goodsCode = item.code;
      obj.activityType = item.typeCode
      if (i == 0) {
        productInfo = obj;
        mapData = {
          latitude: obj.lat,
          longitude: obj.lng,
          title: obj.title
        }
      }
      productList.push(obj);
    }
    this.setData({
      productList: productList,
      productInfo: productInfo,
      mapData: mapData
    });
  },


  //获取周边列表
  getProjectNearbyList(e) {
    let nearbyList = e.detail
    for (let index in nearbyList) {
      nearbyList[index].addressArr = nearbyList[index].address.split(',');
    }
    this.setData({
      projectNearbyList: nearbyList
    })
  },

  //项目周边tab时调用
  projectNearbyTabTitleClick: function (e) {
    this.setData({
      projectNearbyCurrentIndex: e.currentTarget.dataset.idx,
      projectNearbyKeyword: e.currentTarget.dataset.keyword
    })
  },

  /** 跳转商品详情页(需要雷达采集) */
  toDetail: function () {
    if (this.data.productInfo && this.data.productInfo.goodsCode) {
      wx.navigateTo({
        url: "/pages/tabBar_index/business_detail/business_detail?code=" + this.data.productInfo.goodsCode + '&higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=merchant' + this.data.merchant_code + '&sceneDT=' + this.data.merchant_code + "&activityType=" + this.data.productInfo.activityType + '&clerk_code=' + this.data.clerkCode,
      })
    }
  },

  //跳转更多项目
  toMoreProject() {
    wx.navigateTo({
      url: '/estatePackage/pages/moreProject/moreProject?merchantCode=' + this.data.merchant_code
    })
  },

  /**
   * 返回分类页
   */
  backGoodsPage: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_goods/business_goods',
    })
  },

  /** 获取资料库 */
  getDatabank: function () {
    http.get(
      app.globalData.host + "biz/user/folder/get/files/by/fileStatus/new", {
        index: 1,
        limit: 3,
        userId: this.data.business_info.userId,
        fileStatus: 1,
      },
      (_status, _resultCode, _message, data) => {
        if (data.list.length > 0) {
          this.handlerDatabankList(data.list)
        } else {
          wx.hideLoading()
        }
      },
      (_status, _resultCode, _message, _data) => {
        this.setData({
          loginTip: true,
        })
        wx.hideLoading()
      }
    );
  },


  /** 处理资料库列表 */
  handlerDatabankList: function (list) {
    console.log('资料库列表==========', list);
    for (let i in list) {
      let item = list[i]
      let fileType = item.suffix
      let fileTypeIcon = ""
      let isLocation = false
      if (item.lat && item.lat != "" && item.lng && item.lng != "") {
        isLocation = true;
      }
      if (fileType == "doc" || fileType == "docx") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/WORD%403x.png"
      } else if (fileType == "xls" || fileType == "xlsx") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/EXCEL%403x.png"
      } else if (fileType == "ppt" || fileType == "pptx") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/PPT@3x.png"
      } else if (fileType == "pdf") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/PDF%403x.png"
      } else if (fileType == "txt") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/USUAL@3x.png"
      } else if (item.type == "image") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/picture%403x.png"
      } else if (item.type == "audio") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/music%403x.png"
      } else if (item.type == "video") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/video%403x.png"
      } else if (item.type == "other" && fileType == "of") {
        if (item.url) {
          fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/3D%25403x.png"
        } else {
          fileTypeIcon = "http://izsyue.oss-cn-shenzhen.aliyuncs.com/assets/applets/enterpriseEdition/images/file_address.png"
        }
      }
      item["fileTypeIcon"] = fileTypeIcon;
      item["isLocation"] = isLocation;
      item["displayTime"] = util.tsFormatTime(item.createdTime, "Y.M.D");
      item["title"] = item.title.split('.')[0];
    }

    this.setData({
      ['databank[' + this.data.databankPageIndex_add + ']']: list
    })
    wx.hideLoading()
  },

  //跳转资料库
  toMoreMaterial() {
    wx.navigateTo({
      url: '/estatePackage/pages/moreMaterial/moreMaterial?userId=' + this.data.business_info.userId
    })
  },
  //打开文件
  openFile(e) {
    let file = e.currentTarget.dataset.file
    this.setData({
      fileInfo: file,
      showFileBox: true
    })
  },
  //关闭文件
  closeFile() {
    this.setData({
      showFileBox: false
    })
  },

  //点击商品图片切换商品
  onProductClick(e) {
    let id = e.currentTarget.dataset.id
    for (let i in this.data.productList) {
      if (this.data.productList[i].id == id) {
        let mapData = {
          latitude: this.data.productList[i].lat,
          longitude: this.data.productList[i].lng,
          title: this.data.productList[i].title,
        }
        this.setData({
          productInfo: this.data.productList[i],
          mapData: mapData
        });
      }
    }
    this.toDetail()
  },

  //获取企业状态
  getBusinessStatus: function () {
    http.get(
      app.globalData.host + "merchant/status", {
        merchantCode: this.data.merchant_code,
        templateCode: "shop",
      },
      (status, resultCode, message, data) => {
        this.setData({
          businessStatus: data
        })
      },
      (status, resultCode, message, data) => {}
    );
  },

  /**
   * 点击吸顶菜单
   */
  navbarTabTitleClick: function (e) {
    console.log(e);
    let current = e.currentTarget.dataset.idx
    this.setData({
      //拿到当前索引并动态改变
      navbarCurrentIndex: current
    })
    if (current == 1 && this.data.isFixedTop) {
      //跳转到资讯
      var query = wx.createSelectorQuery();
      query.selectViewport().scrollOffset();
      query.select("#business_news").boundingClientRect();
      query.exec(function (res) {
        console.log(res);
        var miss = res[0].scrollTop + res[1].top - 200;
        wx.pageScrollTo({
          scrollTop: miss,
          duration: 300
        });
      });
    } else if (current == 0 && this.data.isFixedTop) {
      //跳转到顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  },

  /** 获取收藏关注 */
  getFavoritesCount: function () {
    http.get(
      app.globalData.host + "favorites/storeFavoritesCount", {
        merchantCode: this.data.merchant_code,
      },
      (status, resultCode, message, data) => {
        this.setData({
          businessStatus: data
        })
      },
      (status, resultCode, message, data) => {}
    );
  },

  /** 判断是共享合伙人（业务员)、事业合伙人（业务经理）、商家 */
  checkClerkApply: function () {
    if (!wx.getStorageSync('user')) {
      return;
    }
    http.get(
      app.globalData.host + "biz/user/merchant/clerk/checkSalesman", {
        merchantCode: this.data.merchant_code,
        userCode: this.data.clerkCode
      },
      (_status, _resultCode, _message, data) => {
        //0是共享合伙人（业务员），1是事业合伙人（业务经理），2是企业管理员（老板）
        if (data == null) {
          this.setData({
            business_phone: this.data.business_info.phone ? this.data.business_info.phone.split(",") : ""
          });
        } else {
          this.setData({
            business_phone: data.clerk.phone.split(',')
          });
        }
      },
      (_status, _resultCode, _message, data) => {}
    );
  },

  /** 前往商家动态 */
  goToBusinessDynamic: function () {
    wx.navigateTo({
      url: '/expandPackage/pages/businessDynamic/businessDynamic?merchantCode=' + this.data.merchant_code,
    })
  },

  /** 查看合伙人动态 */
  goToNewsList: function () {
    wx.navigateTo({
      url: '/expandPackage/pages/hotPartnerList/hotpartnerList?merchantCode=' + this.data.merchant_code,
    })
  },

  /** 前往商品专场 */
  goToGoodsActivities: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_goods/business_goods',
    })
  },

  /** 动态列表为空 */
  listEmpty: function (e) {
    this.setData({
      newsListEmpty: true,
    })
  },

  /**获取企业购买的服务列表 */
  getMerchantService() {
    http.get(
      app.globalData.host + "biz/user/merchant/pay/service/list/merchant", {
        merchantCode: this.data.merchant_code,
        userCode: wx.getStorageSync('user').userCode
      },
      (_status, _resultCode, _message, data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].serviceCode == 'merchant.vip.system' && data[i].status == 1) {
            this.setData({
              signInData_isShowSignIn: true,
            });
          }
        }
      },
      (_status, _resultCode, _message, data) => {
        console.log('获取企业购买的服务列表失败', data);
      }
    );
  },

  /**获取签到情况 */
  getSignInInfo: function () {
    http.get(
      app.globalData.vip_host + "vip/system/signInCheckStatus", {
        storeCode: this.data.merchant_code,
        userCode: wx.getStorageSync('user').userCode
      },
      (_status, _resultCode, _message, data) => {
        let signInData_signInSuccess = false
        if (data == '0') {
          signInData_signInSuccess = true;
        }
        this.setData({
          signInData_signInSuccess: signInData_signInSuccess,
        });
      },
      (_status, _resultCode, _message, data) => {
        console.log('获取签到失败', data);
      }
    );
  },

  /**点击签到 */
  signIn: function (e) {
    if (this.data.signInData_signInSuccess) return;
    http.get(
      app.globalData.vip_host + "vip/system/signIn", {
        storeCode: this.data.merchant_code,
        userCode: wx.getStorageSync('user').userCode
      },
      (_status, _resultCode, _message, data) => {
        this.setData({
          signInData_isShowSignIn: true,
          signInData_signInSuccess: true,
        });
        wx.showToast({
          title: _message,
          icon: "none"
        })
      },
      (_status, _resultCode, _message, data) => {
        console.log('获取签到失败', data);
      }
    );
  },

  /** 获取动态名片信息高度 */
  getMediaInfoHeight: function () {
    let that = this
    let query = wx.createSelectorQuery()
    if (this.data.tabType == 'goods') {
      query.select('#goods_list').boundingClientRect()
      query.exec(function (res) {
        if (res[0]) {
          that.setData({
            mediaInfoHeight: res[0].height + 20,
          })
        }
      })
    } else if (this.data.tabType == 'news') {
      query.select('#business_info').boundingClientRect()
      query.exec(function (res) {
        if (res[0]) {
          that.setData({
            mediaInfoHeight1: res[0].height,
          })
        }
      })
    }
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
          this.setData({
            tabPosition: value,
            ['tab_config.tabs']: temps,
            switch_index: temps[0].id
          })
        }
        this.setData({
          tabType: this.data.tab_config.tabs[0].tabType
        });
      },
      (status, resultCode, message, data) => {
        // this.$toast.center(message);
      }
    );
  },

  //货源分类外部展示
  getSupplyData: function () {
    http.get(
      app.globalData.business_host + "eventType/getProductTypes", {
        storeCode: this.data.merchant_code,
        countProduct: 1,
        statuses: JSON.stringify(["1"]),
        excludeEmpty: '1',
        typeCodes: JSON.stringify(['logistics', 'service', 'deposit', 'virtual']),
        agency: '1'
      },
      (status, resultCode, message, data) => {
        // console.log("货源分组================", data);
        this.setData({
          channelGoodsCount: data.allCount
        })
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
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    let that = this;
    this.setData({
      newsTypes_index: index,
      newsTypes_select: item,
      newsListEmpty: false,
    })
    let businessNews = this.selectComponent("#business_news")
    businessNews.getNewsList()
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

  /** 判断显示货源入口 */
  judgeChannelDisplay: function () {
    if (app.globalData.myMerchantInfo && app.globalData.myMerchantInfo.merchantType == "branchStore" && app.globalData.myMerchantInfo.mainStoreCode && app.globalData.myMerchantInfo.mainStoreCode != this.data.merchant_code) {
      this.setData({
        showChannle: false
      })
    } else {
      this.setData({
        showChannle: true
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

  /** 获取顶住滚动主图高度 */
  imgMainLoad: function (e) {
    let imgInfo = util.imageUtil(e)
    this.setData({
      swiperImgHeight: imgInfo.imageHeight,
    })
  }
})