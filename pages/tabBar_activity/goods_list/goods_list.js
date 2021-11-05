// miniprogram/pages/tabBar_activity/goods_list/goods_list.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();

var title = null; //页面title

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "", //列表类型
    typeCodes: "",
    typeList: [{
      name: "全部",
      code: "",
      selected: true,
    }], //类型列表
    tagCode_selected: "", //选中类型code
    sortTypeCode: "distance", //选中排序类型
    goodsTypeCode: "", //选中产品类型 
    sortList: [{
      name: "距离最近",
      value: "jlzj",
      selected: true,
    }, {
      name: "最新时间",
      value: "zxsj",
      selected: false,
    }, {
      name: "到店商品",
      value: "ddsp",
      selected: false,
    }, {
      name: "物流商品",
      value: "wlsp",
      selected: false,
    }], //排序选项列表
    pageIndex: 1,
    pageLimit: 10,
    pageIndex_add: 0, //二维数组下标
    business_activity_list_new: [],
    business_activity_list: [],

    storeCode: "", //商家编号
    categoryCode: "", //商品分类编号
    merchantTypeHidden: false, //商家分类隐藏
    sortHidden: false, //排序隐藏
    goodsTypeHidden: true, //商品分类隐藏
    goodsTypeSelectedIndex: 1, //点击商品排序下标
    priceSortAsc: true, //价格排序是否为升序
    activityTypeText: "玩法选择",
    activityTypeList: [{
      code: "original",
      name: "原价商品"
    }, {
      code: "universalRebate",
      name: "全民赚佣"
    }], //玩法列表
    activityTypeHidden: true, //玩法列表隐藏
    userRole: -1, //登录用户在该企业里所属角色（-1:路人;0:共享合伙人;1:事业合伙人;2:商家）
    inreward: false, //是否为名片商城
    clerk_code: "" //用户code

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)

    app.getOptions(options, function (data) {
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧小程序码
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧二维码
      let higherLevelCode = util.getQueryString(qrcode_scene, "user");
      let type = util.getQueryString(qrcode_scene, "type");
      //&是我们定义的参数链接方式
      if (higherLevelCode) {
        app.globalData.higherLevelCode = higherLevelCode;
        app.globalData.isReloadThePage_tabBar_index = true;
        app.globalData.jumpIndex_fromApp = true;
      }
      if (type) {
        //精品购物
        if (type == "jpgw") {
          wx.setNavigationBarTitle({
            title: '精品购物',
          })
          title = '精品购物';
          that.setData({
            typeCodes: JSON.stringify(["original"])
          })
          //全民赚佣 
        } else if (type == "fxfl") {
          wx.setNavigationBarTitle({
            title: '全民赚佣',
          })
          title = '全民赚佣';
          that.setData({
            typeCodes: JSON.stringify(["universalRebate"])
          })
          //掌尚推荐
        } else if (type == "zstj") {
          wx.setNavigationBarTitle({
            title: '掌创推荐',
          })
          title = '掌创推荐';
          that.setData({
            typeCodes: JSON.stringify([
              "original",
              "universalRebate"
            ]),
          })
        } else {
          that.setData({
            typeCodes: "",
          })
        }
        that.setData({
          type: type,
        })

      }
      that.initOptions(data)
    })

  },
  //初始化参数
  initOptions(options) {
    if (options.type) {
      //精品购物
      if (options.type == "jpgw") {
        wx.setNavigationBarTitle({
          title: '精品购物',
        })
        title = '精品购物';
        this.setData({
          typeCodes: JSON.stringify(["original"])
        })
        //全民赚佣 
      } else if (options.type == "fxfl") {
        wx.setNavigationBarTitle({
          title: '全民赚佣',
        })
        title = '全民赚佣';
        this.setData({
          typeCodes: JSON.stringify(["universalRebate"])
        })
        //掌尚推荐
      } else if (options.type == "zstj") {
        wx.setNavigationBarTitle({
          title: '掌创推荐',
        })
        title = '掌创推荐';
        this.setData({
          typeCodes: JSON.stringify([
            "original",
            "universalRebate"
          ]),
        })
      } else {
        this.setData({
          typeCodes: "",
        })
      }
      this.setData({
        type: options.type,
      })
    }
    if (options.goodsTypeHidden) {
      this.setData({
        goodsTypeHidden: false,
        merchantTypeHidden: true,
        sortHidden: true,
      })
    }
    if (options.name) {
      wx.setNavigationBarTitle({
        title: options.name,
      })
    }
    if (options.categoryCode) {
      this.setData({
        categoryCode: options.categoryCode,
      })
    }
    if (options.storeCode) {
      this.setData({
        storeCode: options.storeCode,
        typeCodes: undefined,
        sortTypeCode: "",
      })
    }
    if (options.userRole) {
      this.setData({
        userRole: options.userRole,
      })
      if (options.userRole != -1) {
        this.setData({
          activityTypeList: this.data.activityTypeList.push({
            code: "inreward",
            name: "名片商城"
          }),
        })
      }
    }
    if (options.inreward) {
      let inreward = options.inreward == "true" ? true : false
      this.setData({
        inreward: inreward,
        typeCodes: inreward == true ? JSON.stringify(["inreward"]) : this.data.typeCodes,
        activityTypeText: inreward == true ? "名片商城" : this.data.activityTypeText,
        activityTypeList: inreward == true ? [{
          code: "inreward",
          name: "名片商城"
        }] : this.data.activityTypeList,
      })
    }
    if (options.clerk_code) {
      this.setData({
        clerk_code: options.clerk_code,
      })
    }
    if (options.higherLevelCode) {
      app.globalData.higherLevelCode = options.higherLevelCode;
      app.globalData.isReloadThePage_tabBar_index = true;
    }


    this.loadTag()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      goodsTypeCode: "",
    })
    this.getBusinessActivity();
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: title ? title : "掌创推荐",
      path: "pages/tabBar_activity/goods_list/goods_list?type=" + this.data.type + (wx.getStorageSync('user') ? "&higherLevelCode=" + wx.getStorageSync('user').userCode : "") + '&batchShare=' + app.globalData.batchShare,
      imageUrl: "",
      success: _res => {},
      fail: _res => {}
    }

  },

  /** 加载分类标签 */
  loadTag: function () {
    http.get(
      app.globalData.host + 'task/tag/tree', {
        rootCode: "merchant",
      },
      (status, resultCode, message, data) => {
        let typeList = this.data.typeList
        typeList = typeList.concat(data.subs)
        this.setData({
          typeList: this.handlerData(typeList),
        })
      },
      (status, resultCode, message, data) => {
        console.log('获取标签失败')
      });
  },


  /**
   * 处理医疗分类
   */
  handlerData: function (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].code == "190228184560") {
        data.splice(i, 1);
        i--;
      }
    }
    return data;
  },

  /** 货源类型选择 */
  typeSelected: function (e) {
    let typeList = this.data.typeList
    let typeItem = e.currentTarget.dataset.item
    for (let i in typeList) {
      let typeObj = typeList[i]
      if (typeObj.name == typeItem.name) {
        typeObj["selected"] = true
      } else {
        typeObj["selected"] = false
      }
    }
    this.setData({
      typeList: typeList,
      tagCode_selected: typeItem.code,
    })
    this.reRoad()
  },


  /** 选择排序类型 */
  sortSelected: function (e) {
    let item = e.currentTarget.dataset.item
    let sortList = this.data.sortList
    for (let i in sortList) {
      let sortItem = sortList[i]
      if (sortItem.value == item.value) {
        sortItem.selected = true
        if (sortItem.value == "jlzj" || sortItem.value == "zxsj") {
          this.setData({
            sortTypeCode: sortItem.value == "jlzj" ? "distance" : "time",
            goodsTypeCode: "",
          })
        } else if (sortItem.value == "ddsp" || sortItem.value == "wlsp") {
          this.setData({
            goodsTypeCode: sortItem.value == "ddsp" ? "service" : "logistics",
            sortTypeCode: "",
          })
        }
      } else {
        sortItem.selected = false
      }
    }
    this.setData({
      sortList: sortList,
    })
    this.reRoad();
  },

  /**
   * 获取企业活动
   */
  getBusinessActivity: function () {
    console.log(this.data.pageIndex)
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    if (this.data.storeCode != "") {
      this.getBusinessActivityByStore()
    } else {
      let url = "fastevent/homePage"
      if (this.data.type == "zstj") {
        url = "fastevent/recommendPage"
      }
      let tagCodes = ""
      if (this.data.tagCode_selected != "") {
        tagCodes = JSON.stringify([this.data.tagCode_selected])
      } else {
        if (app.getTagCode()) {
          tagCodes = JSON.stringify([app.getTagCode()])
        } else {
          tagCodes = undefined
        }
      }
      http.get(
        app.globalData.business_host + url, {
          pageIndex: this.data.pageIndex,
          pageLimit: this.data.pageLimit,
          productTypeCode: this.data.goodsTypeCode != "" ? this.data.goodsTypeCode : undefined,
          locationCityId: app.globalData.locationCityId ? app.globalData.locationCityId : 1,
          lng: app.globalData.current_lng,
          lat: app.globalData.current_lat,
          statuses: JSON.stringify(["1"]),
          typeCodes: this.data.typeCodes,
          tagCodes: tagCodes,
          addressType: this.data.goodsTypeCode == "logistics" ? "user" : undefined,
          storeCode: this.data.storeCode != "" ? this.data.storeCode : undefined,
          categoryCode: this.data.categoryCode != "" ? JSON.stringify([this.data.categoryCode]) : undefined,
          sortType: 'customize',
          sortOrder: 'asc'
        },
        (status, resultCode, message, data) => {
          if (data.list.length < 1) {
            wx.hideLoading();
            this.setData({
              rolling_lock: false
            });
            return
          }
          this.setData({
            business_activity_list_new: data.list,
            rolling_lock: false
          });
          this.handlerActivitiList();
        },
        (status, resultCode, message, data) => {
          wx.hideLoading()
        }
      );
    }
  },

  /**
   * 处理活动列表
   */
  handlerActivitiList: function () {
    console.log("处理活动列表")
    for (let i = 0; i < this.data.business_activity_list_new.length; i++) {
      let list = this.data.business_activity_list_new[i];
      // let key_description = list.description;
      let key_title = list.title;
      // if (key_description.indexOf('穴位') || key_description.indexOf('中医') || key_description.indexOf('养生') || key_description.indexOf('保健') || key_description.indexOf('药') || key_description.indexOf('治疗') || key_description.indexOf('医疗')){
      //   this.data.business_activity_list_new.splice(i, 1);
      //   i--;

      // } else 
      if (key_title.indexOf('穴位') > -1 || key_title.indexOf('中医') > -1 || key_title.indexOf('眼液') > -1 || key_title.indexOf('病毒') > -1 || key_title.indexOf('养生') > -1 || key_title.indexOf('保健') > -1 || key_title.indexOf('药') > -1 || key_title.indexOf('治疗') > -1 || key_title.indexOf('医疗') > -1 || key_title.indexOf('贴') > -1) {
        this.data.business_activity_list_new.splice(i, 1);
        i--;
        continue;
      }
      let obj = {};
      console.log(list)
      obj.pic = list.fileJson == "" ? "" : JSON.parse(list.fileJson).illustration[0]
      if (obj.pic) {
        obj.type = list.fileJson == "" ? "" : util.getUrlType(JSON.parse(list.fileJson).illustration[0])
      }
      this.data.business_activity_list_new[i].illustration = obj.pic;
      this.data.business_activity_list_new[i].videoType = obj.type;
      this.data.business_activity_list_new[i].product.price = util.priceSwitch(this.data.business_activity_list_new[i].product.price);
      this.data.business_activity_list_new[i].discountPrice = util.priceSwitch(this.data.business_activity_list_new[i].discountPrice);
      this.data.business_activity_list_new[i].dis = app.getDisance(this.data.business_activity_list_new[i].merchant.lat, this.data.business_activity_list_new[i].merchant.lng);
    }
    this.setData({
      ['business_activity_list[' + this.data.pageIndex_add + ']']: this.data.business_activity_list_new
    });
    wx.hideLoading();
    console.log(this.data.business_activity_list);
  },

  /**
   * 重新加载
   */
  reRoad: function () {
    this.setData({
      pageIndex: 1,
      pageIndex_add: 0,
      business_activity_list: [],
    })
    this.getBusinessActivity();
  },

  /**
   * 加载更多数据
   */
  loadMore: function () {
    if (this.data.rolling_lock) {
      wx.showToast({
        title: '亲,操作太频繁了',
        icon: "none"
      })
      return
    }
    this.setData({
      rolling_lock: true,
      pageIndex: this.data.pageIndex + 1,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getBusinessActivity();
  },

  /**
   * 跳转到商品详情
   */
  jumpBusinessActivityDetail: function (e) {
    wx.navigateTo({
      url: "/pages/tabBar_index/business_detail/business_detail?code=" + e.currentTarget.dataset.code + '&higherLevelCode=' + app.globalData.higherLevelCode + "&activityType=" + e.currentTarget.dataset.activitytype + (this.data.inreward ? "&clerk_code=" + this.data.clerk_code : ""),
    })
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
      activityTypeText: index == 1 ? "玩法选择" : this.data.activityTypeText,
    })
    if (index != 2) {
      this.reRoad()
    }
  },

  stopTouchMove: function () {
    return false;
  },

  /** 点击玩法选择 */
  clickActivityType: function (e) {
    console.log("点击玩法选择")
    console.log(e.currentTarget.dataset.item)
    this.setData({
      activityTypeText: e.currentTarget.dataset.item.name == "全部" ? "玩法选择" : e.currentTarget.dataset.item.name,
      activityTypeHidden: true,
      typeCodes: e.currentTarget.dataset.item.code != "" ? JSON.stringify([e.currentTarget.dataset.item.code]) : undefined,
    })
    this.reRoad()
  },

  /** 关闭玩法选择 */
  closeActivityTypeContent: function () {
    this.setData({
      activityTypeHidden: true,
    })
  },

  /** 获取商家首页活动 */
  getBusinessActivityByStore: function () {
    http.get(
      app.globalData.business_host + "fastevent/storeHomePage", {
        pageIndex: this.data.pageIndex,
        pageLimit: this.data.pageLimit,
        statuses: JSON.stringify(["1"]),
        storeCode: this.data.storeCode != "" ? this.data.storeCode : undefined,
        categoryCode: this.data.categoryCode != "" ? this.data.categoryCode : undefined,
        typeCodes: this.data.typeCodes ? this.data.typeCodes : JSON.stringify([
          "original",
          "universalRebate"
        ]),
        sortType: 'customize',
        sortOrder: 'asc'
      },
      (status, resultCode, message, data) => {
        if (data.list.length < 1) {
          wx.hideLoading();
          this.setData({
            rolling_lock: false
          });
          return
        }
        this.setData({
          business_activity_list_new: data.list,
          rolling_lock: false
        });
        this.handlerActivitiList();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },
})