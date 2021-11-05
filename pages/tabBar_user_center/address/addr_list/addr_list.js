// miniprogram/pages/tabBar_user_center/address/addr_list.js
const app = getApp();
const http = require("../../../../utils/http.js");
const util = require("../../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    networkType: true, //监听网络连接与断开
    addressList: [],
    from_confirm_order: false, //是否从确认订单页面过来，全局变量userHarvestAddress
    provinceCodes: [],
    chargerDetailList: [], //取回来验证
    beyondDistance: false, //是否有超出配送范围的地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    if (options.from_confirm_order) {
      this.setData({
        from_confirm_order: options.from_confirm_order
      });

    }
    if (options.product_code) {
      this.setData({
        productCode: options.product_code
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
    this.getAddrs();
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
    this.getAddrs();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


  /**
   * 编辑或者添加两种方式
   */
  toEidt: function (e) {
    let isEdit = e.currentTarget.dataset.isedit;
    let data = JSON.stringify(e.currentTarget.dataset.addrobj);
    var url
    if (isEdit == 'true') {
      url = '/pages/tabBar_user_center/address/addr_edit/edit?addrObj=' + data + "&isEdit=true"
    } else if (isEdit == 'false') {
      url = '/pages/tabBar_user_center/address/addr_edit/edit'
    }
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 获取收货地址列表
   */
  getAddrs: function () {
    wx.showLoading({
      title: '正在加载中...',
    })
    var that = this;
    http.get(
      app.globalData.business_host + 'customeraddress/list', {},
      (status, resultCode, message, data) => {
        that.setData({
          addressList: data,
        });
        if (this.data.productCode) {
          this.getProvinceCodeList(data);
        }
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        // wx.showToast({
        //   title: '获取数据失败！',
        //   duration: 2000
        // })
      });
  },

  /**
   * 获取省份code
   */
  getProvinceCodeList: function (data) {
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        this.data.provinceCodes.push(data[i].provinceCode);
      }
      this.setData({
        provinceCodes: this.data.provinceCodes
      });

      this.getProLogisticsInfo();
    }
  },

  /**
   * 选定订单收货地址
   */
  chooseUserAddr: function (e) {
    if (this.data.from_confirm_order) { //如果时从确认订单过来
      this.setData({
        from_confirm_order: false
      });
      let obj = e.currentTarget.dataset.item;
      obj.addrdetail = e.currentTarget.dataset.addrdetail;
      obj.name = e.currentTarget.dataset.name;
      obj.phone = e.currentTarget.dataset.phone;
      app.globalData.userHarvestAddress = obj;
      wx.showLoading({
        title: '跳转中',
        mask: true,
        success: res => {
          setTimeout(function () {
            wx.hideLoading()
            wx.navigateBack({
              delta: 1
            })
          }, 500)
        }
      })

    }

  },


  /**
   * 获取配送范围
   */
  getProLogisticsInfo: function () {
    http.get(
      app.globalData.business_host + 'logisticstemple/getProLogisticsInfo', {
        productCode: this.data.productCode,
        provinceCodes: JSON.stringify(this.data.provinceCodes)
      },
      (status, resultCode, message, data) => {
        console.log(data);
        this.setData({
          chargerDetailList: data.chargerDetailList
        });
        this.matchProvince();
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: '获取数据失败！',
          icon: "none"
        })
      });
  },


  /**
   * 匹配省份，判断数据是否在配送范围
   */
  matchProvince: function () {
    let chargerDetailList = this.data.chargerDetailList;
    let addressList = this.data.addressList;
    if (chargerDetailList.length > 0) {
      let length_charger = chargerDetailList.length;
      let length_addr = addressList.length;
      for (let i = 0; i < length_charger; i++) {
        for (let j = 0; j < length_addr; j++) {
          if ((chargerDetailList[i].areaType == 3) && (chargerDetailList[i].provinceCode == addressList[j].provinceCode)) {
            addressList[j].areaType = 3;
            this.setData({
              beyondDistance: true
            });
          }
        }
      }
      this.setData({
        addressList: addressList
      });
    }

  }
})