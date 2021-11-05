// miniprogram/pages/tabBar_index/recruit/detail/recruit_detail.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruit_id: "", //招聘信息ID
    recruit_info: {}, //招聘信息
    goodList_hidden: true, //产品列表隐藏
    share_hidden: true, //分享隐藏
    goods_list: [], //产品列表
    merchantHeadim: "",
    clerkStatus: 0, //职员状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.getOptions(options, function (data) {
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧小程序码
      //&是我们定义的参数链接方式
      if (qrcode_scene.split("$")[0]) {
        app.globalData.higherLevelCode = qrcode_scene.split("$")[0];
        app.globalData.isReloadThePage_tabBar_index = true;
      }
      if (qrcode_scene.split("$")[1]) {
        that.setData({
          recruit_id: qrcode_scene.split("$")[1],
        })
      }
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧二维码
      that.initOptions(data)
    })
  },
  //初始化参数
  initOptions(options) {

    if (options.higherLevelCode) {
      app.globalData.higherLevelCode = options.higherLevelCode;
      app.globalData.isReloadThePage_tabBar_index = true;
    }
    if (options.id) {
      this.setData({
        recruit_id: options.id,
      })
    }
    this.loadRecruitInfo()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.recruit_info.merchantName + "全国招聘共享合伙人,一起挑战百万年薪!",
      path: "pages/tabBar_index/recruit/detail/recruit_detail?higherLevelCode=" + wx.getStorageSync('user').userCode + "&id=" + this.data.recruit_id + '&batchShare=' + app.globalData.batchShare,
      imageUrl: this.data.merchantHeadim,
      success: res => {
        wx.showToast({
          title: '转发成功',
          icon: "none"
        })
      },
      fail: res => {
        wx.showToast({
          title: '转发失败',
          icon: "none"
        })
      }
    }
  },

  /** 加载招聘详情 */
  loadRecruitInfo: function () {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    http.get(
      app.globalData.host + '/biz/merchant/staffing/getById', {
        id: this.data.recruit_id,
      },
      (status, resultCode, message, data) => {
        let imgList = []
        let josnUrl = JSON.parse(data.jsonUrl);
        if (josnUrl) {
          for (let i in josnUrl) {
            if (josnUrl[i].type == "image") {
              imgList.push(josnUrl[i].value)
            }
          }
        }
        data.imgList = imgList
        this.setData({
          recruit_info: data,
          merchantHeadim: imgList[0]
        })
        this.loadGoodsList()
        this.checkClerk()
      },
      (status, resultCode, message, data) => {
        console.log('获取标签失败')
        wx.hideLoading()
      });
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

  /** 显示产品列表 */
  showGoodsList: function () {
    if (this.data.goods_list.length > 0) {
      this.setData({
        goodList_hidden: !this.data.goodList_hidden,
      })
    } else {
      wx.showToast({
        title: '暂无相关产品！',
        icon: 'none',
        mask: true,
      })
    }
  },

  /** 捕获鼠标操作 */
  catchMouseOperate: function () {

  },

  /** 加载产品列表 */
  loadGoodsList: function () {
    http.get(
      app.globalData.business_host + '/internalrewardevent/page', {
        pageIndex: 1,
        pageLimit: 10,
        storeCode: this.data.recruit_info.merchantCode,
      },
      (status, resultCode, message, data) => {
        let goodsList = data.list
        for (let i in goodsList) {
          let goodsItem = data.list[i]
          let cheapGoods = null
          for (let j in goodsItem.onshelf.onshelfSkus) {
            let sku = goodsItem.onshelf.onshelfSkus[j]
            if (cheapGoods) {
              if (cheapGoods.price > sku.price) {
                cheapGoods = sku
              }
            } else {
              cheapGoods = sku
            }
          }
          goodsItem["minPrice"] = cheapGoods.priceYuan
        }
        this.setData({
          goods_list: goodsList,
        })
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        console.log('加载产品列表失败')
        wx.hideLoading()
      });
  },

  /** 隐藏显示分享 */
  showShare: function () {
    this.setData({
      share_hidden: !this.data.share_hidden,
    })
  },

  /** 成为事业合伙人 */
  join: function () {
    if (this.data.clerkStatus == 2) {
      wx.showToast({
        title: '事业合伙人审核中...',
        icon: 'none',
      })
    } else {
      wx.navigateTo({
        url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply?merchantCode=' + this.data.recruit_info.merchantCode,
      })
    }
  },

  /** 检查职员名片 */
  checkClerk: function () {
    http.get(
      app.globalData.business_host + '/biz/user/merchant/clerk/apply/check', {
        merchantCode: this.data.recruit_info.merchantCode,
      },
      (status, resultCode, message, data) => {
        this.setData({
          clerkStatus: data,
        })
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      });
  },
})