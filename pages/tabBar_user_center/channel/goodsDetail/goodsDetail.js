// pages/tabBar_user_center/channel/goodsDetail/goodsDetail.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null, //货源数据
    business_detail: "",
    goodsInfo: null, //货源数据
    imgList: [], //图片列表
    videoURL: '', //视频url
    existVideo: false, //存在视频
    selectedDisplayType: "img", //选中显示类型（vr:VR看房；vid:视频；img:图片）
    videoAutoPlay: true, //视频是否自动播放
    selectedVideo: false, //选中视频显示
    iPhone_X: app.globalData.iPhone_X, //是否为iponeX系列
    show_business_phone: true, //展示企业号码列表
    business_phone: "", //企业电话列表
    showModal: false, //显示申请成功提示
    showSku: false, //显示Sku
    specList: [], //规格列表
    showImg: "", //展示图片url
    totalStock: 0, //总库存
    minPrice: 0, //最低价
    maxPrice: 0, //最高价
    minSuggestedPrice: 0, //建议最低价
    maxSuggestedPrice: 0, //建议最高价
    onlyPrice: true, //最低最高是否同价
    displayPrice: 0,
    selected_text: "", //选中sku值
    estimate: "", //预计收入
    sourceAddr: "", //货源所在地，发货地
    displayEndTime: "", //结束时间
    imgIndex: 1, //当前主图下标
    neverDie: false, //是否长期有效
    vrUrl: "", //房地产商品VR看房地址
    markers: "", //地图标记点
    projectLocal: "", //项目所在位置坐标点
    projectNearbyPointNavIndex: 0,
    projectNearbyList: "", //周边列表
    managerDisplay: false, //显示项目联系人
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.code) {
      http.get(
        app.globalData.business_host + '/product/info', {
          productCode: options.code,
        },
        (status, resultCode, message, data) => {
          this.setData({
            data: data,
          })
          this.handleData()
          this.getGoodsInfo()

        },
        (status, resultCode, message, data) => {
          console.log('货源分页获取失败')
        });
    }
    qqmapsdk = new QQMapWX({
      key: app.globalData.qqMapKey
    });
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
    //不启用onshow方法
    if (!app.globalData.onShowEnable) {
      app.globalData.onShowEnable = true
      return
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

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // },

  /** 处理数据 */
  handleData: function () {
    console.log("处理数据")
    let item = this.data.data
    if (item) {
      console.log(item)
      app.globalData.goodsDetail = item
      this.operateLogistics(item)
      let assets = item.fileJsonObj.illustration
      let existVideo = false
      let imgList = []
      let videoUrl = ''
      for (let i in assets) {
        let assetUrl = assets[i]
        if (util.getUrlType(assetUrl)) {
          existVideo = true
          videoUrl = assetUrl;
          this.getFastVideoUrl(videoUrl);
        } else {
          imgList.push(assetUrl)
        }
      }

      var phone_list = item.store.phone == null ? '' : item.store.phone.split(",");
      if (phone_list.length > 0) {
        this.setData({
          business_phone: phone_list
        });
      }

      //统计总库存,查找最高价与最低价
      let minSkuItem = null
      let maxSkuItem = null
      let totalStock = 0
      let estimate = ""
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
      let onlyPrice = true
      if (minSkuItem.suggestedPrice == maxSkuItem.suggestedPrice) {
        onlyPrice = true
        let temp = ((minSkuItem.suggestedPrice - minSkuItem.price) / minSkuItem.price).toFixed(2)
        estimate = "预计收益" + (temp * 100).toFixed(0) + "%"
      } else {
        onlyPrice = false
        let temp = ((minSkuItem.suggestedPrice - minSkuItem.price) / minSkuItem.price).toFixed(2)
        let temp2 = ((maxSkuItem.suggestedPrice - maxSkuItem.price) / maxSkuItem.price).toFixed(2)
        estimate = "预计收益" + (temp * 100).toFixed(0) + "%-" + (temp2 * 100).toFixed(0) + "%"
      }

      //长期有效判断
      let endDate = new Date(util.tsFormatTime(item.endTime, "Y/M/D h:m:s"))
      let end = endDate.getTime()
      let d = Math.floor(end / 1000 / 60 / 60 / 24)
      let neverDie = d > 365 ? true : false

      //房地产特有判断 start
      if (item.typeCode == "estate") {
        //VR看房
        if (item.orderRealEstateAttach.panoramicUrl && item.orderRealEstateAttach.panoramicUrl != "") {
          this.setData({
            vrUrl: item.orderRealEstateAttach.panoramicUrl,
            selectedDisplayType: "vr",
          })
        }

        //组房地产模板所需数据
        let temp = {}
        let product = {}
        let orderRealEstateAttach = item.orderRealEstateAttach
        //价格类型
        let priceType = ""
        if (orderRealEstateAttach.sellingPriceType == 1) {
          priceType = "售价"
        } else if (orderRealEstateAttach.sellingPriceType == 2) {
          priceType = "首付"
        } else if (orderRealEstateAttach.sellingPriceType == 3) {
          priceType = "面议"
        }
        orderRealEstateAttach["priceType"] = priceType

        //显示价格
        let displayPrice = ""
        if (orderRealEstateAttach.isNegotiable == 0) {
          displayPrice = "￥" + orderRealEstateAttach.price
        } else {
          displayPrice = "价格面议"
        }
        orderRealEstateAttach["displayPrice"] = displayPrice

        //地图标记点
        let markers = []
        let markerItem = {}
        markerItem.latitude = orderRealEstateAttach.lat
        markerItem.longitude = orderRealEstateAttach.lng
        // markerItem.iconPath = ""
        markers.push(markerItem)
        this.setData({
          projectLocal: markerItem,
          markers: markers,
        })

        //项目周边
        let estateSurroundingTags = []
        for (let i in orderRealEstateAttach.estateSurroundingInfos) {
          let estateSurroundingInfo = orderRealEstateAttach.estateSurroundingInfos[i]
          let tempTags = (estateSurroundingInfo.title.substring(1, estateSurroundingInfo.title.length - 1)).split(",")
          for (let j in tempTags) {
            let estateSurroundingTagItem = {}
            estateSurroundingTagItem.name = tempTags[j]
            switch (tempTags[j]) {
              case "交通":
                estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_bus_gray.png"
                estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_bus.png"
                break;
              case "学校":
                estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_school_gray.png"
                estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_school.png"
                break;
              case "医院":
                estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_hospital.png"
                estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_hospital-blue.png"
                break;
              case "购物":
                estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_shopping_cart.png"
                estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_shopping_cart-blue.png"
                break;
              case "餐饮":
                estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_ranstuarant_gray.png"
                estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_ranstuarant.png"
                break;
              case "银行":
                estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_bank_gray.png"
                estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_bank.png"
                break;
              default:
                break;
            }
            estateSurroundingTags.push(estateSurroundingTagItem)
          }
        }
        orderRealEstateAttach["estateSurroundingTags"] = estateSurroundingTags

        //其他户型
        for (let i in orderRealEstateAttach.estateUnitInfos) {
          let item = orderRealEstateAttach.estateUnitInfos[i]
          let displayPrice = ""
          if (item.sellingPriceType == 1) {
            displayPrice = "售价："
            if (item.isNegotiable == 0) {
              displayPrice = displayPrice + item.price
            } else {
              displayPrice = displayPrice + "咨询价格"
            }
          } else if (item.sellingPriceType == 2) {
            displayPrice = "首付："
            if (item.isNegotiable == 0) {
              displayPrice = displayPrice + item.price
            } else {
              displayPrice = displayPrice + "咨询价格"
            }
          } else if (item.sellingPriceType == 3) {
            displayPrice = "价格面议"
          }
          item["displayPrice"] = displayPrice

          for (let j in item.medias) {
            let mediaObj = item.medias[j]
            if (mediaObj.type == "image") {
              item["image"] = mediaObj.url
              break
            }
          }
        }

        product["orderRealEstateAttach"] = orderRealEstateAttach
        temp["product"] = product
        this.setData({
          business_detail: temp,
        })
      }
      //房地产特有判断 end

      this.setData({
        imgList: imgList,
        existVideo: existVideo,
        selectedVideo: existVideo,
        totalStock: totalStock,
        minPrice: minSkuItem.priceYuan,
        maxPrice: maxSkuItem.priceYuan,
        minSuggestedPrice: minSkuItem.suggestedPriceYuan,
        maxSuggestedPrice: maxSkuItem.suggestedPriceYuan,
        onlyPrice: onlyPrice,
        estimate: estimate,
        displayEndTime: util.tsFormatTime(item.endTime, "Y年M月D日 h:m"),
        neverDie: neverDie,
      })

      if (this.data.data.typeCode == "estate") {
        if (this.data.business_detail.product.orderRealEstateAttach.estateSurroundingTags && this.data.business_detail.product.orderRealEstateAttach.estateSurroundingTags[0]) {
          this.searchNearby(this.data.business_detail.product.orderRealEstateAttach.estateSurroundingTags[0].name, 0)
        }
      }
    }
  },

  /** 主图切换调用 */
  mainImgChange: function (e) {
    this.setData({
      imgIndex: e.detail.current + 1,
    })
  },

  /**
   * 获取点播地址
   */
  getFastVideoUrl: function (videoUrl) {
    let strVod = "https://vod.vicpalm.com/";
    let strOutin = "https://outin";
    let current = videoUrl;
    if (current.indexOf(strVod) > -1) {

    } else if (current.indexOf(strOutin) > -1) {

    } else {
      http.get(
        app.globalData.host + "convert/vod/info", {
          srcUri: current
        },
        (status, resultCode, message, data) => {
          this.setData({
            videoURL: data.desUri
          });
        },
        (status, resultCode, message, data) => {

        }
      );
    }
  },

  /** 获取货源数据 */
  getGoodsInfo: function () {
    http.get(
      app.globalData.business_host + 'product/getParams', {
        productCode: this.data.data.code,
      },
      (status, resultCode, message, data) => {
        data["avgSales"] = (data.orderNum / data.agentNum).toFixed(0)
        this.setData({
          goodsInfo: data,
        })
      },
      (status, resultCode, message, data) => {
        console.log('获取货源数据失败')
        console.log(data)
      });
  },

  /**
   * 跳转至企业首页
   */
  jumpBusinessHomePage: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.data.store.code + '&tagCode=' + this.data.data.store.tagcode + '&userId=' + this.data.data.store.userId,
    })
  },

  /**
   * 展示企业号码列表
   */
  showBusinessPhoneList: function () {
    if (this.data.business_phone != "") {
      this.setData({
        show_business_phone: !this.data.show_business_phone
      })
    } else {
      wx.showToast({
        title: '暂未设置联系电话',
        icon: "none",
      })
    }
  },

  /**
   * 联系企业
   */
  contactBusiness: function (e) {
    var business_phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: business_phone
    })
  },

  /** 申请代理 */
  applyAgent: function () {
    let userId = wx.getStorageSync('user').id;
    let shopId = this.data.data.store.userId;
    if (userId == shopId) {
      wx.showToast({
        title: '商家不支持代理本店货源',
        icon: 'none',
        mask: true,
      })
    } else {
      http.post(
        app.globalData.business_host + '/product/agent/new', {
          agentCode: wx.getStorageSync("myMerchantInfo").code,
          productCode: this.data.data.code,
          storeCode: this.data.data.storeCode,
          startTime: this.data.data.startTime,
          endTime: this.data.data.endTime,
        },
        (status, resultCode, message, data) => {
          this.setData({
            showModal: true,
          })
        },
        (status, resultCode, message, data) => {
          console.log('申请代理失败')
          wx.showToast({
            title: message,
            icon: 'none',
            mask: true,
          })
        });
    }
  },

  /** 申请整店代理 */
  applyStoreAgent: function () {
    let userId = wx.getStorageSync('user').id;
    let shopId = this.data.data.store.userId;
    if (userId == shopId) {
      wx.showToast({
        title: '商家不支持代理本店货源',
        icon: 'none',
        mask: true,
      })
    } else {
      http.post(
        app.globalData.business_host + '/product/agent/newAll', {
          agentCode: wx.getStorageSync("myMerchantInfo").code,
          storeCode: this.data.data.storeCode,
          userId: wx.getStorageSync("user").id,
        },
        (status, resultCode, message, data) => {
          this.setData({
            showModal: true,
          })
        },
        (status, resultCode, message, data) => {
          console.log('申请代理失败')
          if (resultCode == "duplicate_error") {
            wx.showToast({
              title: '请勿重复申请代理！',
              icon: 'none',
              mask: true,
            })
          }
        });
    }
  },

  /** 关闭提示框 */
  closeModal: function () {
    this.setData({
      showModal: false,
      showSku: false,
      showImg: "",
    })
  },

  /** 显示SKU */
  showSku: function () {
    this.getGoodsSpec()
    this.setData({
      showSku: true,
    })
  },

  /** 切换显示 */
  changeShow: function (e) {
    this.setData({
      selectedDisplayType: e.currentTarget.dataset.type,
      videoAutoPlay: e.currentTarget.dataset.type == "vid" ? true : false,
    })
  },

  /** 获取货源规格 */
  getGoodsSpec: function () {
    http.get(
      app.globalData.business_host + 'product/specList', {
        productCode: this.data.data.code,
      },
      (status, resultCode, message, data) => {
        this.handlerSpecList(data)
      },
      (status, resultCode, message, data) => {
        console.log('获取货源规格失败')
        console.log(data)
      });
  },

  /** 处理货源列表 */
  handlerSpecList: function (specList) {
    let finalSpecList = []
    let tempList = []
    for (var i in specList) {
      let specItem = specList[i]
      if (specItem.code == "default") {
        tempList.push(specItem)
      } else {
        finalSpecList.push(specItem)
      }
    }
    let result = finalSpecList.length > 0 ? finalSpecList : tempList
    let selected_text = ""
    for (var j in result) {
      let resultItem = result[j]
      if (resultItem.productSpecs.length == 1) {
        resultItem.productSpecs[0]["selected"] = true
        selected_text = selected_text + resultItem.productSpecs[0].value
      }
    }
    this.setData({
      specList: result,
      selected_text: selected_text,
    })
    this.searchSkuSpec()
  },

  /** 阻止鼠标事件 */
  stopMouseOperate: function () {

  },

  /** 点击选项 */
  clickTypeItem: function (e) {
    let selected_text = ""
    let selectedSku = {}
    let specList = this.data.specList
    for (let h in specList) {
      if (h == e.currentTarget.dataset.itemidx) {
        let specItem = specList[h]
        for (let i in specItem.productSpecs) {
          let psItem = specItem.productSpecs[i]
          if (i == e.currentTarget.dataset.specidx) {
            psItem["selected"] = !psItem["selected"]
          } else {
            psItem["selected"] = false
          }
        }
      }
    }

    for (let a in specList) {
      let si = specList[a]
      for (let b in si.productSpecs) {
        if (si.productSpecs[b].selected) {
          selected_text = selected_text + '"' + si.productSpecs[b].value + '" '
        }
      }
    }
    this.setData({
      specList: specList,
      selected_text: selected_text,
    })
    this.searchSkuSpec()
  },

  /** 搜索sku相关属性 */
  searchSkuSpec: function () {
    //获取选中sku属性 start
    let valueText = ""
    let selectValue = []
    for (let i in this.data.specList) {
      let specItem = this.data.specList[i]
      for (let j in specItem.productSpecs) {
        let specValueItem = specItem.productSpecs[j]
        if (specValueItem.selected) {
          selectValue.push(specValueItem.specCode + "=" + specValueItem.value)
        }
      }
    }
    selectValue.sort()
    valueText = selectValue.join("&")
    console.log(valueText)
    //获取选中sku属性 end
    let tempTotal = 0

    //匹配产品sku start
    for (let k in this.data.data.skus) {
      let skuItem = this.data.data.skus[k]
      tempTotal = tempTotal + skuItem.stock
      let price = ((skuItem.suggestedPrice - skuItem.price) / skuItem.price).toFixed(2)
      if (skuItem.properties == valueText) {
        this.setData({
          showImg: skuItem.url,
          totalStock: skuItem.stock,
          displayPrice: skuItem.suggestedPriceYuan,
          onlyPrice: true,
          estimate: "预计收益+" + (price * 100).toFixed(0) + "%"
        })
      }
    }
    //匹配产品sku end
    //未选中任何sku
    if (!this.data.selected_text) {
      this.setData({
        showImg: "",
        totalStock: tempTotal,
        onlyPrice: this.data.minPrice == this.data.maxPrice ? true : false,
        displayPrice: this.data.minSuggestedPrice,
      })
    }
  },

  /** 处理物流问题 */
  operateLogistics: function (goodsObj) {
    let sourceAddr = ""
    if (goodsObj.orderLogisticsTemple) {
      sourceAddr = goodsObj.orderLogisticsTemple.sourceCityName
    } else {
      sourceAddr = goodsObj.store.merchantCity.name
    }
    this.setData({
      sourceAddr: sourceAddr,
    })
  },

  /** 前往物流详情 */
  goToLogisticsDetail: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/logistics_info_detail/logistics_info_detail?tcode=' + this.data.data.logistictempCode,
      success: function (res) {
        app.globalData.onShowEnable = true
      },
    })
  },

  /** 前往VR */
  goToVr: function () {
    wx.navigateTo({
      url: "/pages/web_view_html/web_view_html?webUrl=" + this.data.vrUrl
    })
  },

  /** 前往资讯 */
  goToNews: function () {
    wx.navigateTo({
      url: '/estatePackage/pages/news/news?merchantCode=' + this.data.data.storeCode,
    })
  },

  /** 跳转项目详情页 */
  goToProjectDetail: function (e) {
    wx.navigateTo({
      url: '/estatePackage/pages/projectDetail/projectDetail?code=' + this.data.business_detail.product.orderRealEstateAttach.code,
    })
  },

  /** 跳转户型页 */
  goToHouseLayout: function (e) {
    let item = e.currentTarget.dataset.item
    console.log(item)
    wx.navigateTo({
      url: '/estatePackage/pages/houseLayout/houseLayout?id=' + item.id + '&merchantCode=' + this.data.data.store.code + '&eventCode=' + this.data.data.code,
    })
  },

  /** 选择项目周边导航点 */
  changeNearbyPointNav: function (e) {
    this.searchNearby(e.currentTarget.dataset.keyword, e.currentTarget.dataset.index)
  },

  /** 搜索周边 */
  searchNearby: function (keyword, index) {
    let that = this
    qqmapsdk.search({
      keyword: keyword,
      location: this.data.business_detail.product.orderRealEstateAttach.lat + "," + this.data.business_detail.product.orderRealEstateAttach.lng,
      success: function (res) {
        let markers = []
        markers.push(that.data.projectLocal)
        for (let i in res.data) {
          let locationItem = res.data[i]
          if (keyword == "交通") {
            locationItem.addressList = locationItem.address.split(",")
          }
          locationItem.dis = locationItem._distance.toFixed(0)
          let markerItem = {}
          markerItem.latitude = locationItem.location.lat
          markerItem.longitude = locationItem.location.lng
          // markerItem.iconPath = ""
          markers.push(markerItem)
        }
        that.setData({
          projectNearbyList: res.data,
          markers: markers,

        })
        console.log(that.data.projectNearbyList)
      },
    })
    this.setData({
      projectNearbyPointNavIndex: index
    })
  },

})