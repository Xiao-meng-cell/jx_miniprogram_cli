// widget/filter-tabs/filtertabs.js
//筛选组件
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     *{
      id: 1,//id
      hide:false,//是否隐藏图标
      title: '路线热度'//标题
     }
     */
    filterList: {
      type: Array,
     
    },

    //初始索引
    id: {
      type: Number,
      value: 0
    },

  },


  attached() {
    this.setData({
      filterTagIndex: this.data.id
    });
  },

  observers: {
    'id': function (val) {
      this.setData({
        filterTagIndex: val
      })
    },

  },
  /**
   * 组件的初始数据
   */
  data: {
    iconUrl: 'https://izsyue.oss-cn-shenzhen.aliyuncs.com/assets/travel/icon/',
    filterTabIndex: 0,
    filterTagIndex: false,
    filterTagMap: {
      true: "up",
      false: "down"
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onTabClick(e) {
      let item = e.currentTarget.dataset.item
      let index = item.id
      console.log('index', index)
      console.log('this.data.filterTabIndex', this.data.filterTabIndex)
      if (!item.hide) {
        if (this.data.filterTabIndex != index) {
          this.setData({
            filterTagIndex: false
          });
        } else {
          this.setData({
            filterTagIndex: !this.data.filterTagIndex
          });
        }
      }
      this.setData({
        filterTabIndex: index
      });
      //返回索引和上下标签
      let result = {
        filterTabIndex: this.data.filterTabIndex,
        updown: this.data.filterTagMap[this.data.filterTagIndex]
      }
      this.triggerEvent('tabClick', result)

    }
  }
})