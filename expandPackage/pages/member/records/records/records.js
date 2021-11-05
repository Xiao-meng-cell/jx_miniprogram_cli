// expandPackage/pages/member/records/records.js
var util = require('../../../../../utils/util.js');
var http = require('../../../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "", //类型（jf:积分查询; czz:成长值; ycz:预充值）
    tips: "",
    storeCode: "", //会员店铺code
    dataList: [], //历史记录列表
    loadAll: false, //加载全部数据
    pageIndex: 1, //翻页目录
    pageLimit: 50,
    lander: wx.getStorageSync('user'),
    nowDate: util.tsFormatTime((Date.parse(new Date())), "Y-M-D"), //当前时间
    dateDisplay: util.tsFormatTime((Date.parse(new Date())), "Y年M月"), //过滤时间显示
    displayFilterType: false, //显示筛选类型
    filterTypes: [{
      keyName: "全部",
      value: ""
    }],
    typeIndex: 0, //选中筛选类型下标
    selectedTypeArray: [],
    startDT: "", //开始时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.storeCode) {
      this.setData({
        storeCode: options.storeCode,
      })
    }
    if (options.type) {
      let title = ""
      let tips = ""
      switch (options.type) {
        case "jf":
          title = "积分记录"
          tips = "当您购买商品或参与商家活动即可获得相应的积分"
          break;
        case "czz":
          title = "成长值记录"
          tips = "当您进行预充值或消费即可获得相应的成长值"
          break;
        case "ycz":
          title = "预充值"
          break;
      }
      wx.setNavigationBarTitle({
        title: title,
      })
      this.setData({
        type: options.type,
        tips: tips,
      })
    }
    if (this.data.type == "jf" || this.data.type == "czz") {
      if (app.globalData.enableMember) {
        this.getRerocd()
      }

    } else if (this.data.type == "ycz") {
      this.countMemberRecharge()
      this.getRechargeType()
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
    if (!this.data.loadAll) {
      this.loadMore()
    }
  },

  /** 获取历史记录 */
  getRerocd: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.vip_host + "vip/system/getOneVipUserHistory", {
        index: this.data.pageIndex,
        limit: this.data.pageLimit,
        userCode: this.data.lander.userCode,
        storeCode: this.data.storeCode,
        type: this.data.type == "jf" ? "integral" : this.data.type == "czz" ? "growth" : undefined,
        requestType: "client",
        historySource: this.data.selectedTypeArray.length > 0 ? JSON.stringify(this.data.selectedTypeArray) : undefined,
        startTime: this.data.startDT != "" ? this.data.startDT : undefined,
      },
      (status, resultCode, message, data) => {
        this.handleData(data)
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  handleData: function (data) {
    let dataList = ""
    if (this.data.type == "ycz") {
      if (!data.list || data.list.length < this.data.pageLimit) {
        this.setData({
          loadAll: true,
        })
      }
      dataList = data.list
    } else {
      if (data.historyPageForClientCurrentCount < this.data.pageLimit) {
        this.setData({
          loadAll: true,
        })
      }
      dataList = data.historyPageForClient
    }
    for (let i in dataList) {
      for (let j in dataList[i].value) {
        let item = dataList[i].value[j]
        //由于预充值记录数据结构与积分、成长值不一致需要重组方便页面显示
        if (this.data.type == "ycz") {
          item["createdTime"] = util.tsFormatTime(item.time, "Y-M-D h:m:s")
          item["valueDisplay"] = item.type == "consume" ? "-￥" + item.amount / 100 : "+￥" + item.amount / 100
          item["remarks"] = item.remark
          if (item.type == "consume") {
            item["iconUrl"] = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/member/pay_small.png"
          } else {
            item["iconUrl"] = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/member/recharge_small.png"
          }
        } else {
          item["valueDisplay"] = item.value > 0 ? "+" + item.valueStr : item.valueStr
        }

        //处理商品名称
        if (item.historySource == "goods_pay") {
          let temp1 = item.remarks.split("[")
          let first = temp1[0]
          if (temp1[1]) {
            let temp2 = temp1[1].split("]")
            let goodsName = temp2[0]
            let last = temp2[1]
            if (goodsName.length > 22) {
              goodsName = goodsName.substring(0, 22) + "..."
            }
            item.remarks = first + "[" + goodsName + "]" + last
          }
        }
      }
    }
    let finalList = this.data.dataList
    if (finalList && finalList.length > 0) {
      for (let i in dataList) {
        let finalItem = dataList[i]
        let isExist = false
        for (let j in finalList) {
          let tempItem = finalList[j]
          if (finalItem.keyName == tempItem.keyName) {
            tempItem.value = tempItem.value.concat(finalItem.value)
            isExist = true
          }
        }
        if (!isExist) {
          finalList.push(finalItem)
        }
      }
    } else {
      finalList = finalList.concat(dataList)
    }

    let filterTypes = this.data.filterTypes
    if (this.data.type != "ycz") {
      if (filterTypes.length == 1) {
        filterTypes = this.data.filterTypes.concat(data.historySourceTypes)
      }
    }

    let dateDisplay = this.data.dateDisplay
    if (finalList && finalList.length > 0) {
      dateDisplay = finalList[0].keyName
    }

    this.setData({
      dataList: finalList,
      filterTypes: filterTypes,
      dateDisplay: dateDisplay,
    })
    wx.hideLoading()
  },

  /**
   * 加载更多数据
   */
  loadMore: function () {
    this.setData({
      pageIndex: this.data.pageIndex + 1,
    })
    if (this.data.type == "ycz") {
      this.countMemberRecharge()
    } else {
      if (app.globalData.enableMember) {
        this.getRerocd()
      }

    }
  },

  /** 点击日期选择 */
  clickDate: function () {
    this.setData({
      displayFilterType: false,
    })
  },

  /** 改变查询时间 */
  changeDate: function (e) {
    let dateStr = e.detail.value + "-01 00:00:00"
    let dateArr = e.detail.value.split("-")
    this.setData({
      startDT: dateStr,
      dateDisplay: dateArr[0] + "年" + dateArr[1] + "月",
    })
    this.initParams()
  },

  /** 改变查询类型 */
  changeType: function (e) {
    let index = e.currentTarget.dataset.index
    let selectedTypeArray = []
    if (this.data.filterTypes[index].value != "") {
      selectedTypeArray.push(this.data.filterTypes[index].value)
    }
    this.setData({
      typeIndex: index,
      selectedTypeArray: selectedTypeArray,
    })
    this.displayFilterType()
    this.initParams()
  },

  /** 显示筛选类型 */
  displayFilterType: function () {
    this.setData({
      displayFilterType: !this.data.displayFilterType,
    })
  },

  catchMoseOperate: function () {

  },

  /** 初始化参数 */
  initParams: function () {
    this.setData({
      loadAll: false,
      pageIndex: 1,
      dataList: [],
    })
    if (this.data.type == "ycz") {
      this.countMemberRecharge()
    } else {
      if (app.globalData.enableMember) {
        this.getRerocd()
      }

    }
  },

  /** 前往记录详情页 */
  goToDetail: function (e) {
    app.globalData.memberRecordDetail = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/expandPackage/pages/member/records/detail/detail',
    })
  },

  /** 获取预充值记录 */
  countMemberRecharge: function () {
    wx.showLoading({
      title: '加载中',
    })
    http.get(
      app.globalData.business_host + "merchantMemberBalance/listBalanceRecordByMonth", {
        index: this.data.pageIndex,
        limit: this.data.pageLimit,
        merchantCode: this.data.storeCode,
        types: this.data.selectedTypeArray.length > 0 ? this.data.selectedTypeArray.toString() : undefined,
        startDate: this.data.startDT != "" ? this.data.startDT : undefined,
        userCode: this.data.lander.userCode,
      },
      (status, resultCode, message, data) => {
        this.handleData(data)
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  cancel: function () {
    this.setData({
      startDT: "",
    })
    this.initParams()
  },

  /** 获取预充值类型 */
  getRechargeType: function () {
    http.get(
      app.globalData.business_host + "merchantMemberBalance/getOperationType", {},
      (status, resultCode, message, data) => {
        if (data && data.length > 0) {
          let types = this.data.filterTypes
          for (let i in data) {
            let item = data[i]
            item["keyName"] = item.value
            item["value"] = item.code
            types.push(item)
          }
          this.setData({
            filterTypes: types,
          })
        }
      },
      (status, resultCode, message, data) => {}
    );
  },
})