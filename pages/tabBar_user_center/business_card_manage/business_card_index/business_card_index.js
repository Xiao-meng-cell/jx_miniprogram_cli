// miniprogram/pages/tabBar_user_center/business_card_manage/business_card_index/business_card_index.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    networkType: true, //监听网络连接与断开
    card_list_merchant: [], //卡片列表数据
    mineMerchantCard: [],
    loadAll: false, //加载全部数据
    pageIndex: 0, //翻页目录
    pageIndex_add: 0, //二维数组下标
    pageLimit: 10,
    isMerchant: false, //是否是商家
    tipsDisplay: false, //提示是否显示
    isOfficial: false, //是否有正式名片
    otherCardNum: 0, //其他名片数量
    iphone_x: false, //是否为iphonex
    merchantCode: "",
    mineMerchantCard_one: "", //商家自己的名片
    selectedFilterIndex: 0, //选中过滤条件下标
    filterHidden: true, //过滤条件隐藏
    sortTypes: [{
      id: "",
      name: "综合排序"
    }, {
      id: "time",
      name: "最新排序"
    }, {
      id: "hot",
      name: "热门排序"
    }, ], //排序类型
    clerkMerchantTypes: [{
      id: "",
      code: "all",
      name: "全部",
    }], //名片商家行业类型
    scrollTop: 0,
    selectedSortType: "", //选中排序类型
    sortTypeLabel: "综合排序", //排序类型显示文本
    selectedClerkMerchantType: "", //选中名片商家行业类型
    merchantTypeLabel: "全部分类", //名片商家行业显示文本
    clerkTypes: [{
        id: "default",
        name: "默认名片",
      }, {
        id: "business",
        name: "商务名片",
      },
      {
        id: "festival",
        name: "贺卡名片",
      },
      {
        id: "video",
        name: "视频名片",
      },
      {
        id: "placard",
        name: "海报名片",
      },
    ], //名片类型
    selectedClerkType: "", //选中名片类型
    roleTypes: [{
        id: "2",
        name: "管理员"
      }, {
        id: "1",
        name: "事业合伙人"
      },
      {
        id: "0",
        name: "共享合伙人"
      },
    ], //名片身份
    selectedRoleType: "", //选中名片身份
    merchantTypes: [{
        id: "merchant",
        name: "企业商家"
      }, {
        id: "channel",
        name: "品牌厂家"
      },
      {
        id: "ultimate",
        name: "品牌旗舰店"
      },
      {
        id: "branchStore",
        name: "旗舰智控"
      },
    ], //商家类型
    selectedMerchantType: "", //选中商家类型
    vicpalmMain: app.globalData.vicpalmMain, //是否是独立小程序
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    this.setData({
      iphone_x: app.globalData.iPhone_X,
    })
    if (app.globalData.myMerchantInfo.code) {
      this.setData({
        isMerchant: true,
        merchantCode: app.globalData.myMerchantInfo.code
      });
    }
  },

  /**监听网络变化 */
  watchBack: function (networkType) {
    this.setData({
      networkType: networkType
    });
    // console.log('==========网络监听==========', this.data.networkType);
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
    if (!app.globalData.vicpalmMain) { //独立小程序，有名片直接打开名片，没有名片跳转申请指定商家名片
      app.isUserLogin(function (isLogin) {
        if (isLogin) {
          that.getUserClerkInfo();
        }
      })
    } else {
      that.getMineCardList();
      that.getMineCardOne();
      that.getMineClerkType();
    }
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
    this.getMineCardList();
    wx.stopPullDownRefresh(); //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.loadAll) {
      this.loadMore()
    }
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
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: "/pages/tabBar_user_center/user_center"
                    })
                  }
                }
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

  /**
   * 加载更多数据
   */
  loadMore: function () {
    this.setData({
      pageIndex: this.data.pageIndex + 1,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getMineCardList()
  },

  /**
   * 获取我的职位列表
   */
  getMineCardOne: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.host + "biz/user/merchant/clerk/mine/info", {
        merchantCode: app.globalData.myMerchantInfo.code
      },
      (status, resultCode, message, data) => {
        let clerkEnabel = true
        if (data.ultimate && data.ultimate != 0) {
          if ((data.ultimate != 0 && data.ultimate != 1) || (data.merchantHidden && data.merchantHidden == 1)) {
            clerkEnabel = false
          }
        } else {
          if (data.merchantStatus != 1 || (data.merchantHidden && data.merchantHidden == 1)) {
            clerkEnabel = false
          }
        }
        data["clerkEnabel"] = clerkEnabel
        this.setData({
          mineMerchantCard_one: data
        });
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 获取我的职位列表
   */
  getMineCardList: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/mine/listByFilter", {
        skip: this.data.pageIndex * this.data.pageLimit,
        limit: this.data.pageLimit,
        orderBy: this.data.selectedSortType == "" || this.data.selectedSortType.id == "" ? undefined : this.data.selectedSortType.id,
        tagCode: this.data.selectedClerkMerchantType == "" || this.data.selectedClerkMerchantType.id == "" ? undefined : this.data.selectedClerkMerchantType.code,
        styleType: this.data.selectedClerkType == "" ? undefined : this.data.selectedClerkType.id,
        role: this.data.selectedRoleType == "" ? undefined : this.data.selectedRoleType.id,
        level: this.data.selectedMerchantType == "" ? undefined : this.data.selectedMerchantType.id,
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
    if (!list || list.length < this.data.pageLimit) {
      this.setData({
        loadAll: true,
      })
    }
    let finalList = []
    for (let i in list) {
      let item = list[i]
      if (wx.getStorageSync('user').id != item.merchantUserId) {
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
    }
    this.setData({
      ['card_list_merchant[' + this.data.pageIndex_add + ']']: finalList,
    });
    wx.hideLoading();
  },


  /**
   * 跳转收藏列表
   */
  toCollection: function () {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_favorites/business_card_favorites',
    })
  },

  /**
   * 跳转浏览记录
   */
  tobrowsing: function () {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_record/business_card_record',
    })
  },

  /**
   * 跳转创建场合
   */
  createRoom: function () {
    let that = this
    if (this.data.isOfficial) {
      wx.navigateTo({
        url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/business_card_scene',
      })
    } else {
      if (app.globalData.myMerchantInfo) {
        wx.showModal({
          title: '提示',
          content: '创建场合需要申请名片，是否添加名片？',
          showCancel: true,
          cancelText: '取消',
          confirmText: '添加',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply?merchantCode=' + app.globalData.myMerchantInfo.code,
              })
            }
          },
        })
      } else {
        this.setData({
          tipsDisplay: true,
        })
      }
    }
  },

  /**
   * 跳转申请名片
   */
  toApplyCard: function () {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply',
    })
  },

  /**
   * 搜索
   */
  searchCard: function (e) {
    this.setData({
      key: e.detail.value
    });
  },

  /**
   * 搜索跳转
   */
  searchJumpList: function () {
    // wx.navigateTo({
    //   url: '/pages/tabBar_user_center/business_card_manage/business_card_searchResult/business_card_searchResult?key=' + this.data.key,
    // })
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_searchResult/business_card_searchResult',
    })
  },

  /** 关闭提示 */
  closeTip: function (e) {
    this.setData({
      tipsDisplay: false,
    })
  },

  /** 申请名片 */
  applyCard: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply',
    })
  },

  /**
   * 跳转到所有名片
   */
  allCard: function () {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_tagList/business_card_tagList',
    })
  },

  /**
   * 删除员工名片
   */
  deleteCard: function (workerId) {
    wx.showLoading({
      title: '删除中',
    })
    http.post(
      app.globalData.host + "/biz/user/merchant/clerk/del", {
        id: workerId,
        merchantCode: this.data.merchantCode
      },
      (status, resultCode, message, data) => {
        if (data) {
          wx.showToast({
            title: '删除成功',
            icon: "none"
          })
          wx.navigateBack({
            delta: 1
          })
        }
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

  /**
   * 店主申请名片
   */
  mekeClerk: function () {

  },

  /** 捕获鼠标操作 */
  catchMouseOperate: function () {

  },

  /** 过滤条件隐藏 */
  filterHidden: function () {
    this.setData({
      filterHidden: !this.data.filterHidden,
    })
  },

  /** 点击筛选条件 */
  clickFilter: function (e) {
    let filterHidden = false
    if (this.data.selectedFilterIndex == e.currentTarget.dataset.index && !this.data.filterHidden) {
      filterHidden = true
    }
    this.setData({
      selectedFilterIndex: e.currentTarget.dataset.index,
      filterHidden: filterHidden,
      scrollTop: e.currentTarget.dataset.index == 1 ? 0 : this.data.scrollTop,
    })
  },

  /** 获取我的名片行业分类 */
  getMineClerkType: function () {
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/getClerkTagCodeList", {
        userId: wx.getStorageSync('user').id
      },
      (status, resultCode, message, data) => {
        let mts = this.data.clerkMerchantTypes
        this.setData({
          clerkMerchantTypes: mts.concat(data),
        })
      },
      (status, resultCode, message, data) => {}
    );
  },

  /** 点击过滤条件 */
  clickFilterItem: function (e) {
    let item = e.currentTarget.dataset.item
    if (this.data.selectedFilterIndex == 0) {
      this.setData({
        selectedSortType: item,
        sortTypeLabel: item.name,
      })
    } else if (this.data.selectedFilterIndex == 1) {
      this.setData({
        selectedClerkMerchantType: item,
        merchantTypeLabel: item.name,
      })
    }
    this.search()
  },

  /** 点击名片类型 */
  clickClerkType: function (e) {
    let item = e.currentTarget.dataset.item
    let clerkTypes = this.data.clerkTypes
    for (let i in clerkTypes) {
      let clerkType = clerkTypes[i]
      if (item.id == clerkType.id) {
        clerkType["selected"] = true
        this.setData({
          selectedClerkType: item,
        })
      } else {
        clerkType["selected"] = false
      }
    }
    this.setData({
      clerkTypes: clerkTypes,
    })
  },

  /** 点击名片类型 */
  clickClerkType: function (e) {
    let item = e.currentTarget.dataset.item
    let clerkTypes = this.data.clerkTypes
    for (let i in clerkTypes) {
      let clerkType = clerkTypes[i]
      if (item.id == clerkType.id) {
        if (this.data.selectedClerkType.id == item.id) {
          this.setData({
            selectedClerkType: "",
          })
        } else {
          this.setData({
            selectedClerkType: item,
          })
        }
      }
    }
    this.setData({
      clerkTypes: clerkTypes,
    })
  },


  /** 点击身份 */
  clickRoleType: function (e) {
    let item = e.currentTarget.dataset.item
    let roleTypes = this.data.roleTypes
    for (let i in roleTypes) {
      let roleType = roleTypes[i]
      if (item.id == roleType.id) {
        if (this.data.selectedRoleType.id == item.id) {
          this.setData({
            selectedRoleType: "",
          })
        } else {
          this.setData({
            selectedRoleType: item,
          })
        }
      }
    }
    this.setData({
      roleTypes: roleTypes,
    })
  },

  /** 点击商家类型 */
  clickMerchantTypes: function (e) {
    let item = e.currentTarget.dataset.item
    let merchantTypes = this.data.merchantTypes
    for (let i in merchantTypes) {
      let merchantType = merchantTypes[i]
      if (item.id == merchantType.id) {
        if (this.data.selectedMerchantType.id == item.id) {
          this.setData({
            selectedMerchantType: "",
          })
        } else {
          this.setData({
            selectedMerchantType: item,
          })
        }
      }
    }
    this.setData({
      merchantTypes: merchantTypes,
    })
  },

  /** 重置 */
  reset: function () {
    this.setData({
      selectedSortType: "",
      selectedClerkMerchantType: "",
      selectedClerkType: "",
      selectedRoleType: "",
      selectedMerchantType: "",
      sortTypeLabel: "综合排序",
      merchantTypeLabel: "全部分类",
    })
    this.search()
  },

  /** 搜索 */
  search: function () {
    this.clearDataStatus()
    this.filterHidden()
    this.getMineCardList()
  },

  clearDataStatus: function () {
    this.setData({
      card_list_merchant: "",
      pageIndex: 0,
      pageIndex_add: 0,
      loadAll: false,
    })
  },

  /** 删除我的名片 */
  delMineClerk: function (e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否要删除该名片',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
          })
          http.post(
            app.globalData.host + "/biz/user/merchant/clerk/del", {
              id: e.currentTarget.dataset.item.id,
              merchantCode: e.currentTarget.dataset.item.merchantCode,
            },
            (status, resultCode, message, data) => {
              wx.showToast({
                icon: "none",
                title: '删除成功',
              })
              that.clearDataStatus()
              that.getMineCardList()
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