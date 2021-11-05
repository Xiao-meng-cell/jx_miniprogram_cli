// pages/order/order.js
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
var orderLogic = require('../../utils/orderLogic');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capsuleTop: 0,
    networkType: true, //监听网络连接与断开
    window_width: wx.getSystemInfoSync().screenWidth, //屏幕宽度
    loadAll: false, //加载全部数据
    tab_config: { // 切页配置
      tabs: ['待付款', '待核销', '待发货', '待收货', '退款售后', '已完成'], // tabs
      fixed: false, // tabbar是否固定宽度
      item_width: 90, // 单位是px
      tab_left: 0, // 如果tabbar不是固定宽度，则目前左移的位置
      underline: {
        offset: 0 //下划线的位移
      }
    },
    userid: "", //用户ID
    selectedTabIndex: 0, //tab下标
    requestParams: {}, //请求数据参数
    pageIndex: 1, //翻页目录
    pageIndex_add: 0, //二维数组下标
    pageLimit: 10,
    orderListData: [],
    loadEnable: false,
    show_business_phone: true, //展示企业号码列表
    filterTimeLastDate: "", //时间过滤截止时间
    dateST: "", //时间过滤开始时间
    dateET: "", //时间过滤结束时间

    //防止点击订单切页时同时触发滑动加载，导致获取两次订单列表
    loadDataEnable: true, //启用数据加载
    loadDataFrom: "click", //加载数据来源(click:点击订单切页；swiper:滑动)

    orderCode: "",
    orderCodes: "", //待处理订单编号集合
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    if (options.userid) {
      this.setData({
        userid: options.userid
      })
    }
    if (options.type) {
      let type = options.type
      if (type == 'tabOnes')
        this.setData({
          selectedTabIndex: 0
        })
      if (type == 'tabTwos')
        this.setData({
          selectedTabIndex: 1
        })
      if (type == 'tabThrees')
        this.setData({
          selectedTabIndex: 2
        })
      if (type == 'tabFours')
        this.setData({
          selectedTabIndex: 3
        })
      if (type == 'tabFives')
        this.setData({
          selectedTabIndex: 4
        })
      if (type == 'tabSix') {
        this.setData({
          selectedTabIndex: 5
        })
      }
    }
    if (this.data.tab_config.fixed) {
      let tab_config = this.data.tab_config
      tab_config.item_width = this.data.window_width / tab_config.tabs.length;
      this.setData({
        tab_config: tab_config,
      })
    }
    this.setData({
      filterTimeLastDate: util.formatDateTime(new Date()) + " 23:59:59"
    })
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
    this.setData({
      capsuleTop: app.globalData.capsuleTop,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrders();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    if (!prePage) {
      wx.navigateTo({
        url: '/pages/tabBar_index/business_homepage/business_homepage',
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.loadAll) {
      this.loadMore()
    }
  },

  /**
   * 加载更多数据
   */
  loadMore: function () {
    this.setData({
      pageIndex: this.data.pageIndex + 1,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getOrders()
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

  /** 处理tab切换 */
  handlerTabTap: function (e) {
    let that = this;
    that.setData({
      loadDataEnable: false,
      loadDataFrom: "click",
    })
    that.updateSelectedPage(e.currentTarget.dataset.index);
  },

  // 更换页面到指定page ，从0开始
  updateSelectedPage: function (page) {
    if (!this.data.loadDataEnable && this.data.loadDataFrom == "swiper") {
      return
    }
    let that = this;
    let {
      window_width,
      tab_config,
    } = this.data;
    let underline_offset = tab_config.item_width * page;
    tab_config.underline.offset = underline_offset;
    // 如果tab不是固定的,检测tab是否被遮挡
    if (!tab_config.fixed) {
      //检测tab是否被遮挡
      //一个界面完整显示的tab item个数
      let show_item_num = Math.floor(window_width / tab_config.item_width)
      let min_left_item = tab_config.item_width * (page - show_item_num + 1) // 最小scroll-left 
      let max_left_item = tab_config.item_width * page; //  最大scroll-left
      if (tab_config.tab_left < min_left_item || tab_config.tab_left > max_left_item) {
        // 如果被遮挡，则要移到当前元素居中位置
        tab_config.tab_left = max_left_item - (window_width - tab_config.item_width) / 2;
      }
    }
    that.setData({
      tab_config: tab_config,
      pageIndex: 1,
      pageIndex_add: 0,
      dateST: "",
      dateET: "",
      selectedTabIndex: page,
      orderListData: [],
      loadAll: false,
    });
    that.getOrders()
  },

  /** 处理加载数据 */
  handlerLoadData: function () {
    if (this.data.selectedTabIndex == 0) { //待付款
      this.setData({
        requestParams: {
          statuses: JSON.stringify([1])
        },
      });
    } else if (this.data.selectedTabIndex == 1) { //待核销
      this.setData({
        requestParams: {
          statuses: JSON.stringify([2]),
          statusCode: 'waiting',
        },
      });
    } else if (this.data.selectedTabIndex == 2) { //待发货
      this.setData({
        requestParams: {
          statuses: JSON.stringify([2]),
          statusCode: 'tracking',
        },
      });
    } else if (this.data.selectedTabIndex == 3) { //待收货
      this.setData({
        requestParams: {
          statuses: JSON.stringify([2]),
          statusCode: 'receiving',
        },
      });
    } else if (this.data.selectedTabIndex == 4) { //售后中
      this.setData({
        requestParams: {
          statuses: JSON.stringify([5]),
        },
      });
    } else if (this.data.selectedTabIndex == 5) { //已完成
      this.setData({
        requestParams: {
          statuses: JSON.stringify([3, 4]),
        },
      });
    }
  },

  /**
   * 获取订单列表
   */
  getOrders: function () {
    wx.showLoading({
      title: '正在加载中...',
      mask: true,
    })
    this.handlerLoadData();
    let startTime = this.data.dateST
    let endTime = this.data.dateET
    if (startTime == "" && endTime == "") {
      startTime = undefined
      endTime = undefined
    } else if (startTime == "" && endTime != "") {
      startTime = "2008-01-01 00:00:00"
    } else if (endTime == "" && startTime != "") {
      startTime = startTime + " 00:00:00"
      endTime = this.data.filterTimeLastDate
    } else {
      startTime = startTime + " 00:00:00"
      endTime = endTime + " 23:59:59"
    }
    let requestParams = this.data.requestParams;
    requestParams.pageIndex = this.data.pageIndex;
    requestParams.pageLimit = this.data.pageLimit;
    requestParams.startTime = startTime;
    requestParams.endTime = endTime;
    if (!app.globalData.vicpalmMain) { //独立小程序取订单列表，只显示自己店铺下的订单，不显示掌创人生的订单
      requestParams.onshelfStoreCode = app.globalData.defaultMerchantCode
    }
    this.setData({
      requestParams: requestParams
    });
    console.log(this.data.pageIndex)
    http.get(
      app.globalData.business_host + 'batchOrder/memberOrders', this.data.requestParams,
      (status, resultCode, message, data) => {
        this.setData({
          loadDataEnable: true,
        })
        this.handlerOrderData(data);
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        this.setData({
          loadDataEnable: true,
        })
        wx.showToast({
          title: '获取数据失败！',
          duration: 2000
        })
      });
  },

  /**
   * 处理订单数据
   */
  handlerOrderData: function (data) {
    let that = this
    new Promise(function (resolve, reject) {
      if (data.count == 0 && data.list.length == 0) {
        that.setData({
          orderListData: [],
          loadAll: true,
        });
        wx.hideLoading()
      } else {
        if (data.list.length < that.data.pageLimit) {
          that.setData({
            loadAll: true,
          })
        }
      }
      let finalList = [];
      if (data.list && data.list.length > 0) {
        for (let i in data.list) {
          let item = data.list[i]
          if (item.startDeliveryTime) {
            item.startDeliveryTime = util.tsFormatTime(item.startDeliveryTime, 'Y-M-D h:m');
          }
          //遍历订单商品列表
          let orderCodes = ""
          for (let j in item.items) {
            orderCodes = orderCodes == "" ? item.items[j].code : orderCodes + "," + item.items[j].code
          }
          item.orderCodes = orderCodes

          //订单状态
          let tempOrder = {}
          tempOrder.data = item
          let temp = orderLogic.getOrderStatusStr(tempOrder)
          item.customerTaskStatus = temp.orderStatusStr
          finalList.push(item);
        }
        that.setData({
          ['orderListData[' + that.data.pageIndex_add + ']']: finalList,
        })
      } else {
        that.setData({
          orderListData: finalList,
        })
      }
      let temp = that.data.orderListData[that.data.pageIndex_add]
      if (temp && temp.length > 0) {
        setTimeout(() => {
          wx.hideLoading();
        }, 1000);
        resolve();
      } else {
        reject();
      }
    });
  },


  /** 切换 */
  swiperChange(e) {
    this.setData({
      loadDataFrom: "swiper",
    })
    this.updateSelectedPage(e.detail.current);
  },

  /**
   * 去取消订单
   */
  toCancleOrder: function (e) {
    let that = this
    var orderBean = e.currentTarget.dataset.bean;
    wx.showModal({
      title: '取消提示',
      content: '是否取消订单，取消后不可恢复！',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '订单取消中...',
            mask: true,
          })
          http.post(
            app.globalData.business_host + 'batchOrder/cancel', {
              // orderCode: orderBean.code
              orderCodes: orderBean.orderCodes,
            },
            (status, resultCode, message, data) => {
              wx.hideLoading();
              wx.showToast({
                title: '订单取消成功',
                duration: 1500,
                mask: true,
              })
              that.getOrders();
            },
            (status, resultCode, message, data) => {
              wx.hideLoading();
              wx.showToast({
                title: '取消订单失败',
                icon: 'none',
                duration: 1500
              })
              console.log("取消订单失败");
            });
        }
      },
    })
  },

  /**
   * 去订单详情
   */
  toOrderDetails: function (e) {
    var orderBean = e.currentTarget.dataset.bean;
    wx.navigateTo({
      url: '/pages/order/detail/order_details?orderId=' + orderBean.code,
    })
  },

  /**
   * 去使用券码
   */
  toUserQCode: function (e) {
    var orderBeanStr = e.currentTarget.dataset.bean.code;
    wx.navigateTo({
      url: '/pages/order/order_coupon_code/coupon_code?orderBeanStr=' + orderBeanStr,
    })
  },

  /**
   * 去确定收货
   */
  toReceivingGoods: function (e) {
    var that = this;
    var orderBean = e.currentTarget.dataset.bean;
    wx.showModal({
      title: '提示',
      content: '确认收货后将会自动完成订单',
      confirmText: "确定",
      cancelText: "取消",
      showCancel: true, //是否显示取消按钮
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '操作中...',
          });
          http.post(
            app.globalData.business_host + 'batchOrder/finish', {
              orderCodes: orderBean.orderCodes
            },
            (status, resultCode, message, data) => {

              wx.hideLoading();
              that.getOrders();
              that.setData({
                selectedTabIndex: 3
              })
              that.updateSelectedPage(that.data.selectedTabIndex);
            },
            (status, resultCode, message, data) => {
              wx.hideLoading();
              wx.showToast({
                title: '操作失败！',
                duration: 2000
              })
            });
        }
      },

    })

  },


  /**
   * 获取微信支付openid  第一步
   */
  toPay: function (e) {
    wx.showLoading({
      title: '付款中',
      mask: true
    })
    var orderBean = e.currentTarget.dataset.bean;
    this.setData({
      totalPrice: orderBean.totalPrice,
      orderCode: orderBean.code,
      orderCodes: orderBean.orderCodes,
    });


    wx.login({
      success: res => {
        // http.post(
        //   app.globalData.host + 'wechat/authorization_wxml2', {
        //     code: res.code,
        //   },
        this.setData({
          wxCode: res.code,
        });
        http.post(
          app.globalData.host + 'wechat/authorization_minpro', {
            code: this.data.wxCode,
            appid: app.globalData.appId
          },
          (status, resultCode, message, data) => {
            this.getWeChatRecharge(data.openid)
          },
          (status, resultCode, message, data) => {

          }
        );
      }
    })
  },

  /**
   * 获取微信支付需要用的参数
   */
  getWeChatRecharge: function (data) {
    let payTest = false; //测试服免支付
    let independentPay = app.globalData.independentPay;
    if (app.globalData.business_host == 'https://www.vicpalm.com/weclubbing/order/') {
      payTest = false;
    } else {
      if (!independentPay) {
        payTest = true;
      }
    }
    http.post(
      app.globalData.business_host + (payTest ? 'atest/batchOrder/unipay_thirdpay' : 'batchOrder/unipay_thirdpay'), {
        openId: data + "",
        body: "微信企业版小程序客户订单付款",
        totalAmount: this.data.totalPrice,
        frpCode: (payTest && !independentPay ? 'ORIGINAL' : 'WEIXIN_XCX'),
        channel: independentPay ? 'channel_wechat' : 'channel_joinpay',
        appId: app.globalData.appId,
        orderCodes: this.data.orderCodes
      },
      (status, resultCode, message, data) => {
        console.log(data);
        wx.hideLoading();
        if (payTest) {
          wx.showToast({
            title: '支付成功',
            icon: "none"
          })
          this.setData({
            submitting: false,
          })
          wx.navigateTo({
            url: '/pages/order/detail/order_details?orderId=' + this.data.orderCode,
          })
          return
        } else {
          this.weChatRecharge(data.params, data.orderNo);
        }
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: message,
          icon: "none"
        })
      }
    );
  },

  /**
   * 获取微信支付需要用的参数
   */
  weChatRecharge: function (data, orderNo) {
    var that = this;
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success(res) {
        that.pollingOrder(orderNo);
      },
      fail(res) {}
    })
  },

  /**
   * 导航
   */
  openLocation: function (e) {
    var orderBean = e.currentTarget.dataset.bean;
    wx.openLocation({
      longitude: Number(orderBean.store.lng),
      latitude: Number(orderBean.store.lat),
      name: orderBean.store.address,
      address: orderBean.store.address,
    })
  },

  /** 前往商品详情 */
  goToGoods: function (data) {
    wx.navigateTo({
      url: "/pages/tabBar_index/business_detail/business_detail?code=" + data.eventCode + (data.refUserCode && data.refUserCode != "" ? "&clerk_code=" + data.refUserCode : "")
    })
  },

  /**
   * 获取订单详情
   */
  getOrderDetailsById: function (orderId) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    http.get(
      app.globalData.business_host + 'customerorder/info', {
        orderCode: orderId
      },
      (status, resultCode, message, data) => {
        console.log('获取订单详情成功')
        console.log(data)
        this.getBusinessPhone(data.onshelfStore.phone);
        if (that.data.bottomBtnType == "buy") {
          that.goToGoods(data)
        } else if (that.data.bottomBtnType == "call") {
          that.showBusinessPhoneList()
        }
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: '获取数据失败！',
          duration: 2000
        })
      });
  },

  /** 底部按钮点击事件 */
  clickOrderBottomBtn: function (e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      bottomBtnType: e.currentTarget.dataset.type
    })
    this.getOrderDetailsById(e.currentTarget.dataset.bean.code)
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
    this.showBusinessPhoneList()
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

  bindDateChange: function (e) {
    if (e.currentTarget.dataset.type == "st") {
      this.setData({
        dateST: e.detail.value,
      })
    } else {
      this.setData({
        dateET: e.detail.value,
      })
    }
    this.setData({
      pageIndex: 1,
      pageIndex_add: 0,
      orderListData: []
    })
    // this.handlerLoadData()
    this.getOrders()
  },

  bindcancel: function (e) {
    if (e.currentTarget.dataset.type == "st") {
      this.setData({
        dateST: "",
      })
    } else {
      this.setData({
        dateET: "",
      })
    }
    this.setData({
      pageIndex: 1,
      pageIndex_add: 0,
      orderListData: []
    })
    this.getOrders()
  },

  stopMouseOperate: function () {
    
  },
})