// miniprogram/pages/tabBar_index/cart/confirm_order_cart/confirm_order_cart.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
var RSAKey = require('../../../../utils/rsa-client.js');
var base64 = require('../../../../utils/base64.js');
var regExp = require('../../../../utils/regExp');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_addr: "", //收获地址
    orderCartsList: null,
    hasLogi: false,
    hasDdzt: false,
    hasDeposit: false,
    backCarts: false,
    provinceCode: null, //收货地址中的省份code
    productCodes: [], //购物车过来的产品code
    unableCartsList: [], //无法配送的订单
    freshTips: null, //生鲜提示
    inputLinkMan: null, //虚拟商品联系人
    inputPhone: null, //虚拟商品联系人号码
    hasVirtual: 0, //是否有虚拟物品
    initialData: null, //初始数据
    totalPrice: 0, //订单总金额
    totalDiscountPrice: 0, //订单总优惠
    totalDiscountPriceOrigin: 0, //原始订单总优惠(不包含VIP优惠券)
    inventoryList: null, //商品清单列表
    unableLogi: false, //是否存在超出配送范围的订单
    showMemoLay: false, //是否显示添加备注弹层
    cartMemoLength: 0, //备注长度
    memoIndex: null, //备注对应的商品的下标
    cartMemo: null, //备注
    showNameLay: null, //是否显示姓名手机号弹层
    depositOrderNamePhone: [], //
    depositShowNamePhone: [], //
    startDeliveryTime: '', //配送时间-烘焙类商品
    vicpalmMain: app.globalData.vicpalmMain, //是否是独立小程序
    appId: app.globalData.appId,
    iPhone_X: app.globalData.iPhone_X,
    changePay: false,
    payIcon: 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/wechat_pay.png',
    payName: '微信支付',
    payList: [{
        name: '微信支付',
        icon: 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/wechat_pay.png'
      },
      {
        name: '预支付',
        icon: 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/wechat_pay.png'
      },
    ],
    enableMember: app.globalData.enableMember, //是否启用会员功能
    couponPricePart: 0, //优惠券金额
    enableMemberRecharge: false, //启用会员预充值
    useMemberRecharge: true, //使用会员预充值
    usableCredit: 0, //预充值可抵扣金额
    unableList: "", //不可用预充值列表
    ableList: "", //可用预充值列表
    calcVipCouponCarts: "", //计算VIP优惠券用购物车列表
    changeVipCouponMerchantCode: "", //改变VIP优惠券商家code
    changeVipCouponList: [], //改变后VIP优惠券列表
    systemDefaultVipCouponList: [], //系统默认VIP优惠券列表
    isChangeVipCoupon: false, //是否修改过VIP优惠券
    popupHidden: true, //隐藏弹窗
    payPwd: "", //支付密码
    logisticsInfos: "",

    cartPhone: "",
    cartPhoneTemp: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.enableMember) {
      this.payPassword = this.selectComponent("#payPassword")
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    /**配送时间选择*/
    if (app.globalData.appId == 'wx00a71e008067167b' && wx.getStorageSync("startDeliveryTime")) { //烘焙商品
      this.setData({
        startDeliveryTime: wx.getStorageSync("startDeliveryTime")
      });
    }
    this.getOrderAddr();
    //上一页为选择优惠券列表页，重新计算价格
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    this.setData({
      vipDiscount: currPage.data.vipDiscount,
      total_vip_price: currPage.data.total_vip_price,
      couponCodes: currPage.data.couponCodes,
      indChooseCoupon: currPage.data.indChooseCoupon,
      changeVipCouponMerchantCode: currPage.data.merchantCode,
    })
    if (this.data.changeVipCouponMerchantCode && this.data.changeVipCouponMerchantCode != "") {
      let temp = this.data.changeVipCouponList
      let cvc = []
      if (temp.length > 0) {
        let tempItem = {}
        tempItem.merchantCode = this.data.changeVipCouponMerchantCode
        tempItem.vipCouponAmount = this.data.vipDiscount * 100
        tempItem.vipCouponAmountYuan = this.data.vipDiscount
        tempItem.vipCouponCodes = this.data.couponCodes
        cvc.push(tempItem)
        for (let i in temp) {
          if (temp[i].merchantCode != this.data.changeVipCouponMerchantCode) {
            cvc.push(temp[i])
          }
        }
      } else {
        let tempItem = {}
        tempItem.merchantCode = this.data.changeVipCouponMerchantCode
        tempItem.vipCouponAmount = this.data.vipDiscount * 100
        tempItem.vipCouponAmountYuan = this.data.vipDiscount
        tempItem.vipCouponCodes = this.data.couponCodes
        cvc.push(tempItem)
      }
      this.setData({
        changeVipCouponList: cvc,
        isChangeVipCoupon: true,
      })
      this.updateOrder(this.data.logisticsInfos)
    } else {
      wx.hideLoading()
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /******************分割线 以下为新的********************* */

  /**
   * 获取用户地址
   */
  getUserAddr: function (init) {
    http.get(
      app.globalData.business_host + "customeraddress/default", {},
      (status, resultCode, message, data) => {
        console.log("获取默认的收货地址");
        if (data) {
          let obj = {};
          obj = data;
          obj.addrdetail = data.provinceName + data.cityName + data.areaName + data.address;
          obj.name = data.linkman;
          obj.phone = data.phone;
          app.globalData.userHarvestAddress = obj;
          this.setData({
            order_addr: obj,
            provinceCode: obj.provinceCode
          });
          //此处调接口检查配送范围
          this.getProLogisticsInfo();
        } else {
          this.updateOrder();
        }
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },


  /**
   * 获取用户购物车数据
   */
  getUserCartData: function () {
    let temp = wx.getStorageSync("cartList");
    this.setData({
      initialData: temp
    });
    this.getProductCodes();
  },

  /**
   * 获取配送范围
   */
  getProLogisticsInfo: function () {
    http.get(
      app.globalData.business_host + 'logisticstemple/getProLogisticsInfos', {
        productCodes: JSON.stringify(this.data.productCodes),
        provinceCode: this.data.provinceCode
      },
      (status, resultCode, message, data) => {
        this.setData({
          logisticsInfos: data
        })
        this.updateOrder(data);

      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: '获取数据失败！',
          icon: "none"
        })
      });
  },


  /**
   * 处理购物车数据结构,分离出要提交的购物车数据,不在配送范围的数据
   */
  updateOrder: function (addrData, memoIndex, nameIndex) {
    let hasLogi = false;
    let hasDeposit = false;
    let cartTempList = this.data.initialData;
    if (!cartTempList || cartTempList.length == 0) {
      return
    }
    let unableCartList = cartTempList;
    let orderList = [];
    let totalPrice = 0;
    let totalDiscountPrice = 0;
    let unableLogi = false;
    let calcVipCouponCarts = []
    for (let i = 0; i < cartTempList.length; i++) {
      let cartTemp = cartTempList[i];
      let unableCartListArray = [];
      unableCartList[i].unablelogisticsGoods = [];
      cartTemp.memo = (memoIndex == i ? this.data.cartMemo : cartTemp.memo);
      cartTemp.cartName = (nameIndex == i ? this.data.cartName : (cartTemp.cartName ? cartTemp.cartName : this.data.order_addr.name));
      cartTemp.cartPhone = (nameIndex == i ? this.data.cartPhone : ((cartTemp.cartPhone ? cartTemp.cartPhone : this.data.order_addr.phone)));
      cartTemp.originalPricePart = 0;
      cartTemp.logPricePart = 0;
      cartTemp.subtotalPart = 0;
      cartTemp.damagePrice = 0;
      cartTemp.discountPricePart = 0;
      cartTemp.totallogPrice = 0;
      //构建查询VIP优惠券用购物车列表 start
      let calcVipCouponCartItem = {}
      let calcVipCouponCartItemCarts = []
      calcVipCouponCartItem.storeCode = cartTemp.merchantCode

      //构建查询VIP优惠券用购物车列表 end

      // 物流商品 start 
      if (cartTemp.logisticsGoods && cartTemp.logisticsGoods.length > 0) {
        let chargeType = ""
        let logisticsPrice = ""
        let increasePrice = ""
        let basicNum = ""
        let increaseNum = ""
        let freePostageNum = ""
        let logisticsInfoList = [] //运费信息列表
        for (let j = 0; j < cartTemp.logisticsGoods.length; j++) {
          let unablelogistics = false //不配送
          let listTemp = cartTemp.logisticsGoods[j];
          listTemp.merchantCode = cartTemp.merchantCode
          listTemp.logPrice = 0;
          if (addrData && addrData.length > 0) {
            for (let s = 0; s < addrData.length; s++) {
              if (addrData[s].productCode == listTemp.productCode) {
                //areaType：3；不配送
                if (addrData[s].areaType == 3) {
                  //不配送,并且分离订单
                  unableCartListArray.push(listTemp);
                  cartTemp.logisticsGoods.splice(j, 1);
                  unableLogi = true;
                  unablelogistics = true
                  j--;
                  continue;
                } else { //配送
                  listTemp.address = this.data.order_addr.addrdetail;
                  listTemp.phone = this.data.inputPhone ? this.data.inputPhone : this.data.order_addr.phone;
                  listTemp.linkman = this.data.inputLinkMan ? this.data.inputLinkMan : this.data.order_addr.name;
                  listTemp.areaCode = app.globalData.userHarvestAddress.areaCode;
                  listTemp.areaName = app.globalData.userHarvestAddress.areaName;
                  listTemp.cityCode = app.globalData.userHarvestAddress.cityCode;
                  listTemp.cityName = app.globalData.userHarvestAddress.cityName;
                  listTemp.provinceCode = app.globalData.userHarvestAddress.provinceCode;
                  listTemp.provinceName = app.globalData.userHarvestAddress.provinceName;
                  //areaType：1；包邮
                  if (addrData[s].areaType == 1) {
                    listTemp.logisticsPrice = 0;
                    listTemp.increasePrice = 0;
                    listTemp.totalLogisticsPrice = 0;
                    listTemp.chargeType = 0;
                    listTemp.areaType = addrData[s].areaType;
                    listTemp.basicNum = 0;
                    listTemp.increaseNum = 1;
                    listTemp.freePostageNum = 0;
                  } else if (addrData[s].areaType == 2) { //areaType：2；付费配送
                    //原有运费计算
                    listTemp.logistictempCode = addrData[s].logistictempCode
                    listTemp.logisticsPrice = addrData[s].basicPrice;
                    listTemp.increasePrice = addrData[s].increasePrice;
                    listTemp.totalLogisticsPrice = addrData[s].basicPrice;
                    listTemp.chargeType = addrData[s].logisticsTemple.chargeType;
                    listTemp.areaType = addrData[s].areaType;
                    listTemp.basicNum = addrData[s].proBasicNum;
                    listTemp.increaseNum = addrData[s].increaseNum;
                    listTemp.freePostageNum = addrData[s].freePostageNum ? addrData[s].freePostageNum : 0;

                    //合并订单后运费计算
                    chargeType = addrData[s].logisticsTemple.chargeType
                    logisticsPrice = addrData[s].basicPrice
                    basicNum = addrData[s].proBasicNum
                    increasePrice = addrData[s].increasePrice
                    increaseNum = addrData[s].increaseNum
                    freePostageNum = addrData[s].freePostageNum ? addrData[s].freePostageNum : 0
                  }
                  //原有运费计算
                  listTemp.logPrice = (util.countLogisticsPrice(listTemp.chargeType, listTemp.logisticsPrice, listTemp.increasePrice, listTemp.num, listTemp.weight, listTemp.basicNum, listTemp.increaseNum, listTemp.freePostageNum)) / 100;
                  //合并订单后运费计算，相同运费模板叠加
                  let tempLogisticsInfo = {}
                  tempLogisticsInfo.logistictempCode = listTemp.logistictempCode
                  tempLogisticsInfo.chargeType = listTemp.chargeType
                  tempLogisticsInfo.logisticsPrice = listTemp.logisticsPrice
                  tempLogisticsInfo.increasePrice = listTemp.increasePrice
                  tempLogisticsInfo.num = listTemp.num
                  tempLogisticsInfo.weight = listTemp.weight
                  tempLogisticsInfo.basicNum = listTemp.basicNum
                  tempLogisticsInfo.increaseNum = listTemp.increaseNum
                  tempLogisticsInfo.freePostageNum = listTemp.freePostageNum
                  if (logisticsInfoList.length == 0) {
                    logisticsInfoList.push(tempLogisticsInfo)
                  } else {
                    let exist = false
                    for (let i in logisticsInfoList) {
                      let LogisticsInfo = logisticsInfoList[i]
                      if (LogisticsInfo.logistictempCode == listTemp.logistictempCode) {
                        exist = true
                        LogisticsInfo.num += listTemp.num
                        LogisticsInfo.weight += listTemp.weight
                      }
                    }
                    if (!exist) {
                      logisticsInfoList.push(tempLogisticsInfo)
                    }
                  }
                  orderList.push(this.createOrderList(listTemp));

                  //构建购物车记录加入查询VIP优惠券用列表
                  let calcVipCouponCartItemCartItem = {}
                  calcVipCouponCartItemCartItem.cartId = listTemp.id
                  calcVipCouponCartItemCartItem.couponIds = listTemp.couponIds
                  calcVipCouponCartItemCarts.push(calcVipCouponCartItemCartItem)
                }
              }
            }
          }

          if (memoIndex == i && this.data.cartMemo && this.data.cartMemo != "") {
            listTemp.customerOrderMemo.push(this.data.cartMemo);
          }
          if (!unablelogistics) {
            //原有运费计算
            cartTemp.logPricePart = util.accAdd(cartTemp.logPricePart, listTemp.logPrice);
            //合并订单后运费计算
            let totallogPrice = 0
            for (let i in logisticsInfoList) {
              let logisticsInfoItem = logisticsInfoList[i]
              totallogPrice += util.countLogisticsPrice(logisticsInfoItem.chargeType, logisticsInfoItem.logisticsPrice, logisticsInfoItem.increasePrice, logisticsInfoItem.num, logisticsInfoItem.weight, logisticsInfoItem.basicNum, logisticsInfoItem.increaseNum, logisticsInfoItem.freePostageNum)
            }
            cartTemp.totallogPrice = totallogPrice / 100
            cartTemp.originalPricePart = util.accAdd(cartTemp.originalPricePart, util.accMul(listTemp.displayUnitPrice, listTemp.num));
            cartTemp.discountPricePart = util.accAdd(cartTemp.discountPricePart, listTemp.displayDiscountPrice);
          }
        }
        hasLogi = true;
        unableCartList[i].unablelogisticsGoods = unableCartListArray
      }
      // 物流商品 end
      // 到店商品 start  
      if (cartTemp.serviceGoods && cartTemp.serviceGoods.length > 0) {
        for (let k = 0; k < cartTemp.serviceGoods.length; k++) {
          let listTemp = cartTemp.serviceGoods[k];
          listTemp.merchantCode = cartTemp.merchantCode
          if (memoIndex == i && this.data.cartMemo && this.data.cartMemo != "") {
            listTemp.customerOrderMemo.push(this.data.cartMemo);
          }
          orderList.push(this.createOrderList(listTemp));
          cartTemp.originalPricePart = util.accAdd(cartTemp.originalPricePart, util.accMul(listTemp.displayUnitPrice, listTemp.num));
          cartTemp.discountPricePart = util.accAdd(cartTemp.discountPricePart, listTemp.displayDiscountPrice);

          //构建购物车记录加入查询VIP优惠券用列表
          let calcVipCouponCartItemCartItem = {}
          calcVipCouponCartItemCartItem.cartId = listTemp.id
          calcVipCouponCartItemCartItem.couponIds = listTemp.couponIds
          calcVipCouponCartItemCarts.push(calcVipCouponCartItemCartItem)
        }
      }
      // 到店商品 end
      // 定金商品 start    
      if (cartTemp.depositGoods && cartTemp.depositGoods.length > 0) {
        hasDeposit = true;
        if (this.data.depositShowNamePhone.length == 0) {
          this.setData({
            ["depositShowNamePhone[0]"]: cartTemp.merchantCode
          });
        } else {
          this.setData({
            ["depositShowNamePhone[" + (this.data.depositShowNamePhone.length - 1) + "]"]: cartTemp.merchantCode
          });
        }
        for (let l = 0; l < cartTemp.depositGoods.length; l++) {
          let listTemp = cartTemp.depositGoods[l];
          listTemp.merchantCode = cartTemp.merchantCode
          if (memoIndex == i && this.data.cartMemo && this.data.cartMemo != "") {
            listTemp.customerOrderMemo.push(this.data.cartMemo);
          }

          listTemp.linkman = (nameIndex == i ? this.data.cartName : cartTemp.cartName);
          listTemp.phone = (nameIndex == i ? this.data.cartPhone : cartTemp.cartPhone);
          orderList.push(this.createOrderList(listTemp, null, true, cartTemp.merchantCode));
          cartTemp.originalPricePart = util.accAdd(cartTemp.originalPricePart, util.accMul(listTemp.displayUnitPrice, listTemp.num));
          cartTemp.discountPricePart = util.accAdd(cartTemp.discountPricePart, listTemp.displayDiscountPrice);
          cartTemp.damagePrice = util.accAdd(cartTemp.damagePrice, util.accMul(listTemp.damagePrice / 100, listTemp.num));

          //构建购物车记录加入查询VIP优惠券用列表
          let calcVipCouponCartItemCartItem = {}
          calcVipCouponCartItemCartItem.cartId = listTemp.id
          calcVipCouponCartItemCartItem.couponIds = listTemp.couponIds
          calcVipCouponCartItemCarts.push(calcVipCouponCartItemCartItem)
        }
      }
      // 定金商品 end
      // 虚拟商品 start
      if (cartTemp.virtualGoods && cartTemp.virtualGoods.length > 0) {
        for (let m = 0; m < cartTemp.virtualGoods.length; m++) {
          let listTemp = cartTemp.virtualGoods[m];
          listTemp.merchantCode = cartTemp.merchantCode
          if (memoIndex == i && this.data.cartMemo && this.data.cartMemo != "") {
            listTemp.customerOrderMemo.push(this.data.cartMemo);
          }

          listTemp.linkman = (nameIndex == i ? this.data.cartName : cartTemp.cartName);
          listTemp.phone = (nameIndex == i ? this.data.cartPhone : cartTemp.cartPhone);
          orderList.push(this.createOrderList(listTemp, true));
          cartTemp.originalPricePart = util.accAdd(cartTemp.originalPricePart, util.accMul(listTemp.displayUnitPrice, listTemp.num));
          cartTemp.discountPricePart = util.accAdd(cartTemp.discountPricePart, listTemp.displayDiscountPrice);
          cartTemp.damagePrice = util.accAdd(cartTemp.damagePrice, util.accMul(listTemp.damagePrice / 100, listTemp.num));

          //构建购物车记录加入查询VIP优惠券用列表
          let calcVipCouponCartItemCartItem = {}
          calcVipCouponCartItemCartItem.cartId = listTemp.id
          calcVipCouponCartItemCartItem.couponIds = listTemp.couponIds
          calcVipCouponCartItemCarts.push(calcVipCouponCartItemCartItem)
        }
        hasLogi = true;
      }
      // 虚拟商品 end
      cartTemp.subtotalPart = util.accSubtr(util.accAdd(cartTemp.originalPricePart, cartTemp.totallogPrice), cartTemp.discountPricePart)
      cartTemp.subtotalPartOrigin = util.accSubtr(util.accAdd(cartTemp.originalPricePart, cartTemp.totallogPrice), cartTemp.discountPricePart)
      totalPrice = util.accAdd(totalPrice, cartTemp.subtotalPart);
      totalDiscountPrice = util.accAdd(totalDiscountPrice, cartTemp.discountPricePart);
      cartTempList[i] = cartTemp;

      //构建获取VIP优惠券用购物车记录
      calcVipCouponCartItem.carts = calcVipCouponCartItemCarts
      calcVipCouponCartItem.couponCodes = []
      //获取系统默认优惠券
      let sdvcList = this.data.systemDefaultVipCouponList
      for (let k in sdvcList) {
        if (calcVipCouponCartItem.storeCode == sdvcList[k].merchantCode) {
          calcVipCouponCartItem.couponCodes = sdvcList[k].vipCouponCodes
        }
      }

      //判断是否手动修改过VIP优惠券
      let cvc = this.data.changeVipCouponList
      if (this.data.isChangeVipCoupon) {
        for (let j in cvc) {
          let cvcItem = cvc[j]
          if (cvcItem.merchantCode == calcVipCouponCartItem.storeCode) {
            calcVipCouponCartItem.couponCodes = cvcItem.vipCouponCodes
          }
        }
      }
      if (calcVipCouponCartItemCarts.length > 0) {
        calcVipCouponCarts.push(calcVipCouponCartItem)
      }
    }
    this.setData({
      showCartList: cartTempList,
      totalDiscountPrice: totalDiscountPrice,
      totalDiscountPriceOrigin: totalDiscountPrice,
      totalPrice: totalPrice,
      orderCartsList: orderList,
      unableCartsList: unableCartList,
      unableLogi: unableLogi,
      hasDeposit: hasDeposit,
      hasLogi: hasLogi,
      calcVipCouponCarts: calcVipCouponCarts,
    });
    if (memoIndex == 0 || memoIndex) {
      this.setData({
        initialData: cartTempList
      });
      wx.setStorageSync("cartList", this.data.initialData)
    }
    this.checkFreshGoods();
    if (this.data.enableMember) {
      this.calculationCartCoupon()
      wx.setStorageSync('calcVipCouponCarts', calcVipCouponCarts)
    }
    console.log("计算后的价格");
    console.log(this.data.showCartList);
  },


  /**
   * 关闭或者展示直播间
   */
  switchInventoryList: function (e) {
    console.log(e);
    if (e.currentTarget.dataset.isshow == 1) {
      this.setData({
        inventoryList: e.currentTarget.dataset.goods
      });
    } else {
      this.setData({
        inventoryList: []
      });
    }
  },


  /**
   * 获取用户选择的收获地址
   */
  getOrderAddr: function () {
    this.getUserCartData();
    this.setData({
      order_addr: app.globalData.userHarvestAddress
    });
    if (!this.data.order_addr || !this.data.order_addr.provinceCode) {
      this.getUserAddr();
    } else {
      this.setData({
        provinceCode: app.globalData.userHarvestAddress.provinceCode
      });
      //此处调接口检查配送范围
      this.getProLogisticsInfo()
      this.calculationCartCoupon()
    }
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
        wx.navigateBack({
          delta: 1
        })
      }
    })

  },

  /**配送时间选择 */
  handleChange(e) {
    let startDeliveryTime = util.tsFormatTime(new Date(e.detail.dateString).getTime(), "Y-M-D h:m");
    // console.log(startDeliveryTime);
    if (startDeliveryTime) {
      this.setData({
        startDeliveryTime: startDeliveryTime
      })
    }
  },

  /**
   * 支付第一步
   * 获取微信支付openid  
   */
  toPayMoney: function (e) {
    if (this.data.hasLogi && !this.data.order_addr.name) {
      wx.hideLoading();
      wx.showToast({
        title: '请填写收货地址',
        icon: "none"
      })
      return
    }

    if (this.data.hasDeposit && (this.data.depositShowNamePhone.length > this.data.depositOrderNamePhone)) {
      wx.hideLoading();
      wx.showModal({
        title: '请填写姓名和手机号',
        confirmText: '确定',
        content: "定金商品需要填写姓名和手机号，点击收货地址可自动更新姓名和手机号",
        showCancel: true,
        success: (result) => {

        },
      })
      return
    }
    // console.log(this.data.orderCartsList);

    //生鲜特有判断 start
    if (this.data.freshTips != "") {
      wx.hideLoading()
      wx.showModal({
        title: '温馨提示',
        confirmText: '确定',
        content: this.data.freshTips + "\r\n是否继续下单？",
        showCancel: true,
        success: (result) => {
          if (result.confirm) {
            this.getOpenId()
          }
        },
      })
      //生鲜特有判断 end
    } else {
      if (this.data.orderCartsList.length == 0 || this.data.unableLogi) {
        this.popUpHidden()
      }
      if (this.data.orderCartsList.length > 0 && !this.data.unableLogi) {
        this.getOpenId()
      }
    }
  },

  /** 
   * 支付第二步
   * 获取OpenId 
   */
  getOpenId: function () {
    //启用预充值抵扣并且预充值不为0，检查支付密码
    if (this.data.enableMember && this.data.useMemberRecharge && this.data.usableCredit > 0) {
      this.payPassword.checkPic()
    } else {
      this.goWeChatRecharge()
    }
  },

  goWeChatRecharge: function () {
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
    if (this.data.hasVirtual) {
      let flag = this.reloadOrderData();
      if (!flag) {
        return false;
      }
    }

    /**烘焙类商品编辑备注sku */
    let orderCartsList = this.data.orderCartsList;
    for (let i in orderCartsList) {
      let item = orderCartsList[i];
      if (!app.globalData.vicpalmMain) { //不同主体小程序
        if (this.data.startDeliveryTime != '') {
          // let startDeliveryTime = new Date(this.data.startDeliveryTime.replace(/-/g, '/')).getTime();
          item["startDeliveryTime"] = this.data.startDeliveryTime + ':00';
          item["endDeliveryTime"] = this.data.startDeliveryTime + ':00';
        }
      }
      if (item.customerOrderMemo.length > 0) {
        item.customerOrderMemo = item.customerOrderMemo.join('&');
      } else {
        item.customerOrderMemo = null;
      }
    }
    this.setData({
      orderCartsList: orderCartsList
    });

    //构建vip优惠券列表
    let vipCouponCodesPram = []
    if (this.data.enableMember && this.data.calcVipCouponCarts.length > 0) {
      for (let i in this.data.calcVipCouponCarts) {
        let cvcItem = this.data.calcVipCouponCarts[i]
        if (cvcItem.carts.length > 0) {
          let vipCouponCodesPramItem = {}
          vipCouponCodesPramItem.storeCode = cvcItem.storeCode
          vipCouponCodesPramItem.vipCouponCodes = cvcItem.couponCodes
          vipCouponCodesPram.push(vipCouponCodesPramItem)
        }
      }
    }

    let payTest = app.globalData.testServer; //测试服免支付
    let independentPay = app.globalData.independentPay;
    if (independentPay) {
      payTest = false
    }
    http.post(
      app.globalData.business_host + (payTest ? 'atest/cart/submitCartsPay_test' : 'cart/submitCartsPay'), {
        openId: data + "",
        body: "微信企业版小程序购物车订单付款",
        frpCode: (payTest && !independentPay ? 'ORIGINAL' : 'WEIXIN_XCX'),
        channel: independentPay ? 'channel_wechat' : 'channel_joinpay',
        appId: app.globalData.appId,
        carts: JSON.stringify(this.data.orderCartsList),
        vipCouponCodesPram: vipCouponCodesPram.length > 0 ? JSON.stringify(vipCouponCodesPram) : JSON.stringify([]),
        deductBalance: this.data.enableMember && this.data.useMemberRecharge && this.data.usableCredit > 0 ? 1 : 0,
        password: this.data.enableMember && this.data.useMemberRecharge && this.data.usableCredit > 0 ? this.data.payPwd : undefined,
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        if (payTest) {
          wx.removeStorageSync("cartList_final");
          wx.showToast({
            title: '支付成功',
            icon: "none"
          })
          wx.removeStorageSync("cartList_final");
          wx.redirectTo({
            url: '/pages/order/goods_opt_status/buy_success?type=' + (this.data.hasLogi ? 'tabThrees' : 'tabTwos'),
          })
        } else {
          wx.removeStorageSync("cartList_final");
          this.weChatRecharge(data.params, data.orderNo);
        }
      },
      (status, resultCode, message, data) => {
        if (message == "购物车状态异常" && resultCode == "status_error") {
          wx.showModal({
            confirmText: '确定',
            content: '请勿重复提交',
            showCancel: false,
            success: (result) => {
              if (result.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            },
            title: '购物车状态异常',
          })
        } else {
          wx.showModal({
            confirmText: '确定',
            // content: "请重新修改购买数量",
            showCancel: false,
            success: (result) => {
              if (result.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            },
            title: message,
          })
        }
        wx.hideLoading();
      }
    );
  },



  /**
   * 生成订单所需要的数据
   */
  createOrderList: function (data, isVirtual, isDeposit, merchantCode) {
    let temp = {};
    if (data) {
      temp.couponIds = data.couponIds;
      temp.id = data.id;
      temp.eventCode = data.eventCode;
      temp.ddzt = data.ddzt;
      temp.skuProperties = data.skuProperties;
      temp.onshelfCode = data.onshelfCode;
      temp.num = data.num;
      temp.lat = data.lat;
      temp.lng = data.lng;
      temp.phone = data.phone;
      temp.linkman = data.linkman;
      if (isVirtual) {
        //虚拟类商品
      } else if (isDeposit) {
        if (temp.phone && temp.linkman && this.data.depositOrderNamePhone.length == 0) {
          this.setData({
            ["depositOrderNamePhone[0]"]: merchantCode
          });
        } else if (temp.phone && temp.linkman && this.data.depositOrderNamePhone.length > 0) {
          this.setData({
            ["depositOrderNamePhone[" + (this.data.depositOrderNamePhone.length - 1) + "]"]: merchantCode
          });
        } else {
          for (let i = 0; i < this.data.depositOrderNamePhone.length; i++) {
            if (this.data.depositOrderNamePhone[i] == merchantCode) {
              this.data.depositOrderNamePhone.splice(i, 1);
              i--;
              break;
            }
          }
          this.setData({
            depositOrderNamePhone: this.data.depositOrderNamePhone
          })
        }
      } else {
        temp.provinceCode = data.provinceCode;
        temp.provinceName = data.provinceName;
        temp.cityCode = data.cityCode;
        temp.cityName = data.cityName;
        temp.areaCode = data.areaCode;
        temp.areaName = data.areaName;
        temp.address = data.ddzt ? data.ddzt_addr : data.address;
        temp.addressType = data.addressType;
      }
      temp.productCode = data.productCode;
      temp.customerOrderMemo = data.customerOrderMemo ? data.customerOrderMemo : undefined;
      temp.storeCode = data.merchantCode
    }
    return temp;
  },


  /**
   * 选择收货地址
   */
  chooseUserAddress: function () {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/address/addr_list/addr_list?from_confirm_order=true',
    })
  },

  /**防止滑动冒泡 */
  doNotMove: function () {
    return false;
  },

  /**
   * 轮询结算单
   */
  pollingOrder: function (code) {
    http.get(
      app.globalData.host + 'biz/userpaypackage/info', {
        code: code,
      },
      (status, resultCode, message, data) => {
        if (data.status == 2) {
          //支付成功
          wx.showToast({
            title: '支付成功',
            icon: "none"
          })
          wx.redirectTo({
            url: '/pages/order/goods_opt_status/buy_success?type=' + (this.data.hasLogi ? 'tabThrees' : 'tabTwos'),
          })
          return
        } else if (data.status == 3) {
          wx.showToast({
            title: '支付失败',
            icon: "none"
          })
          de
          wx.navigateBack({
            delta: 1
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
   * 地图导航
   */
  mapNavigation: function (e) {
    var lat = e.currentTarget.dataset.lat;
    var lng = e.currentTarget.dataset.lng;
    var name = e.currentTarget.dataset.name;
    var address = e.currentTarget.dataset.address;
    if (lat && lng) {
      wx.openLocation({
        latitude: lat,
        longitude: lng,
        name: name,
        address: address
      })
    } else {
      wx.showToast({
        title: '企业未设置定位',
        icon: "none"
      })
    }
  },

  /** 检查生鲜商品 */
  checkFreshGoods: function () {
    http.get(
      app.globalData.business_host + "/product/productMemo", {
        productCodes: JSON.stringify(this.data.productCodes),
      },
      (_status, _resultCode, _message, _data) => {
        this.setData({
          freshTips: _data,
        })
      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

  /**
   * 获取收货人姓名
   */
  getNameInputVal: function (e) {
    var val = e.detail.value; //获取输入的值
    this.setData({
      inputLinkMan: val
    })
    console.log(this.data.inputLinkMan);
  },
  /**
   * 获取手机号
   */
  getPhoneInputVal: function (e) {
    var val = e.detail.value; //获取输入的值
    this.setData({
      inputPhone: val
    })
    console.log(this.data.inputPhone);
  },


  /**
   * 购物车提交的数据重新刷新
   */
  reloadOrderData: function () {
    if (!this.data.order_addr.phone && !this.data.order_addr.name) {
      if (!this.data.inputLinkMan) {
        wx.showToast({
          title: '请填写联系人',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return false;
      }
      if (this.data.inputLinkMan && this.data.inputLinkMan.trim() == "") {
        wx.showToast({
          title: '不能全为空格',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return false;
      }
      if (!this.data.inputPhone) {
        wx.showToast({
          title: '请填写手机号',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return false;
      }
      if (!regExp.phone(this.data.inputPhone)) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return false;
      }
    }


    return true;
  },

  /**
   * 获取productCode
   */
  getProductCodes: function () {
    let cartTempList = this.data.initialData;
    for (let i = 0; i < cartTempList.length; i++) {
      let cartTemp = cartTempList[i];
      if (cartTemp.logisticsGoods && cartTemp.logisticsGoods.length > 0) {
        for (let j = 0; j < cartTemp.logisticsGoods.length; j++) {
          let listTemp = cartTemp.logisticsGoods[j];
          this.data.productCodes.push(listTemp.productCode);
        }
      }
    }
    this.setData({
      productCodes: this.data.productCodes
    })
  },

  /**
   * 输入备注
   */
  inputCartMemo: function (e) {
    if (e.detail.value.length > 50) {
      wx.showToast({
        title: '备注超过50字',
        icon: "none"
      })
    } else {
      this.setData({
        cartMemo: e.detail.value,
        cartMemoLength: e.detail.value.length
      });
    }

  },

  /**
   * 显示或关闭弹出层
   */
  switchMemoLay: function (e) {
    if (!e) {
      this.setData({
        showMemoLay: false
      });
      return
    }
    if (e.currentTarget.dataset.flag == 1) {
      this.setData({
        showMemoLay: true,
        cartMemo: null
      });
    } else {
      this.setData({
        showMemoLay: false
      });
      return
    }

    if (e.currentTarget.dataset.index == 0 || e.currentTarget.dataset.index) {
      this.setData({
        memoIndex: e.currentTarget.dataset.index
      });
    }
  },

  /**
   * 弹出或关闭名字弹层
   */
  switchNameLay: function (e) {
    if (!e) { //点击完成
      if (!this.data.cartName) {
        wx.showToast({
          title: '请填写姓名',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return false;
      } else if (this.data.cartName && this.data.cartName.trim() == "") {
        wx.showToast({
          title: '不能全为空格',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return false;
      } else if (!this.data.cartPhoneTemp) {
        wx.showToast({
          title: '请填写手机号',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return false;
      } else if (!regExp.phone(this.data.cartPhoneTemp)) {
        wx.showToast({
          title: '手机号码格式错误',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return false;
      }
      this.setData({
        showNameLay: false,
        cartPhone: this.data.cartPhoneTemp,
        cartPhoneTemp: "",
      });
      return
    }
    if (e.currentTarget.dataset.flag == 1) {
      this.setData({
        showNameLay: true,
        cartName: this.data.initialData[e.currentTarget.dataset.index].cartName ? this.data.initialData[e.currentTarget.dataset.index].cartName : null,
        cartPhone: this.data.initialData[e.currentTarget.dataset.index].cartPhone ? this.data.initialData[e.currentTarget.dataset.index].cartPhone : null
      });
      console.log(this.data.initialData[e.currentTarget.dataset.index].cartName);
      console.log(this.data.initialData[e.currentTarget.dataset.index].cartPhone);
    } else {
      this.setData({
        showNameLay: false
      });
      return
    }

    if (e.currentTarget.dataset.index == 0 || e.currentTarget.dataset.index) {
      this.setData({
        nameIndex: e.currentTarget.dataset.index
      });
    }
  },

  /**
   * 输入虚拟类商品收件人姓名
   */
  inputCartName: function (e) {
    if (e.detail.value.length > 20) {
      wx.showToast({
        title: '姓名超过20字',
        icon: "none"
      })
    } else {
      this.setData({
        cartName: e.detail.value,
        cartNameLength: e.detail.value.length
      });
    }

  },

  /**
   * 输入虚拟类商品收件人电话
   */
  inputCartPhone: function (e) {
    if (e.detail.value.length > 11) {
      wx.showToast({
        title: '手机号超长',
        icon: "none"
      })
    } else {
      this.setData({
        cartPhoneTemp: e.detail.value
      });
    }

  },

  /**
   * 确认备注完成
   */
  sureMemoUpdate: function () {
    wx.showLoading({
      title: '数据更新中',
      mask: true
    })
    let index = this.data.memoIndex;
    let cartTemp = this.data.initialData[index];
    if (cartTemp) {
      this.updateOrder(this.data.logisticsInfos, this.data.memoIndex);
      this.switchMemoLay();
      wx.hideLoading();
    } else {
      this.switchMemoLay();
      wx.hideLoading();
    }
  },

  /**
   * 确认姓名完成
   */
  sureNameUpdate: function () {
    // wx.showLoading({
    //   title: '数据更新中',
    //   mask: true
    // })
    let index = this.data.nameIndex;
    let cartTemp = this.data.initialData[index];
    if (cartTemp) {
      if (regExp.phone(this.data.cartPhoneTemp)) {
        this.setData({
          cartPhone: this.data.cartPhoneTemp
        })
      }
      if (!this.data.cartPhoneTemp) {
        this.setData({
          cartPhoneTemp: this.data.cartPhone,
        })
      }
      this.updateOrder(null, null, this.data.nameIndex);
      this.switchNameLay();
    } else {
      this.switchNameLay();
    }
  },

  /** 使用会员预充值 */
  useMemberRecharge: function () {
    let useMemberRecharge = !this.data.useMemberRecharge
    let totalPrice = this.data.totalPrice
    if (useMemberRecharge) {
      totalPrice = util.accSubtr(totalPrice, this.data.usableCredit)
    } else {
      totalPrice = util.accAdd(totalPrice, this.data.usableCredit)
    }
    this.setData({
      useMemberRecharge: useMemberRecharge,
      totalPrice: totalPrice,
    })
  },

  /** 前往预充值使用情况 */
  goToCreditUsage: function () {
    wx.navigateTo({
      url: '/expandPackage/pages/member/credit/creditUsage/creditUsage',
    })
  },

  /** 跳转优惠券列表页 */
  goToCouponList: function (e) {
    let item = e.currentTarget.dataset.item
    wx.setStorageSync('vipCouponList', item.couponList)
    wx.setStorageSync('vipCouponAmountYuan', item.vipCouponAmountYuan)
    wx.navigateTo({
      url: '/expandPackage/pages/member/coupon/coupon?merchantCode=' + item.merchantCode + "&pageFrom=confirm&topTips=false&couponCodes=" + JSON.stringify(item.vipCouponCodes),
    })
  },

  /** 验证支付密码 */
  verifyPic: function (e) {
    this.setData({
      payPwd: e.detail,
    })
    this.goWeChatRecharge()
  },

  /** 隐藏显示弹窗 */
  popUpHidden: function () {
    this.setData({
      popupHidden: !this.data.popupHidden,
    })
  },

  /** 重选收货地址 */
  changeAddr: function () {
    this.popUpHidden()
    this.chooseUserAddress()
  },

  /** 继续支付 */
  continuePay: function () {
    this.getOpenId()
  },

  /** 计算购物车优惠券 */
  calculationCartCoupon: function () {
    http.get(
      app.globalData.vip_host + "vip/coupon/calculationCartCoupon", {
        userCode: wx.getStorageSync('userCode'),
        operate: this.data.isChangeVipCoupon ? 1 : 0,
        param: JSON.stringify(this.data.calcVipCouponCarts),
        provinceCode: this.data.order_addr && this.data.order_addr.provinceCode && this.data.order_addr.provinceCode != "" ? this.data.order_addr.provinceCode : undefined,
      },
      (_status, _resultCode, _message, _data) => {
        let scl = this.data.showCartList
        let totalPrice = 0
        let usableCredit = 0
        let enableMemberRecharge = false //启用会员预付款功能
        for (let i in scl) {
          let sclItem = scl[i]
          for (let j in _data) {
            let temp = _data[j]
            if (temp.storeCode == sclItem.merchantCode) {
              sclItem.useVipCoupon = true
              if (temp.couponPrice == 0 && temp.couponList.length == 0) {
                sclItem.useVipCoupon = false
              }
              if (sclItem.depositGoods.length > 0 || sclItem.logisticsGoods.length > 0 || sclItem.serviceGoods.length > 0 || sclItem.virtualGoods.length > 0) {
                sclItem.vipCouponAmount = temp.couponPrice
                sclItem.vipCouponAmountYuan = temp.couponPriceYuan
                sclItem.vipCouponCodes = temp.currentUseVipCouponCodes
                sclItem.couponList = temp.couponList
                sclItem.subtotalPart = util.accSubtr(sclItem.subtotalPartOrigin, temp.couponPriceYuan)
                totalPrice = util.accAdd(totalPrice, sclItem.subtotalPart);
              }
              //未启用会员预付款功能时判断只要有一家会员店立即启用
              if (!enableMemberRecharge) {
                enableMemberRecharge = temp.isVipStore
              }

              //统计预充值可抵扣余额
              usableCredit = util.accAdd(usableCredit, temp.preChangeInfo.allowDeductionBalanceYuan)
            }
          }
        }
        totalPrice = util.accSubtr(totalPrice, usableCredit)
        let cvc = this.data.calcVipCouponCarts
        let sdvc = []
        let unableList = []
        let ableList = []
        let totalCouponPrice = 0
        let totalDiscountPrice = 0
        let totalPreChangeBalance = 0
        for (let k in _data) {
          let tempItem = _data[k]
          for (let l in cvc) {
            let tempCvcItem = cvc[l]
            if (tempCvcItem.storeCode == tempItem.storeCode) {
              tempCvcItem.couponCodes = tempItem.currentUseVipCouponCodes
            }
          }

          let sdvcItem = {}
          sdvcItem.merchantCode = tempItem.storeCode
          sdvcItem.vipCouponAmount = tempItem.couponPrice
          sdvcItem.vipCouponAmountYuan = tempItem.couponPriceYuan
          sdvcItem.vipCouponCodes = tempItem.currentUseVipCouponCodes
          sdvc.push(sdvcItem)
          totalCouponPrice = totalCouponPrice + tempItem.couponPrice

          let usageInfo = {}
          usageInfo.storeHeadImg = tempItem.preChangeInfo.merchantHeadImg
          usageInfo.storeName = tempItem.preChangeInfo.merchantName
          usageInfo.storeCode = tempItem.storeCode
          usageInfo.balance = tempItem.preChangeInfo.totalPreChangeBalanceYuan
          usageInfo.userIsCurrentStoreVip = tempItem.userIsCurrentStoreVip
          if (tempItem.isVipStore) {
            if (tempItem.preChangeInfo.totalPreChangeBalanceYuan == "0") {
              usageInfo.cause = "余额不足"
              unableList.push(usageInfo)
            } else {
              if (tempItem.preChangeInfo.allowDeductionBalanceYuan == "0") {
                usageInfo.cause = "商品不可用预充值支付"
                unableList.push(usageInfo)
              } else {
                usageInfo.amount = tempItem.preChangeInfo.allowDeductionBalanceYuan
                ableList.push(usageInfo)
              }
            }
            totalPreChangeBalance = totalPreChangeBalance + tempItem.preChangeInfo.totalPreChangeBalance
          }
          totalDiscountPrice = util.accAdd(this.data.totalDiscountPriceOrigin, util.priceSwitch(totalCouponPrice))
        }
        this.setData({
          showCartList: scl,
          totalPrice: totalPrice,
          usableCredit: usableCredit,
          enableMemberRecharge: enableMemberRecharge,
          useMemberRecharge: usableCredit > 0 ? true : false,
          calcVipCouponCarts: cvc,
          systemDefaultVipCouponList: this.data.isChangeVipCoupon ? this.data.systemDefaultVipCouponList : sdvc,
          unableList: unableList,
          ableList: ableList,
          totalDiscountPrice: totalDiscountPrice,

        })
        if (this.data.changeVipCouponMerchantCode && this.data.changeVipCouponMerchantCode != "") {
          this.changeVipCoupon()
        }
      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

  /** 改变VIP优惠券 */
  changeVipCoupon: function () {
    let cvc = this.data.changeVipCouponList
    if (cvc.length > 0) {
      let scl = this.data.showCartList
      let totalPrice = 0
      for (let i in scl) {
        let sclItem = scl[i]
        let change = false //是否主动选择修改过VIP优惠券
        let changeVipCoupon = ""
        for (let j in cvc) {
          if (cvc[j].merchantCode == sclItem.merchantCode) {
            change = true
            changeVipCoupon = cvc[j]
          }
        }
        if (change) {
          sclItem.useVipCoupon = true
          sclItem.vipCouponAmount = changeVipCoupon.vipCouponAmount
          sclItem.vipCouponAmountYuan = changeVipCoupon.vipCouponAmountYuan
          sclItem.vipCouponCodes = changeVipCoupon.vipCouponCodes
          sclItem.subtotalPart = util.accSubtr(sclItem.subtotalPartOrigin, changeVipCoupon.vipCouponAmountYuan)
          totalPrice = util.accAdd(totalPrice, sclItem.subtotalPart);
        } else {
          totalPrice = util.accAdd(totalPrice, sclItem.subtotalPart);
        }
      }
      totalPrice = totalPrice - this.data.usableCredit
      this.setData({
        showCartList: scl,
        totalPrice: totalPrice,
      })
      wx.hideLoading()
    }
  },
})