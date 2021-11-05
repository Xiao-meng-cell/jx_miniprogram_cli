var http = require('../../../../../utils/http.js');
const util = require("../../../../../utils/util.js");
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //场景ID
    card_list: [], //卡片列表数据
    pageIndex: 0, //翻页目录
    pageIndex_add: 0, //二维数组下标
    selectedCardObj: '', //选中名片
    sceneObj: '', //场景信息
    groupName: '', //场景名称
    groupCount: '', //场合人数
    sceneExist: "", //场景是否存在
    setInter: '', //返回计时器
    isOfficial: false, //是否有正式名片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.scene) { //扫小程序码获取的参数
      let qrcode_scene = decodeURIComponent(options.scene);
      //&是我们定义的参数链接方式
      if (qrcode_scene.split("$")[0]) {
        app.globalData.higherLevelCode = qrcode_scene.split("$")[0];
        app.globalData.isReloadThePage_tabBar_index = true;
      }
      if (qrcode_scene.split("$")[1]) {
        this.setData({
          id: qrcode_scene.split("$")[1]
        })
      }
    }
    if (options.q) { //扫二维码获取的参数
      let qrcode_scene = decodeURIComponent(options.q);
      let higherLevelCode = util.getQueryString(qrcode_scene, "user");
      let id = util.getQueryString(qrcode_scene, "id");
      //&是我们定义的参数链接方式
      if (higherLevelCode) {
        app.globalData.higherLevelCode = higherLevelCode;
        app.globalData.isReloadThePage_tabBar_index = true;
        app.globalData.jumpIndex_fromApp = true;
      }
      if (id) {
        app.globalData.isReloadThePage_tabBar_index = true;
        this.setData({
          id: id
        })
      }
    }

    //获取场景信息
    this.get_scene_info()
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
    if (wx.getStorageSync('reloadPage')) {
      this.setData({
        card_list: [],
      })
      this.getMineCardList();
    }

    if (!this.data.card_list[0]) {
      this.getMineCardList();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.setInter);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.setInter)
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
      pageIndex: this.data.pageIndex + 10,
      pageIndex_add: this.data.pageIndex_add + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // },

  /**
   * 获取我的名片列表
   */
  getMineCardList: function () {
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.showLoading({
          title: '加载中',
        })
        http.get(
          app.globalData.host + "/biz/user/merchant/clerk/mine/list", {
            skip: that.data.pageIndex,
            limit: 20
          },
          (status, resultCode, message, data) => {
            that.setData({
              ['card_list[' + that.data.pageIndex_add + ']']: that.handleCardData(data)
            });
            //是否刚新建完成临时名片并使用临时名片
            if (wx.getStorageSync('reloadPage')) {
              that.usingTempCard();
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
   * 处理名片数据
   */
  handleCardData: function (list) {
    if (list.length >= 1) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].merchantCode == app.globalData.myMerchantInfo.code) {
          list[i].isMineMerchant = true;
          this.setData({
            isOfficial: true
          });
        } else {
          list[i].isMineMerchant = false;
          if (list[i].merchantCode && list[i].merchantCode != "temporary") {
            this.setData({
              isOfficial: true
            });
          }
        }
      }
    }
    return list
  },

  /** 选中名片 */
  selectedCard: function (e) {
    let index = e.currentTarget.dataset.index
    let card_list = this.data.card_list
    for (var i in card_list) {
      let cards = card_list[i]
      for (var j in cards) {
        let cart_obj = cards[j]
        if (j == index) {
          cart_obj.selected = true
          this.data.selectedCardObj = cart_obj
        } else {
          cart_obj.selected = false
        }
      }
    }
    this.setData({
      card_list: card_list,
    })
  },

  /** 获取场景信息 */
  get_scene_info: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.host + "/biz/clerksituation/getClerkBySituation", {
        id: this.data.id,
      },
      (status, resultCode, message, data) => {
        if (data.situation) {
          this.setData({
            sceneObj: data.situation,
            groupName: data.situation.groupName,
            groupCount: data.count,
            sceneExist: true,
          })
        } else {
          this.setData({
            sceneExist: false,
          })
        }
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '获取场合信息失败!',
          icon: 'none',
          duration: 1500,
          mask: true,
        })
        wx.hideLoading()
      }
    );
  },

  /** 加入场合 */
  joinScene: function (e) {
    if (!this.data.sceneExist) {
      wx.showToast({
        title: '该场合已删除',
        icon: "none",
      })
      return
    }
    let that = this
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        if (!that.data.selectedCardObj) {
          wx.showToast({
            title: '请选择名片！',
            icon: 'none',
            duration: 1500,
            mask: false,
          })
          return
        }

        if (!that.data.sceneObj) {
          wx.showToast({
            title: '场景信息异常！',
            icon: 'none',
            duration: 1500,
            mask: false,
          })
          return
        }
        wx.showLoading({
          title: '加入中...',
        })
        http.post(
          app.globalData.host + "/biz/clerkusersituationrel/add", {
            groupId: that.data.sceneObj.id,
            merchantCode: that.data.selectedCardObj.merchantCode,
            clerkId: that.data.selectedCardObj.id,
            // merchantCode: 'temporary',
            // clerkId: '1900',
          },
          (status, resultCode, message, data) => {
            wx.hideLoading();
            wx.showToast({
              title: '加入成功！',
              duration: 2000,
              mask: false,
            })
            wx.navigateTo({
              url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/scene_detail/scene_detail?id=' + that.data.sceneObj.id + '&fromPage=joinScene',
            })
          },
          (status, resultCode, message, data) => {
            wx.hideLoading()
            let content = '加入场合失败！'
            if (message == 'biz.clerkusersituationrel.add.repeat') {
              content = '已加入该场合！\r\n即将返回首页！'
            }
            wx.showToast({
              title: content,
              icon: 'none',
              duration: 2000,
              mask: true,
              complete: function (res) {
                //将计时器赋值给setInter
                that.data.setInter = setInterval(
                  function () {
                    wx.navigateTo({
                      url: '/pages/tabBar_index/business_homepage/business_homepage' + '&higherLevelCode=' + app.globalData.higherLevelCode,
                    })
                  }, 2000);
              },
            })
          }
        )
      }
    })

  },

  /** 新增临时名片 */
  addTempCard: function (e) {
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        wx.navigateTo({
          url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/temp_card/temp_card',
        })
      }
    })
  },

  /** 使用临时名片 */
  usingTempCard: function () {
    let tempCardId = wx.getStorageSync('reloadPage')
    wx.removeStorageSync('reloadPage')
    let card_list = this.data.card_list
    for (var i in card_list) {
      let cards = card_list[i]
      for (var j in cards) {
        let cart_obj = cards[j]
        if (cart_obj.id == tempCardId) {
          cart_obj.selected = true
          this.data.selectedCardObj = cart_obj
        } else {
          cart_obj.selected = false
        }
      }
    }
    this.setData({
      card_list: card_list,
    })
  },




})