// miniprogram/pages/tabBar_user_center/address/addr_edit/edit.js
const app = getApp();
const http = require("../../../../utils/http.js");
const util = require("../../../../utils/util.js");
const regExp = require("../../../../utils/regExp");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null, //收货人
    phone: null, //电话号码
    address: null, //详细地址
    isDefaultAddr: false, //是否设置为默认地址
    condition: false,
    addrIndex: [0, 0, 0], //地址下标
    allAddrList: "",
    isEdit: false, //是否编辑地址
    choos_isEdit: false, //是否完成初始化
    provincesList: [], //省列表
    citiesList: [], //城市列表
    countyList: [], //区/县列表
    choos_citiesList: [],
    choos_countyList: [],
    choose_result: [], //已经选择的地址数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isEdit == 'true') {
      this.setData({
        isEdit: true,
        choos_isEdit: true,
      });
      wx.showLoading({
        title: '数据加载中',
        mask: true
      })
    }

    if (options.addrObj) {
      var bean = JSON.parse(options.addrObj); //编辑的对象
      console.log(bean)
      this.setData({
        name: bean.linkman,
        phone: bean.phone,
        address: bean.address,
        isDefaultAddr: bean.isDefault == 1 ? true : false,
        ["choose_result[0].name"]: bean.provinceName,
        ["choose_result[0].code"]: bean.provinceCode,
        ["choose_result[1].name"]: bean.cityName,
        ["choose_result[1].code"]: bean.cityCode,
        ["choose_result[2].name"]: bean.areaName,
        ["choose_result[2].code"]: bean.areaCode,
        userCode: bean.userCode,
        id: bean.id, //地址id编号
      })
    }

    this.setData({
      allAddrList: wx.getStorageSync('allAddrList')
    })
    if (!this.data.allAddrList) {
      this.getPCC();
    } else {
      this.separateData();
    }

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
   * 地址改变时触发
   */
  bindChange: function (e) {
    let addrIndex = e.detail.value;
    this.matchCity(this.data.provincesList[addrIndex[0]].code, addrIndex);
  },


  /**
   * 打开地址选择器
   */
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },



  /**
   * 获取收货人姓名
   */
  getNameInputVal: function (e) {
    var val = e.detail.value; //获取输入的值
    console.log(val);
    this.setData({
      name: val
    })
  },
  /**
   * 获取手机号
   */
  getPhoneInputVal: function (e) {
    var val = e.detail.value; //获取输入的值
    console.log(val);
    this.setData({
      phone: val
    })
  },
  /**
   * 获取地址
   */
  getAddrInputVal: function (e) {
    var val = e.detail.value; //获取输入的值
    console.log(val);
    this.setData({
      address: val
    })
  },
  /**
   * 设置是否为默认
   */
  switchDefault: function (e) {
    var isChecked = e.detail.value;
    this.setData({
      isDefaultAddr: isChecked,
    });
  },


  /**
   * 保存修改的数据
   */
  submitAddressByEdit: function () {

    let name = this.data.name;
    let phone = this.data.phone;
    let provinceName = this.data.choose_result[0].name;
    let provinceCode = this.data.choose_result[0].code;
    let city = this.data.choose_result[1].name; //市
    let cityCode = this.data.choose_result[1].code;
    let regions = this.data.choose_result[2].name; //地区
    let regionsCode = this.data.choose_result[2].code; //地区
    let address = this.data.address; //详细地址
    let isDefaultAddr = this.data.isDefaultAddr;
    let userCode = this.data.userCode;
    let id = this.data.id; //地址id编号
    if (name == null) {
      wx.showToast({
        title: '请输收件人',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (phone == null) {
      wx.showToast({
        title: '请输手机号',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (!regExp.phone(phone)) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return;
    }
    if (provinceName == null) {
      wx.showToast({
        title: '请选择地区',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (address == null) {
      wx.showToast({
        title: '请输地址',
        icon: "none",
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '正在提交中...',
    })
    var params = {
      address: address,
      provinceName: provinceName,
      provinceCode: provinceCode,
      cityName: city,
      cityCode: cityCode,
      areaName: regions,
      areaCode: regionsCode,
      phone: phone,
      linkman: name,
      userCode: userCode,
      id: id,
      isDefault: isDefaultAddr == true ? 1 : 0,
    }
    http.post(
      app.globalData.business_host + 'customeraddress/save', params,
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.navigateBack({
          delta: 1
        })
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: '添加失败！',
          icon: "none"
        })
      });

  },


  /**
   * 添加收货地址
   */
  submitAddressBySave: function () {
    if (!this.data.choose_result[0]) {
      wx.showToast({
        title: '请选择地址',
        icon: "none"
      })
      return false
    }
    let name = this.data.name;
    let phone = this.data.phone;
    let provinceName = this.data.choose_result[0].name;
    let provinceCode = this.data.choose_result[0].code;
    let city = this.data.choose_result[1].name; //市
    let cityCode = this.data.choose_result[1].code;
    let regions = this.data.choose_result[2].name; //地区
    let regionsCode = this.data.choose_result[2].code; //地区
    let address = this.data.address; //详细地址
    let isDefaultAddr = this.data.isDefaultAddr;
    if (name == null) {
      wx.showToast({
        title: '请输收件人',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (phone == null) {
      wx.showToast({
        title: '请输手机号',
        icon: "none",
        duration: 2000
      })
      return;
    }
    // if (!(phoneRexp.test(phone))) {
    //   wx.showToast({
    //     title: '手机号有误',
    //     icon: 'none',
    //     duration: 2000,
    //     mask: true
    //   })
    //   return false;
    // }
    if (provinceName == null) {
      wx.showToast({
        title: '请选择地区',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (address == null) {
      wx.showToast({
        title: '请输地址',
        icon: "none",
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '正在提交中...',
    })
    var params = {
      address: address,
      provinceName: provinceName,
      provinceCode: provinceCode,
      cityName: city,
      cityCode: cityCode,
      areaName: regions,
      areaCode: regionsCode,
      phone: phone,
      linkman: name,
      isDefault: isDefaultAddr == true ? 1 : 0,
    }
    http.post(
      app.globalData.business_host + 'customeraddress/save', params,
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.navigateBack({
          delta: 1
        })
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: '添加失败！',
          icon: "none"
        })
      });

  },

  /**
   * 根据id删除
   */
  delById: function (e) {
    var addrId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除该收货地址？',
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      //cancelColor: 'grey', //取消文字的颜色
      confirmText: "确定", //默认是“确定”
      //confirmColor: 'skyblue', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          wx.showLoading({
            title: '删除中...',
          });
          http.post(
            app.globalData.business_host + 'customeraddress/del', {
            id: addrId
          },
            (status, resultCode, message, data) => {
              wx.hideLoading();
              wx.navigateBack({
                delta: 1
              })
            },
            (status, resultCode, message, data) => {
              wx.hideLoading();
              wx.showToast({
                title: '删除失败！',
                duration: 2000
              })
            });
        }
      },
    })

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
   * 获取所有省/市/县/区
   */
  getPCC: function () {
    http.get(
      app.globalData.business_host + "city/childrenAll", {
      pcode: "01",
    },
      (status, resultCode, message, data) => {
        this.setData({
          allAddrList: data
        });
        wx.setStorageSync('allAddrList', this.data.allAddrList);
        this.separateData();
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },


  /**
   * 初始化/分离省份，城市，县城/区
   */
  separateData: function () {
    let allAddrList = this.data.allAddrList;
    for (let i = 0; i < allAddrList.length; i++) {
      if (allAddrList[i].pcodeStr.length == 2) {
        this.data.provincesList.push(allAddrList[i]);
      } else if (allAddrList[i].pcodeStr.length == 5) {
        this.data.citiesList.push(allAddrList[i]);
      } else {
        this.data.countyList.push(allAddrList[i]);
      }
    }

    this.setData({
      provincesList: this.data.provincesList,
      citiesList: this.data.citiesList,
      countyList: this.data.countyList,
    });
    if (this.data.choos_isEdit) {
      for (let i = 0; i < this.data.provincesList.length; i++) {
        if (this.data.choose_result[0].code == this.data.provincesList[i].code) {
          this.setData({
            ["addrIndex[0]"]: i,
          })
        }
      }
      this.matchCity(this.data.choose_result[0].code);
    } else {
      this.matchCity(this.data.provincesList[0].code);
    }

  },

  /**
   * 选择省份，改变城市
   */
  matchCity: function (pcode, addrIndex) {
    let citiesList = this.data.citiesList;
    let choos_citiesList = [];
    for (let i = 0; i < citiesList.length; i++) {
      if (pcode == citiesList[i].pcodeStr) {
        choos_citiesList.push(citiesList[i]);
      }
    }
    this.setData({
      choos_citiesList: choos_citiesList
    });
    if (addrIndex) {
      this.matchCounty(this.data.choos_citiesList[addrIndex[1]].code, addrIndex);
    } else {
      if (this.data.choos_isEdit) {
        for (let i = 0; i < this.data.choos_citiesList.length; i++) {
          if (this.data.choose_result[1].code == this.data.choos_citiesList[i].code) {
            this.setData({
              ["addrIndex[1]"]: i,
            })
          }
        }
        this.matchCounty(this.data.choose_result[1].code);
      } else {
        this.matchCounty(this.data.choos_citiesList[0].code);
      }
    }
  },

  /**
   * 选择城市，改变区/县
   */
  matchCounty: function (pcode, addrIndex) {
    let countyList = this.data.countyList;
    let choos_countyList = [];
    for (let i = 0; i < countyList.length; i++) {
      if (pcode == countyList[i].pcodeStr) {
        choos_countyList.push(countyList[i]);
      }
    }
    this.setData({
      choos_countyList: choos_countyList,
    });
    if (!this.data.choos_isEdit) {
      this.setData({
        addrIndex: addrIndex ? addrIndex : [0, 0, 0]
      });

    } else {
      for (let i = 0; i < this.data.choos_countyList.length; i++) {
        if (this.data.choose_result[2].code == this.data.choos_countyList[i].code) {
          this.setData({
            ["addrIndex[2]"]: i,
            choos_isEdit: false,
          })

        }
      }
    }
    if (this.data.addrIndex) {
      this.setData({
        ["choose_result[0]"]: this.data.provincesList[this.data.addrIndex[0]],
        ["choose_result[1]"]: this.data.choos_citiesList[this.data.addrIndex[1]],
        ["choose_result[2]"]: this.data.choos_countyList[this.data.addrIndex[2]],
      });
    }
    wx.hideLoading();
  },

})