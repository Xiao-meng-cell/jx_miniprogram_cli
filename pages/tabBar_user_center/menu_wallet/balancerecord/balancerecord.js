// pages/tabBar_user_center/menu_wallet/balancerecord/balancerecord.js
const app = getApp();
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    networkType: true, //监听网络连接与断开
    moneyType: '', //充值"type_recharge";消费"type_pay"; 收入"type_income"; 退款"type_refund"; 提现"type_withdraw";
    typeStatus: 3,
    date1: util.tsFormatTime((Date.now() - 2592000000), "Y-M-D"),
    date2: util.tsFormatTime(Date.now(), "Y-M-D"),
    nowDate: util.tsFormatTime(Date.now(), "Y-M-D"),
    listDatas: [],
    refund: false,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.watch(that.watchBack); //监听网络变化
    var titleType = options.moenytype;
    that.data.moneyType = options.moenytype //options为页面路由过程中传递的参数
    if (titleType == 'type_recharge') {
      wx.setNavigationBarTitle({
        title: '充值记录'
      })
    } else if (titleType == 'type_pay') {
      this.setData({
        refund: true,
        moneyType: JSON.stringify(["type_pay", "type_refund"])
      });
      wx.setNavigationBarTitle({
        title: '消费记录'
      })
    } else if (titleType == 'type_income') {
      var moneyStatus = options.status; //(3为已结算，1为未结算)
      that.data.typeStatus = moneyStatus;
      wx.setNavigationBarTitle({
        title: (moneyStatus == 1 ? '等待到账' : '到账记录')
      })
      that.getWaittingDatas()
    } else if (titleType == 'type_refund') {
      wx.setNavigationBarTitle({
        title: '退款记录'
      })
    } else if (titleType == 'type_withdraw') {
      wx.setNavigationBarTitle({
        title: '提现记录'
      })
    } else if (titleType == 'type_balancing') {
      wx.setNavigationBarTitle({
        title: '结算失败'
      })
      that.getSettlingDatas()
    }

    // if (that.data.refund) {
    //   that.getDatas_refund(this.data.date1 + " 00:00:00", this.data.date2 + " 23:59:59");
    // } else {
    //   that.getDatas(this.data.date1 + " 00:00:00", this.data.date2 + " 23:59:59");
    // }
  },

  /**监听网络变化 */
  watchBack: function (networkType) {
    this.setData({
      networkType: networkType
    });
    // console.log('==========网络监听==========', this.data.networkType);
  },

  // 时间段选择  
  bindDateChange1(e) {
    let that = this;
    this.setData({
      date1: e.detail.value,
    })
    this.getDatas(this.data.date1 + " 00:00:00", this.data.date2 + " 23:59:59");
  },
  bindDateChange2(e) {
    let that = this;
    this.setData({
      date2: e.detail.value,
    })
    this.getDatas(this.data.date1 + " 00:00:00", this.data.date2 + " 23:59:59");
  },

  /** 获取数据 */
  getDatas: function (start, end) {
    var that = this;
    var url = 'personal/wallet/trading';

    wx.showLoading({
      title: '正在加载中...',
    })
    http.get(
      app.globalData.host + url, {
        status: that.data.typeStatus,
        type: that.data.moneyType,
        index: 1,
        limit: 1,
        startTime: start,
        endTime: end
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        this.setData({
          listDatas: this.addPlus(data.list)
        });
        wx.stopPullDownRefresh();
      },
      (status, resultCode, message, data) => {
        this.setData({
          loadenable: false
        });
        wx.showToast({
          title: '获取数据失败',
          duration: 2000,
          icon: "none"
        })
        wx.stopPullDownRefresh();
      });
  },

  /** 获取等待到账列表 */
  getWaittingDatas: function () {
    var that = this;
    var url = '/settlement/list';

    wx.showLoading({
      title: '正在加载中...',
    })
    http.get(
      app.globalData.host + url, {
        pendingStatus: true,
        index: 1,
        limit: 10,
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        this.setData({
          listDatas: data,
        });
        wx.stopPullDownRefresh();
      },
      (status, resultCode, message, data) => {
        this.setData({
          loadenable: false
        });
        wx.showToast({
          title: '获取数据失败',
          duration: 2000,
          icon: "none"
        })
        wx.stopPullDownRefresh();
      });
  },

  /** 获取正在结算列表 */
  getSettlingDatas: function () {
    var that = this;
    var url = '/billout/list';

    wx.showLoading({
      title: '正在加载中...',
    })
    http.get(
      app.globalData.host + url, {
        statuses: JSON.stringify(["3"]),
        index: 1,
        limit: 1,
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        that.setData({
          listDatas: data,
        });
        wx.stopPullDownRefresh();
      },
      (status, resultCode, message, data) => {
        this.setData({
          loadenable: false
        });
        wx.showToast({
          title: '获取数据失败',
          duration: 2000,
          icon: "none"
        })
        wx.stopPullDownRefresh();
      });
  },



  /**
   * 获取消费记录和退款记录
   */
  getDatas_refund: function (start, end) {
    var that = this;
    var url = 'personal/wallet/trading';

    wx.showLoading({
      title: '正在加载中...',
    })
    http.get(
      app.globalData.host + url, {
        status: that.data.typeStatus,
        types: that.data.moneyType,
        startTime: start,
        endTime: end,
        index: 1,
        limit: 1,
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        this.setData({
          listDatas: this.addPlus(data.list)
        });
        // wx.showToast({
        //   title: '加载成功',
        //   duration: 1500
        // })
        wx.stopPullDownRefresh();
      },
      (status, resultCode, message, data) => {
        this.setData({
          loadenable: false
        });
        wx.showToast({
          title: '获取数据失败',
          duration: 2000,
          icon: "none"
        })
        wx.stopPullDownRefresh();
      });
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
    // allOrderUtils.getMyActiveOrders();
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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }


  /**
   * 给正数添加加号
   */
  addPlus: function (array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].amountYuan > 0) {
        array[i].amountYuan = "+" + array[i].amountYuan
      }
    }
    return array;
  },

  /** 前往结账单详情 */
  goToDetail: function (e) {
    let item = e.currentTarget.dataset.item
    let productImg = item.picture //详情信息图片
    let productName = item.relation.productName //详情信息名称
    let productDescription = item.relation.productDescription //详情信息描述
    let totalPrice = item.relation.totalPrice
    let batchName = item.batchName
    let displayOriginDetail = true //是否显示详情信息

    //判断结账单类型
    if (item.relationType == "relation_type_customer_order") { //客户订单
      productImg = JSON.parse(item.picture).illustration[0]
    } else if (item.relationType == "relation_type_supply_task") { //供求任务
      productName = item.relation.taskName
      productDescription = item.relation.taskTime
      //供方是否为本人，不为本人不显示详情
      if (item.batchNum != "supply") {
        displayOriginDetail = false
      }
    } else if (item.relationType == "relation_type_gift") { //打赏
      productImg = 'https://www.vicpalm.com' + item.picture
      productName = item.relation.name
      totalPrice = item.relation.price / 2
      if (batchName == "") {
        batchName = '礼品获赠'
      }
    } else if (item.relationType == "relation_type_merchant_pay") { //企业入驻分润
      productName = item.relation.name
      productDescription = item.summary
    }

    wx.navigateTo({
      url: '/pages/tabBar_user_center/menu_wallet/record_details/record_details?productName=' + productName + '&productDescription=' + productDescription + '&amountYuan=' + item.amountYuan + '&num=' + item.relation.num + '&productUnit=' + item.relation.productUnit + '&productImg=' + productImg + '&code=' + item.code + '&createdTime=' + item.createdTime + '&settledTime=' + item.settledTime + '&price=' + item.relation.price + '&totalPrice=' + totalPrice + '&status=' + item.status + '&statusName= &result=&bankcard=&bankname=&batchName=' + batchName + '&displayOriginDetail=' + displayOriginDetail + '&relationType=' + item.relationType,
    })
  },
})