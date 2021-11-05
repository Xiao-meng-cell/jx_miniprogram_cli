// widget/myCoupon/myCoupon.js
var util = require('../../utils/util.js');
var http = require('../../utils/http.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    invalid: {
      type: String,
      value: null,
    },
    //是否显示复选框
    checked: {
      type: Boolean,
      value: undefined,
    },
    storeCode: {
      type: String,
      value: null
    },
    eventCode: {
      type: String,
      value: null
    },
    onshelfCode: {
      type: String,
      value: null
    },
    productCode: {
      type: String,
      value: null
    },
    propertie: {
      type: String,
      value: null
    },
    quantity: {
      type: String,
      value: null
    },
    recharge: {
      type: String,
      value: null
    },
    selectCouponCodes: {
      type: String,
      value: null
    },
    selectCouponIds: {
      type: String,
      value: null
    },
    topTips: {
      type: Boolean,
      value: true,
    },
    pageFrom: {
      type: String,
      value: null
    },
  },

  show: function () {},

  ready() {
    if (this.properties.pageFrom == "") {
      //是否显示优惠券复选框
      if (this.properties.checked) {
        if (this.properties.eventCode != null && this.properties.eventCode) {
          if (app.globalData.enableMember) {
            this.getBestCoupon()
          }
        } else {
          if (app.globalData.enableMember) {
            this.vipRecharge();
          }
        }
      } else {
        if (this.properties.invalid == '1') {
          this.setData({
            status: ["2"],
            index: 1,
            couponStatus: "used",
          })
        }
        if (this.properties.invalid == '2') {
          this.setData({
            status: ["3", "4"],
            index: 1,
            couponStatus: "invalid",
          })
        }
        if (app.globalData.enableMember) {
          this.vipCoupon();
        }
      }
    } else {
      let data = wx.getStorageSync('vipCouponList')
      wx.removeStorageSync('vipCouponList')
      let couponPriceYuan = wx.getStorageSync('vipCouponAmountYuan')
      wx.removeStorageSync('vipCouponAmountYuan')
      if (this.properties.selectCouponCodes && this.properties.selectCouponCodes != "") {
        let couponCodes = JSON.parse(this.properties.selectCouponCodes)
        if (couponCodes.length > 0 && data.length > 0) {
          let sum = 0
          let ccs = []
          let couponName = ""
          for (let i in data) {
            let item = data[i]
            for (let j in couponCodes) {
              if (couponCodes[j] == item.code) {
                item["checkedIn"] = true
                sum += 1
                ccs.push(item.code)
                couponName = item.couponName
              }
            }
          }
          this.triggerEvent('myevent', {
            sum: sum,
            vipDiscount: couponPriceYuan,
            couponCodes: ccs,
            couponName: couponName,
          });
        }
      }
      this.setData({
        couponList: data,
      })
    }
  },
  /**
   * 组件的初始数据 
   */
  data: {
    typeLists: [],
    status1: true,
    status2: true,
    couponList: '',
    couponCodes: [],
    isFixedTop: false,
    index: 1,
    pageIndex_add: 0, //二维数组下标
    loadAll: false,
    ids: '',
    delete: false, //删除优惠券弹窗2
    selectedType: false,
    selectedType2: false,
    selectedType3: false,
    sum: 0,
    vipDiscount: 0,
    list: [],
    showText: false,
    status: ["1"], //优惠券状态
    typeCodes: [], //优惠券类型
    couponStatus: "", //优惠券状态
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //预充值
    vipRecharge: function () {
      wx.showLoading({
        title: '数据加载中...',
      })
      http.get(
        app.globalData.vip_host + "vip/coupon/issue/checkPreChangeReturnCouponList", {
          storeCode: this.properties.storeCode,
          userCode: wx.getStorageSync('user').userCode,
          price: this.properties.recharge
        },
        (status, resultCode, message, data) => {
          if (data) {
            if (this.properties.selectCouponCodes != "") {
              let couponCodes = JSON.parse(this.properties.selectCouponCodes)
              if (couponCodes.length > 0 && data.length > 0) {
                let sum = 0
                let couponPriceYuan = 0
                let ccs = []
                let couponName = ""
                for (let i in data) {
                  let item = data[i]
                  for (let j in couponCodes) {
                    if (couponCodes[j] == item.code) {
                      item["checkedIn"] = true
                      sum += 1
                      ccs.push(item.code)
                      couponPriceYuan = couponPriceYuan + item.rebatePriceYuan
                      couponName = item.couponName
                    }
                  }
                }
                this.triggerEvent('myevent', {
                  sum: sum,
                  vipDiscount: couponPriceYuan,
                  couponCodes: ccs,
                  couponName: couponName,
                });
              }
            }
            this.setData({
              couponList: data,
              loadAll: true,
            })
          }
          wx.hideLoading();
        },
        (status, resultCode, message, data) => {
          wx.hideLoading();
        }
      )

    },

    vipCouponByParam: function (e) {
      if (e == '1') {
        this.setData({
          status: ["2"],
          index: 1,
          couponStatus: "used",
        })
      }
      if (e == '2') {
        this.setData({
          status: ["3", "4"],
          index: 1,
          couponStatus: "invalid",
        })
      }
      this.vipCoupon()
    },

    //优惠券列表
    vipCoupon: function (e) {
      wx.showLoading({
        title: '数据加载中...',
      })
      http.get(
        app.globalData.vip_host + "vip/coupon/issue/couponPageList", {
          index: this.data.index,
          limit: 20,
          status: JSON.stringify(this.data.status),
          storeCode: this.properties.storeCode,
          typeCodes: JSON.stringify(this.data.typeCodes),
          userCode: wx.getStorageSync('user').userCode,
        },
        (status, resultCode, message, data) => {
          if (data.list.length < 1 || data.list.length < 20) {
            this.setData({
              loadAll: true,
            })
            wx.hideLoading();
          }
          if (this.data.index > 1) {
            this.setData({
              couponList: this.data.list.concat(data.list),
              index: this.data.index + 1
            })
          } else {
            this.setData({
              couponList: data.list,
              index: this.data.index + 1
            })
          }
          let that = this
          let newArr = new Array();
          let list = that.data.couponList;
          list.map(item => {
            item.showText = false
            newArr.push(item);
          })
          that.setData({
            list: newArr
          })
          that.triggerEvent('couponNum', {
            couponNum: that.data.couponList.length
          })
          wx.hideLoading()
        },
        (status, resultCode, message, data) => {
          wx.hideLoading()
        }
      )
    },

    loadMore: function () {
      //避免无数据时触发触底加载
      if (this.data.couponList.length < 0 || this.data.couponList) {
        return
      }
      if ((!this.data.loadAll) && (!this.properties.eventCode)) {
        if (app.globalData.enableMember) {
          this.vipCoupon()
        }
      }
    },

    //勾选优惠券
    selectedClick: function (e) {
      let index = e.currentTarget.dataset.index;
      let item = e.currentTarget.dataset.item;
      let list = this.data.couponList
      let typeLists = this.data.typeLists
      if (this.properties.pageFrom == "") {
        if (!this.data.eventCode || this.data.eventCode == '') {
          if (list[index].meetPriceYuan > Number(this.properties.recharge)) {
            wx.showToast({
              title: '当前充值金额不满足优惠券使用条件',
              icon: "none",
            })
            return
          }
          // 选中优惠券
          if (item.checkedIn == true) {
            list[index].checkedIn = false
            this.removeCode(item.code, item.typeCode)
          } else { //未选中优惠券
            let code2 = ''
            for (let q in list) {
              if (list[q].checkedIn == true) {
                code2 = list[q].code
              }
              list[q].checkedIn = false
            }
            if (code2 != '') {
              list[index].checkedIn = false
              this.removeCode(code2, item.typeCode)
            }
            list[index].checkedIn = !list[index].checkedIn
            this.devCouponCodes(list[index].code, item.typeCode)
          }
          this.setData({
            couponList: list
          })
          let couponPriceYuan = list[index].checkedIn ? item.rebatePriceYuan : 0
          let couponName = list[index].checkedIn ? item.couponName : ""
          let sum = this.data.couponCodes.length
          this.triggerEvent('myevent', {
            sum: sum,
            vipDiscount: couponPriceYuan,
            couponCodes: this.data.couponCodes,
            couponName: couponName,
          });
        } else { //商品详情页跳转而来
          //所有类型的券未选中状态
          // if (typeLists == '' || typeLists.length < 1) {
          //   list[index].checkedIn = true
          //   this.devCouponCodes(list[index].code, item.typeCode)
          //   this.setData({
          //     couponList: list
          //   })
          // }
          //点击不同类型的券
          // if (typeLists.includes(item.typeCode) == false) {
          // if (item.isOverlay == 'no') {
          //   wx.showToast({
          //     title: '不可叠加使用',
          //   })
          //   return false
          // }
          // if (item.checkedIn == true) {
          //   list[index].checkedIn = false
          //   this.removeCode(list[index].code, item.typeCode)
          // } else {
          //   list[index].checkedIn = true
          //   this.devCouponCodes(list[index].code, item.typeCode)
          // }
          // this.setData({
          //   couponList: list
          // })
          // }

          //点击同种类型的券
          // if (typeLists.includes(item.typeCode) == true) {
          //   let tyneList = []
          //   for (let j in list) {
          //     if (list[j].typeCode == item.typeCode) {
          //       tyneList.push(list[j])
          //     }
          //   }
          //   if (item.checkedIn == true) {
          //     list[index].checkedIn = false
          //     this.removeCode(item.code, item.typeCode)
          //   } else {
          //     let code0 = ''
          //     for (let k in tyneList) {
          //       if (tyneList[k].checkedIn == true) {
          //         code0 = tyneList[k].code
          //       }
          //       tyneList[k].checkedIn = false
          //     }
          //     if (code0 != '') {
          //       list[index].checkedIn = false
          //       this.removeCode(code0, item.typeCode)
          //     }
          //     list[index].checkedIn = !list[index].checkedIn
          //     this.devCouponCodes(list[index].code, item.typeCode)
          //   }
          //   let sum = this.data.couponCodes.length
          //   this.setData({
          //     couponList: list,
          //     sum: sum
          //   })
          // }

          for (let y in list) {
            y = Number(y)
            if (index == y) {
              list[y].checkedIn = list[y].checkedIn ? false : true
            } else {
              list[y].checkedIn = false
            }

            if (list[y].checkedIn) {
              this.devCouponCodes(list[y].code, item.typeCode)
            } else {
              this.removeCode(list[y].code, item.typeCode)
            }
          }
          let sum = this.data.couponCodes.length
          this.setData({
            couponList: list,
            sum: sum
          })
          if (app.globalData.enableMember) {
            this.getPrice()
          }
        }
      } else {
        let couponCodes = []
        for (let i in list) {
          let temp = list[i]
          if (temp.code == item.code) {
            temp.checkedIn = !temp.checkedIn
            if (temp.checkedIn) {
              couponCodes.push(temp.code)
            }

          } else {
            temp.checkedIn = false
          }
        }
        this.setData({
          couponList: list,
          couponCodes: couponCodes,
        })
        this.calculationCartCoupon()
      }
    },

    /** 添加优惠券 */
    devCouponCodes: function (code, type) {
      let couponCodes = this.data.couponCodes
      let typeLists = this.data.typeLists
      this.data.couponCodes.push(code)
      this.data.typeLists.push(type)
      this.setData({
        couponCodes: couponCodes,
        typeLists: typeLists
      })
      console.log('add', this.data.couponCodes, this.data.typeLists)
    },

    /** 移除优惠券 */
    removeCode: function (code, type) {
      let couponCodes = this.data.couponCodes
      let typeLists = this.data.typeLists
      for (let i in couponCodes) {
        if (code == couponCodes[i]) {
          couponCodes.splice(i, 1)
        }
      }
      for (let i in typeLists) {
        if (type == typeLists[i]) {
          typeLists.splice(i, 1)
        }
      }
      this.setData({
        couponCodes: couponCodes,
        typeLists: typeLists
      })
      console.log('dele', this.data.couponCodes, this.data.typeLists)
    },

    showMasseges: function (e) {
      let index = e.currentTarget.dataset.index;
      let type = e.currentTarget.dataset.type;
      const list = this.data.couponList
      list[index].showText = !list[index].showText
      this.setData({
        couponList: list,
      })
    },

    getPrice: function () {
      let sum = this.data.couponCodes.length
      console.log(sum, this.data.status2)
      http.get(
        app.globalData.vip_host + 'vip/coupon/issue/checkSkuReturnCouponPrice', {
          eventCode: this.properties.eventCode,
          onshelfCode: this.properties.onshelfCode,
          productCode: this.properties.productCode,
          storeCode: this.properties.storeCode,
          userCode: wx.getStorageSync('user').userCode,
          couponCodes: this.data.status2 ? null : (sum == 0 ? '[]' : JSON.stringify(this.data.couponCodes)),
          couponIds: this.properties.selectCouponIds && this.properties.selectCouponIds.length > 0 ? this.properties.selectCouponIds : undefined,
          number: this.properties.quantity,
          properties: this.properties.propertie != "" ? this.properties.propertie : undefined,
        },
        (status, resultCode, message, data) => {
          let couponPriceYuan = data.couponPriceYuan
          this.triggerEvent('myevent', {
            sum: this.data.sum,
            vipDiscount: this.data.couponCodes.length == 0 ? 0 : couponPriceYuan,
            couponCodes: this.data.couponCodes
          });
          this.setData({
            status2: false
          })
        },
        (status, resultCode, message, data) => {}
      )
    },

    getBestCoupon: function () {
      http.get(
        app.globalData.vip_host + 'vip/coupon/issue/checkSkuReturnCouponList', {
          eventCode: this.properties.eventCode,
          onshelfCode: this.properties.onshelfCode,
          productCode: this.properties.productCode,
          storeCode: this.properties.storeCode,
          userCode: wx.getStorageSync('user').userCode,
          couponCodes: this.properties.selectCouponCodes && this.properties.selectCouponCodes.length > 0 ? this.properties.selectCouponCodes : undefined,
          couponIds: this.properties.selectCouponIds && this.properties.selectCouponIds.length > 0 ? this.properties.selectCouponIds : undefined,
          number: this.properties.quantity,
          properties: this.properties.selectCouponCodes && this.properties.selectCouponCodes.length > 0 ? this.properties.propertie : undefined,
        },
        (status, resultCode, message, data) => {
          let couponCodes = JSON.parse(this.properties.selectCouponCodes)
          if (this.data.status1 == true) {
            if (data && data.length > 0) {
              let newArr = new Array()
              data.map(item => {
                item.checkedIn = false
                item.showText = false
                newArr.push(item)
              })
              this.setData({
                couponList: newArr
              })

              let list = this.data.couponList
              for (let i in list) {
                if (couponCodes.length > 0) {
                  for (let j in couponCodes) {
                    if (list[i].code == couponCodes[j]) {
                      list[i].checkedIn = true
                    }
                  }
                } else {
                  // if (list[i].recommendUse == "0") {
                  //   list[i].checkedIn = false
                  // }
                  // if (list[i].recommendUse == "1") {
                  //   list[i].checkedIn = true
                  // }
                }

                if (list[i].checkedIn == true) {
                  this.data.typeLists.push(list[i].typeCode)
                  this.data.couponCodes.push(list[i].code)
                }
              }
              this.setData({
                couponList: list
              })
            }
          }
          this.setData({
            status1: false,
            status2: couponCodes.length > 0 ? false : this.data.status2,
          })
          let sum = this.data.couponCodes.length
          this.setData({
            sum: sum
          })
          if (app.globalData.enableMember) {
            this.getPrice();
          }

        },
        (status, resultCode, message, data) => {

        }
      )
    },

    /** 删除所有优惠券 */
    deleteAll: function () {
      http.get(
        app.globalData.vip_host + "vip/coupon/template/delInvalidationCoupon", {
          storeCode: this.properties.storeCode,
          userCode: wx.getStorageSync('user').userCode,
          type: this.data.couponStatus,
        },
        (status, resultCode, message, data) => {
          if (app.globalData.enableMember) {
            this.setData({
              index: 1,
            })
            this.vipCoupon()
          }

        },
        (status, resultCode, message, data) => {

        }
      )
    },

    /** 跳转商品详情页 */
    goShopDetail: function (e) {
      let item = e.currentTarget.dataset.item
      if (item.status == "1") {
        if (item.typeCode == "pre_charge_coupon") {
          wx.redirectTo({
            url: "/expandPackage/pages/member/credit/addCredit/addCredit?merchantCode=" + item.storeCode + "&vipStoreCode=" + item.vipStoreCode,
          })
        } else {
          wx.redirectTo({
            url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + item.storeCode,
          })
        }
      } else if (item.status == "2") {
        wx.showToast({
          title: '该优惠券已被使用',
          icon: "none",
        })
      } else if (item.status == "3") {
        wx.showToast({
          title: '该优惠券已过期失效',
          icon: "none",
        })
      }
    },

    /** 计算购物车优惠券 */
    calculationCartCoupon: function () {
      let calcVipCouponCarts = wx.getStorageSync('calcVipCouponCarts')
      let storeCode = this.properties.storeCode
      for (let i in calcVipCouponCarts) {
        let temp = calcVipCouponCarts[i]
        let selectCouponCodes = []
        if (temp.storeCode == storeCode) {
          selectCouponCodes = selectCouponCodes.concat(this.data.couponCodes)
        }
        temp.couponCodes = selectCouponCodes
      }

      http.get(
        app.globalData.vip_host + "vip/coupon/calculationCartCoupon", {
          userCode: wx.getStorageSync('userCode'),
          operate: 1,
          param: JSON.stringify(calcVipCouponCarts),
        },
        (_status, _resultCode, _message, _data) => {
          for (let i in _data) {
            if (_data[i].storeCode == storeCode) {
              this.triggerEvent('myevent', {
                sum: _data[i].currentUseVipCouponCodes.length,
                vipDiscount: _data[i].couponPriceYuan,
                couponCodes: _data[i].currentUseVipCouponCodes,
              })
            }
          }
        },
        (_status, _resultCode, _message, _data) => {}
      );
    },
  }
})