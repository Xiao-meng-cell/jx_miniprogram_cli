// expandPackage/pages/member/credit/addCredit.js
var util = require('../../../../../utils/util.js');
var http = require('../../../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxVersion: "",
    capsuleTop: "",
    capsuleHeight: "",
    merchantCode: "", //商家code
    vipStoreCode: "", //VIP店铺Code
    amountList: [{
        key: "50元",
        value: 50,
      }, {
        key: "100元",
        value: 100,
      }, {
        key: "200元",
        value: 200,
      },
      {
        key: "500元",
        value: 500,
      }, {
        key: "1000元",
        value: 1000,
      }, {
        key: "2000元",
        value: 2000,
      }
    ], //充值金额
    selectedAmountIndex: -1, //选择充值金额下标
    inputFocus: false,
    rechargeAmount: 0, //充值金额
    rechargeAmountFen: 0, //充值金额（分）
    submitting: false, //充值提交中
    amountTotal: 0, //累计充值金额
    amountUsable: 0, //可用金额
    vipDiscount: 0, //优惠券金额
    couponCodes: "", //优惠券编号
    couponName: "", //优惠券名称
    enableCoupon: false, //启用优惠券
    maskHidden: true, //遮罩隐藏
    popUpName: "", //弹窗名称
    agree: true, //同意充值服务说明
    yczInfoHidden: true, //隐藏充值服务说明
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.merchantCode) {
      this.setData({
        merchantCode: options.merchantCode,
      })
    }
    if (options.vipStoreCode) {
      this.setData({
        vipStoreCode: options.vipStoreCode,
      })
    }
    this.getMemberRecharge()
    this.getVipRechargeCoupon()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      wxVersion: util.compareVersion(app.globalData.wxVersion, "7.0.0"),
      capsuleTop: app.globalData.capsuleTop,
      capsuleHeight: app.globalData.capsuleHeight,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      submitting: false,
    })
    //上一页为选择优惠券列表页，重新计算价格
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    this.setData({
      vipDiscount: currPage.data.vipDiscount,
      couponCodes: currPage.data.couponCodes,
      couponName: currPage.data.couponName,
    })
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

  /** 选中充值金额 */
  selectedAmount: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      selectedAmountIndex: this.data.selectedAmountIndex == index ? -1 : index,
    })
    if (index == this.data.amountList.length) {
      if (index == this.data.selectedAmountIndex) {
        this.setData({
          inputFocus: true,
        })
      } else {
        this.setData({
          inputFocus: false,
        })
      }
    } else {
      this.setData({
        rechargeAmount: this.data.amountList[this.data.selectedAmountIndex].value,
      })
      this.getVipRechargeCoupon()
    }
  },

  /**
   * 返回上一页
   */
  backPreviousPage: function () {
    this.setData({
      yczInfoHidden: true,
    })
    wx.navigateBack()
  },

  /** 返回首页 */
  backIndexPage: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage',
    })
  },

  /** 获取会员充值信息 */
  getMemberRecharge: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.business_host + "merchantMemberBalance/getByMerchantCode", {
        merchantCode: this.data.merchantCode,
      },
      (status, resultCode, message, data) => {
        if (data) {
          this.setData({
            amountTotal: data.total,
            amountUsable: data.balance,
          })
        }
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  bindinput: function (e) {
    this.setData({
      rechargeAmount: e.detail.value,
    })

  },

  bindblur: function (e) {
    this.getVipRechargeCoupon()
  },

  inputTap: function (e) {
    this.setData({
      selectedAmountIndex: this.data.amountList.length,
    })
  },

  /**
    获取微信支付openid  第一步
   */
  toPayMoney: function (e) {
    //充值提交中
    if (this.data.submitting) {
      return
    }
    if (!this.data.agree) {
      wx.showToast({
        title: '请先了解并同意《充值服务说明》',
        icon: "none",
        mask: true,
      })
      return
    }
    if (this.data.selectedAmountIndex < 0) {
      wx.showToast({
        title: '请选择充值金额',
        icon: "none",
        mask: true,
      })
      return
    }
    if (this.data.selectedAmountIndex == this.data.amountList.length) {
      if (Number(this.data.rechargeAmount) < 1) {
        wx.showToast({
          title: '请输入充值金额',
          icon: "none",
          mask: true,
        })
        this.setData({
          inputFocus: true,
        })
        return
      }

      if (Number(this.data.rechargeAmount) > 50000) {
        wx.showToast({
          title: '单笔充值不能超过50000元',
          icon: "none",
          mask: true,
        })
        this.setData({
          inputFocus: true,
        })
        return
      }
    }
    wx.showLoading({
      title: '充值中',
      mask: true
    })
    if (this.data.selectedAmountIndex == this.data.amountList.length) {
      this.setData({
        rechargeAmountFen: Number(this.data.rechargeAmount) * 100,
        submitting: true,
      })
    } else {
      this.setData({
        rechargeAmountFen: this.data.amountList[this.data.selectedAmountIndex].value * 100,
        submitting: true,
      })
    }
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
          (status, resultCode, message, data) => {
            this.setData({
              submitting: false,
            })
          }
        );
      },
    })
  },

  /**
   * 获取微信支付需要用的参数
   */
  getWeChatRecharge: function (data) {
    let payTest = app.globalData.testServer //测试服免支付
    let independentPay = app.globalData.independentPay
    let url = app.globalData.business_host + "merchantMemberBalance/recharge"
    if (payTest) {
      url = app.globalData.host + "atest/merchantMemberBalance/recharge"
    }
    http.post(
      url, {
        merchantCode: this.data.merchantCode,
        openId: data + "",
        appId: app.globalData.appId,
        frpCode: (payTest && !independentPay ? 'WEIXIN_XCX_2' : 'WEIXIN_XCX'),
        channel: independentPay ? 'channel_wechat' : 'channel_joinpay',
        amount: this.data.rechargeAmountFen,
        couponCode: this.data.couponCodes.length > 0 ? this.data.couponCodes[0] : undefined,
      },
      (status, resultCode, message, data) => {
        let that = this
        wx.hideLoading();
        if (payTest) {
          wx.showToast({
            title: '充值成功',
            duration: 1500,
            icon: "none"
          })
          this.setData({
            submitting: false,
          })
          setTimeout(() => {
            if (that.data.vipStoreCode != "") {
              wx.redirectTo({
                url: '/expandPackage/pages/member/cardDetail/cardDetail?storeCode=' + this.data.vipStoreCode,
              })
            } else {
              wx.navigateBack({
                delta: 1,
              })
            }
          }, 1500)
        } else {
          this.weChatRecharge(data.params, data.orderNo);
          this.setData({
            submitting: false,
          })
        }

      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: message,
          icon: "none"
        })
        this.setData({
          submitting: false,
        })
      }
    );
  },

  /**
   * 第三步：请求微信支付
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
   * 第四步：轮询结算单获取状态
   */
  pollingOrder: function (code) {
    let that = this
    http.get(
      app.globalData.host + 'biz/usersettlement/info', {
        code: code,
      },
      (status, resultCode, message, data) => {
        if (data.status == 4) {
          that.setData({
            submitOrderEnable: true,
          })
          //支付成功
          wx.showToast({
            title: '支付成功',
            icon: "none"
          })
          wx.navigateTo({
            url: '/pages/order/detail/order_details?orderId=' + this.data.orderId,
          })
        } else if (data.status == 5) {
          that.setData({
            submitOrderEnable: true,
          })
          wx.showToast({
            title: '支付失败',
            icon: "none"
          })
        } else { //继续轮询
          that.pollingOrder(code);
        }
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '支付失败',
          icon: "none"
        })
        that.setData({
          submitOrderEnable: true,
        })
      }
    );
  },

  /** 使用优惠券 */
  usingCoupon: function () {
    let recharge = 0
    if (this.data.selectedAmountIndex > -1) {
      if (this.data.selectedAmountIndex != 6) {
        recharge = this.data.amountList[this.data.selectedAmountIndex].value
      } else {
        recharge = this.data.rechargeAmount
      }
    }
    wx.navigateTo({
      url: '/expandPackage/pages/member/coupon/coupon?merchantCode=' + this.data.merchantCode + "&onlyUsable=true&displayCheckbox=true&topTips=false" + (recharge == 0 ? "" : "&recharge=" + recharge) + (this.data.couponCodes.length > 0 ? "&couponCodes=" + JSON.stringify(this.data.couponCodes) : "") + "&type=credit",
    })
  },

  /** 获取预充值优惠券 */
  getVipRechargeCoupon: function () {
    wx.showLoading({
      title: '数据加载中...',
    })
    let price = 0
    if (this.data.selectedAmountIndex > -1) {
      if (this.data.selectedAmountIndex != 6) {
        price = this.data.amountList[this.data.selectedAmountIndex].value
      } else {
        price = this.data.rechargeAmount
      }
    }
    http.get(
      app.globalData.vip_host + "vip/coupon/issue/checkPreChangeReturnCouponList", {
        storeCode: this.data.merchantCode,
        userCode: wx.getStorageSync('user').userCode,
        price: price > 0 ? price : undefined,
      },
      (status, resultCode, message, data) => {
        if (data.length > 0) {
          this.setData({
            enableCoupon: true,
          })
          let couponCodes = []
          let bestCoupon = data[0]
          if (bestCoupon.meetPriceYuan <= this.data.rechargeAmount) {
            couponCodes.push(bestCoupon.code)
            this.setData({
              vipDiscount: bestCoupon.rebatePriceYuan,
              couponCodes: couponCodes,
              couponName: bestCoupon.couponName,
            })
          } else {
            this.setData({
              vipDiscount: "",
              couponCodes: "",
              couponName: "",
            })
          }
        }
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
      }
    )
  },

  /** 预充值提示 */
  tips: function () {
    this.setData({
      popUpName: "addCreditInfo",
    })
    this.maskHidden()
  },

  /** 遮罩隐藏 */
  maskHidden: function () {
    this.setData({
      maskHidden: !this.data.maskHidden,
    })
  },

  /** 停止鼠标操作 */
  stopMouseOperate: function () {

  },

  /** 同意充值服务说明 */
  agree: function () {
    this.setData({
      agree: !this.data.agree,
    })
  },

  /** 查看充值服务说明 */
  checkYczInfo: function () {
    this.setData({
      yczInfoHidden: !this.data.yczInfoHidden,
    })
  },

  /** 同意协议 */
  agreeAgreement: function () {
    this.setData({
      agree: true,
      yczInfoHidden: true,
    })
    this.toPayMoney()
  },
})