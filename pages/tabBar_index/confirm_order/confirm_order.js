// miniprogram/pages/tabBar_index/confirm_order/confirm_order.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
var RSAKey = require('../../../utils/rsa-client.js');
var base64 = require('../../../utils/base64.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: "", //单价
    original_price: "", //原来的价格
    discount_price: 0, //所有折扣值
    total_price: "", //总共的价格
    type_code: "", //活动类别
    business_detail: "",
    order_addr: "", //收获地址
    quantity: 1,
    order_message: "",
    couponIdList: [], //优惠券id数组
    couponList: "", //优惠券id数组
    iPhone_X: app.globalData.iPhone_X,
    optional_permissions: true,
    forbid_opt: false,
    operation: "", //优惠券操作方式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.price) {
      this.setData({
        price: options.price
      });
    }
    // if (options.business_detail) {
    //   this.setData({
    //     business_detail: JSON.parse(options.business_detail)
    //   });
    // }
    if (options.code) {
      this.setData({
        eventCode: options.code + ""
      });
    }
    if (options.type_code) {
      this.setData({
        type_code: options.type_code
      });
    }

    this.setData({
      iPhone_X: app.globalData.iPhone_X
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.judgeActivity();
    this.setData({
      total_price: this.data.price * this.data.quantity
    });


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getOrderAddr();
    if (app.globalData.confirmOrder) {
      app.globalData.confirmOrder = false;
      wx.navigateBack({
        delta: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    app.globalData.confirmOrder = false;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }

  /**
   * 判断是什么类型活动，并且调相应的接口
   */
  judgeActivity: function() {
    if (this.data.type_code == "discount") {
      this.getBusinessDetailDiscountevent();
    } else if (this.data.type_code == "reward") {
      this.getBusinessDetailReward();
    }
  },

  /**
   * 获取活动商品详情Discountevent
   */
  getBusinessDetailDiscountevent() {
    http.get(
      app.globalData.business_host + "discountevent/info", {
        eventCode: this.data.eventCode
      },
      (status, resultCode, message, data) => {
        this.setData({
          business_detail: this.handleBusinessDetail(data)
        });
        if (this.data.business_detail.product.typeCode == "service") {
          this.setData({
            optional_permissions: false
          });
        }
        this.getDefaultAaddr();
        if (this.data.type_code != "Original") {
          this.getCouponList();
        }
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },


  /**
   * 获取活动商品详情reward
   */
  getBusinessDetailReward() {
    http.get(
      app.globalData.business_host + "rewardevent/info", {
        eventCode: this.data.eventCode
      },
      (status, resultCode, message, data) => {
        this.setData({
          business_detail: this.handleBusinessDetail(data)
        });
        if (this.data.business_detail.product.typeCode == "service") {
          this.setData({
            optional_permissions: false
          });
        }
        this.getDefaultAaddr();
        if (this.data.type_code != "Original") {
          this.getCouponList();
        }
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 处理取出来的互动详情
   */
  handleBusinessDetail: function(obj) {
    obj.fileJson = JSON.parse(obj.fileJson);
    obj.illustration = obj.fileJson.illustration;
    obj.product.price = util.priceSwitch(obj.product.price);
    obj.discountPrice = util.priceSwitch(obj.discountPrice);
    obj.dis = app.getDisance(obj.merchant.lat, obj.merchant.lng);

    return obj
  },

  /**
   * 选择收货地址
   */
  chooseUserAddress: function() {
    if (this.data.business_detail.product.typeCode == "service") {
      wx.showModal({
        title: '该商品为到店商品',
        content: '到店商品无法修改收货地址，请到店消费',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/tabBar_user_center/address/addr_list/addr_list?from_confirm_order=true',
    })
  },

  /**
   * 获取用户选择的收获地址
   */
  getOrderAddr: function() {
    this.setData({
      order_addr: app.globalData.userHarvestAddress
    });
  },


  /**
   * 获取用户默认的收货地址 /customeraddress/default
   */
  getDefaultAaddr: function() {

    if (this.data.business_detail.product.typeCode == "service") {

      let obj = {};
      obj.addrdetail = this.data.business_detail.merchant.addr;
      obj.name = "";
      obj.phone = "";
      app.globalData.userHarvestAddress = obj;
      this.setData({
        order_addr: app.globalData.userHarvestAddress
      });
      wx.hideLoading()
      return
    } else {
      http.get(
        app.globalData.business_host + "customeraddress/default", {},
        (status, resultCode, message, data) => {
          console.log("获取默认的收货地址");
          if (data) {
            let obj = {};
            obj.addrdetail = data.provinceName + data.cityName + data.areaName + data.address;
            obj.name = data.linkman;
            obj.phone = data.phone;
            app.globalData.userHarvestAddress = obj;
            this.setData({
              order_addr: app.globalData.userHarvestAddress
            });
          }
          console.log(this.data.order_addr);
          wx.hideLoading()
        },
        (status, resultCode, message, data) => {
          wx.hideLoading()
        }
      );
    }

  },

  /***
   * 减少购买数量
   */
  delQuantity: function() {
    this.setData({
      quantity: this.data.quantity > 1 ? this.data.quantity - 1 : 1
    })
    if (this.data.operation == "add") {
      this.setData({
        total_price: (this.data.price * this.data.quantity - this.data.discount_price).toFixed(2)
      })
    } else {
      this.setData({
        total_price: ((this.data.price - this.data.discount_price) * this.data.quantity).toFixed(2)
      })
    }


  },

  /***
   * 增加购买数量
   */
  addQuantity: function() {
    this.setData({
      quantity: this.data.quantity <= 999 ? this.data.quantity + 1 : 999
    })
    if (this.data.operation == "add") {
      this.setData({
        total_price: (this.data.price * this.data.quantity - this.data.discount_price).toFixed(2)
      })
    } else {
      this.setData({
        total_price: ((this.data.price - this.data.discount_price) * this.data.quantity).toFixed(2)
      })
    }

  },

  /**
   * 编辑商家留言
   */
  inputCustomOrderMessage: function(e) {
    this.setData({
      order_message: e.detail.value
    });
    console.log("用户输入留言" + this.data.order_message);
  },

  /**
   * 计算优惠券折扣 value
   */
  countSingleDiscount: function(couponList) {
    for (let i = 0; i < couponList.length; i++) {
      this.setData({
        discount_price: this.data.discount_price + (parseInt(couponList[i].value) / 100)
      });
    }
    this.setData({
      total_price: (this.data.total_price - this.data.discount_price).toFixed(2)
    });

  },


  /**
   * 提交分享折扣龙订单接口 typeCode=discount  /discountevent/newOrder
   * price	int	商品单价
     num	int	购买数量
     totalPrice	float	总价
     address	varchar	送货地址
     phone	varchar	联系电话
     linkman	varchar	联系人
     beginTime	datetime	下单时间
     customerOrderMemo	varchar	客户备注
   */
  newOrderDiscont: function() {
    http.post(
      app.globalData.business_host + 'discountevent/newOrder', {
        inviteCode: app.globalData.higherLevelCode,
        eventCode: this.data.business_detail.code,
        price: this.data.price,
        num: this.data.quantity,
        address: this.data.order_addr.addrdetail,
        phone: this.data.order_addr.phone,
        linkman: this.data.order_addr.name,
        customerOrderMemo: this.data.order_message,
        productCode: this.data.business_detail.product.code,
        userCode: wx.getStorageSync('user').userCode,
        couponIds: JSON.stringify(this.data.couponIdList)
      },
      (status, resultCode, message, data) => {
        app.globalData.confirmOrder = true;
        wx.hideLoading();
        console.log("下单完成")
        console.log(data)
        if (data) {
          wx.navigateTo({
            url: '/pages/order/detail/order_details?orderId=' + data,
          })
        }

      },
      (status, resultCode, message, data) => {
        app.globalData.confirmOrder = true;
        if (resultCode == "repeated_error") {
          wx.showModal({
            title: message,
            content: '',
          })
        }
        wx.hideLoading();
        console.log("下单失败");
      }
    );
  },


  /**
   * 提交分享返利龙订单接口 typeCode=reward  /rewardevent/newOrder
   * price	int	商品单价
     num	int	购买数量
     totalPrice	float	总价
     address	varchar	送货地址
     phone	varchar	联系电话
     linkman	varchar	联系人
     customerOrderMemo	varchar	客户备注
   */
  newOrderReward: function() {
    http.post(
      app.globalData.business_host + 'rewardevent/newOrder', {
        inviteCode: app.globalData.higherLevelCode,
        eventCode: this.data.business_detail.code,
        price: this.data.price,
        num: this.data.quantity,
        address: this.data.order_addr.addrdetail,
        phone: this.data.order_addr.phone,
        linkman: this.data.order_addr.name,
        customerOrderMemo: this.data.order_message,
        productCode: this.data.business_detail.product.code,
        userCode: wx.getStorageSync('user').userCode,
        couponIds: JSON.stringify(this.data.couponIdList)
      },
      (status, resultCode, message, data) => {
        app.globalData.confirmOrder = true;
        wx.hideLoading();
        console.log("下单完成")
        console.log(data)
        if (data) {
          wx.navigateTo({
            url: '/pages/order/detail/order_details?orderId=' + data,
          })
        }


      },
      (status, resultCode, message, data) => {
        app.globalData.confirmOrder = true;
        if (resultCode == "repeated_error") {
          wx.showModal({
            title: message,
            content: '',
          })
        }
        wx.hideLoading();
        console.log("下单失败");
      }
    );

  },

  /**
   * 提交原价订单接口  typeCode=Original /customerorder/new
   * price	int	商品单价
     num	int	购买数量
     totalPrice	float	总价
     address	varchar	送货地址
     phone	varchar	联系电话
     linkman	varchar	联系人
     beginTime	datetime	下单时间
     customerOrderMemo	varchar	客户备注
   */
  newOrderOriginal: function() {
    http.post(
      app.globalData.business_host + 'customerorder/new', {
        price: this.data.price,
        num: this.data.quantity,
        address: this.data.order_addr.addrdetail,
        phone: this.data.order_addr.phone,
        linkman: this.data.order_addr.name,
        customerOrderMemo: this.data.order_message,
        productCode: this.data.business_detail.product.code,
        userCode: wx.getStorageSync('user').userCode,
        couponIds: JSON.stringify(this.data.couponIdList)
      },
      (status, resultCode, message, data) => {
        app.globalData.confirmOrder = true;
        wx.hideLoading();
        console.log("下单完成")
        console.log(data)
        if (data) {
          wx.navigateTo({
            url: '/pages/order/detail/order_details?orderId=' + data,
          })
        }

      },
      (status, resultCode, message, data) => {
        app.globalData.confirmOrder = true;
        if (resultCode == "repeated_error") {
          wx.showModal({
            title: message,
            content: '',
          })
        }
        wx.hideLoading();
        console.log("下单失败");
      }
    );
  },


  /***
   * 提交订单
   */
  submissionOrder: function() {
    wx.showLoading({
      title: '提交中',
      mask: true,
    })
    if (!this.data.order_addr) {
      wx.hideLoading();
      wx.showToast({
        title: '请填写收货地址',
        icon: "none"
      })
      return
    }
    if (this.data.type_code == "Original") {
      this.newOrderOriginal();
    } else if (this.data.type_code == "reward") {
      this.newOrderReward();
    } else {
      this.newOrderDiscont();
    }
  },


  /**
   * 获取优惠券
   */
  getCouponList: function() {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    http.get(
      app.globalData.business_host + "coupon/myList", {
        productCode: this.data.business_detail.productCode
      },
      (status, resultCode, message, data) => {
        console.log("获取可用优惠券");
        if (data.length > 0) {
          this.setData({
            operation: data[0].operation,
          })
        } else {

        }
        this.setData({
          couponList: data,
          couponIdList: this.handleCouponList(data)
        });
        this.countSingleDiscount(this.data.couponList);
        console.log(this.data.couponList);
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
  handleCouponList: function(array) {
    let obj = [];
    for (let i = 0; i < array.length; i++) {
      obj = obj.concat(array[i].id)
    }
    return obj;
  },



  /**
   * 地图导航
   */
  mapNavigation: function() {
    var lat = this.data.business_detail.merchant.lat;
    var lng = this.data.business_detail.merchant.lng;
    if (lat && lng) {
      wx.openLocation({
        latitude: lat,
        longitude: lng,
        name: this.data.business_detail.merchant.addr,
        address: this.data.business_detail.merchant.addr
      })
    } else {
      wx.showToast({
        title: '商家未设置定位',
        icon: "none"
      })
    }
  },

})