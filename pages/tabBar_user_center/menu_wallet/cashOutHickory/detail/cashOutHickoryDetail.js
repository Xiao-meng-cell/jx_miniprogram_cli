// pages/tabBar_user_center/menu_wallet/cashOutHickory/detail/cashOutHickoryDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      data: app.globalData.cashOutHickoryDetail,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // },

  /** 前往结账单详情 */
  goToDetail: function(e) {
    let that = this
    let data = e.currentTarget.dataset.item
    let productImg = data.picture //详情信息图片
    let productName = data.relation.productName //详情信息名称
    let productDescription = data.relation.productDescription //详情信息描述
    let totalPrice = data.relation.totalPrice
    let batchName = data.batchName
    let displayOriginDetail = true //是否显示详情信息

    //判断结账单类型
    if (data.relationType == "relation_type_customer_order") { //客户订单
      productImg = JSON.parse(data.picture).illustration[0]
    } else if (data.relationType == "relation_type_supply_task") { //供求任务
      productName = data.relation.taskName
      productDescription = data.relation.taskTime
      //供方是否为本人，不为本人不显示详情
      if (data.batchNum != "supply") {
        displayOriginDetail = false
      }
    } else if (data.relationType == "relation_type_gift") { //打赏
      productImg = 'https://www.vicpalm.com' + data.picture
      productName = data.relation.name
      totalPrice = data.relation.price / 2
      if (batchName == "") {
        batchName = '礼品获赠'
      }
    } else if (data.relationType == "relation_type_merchant_pay") { //企业入驻分润
      productName = data.relation.name
      productDescription = data.summary
    }

    wx.navigateTo({
      url: '/pages/tabBar_user_center/menu_wallet/record_details/record_details?productName=' + productName + '&productDescription=' + productDescription + '&amountYuan=' + data.amountYuan + '&num=' + data.relation.num + '&productUnit=' + data.relation.productUnit + '&productImg=' + productImg + '&code=' + data.code + '&createdTime=' + data.createdTime + '&settledTime=' + data.settledTime + '&price=' + data.relation.price + '&totalPrice=' + totalPrice +
        '&status=' + data.status + '&statusName=' + data.statusName + '&result=' + data.result + '&bankcard=' + e.currentTarget.dataset.bankcard + '&bankname=' + e.currentTarget.dataset.bankname + '&batchName=' + batchName + '&displayOriginDetail=' + displayOriginDetail + '&relationType=' + data.relationType,
    })
  },

  /**
   * 复制订单号
   */
  copyOrderCode: function(e) {
    var that = this;
    var orderBean = e.currentTarget.dataset.bean;
    wx.setClipboardData({
      data: orderBean.code,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
          duration: 1500
        })
      }
    });
  },
})