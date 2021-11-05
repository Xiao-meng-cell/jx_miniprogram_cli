// miniprogram/pages/order/detail/order_details.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
var orderLogic = require('../../../utils/orderLogic');

//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    networkType: true, //监听网络连接与断开
    productInfo: {}, //房地产项目详情
    productInfo_items: [],
    partner_call: true,
    trackUserInfo: {}, //获取合伙人信息
    eventCode: '', //商品活动编号
    orderCode: null, //订单编号码
    orderCodes: "", //订单编号集合
    orderStats: 0, //订单状态
    orderDetails: null, //订单详情对象
    orderDetailsLogistics: null, //物流信息
    logisticsNum: null, //物流单号
    griddata: [],

    //待发货（待付款）属性
    inputTexts: "",
    texts: "至少需要15个字",
    min: 15, //最少字数
    max: 200, //最多字数 (根据自己需求改变) 
    currentWordNumber: 0,
    isBoss: false, //是否为老板
    startDeliveryTime: "", //生鲜开始配送时间
    endDeliveryTime: "", //生鲜结束配送时间
    deliveryTime_h: "00",
    deliveryTime_m: "00",
    deliveryTime_s: "00",
    deliveryTime: false, //生鲜付款倒计时
    show_business_phone: true, //展示企业号码列表
    logisticsInfo: "", //物流信息
    freePostageNum: 0, //满件包邮数量
    orderStatusStr: "", //订单状态主标题
    orderSubStatusStr: "", //订单状态副标题

    //售后相关信息
    existAfterSale: false, //是否存在售后
    afterServiceCode: "", //售后编号
    noAfterServiceStatusStr: "", //订单状态主标题(排除售后)
    afterServiceAddr: "", //售后地址信息
    afterServiceStatus: -1, //售后状态(0:无效;1:待受理;2:已受理;3:已拒绝;4:退换中;5:已完成;6:已取消）
    afterServiceLogistics: null, //退货物流信息
    afterServicelogisticsNum: null, //退货物流单号
    rebatePrice: 0, //返利金额
  },

  /**
   * 获取订单详情
   */
  getOrderDetailsById: function () {
    console.log('获取订单详情')
    var that = this;
    wx.showLoading({
      title: '正在加载中...',
    })
    var that = this;
    http.get(
      app.globalData.business_host + 'batchOrder/info', {
        code: this.data.orderCode
      },
      (status, resultCode, message, data) => {
        let noAfterService = {}
        noAfterService.data = Object.assign({}, data)
        noAfterService.status = 2
        let temp = {}
        temp.data = data
        //获取订单状态描述
        let orderStatus = orderLogic.getOrderStatusStr(temp)
        let noAfterServiceStatus = orderLogic.getOrderStatusStr(noAfterService)
        this.setData({
          orderStatusStr: orderStatus.orderStatusStr,
          orderSubStatusStr: orderStatus.orderSubStatusStr,
          noAfterServiceStatusStr: noAfterServiceStatus.orderStatusStr,
        })

        let isBoss = false
        if (data.store.userId == wx.getStorageSync("user").id) {
          isBoss = true
        }
        if (data.startDeliveryTime) {
          data.startDeliveryTime = util.tsFormatTime(data.startDeliveryTime, "Y-M-D h:m");
        }
        if (data.customerOrderMemo && data.customerOrderMemo != '&') {
          data.customerOrderMemo = data.customerOrderMemo.split('&');
        } else {
          data.customerOrderMemo = [];
        }

        let product = {
          "typeCode": data.items[0].typeCode
        }
        data["product"] = product

        let totalOrigPrice = 0
        let orderCodes = ""
        let existAfterSale = false
        //遍历订单商品
        let coupons = []
        let discountsAmount = 0
        let balanceAmount = 0
        let vipCouponAmount = 0
        for (let i in data.items) {
          let item = data.items[i]
          let eventTypeName = ""
          switch (item.eventTypeCode) {
            case "original":
              eventTypeName = "原价商品"
              break;
            case "inreward":
              eventTypeName = "名片商城"
              break;
            case "universalRebate":
              eventTypeName = "全民赚佣"
              break;
            default:
              break;
          }
          item.eventTypeName = eventTypeName
          totalOrigPrice = totalOrigPrice + item.price * item.num
          orderCodes = orderCodes == "" ? item.code : orderCodes + "," + item.code

          //遍历优惠券
          for (let j in item.coupons) {
            let couponItem = item.coupons[j]
            if (coupons.length == 0) {
              let tempCoupon = {}
              tempCoupon.typeCode = couponItem.typeCode
              tempCoupon.name = couponItem.name
              tempCoupon.value = couponItem.value
              coupons.push(tempCoupon)
            } else {
              for (let k in coupons) {
                let tempCoupon = coupons[k]
                if (tempCoupon.typeCode == couponItem.typeCode) {
                  tempCoupon.value = tempCoupon.value + couponItem.value
                }
              }
            }
            if (couponItem.typeCode == "vip_pay") {
              vipCouponAmount = vipCouponAmount + couponItem.value
            }
          }

          //新版折扣优惠金额
          discountsAmount = discountsAmount + item.discountsAmount

          //判断售后
          let asButtonText = "发起售后"
          if (data.status == 5 && item.afterSale) {
            if (item.afterSale.status == 1 || item.afterSale.status == 2 || item.afterSale.status == 3 || item.afterSale.status == 4) {
              existAfterSale = true
              asButtonText = "取消申请"
            }
            let afterServicelogisticsNum = ""
            //售后地址
            for (let i in item.afterSale.replys) {
              let replysItem = item.afterSale.replys[i]
              if (replysItem.typeCode == "store_agree") {
                this.setData({
                  afterServiceAddr: JSON.parse(replysItem.content) ? JSON.parse(replysItem.content) : ""
                })
              }

              if (replysItem.typeCode == "upload_return_info") {
                if (afterServicelogisticsNum == "") {
                  afterServicelogisticsNum = JSON.parse(replysItem.content) ? JSON.parse(replysItem.content).content : ""
                }
              }
            }

            //售后状态
            this.setData({
              afterServiceStatus: item.afterSale.status,
              afterServiceCode: item.afterSale.code,
              afterServicelogisticsNum: afterServicelogisticsNum,
            })
            this.getLogistics(afterServicelogisticsNum, true)
          } else {
            if (data.status == 2 && data.trackingNumberExist && data.product.typeCode == "logistics" && data.addressType == "user") {
              asButtonText = "发起售后"
            }
          }
          item.asButtonText = asButtonText

          //预充值抵扣
          balanceAmount = balanceAmount + item.balanceAmount
        }
        data.totalOrigPrice = totalOrigPrice
        data.coupons = coupons
        data.discountsAmount = discountsAmount
        data.balanceAmount = balanceAmount
        data.vipCouponAmount = vipCouponAmount

        //遍历订单变量
        let trackingNumber = "" //物流单号
        let refUserCode = "" //关系人编号
        for (let i in data.variables) {
          let item = data.variables[i]
          if (item.keyName == "tracking_number") {
            trackingNumber = item.value
          }
          if (item.keyName == "ref_user_code") {
            refUserCode = item.value
          }
        }
        data.trackingNumber = trackingNumber
        data.refUserCode = refUserCode

        //计算返利金额
        let rebatePrice = 0
        for (let i = 0; i < data.items.length; i++) {
          for (let j = 0; j < data.items[i].coupons.length; j++) {
            let subIitem = data.items[i].coupons[j]
            if (subIitem.typeCode == "after") {
              rebatePrice += subIitem.valueYuan
            }
          }
        }

        that.setData({
          orderDetails: data,
          orderStats: data.status,
          isBoss: isBoss,
          eventCode: data.eventCode,
          productInfo: data.product && data.product.orderRealEstateAttach ? data.product.orderRealEstateAttach : {},
          productInfo_items: data.items[0],
          orderCodes: orderCodes,
          existAfterSale: existAfterSale,
          rebatePrice,
        })
        var status = data.status;
        var haveData;
        if (data.variables == null || data.variables.length == 0) {
          haveData = false;
        } else {
          haveData = true;
        }
        //待支付倒计时
        if (status == 1) {
          this.setData({
            activity_timeDevice: setInterval(function () {
              that.countTime();
            }, 1000)
          })
        }
        if (this.data.orderDetails.product.typeCode == 'logistics' && this.data.orderDetails.addressType == "user") { //物流
          if ((status == 2 || status == 3 || status == 4 || status == 5) && haveData == true) {
            var logis = data.variables;
            var logiNum = null;
            if (logis.length > 0) {
              for (var i = 0; i < logis.length; i++) {
                if (logis[i].keyName == 'tracking_number') {
                  logiNum = logis[i].value;
                  that.setData({
                    logisticsNum: logiNum
                  })
                  break;
                }
              }
              that.getLogistics(logiNum);
            }
          }
        } else if (this.data.orderDetails.product.typeCode == 'fresh') { //生鲜
          let that = this;
          this.setData({
            startDeliveryTime: util.tsFormatTime(data.startDeliveryTime, "Y.M.D h:m"),
            endDeliveryTime: util.tsFormatTime(data.endDeliveryTime, "h:m"),
            activity_timeDevice: setInterval(function () {
              that.countTime();
            }, 1000)
          })
        }
        this.getBusinessPhone(data.onshelfStore.phone);
        if (this.data.orderDetails.product.typeCode == 'estate') {
          this.partnerCall(data.eventCode);
        }
        this.searchLogisticsCharge()
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    app.getOptions(options, function (data) {
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      /***订单详情没有二维码解析，不需要做二维码解析操作 */
      //旧小程序码
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧二维码
      that.initOptions(data)
    })

  },
  //初始化参数
  initOptions(options) {
    if (options.orderId) {
      this.setData({
        orderCode: options.orderId
      })
    }
  },

  /**监听网络变化 */
  watchBack: function (networkType) {
    this.setData({
      networkType: networkType
    });
    // console.log('==========网络监听==========', this.data.networkType);
  },

  //(待发货)（待付款）字数限制
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "至少还需要",
        textss: "字",
        num: this.data.min - len
      })
    else if (len > this.data.min)
      this.setData({
        texts: " ",
        textss: " ",
        num: ''
      })

    this.setData({
      currentWordNumber: len //当前字数  
    });
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      inputTexts: value,
    })
  },

  /**
   * 轮询结算单
   */
  pollingOrder: function (code) {
    http.get(
      app.globalData.host + 'biz/usersettlement/info', {
        code: code,
      },
      (status, resultCode, message, data) => {
        if (data.status == 4) {
          //支付成功
          wx.showToast({
            title: '支付成功',
            icon: "none"
          })
          this.getOrderDetailsById();
          wx.redirectTo({
            url: '/pages/order/goods_opt_status/buy_success?orderCode=' + this.data.orderCode,
          })
        } else if (data.status == 5) {
          wx.showToast({
            title: '支付失败',
            icon: "none"
          })
        } else { //继续轮询
          this.pollingOrder(code);
        }
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '支付失败',
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
      fail(res) {

      }
    })

  },

  /**
   * 获取微信支付openid  第一步
   */
  toPayMoney: function (e) {
    wx.showLoading({
      title: '付款中',
      mask: true
    })

    wx.login({
      success: res => {
        this.setData({
          wxCode: res.code
        });
        http.post(
          app.globalData.host + 'wechat/authorization_minpro', {
            code: this.data.wxCode,
            appid: app.globalData.appId
          },
          (status, resultCode, message, data) => {
            this.getWeChatRecharge(data.openid)
          },
          (status, resultCode, message, data) => {}
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
      app.globalData.business_host + 'batchOrder/unipay_thirdpay', {
        openId: data + "",
        body: "微信企业版小程序客户订单付款",
        totalAmount: this.data.orderDetails.totalPrice,
        frpCode: (payTest && !independentPay ? 'ORIGINAL' : 'WEIXIN_XCX'),
        channel: independentPay ? 'channel_wechat' : 'channel_joinpay',
        appId: app.globalData.appId,
        orderCodes: this.data.orderCodes,
      },
      (status, resultCode, message, data) => {
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
            url: '/pages/order/detail/order_details?orderId=' + this.data.orderDetails.code,
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
        wx.hideLoading();
      }
    );
  },

  /**
   * 根据物流单号查询物流列表
   * @param {*} logisticsNum 物流单号
   * @param {*} isReturncNum 是否为退货单号，默认false
   */
  getLogistics: function (logisticsNum, isReturncNum = false) {
    if (logisticsNum == null || logisticsNum == undefined || logisticsNum.length == 0) {
      return;
    }
    wx.showLoading({
      title: '正在加载中...',
    })
    var that = this;
    http.post(
      app.globalData.business_host + 'tracking/search', {
        num: logisticsNum
      },
      (status, resultCode, message, data) => {
        if (isReturncNum) {
          that.setData({
            afterServiceLogistics: data,
          })
        } else {
          that.setData({
            orderDetailsLogistics: data,
          })
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


  /**
   * 去使用券码
   */
  toUserQCode: function (e) {
    var orderBeanStr = e.currentTarget.dataset.bean.code;
    if (this.data.orderDetails.code && this.data.orderDetails.code != '') {
      wx.navigateTo({
        url: '/pages/order/order_coupon_code/coupon_code?orderBeanStr=' + orderBeanStr,
      })
      // if (this.data.orderDetails.product.typeCode == 'logistics' && this.data.orderDetails.addressType == 'merchant') {
      //   if (this.data.orderDetails.isSigned == 1) {
      //     wx.navigateTo({
      //       url: '/pages/order/order_coupon_code/coupon_code?orderBeanStr=' + orderBeanStr,
      //     })
      //   }
      // } else {
      //   wx.navigateTo({
      //     url: '/pages/order/order_coupon_code/coupon_code?orderBeanStr=' + orderBeanStr,
      //   })
      // }
    }
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
        if (res.cancel) {
          //点击取消,默认隐藏弹框

        } else {
          //点击确定
          wx.showLoading({
            title: '操作中...',
          });
          http.post(
            app.globalData.business_host + 'batchOrder/finish', {
              orderCodes: that.data.orderCodes,
            },
            (status, resultCode, message, data) => {
              wx.hideLoading();
              that.setData({
                orderCode: orderBean.code
              });
              that.getOrderDetailsById();
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
   * 导航
   */
  openLocation: function (e) {
    console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.bean) {
      var orderBean = e.currentTarget.dataset.bean;
      let longitude = ''
      let latitude = ''
      let address = ''
      //根据不同条件选择不同的地址
      if (orderBean.product.typeCode == 'logistics' && orderBean.addressType == 'merchant') {
        longitude = Number(orderBean.lng)
        latitude = Number(orderBean.lat)
        address = orderBean.address
      } else {
        // longitude = Number(orderBean.store.lng)
        // latitude = Number(orderBean.store.lat)
        // address = orderBean.store.addr
        longitude = Number(orderBean.eventLng)
        latitude = Number(orderBean.eventLat)
        address = orderBean.eventAddress
      }
      wx.openLocation({
        longitude,
        latitude,
        name: orderBean.store.shortName && orderBean.store.shortName != "" ? orderBean.store.shortName : orderBean.store.name,
        address,
      })
    } else if (e.currentTarget.dataset.product) {
      let product = e.currentTarget.dataset.product
      wx.openLocation({
        longitude: Number(product.eventLng),
        latitude: Number(product.eventLat),
        name: product.eventTitle,
        address: product.eventAddress,
      })
    }
  },

  /**
   * 复制订单号
   */
  copyOrderCode: function (e) {
    var that = this;
    var orderBean = e.currentTarget.dataset.bean;
    wx.setClipboardData({
      data: orderBean.code ? orderBean.code : orderBean,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          title: '复制成功',
          duration: 2000
        })
      }
    });
  },

  /**
   * 复制串码
   */
  copyTrackingNumber: function (e) {
    var that = this;
    var trackingNumber = e.currentTarget.dataset.code;
    wx.setClipboardData({
      data: trackingNumber ? trackingNumber : this.data.orderDetails.trackingNumber,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          title: '复制成功',
          duration: 2000
        })
      }
    });
  },


  /**
   * 去查物流详情
   */
  toLogisticsDetails: function (e) {
    let type = e.currentTarget.dataset.type ? e.currentTarget.dataset.type : ""
    var lognum = ""
    var addr = ""
    if (type == "afterService") {
      lognum = this.data.afterServicelogisticsNum
      addr = this.data.afterServiceAddr.address
      if (!this.data.afterServiceLogistics || this.data.afterServiceLogistics.list == 0) {
        return
      }
    } else {
      if (this.data.orderDetails.product.typeCode == 'logistics' && this.data.orderDetails.addressType == 'user') {
        lognum = this.data.logisticsNum
        addr = this.data.orderDetails.address
        if (!this.data.orderDetailsLogistics || this.data.orderDetailsLogistics.list == 0) {
          return
        }
      }
    }

    wx.navigateTo({
      url: '/pages/order/logistics/logistics?lognum=' + lognum + '&addr=' + addr,
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
    if (this.data.orderCode != null) {
      this.getOrderDetailsById();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.activity_timeDevice);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.activity_timeDevice);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "我已下的订单",
      path: "pages/order/detail/order_details?orderId=" + this.data.orderCode + '&batchShare=' + app.globalData.batchShare,
      imageUrl: ""
    }
  },

  /** 前往售后服务 */
  toAfterService: function (e) {
    let item = e.currentTarget.dataset.item
    let temp = this.data.orderDetails
    let items = []
    items.push(item)
    temp.items = items
    if (temp.status == 5 && item.afterSale && (item.afterSale.status == 1 || item.afterSale.status == 2 || item.afterSale.status == 3 || item.afterSale.status == 4)) {
      this.cancelAfterSale(item.afterSale)
    } else {
      app.globalData.customerOrderDetail = temp
      wx.navigateTo({
        url: '/expandPackage/pages/afterService/afterService',
      })
    }
  },

  /** 阻止鼠标操作 */
  stopMouseOperate: function () {

  },

  /** 前往商家主页 */
  goToBusiness: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?userId=' + this.data.orderDetails.store.userId + "&tagCode=" + this.data.orderDetails.store.tagCode + "&merchantCode=" + this.data.orderDetails.store.code,
    })
  },

  /** 前往商品详情 */
  goToGoods: function (e) {
    let data = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "/pages/tabBar_index/business_detail/business_detail?code=" + data.eventCode + '&higherLevelCode=' + app.globalData.higherLevelCode + (this.data.orderDetails.refUserCode && this.data.orderDetails.refUserCode != "" ? "&clerk_code=" + this.data.orderDetails.refUserCode : ""),
    })
  },

  /** 一键复制 */
  copyAll: function () {
    let addr = this.data.orderDetails.address ? this.data.orderDetails.address : ""
    let name = this.data.orderDetails.linkman ? this.data.orderDetails.linkman : ""
    let phone = this.data.orderDetails.phone ? this.data.orderDetails.phone : ""
    let allInfo = name + "," + phone + "," + addr
    wx.setClipboardData({
      data: allInfo,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          duration: 2000
        })
      }
    });
  },

  /** 取消订单 */
  cancleOrder: function (e) {
    let that = this
    // var orderBean = e.currentTarget.dataset.bean;
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
              orderCodes: that.data.orderCodes,
            },
            (status, resultCode, message, data) => {
              wx.hideLoading();
              wx.showToast({
                title: '订单取消成功',
                duration: 1500,
                mask: true,
              })
              wx.navigateBack()
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
   * 时间倒计时
   */
  countTime: function () {
    //获取结束时间  
    var endDate = new Date(util.tsFormatTime(this.data.orderDetails.endPayTime, "Y/M/D h:m:s"));
    var end = endDate.getTime();
    //当前时间
    var date = new Date();
    var now = date.getTime();

    if (now > end) {
      //已结束
      this.setData({
        deliveryTime: false
      });
    } else {
      //时间差  
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间  
      var d, h, m, s;
      if (leftTime > 0) {
        // d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
        this.setData({
          deliveryTime_h: (h < 10 ? "0" + h : h),
          deliveryTime_m: (m < 10 ? "0" + m : m),
          deliveryTime_s: (s < 10 ? "0" + s : s),
          deliveryTime: true,
          orderSubStatusStr: "您还未支付，此订单将在" + (h < 10 ? "0" + h : h) + " : " + (m < 10 ? "0" + m : m) + " : " + (s < 10 ? "0" + s : s) + "后自动取消"
        });
      }
    }
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
      show_business_phone: !this.data.show_business_phone,
    });
  },
  /**
   * 展示房地产合伙人号码
   */
  showPartnerPhoneList: function () {
    this.setData({
      partner_call: !this.data.partner_call
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
   * 联系房地产合伙人
   */
  contactPartner: function () {
    var partner_phone = this.data.trackUserInfo.phone;
    wx.makePhoneCall({
      phoneNumber: partner_phone
    })
  },

  /** 删除订单 */
  delOrder: function (e) {
    wx.showModal({
      cancelText: '取消',
      confirmColor: '#2F95FB',
      confirmText: '删除',
      content: '是否删除该订单？',
      showCancel: true,
      success: (result) => {
        if (result.confirm) {
          http.post(
            app.globalData.business_host + 'customerorder/hide', {
              orderCode: e.currentTarget.dataset.bean.code
            },
            (status, resultCode, message, data) => {
              wx.hideLoading();
              wx.showToast({
                title: '订单删除成功',
                duration: 1500,
                mask: true,
              })
              wx.navigateBack()
            },
            (status, resultCode, message, data) => {
              wx.hideLoading();
              wx.showToast({
                title: '取消删除失败',
                icon: 'none',
                duration: 1500
              })
            });
        }
      },
      title: '温馨提示',
    })
  },

  /**
   * 图片预览
   */
  imagePreview: function (e) {
    wx.previewImage({
      current: this.data.orderDetails.afterSale.urls[e.currentTarget.dataset.index],
      urls: this.data.orderDetails.afterSale.urls
    })
  },

  /** 搜索相关物流费用 */
  searchLogisticsCharge: function () {
    if (!this.data.orderDetails.provinceCode) {
      return
    }
    let provinceCodes = []
    provinceCodes.push(this.data.orderDetails.provinceCode)
    http.get(
      app.globalData.business_host + "logisticstemple/getProLogisticsInfo", {
        productCode: this.data.orderDetails.productCode,
        provinceCodes: JSON.stringify(provinceCodes),
      },
      (status, resultCode, message, data) => {
        // console.log(data);
        this.setData({
          logisticsChargeType: data.chargeType,
          logisticsInfo: data.chargerDetailList[0],
          logisticsStatus: data.chargerDetailList[0].areaType,
          logisticsPrice: data.chargerDetailList[0].areaType == 2 ? util.priceSwitch(data.chargerDetailList[0].basicPrice) : 0,
          freePostageNum: data.chargerDetailList[0].freePostageNum > 0 ? data.chargerDetailList[0].freePostageNum : 0,
        })
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },


  //房地产合伙人联系方式
  partnerCall: function (eventCode) {
    http.get(app.globalData.business_host + 'event/info', {
        eventCode: eventCode,
        isTrack: 1,
        userCode: (!app.globalData.higherLevelCode || app.globalData.higherLevelCode == '' || app.globalData.higherLevelCode == 'undefined') ? '' : app.globalData.higherLevelCode
      },
      (status, resultCode, message, data) => {
        this.setData({
          trackUserInfo: data.trackUserInfo,
        })
      }
    )
  },
  call: function () {},

  /** 取消售后申请 */
  cancelAfterSale: function (afterSale) {
    let that = this
    wx.showModal({
      title: '取消申请',
      content: '是否取消售后申请',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          http.post(
            app.globalData.business_host + 'customerorder/cancelComplain', {
              afterSaleCode: afterSale.code,
            },
            (status, resultCode, message, data) => {
              console.log('取消售后成功！')
              wx.showToast({
                title: '取消售后成功',
                icon: 'none',
                duration: 1500,
                mask: true,
              })
              that.getOrderDetailsById()
            },
            (status, resultCode, message, data) => {
              console.log('取消售后失败！')
              wx.showToast({
                title: '取消售后失败！',
                icon: 'none',
                duration: 1500,
                mask: true,
              })
              console.log(data)
            }
          );
        }
      },
    })
  },

  /** 上传寄回凭证 */
  clickUploadReturnInfo: function () {
    wx.navigateTo({
      url: '/expandPackage/pages/afterService/uploadReturnInfo/uploadReturnInfo?afterSaleCode=' + this.data.afterServiceCode,
    })
  },
})