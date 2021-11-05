// expandPackage/pages/member/goodsCoupon/goodsCoupon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    checked:true,
    sum:0,
    vipDiscount:0,
    storeCode:'2051726136767106348'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goShopDetail:function(){
      console.log('eeeeee')
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        vipDiscount: this.data.vipDiscount,
      })
      wx.navigateBack({
        delta: 1 //想要返回的层级
      })
    },
    onMyEvent:function(e){
      this.setData({
        sum: e.detail.sum,
        vipDiscount:e.detail.vipDiscount
      })
    }
  }
})
