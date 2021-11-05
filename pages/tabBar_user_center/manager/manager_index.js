// miniprogram/pages/tabBar_user_center/manager/manager_index.js

const http = require("../../../utils/http.js");
const util = require("../../../utils/util.js");
const timer = require("../../../utils/timer.js");
var crypto = require('../../../utils/crypto.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    funNumber: 0,
    userId: wx.getStorageSync('user') ? wx.getStorageSync('user').id : "",
    myMerchantInfo: app.globalData.myMerchantInfo,
    endTime: "", //过期时间
    enterVCode: false, //输入验证码，默认：false
    verificationCode: '', //验证码
    countdown: 0, //重新发送验证码倒计时
    sendBtnText: '发送验证码',
    setInter: '',
    docsList: [], //申请材料列表
    showLicenseTips: false, //显示相关资质提示
    licenseStatus: 1, //资质审核状态 （-1,不通过；0,待审核；1,通过）
    tipsTitle: "", //提示标题
    tipsContent: "", //提示内容
    tipsSubContent: "", //提示子内容
    auditStatus: 1, //审核状态（-1：不通过；1：通过；2：审核中）
    auditStatusText: "",
    firstTIps: true, //首次提示
    displayLevelUp: false, //显示升级广告
    displayAgreement: false,
    vasList: [],
    stepPayInfo: "",
    stepPayTimeD: 0,
    stepPayTimeH: 0,
    stepPayTimeM: 0,
    stepPayTimeS: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.merchantCode) {
      this.setData({
        merchant_code: options.merchantCode
      });
    }
    this.setData({
      firstTIps: true,
    })
    // this.getFansNum();
    this.getBusinessInfo()
    this.getVAS()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    //判断是否需要刷新页面
    //企业封面修改，企业续费后刷新
    if (wx.getStorageSync('manager_index_refresh')) {
      wx.removeStorageSync('manager_index_refresh')
      this.getBusinessInfo();
    }
    this.setData({ //登录后获取不到userId，所以每次打开企业管理都要获取一次  2019-3-25
      userId: wx.getStorageSync('user').id
    });
    this.getStepPayInfo()
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this;
    clearInterval(that.data.setInter)
    clearInterval(that.data.payTimeDevice)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
    clearInterval(that.data.payTimeDevice)
    var pages = getCurrentPages()
    var prePage = pages[pages.length - 2];
    if (prePage && (prePage.route == "expandPackage/pages/enter/introduce/introduce" || prePage.route == "pages/tabBar_user_center/manager/manager_index")) {
      wx.navigateBack({
        delta: 1,
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getBusinessInfo();
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
   * 获取粉丝数量
   */
  getFansNum: function () {
    http.get(
      app.globalData.host + "personal/followCount", {

      },
      (status, resultCode, message, data) => {
        this.setData({
          funNumber: data,
        })
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },


  /**
   * 获取企业基本信息
   */
  getBusinessInfo: function () {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    var that = this;
    http.get(
      app.globalData.host + "merchant/info/audit", {},
      (status, resultCode, message, data) => {
        app.globalData.myMerchantInfo = data;
        wx.setStorageSync("myMerchantInfo", app.globalData.myMerchantInfo);
        this.setData({
          myMerchantInfo: app.globalData.myMerchantInfo
        });
        //判断是否显示升级广告 start
        let levelUp = true
        if (data.official == 1) {
          levelUp = false
        } else {
          if (data.ultimate > 0) {
            levelUp = false
          }

          if (data.channel == 0 && (data.status == 0 || data.status == -1)) {
            levelUp = false
          }
        }
        //判断是否显示升级广告 end
        that.setData({
          endTime: data.checkInET,
          displayLevelUp: levelUp,
        });
        let auditStatus = 0
        let auditStatusText = ""
        let showLicenseTips = false
        let tipsTitle = ""
        let tipsContent = ""
        let tipsSubContent = ""
        if (data.statusAudit == app.globalData.auditStatusProgress || data.statusAudit == app.globalData.auditStatusFail) {
          auditStatus = data.statusAudit
        }
        if (data.channelAudit == app.globalData.auditStatusProgress || data.channelAudit == app.globalData.auditStatusFail) {
          auditStatus = data.channelAudit
        }
        if (data.ultimateAudit == app.globalData.auditStatusProgress || data.ultimateAudit == app.globalData.auditStatusFail) {
          auditStatus = data.ultimateAudit
        }
        let st = data.checkInST
        if (data.channelST) {
          st = data.channelST
        }
        if (auditStatus == app.globalData.auditStatusProgress) {
          auditStatusText = "审核中"
        } else if (auditStatus == app.globalData.auditStatusFail) {
          auditStatusText = "审核失败"
          showLicenseTips = true
          tipsTitle = "审核失败"
          tipsContent = "为不影响销售和代理请尽快完善资质审核。"
        }

        if (data.dataStatus == 0) {
          auditStatusText = "资料未完善"
          showLicenseTips = true
          tipsTitle = "完善资料信息"
          tipsContent = "为不影响销售和代理请尽快完善资质审核。"
        }

        this.setData({
          tipsTitle: tipsTitle,
          tipsContent: tipsContent,
          tipsSubContent: tipsSubContent,
          showLicenseTips: showLicenseTips,
          auditStatus: auditStatus,
          auditStatusText: auditStatusText,
          firstTIps: false,
        })

        let channelExpired = data.channel
        let isExpired = data.status
        if (channelExpired == 3) {
          this.showIsExpired(1)
        } else {
          if (channelExpired == 0 && isExpired == 3) {
            this.showIsExpired(0)
          }
        }

        if (data.hidden == 1) {
          let tipsContent = "您的企业已被下架！"
          if (data.reason != null && data.reason != "") {
            tipsContent = tipsContent + "\r\n原因：" + data.reason
          }
          wx.showModal({
            title: '下架提示',
            content: tipsContent,
            showCancel: true,
            cancelText: '取消',
            confirmText: '联系客服',
            success: function (res) {
              if (res.confirm) {
                wx.makePhoneCall({
                  phoneNumber: '400-003-2229',
                })
              }

            },
          })
        }
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading({
          title: "获取登录人企业信息失败"
        })
      }
    );
  },

  /**
   * 提示入驻过期模态窗
   */
  showIsExpired: function (channel) {
    wx.showModal({
      title: '温馨提示',
      content: '您的企业入驻时间已到期，\r\n为了不影响您继续使用请及时前往“掌创人生”APP续费',
      showCancel: false, //是否显示取消按钮
    })

  },

  /** 立即续费 */
  renewals: function (e) {
    if (this.data.auditStatus == 2) {
      this.setData({
        showLicenseTips: true,
        tipsTitle: "温馨提示",
        tipsContent: "企业审核中，暂时无法续费",
      })
      return
    }

    if ((this.data.myMerchantInfo.status == -1 || this.data.myMerchantInfo.status == 0) && this.data.myMerchantInfo.channel == 0 && this.data.myMerchantInfo.ultimate == 0) {
      wx.showToast({
        title: '企业状态异常',
        icon: "none",
      })
      return
    }

    if (this.data.stepPayInfo) {
      if (this.data.stepPayInfo.stepType == "stepOnlineMore") {
        wx.navigateTo({
          url: '/expandPackage/pages/enter/instalment/instalment',
        })
      } else if (this.data.stepPayInfo.stepType == "stepOfflineOnce") {
        wx.navigateTo({
          url: "/expandPackage/pages/enter/public_info/publicInfo",
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/tabBar_user_center/renewals/renewals',
      })
    }
  },

  /** 企业注销 */
  checkOut: function (e) {
    let that = this
    wx.showModal({
      title: '注销提醒',
      content: '确定是否注销企业',
      showCancel: true, //是否显示取消按钮
      success: function (res) {
        if (res.confirm) {
          that.getClient();
        }
      },
    })
  },

  /** 取消验证码输入 */
  cancelEnterVCode: function (e) {
    this.setData({
      enterVCode: false,
    })
  },

  stopClick: function (e) {},

  verificationCodeInput: function (e) {
    let vc = e.detail.value
    this.setData({
      verificationCode: vc,
    })
  },

  /**
   * 时间倒计时
   */
  countTime: function () {
    let second = this.data.countdown - 1
    let sendBtnText = '发送验证码'
    if (second > 0) {
      sendBtnText = sendBtnText + '（' + second + '）'
    } else(
      clearInterval(this.data.setInter)
    )
    this.setData({
      countdown: second,
      sendBtnText: sendBtnText,
    })
  },

  /** 发送验证码 */
  sendVerificationCode: function (captcha) {
    let that = this
    http.post(
      app.globalData.host + "biz/user/merchant/checkout/captcha/client", {
        captcha: captcha,
      },
      (status, resultCode, message, data) => {
        that.setData({
          enterVCode: true,
          countdown: 60,
          setInter: setInterval(function () {
            that.countTime();
          }, 1000)
        })
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000,
          mask: false,
        })
        console.log(that.data.countdown)
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      },
    );
  },

  /** 提交注销企业 */
  submitCheckout: function (e) {
    let that = this
    http.post(
      app.globalData.host + "/biz/user/merchant/checkout", {
        captcha: that.data.verificationCode,
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000,
          mask: false,
        })
        app.globalData.merchantLongname = ""
        app.globalData.selectType = null
        wx.removeStorageSync("myMerchantInfo")
        wx.navigateTo({
          url: '/pages/tabBar_index/business_homepage/business_homepage' + '&higherLevelCode='+ app.globalData.higherLevelCode,
        })
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      })
  },

  /**
   * 请在app中使用该功能
   */
  showToApp: function (e) {
    this.setData({
      tipsTitle: "请使用掌创人生APP操作",
      tipsContent: "该功能已迁移至掌创人生APP:【工作台】-【后台管理】",
      showLicenseTips: true,
    })
  },

  /**
   * 获取操作加密验证,通过之后才获取验证码
   */
  getClient: function () {
    let key = util.random(16);
    let random_num = app.globalData.encrypt(key);
    http.post(
      app.globalData.host + "captcha/client", {
        key: random_num,
        url: crypto.aesEncrypt(key, app.globalData.host + "biz/user/merchant/checkout/captcha/client")
      },
      (status, resultCode, message, data) => {
        //手机验证成功，执行登录
        let captcha = crypto.aesDecrypt(key, data)
        this.sendVerificationCode(captcha);
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: message,
          icon: "none",
          duration: 2000
        })

      });
  },

  /** 前往升级渠道商 */
  goToChannel: function () {
    if (this.data.myMerchantInfo.nature == 0) {
      wx.showToast({
        icon: "none",
        title: '个人企业不允许升级品牌厂家/品牌旗舰店\r\n请在【掌创人生APP-企业后台】中修改入驻类型',
      })
      return
    }
    if (this.data.myMerchantInfo.offlinePayment == 1) {
      wx.navigateTo({
        url: "/expandPackage/pages/enter/public_info/publicInfo",
      })
    } else {
      wx.navigateTo({
        url: '/pages/tabBar_user_center/channel/upgradeChannel/upgradeChannel',
      })
    }
  },

  /** 进入货源广场 */
  goToGoodsSquare: function () {
    let user = app.globalData.myMerchantInfo
    if (user.status == 1 || user.channel == 1) { //企业
      wx.navigateTo({
        url: '/pages/tabBar_user_center/channel/goodsSquare/goodsSquare',
      })
    } else if (user.status == 3) { //过期续费
      wx.navigateTo({
        url: '/pages/tabBar_user_center/channel/upgradeChannel/upgradeChannel',
      })
    }
  },

  /** 关闭提示框 */
  closeModal: function () {
    this.setData({
      showLicenseTips: false,
    })
  },

  /** 编辑企业信息 */
  editBusinessInfo: function () {
    this.setData({
      tipsTitle: "温馨提示",
      tipsContent: "完善企业信息请前往“掌创人生”APP",
      showLicenseTips: true,
    })
  },

  /** 前往首页 */
  goToIndex: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.myMerchantInfo.code + '&higherLevelCode='+ app.globalData.higherLevelCode + '&userId=' + this.data.userId,
    })
  },

  /** 对公账号信息 */
  goToAccountInfo: function () {
    wx.navigateTo({
      url: "/expandPackage/pages/enter/public_info/publicInfo",
    })
  },

  /** 隐藏显示合同协议 */
  displayAgreement: function () {
    this.setData({
      displayAgreement: !this.data.displayAgreement,
    })
  },

  /** 跳转网页 */
  jumpWebView: function (e) {
    wx.navigateTo({
      url: "/pages/web_view_html/web_view_html?webUrl=" + e.currentTarget.dataset.url + "&title=" + e.currentTarget.dataset.title,
    })
  },

  /** 下载协议 */
  downloadAgreement: function () {
    wx.downloadFile({
      url: 'https://oss.vicpalm.com/static/weclubbing/protocol-zcrs/%E6%8E%8C%E5%88%9B%E4%BA%BA%E7%94%9F%E5%93%81%E7%89%8C%E6%97%97%E8%88%B0%E5%BA%97%E5%85%A5%E9%A9%BB%E5%8D%8F%E8%AE%AE.pdf',
      success(res) {
        let fsm = wx.getFileSystemManager()
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: (result) => {
            console.log(result.savedFilePath)
            wx.showToast({
              title: '下载成功',
              icon: "none",
            })
          },
        })
      }
    })
  },

  /** 前往增值服务 */
  goToVAS: function () {
    let merchantInfo = this.data.myMerchantInfo
    if ((merchantInfo.ultimate == 0 || merchantInfo.ultimate == 2) && (merchantInfo.channel == 0 || merchantInfo.channel == 2) && (merchantInfo.status == 0 || merchantInfo.status == 2)) {
      wx.showToast({
        icon: "none",
        title: '企业审核中',
      })
      return
    }
    wx.navigateTo({
      url: '/expandPackage/pages/enter/valueAddedServices/valueAddedServices',
    })
  },

  /** 获取增值服务介绍 */
  getVAS: function () {
    wx.showLoading({
      title: '加载中...',
    })
    http.get(
      app.globalData.host + "biz/user/merchant/pay/service/list", {
        type: "merchant",
      },
      (status, resultCode, message, data) => {
        if (data && data.length > 0) {
          this.setData({
            vasList: data
          })
        }
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /** 获取分次缴纳信息 */
  getStepPayInfo: function () {
    let that = this
    http.get(
      app.globalData.host + "biz/user/merchant/pay/batch/step/info", {},
      (status, resultCode, message, data) => {
        if (data && data.status == -1) {
          data["endTime"] = data.createdTime + 7 * 24 * 60 * 60 * 1000
          this.setData({
            payTimeDevice: setInterval(function () {
              let temp = timer.countdownIntellect(data.endTime)
              if (!temp.timeEnable) {
                clearInterval(that.data.payTimeDevice)
              } else {
                that.setData({
                  stepPayTimeD: temp.d,
                  stepPayTimeH: temp.h,
                  stepPayTimeM: temp.m,
                  stepPayTimeS: temp.s,
                })
              }
            }, 1000)
          });
          wx.showModal({
            cancelColor: "#37424D",
            cancelText: '取消',
            confirmColor: "#37424D",
            confirmText: '前往查看',
            content: '存在进行中的续费/升级线上缴纳，请完成缴费或终止缴费',
            showCancel: true,
            title: '通知',
            success: (result) => {
              if (result.confirm) {
                this.goToStepPay()
              }
            },
          })
        }
        this.setData({
          stepPayInfo: data,
        })
      },
      (status, resultCode, message, data) => {}
    )
  },

  /** 前往分次缴纳页面 */
  goToStepPay: function () {
    wx.navigateTo({
      url: '/expandPackage/pages/enter/instalment/instalment',
    })
  }
})