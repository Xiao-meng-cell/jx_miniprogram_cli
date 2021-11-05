// miniprogram/pages/tabBar_user_center/user_center.js
const app = getApp();
const http = require("../../utils/http.js");
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    networkType: true, //监听网络连接与断开
    tabBarActive: 3,
    tabbar: app.globalData.tabBar,
    userInfo: null,
    official: false, //公共事务
    person: false, //个人入驻
    channel: false, //品牌厂家
    business: false, //普通企业
    ultimate: false, //品牌旗舰店
    iPhone_X: app.globalData.iPhone_X,
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
    vicpalmMain: app.globalData.vicpalmMain, //是否掌胜科技为主体
    defaultMerchantCode: app.globalData.defaultMerchantCode, //默认商家编号
    enableMember: app.globalData.enableMember, //是否启用会员功能
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
  },

   /**监听网络变化 */
   watchBack: function (networkType) {
    this.setData({
      networkType: networkType
    });
    // console.log('==========网络监听==========', this.data.networkType);
  },

  /**
   * 获取个人信息
   */
  getUserData: function () {
    var that = this;
    wx.showLoading({
      title: '正在加载中...',
    });
    http.get(
      app.globalData.host + 'personal/info', {},
      (status, resultCode, message, data) => {
        wx.stopPullDownRefresh();
        that.data.userInfo = data;
        that.setData({
          userInfo: data,
        });
        if (data.merchantTagCode == "official") {
          that.setData({
            official: true,
          })
        } else {
          if (data.ultimate == 1 || data.ultimate == 2 || data.ultimate == 3) {
            that.setData({
              ultimate: true,
            });
          } else if (data.channel == 1 || data.channel == 2 || data.channel == 3) {
            that.setData({
              channel: true,
            });
          } else {
            if (data.merchant == 1 || data.merchant == 2 || data.merchant == 3) {
              that.setData({
                business: true,
              })
            }
          }
        }
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.stopPullDownRefresh();
      });
  },

  //我的钱包
  myWallet: function () {
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.navigateTo({
          url: "/pages/tabBar_user_center/menu_wallet/menu_wallet"
        })
      }
    })
  },

  /** 企业管理 */
  toBusinessManage: function () {
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        var user = that.data.userInfo
        if (!user.merchantCode || (user.merchant == 0 && user.channel == 0 && user.ultimate == 0 && user.merchantType != "mainStore" && user.merchantType != "branchStore")) {
          if (user.stepInfo && user.stepInfo != "") {
            if (user.stepInfo.stepType == "stepOfflineOnce" && user.stepInfo.status == -1) {
              wx.navigateTo({
                url: "/expandPackage/pages/enter/public_info/publicInfo",
              })
            } else {
              wx.navigateTo({
                url: "/pages/tabBar_user_center/manager/manager_index"
              })
            }
          } else {
            wx.navigateTo({
              url: '/expandPackage/pages/enter/introduce/introduce',
            })
          }
        } else {
          wx.navigateTo({
            url: "/pages/tabBar_user_center/manager/manager_index"
          })
        }
      }
    })

  },

  /** 获取我的订单数量 */
  getMineOrderNum: function () {
    if (!wx.getStorageSync('user')) {
      return
    }
    http.get(
      app.globalData.business_host + "batchOrder/orderCount", { //独立小程序只统计自己店铺的订单
        onshelfStoreCode: app.globalData.vicpalmMain ? null : app.globalData.defaultMerchantCode
      },
      (status, resultCode, message, data) => {
        this.setData({
          num1: data.pay,
          num2: data.cancel,
          num3: data.deliver,
          num4: data.receive,
          num5: data.afterSale,
        });
      },
      (status, resultCode, message, data) => {}
    );
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
    let that = this;
    if (wx.getStorageSync('user')) {
      this.getUserData();
      this.getMineOrderNum();
      /**获取购物车数量 */
      app.loadCartNum(function (tabBar) {
        that.setData({
          tabbar: tabBar
        });
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (wx.getStorageSync('user')) {
      this.getUserData();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

    //去登陆
    toLogin() {
      app.isUserLogin(function (isLogin) {})
    },

  /**
   * 跳转名片管理
   */
  toCardManage: function () {
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.navigateTo({
          url: "/pages/tabBar_user_center/business_card_manage/business_card_index/business_card_index"
        })
      }
    })

  },

  /**
   * 跳转到地址
   */
  toAddr: function () {
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.navigateTo({
          url: '/pages/tabBar_user_center/address/addr_list/addr_list',
        })
      }
    })

  },

  /**获取用户在指定店铺下的名片 */
  getUserClerkInfo() {

    http.get(
      app.globalData.host + "biz/user/merchant/clerk/getClerkInfo", {
        merchantCode: app.globalData.defaultMerchantCode,
        userId: wx.getStorageSync('user').id
      },
      (status, resultCode, message, data) => {
        // console.log(data);
        if (!data) {
          wx.navigateTo({
            url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply',
          })
        } else {
          if (!data.id) { //商家身份
            wx.navigateTo({
              url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply',
            })
          } else {
            if (data.merchantStatus == '3') {
              wx.showModal({
                title: '温馨提示',
                content: '企业已过期，名片无法使用',
              })
              return false;
            }
            if (data.merchantStatus == '-1') {
              wx.showModal({
                title: '温馨提示',
                content: '企业已注销，名片无法使用',
              })
              return false;
            }
            if (data.status == 2) { //名片审核中
              wx.showModal({
                title: '温馨提示',
                content: '名片正在审核中，请稍后再试',
                showCancel: false
              })
              return false;
            }
            wx.navigateTo({
              url: "/pages/clerk/show/show?workerId=" + data.id + '&higherLevelCode=' + app.globalData.higherLevelCode
            })
          }
        }
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  toMyCard: function () {
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        if (!app.globalData.vicpalmMain) {
          that.getUserClerkInfo();
        } else {
          wx.navigateTo({
            url: "/pages/tabBar_user_center/business_card_manage/business_card_index/business_card_index"
          })
        }
      }
    })
  },

  /**
   *全部活动订单
   */
  toOrder: function () {
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.navigateTo({
          url: "/pages/order/order?type=tabSix"
        })
      }
    })

  },

  /**
   * 待付款
   */
  toPay: function () {
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.navigateTo({
          url: "/pages/order/order?type=tabOnes"
        })
      }
    })

  },

  /**
   * 待使用
   */
  toIinvited: function () {
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.navigateTo({
          url: "/pages/order/order?type=tabTwos"
        })
      }
    })

  },

  /**
   * 待发货
   */
  toInitedme: function () {
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.navigateTo({
          url: "/pages/order/order?type=tabThrees"
        })
      }
    })

  },

  /**
   * 待收货
   */
  toReceiving: function () {
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.navigateTo({
          url: "/pages/order/order?type=tabFours"
        })
      }
    })

  },

  /**
   * 退款/售后
   */
  toProblemOrder: function () {
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.navigateTo({
          url: "/pages/order/order?type=tabFives"
        })
      }
    })

  },

  /**
   * 前往帮助中心
   */
  customerService: function () {
    wx.navigateTo({
      url: "/pages/tabBar_user_center/menu_help/menu_help"
    })
  },

  /** 前往会员卡列表 */
  cardList: function () {
    wx.navigateTo({
      url: "/expandPackage/pages/member/cardList/cardList"
    })
  },

  tabbarChange: function (e) {
    if (app.globalData.merchantTemplate == "estate" && e.detail == 0) {
      this.data.tabbar.list[e.detail].pagePath = "/estatePackage/pages/home/home"
      this.setData({
        tabbar: this.data.tabbar,
      })
    }
  },
})