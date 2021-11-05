// miniprogram/pages/tabBar_user_center/business_card_manage/business_card_tagList/business_card_tagList.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
var RSAKey = require('../../../../utils/rsa-client.js');
var base64 = require('../../../../utils/base64.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected_tagIndex: -1, //大行业标签选中的下标
    cardList: "", //名片列表
    filter: "",
    tagCodes: {},
    searchKeyword: "", //搜索关键字
    searchResult: false, //是否显示搜索结果
    tempCardList: [], //临时缓存
    otherCardNum: 0,
    isAllCard: true, //是否为全部名片
    allCardNum:0,//全部名片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    this.getMineCardList();
    this.getMineClerkNum();
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
   * 获取我的职位列表
   */
  getMineCardList: function() {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/mine/listByFilter", {
        filter: this.data.tagCode,
        tagCode: this.data.tagCode
      },
      (status, resultCode, message, data) => {
        let list = data;
        console.log(list)
        this.setData({
          cardList: list,
          isAllCard: this.data.tagCode ? false : true,
        });
        this.handleCardData(list);
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 处理名片数据
   */
  handleCardData: function(list) {
    let cardNum = 0
    for (var i = 0; i < list.length; i++) {
      if (this.data.tagCodes.tagCode == list[i].tagCode) {

      } else {
        let obj = {};
        obj.tagCode = list[i].tagCode;
        obj.tagName = list[i].tagName;
        this.setData({
          ['tagCodes.' + list[i].tagCode]: obj,
        });
      }
      if (list[i].merchantCode != "temporary" && !this.data.tagCode && this.data.isAllCard) {
        cardNum = cardNum + 1
        this.setData({
          otherCardNum: cardNum,
        });
      }
    }

  },

  /**
   * 改变行业,改变大类别
   */
  changeTagCode_index: function(e) {
    this.setData({
      tagCode: e.currentTarget.dataset.code,
      selected_tagIndex: e.currentTarget.dataset.index,
    });
    this.getMineCardList();
  },

  /**
   * 跳转到卡片详情
   */
  jumpCardDetail: function(e) {
    if (e.currentTarget.dataset.status == 2) {
      wx.showToast({
        title: '名片审核中',
        icon: "none"
      })
      return
    }
    if (e.currentTarget.dataset.merchantcode == "temporary") {
      // wx.showToast({
      //   title: '临时名片无法查看',
      //   icon: "none"
      // })
      wx.navigateTo({
        url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/temp_card/temp_card?read=true&workerId=' + e.currentTarget.dataset.id,
      })
      return
    } else {
      // wx.navigateTo({
      //   url: '/pages/tabBar_user_center/business_card_manage/business_card_detail/business_card_detail?merchantCode=' + e.currentTarget.dataset.merchantcode + "&workerId=" + e.currentTarget.dataset.id,
      // })
      wx.navigateTo({
        url: '/pages/clerk/show/show?merchantCode=' + e.currentTarget.dataset.merchantcode + "&workerId=" + e.currentTarget.dataset.id + '&higherLevelCode='+ app.globalData.higherLevelCode,
      })
    }
  },

  /** 搜索关键字输入 */
  searchKeywordInputHandler: function(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        searchResult: true,
        searchKeyword: e.detail.value
      })
      this.searchCard();
    } else {
      this.setData({
        searchResult: false,
        searchKeyword: "",
      })
    }

  },

  /** 清空搜索关键字 */
  clearSearchKeyword: function() {
    this.setData({
      searchKeyword: "",
      searchResult: false,
    })
  },

  /**
   * 本地搜索
   */
  searchCard: function() {
    this.setData({
      tempCardList: [],
    });
    for (var i = 0; i < this.data.cardList.length; i++) {
      if (this.data.cardList[i].merchantName) {
        if (this.data.cardList[i].merchantName.indexOf(this.data.searchKeyword) > -1) {
          this.data.tempCardList.push(this.data.cardList[i]);
        }
      }

    }
    this.setData({
      tempCardList: this.data.tempCardList
    });
  },

  /** 分享名片 */
  shareCardCode: function(e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/scene_code/scene_code?id=' + e.currentTarget.dataset.id + "&type=clerk",
    })
  },

  /**
   * 查看我其他企业团队
   */
  lookMineTeam: function(e) {
    if (e.currentTarget.dataset.merchantstatus == 0) {
      wx.showModal({
        title: "温馨提示",
        content: '该企业已注销',
      })
      return
    }
    if (e.currentTarget.dataset.merchantstatus == 3) {
      wx.showModal({
        title: "温馨提示",
        content: '该企业已过期',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_members/business_card_members?merchantCode=' + e.currentTarget.dataset.code + "&role=1&userId=" + wx.getStorageSync("user").id,
    })
  },


  /**
 * 获取我的名片数量 mine/count
 */
  getMineClerkNum: function () {
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/mine/count", {
      },
      (status, resultCode, message, data) => {
        this.setData({
          allCardNum: data
        });
        wx.hideLoading();


      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '删除失败',
          icon: "none"
        })
        wx.hideLoading()
      }
    );
  },
})