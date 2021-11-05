// widget/open-app/open-app.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    app_parameter:{
      type: Object,
      value: {},
    }
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
     * 打开app
     */
    launchAppError: function (e) {
      console.log(e.detail.errMsg)
    }
  }
})
