// pages/tabBar_index/business_goods/business_goods.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capsuleTop: 0,
    networkType: true, //监听网络连接与断开
    tabBarActive: 1,
    tabbar: app.globalData.tabBar,
    merchant_code: "", //商家code
    goodsTagList: [], //商品分类列表
    goodsTagSelectedIndex: 0, //选中商品分类下标
    goodsCategoryCode: "", //选中商品分类编号
    business_activity_list: [],
    pageIndex: 1,
    pageIndex_add: 0, //二维数组下标
    goodsTypeList: [], //商品类型列表
    goodsTypeCode: "", //选中商品类型编号
    goodsTypeSelectedIndex_simply: 0, //选中商品类型下标
    goodsSortSelectedIndex: 1, //点击商品排序下标
    hotSortAsc: true, //销量排序是否为升序
    priceSortAsc: true, //价格排序是否为升序
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
    cartDisplay: false, //购物车是否显示
    quantity: 1, //加购数量
    couponIdList: [], //优惠券id数组
    couponList: "", //优惠券id数组
    chooseSkus: [], //已选择的规格
    freePostageNum: 0,
    typeCodes: "", //玩法集合
    iPhone_X: app.globalData.iPhone_X,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    let mCode = app.globalData.defaultMerchantCode;
    if (options.merchantCode) { //企业code，必传
      mCode = options.merchantCode
    } else {
      if (app.globalData.vicpalmMain) {
        let mc = wx.getStorageSync('merchant_code')
        if (mc && mc != "") {
          mCode = mc
        } else {
          wx.setStorageSync('merchant_code', mCode)
        }
      }
    }
    this.setData({
      merchant_code: mCode
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
    let that = this;
    if (wx.getStorageSync('user')) {
      /**获取购物车数量 */
      app.loadCartNum(function (tabBar) {
        that.setData({
          tabbar: tabBar
        });
      })
    }
    //跳转新商家 start
    if (this.data.merchant_code) {
      wx.pageScrollTo({
        scrollTop: 0,
      })
      this.getGoodsType()
      this.getBusinessActivity()
    }
    //跳转新商家 end
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
    if (!this.data.loadAll) {
      this.setData({
        pageIndex: this.data.pageIndex + 1,
        pageIndex_add: this.data.pageIndex_add + 1
      })
      this.getBusinessActivity();
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

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
        console.log(_data.typeList)
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

    let sortOrder = "asc"
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

    if (this.data.sortTypeCode == "time") {
      sortOrder = "desc"
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
        sortOrder: sortOrder,
        excludedProductTypeCodes: JSON.stringify(["estate"]),
      },
      (status, resultCode, message, data) => {
        // console.log(data.list)
        if (data.list.length < 1) {
          this.setData({
            loadAll: true,
          })
          wx.hideLoading();
        }
        this.setData({
          business_activity_list_new: data.list
        });
        this.handlerData();
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
      obj.pic = ""
      if (list.fileJson != "") {
        obj.pic = JSON.parse(list.fileJson).illustration ? JSON.parse(list.fileJson).illustration[0] : "";
      }
      if (obj.pic) {
        obj.type = util.getUrlType(JSON.parse(list.fileJson).illustration[0])
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

  /** 点击商品分类 */
  clickGoodsTag: function (e) {
    this.setData({
      goodsTagSelectedIndex: e.currentTarget.dataset.index,
      goodsCategoryCode: e.currentTarget.dataset.item.code,
      pageIndex: 1,
      pageIndex_add: 0,
      business_activity_list: "",
    })
    this.getBusinessActivity()
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
        wx.showToast({
          title: message,
          icon: "none"
        })
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
   * 选中后匹配sku
   */
  matchingSku: function () {
    console.log("选中后匹配sku")
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

  /** 显示购物车选项 */
  showCart: function () {
    this.setData({
      cartDisplay: !this.data.cartDisplay,
      isShareGoods: !this.data.isShareGoods,
    })
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
        refUserCode: this.data.activityType == "inreward" ? this.data.clerk_code : app.globalData.higherLevelCode,
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: message,
        })
        this.showCart()
      },
      (status, resultCode, message, data) => {}
    );
  },

  /** 选择商品排序 */
  changeGoodsSort: function (e) {
    let index = e.currentTarget.dataset.index
    let sortTypeCode = index == 2 ? "hot" : index == 3 ? "price" : index == 4 ? "time" : ""
    this.setData({
      goodsSortSelectedIndex: index,
      hotSortAsc: index == 2 ? !this.data.hotSortAsc : this.data.hotSortAsc,
      priceSortAsc: index == 3 ? !this.data.priceSortAsc : this.data.priceSortAsc,
      sortTypeCode: sortTypeCode,
    })
    this.getBusinessActivity()
  },

  /**
   * 跳转到商品详情
   */
  jumpBusinessActivityDetail: function (e) {
    wx.navigateTo({
      url: "/pages/tabBar_index/business_detail/business_detail?code=" + e.currentTarget.dataset.item.code + '&higherLevelCode=' + app.globalData.higherLevelCode + "&activityType=" + e.currentTarget.dataset.item.typeCode,
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
            // this.data.specList[key].productSpecs[j].lock = 0;
            // this.data.chooseSkus[key] = {};
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
})