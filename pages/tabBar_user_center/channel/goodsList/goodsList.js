// pages/tabBar_user_center/channel/goodsList/goodsList.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:'',
    merchantCode: "", //商家编号
    business_info: "", //企业信息
    userRole: -1, //登录用户在该企业里所属角色（-1:路人;0:共享合伙人;1:事业合伙人;2:商家）
    isLogin: false, //是否登录
    isMerchant: false, //是否为商家
    isCheckIn: false, //是否入驻
    channelGoods_pageIndex: 1,
    channelGoods_pageLimit: 20,
    channelGoods_pageIndex_add: 0, //二维数组下标
    channelGoods: [], //货源列表
    sourceTagSelectedIndex: 0, //选中货源分类下标
    sourceCategoryCode: "", //选中货源分类编号
    goodsTypeSelectedIndex: 1, //点击商品排序下标
    isLoadAll: false, //是否加载全部
    toView: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.merchantCode) { //企业code，必传
      this.setData({
        merchantCode: options.merchantCode,
      })
    }
  },

  /*
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getBusinessInfo()
    this.isBranchBoss()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.checkUser()
    //判断是否为前一级页面返回
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    if (currPage.data.predata) {
      this.setData({
        sourceCategoryCode: currPage.data.predata.item.code,
        sourceTagSelectedIndex: currPage.data.predata.index,
        toView: "item" + currPage.data.predata.index,
      })
      this.isBranchBoss()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.isLoadAll) {
      this.loadMore()
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

  /**
   * 获取企业详情信息
   */
  getBusinessInfo: function () {
    http.get(
      app.globalData.host + "merchant/info", {
        merchantCode: this.data.merchantCode
      },
      (_status, _resultCode, _message, data) => {
        wx.setStorageSync('business_homepage_cache_data' + this.data.merchant_code, data)
        this.setData({
          business_info: data.merchant,
          userRole: data.role,
        });
        this.checkUser()
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /** 检查用户状态 */
  checkUser: function () {
    let isMerchant = false
    let isLogin = false
    let isCheckIn = false
    if (wx.getStorageSync('user')) {
      isLogin = true
      if (this.data.business_info.userId == wx.getStorageSync('user').id) {
        isMerchant = true
      }
    }
    if (wx.getStorageSync("myMerchantInfo") || app.globalData.myMerchantInfo != "") {
      isCheckIn = true
      this.getSourceType()
    }
    this.setData({
      isMerchant: isMerchant,
      isLogin: isLogin,
      isCheckIn: isCheckIn,
    })
  },

  /** 获取货源分类 */
  getSourceType: function () {
    http.get(
      app.globalData.business_host + "eventType/getProductTypes", {
        storeCode: this.data.merchantCode,
        countProduct: 1,
        statuses: JSON.stringify(["1"]),
        excludeEmpty: 1,
        agency: 1,
      },
      (_status, _resultCode, _message, _data) => {
        console.log(_data)
        let gtl = []
        gtl.push({
          code: "",
          name: "全部仓货",
          count: _data.allCount
        })
        gtl = gtl.concat(_data.typeList)
        if (_data.otherCount > 0) {
          gtl.push({
            code: "0",
            name: "未分类",
            count: _data.otherCount
          })
        }
        this.setData({
          sourceTagList: gtl,
        })
      },
      (_status, _resultCode, _message, _data) => {}
    );
  },

   /** 判断是不是分店店长*/
  isBranchBoss:function(){
http.get(
  app.globalData.host + "personal/info",{
    userId:wx.getStorageSync('user').id
  },
  (_status, _resultCode, _message, _data) => {
   if(_data.merchantType=='branchStore' && _data.mainStoreCode == this.data.merchantCode){
       this.setData({
        hidden:'-1'
       })
   }
   this.getChannelGoods()
   console.log(this.data.hidden)
  },
  (_status, _resultCode, _message, _data) => {}

)
  },
  /** 获取渠道货源 */
  getChannelGoods: function () {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    http.get(
      app.globalData.business_host + "product/page", {
        pageIndex: this.data.channelGoods_pageIndex,
        pageLimit: this.data.channelGoods_pageLimit,
        storeCode: this.data.merchantCode,
        categoryCode: this.data.sourceCategoryCode == "" ? undefined : this.data.sourceCategoryCode,
        hidden:this.data.hidden !='' ? this.data.hidden :null
      },
      (_status, _resultCode, _message, data) => {
        if (data.list.length > 0) {
          this.handlerChannelGoodsList(data.list)
          if (data.list.length < this.data.channelGoods_pageLimit) {
            this.setData({
              isLoadAll: true,
            })
          }
        } else {
          this.setData({
            isLoadAll: true,
          })
          wx.hideLoading()
        }
      },
      (_status, _resultCode, _message, data) => {
        wx.hideLoading()
      });
  },

  /** 处理货源列表 */
  handlerChannelGoodsList: function (list) {
    for (let i in list) {
      let item = list[i]
      item["fileJson"] = item.fileJson == "" ? "" : JSON.parse(item.fileJson)
      let max = 0
      //遍历sku寻找最大收益
      for (let k in item.skus) {
        let tempSkuItem = item.skus[k]
        let disparity = ((tempSkuItem.suggestedPrice - tempSkuItem.price) / tempSkuItem.price).toFixed(2)
        if (disparity > max) {
          max = disparity
        }
      }
      if (max == 0) {
        item["desc"] = ""
      } else {
        item["desc"] = "预计收益+" + (max * 100).toFixed(0) + "%"
      }


      let minSkuItem = null
      let maxSkuItem = null
      let totalStock = 0
      for (let j in item.skus) {
        let skuObj = item.skus[j]
        if (!minSkuItem && !maxSkuItem) {
          minSkuItem = skuObj
          maxSkuItem = skuObj
        } else {
          if (skuObj.suggestedPrice > maxSkuItem.suggestedPrice) {
            maxSkuItem = skuObj
          } else if (skuObj.suggestedPrice < minSkuItem.suggestedPrice) {
            minSkuItem = skuObj
          }
        }
        totalStock = totalStock + skuObj.stock
      }
      item["totalStock"] = totalStock
      item["minPrice"] = minSkuItem.suggestedPriceYuan
      item["maxPrice"] = maxSkuItem.suggestedPriceYuan
      if (minSkuItem.suggestedPrice == maxSkuItem.suggestedPrice) {
        item["onlyPrice"] = true
      } else {
        item["onlyPrice"] = false
      }
      item["onlyPrice"] = true
      item["displayEndTime"] = util.tsFormatTime(item.endTime, "Y年M月D日 h:m")
    }
    this.setData({
      ['channelGoods[' + this.data.channelGoods_pageIndex_add + ']']: list
    })
    wx.hideLoading()
  },

  /** 点击货源分类 */
  clickSourceTag: function (e) {
    this.setData({
      sourceTagSelectedIndex: e.currentTarget.dataset.index,
      sourceCategoryCode: e.currentTarget.dataset.item.code,
    })
    this.getChannelGoods()
  },

  /**
   * 加载更多数据
   */
  loadMore: function () {
    this.setData({
      channelGoods_pageIndex: this.data.channelGoods_pageIndex + 1,
      channelGoods_pageIndex_add: this.data.channelGoods_pageIndex_add + 1
    })

    this.getChannelGoods()
  },

  /** 前往商品分类页 */
  goToGoodsCategory: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_activity/goods_category/goods_category?merchantCode=' + this.data.merchantCode + "&categoryTypeIndex=" + e.currentTarget.dataset.index + "&userRole=" + this.data.userRole + "&tagBarHidden=true",
    })
  },

  /** 前往货源详情页 */
  goToChannelGoodsDetail: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/channel/goodsDetail/goodsDetail?code=' + e.currentTarget.dataset.item.code,
    })
  },
})