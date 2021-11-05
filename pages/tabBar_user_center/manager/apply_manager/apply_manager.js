// miniprogram/pages/tabBar_user_center/manager/apply_manager/apply_manager.js
var RSAKey = require('../../../../utils/rsa-client.js');
var base64 = require('../../../../utils/base64.js');
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
// 引入SDK核心类
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var register = require('../../../../utils/refreshLoadRegister.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCode: null,
    stateList: [
      "我审核的", "我申请的"
    ],
    selectedIndex: 0, //tab下标
    pageLimit: 150, //页码条数
    onePage: 0, //tab1页码
    twoPage: 0,

    userid: "", //商家id
    requestParams: {},
    requestUrl: 'biz/user/merchant/clerk/apply/list',
    //数据列表数组
    tabOnes: [

      // {id:12, merchantCode: '商家编码', userId: '用户id', name: '姓名', company: '单位', phone: '电话', email: '邮箱', addr: '地址', sex: '性别', headimg: '头像' },
      // { id: 22, merchantCode: '商家编码', userId: '用户id', name: '姓名', company: '单位', phone: '电话', email: '邮箱', addr: '地址', sex: '性别', headimg: '头像' },
      // { id: 14, merchantCode: '商家编码', userId: '用户id', name: '姓名', company: '单位', phone: '电话', email: '邮箱', addr: '地址', sex: '性别', headimg: '头像' }
    ],
    tabTwos: [],

    //是否可以上拉加载
    tabOnesLoadEnable: false,
    tabTwosLoadEnable: false,

    //判断当前选择的tab是初次显示
    firstInOnes: true,
    firstInTwos: true,

    //数据为空或请求失败的提示语
    tabOnesEmpty: '没有任何数据',
    tabTwosEmpty: '没有任何数据'

  },

  //模拟刷新数据
  refresh: function() {
    if (this.data.selectedIndex == 0) {
      //我申请的
      this.setData({
        onePage: 0,
        requestUrl: 'biz/user/merchant/clerk/apply/list',
        requestParams: {
          skip: 0,
          limit: this.data.pageLimit,
          merchantCode: this.data.merchantCode ? this.data.merchantCode : undefined,
        },
      });
    } else if (this.data.selectedIndex == 1) {
      //我审核的
      this.setData({
        twoPage: 0,
        requestUrl: 'biz/user/merchant/clerk/mine/list',
        requestParams: {
          skip: 0,
          limit: this.data.pageLimit
        },
      });
    }
    this.getDatas(true);

  },

  //模拟加载更多数据
  loadMore: function(index) {
    if (this.data.tabOnesLoadEnable || this.data.tabTwosLoadEnable) {
      if (this.data.selectedIndex == 0) {
        //我申请的
        var pageNum = (this.data.onePage) + 1;
        this.setData({
          onePage: pageNum,
          requestParams: {
            skip: pageNum * this.data.pageLimit + 1,
            limit: this.data.pageLimit
          },
        });
      } else if (this.data.selectedIndex == 1) {
        //我审核的
        var pageNum = (this.data.twoPage) + 1;
        this.setData({
          twoPage: pageNum,
          requestParams: {
            skip: pageNum * this.data.pageLimit + 1,
            limit: this.data.pageLimit
          },
        });
      }
      this.getDatas(false);
    } else {
      register.loadFinish(this, true);
    }
  },


  swiperChange: function(e) {
    var detailIndex = e.detail.current;
    var source = e.detail.source;
    if (this.selectedIndex != detailIndex && source == 'touch') {
      this.setData({
        selectedIndex: detailIndex
      });
    }
    this.data.requestParams = {};
    if (detailIndex == 0) { //我申请的
      //data为空数组时，要执行的代码
      this.setData({
        onePage: 0,
        requestUrl: 'biz/user/merchant/clerk/apply/list',
        requestParams: {
          skip: 0,
          limit: this.data.pageLimit,
          merchantCode: this.data.merchantCode ? this.data.merchantCode : undefined,
        },
      });
      this.getDatas(true);
    } else if (detailIndex == 1) { //我审核的
      this.setData({
        twoPage: 0,
        requestUrl: 'biz/user/merchant/clerk/mine/list',
        requestParams: {
          skip: 0,
          limit: this.data.pageLimit
        },
      });
      this.getDatas(true);
    }
  },

  turnPage: function(e) {
    var that = this;
    var dataIndex = e.currentTarget.dataset.index;

    if (this.data.selectedIndex != dataIndex) {
      this.setData({
        selectedIndex: dataIndex
      });
    } else {
      this.data.requestParams = {};
      if (this.data.selectedIndex == 0) { //我申请的
        if (this.data.firstInOnes) {
          this.setData({
            onePage: 0,
            requestUrl: 'biz/user/merchant/clerk/apply/list',
            requestParams: {
              skip: 0,
              limit: this.data.pageLimit,
              merchantCode: this.data.merchantCode ? this.data.merchantCode : undefined,
            },
          });
          this.getDatas(true);
        }
      } else if (this.data.selectedIndex == 1) { //我审核的
        if (this.data.firstInTwos) {
          this.setData({
            twoPage: 0,
            requestUrl: 'biz/user/merchant/clerk/mine/list',
            requestParams: {
              skip: 0,
              limit: this.data.pageLimit
            },
          });
          this.getDatas(true);
        }
      }
    }
  },

  /**
   * 获取审核、申请列表
   */
  getDatas: function(isRefresh) {
    console.log('获取审核、申请列表')
    wx.showLoading({
      title: '正在加载中...',
    })
    var that = this;
    var params = that.data.requestParams;
    http.get(
      app.globalData.host + that.data.requestUrl, params,
      (status, resultCode, message, data) => {
        console.log(data)
        that.initData(isRefresh, that.data.selectedIndex, data);
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: '获取数据失败！',
          duration: 2000
        })
      });
  },

  /**
   * 绑定数据到UI
   * 是否是刷新
   * tab下标
   * 数据
   */
  initData: function(isRefresh, tabIndex, data) {
    var that = this;
    if (data == undefined || data == null || data.length == 0) {
      if (tabIndex == 0) {
        this.setData({
          tabOnesLoadEnable: false,
        });
      } else if (tabIndex == 1) {
        this.setData({
          tabTwosLoadEnable: false,
        });
      }

      if (isRefresh) {
        if (tabIndex == 0) {
          this.setData({
            tabOnes: [],
          });
        } else if (tabIndex == 1) {
          this.setData({
            tabTwos: [],
          });
        }
      }
    } else if (data.length > 0) {
      if (isRefresh) {
        if (tabIndex == 0) {
          that.data.tabOnes = [];
        } else if (tabIndex == 1) {
          that.data.tabTwos = [];
        }
      }
      var resultDatas = that.data.tabOnes;
      if (tabIndex == 0) {
        resultDatas = that.data.tabOnes;
      } else if (tabIndex == 1) {
        resultDatas = that.data.tabTwos;
      }

      var loadEnable = false; //是否启用触底加载更多
      if (data.length == that.data.pageLimit || data.length > that.data.pageLimit) {
        if (resultDatas.length > 0 && data[data.length - 1].id == resultDatas[resultDatas.length - 1].id) {
          loadEnable = false;
        } else {
          loadEnable = true;
          resultDatas = resultDatas.concat(data);
        }
      } else if (data.length < that.data.pageLimit) {
        resultDatas = resultDatas.concat(data);
        loadEnable = false;
      }
      if (tabIndex == 0) {
        this.setData({
          tabOnes: resultDatas,
          tabOnesLoadEnable: loadEnable
        });
      } else if (tabIndex == 1) {
        this.setData({
          tabTwos: resultDatas,
          tabTwosLoadEnable: loadEnable
        });
      }
    }
    register.loadFinish(that, true);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    register.register(this);
    if (options.userid) {
      this.setData({
        userid: options.userid
      })
    }
    if (options.merchantCode) {
      this.setData({
        merchantCode: options.merchantCode
      })
    }
    var pageType = options.type;
    if (pageType == 'tabOnes') {
      this.setData({
        onePage: 0,
        requestUrl: 'biz/user/merchant/clerk/apply/list',
        requestParams: {
          skip: 0,
          limit: this.data.pageLimit,
          merchantCode: this.data.merchantCode?this.data.merchantCode:undefined,
        },
      });

    } else if (pageType == 'tabTwos') {
      //我审核的
      this.setData({
        twoPage: 0,
        requestUrl: 'biz/user/merchant/clerk/mine/list',
        requestParams: {
          skip: 0,
          limit: this.data.pageLimit
        },
      });
    }
    this.getDatas(true);
  },

  handlerApply: function(data) {
    var that = this;
    var id = data.currentTarget.dataset.id;
    var status = data.currentTarget.dataset.status;
    let merchantCode = data.currentTarget.dataset.merchantcode;
    wx.showModal({
      title: '提示',
      content: "是否" + status == 0 ? "取消" : "确定" + "审核？",
      confirmText: "确定",
      cancelText: "取消",
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '正在操作中...',
          });
          http.post(
            app.globalData.host + 'biz/user/merchant/clerk/apply/handler', {
              id: id,
              status: status,
              merchantCode: merchantCode
            },
            (status, resultCode, message, data) => {
              that.getDatas(true);
              wx.hideLoading();
            },
            (status, resultCode, message, data) => {
              wx.hideLoading();
              wx.showToast({
                title: '操作失败！',
                duration: 2000
              })
            });
        }
      }
    })
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
    this.refresh()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // }
})