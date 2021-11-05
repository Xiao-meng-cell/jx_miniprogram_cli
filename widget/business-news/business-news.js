// widget/business-news/business-news.js
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //企业编号
    merchantCode: {
      type: String,
      value: null,
    },
    higherLevelCode: {
      type: String,
      value: null,
    },

    //显示标题
    showTitle: {
      type: null,
      observer: function (newVal, oldVal) {
        if (newVal != '') {
          this.setData({
            showTitle: newVal
          })
        }
      }
    },
    type: {
      type: String,
      value: undefined,
    },
    includePlatform: {
      type: Boolean,
      value: undefined,
    },
    clerkMark: {
      //传'3'表示在合伙人动态页面引用,传'0'表示在商家主页页面引用，传'1'表示在名片详情页面引用，不传值时表示在企业展示页面引用
      type: String,
      value: undefined,
    },
    scope: {
      type: String,
      value: undefined,
    },
    clerkCode: {
      type: String,
      value: undefined,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    businessStatus: {},
    landerUserId: wx.getStorageSync('user') ? wx.getStorageSync('user').id : "",
    userId: '',
    merchantCode: "", //企业编号
    merchantInfo: "",
    allList: [], //动态资讯列表
    pageIndex: 1,
    pageIndex_add: 0, //二维数组下标
    loadAll: false,
    clerk: "", //合伙人
    clerkDisplay: false, //显示合伙人
    showTitle: true,
    type: "",
    more_operate: true,
    more_operate1: false,
    business_detail: {},
  },

  show: function () {
    if (this.properties.higherLevelCode) {
      app.globalData.higherLevelCode = this.properties.higherLevelCode;
    }
    this.setData({
      merchantCode: this.properties.merchantCode,
      includePlatform: this.properties.includePlatform,
      type: this.properties.type,
    })
  },

  ready() {
    this.getBusinessInfo()
    this.getNewsList()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /** 获取合伙人动态引用组件 */
    getNewsList: function () {
      wx.showLoading({
        title: '数据加载中...',
      })
      if (this.properties.clerkMark == '3') {
        http.get(
          app.globalData.host + "biz/user/merchant/news/page/clerk", {
            index: this.data.pageIndex,
            limit: 20,
            merchantCode: this.properties.merchantCode,
            includePlatform: this.properties.includePlatform != "" ? false : true,
            setMerchant: true,
            hideen: this.properties.clerkMark == 0 ? 1 : undefined,
          },
          (_status, _resultCode, _message, data) => {
            if (data.count == 0) {
              this.triggerEvent("listEmpty")
            }
            if (data.list.length < 1 || data.list.length < 20) {
              this.setData({
                loadAll: true,
              })
              wx.hideLoading();
            }
            this.setData({
              news_list_new: data.list
            });
            if (data.list.length > 0) {
              this.handlerNewsData()
            }
          },
          (_status, _resultCode, _message, _data) => {
            wx.hideLoading()
          }
        );
      }
      /** 名片，商家主页，企业展示引用组件 */
      else {
        http.get(
          app.globalData.host + "biz/user/merchant/news/pageLive", {
            index: this.data.pageIndex,
            limit: 20,
            merchantCode: this.properties.merchantCode,
            scope: this.properties.scope, //名片传‘clerk’   商家主页和企业展示传‘merchant’
            setMerchant: true,
            type: this.properties.type != "" ? this.properties.type : undefined,
            clerk: this.properties.clerkMark == 1 ? this.properties.clerkMark : undefined, //名片传‘1’   商家主页、企业展示页面不传值
            includePlatform: this.properties.includePlatform, //商家主页传true   名片和企业展示传false
            hideen: 1,
          },
          (_status, _resultCode, _message, data) => {
            if (data.count == 0) {
              this.triggerEvent("listEmpty")
            }
            if (data.list.length < 1 || data.list.length < 20) {
              this.setData({
                loadAll: true,
              })
              wx.hideLoading();
            }
            this.setData({
              news_list_new: data.list
            });
            if (data.list.length > 0) {
              this.handlerNewsData()
            }
          },
          (_status, _resultCode, _message, _data) => {
            wx.hideLoading()
          }
        );
      }

    },

    /**
     * 处理动态资讯数据
     */
    handlerNewsData: function () {
      let list_new = []
      for (let i = 0; i < this.data.news_list_new.length; i++) {
        let item = this.data.news_list_new[i]
        item["createdTimeDisplay"] = util.tsFormatTime(item.createdTime, "Y-M-D")
        if (item.params) {
          item["params"] = item.params != "" ? JSON.parse(item.params) : ""
        } else {
          item["params"] = ""
        }
        let liveStstus = ''
        let newsTypeLabel = ""
        let isFavorites = false
        if (item.typeName) {
          newsTypeLabel = item.typeName
        }
        if (item.params) {
          if (item.params.mark) {
            newsTypeLabel = item.params.mark
          }
          // if (item.params.isFavorites) {
          //   isFavorites = item.params.isFavorites == 1 ? true : false
          // }
        }
        if (item.liveMerchantInfo) {
          liveStstus = item.liveMerchantInfo.liveStstus
        }
        item["liveStstus"] = liveStstus
        item["newsTypeLabel"] = newsTypeLabel
        item["isFavorites"] = isFavorites
        // 处理JSON数据 start 
        if (item.json && item.json != "") {
          let jsonList = JSON.parse(item.json)
          let jsonFileList = []
          let jsonImgList = []
          for (let i in jsonList) {
            let jsonItem = jsonList[i]
            if (jsonItem.type == "text") {
              item["jsonDescText"] = jsonItem.value
            } else if (jsonItem.type == "image") {
              jsonFileList.push(jsonItem)
              jsonImgList.push(jsonItem.value)
            } else if (jsonItem.type == "video") {
              jsonFileList.push(jsonItem)
            } else if (jsonItem.type == "link") {
              let fileItem = {}
              fileItem["type"] = "image"
              fileItem["value"] = jsonItem.image
              fileItem["is3D"] = jsonItem.is3D ? jsonItem.is3D : false
              fileItem["weburl"] = jsonItem.value ? jsonItem.value : ""
              jsonFileList.push(fileItem)
              jsonImgList.push(jsonItem.image)
            }
          }
          item["jsonFileList"] = jsonFileList
          item["jsonImgList"] = jsonImgList
        }

        if (!item.description || item.description == "") {
          if (item.jsonDescText && item.jsonDescText != "") {
            item["description"] = item.jsonDescText
          }
        }

        // 处理JSON数据 end

        for (var j in item.eventList) {
          let goods = item.eventList[j]
          if (goods.fileJson) {
            goods.fileJson = JSON.parse(goods.fileJson);
            goods.illustration = goods.fileJson.illustration;
          }
        }
        item["moreOperate"] = false

        //处理直播信息
        if (item.action == "live") {
          let openTime = item.params.time
          if ((openTime + "").length < 13) {
            item["liveOpenTime"] = openTime * 1000
          } else {
            item["liveOpenTime"] = openTime
          }
        }

        //处理显示头像
        item.merchant["displayHeadImg"] = util.getMerchantHeadImg(item.merchant)
        list_new.push(item)
      }
      this.setData({
        ['allList[' + this.data.pageIndex_add + ']']: list_new
      });
      // console.log(this.data.allList)
      wx.hideLoading()
    },

    /**
     * 加载更多数据
     */
    loadMore: function () {
      //避免无数据时触发触底加载
      if (!this.data.allList[0]) {
        return
      }
      if (!this.data.loadAll) {
        this.setData({
          pageIndex: this.data.pageIndex + 1,
          pageIndex_add: this.data.pageIndex_add + 1
        })
        this.getNewsList()
      }
    },

    //图片点击事件查看大图
    imgYu: function (event) {
      var src = event.currentTarget.dataset.src; //获取data-src
      var imgList = event.currentTarget.dataset.list; //获取data-list

      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList, // 需要预览的图片http链接列表
      })
    },

    /** 跳转动态详情页 */
    goToNewsDetail: function (e) {
      let item = e.currentTarget.dataset.item;
      // console.log('item=============', item);
      //action 跳转操作（merchant,clerk,event,h5,news）
      //params 跳转参数(商家编码，名片id, 活动编码， h5链接地址, 动态id)
      let scene = "news" + this.properties.merchantCode;
      let sceneDT = item.id;
      // console.log(scene, sceneDT);
      switch (item.action) {
        case "merchant":
          wx.navigateTo({
            url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.business_detail.merchant.code + '&higherLevelCode=' + app.globalData.higherLevelCode + "&sceneType=" + scene + "&sceneDT=" + sceneDT + "&clerk_code=" + this.data.clerkCode,
          })
          break;
        case "clerk":
        case "clerkNew":
        case "clerkHot":
          this.setData({
            clerk: item,
          })
          // console.log(this.data.clerk)
          this.clerkDisplay()
          break;
        case "event":
          if (item.params && item.params.eventCode) {
            wx.navigateTo({
              url: "/pages/tabBar_index/business_detail/business_detail?code=" + item.params.eventCode + '&higherLevelCode=' + app.globalData.higherLevelCode + "&sceneType=" + scene + "&sceneDT=" + sceneDT + "&clerk_code=" + this.data.clerkCode,
            })
          }
          break;
        case "h5":
          wx.navigateTo({
            url: "/pages/web_view_html/web_view_html?webUrl=" + item.params.url
          })
          break;
        case "live":
          wx.navigateTo({
            url: "/livePackage/pages/live/live?merchantCode=" + item.params.merchantCode + '&higherLevelCode=' + app.globalData.higherLevelCode + "&sceneType=" + scene + "&sceneDT=" + sceneDT + "&clerk_code=" + this.data.clerkCode,
          })
          break;
        default:
          wx.navigateTo({
            url: "/pages/business/dynamic_detail/dynamic_detail?newsId=" + item.id + '&higherLevelCode=' + app.globalData.higherLevelCode + "&sceneType=" + scene + "&sceneDT=" + sceneDT + "&clerk_code=" + this.data.clerkCode,
          })
          break;
      }
    },

    /** 图片加载处理 */
    imageHandler: function (width, height) {
      let currentW = width
      let finalW = width
      let currentH = height
      let finalH = height
      let isLongPic = false
      if (currentW > currentH) {
        if (currentW < 188 || currentH < 147) {
          finalW = 188
          finalH = 147
        } else if (currentW > 311 || currentH > 175) {
          finalW = 311
          finalH = 175
        }
      } else if (currentW < currentH) {
        if (currentW < 147 || currentH < 184) {
          finalW = 147
          finalH = 184
        } else if (currentW > 175 || currentH > 311) {
          finalW = 175
          finalH = 311
          if (currentH > 311) {
            isLongPic = true
          }
        }
      } else {
        if (currentW > 188) {
          finalW = 188
          finalH = 188
        }
      }
      let imgObj = {}
      imgObj.width = finalW
      imgObj.height = finalH
      imgObj.isLongPic = isLongPic
      return imgObj
    },

    /** 跳转商品详情 */
    goToGoodsDetail: function (e) {
      let item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: "/pages/tabBar_index/business_detail/business_detail?code=" + item.code + '&higherLevelCode=' + app.globalData.higherLevelCode + '&merchantCode=' + item.merchant.code + "&sceneType=" + scene + "&sceneDT=" + sceneDT + "&clerk_code=" + this.data.clerkCode,
      })
    },

    /** 跳转3D */
    goTo3D: function (e) {
      let item = e.currentTarget.dataset.item
      let webUrl = util.vrUrlHandler(item.weburl, app.globalData.appId)
      wx.navigateTo({
        url: "/pages/web_view_html/web_view_html?webUrl=" + webUrl
      })
    },

    /** 展开更多操作 */
    moreOperate: function (e) {
      this.hanlerMoreOperate(e.currentTarget.dataset.pindex, e.currentTarget.dataset.index, e.currentTarget.dataset.moreOperate)
    },

    /** 处理更多操作隐藏显示 */
    hanlerMoreOperate: function (pindex, index, on_close) {
      let newsList = this.data.allList
      for (let i in newsList) {
        let subNewsList = newsList[i]
        for (let j in subNewsList) {
          if (i == pindex && j == index) {
            subNewsList[j].moreOperate = true
          } else {
            subNewsList[j].moreOperate = false
          }
        }
      }
      this.setData({
        allList: newsList,
      })
    },

    /** 收藏动态 */
    newsFavorites: function (e) {
      let that = this;
      let url = "userCollect/collect"
      if (that.data.merchantInfo.isFavorites == 1) {
        url = "userCollect/cancelCollect"
      }
      app.isUserLogin(function (isLogin) {
        if (isLogin) {
          http.post(
            app.globalData.host + url, {
              contentCode: that.data.merchantCode,
              type: 'company'
            },
            (status, resultCode, message, data) => {
              wx.showToast({
                title: that.data.merchantInfo.isFavorites == 0 ? '收藏成功' : '取消收藏成功',
                icon: "none"
              })
              that.setData({
                ['merchantInfo.isFavorites']: !that.data.merchantInfo.isFavorites
              });
            },
            (status, resultCode, message, data) => {}
          );
        }
      })

    },

    /**
     * 获取企业详情信息
     */
    getBusinessInfo: function () {
      if (this.properties.merchantCode == "") {
        return
      }
      http.get(
        app.globalData.host + "merchant/info", {
          merchantCode: this.properties.merchantCode,
        },
        (_status, _resultCode, _message, data) => {
          this.setData({
            merchantInfo: data.merchant,
            userId: data.merchant.userId
          });
          if (this.data.landerUserId == this.data.userId) {
            this.setData({
              more_operate: false
            });
          }
        },
        (_status, _resultCode, _message, _data) => {
          wx.hideLoading()
        }
      );
    },

    /** 前往投诉 */
    goToComplaint: function () {
      wx.showLoading({
        title: '跳转中...',
        mask: true,
      })
      wx.navigateTo({
        url: '/livePackage/pages/complaint/complaint?merchantCode=' + this.data.merchantCode + '&complaintType=dynamic',
        success: (result) => {
          this.hanlerMoreOperate()
          wx.hideLoading()
        },
      })
    },

    /** 点赞 */
    like: function (e) {
      if (e.currentTarget.dataset.item.isLike) {
        return
      }
      http.post(
        app.globalData.host + "personal/like", {
          relationId: e.currentTarget.dataset.item.id,
          type: "type_merchant_news",
        },
        (_status, _resultCode, _message, data) => {
          let allList = this.data.allList
          let temp = allList[e.currentTarget.dataset.pindex]
          let temp2 = temp[e.currentTarget.dataset.index]
          temp2.isLike = true
          temp2.likeCount = temp2.likeCount + 1
          this.setData({
            allList: allList,
          })

        },
        (_status, _resultCode, _message, _data) => {
          wx.hideLoading()
        }
      );
    },

    clerkDisplay: function () {
      this.setData({
        clerkDisplay: !this.data.clerkDisplay,
      })
    },

    /** 捕获鼠标操作 */
    catchMouseOperate: function () {

    },

    /** 清空数据及状态 */
    clearDataStatus: function () {
      this.setData({
        allList: [],
        pageIndex: 1,
        pageIndex_add: 0,
      })
    },
  }
})