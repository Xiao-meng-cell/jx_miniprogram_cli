// miniprogram/pages/clerk/clerk_good_list/clerk_good_list.js
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
    pageIndex: 1,
    pageLimit: 10,
    card_name: "",
    card_position: "",
    card_phone: "",
    card_shortName: "",
    card_headimg: "",
    workerId: "",
    userId: "",
    card_email: "",
    card_qq: "",
    card_wx: "",
    card_merchantName: "",
    card_merchantShortName: "",
    card_urls: "",
    card_addr: "",
    merchant_code: "",
    shares: "",
    hot: "",
    pixelRatio: "",
    windowHeight: "",
    windowWidth: "",
    hidden_collection_window: true,
    hidden_card_list: true,
    isFollow: false, //是否收藏过
    card_list: [], //我的名片列表
    selectedCardObj: {}, //选中名片对象
    seen_list: "",
    hot: "",
    shares: "",
    showVisitorRecord: false, //是否显示访客记录
    hidden_send_message: true,
    merchant_err: false,
    clerk_code: "",
    slide_button: {
      left: 0,
      right: 0,
      top: 100,
      height: 45,
      width: 50,
      tStart: true
    },
    isMerchant: false, //当前登录用户是否是事业合伙人
    isParent: false, //当前登录用户是否是商家
    business_activity_list_new: [],
    business_activity_list: [],
    pageIndex_add: 0, //二维数组下标
    goodsTagList: [], //商品分类列表
    goodsTagSelectedIndex: 0, //选中商品分类下标
    goodsCategoryCode: "", //选中商品分类编号
    goodsTypeSelectedIndex: 1, //点击商品排序下标
    priceSortAsc: true, //价格排序是否为升序
    activityTypeText: "名片商城",
    sortTypeCode: "distance", //选中排序类型
    goodsTypeCode: "", //选中产品类型 
    goodsTypeHidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    let that = this
    app.getOptions(options, function (data) {
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧小程序码
      //&是我们定义的参数链接方式
      if (qrcode_scene.split("$")[0]) {
        app.globalData.higherLevelCode = qrcode_scene.split("$")[0];
        app.globalData.isReloadThePage_tabBar_index = true;
        app.globalData.jumpIndex_fromApp = true;
      }
      if (qrcode_scene.split("$")[1]) {
        app.globalData.isReloadThePage_tabBar_index = true;

        that.setData({
          workerId: qrcode_scene.split("$")[1],
          hidden_video: true
        });
        that.getWorkerInfo(qrcode_scene.split("$")[1]);
        that.addHot();
        that.getRecordsByClerkId();
        if (!wx.getStorageSync('user')) {

        } else {


          that.setData({
            hidden_card_list: false,
          })
        }
      }
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧二维码
      let higherLevelCode = util.getQueryString(qrcode_scene, "user");
      let workerId = util.getQueryString(qrcode_scene, "id");
      //&是我们定义的参数链接方式
      if (higherLevelCode) {
        app.globalData.higherLevelCode = higherLevelCode;
        app.globalData.isReloadThePage_tabBar_index = true;
        app.globalData.jumpIndex_fromApp = true;
      }
      if (workerId) {
        app.globalData.isReloadThePage_tabBar_index = true;

        that.setData({
          workerId: workerId,
          hidden_video: true
        });
        that.getWorkerInfo(workerId);
        that.addHot();
        that.getRecordsByClerkId();
        if (!wx.getStorageSync('user')) {

        } else {
          that.setData({
            hidden_card_list: false,
          })
        }
      }
      that.initOptions(data)
    })




    this.setData({
      lander: wx.getStorageSync('user'),
      iPhone_X: app.globalData.iPhone_X
    });
  },
  //初始化参数
  initOptions(options) {
    if (options) {


      if (options.higherLevelCode) { //小卡片带分享码
        app.globalData.higherLevelCode = options.higherLevelCode;
        app.globalData.isReloadThePage_tabBar_index = true;
      }
      if (options.shareId && options.shareId != "undefined") { //小卡片企业留言参数
        this.setData({
          shareId: options.shareId
        });
        this.getShareMessage();
      } else {
        this.setData({
          change_card_show_range: true
        });

      }
      if (options.cover == 'phone') {
        this.setData({
          phone_cover: true
        });
      }
      if (options.workerId) {
        app.globalData.isReloadThePage_tabBar_index = true;

        this.setData({
          workerId: options.workerId,
          hidden_video: true
        });
        this.getWorkerInfo(options.workerId);
        this.addHot();
        this.getRecordsByClerkId();
        if (!wx.getStorageSync('user')) {

        } else {

          // this.setData({
          //   hidden_card_list: false,
          // })
        }
      }
      if (options.merchantCode) { //企业code，必传
        this.setData({
          merchant_code: options.merchantCode
        });
        app.globalData.merchant_code = options.merchantCode;
      }
      //是否显示访客记录
      if (options.showVisitorRecord == "true") {
        this.setData({
          showVisitorRecord: options.showVisitorRecord,
        })
      }
      this.saveShareInfo()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    // this.homepage_button = this.selectComponent("#homepage_button");
    // this.setData({
    //   homepage_buttonDevice: setInterval(function () {
    //     // console.log(that.data.card_headimg);
    //     that.homepage_button.setData({
    //       card_headimg: that.data.card_headimg,
    //       business_info: that.data.business_info
    //     });
    //   }, 1000)
    // });
    // this.clearIntervalByTime()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //检查名片是否已收藏
    // this.getBusinessInfo();
    // this.getMineCardList();
    // if (this.data.merchant_code) {
    //   this.getBusinessActivity();
    // }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // clearInterval(this.data.homepage_buttonDevice);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // clearInterval(this.data.homepage_buttonDevice);
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
    this.setData({
      pageIndex: this.data.pageIndex + 1,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getBusinessActivity();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    this.addShares();
    return {
      title: this.data.business_info.name,
      path: "pages/clerk/clerk_good_list/clerk_good_list?shareId=" + this.data.shareId + "&higherLevelCode=" + this.data.clerk_code + "&workerId=" + this.data.workerId + "&merchantCode=" + this.data.merchant_code + '&batchShare=' + app.globalData.batchShare,
      imageUrl: this.data.business_info.bgUrls[0],
      success: res => {},
      fail: res => {}
    }

  },

  /**
   * 获取职员信息 clerk/info
   */
  getWorkerInfo: function (workerId) {
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/info", {
        id: workerId
      },
      (status, resultCode, message, data) => {
        console.log(data);
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
          card_merchantName: data.merchantName,
          card_merchantShortName: data.merchantShortName,
          card_urls: data.merchantBgUrls,
          card_addr: data.merchantAddr,
          merchant_code: data.merchantCode,
          shares: data.shares,
          hot: data.hot
        });
        console.log(this.data.clerk_code);
        //检查名片是否已收藏
        this.getUserInfoByUserId();
        this.getBusinessInfo();
        this.getBusinessActivity();
        this.getGoodsType()
        if (wx.getStorageSync('user')) {
          this.addBrowsing();
        }
        if (this.data.phone_cover) {
          this.getBusinessPhone(data.phone);
        }
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },
  /***
   * 获取用户信息
   */
  getUserInfoByUserId: function () {
    http.get(
      app.globalData.host + 'personal/info', {
        userId: this.data.userId,
      },
      (status, resultCode, message, data) => {
        console.log(data);
        this.setData({
          clerk_code: data.code
        });
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '获取共享合伙人失败',
          icon: "none"
        })
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
   * 保存联系人
   */
  save_phone: function () {
    wx.addPhoneContact({
      firstName: this.data.card_name,
      mobilePhoneNumber: this.data.card_phone,
      organization: this.data.business_info.name,
      title: this.data.card_position,
      success: () => {
        wx.showToast({
          title: '联系人添加成功',
          icon: "none"
        });
      },
      fail: err => {
        wx.showToast({
          title: '联系人添加失败，请稍候重试',
          icon: "none"
        });
      }
    })
  },

  //图片点击事件查看大图
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list

    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList, // 需要预览的图片http链接列表
      success: res => {},
      fail: res => {}
    })
  },

  /**
   * 跳转到企业
   */
  jumpBusiness: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.merchant_code + '&scene=' + ('clerk' + this.data.merchant_code) + '&sceneDT=' + this.data.workerId + '&cover=' + this.data.card_phone + '&higherLevelCode=' + app.globalData.higherLevelCode,
    })
  },

  /**
   * 联系企业
   */
  contactBusiness: function (e) {
    // var business_phone = this.data.business_info.phone; 
    var business_phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: business_phone
    })
  },

  /**
   * 收藏名片
   */
  addFollow: function (e) {
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        if (that.data.userId == wx.getStorageSync('user').id) {
          wx.showToast({
            title: '自己的名片不能收藏',
            icon: "none"
          })
          return
        }
        if (that.data.workerId == "undefined" || !that.data.workerId) {
          return
        }
        if (!that.data.merchant_code || (that.data.merchant_code == "temporary") || (that.data.merchant_code == "undefined")) {
          return false
        }

        let url = 'biz/clerkusermerchantrel/add';
        let param = {}

        if (that.data.isFollow) {
          url = 'biz/clerkusermerchantrel/deleteByClerkIds';
          param = {
            merchantCode: that.data.merchant_code,
            clerkIds: JSON.stringify([that.data.workerId])
          }
        } else {
          param = {
            merchantCode: that.data.merchant_code,
            clerkId: that.data.workerId
          }
        }
        http.post(
          app.globalData.host + url, param,
          (status, resultCode, message, data) => {
            if (that.data.isFollow) {
              that.setData({
                isFollow: false,
              });
              wx.showToast({
                title: '取消收藏成功',
                icon: "none"
              })
            } else {
              that.setData({
                isFollow: true,
              });
              wx.showToast({
                title: '收藏成功',
                icon: "none"
              })
            }
            wx.hideLoading()
          },
          (status, resultCode, message, data) => {
            wx.hideLoading()
          }
        );
        that.addBrowsing();
      }
    })

  },


  /**
   * 检查是否收藏
   */
  checkFollow: function () {
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        http.get(
          app.globalData.host + "biz/clerkusermerchantrel/checkFollow", {
            clerkId: that.data.workerId
          },
          (status, resultCode, message, data) => {
            that.setData({
              isFollow: data
            });
            if (!that.data.isFollow) {
              that.addFollow();
            }
            if (that.data.isFollow) {
              that.setData({
                hidden_collection_window: true
              });
            } else {
              if (that.data.userId != that.data.lander.id) {
                // that.setData({
                //   hidden_collection_window: false
                // });
              }
            }
            wx.hideLoading();
          },
          (status, resultCode, message, data) => {
            wx.hideLoading()
          }
        );
      }
    })
  },


  /**
   * 是否收藏名片弹窗操作
   */
  collectionWindow: function (e) {
    if (e.currentTarget.dataset.otp == "false") {
      this.setData({
        hidden_collection_window: true
      });
      return
    } else {
      this.addFollow();

    }
  },


  /**
   * 添加名片浏览记录
   */
  addBrowsing: function () {
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        if (that.data.workerId == "undefined" || !that.data.workerId) {
          return
        }
        if (!that.data.merchant_code || (that.data.merchant_code == "temporary") || (that.data.merchant_code == "undefined")) {
          return false
        }
        http.post(
          app.globalData.host + "/biz/clerkbrowsingrel/add", {
            merchantCode: that.data.merchant_code,
            clerkId: that.data.workerId
          },
          (status, resultCode, message, data) => {
            wx.hideLoading()
          },
          (status, resultCode, message, data) => {
            wx.hideLoading()
          }
        );
      }
    })
  },

  /**
   * 地图导航
   */
  mapNavigation: function () {
    var lat = this.data.business_info.lat;
    var lng = this.data.business_info.lng;
    if (lat && lng) {
      wx.openLocation({
        latitude: lat,
        longitude: lng,
        name: this.data.business_info.addr,
        address: this.data.business_info.addr
      })
    } else {
      wx.showToast({
        title: '企业未设置定位',
        icon: "none"
      })
    }
  },

  /**
   * 获取企业详情信息
   */
  getBusinessInfo: function () {
    http.get(
      app.globalData.host + "/biz/user/merchant/info", {
        merchantCode: this.data.merchant_code
      },
      (status, resultCode, message, data) => {
        wx.setStorageSync('business_homepage_cache_data' + this.data.merchant_code, data)
        data.dis = app.getDisance(data.lat, data.lng)
        this.setData({
          business_info: data,
          custom_imageUrl: data.bgUrls[0]
        });
        wx.hideLoading();
        wx.setNavigationBarTitle({
          title: this.data.business_info.name
        })
        if (data.phone && !this.data.phone_cover) {
          this.getBusinessPhone(data.phone);
        }
        if (this.data.business_info.status == 0 || this.data.business_info.status == 3) {
          this.setData({
            merchant_err: true
          });
          wx.hideLoading();
        } else {
          this.checkFollow();
        }
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: message,
          icon: "none"
        })
        if (status == 500) {
          this.setData({
            merchant_err: true
          });
        }
        wx.hideLoading()
      }
    );
  },

  /**
   * 取消收藏
   */
  cancelFollow: function () {
    if (this.data.workerId == "undefined" || !this.data.workerId) {
      return
    }
    var clerkIds = [];
    clerkIds.push(this.data.workerId);
    http.post(
      app.globalData.host + "/biz/clerkusermerchantrel/deleteByClerkIds", {
        clerkIds: JSON.stringify(clerkIds)
      },
      (status, resultCode, message, data) => {
        this.setData({
          isFollow: false,
          hidden_collection_window: true
        });
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        this.setData({
          hidden_collection_window: true
        });
        wx.hideLoading()
      }
    );
    this.addBrowsing();
  },

  /**
   * 复制信息
   */
  setCopyText: function (e) {
    if (e.currentTarget.dataset.text) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.text,
        success(res) {
          wx.showToast({
            title: '复制成功',
            icon: "none"
          })
          wx.getClipboardData({
            success(res) {}
          })
        }
      })
    }
  },

  /**
   * 获取我的名片列表
   */
  getMineCardList: function () {
    if (wx.getStorageSync('user')) {
      wx.showLoading({
        title: '加载中',
      })
      http.get(
        app.globalData.host + "/biz/user/merchant/clerk/mine/list", {},
        (status, resultCode, message, data) => {
          this.setData({
            card_list: data
          });
          this.usingCard()
          wx.hideLoading();
        },
        (status, resultCode, message, data) => {
          wx.hideLoading()
        }
      );
    }
  },

  /** 使用名片 */
  usingCard: function () {
    let card_list = this.data.card_list
    for (var i in card_list) {
      let cart_obj = card_list[i]
      if (i == 0) {
        cart_obj.selected = true
        this.data.selectedCardObj = cart_obj
      } else {
        cart_obj.selected = false
      }
    }
    this.setData({
      card_list: card_list,
    })
  },

  /** 选中名片 */
  selectedCard: function (e) {
    let id = e.currentTarget.dataset.id
    let card_list = this.data.card_list
    for (var i in card_list) {
      let cardObj = card_list[i]
      if (cardObj.id == id) {
        cardObj.selected = true
        this.data.selectedCardObj = cardObj
      } else {
        cardObj.selected = false
      }
    }
    this.setData({
      card_list: card_list,
    })
  },

  /** 新增名片 */
  addCard: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply',
    })
  },

  /** 交换名片 */
  exchangeCard: function (e) {
    if (this.data.selectedCardObj) {
      http.post(
        app.globalData.host + "/biz/clerkusermerchantrel/exchangeClerk", {
          merchantCode: this.data.selectedCardObj.merchantCode,
          clerkId: this.data.selectedCardObj.id,
          hisUserId: this.data.userId,
          userId: this.data.selectedCardObj.userId,
        },
        (status, resultCode, message, data) => {
          this.setData({
            hidden_card_list: true
          });
          wx.showModal({
            title: '跳转提示',
            content: '交换名片成功，是否跳转至收藏夹？',
            showCancel: true,
            cancelText: '取消',
            confirmText: '跳转',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/tabBar_user_center/business_card_manage/business_card_favorites/business_card_favorites',
                })
              }
            },
          })
          wx.hideLoading()
        },
        (status, resultCode, message, data) => {
          this.setData({
            hidden_card_list: true
          });
          if (message == "biz.clerkusermerchantrel.exchangeClerk.repeat") {
            wx.showToast({
              title: '已交换过名片',
              icon: "none"
            })
          }
          wx.hideLoading()
        }
      );
    } else {
      wx.showToast({
        title: '请选择需要交换的名片！',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    }
  },

  /** 关闭名片列表 */
  closeCardList: function (e) {
    this.setData({
      hidden_card_list: true
    });
  },

  /**
   * 添加访问量
   */
  addHot: function () {
    http.post(
      app.globalData.host + "biz/usermerchantclerk/updateHotById", {
        clerkId: this.data.workerId,
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
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
      (status, resultCode, message, data) => {
        this.setData({
          seen_list: data
        });
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
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
      (status, resultCode, message, data) => {
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },


  /**
   * 新增留言信息
   */
  addMessage: function () {
    wx.showLoading({
      title: '保存中',
      mask: "true"
    })
    http.post(
      app.globalData.host + "/biz/usershare/mine/add", {
        content: this.data.new_card_message,
        merchantCode: this.data.merchant_code,
        userId: wx.getStorageSync('user').id,
        title: "",
        url: "",

      },
      (status, resultCode, message, data) => {
        let that = this;
        this.setData({
          card_message: this.data.new_card_message,
          shareId: data,
          showTextareaEdit: false,
        });
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 编辑企业留言
   */
  inputCardMessage: function (e) {
    this.setData({
      new_card_message: e.detail.value,
      card_message: e.detail.value
    });

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
   * 根据shartId获取企业留言，详情
   */
  getShareMessage: function () {
    http.get(
      app.globalData.host + "/biz/usershare/get", {
        id: this.data.shareId,
      },
      (status, resultCode, message, data) => {
        if (data) {
          this.setData({
            change_card_show_range: false
          })
        }
        this.setData({
          custom_title: data.title,
          custom_imageUrl: data.url,
          card_message: data.content,

        });

      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 显示textarea
   */
  showTextareaEdit: function (e) {
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

  /**
   * 去首页
   */
  toIndex: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.merchant_code + '&higherLevelCode=' + app.globalData.higherLevelCode,
    })
  },

  /**防止滑动冒泡 */
  doNotMove: function () {
    return false;
  },

  /**
   * 获取企业活动
   */
  getBusinessActivity: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    http.get(
      app.globalData.business_host + "fastevent/inrewardPage", {
        pageIndex: this.data.pageIndex,
        pageLimit: this.data.pageLimit,
        storeCode: this.data.merchant_code,
        sortType: 'customize',
        sortOrder: 'asc',
        categoryCode: this.data.goodsCategoryCode == "" ? undefined : this.data.goodsCategoryCode,
      },
      (status, resultCode, message, data) => {

        if (data.list.length < 1) {
          wx.hideLoading();
        }
        // this.setData({
        //   goodsList: data.list
        // });
        // console.log(this.data.goodsList);
        // this.handlerList();

        this.setData({
          business_activity_list_new: data.list,
        });
        this.handlerActivitiList();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 处理活动列表
   */
  handlerActivitiList: function () {
    for (let i = 0; i < this.data.business_activity_list_new.length; i++) {
      let list = this.data.business_activity_list_new[i];
      if (!list) {
        wx.hideLoading();
        return
      }
      if (list.fileJson) {
        let key_title = list.title;
        let obj = {};
        obj.pic = JSON.parse(list.fileJson).illustration[0];
        if (obj.pic) {
          obj.type = util.getUrlType(JSON.parse(list.fileJson).illustration[0])
        }
        this.data.business_activity_list_new[i].illustration = obj.pic;
        this.data.business_activity_list_new[i].videoType = obj.type;
        this.data.business_activity_list_new[i].product.price = util.priceSwitch(this.data.business_activity_list_new[i].product.price);
        this.data.business_activity_list_new[i].discountPrice = util.priceSwitch(this.data.business_activity_list_new[i].discountPrice);
        this.data.business_activity_list_new[i].dis = app.getDisance(this.data.business_activity_list_new[i].merchant.lat, this.data.business_activity_list_new[i].merchant.lng);
      } else {
        this.data.business_activity_list_new.splice(i, 1);
        i = i - 1;
      }

    }
    this.setData({
      ['business_activity_list[' + this.data.pageIndex_add + ']']: this.data.business_activity_list_new
    });
    wx.hideLoading();
  },

  /**
   * 操作数据
   */
  handlerList: function () {
    for (let i = 0; i < this.data.goodsList.length; i++) {
      let list = this.data.goodsList[i];

      let obj = {};
      if (list.fileJson) {
        obj.pic = JSON.parse(list.fileJson).illustration[0];
        if (obj.pic) {
          obj.type = util.getUrlType(JSON.parse(list.fileJson).illustration[0])
        }
      }
      this.data.goodsList[i].illustration = obj.pic;
      this.data.goodsList[i].videoType = obj.type;
      this.data.goodsList[i].product.price = util.priceSwitch(this.data.goodsList[i].product.price);
      this.data.goodsList[i].discountPrice = util.priceSwitch(this.data.goodsList[i].discountPrice);
      this.data.goodsList[i].dis = app.getDisance(this.data.goodsList[i].merchant.lat, this.data.goodsList[i].merchant.lng);
    }
    this.setData({
      goodsList: this.data.goodsList
    });
    wx.hideLoading();
  },

  /**
   * 跳转到商家首页
   */
  handlerPageTap: function () {
    this.jumpBusiness();
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
      (_status, _resultCode, _message, data) => {

      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

  /**
   * 定时清除定时器
   */
  // clearIntervalByTime: function () {
  // setTimeout(() => {
  //   console.log("1分钟后清除定时器");
  //   clearInterval(this.data.homepage_buttonDevice);
  // }, 60000)
  // },


  /**
   * 鉴别用户信息
   */
  // identifyUser: function () {
  //   if (!wx.getStorageSync('user')) {
  //     return
  //   } else {
  //     //1.鉴别用户是不是经理身份
  //     this.identifyRelationships();
  //     //2.鉴别是不是商家号身份
  //     this.getLenderBusinessInfo();
  //   }
  // },

  /**
   * 鉴定当前登录人在这个企业中与名片持有者的关系  /mine/info
   */
  // identifyRelationships: function () {
  //   if (!this.data.merchant_code) {
  //     return
  //   }
  //   if (!wx.getStorageSync('user')) {
  //     return
  //   }
  //   http.get(
  //     app.globalData.business_host + "biz/user/merchant/clerk/mine/info", {
  //       merchantCode: this.data.merchant_code
  //     },
  //     (status, resultCode, message, data) => {
  //       console.log(data);
  //       this.handlerLanderData(data);
  //     },
  //     (status, resultCode, message, data) => {
  //       wx.hideLoading()
  //     }
  //   );
  // },

  /**
   * 操作匹配用户信息
   */
  // handlerLanderData: function (data) {
  //   if (data.userId == this.data.parentUserId) {
  //     this.setData({
  //       isParent: true
  //     });
  //   } else {
  //     this.setData({
  //       isParent: false
  //     });
  //   }

  //   if (data.userId == this.data.userId) {
  //     this.setData({
  //       landerRole: data.role
  //     });
  //   }
  // },


  /**
   * 获取当前登录人的商家信息
   */
  // getLenderBusinessInfo: function () {
  //   http.get(
  //     app.globalData.host + "biz/user/merchant/info", {
  //       userId: wx.getStorageSync('user').id
  //     },
  //     (status, resultCode, message, data) => {
  //       app.globalData.myMerchantInfo = data;
  //       wx.setStorageSync("myMerchantInfo", this.globalData.myMerchantInfo);
  //       this.handlerMerchantData();
  //       wx.hideLoading();
  //     },
  //     (status, resultCode, message, data) => {
  //       wx.hideLoading({
  //         title: "获取登录人企业信息失败"
  //       })
  //       wx.hideLoading();
  //     }
  //   );
  // },

  /**
   * 操作匹配用户信息
   */
  // handlerMerchantData: function () {
  //   if (app.globalData.myMerchantInfo.code == this.data.merchant_code) {
  //     this.setData({
  //       isMerchant: true
  //     });
  //   } else {
  //     this.setData({
  //       isMerchant: false
  //     });
  //   }
  // },

  /** 获取产品分类 */
  getGoodsType: function () {
    http.get(
      app.globalData.business_host + "eventType/getEventTypes", {
        storeCode: this.data.merchant_code,
        countEvent: 0,
        statuses: JSON.stringify(["1"]),
        typeCodes: JSON.stringify([
          "inreward",
        ]),
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

  /** 点击商品分类 */
  clickGoodsTag: function (e) {
    this.setData({
      goodsTagSelectedIndex: e.currentTarget.dataset.index,
      goodsCategoryCode: e.currentTarget.dataset.item.code,
    })
    this.reload();
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
    })
    if (index != 2) {
      this.reload()
    }
  },

  reload: function () {
    this.setData({
      pageIndex: 1,
      pageIndex_add: 0,
      business_activity_list: "",
    })
    this.getBusinessActivity();
  },

  /** 前往商品分类页 */
  goToGoodsCategory: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_activity/goods_category/goods_category?merchantCode=' + this.data.merchant_code + "&categoryTypeIndex=" + e.currentTarget.dataset.index + "&inreward=true&clerk_code=" + this.data.clerk_code,
    })
  },
})