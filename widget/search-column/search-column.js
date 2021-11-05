// widget/search-column/search-column.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keyword: {
      type: null,
      observer: function (newVal, oldVal) {
        if (newVal != '') {
          this.setData({
            input_value: newVal
          })
        }
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    input_value: "",
    focus: false,
  },

  show() {
    this.setData({
      focus: true,
    })
  },

  ready() {
    this.showInputValue();
    this.getHistoryLabel();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 回显搜索关键词
     */
    showInputValue: function () {
      this.setData({
        input_value: this.properties.input_value
      });
    },

    /**
     * 改变关键词
     */
    changeInputValue: function (e) {
      console.log(e.detail.value);
      this.setData({
        input_value: e.detail.value
      });
      this.triggerEvent('keywordChangeInput', this.data.input_value);
    },

    /** 清空关键词 */
    clearKeyword: function () {
      this.setData({
        input_value: ""
      })
      this.triggerEvent('executeSearch', this.data.input_value);
    },

    /**
     * 搜索，传关键字回父级页面
     */
    passOnKeyword: function () {
      console.log("搜索，传关键字回父级页面" + this.data.input_value);
      this.saveSearchText(this.data.input_value);
      this.triggerEvent('executeSearch', this.data.input_value);
    },

    /**
     * 获取历史记录
     */
    getHistoryLabel: function () {
      var history_label = wx.getStorageSync('historyLabel');
      if (!history_label) {
        this.setData({
          historyLabel: []
        });
      } else {
        this.setData({
          historyLabel: history_label
        });
      }
    },
    /**
     * 保存历史
     */
    saveSearchText: function (value) {
      if (value || value.trim().length > 0) {
        var flag = true;
        for (var i = 0; i < this.data.historyLabel.length; i++) {
          if (this.data.historyLabel[i].keyword == value) {
            flag = false;
          }
        }

        if (flag) {
          var searchText_item = {};
          searchText_item.keyword = value;
          this.data.historyLabel.push(searchText_item)
          this.setData({
            historyLabel: this.data.historyLabel
          });
          wx.setStorageSync('historyLabel', this.data.historyLabel)
        }
      }
    },

    /** 设置焦点 */
    setFocus: function () {
      this.setData({
        focus: true,
      })
    },
  }
})