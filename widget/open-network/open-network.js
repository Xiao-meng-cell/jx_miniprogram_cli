// widget/open-network/open-network.js
const app = getApp();
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 重新加载
     */
    reLaunchPage:function(){
      if (app.globalData.networkType){
        this.triggerEvent('onRefresh', "onRefresh");
      }else{
        wx.showToast({
          title: '网络未连接，请稍后重试',
          icon:"none"
        })
      }
      
    }

  }
})
