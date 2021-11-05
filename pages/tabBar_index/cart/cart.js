// pages/tabBar_index/cart/cart.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    networkType: true, //监听网络连接与断开
    tabBarActive: 2,
    tabbar: app.globalData.tabBar,
    totalPrice: 0, //合计总价金额
    edit: false, //购物车编辑状态
    cartList_original: [], //原始购物车数据列表
    cartList_final: [], //处理后购物车数据列表
    cartList_selected: [], //选中购物车数据列表
    selectedAll: false, //全选
    selectedCartIds: [], //选中购物车记录ID列表
    clickBT: 0, //点击开始时间
    clickET: 0, //点击结束时间
    pendingCartList: [], //待结算购物车数据列表
    isLogin: wx.getStorageSync('user'),
    iPhone_X: app.globalData.iPhone_X,
    selectedSingal: '',
    maker: false,
    isDeliveryTime: false, //结算是否显示配送时间选择
    startDeliveryTime: '', //配送时间
    bottomBarHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
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
    let that = this
    // let query = wx.createSelectorQuery();
    // query.select('#tabbar').boundingClientRect()
    // query.exec(function (res) {
    //   let bb = 5
    //   if (that.data.iPhone_X) {
    //     bb = 20
    //   }
    //   that.setData({
    //     bottomBarHeight: res[0].height + bb,
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    /**配送时间选择*/
    if (app.globalData.appId == 'wx00a71e008067167b') { //烘焙商品
      this.setData({
        isDeliveryTime: true
      });
    }
    let date = new Date();
    let time = util.tsFormatTime(date, "h:m");
    let d = new Date(date);
    d = +d + 1000 * 60 * 60 * 24;
    d = new Date(d);
    d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    // this.setData({
    //   startDeliveryTime: d + " 10:00"
    // })
    this.setData({
      isLogin: wx.getStorageSync('user'),
    })
    this.loadCart();
    /**获取购物车数量 */
    if (wx.getStorageSync('user')) {
      app.loadCartNum(function (tabBar) {
        that.setData({
          tabbar: tabBar
        });
      })
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
    this.cancle();
  },

  cancle: function () {
    wx.removeStorageSync("cartList_final");
    this.setData({
      cartList_final: []
    })
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
  // onShareAppMessage: function () {

  // },

  /**配送时间选择 */
  handleChange(e) {
    let startDeliveryTime = util.tsFormatTime(new Date(e.detail.dateString).getTime(), "Y-M-D h:m");
    // console.log(startDeliveryTime);
    this.setData({
      startDeliveryTime: startDeliveryTime
    })
  },

  /** 设置编辑状态 */
  setEdit: function () {
    let editStatus = !this.data.edit
    if (!editStatus) {
      let cartList_final = this.data.cartList_final
      for (let i in cartList_final) {
        if (cartList_final[i].error || !cartList_final[i].merchantEnable) {
          cartList_final[i]["selected"] = false
        }
        for (let j in cartList_final[i].cartList) {
          let cartItem = cartList_final[i].cartList[j]
          if (cartItem.error) {
            cartItem["selected"] = false
          }
        }
      }
      this.setData({
        cartList_final: cartList_final,
      })
      this.totalPrice()
    }
    this.setData({
      edit: editStatus,
    })
  },

  /** 加载购物车 */
  loadCart: function () {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    if (wx.getStorageSync('user')) {
      http.get(
        app.globalData.business_host + "cart/list", {
          onshelfStoreCode: app.globalData.vicpalmMain ? null : app.globalData.defaultMerchantCode
        },
        (status, resultCode, message, data) => {
          this.setData({
            totalPrice: 0,
            cartList_original: data,
          })
          data.sort(util.compareSort("modifiedTime"))
          this.handleCartData(data)
        },
        (status, resultCode, message, data) => {
          wx.showToast({
            title: '加载购物车失败',
            icon: "none",
            mask: true,
          })
          console.log("加载购物车失败！")
        }
      );
    } else {
      wx.hideLoading()
    }

  },

  /** 处理购物车数据 */
  handleCartData: function (data) {
    let that = this
    let finalList = []
    //当前时间
    var date = new Date();
    var now = date.getTime();
    //第一次遍历查找商家
    for (let i in data) {
      let cartItem = data[i]
      let merchant = cartItem.event.merchant
      //商家是否已存在
      let merchantExist = false
      //遍历最终数据列表
      for (let j in finalList) {
        let tempItem = finalList[j]
        //商家已存在最终数据列表，则不添加
        if (tempItem.merchant.code == merchant.code) {
          merchantExist = true
        }
      }
      //商家不存在，添加到最终数据列表
      if (!merchantExist) {
        let finalItem = {} //最终数据对象
        let merchantCartList = [] //商家所属购物车记录
        let merchantEnable = false //商家下购物车记录是否有效
        //遍历查找商家所属购物车记录
        for (let k in data) {
          let tempObj = data[k]
          //默认不选中
          tempObj["selected"] = false
          //默认不显示优惠信息
          tempObj["discountPriceDisplay"] = false
          //商家相关购物车记录
          if (merchant.code == tempObj.event.merchant.code) {
            finalItem["merchant"] = merchant

            //====处理选中sku显示文本 start====
            let skuText = ""
            //截断选中sku属性（例：12=1斤&8=辣）
            let skuProperties = tempObj.skuProperties.split("&")
            for (let l in skuProperties) {
              let skuObj = skuProperties[l]
              if (skuText == "") { //sku显示文本为空，sku值直接添加
                skuText = skuObj.split("=")[1]
              } else { //sku显示文本不为空，sku值通过“-”衔接
                skuText = skuText + " - " + skuObj.split("=")[1]
              }
            }
            tempObj["skuText"] = skuText
            //====处理选中sku显示文本 end====

            if (tempObj.event.product) {
              let prodouctSku = tempObj.event.product.skus
              for (let i in prodouctSku) {
                if (prodouctSku[i].skuProperties = tempObj.skuProperties) {
                  tempObj.weight = prodouctSku[i].weight;
                } else {
                  tempObj.weight = 0;
                }
              }
            }

            //====匹配sku单价、图片 start====
            if (tempObj.event.onshelf) {
              let orgiUnitPrice = 0
              let displayImg = ""
              for (let l in tempObj.event.onshelf.onshelfSkus) {
                let onshelfSku = tempObj.event.onshelf.onshelfSkus[l]
                onshelfSku.properties = onshelfSku.properties.replace(/(^\s*)|(\s*$)/g, "");
                tempObj.skuProperties = tempObj.skuProperties.replace(/(^\s*)|(\s*$)/g, "");
                if (onshelfSku.properties == tempObj.skuProperties) {
                  orgiUnitPrice = onshelfSku.price
                  displayImg = onshelfSku.url
                  break
                }
              }
              tempObj["displayUnitPrice"] = orgiUnitPrice / 100
              tempObj["unitPrice"] = orgiUnitPrice
              tempObj["displayImg"] = displayImg
            }
            //====匹配sku单价、图片 end====

            //====标签显示 start====
            if (tempObj.event.product) {
              //到店自提 start
              let ddzt = false
              let addr = ""
              let lat = ""
              let lng = ""
              if (tempObj.event.product.typeCode == "service") { //到店服务
                ddzt = true
                addr = tempObj.event.product.store.addr
                lat = tempObj.event.product.store.lat
                lng = tempObj.event.product.store.lng
              } else if (tempObj.event.product.typeCode == "logistics") { //物流产品
                if (tempObj.event.addressType == "merchant") {
                  ddzt = true
                  addr = tempObj.event.address
                  lat = tempObj.event.lat
                  lng = tempObj.event.lng
                }
              }
              tempObj["ddzt"] = ddzt
              tempObj["ddzt_addr"] = addr
              tempObj["ddzt_addr_lat"] = lat
              tempObj["ddzt_addr_lng"] = lng
              //到店自提 end
            }

            //分享优惠
            let shareDiscount = false
            let eventProducts = ""
            //判断活动类型取产品
            if (tempObj.event.typeCode == "original") {
              eventProducts = tempObj.event.originalEventProducts
            } else if (tempObj.event.typeCode == "reward") {
              eventProducts = tempObj.event.rewardEventProducts
            } else if (tempObj.event.typeCode == "discount") {
              eventProducts = tempObj.event.discountEventProducts
            } else if (tempObj.event.typeCode == "inreward") {
              eventProducts = tempObj.event.inRewardEventProduct
            } else if (tempObj.event.typeCode == "universalRebate") {
              eventProducts = tempObj.event.rebateEventProducts
            }

            for (let l in eventProducts) {
              let product = eventProducts[l]
              if (product.discountPrice != 0) {
                shareDiscount = true
                break
              }
            }
            tempObj["shareDiscount"] = shareDiscount
            //====标签显示 end====

            //====有效时间 start====
            //获取结束时间  
            var endDate = new Date(util.tsFormatTime(tempObj.event.endTime, "Y/M/D h:m:s"));
            var end = endDate.getTime();
            //时间差  
            var leftTime = end - now;
            if (leftTime > 0) {
              let d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
              if (d > 365) {
                tempObj["longValid"] = true
              } else {
                tempObj["longValid"] = false
              }
            }
            //====有效时间 end====

            //==== 判断商品是否失效 start ====
            let error = false
            if (merchant.status != 1 || tempObj.event.status != 1 || tempObj.event.product.status != 1) {
              error = true
            }
            tempObj["error"] = error
            //==== 判断商品是否失效 end ====
            if (!error && this.data.selectedAll) {
              tempObj["selected"] = true
            }

            merchantCartList.push(tempObj)
          }
        }
        //检查该企业下有无正常购物车记录
        for (let l in merchantCartList) {
          let merchantCartItem = merchantCartList[l]
          if (!merchantCartItem.error) {
            merchantEnable = true
            break
          }
        }
        finalItem["error"] = merchant.status == 1 ? false : true
        finalItem["merchantEnable"] = merchantEnable
        finalItem["cartList"] = merchantCartList
        //返回购物车页时如为全选，则勾选全部记录
        if (!finalItem["error"] && merchantEnable && this.data.selectedAll) {
          finalItem["selected"] = true
        }
        finalList.push(finalItem)
      }
    }
    /**回填购物车勾选记录 */
    let temp = wx.getStorageSync("cartList_final");
    if (temp && finalList.length > 0) {
      /***回填购物车选中 */
      that.setData({
        cartList_final: temp
      })
      that.isSelectAll(temp);
    } else {
      if (finalList.length > 0) {
        that.setData({
          cartList_final: finalList,
        })
        that.setCustomerOrderMemo();
      } else {
        that.setData({
          cartList_final: []
        })
      }
    }
    wx.hideLoading()
  },

  /**烘焙类商品编辑备注sku */
  setCustomerOrderMemo() {
    let cartList_final = this.data.cartList_final;
    for (let i in cartList_final) {
      let item = cartList_final[i];
      for (let j in item.cartList) {
        let arr = [];
        if (item.cartList[j].customerOrderMemo) {
          arr = item.cartList[j].customerOrderMemo.split('&');
        }
        item.cartList[j].customerOrderMemo = arr;
      }
    }
    this.setData({
      cartList_final: cartList_final
    });
    // console.log(this.data.cartList_final);
  },


  /** 前往结算 */
  goToPay: function () {
    if (this.data.cartList_selected.length > 0) {
      // wx.setStorageSync("cartList", this.data.cartList_selected);
      // console.log('购物车结算');
      // console.log(this.data.pendingCartList);
      // console.log(this.data.cartList_selected);
      wx.setStorageSync("cartList", this.data.pendingCartList);
      wx.setStorageSync("cartList_final", this.data.cartList_final);
      if (app.globalData.appId == 'wx00a71e008067167b') { //烘焙商品
        if (this.data.startDeliveryTime == '') {
          wx.showToast({
            title: '请选择配送时间！',
            icon: "none"
          })
          return;
        } else {
          let time = new Date().getTime();
          let startDeliveryTime = new Date(this.data.startDeliveryTime.replace(/-/g, '/')).getTime();
          if (time > startDeliveryTime) { //烘焙商品
            wx.showToast({
              title: '配送时间不能小于等于当前时间，请重新选择！',
              icon: "none"
            })
            return;
          }
          wx.setStorageSync("startDeliveryTime", this.data.startDeliveryTime); //配送时间
        }
      }

      wx.navigateTo({
        url: '/pages/tabBar_index/cart/confirm_order_cart/confirm_order_cart',
      })
    }
  },

  /**
   * 跳转至企业首页
   */
  jumpBusinessHomePage: function (e) {
    let item = e.currentTarget.dataset.item
    if (item.error) {
      wx.showToast({
        title: '企业状态异常',
        icon: "none",
      })
      return
    }
    let merchant = item.merchant
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + merchant.code + '&tagCode=' + merchant.tagCode,
    })
  },

  /**
   * 跳转到商品详情
   */
  jumpBusinessActivityDetail: function (e) {
    if (e.currentTarget.dataset.item.error) {
      wx.showToast({
        title: '商品已下架',
        icon: "none",
      })
      return
    }
    if ((e.currentTarget.dataset.activitytype == 'inreward' && !e.currentTarget.dataset.refUserCode) || (e.currentTarget.dataset.activitytype == 'inreward' && e.currentTarget.dataset.refUserCode == '')) {
      wx.showModal({
        confirmText: '确定',
        content: '名片商城的商品暂不支持在购物车中查看',
        showCancel: false,
        success: (result) => {},
        title: '不支持查看',
      })
      return;
    }
    if (this.data.clickET - this.data.clickBT < 350) {
      wx.navigateTo({
        url: "/pages/tabBar_index/business_detail/business_detail?code=" + e.currentTarget.dataset.code + '&higherLevelCode=' + app.globalData.higherLevelCode + "&activityType=" + e.currentTarget.dataset.activitytype,
      })
    }
  },

  /** 捕获鼠标操作 */
  catchMouseOperate: function () {},

  /** 减少数量 */
  delQuantity: function (e) {
    let finalCartList = this.data.cartList_final
    let finalCartItem = finalCartList[e.currentTarget.dataset.ci].cartList[e.currentTarget.dataset.gi]
    //小于2时，不允许再减少数量
    if (finalCartItem.num < 2) {
      return
    }
    let num = finalCartItem.num - 1

    http.post(
      app.globalData.business_host + "cart/updateNum", {
        cartCode: finalCartItem.code,
        num: num,
      },
      (status, resultCode, message, data) => {
        finalCartItem.num = num
        this.setData({
          cartList_final: finalCartList,
        })
        this.totalPrice()
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '数量修改失败',
          icon: 'none',
          mask: true,
        })
      }
    )
  },

  /** 增加数量 */
  addQuantity: function (e) {
    let finalCartList = this.data.cartList_final
    let finalCartItem = finalCartList[e.currentTarget.dataset.ci].cartList[e.currentTarget.dataset.gi]
    let stock = 0
    for (let i in finalCartItem.event.product.skus) {
      if (finalCartItem.event.product.skus[i].properties == finalCartItem.skuProperties) {
        stock = finalCartItem.event.product.skus[i].stock
      }
    }
    if (finalCartItem.num == stock) {
      wx.showToast({
        title: '已达到库存上限',
        icon: 'none',
      })
      return
    }
    let num = finalCartItem.num + 1

    http.post(
      app.globalData.business_host + "cart/updateNum", {
        cartCode: finalCartItem.code,
        num: num,
      },
      (status, resultCode, message, data) => {
        finalCartItem.num = num
        this.setData({
          cartList_final: finalCartList,
        })
        this.totalPrice()
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '数量修改失败',
          icon: 'none',
          mask: true,
        })
      }
    )
  },

  /** 全选 */
  selectedAll: function () {
    wx.showLoading({
      title: '处理中...',
      mask: true,
    })
    let selectedAll = !this.data.selectedAll
    let cartList_final = this.data.cartList_final
    for (let i in cartList_final) {
      //商家列表
      cartList_final[i].selected = selectedAll
      if (cartList_final[i].error && !this.data.edit) {
        cartList_final[i].selected = false
      }
      //商品列表
      for (let j in cartList_final[i].cartList) {
        let cartItem = cartList_final[i].cartList[j]
        cartItem["selected"] = selectedAll
        if (cartItem.error && !this.data.edit) {
          cartItem["selected"] = false
        }
      }
    }
    this.setData({
      selectedAll: selectedAll,
      cartList_final: cartList_final,
    })
    this.totalPrice()
  },

  /** 选择购物车记录 */
  selectedCartItem: function (e) {
    let finalCartList = this.data.cartList_final
    let selected = finalCartList[e.currentTarget.dataset.ci].cartList[e.currentTarget.dataset.gi].selected
    finalCartList[e.currentTarget.dataset.ci].cartList[e.currentTarget.dataset.gi].selected = !selected

    //判断购物车记录是否全部选中 start
    this.isSelectAll(finalCartList);
  },

  /**购物车物车是否全部选中 */
  isSelectAll(finalCartList) {
    let selectedAll = true
    for (let i in finalCartList) {
      let merchantCartItem = finalCartList[i]
      let merchantCartItemAllSelected = true
      for (let j in merchantCartItem.cartList) {
        let cartItem = merchantCartItem.cartList[j]
        if (!cartItem.selected && cartItem.event.status == 1) {
          selectedAll = false
          merchantCartItemAllSelected = false
        }
      }
      finalCartList[i].selected = merchantCartItemAllSelected
    }
    //判断购物车记录是否全部选中 end
    this.setData({
      cartList_final: finalCartList,
      selectedAll: selectedAll,
    })
    this.totalPrice()
  },

  /** 选中商家 */
  selectedMerchant: function (e) {
    let finalCartList = this.data.cartList_final
    let selected = finalCartList[e.currentTarget.dataset.ci].selected
    finalCartList[e.currentTarget.dataset.ci].selected = !selected
    //判断购物车记录是否全部选中 start
    let selectedAll = true
    for (let i in finalCartList) {
      let merchantItem = finalCartList[i]
      for (let j in finalCartList[i].cartList) {
        let cartItem = finalCartList[i].cartList[j]
        if (cartItem.event.status == 1 && cartItem.event.product.status == 1) {
          cartItem.selected = merchantItem.selected
        }
        if (!merchantItem.selected && merchantItem.merchantEnable) {
          selectedAll = false
        }
      }
    }
    this.setData({
      cartList_final: finalCartList,
      selectedAll: selectedAll,
    })
    this.totalPrice()
  },

  /** 统计总价 
   * 处理购物车列表数据
   */
  totalPrice: function () {
    // let selectedCartList = [] //选中购物车数据列表
    // let selectedCartIds = []
    // let finalCartList = this.data.cartList_final //最终购物车数据列表
    // let total = 0 //总价
    // for (let i in finalCartList) {
    //   let selectedCartData = {}
    //   let selectedCartRecord = []
    //   selectedCartData["merchant"] = finalCartList[i].merchant
    //   for (let j in finalCartList[i].cartList) {
    //     let cartItem = finalCartList[i].cartList[j]
    //     if (cartItem.selected) {
    //       //查询优惠券 start
    //       let discount_price = 0
    //       for (let k in cartItem.coupons) {
    //         let couponObj = cartItem.coupons[k]
    //         //购买优惠券
    //         if (couponObj.typeCode == "pay") {
    //           if (couponObj.operation == "add_and_multiply") { //加乘卷
    //             discount_price = discount_price + couponObj.value * cartItem.num
    //           } else if (couponObj.operation == "add") {
    //             discount_price = discount_price + couponObj.value
    //           }
    //         }
    //       }
    //       //查询优惠券 end
    //       total = total + (cartItem.unitPrice * cartItem.num - discount_price)
    //       cartItem["displayDiscountPrice"] = discount_price / 100
    //       cartItem["discountPrice"] = discount_price
    //       cartItem["discountPriceDisplay"] = discount_price == 0 ? false : true
    //       selectedCartRecord.push(cartItem)

    //       //选中购物车记录ID，以备删除时使用
    //       selectedCartIds.push(cartItem.id)
    //     } else {
    //       cartItem["discountPriceDisplay"] = false
    //     }
    //   }
    //   if (selectedCartRecord.length > 0) {
    //     selectedCartData["cartList"] = selectedCartRecord
    //     selectedCartList.push(selectedCartData)
    //   }
    // }
    // this.setData({
    //   totalPrice: total / 100,
    //   cartList_final: finalCartList,
    //   cartList_selected: selectedCartList,
    //   selectedCartIds: selectedCartIds,
    // })
    this.buildCartSelectedItem()
  },

  /** 构建选中购物车项 */
  buildCartSelectedItem: function () {
    let selectedCartList = [] //选中购物车数据列表
    let selectedCartIds = []
    let pendingCartList = [] //待结算购物车列表
    let finalCartList = this.data.cartList_final //最终购物车数据列表
    let total = 0 //总价
    for (let i in finalCartList) {
      let selectedCartData = {}
      let selectedCartRecord = []
      let pendingCartData = {}
      let pendingCartRecord = []
      let logisticsGoods = []
      let serviceGoods = []
      let virtualGoods = []
      let depositGoods = []
      selectedCartData["merchant"] = finalCartList[i].merchant
      pendingCartData["merchantCode"] = finalCartList[i].merchant.code
      pendingCartData["merchantHeadimg"] = finalCartList[i].merchant.bgUrls[0]
      pendingCartData["merchantName"] = finalCartList[i].merchant.name
      pendingCartData["ddztAddressNum"] = [] //新增的字段，到店地址数量，未处理
      for (let j in finalCartList[i].cartList) {
        let cartItem = finalCartList[i].cartList[j];
        if (cartItem.selected) {
          let pendingCartDataItem = {}
          pendingCartDataItem["code"] = cartItem.code
          pendingCartDataItem["phone"] = cartItem.phone;
          pendingCartDataItem["linkman"] = cartItem.linkman;
          pendingCartDataItem["address"] = ((cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'logistics') || (cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'service')) ? cartItem.event.address : cartItem.address;
          pendingCartDataItem["areaCode"] = ((cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'logistics') || (cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'service')) ? cartItem.event.areaCode : cartItem.areaCode;
          pendingCartDataItem["areaName"] = ((cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'logistics') || (cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'service')) ? cartItem.event.areaName : cartItem.areaName;
          pendingCartDataItem["cityCode"] = ((cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'logistics') || (cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'service')) ? cartItem.event.cityCode : cartItem.cityCode;
          pendingCartDataItem["cityName"] = ((cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'logistics') || (cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'service')) ? cartItem.event.cityName : cartItem.cityName;
          pendingCartDataItem["provinceCode"] = ((cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'logistics') || (cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'service')) ? cartItem.event.provinceCode : cartItem.provinceCode;
          pendingCartDataItem["provinceName"] = ((cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'logistics') || (cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'service')) ? cartItem.event.provinceName : cartItem.provinceName;
          pendingCartDataItem["id"] = cartItem.id;
          pendingCartDataItem["eventCode"] = cartItem.eventCode;
          pendingCartDataItem["skuProperties"] = cartItem.skuProperties;
          pendingCartDataItem["onshelfCode"] = cartItem.onshelfCode;
          pendingCartDataItem["num"] = cartItem.num;
          pendingCartDataItem["lat"] = ((cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'logistics') || (cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'service')) ? cartItem.event.lat : cartItem.lat;
          pendingCartDataItem["lng"] = ((cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'logistics') || (cartItem.event.addressType == 'merchant' && cartItem.event.product.typeCode == 'service')) ? cartItem.event.lng : cartItem.lng;
          pendingCartDataItem["ddztLat"] = cartItem.ddzt_addr_lat;
          pendingCartDataItem["ddztLng"] = cartItem.ddzt_addr_lng;
          pendingCartDataItem["ddztAddress"] = cartItem.ddzt_addr;
          pendingCartDataItem["productCode"] = cartItem.event.productCode;
          pendingCartDataItem["customerOrderMemo"] = cartItem.customerOrderMemo;
          pendingCartDataItem["skuText"] = cartItem.skuText;
          pendingCartDataItem["weight"] = cartItem.weight;
          pendingCartDataItem["title"] = cartItem.event.title;
          pendingCartDataItem["displayImg"] = cartItem.event.fileJsonObj.illustration[0];
          pendingCartDataItem["damagePrice"] = this.matchingSku(cartItem.skuProperties, cartItem.event.product.skus);
          //查询优惠券 start
          let discount_price = 0
          let couponIds = []
          for (let k in cartItem.coupons) {
            let couponObj = cartItem.coupons[k]
            //购买优惠券
            if (couponObj.typeCode == "pay") {
              if (couponObj.operation == "add_and_multiply") { //加乘卷
                discount_price = discount_price + couponObj.value * cartItem.num
              } else if (couponObj.operation == "add") {
                discount_price = discount_price + couponObj.value
              }
            }
            couponIds.push(couponObj.id)
          }
          //查询优惠券 end

          total = total + (cartItem.unitPrice * cartItem.num - discount_price)
          cartItem["displayDiscountPrice"] = discount_price / 100
          cartItem["discountPrice"] = discount_price
          cartItem["discountPriceDisplay"] = discount_price == 0 ? false : true
          pendingCartDataItem["couponIds"] = couponIds
          pendingCartDataItem["displayUnitPrice"] = cartItem.displayUnitPrice
          pendingCartDataItem["displayDiscountPrice"] = discount_price / 100
          selectedCartRecord.push(cartItem)

          //选中购物车记录ID，以备删除时使用
          selectedCartIds.push(cartItem.id)

          //最新待结算数据处理
          if (cartItem.event.product.typeCode == "logistics" || cartItem.event.product.typeCode == "baking") {
            if (cartItem.event.addressType == "user") {
              logisticsGoods.push(pendingCartDataItem)
            } else {
              serviceGoods.push(pendingCartDataItem)
            }
          } else if (cartItem.event.product.typeCode == "service" || cartItem.event.product.typeCode == "fresh") {
            serviceGoods.push(pendingCartDataItem)
            //到店地址
            if (pendingCartData["ddztAddressNum"].length > 0) {
              for (let j = 0; j < pendingCartData["ddztAddressNum"].length; j++) {
                let cobj = pendingCartData["ddztAddressNum"][j];
                let obj = {};
                if (cobj[cartItem.lat + "$" + cartItem.lng] == cartItem.lat + "$" + cartItem.lng) {

                } else {
                  obj[cartItem.lat + "$" + cartItem.lng] = cartItem.lat + "$" + cartItem.lng
                  pendingCartData["ddztAddressNum"].push(obj);
                }
              }
            } else {
              let obj = {};
              obj[cartItem.lat + "$" + cartItem.lng] = cartItem.lat + "$" + cartItem.lng
              pendingCartData["ddztAddressNum"].push(obj);
            }
          } else if (cartItem.event.product.typeCode == "virtual") {
            virtualGoods.push(pendingCartDataItem)
          } else if (cartItem.event.product.typeCode == "deposit") {
            depositGoods.push(pendingCartDataItem)
          }
        } else {
          cartItem["discountPriceDisplay"] = false
        }
      }
      if (selectedCartRecord.length > 0) {
        selectedCartData["cartList"] = selectedCartRecord
        selectedCartList.push(selectedCartData)
      }

      let goodsNum = logisticsGoods.length + serviceGoods.length + virtualGoods.length + depositGoods.length
      if (goodsNum > 0) {
        pendingCartData["logisticsGoods"] = logisticsGoods
        pendingCartData["serviceGoods"] = serviceGoods
        pendingCartData["virtualGoods"] = virtualGoods
        pendingCartData["depositGoods"] = depositGoods
        pendingCartList.push(pendingCartData)
      }
    }
    this.setData({
      totalPrice: total / 100,
      cartList_final: finalCartList,
      cartList_selected: selectedCartList,
      selectedCartIds: selectedCartIds,
      pendingCartList: pendingCartList,
    })
    wx.hideLoading()
  },

  /** 购物车记录点击开始 */
  cartItemTouchStart: function (e) {
    this.setData({
      clickBT: e.timeStamp,
    })
  },

  /** 购物车记录点击结束 */
  cartItemTouchEnd: function (e) {
    this.setData({
      clickET: e.timeStamp,
    })
  },

  /** 准备删除购物车 */
  readyDel: function (e) {
    let finalCartList = this.data.cartList_final
    for (let i in finalCartList) {
      for (let j in finalCartList[i].cartList) {
        let tempItem = finalCartList[i].cartList[j]
        if (i == e.currentTarget.dataset.ci && j == e.currentTarget.dataset.gi) {
          tempItem.del = true
        } else {
          tempItem.del = false
        }
      }
    }
    this.setData({
      cartList_final: finalCartList,
    })
  },

  /** 取消操作 */
  cancelOperate: function () {
    let finalCartList = this.data.cartList_final
    for (let i in finalCartList) {
      for (let j in finalCartList[i].cartList) {
        let tempItem = finalCartList[i].cartList[j]
        tempItem.del = false
      }
    }
    this.setData({
      cartList_final: finalCartList,
    })
  },

  /** 移出单条购物车记录 */
  removeCartItem: function (e) {
    let selectedCartIds = []
    selectedCartIds.push(this.data.cartList_final[e.currentTarget.dataset.ci].cartList[e.currentTarget.dataset.gi].id)
    this.setData({
      selectedCartIds: selectedCartIds,
    })
    this.delCartList()
  },

  /** 移出购物车 */
  removeCart: function () {
    let that = this
    if (this.data.selectedCartIds.length > 0) {
      wx.showModal({
        title: '',
        content: '确认将这' + this.data.selectedCartIds.length + '个宝贝移出购物车？',
        showCancel: true,
        cancelText: '我再想想',
        cancelColor: '#a0a0a0',
        confirmText: '移出',
        confirmColor: '#2f95fb',
        success: function (res) {
          if (res.confirm) {

            that.delCartList()
          }
        },
      })
    }
  },

  /** 删除购物车记录 */
  delCartList: function () {
    wx.showLoading({
      title: '删除中...',
    })
    http.post(
      app.globalData.business_host + "cart/delCarts", {
        ids: JSON.stringify(this.data.selectedCartIds),
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
        this.setData({
          selectedCartIds: [],
          selectedAll: false,
        })
        /**获取购物车数量 */
        let that = this;
        app.loadCartNum(function (tabBar) {
          that.setData({
            tabbar: tabBar
          });
        })

        this.loadCart()
      },
      (status, resultCode, message, data) => {
        console.log("删除购物车记录失败！")
        wx.hideLoading()
      }
    );
  },


  /**
   * 匹配sku
   */
  matchingSku: function (skuText, skuArray) {
    let damagePrice = 0;
    if (skuText && skuArray && skuArray.length > 0) {
      for (let i = 0; i < skuArray.length; i++) {
        if (skuText == skuArray[i].skuProperties) {
          damagePrice = skuArray[i].damagePrice;
          break;
        }
      }
    }
    return damagePrice;
  },

  tabbarChange: function (e) {
    // if (app.globalData.merchantTemplate == "estate" && e.detail == 0) {
    //   this.data.tabbar.list[e.detail].pagePath = "/estatePackage/pages/home/home"
    //   this.setData({
    //     tabbar: this.data.tabbar,
    //   })
    // }
  },

  toLogin: function () {
    wx.navigateTo({
      url: '/pages/authorization/authorization',
    })
  },

})