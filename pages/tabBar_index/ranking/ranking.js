// pages/tabBar_index/ranking/ranking.js

var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');

//获取应用实例
const app = getApp();

const MENU_WIDTH_SCALE = 0.32;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 100;
const FAST_SPEED_EFF_Y = 50;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    pageLimit: 10,
    pageIndex_add: 0, //二维数组下标
    business_list_data: [], //企业列表数据
    hidden_business_list_data: false,
    networkType: true, //网络连接标识
    type: "local",
    type_level: "local",
    orderBy: "distance", //按什么排序
    scrollLeft: 0, //横向滚动位置
    slide_menu: {
      windowWidth: 0,
      menuWidth: 0,
      offsetLeft: 0,
      tStart: true
    },
    tagCodes: "", //行业标签,大类
    tagCode_index: -1, //大行业标签选中的code
    tag_index: -1, //大行业标签选中的下标
    tagCode_item_index: 0, //小行业标签选中的code
    tag_item_index: -1, //小行业标签选中下标
    screen_index: 1, //活动排序类别
    business_list_data_temp: {}, //存放已经加载出来的商家id，以便好判断是否加载过该数据，由大地提供的思路
    continue_load: true, //是否继续加载
    overAll: false,
    type_level: "",
    selected_tagCode: "",
    leftMenuDisplay: true,
    isTotalRanking: false, //是否为综合总排行
    topNum: 0, //排名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    if (options.selectedTagCode) {
      this.setData({
        selected_tagCode: options.selectedTagCode,
      });
    }
    if (options.tagCode) {
      this.setData({
        tagCode: options.tagCode,
        tagCode_index: options.tagCode
      });
    }
    if (options.all) {
      this.setData({
        all: options.all
      });
    }
    if (options.overAll) {
      this.setData({
        overAll: true,
        orderBy: "hot",
        type: "country",
        screen_index: 3,
      });
    }
    if (options.index) {
      this.setData({
        tag_index: options.index
      });
    }
    if (this.data.tagCode) {
      wx.setNavigationBarTitle({
        title: '企业行业排名'
      })
    } else if (options.all) {
      wx.setNavigationBarTitle({
        title: '精准分类'
      })
    }

    if (options.isTotalRanking) {
      this.setData({
        isTotalRanking: options.isTotalRanking,
      })
    }
    this.setData({
      leftMenuDisplay: app.getTagCode() ? false : true,
    })
    this.getBusinessRankingList(this.data.tagCode);
    this.getTagCode();
    this.initSlide();
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
    wx.showLoading({
      title: '数据更新中',
      mask: true,
      complete: res => {
        let that = this;
        setTimeout(function () {
          that.reloadThePage();
          wx.hideLoading()
          wx.stopPullDownRefresh()
        }, 1000)
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageIndex: this.data.pageIndex + 10,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getBusinessRankingList(this.data.tagCode);
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }

  /**
   * 改变首页排序类别
   */
  changeScreen_index: function (e) {
    this.setData({
      type: e.currentTarget.dataset.type,
      pageIndex: 0,
      pageIndex_add: 0,
      screen_index: e.currentTarget.dataset.screen_index,
      orderBy: "hot", //按什么排序
      business_list_data: [],
      business_list_data_temp: {},
      continue_load: false,
    });
    this.getBusinessRankingList(this.data.tagCode);
  },



  /**
   * 获取综合排名数据
   */
  getBusinessRankingList: function (tagCode, type) {
    this.setData({
      tagCode: tagCode ? tagCode : "",
    });
    http.get(
      app.globalData.host + "/biz/user/merchant/list", {
        skip: this.data.pageIndex,
        limit: this.data.pageLimit,
        lng: app.globalData.current_lng,
        lat: app.globalData.current_lat,
        merchantCityId: app.globalData.city_info.id ? app.globalData.city_info.id : 1,
        type: type ? type : this.data.type,
        orderBy: this.data.orderBy,
        filter: this.data.keyword,
        tagCode: tagCode ? tagCode : undefined
      },
      (status, resultCode, message, data) => {


        this.handleBusinessListData(data);
        if (data.length < 10) {
          if (type != "country") {
            if (this.data.type == "local" && this.data.orderBy != "hot" && this.data.continue_load) {

              this.setData({
                type_level: this.data.type_level == "province" ? "country" : "province",
                // screen_index: 2
              })
              this.loadBusinessListByRecommend();
            } else if (this.data.type == "province" && this.data.orderBy != "hot" && this.data.continue_load) {

              this.setData({
                type_level: "country",
                // screen_index: 3
              });
              this.loadBusinessListByRecommend();
            }
          }
        }
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 处理列表数据
   */
  handleBusinessListData: function (business_list_data_temp) {
    let business_temp = this.data.business_list_data_temp;
    if (business_list_data_temp.length == 0) {
      wx.hideLoading()
      if (this.data.business_list_data.length == 0) {
        this.setData({
          hidden_business_list_data: true,
        });
      }
      return
    } else {
      this.setData({
        hidden_business_list_data: false,
      });
    }
    for (var i = 0; i < business_list_data_temp.length; i++) {
      let topNum = this.data.topNum + 1
      this.setData({
        topNum: topNum,
      })
      business_list_data_temp[i].topNum = topNum
      business_list_data_temp[i].isTotalRanking = this.data.isTotalRanking
      business_list_data_temp[i].dis = app.getDisance(business_list_data_temp[i].lat, business_list_data_temp[i].lng);
      if (business_temp[business_list_data_temp[i].code]) {
        business_list_data_temp.splice(i, 1);
        i--;
      } else {
        business_temp[business_list_data_temp[i].code] = business_list_data_temp[i].code
        this.setData({
          ['business_list_data_temp.' + business_list_data_temp[i].code]: business_list_data_temp[i].code
        });
      }
    }
    this.setData({
      ['business_list_data[' + this.data.pageIndex_add + ']']: business_list_data_temp
    });
    wx.hideLoading();
  },

  /**
   * 初次加载推荐列表数据
   */
  loadBusinessListByRecommend: function () {
    this.setData({
      pageIndex: 0,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getBusinessRankingList(this.data.tagCode, this.data.type_level);
  },


  /**
   * 重新加载页面
   */
  reloadThePage: function () {
    this.setData({
      pageIndex: 0,
      pageIndex_add: 0,
      screen_index: 1,
      type: "local",
      business_list_data: [], //企业列表数据
      business_list_data_temp: {}
    });
    this.getBusinessRankingList(this.data.tagCode);
  },

  /**
   * 跳转至企业首页
   */
  navigationBusinessDetails: function (e) {
    wx.showLoading({
      title: '跳转中',
    });
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + e.currentTarget.dataset.merchantcode + '&tagCode=' + e.currentTarget.dataset.tagcode + '&userId=' + e.currentTarget.dataset.userid,
    })
  },

  /**
   * 处理行业标签列表
   */
  handleTagCode_list: function (array) {
    var tagCode_list = [];
    for (var i = 0; i < array.length; i++) {
      var temp = array[i].subs;
      for (var j = 0; j < temp.length; j++) {
        if (temp[j].code != "190228184560") {
          tagCode_list = tagCode_list.concat(temp[j]);
        }
        if (this.data.tagCode_index == temp[j].code && tagCode_list.length >= 4) {
          this.setData({
            scrollLeft: (tagCode_list.length * 130) + 150
          })
        }
      }
    }
    return tagCode_list;
  },

  /**防止滑动冒泡 */
  doNotMove: function () {
    return false;
  },

  /**
   * 跳转到搜索页
   */
  jumpSearchPage: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_index/search_page/search_page',
    })
  },


  /**
   * 首页切换城市
   */
  tag_city: function () {
    wx.getSetting({
      success(res) {
        if (!res.authSetting["scope.userLocation"]) {
          wx.showModal({
            title: '位置授权',
            content: '当前获取位置未授权，可在设置中授权',
            confirmText: "去授权",
            cancelText: "取消",
            success: res => {
              if (res.confirm) {
                wx.navigateTo({
                  url: "/pages/tabBar_user_center/open_setting/open_setting",
                })
              }

            }
          })
        }
        return
      }
    })

    wx.navigateTo({
      url: '/pages/tabBar_index/switch_city/switch_city?cityId=1'
    })
  },


  /**
   * 检查网络是否打开，定位授权是否打开
   */
  checkNetworkTypeUserLocation: function () {
    var that = this;
    var setNetworkTypeTimeOut = function () {
      if (app.globalData.networkType === undefined) {
        setTimeout(function () {
          if (app.globalData.networkType !== undefined) {
            that.setData({
              networkType: app.globalData.networkType
            });
          } else {
            setNetworkTypeTimeOut()
          }
        }.bind(that), 100)
      } else {
        that.setData({
          networkType: app.globalData.networkType
        });
      }
    }
    setNetworkTypeTimeOut();
    var setUserLocationTimeOut = function () {
      if (app.globalData.city_info.id === "") {
        setTimeout(function () {
          if (app.globalData.city_info.id !== "") {
            that.setData({
              city_info: app.globalData.city_info
            });
          } else {
            setUserLocationTimeOut()
          }
        }.bind(that), 100)
      } else {
        that.setData({
          city_info: app.globalData.city_info
        });
      }
    }
    setUserLocationTimeOut();
  },




  /**
   * 初始化左侧菜单滑动参数
   */
  initSlide: function () {
    let res = wx.getSystemInfoSync()
    this.windowWidth = res.windowWidth;
    if (this.data.leftMenuDisplay) {
      this.data.slide_menu.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
    } else {
      this.data.slide_menu.menuWidth = 0
    }

    if (this.data.all) {
      this.data.slide_menu.offsetLeft = this.data.slide_menu.menuWidth;
      // let that = this;
      // setTimeout(function () {
      //   that.data.slide_menu.offsetLeft = 0;
      //   that.setData({
      //     slide_menu: that.data.slide_menu
      //   })
      // }, 2500)
    } else {
      this.data.slide_menu.offsetLeft = 0;
    }

    this.data.slide_menu.windowWidth = res.windowWidth;
    this.setData({
      slide_menu: this.data.slide_menu
    })
  },

  /**
   * 用户触摸屏幕开始
   */
  handlerStart: function (e) {
    let {
      clientX,
      clientY
    } = e.touches[0];
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.tapStartTime = e.timeStamp;
    this.startX = clientX;
    this.data.slide_menu.tStart = true;
    this.setData({
      slide_menu: this.data.slide_menu
    })
  },

  /**
   * 用户触摸屏幕滑动,有些手机会卡，可能市计算太频繁
   */
  handlerMove: function (e) {
    let {
      clientX
    } = e.touches[0];
    let {
      slide_menu
    } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    slide_menu.offsetLeft -= offsetX;
    if (slide_menu.offsetLeft <= 0) {
      slide_menu.offsetLeft = 0;
    } else if (slide_menu.offsetLeft >= slide_menu.menuWidth) {
      slide_menu.offsetLeft = slide_menu.menuWidth;
    }
    this.setData({
      slide_menu: slide_menu
    })
  },

  /**
   * 用户触摸屏幕结束
   */
  handlerEnd: function (e) {
    this.data.slide_menu.tStart = false;
    this.setData({
      slide_menu: this.data.slide_menu
    })
    let {
      slide_menu
    } = this.data;
    let {
      clientX,
      clientY
    } = e.changedTouches[0];
    let endTime = e.timeStamp;
    //快速滑动
    // if (endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
    //   //向左
    //   if (this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
    //     slide_menu.offsetLeft = 0;
    //   } else if (this.tapStartX - clientX < -FAST_SPEED_DISTANCE) {
    //     slide_menu.offsetLeft = slide_menu.menuWidth;
    //   } 

    // } else {
    //   if (slide_menu.offsetLeft >= slide_menu.menuWidth / 2) {
    //     slide_menu.offsetLeft = slide_menu.menuWidth;
    //   } else {
    //     slide_menu.offsetLeft = 0;
    //   }
    // }
    //向左
    if (this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
      slide_menu.offsetLeft = 0;
    } else if (this.tapStartX - clientX < -FAST_SPEED_DISTANCE) {
      slide_menu.offsetLeft = slide_menu.menuWidth;
    }
    this.setData({
      slide_menu: slide_menu
    })
  },

  /**
   * 用户点击屏幕
   */
  handlerPageTap: function (e) {
    let {
      slide_menu
    } = this.data;
    if (slide_menu.offsetLeft != 0) {
      slide_menu.offsetLeft = 0;
      this.setData({
        slide_menu: slide_menu
      })
    }
  },

  /**
   * 获取行业标签 merchant
   */
  getTagCode: function () {
    http.get(
      app.globalData.host + 'task/tag/tree', {
        rootCode: 'merchant',
      },
      (status, resultCode, message, data) => {
        this.setData({
          tagCodes: data.subs
        });
        if (this.data.selected_tagCode != "") {
          this.handleSelectedTag()
        } else {
          wx.hideLoading();
        }
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: '获取失败',
          icon: "none",
          duration: 2000
        })
      });
  },

  /**
   * 改变行业,改变大类别
   *  tagCodes: "", //行业标签,大类
      tagCode_index: -1,//大行业标签选中的code
      tag_index: -1,//大行业标签选中的下标
      tagCode_item_index: 0, //小行业标签选中的code
      tag_item_index: -1, //小行业标签选中下标
   */
  changeTagCode_index: function (e) {
    this.handleParentTag(e.currentTarget.dataset.index, e.currentTarget.dataset.code)
  },

  handleSelectedTag: function () {
    for (let i in this.data.tagCodes) {
      let tagCodeItem = this.data.tagCodes[i]
      if (tagCodeItem.code == this.data.selected_tagCode) {
        this.handleParentTag(i, tagCodeItem.code)
        break
      }
    }
    wx.hideLoading()
  },

  handleParentTag: function (index, code) {
    if (index == -1 && code == 0) { //点击全部，显示综合排名
      this.setData({
        pageIndex: 0,
        pageIndex_add: 0,
        tag_index: -1,
        tagCode_index: -1, //大行业分类code
        tagCode_item_index: 0,
        tag_item_index: -1,
        screen_index: 1,
        type: "local",
        orderBy: "hot",
        overAll: true,
        business_list_data: [],
        business_list_data_temp: {}
      });
      wx.setNavigationBarTitle({
        title: '企业综合排名'
      })
      this.getBusinessRankingList();
    } else {
      this.setData({
        pageIndex: 0,
        pageIndex_add: 0,
        tagCode_index: code,
        tag_index: index,
        tagCode_item_index: 0,
        tag_item_index: -1,
        screen_index: 1,
        type: "local",
        overAll: false,
        business_list_data: [],
        scrollLeft: 0,
        business_list_data_temp: {}
      });
      wx.setNavigationBarTitle({
        title: '企业行业排名'
      })
      this.getBusinessRankingList(this.data.tagCodes[this.data.tag_index].code);
    }
    this.handlerPageTap();
  },

  /**
   * 改变行业中的小类
   *  tagCodes: "", //行业标签,大类
      tagCode_index: -1,//大行业标签选中的code
      tag_index: -1,//大行业标签选中的下标
      tagCode_item_index: 0, //小行业标签选中的code
      tag_item_index: -1, //小行业标签选中下标
   */
  changeTagCodeItem_index: function (e) {
    let tagCode_item_index = this.data.tagCode_item_index == e.currentTarget.dataset.tag ? this.data.tagCode_index : e.currentTarget.dataset.tag
    let tag_item_index = this.data.tag_item_index == e.currentTarget.dataset.index ? -1 : e.currentTarget.dataset.index
    this.setData({
      pageIndex: 0,
      pageIndex_add: 0,
      tagCode_item_index: tagCode_item_index,
      tag_item_index: tag_item_index,
      business_list_data: [],
      screen_index: 1,
      type: "local",
      business_list_data_temp: {},
      // scrollLeft: (this.data.tagCodes.length * 130) + 150,
    });
    if (e.currentTarget.dataset.index == -1 && e.currentTarget.dataset.tag == 0) { //行业内所有排名 
      if (this.data.tag_index == -1) {
        this.getBusinessRankingList();
      } else {
        this.getBusinessRankingList(this.data.tagCodes[this.data.tag_index].code);
      }
    } else {
      this.getBusinessRankingList(this.data.tagCode_item_index);
    }
  },

  /**
   * 距离最近或者时间最新
   */
  changeOrderBy_index: function (e) {
    this.setData({
      pageIndex: 0,
      pageIndex_add: 0,
      business_list_data: [],
      business_list_data_temp: {},
      orderBy: e.currentTarget.dataset.orderby, //按什么排序
      continue_load: e.currentTarget.dataset.orderby == "time" ? false : true,
    });
    this.getBusinessRankingList(this.data.tagCode);
  },

  /**
   * 加载更多数据
   */
  loadMore: function () {

  },

  /**
   * 重新加载
   */
  reRoad: function () {

  },



  /**
   * 点击按钮，打开左侧大行业菜单
   */
  openTagMenu: function () {
    let {
      slide_menu
    } = this.data;
    if (slide_menu.offsetLeft != 0) {
      slide_menu.offsetLeft = 0;
      this.setData({
        slide_menu: slide_menu
      })
    } else {
      this.data.slide_menu.offsetLeft = this.data.slide_menu.menuWidth;
      this.setData({
        slide_menu: this.data.slide_menu
      })
    }
  },
})