// miniprogram/pages/tabBar_user_center/business_card_manage/business_card_searchResult/business_card_searchResult.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');

//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResult: "",
    card_list_merchant: [], //卡片列表数据
    loadAll: false, //加载全部数据
    pageLimit: 20,
    pageIndex: 0, //翻页目录
    pageIndex_add: 0, //二维数组下标
    pageIndex_add2: 0,
    type: "clerk",
    type_index: 1,
    keyword: "",
    autoCompleteHidden: true, //自动补全隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.key && options.key != "undefined") {
      this.setData({
        keyword: options.key
      });
      this.executeSearch();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.searchBar = this.selectComponent("#searchBar")
    this.searchBar.setFocus()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.loadAll) {
      this.loadMore()
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

  /**
   * 加载更多数据
   */
  loadMore: function () {
    this.setData({
      pageIndex: this.data.pageIndex + 1,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.executeSearch()
  },

  /**
   * 搜索数据
   */
  executeSearch: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/mine/listByFilter", {
        keyword: this.data.keyword,
        skip: this.data.pageIndex * this.data.pageLimit,
        limit: this.data.pageLimit,
      },
      (status, resultCode, message, data) => {
        this.handleCardData(data)
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 处理名片数据
   */
  handleCardData: function (list) {
    if (!list || list.length < 1) {
      this.setData({
        loadAll: true,
      })
    }
    let finalList = []
    for (let i in list) {
      let item = list[i]
      let clerkEnabel = true
      if (item.ultimate && item.ultimate != 0) {
        if ((item.ultimate != 0 && item.ultimate != 1) || (item.merchantHidden && item.merchantHidden == 1)) {
          clerkEnabel = false
        }
      } else {
        if (item.merchantStatus != 1 || (item.merchantHidden && item.merchantHidden == 1)) {
          clerkEnabel = false
        }
      }
      item["clerkEnabel"] = clerkEnabel
      finalList.push(item)
    }
    this.setData({
      ['card_list_merchant[' + this.data.pageIndex_add + ']']: finalList,
    });
    wx.hideLoading();
  },

  /**
   * 切换类别
   */
  tagType: function (e) {
    this.setData({
      type: e.currentTarget.dataset.type
    });
    this.executeSearch();
  },

  /**
   * 跳转到名片详情
   */
  jumpToBusiness: function (e) {
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

  /** 进入场景详情 */
  toSceneDetail: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/scene_detail/scene_detail?id=' + e.currentTarget.dataset.id,
    })
  },

  /** 清空初始状态 */
  clearDataStatus: function (e) {
    if (e && e.detail != "") {
      this.setData({
        keyword: e.detail
      });
    } else {
      this.setData({
        keyword: ""
      });
    }
    this.setData({
      card_list_merchant: "",
      searchResult: "",
      pageIndex: 0,
      pageIndex_add: 0,
      loadAll: false,
      autoCompleteHidden: true,
    })
    this.executeSearch()
  },

  /** 关键字变化 */
  keywordChangeInput: function (e) {
    if (e.detail && e.detail != "") {
      this.setData({
        autoCompleteHidden: false,
        keyword: e.detail,
      })
      this.getClerkListKeyword(e.detail)
    } else {
      this.setData({
        autoCompleteHidden: true,
      })
    }
  },

  /** 获取名片关键字 */
  getClerkListKeyword: function (value) {
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/getSearchString", {
        keyWord: value,
        userId: wx.getStorageSync('user').id,
      },
      (status, resultCode, message, data) => {
        this.handleKeywordData(data)
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  handleKeywordData: function (data) {
    let searchResult = []
    for (let i in data) {
      let temp = data[i]
      let tempObj = {}
      if (temp.merchantCode == "temporary") {
        continue
      }
      if (temp.merchantName.indexOf(this.data.keyword) > -1) {
        tempObj["name"] = temp.merchantName
        tempObj["type"] = "公司"
        let isExist = false
        for (let j in searchResult) {
          let tempResultItem = searchResult[j]
          if (tempResultItem.name == temp.merchantName && tempResultItem.type == "公司") {
            isExist = true
            break
          }
        }
        if (!isExist) {
          searchResult.push(tempObj)
        }
      } else if (temp.name.indexOf(this.data.keyword) > -1) {
        tempObj["name"] = temp.name
        tempObj["type"] = "名字"
        let isExist = false
        for (let j in searchResult) {
          let tempResultItem = searchResult[j]
          if (tempResultItem.name == temp.name && tempResultItem.type == "名字") {
            isExist = true
            break
          }
        }
        if (!isExist) {
          searchResult.push(tempObj)
        }
      }
    }
    this.setData({
      searchResult: searchResult,
    })
  },

  /** 点击搜索记录 */
  clickResultItem: function (e) {
    let item = e.currentTarget.dataset.item
    this.setData({
      keyword: item.name,
      autoCompleteHidden: true,
      pageIndex: 0,
      pageIndex_add: 0,
      card_list_merchant: "",
      loadAll: false,
    })
    this.executeSearch()
  },
})