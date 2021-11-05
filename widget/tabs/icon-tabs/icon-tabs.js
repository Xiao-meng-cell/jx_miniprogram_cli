// widget/tabs/icon-tabs/icon-tabs.js
//通用tabs
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 
     * id: 0, //id
       title: '南宁', //标题
       activeIcon: "", //选中状态图标
       icon: '', //默认图标
     */
    tabs: {
      type: Array,
    },
    tabIdTag: {
      type: String,
      value: "tabId"
    },
    //激活id
    activeId: {
      type: String,
    },

    //显示图标
    showIcon: {
      type: Boolean,
      value: true
    },

    //激活颜色
    activeColor: {
      type: String,
      value: "#666"
    },
    //默认颜色
    defaultColor: {
      type: String,
      value: "#666"
    },
    //项间距
    margin: {
      type: Number,
      value: 20
    },
    //默认文字大小
    fontSize: {
      type: Number,
      value: 20
    },
    //激活文字大小
    activeFontSize: {
      type: Number,
      value: 20
    },
    //粗体
    bold: {
      type: Boolean,
      value: false
    },

    //图标高度
    iconHeight: {
      type: Number,
      value: 24
    },
    //图标宽度
    iconWidth: {
      type: Number,
      value: 24
    },
    //图标url
    iconBaseUrl: {
      type: String,
      value: ""
    },
    //图标文字间距
    iconMargin: {
      type: Number,
      value: 10
    },
    //下划线粗细
    lineHeight: {
      type: Number,
      value: 6
    },
    //下划线宽度
    lineWidth: {
      type: Number,
      value: 60
    },
    //下划线文字间距
    lineMargin: {
      type: Number,
      value: 10
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: "0",
  },
  attached() {
    if (this.data.tabs.length > 0) {
      let currentIndex = this.data.tabs[0].id
      if (this.data.activeId) {
        currentIndex = this.data.activeId;
      }
      this.setData({
        currentIndex: currentIndex,
        intoView: this.data.tabIdTag + this.data.currentIndex
      });
    }


  },

  observers: {
    'tabs': function (val) {
      console.log('tabs_observers', val)
      console.log(' this.data.activeId', this.data.activeId)
      if (val.length > 0) {
        let currentIndex = val[0].id
        if (this.data.activeId != undefined) {
          currentIndex = this.data.activeId;
        }
        this.setData({
          currentIndex: currentIndex,
          intoView: this.data.tabIdTag + this.data.currentIndex
        });
        console.log(' this.data.activeId2', this.data.activeId)
        console.log('intoView', this.data.intoView)
      }

    },

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTabClick(e) {
      let item = e.currentTarget.dataset.item
      this.setData({
        currentIndex: item.id
      });
      this.triggerEvent('tabClick', item)
    },
    scroll(e) {
      console.log('scroll', e)
    }
  }
})