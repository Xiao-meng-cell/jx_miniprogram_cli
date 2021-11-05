var http = require('../../../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //场景ID
    cardObj: '', //名片信息
    sceneObj: '', //场景信息
    groupName: '', //场合名称
    groupCount: '888', //场合人数
    sceneQRCodeUrl: '', //二维码
    enbaleDelete: false, //启用禁用删除
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    if (options.type == "clerk") {
      this.setData({
        type: "clerk"
      });
      this.get_clerk_info();
      wx.setNavigationBarTitle({
        title: '扫一扫,加名片'
      })
    } else {
      this.get_scene_info();
    }
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
    if (this.data.type == "clerk") {
      this.setData({
        type: "clerk"
      });

    } else {
      this.get_scene_info();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // },

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
        let bool = false
        if (data.situation.userId == wx.getStorageSync('user').id) {
          bool = true
        }
        this.setData({
          sceneObj: data.situation,
          cardObj: data.situation.clerk,
          groupName: data.situation.groupName,
          enbaleDelete: bool,
          groupCount: data.count,
        })
        this.getUserQRCode();
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 获取个人名片信息
   */
  get_clerk_info: function () {
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/info", {
        id: this.data.id,
      },
      (status, resultCode, message, data) => {
        // let bool = false
        // if (data.situation.userId == wx.getStorageSync('user').id) {
        //   bool = true
        // }
        if (data == null || data == -1) {
          return
        }
        this.setData({
          card_name: data.name,
          card_position: data.position,
          card_phone: data.phone,
          card_shortName: data.merchantShortName,
          card_merchantName: data.merchantName,
          card_headimg: data.headimg,
          workerId: data.id,
          userId: data.userId,
          card_email: data.email,
          card_qq: data.qq,
          card_wx: data.wx
        });

        this.getUserQRCode();
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 获取加入场景小程序码
   */
  getUserQRCode: function () {
    var that = this;
    http.get(
      app.globalData.host + 'wechat/wxmlQrcodeMap', {
        userId: wx.getStorageSync('user').id,
        size: 256,
        scene: wx.getStorageSync('user').userCode + '$' + that.data.id,
        page: this.data.type == "clerk" ? app.globalData.higherLevelCode ? "pages/clerk/show/show?higherLevelCode=" + app.globalData.higherLevelCode : "pages/clerk/show/show" : "pages/tabBar_user_center/business_card_manage/business_card_scene/join_scene/join_scene",
        appId: app.globalData.appId,
      },
      (status, resultCode, message, data) => {
        that.setData({
          sceneQRCodeUrl: data,
        });
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
      });
  },

  /** 删除场合 */
  delScene: function (e) {
    let that = this
    wx.showModal({
      title: '删除提示',
      content: '确定是否删除场合？',
      showCancel: true, //是否显示取消按钮
      success: function (res) {
        if (res.confirm) {
          let groupIds = []
          groupIds.push(that.data.sceneObj.id)
          http.post(
            app.globalData.host + "/biz/clerksituation/deleteByGroupIds", {
              groupIds: JSON.stringify(groupIds),
            },
            (status, resultCode, message, data) => {
              wx.showToast({
                title: '删除场合成功！',
                icon: 'none',
                duration: 1500,
                mask: false,
              })
              //刷新列表
              wx.setStorageSync('reloadPage', true)
              wx.navigateBack({
                delta: 1,
              })
            },
            (status, resultCode, message, data) => {
              wx.hideLoading()
            }
          );
        }
      },
    })
  },
})