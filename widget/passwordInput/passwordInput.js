// widget/passwordInput/passwordInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    length: {
      type: Number,
    },

    isPassword: {
      type: Boolean,
    },

    isFocus: {
      type: Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isFocus: false, //聚焦 
    value: "",
    valueArray: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /** 密码输入 */
    input: function (e) {
      this.setData({
        value: e.detail.value,
        valueArray: e.detail.value.split(""),
      })
      this.triggerEvent("passwordChange", this.data.value)
    },

    /** 点击密码输入框 */
    pwdTap: function (e) {
      this.setData({
        isFocus: true,
      })
    },

    /** 清空密码 */
    clear: function () {
      this.setData({
        value: "",
        valueArray: "",
        isFocus: true,
      })
    },
  }
})