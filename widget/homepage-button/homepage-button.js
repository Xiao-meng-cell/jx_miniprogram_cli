// widget/homepage-button/homepage-button.js


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
    slide_button: {
      left: 0,
      right: 0,
      top: 400,
      height: 45,
      width: 50,
      tStart: true
    },
    slide_menu: {
      windowWidth: 0,
      menuWidth: 0,
      offsetRght: 0,
      tStart: true
    },
    business_info: "",
    card_headimg: ""
  },



  ready: function() {
    try {
      let res = wx.getSystemInfoSync();
      this.setData({
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth
      });
      this.data.slide_button.top = res.windowHeight - 300;
      this.setData({
        slide_button: this.data.slide_button
      })
    } catch (e) {

    }
    let query = wx.createSelectorQuery();
    query.select('#homepage_business').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function(res) {})
  },

  /**
   * 组件的方法列表
   */
  methods: {
    down: function(e) {
      let {
        slide_button
      } = this.data;
      this.startTime = e.timeStamp;
      if (e.touches[0] && e.touches[0].length) {
        let pageX = e.touches[0].pageX;
        let pageY = e.touches[0].pageY;
        let tempHeigth = pageY;
        let tempWidth = pageX;
        // if ((pageX + this.data.slide_button.width) > this.data.windowWidth) {
        //   tempWidth = this.data.windowWidth - this.data.slide_button.width;
        // }
        if ((pageY + this.data.slide_button.height) > this.data.windowHeight) {
          tempHeigth = this.data.windowHeight - this.data.slide_button.height;
        }
        slide_button.top = (tempHeigth <= 23 ? 0 : tempHeigth);

        this.setData({
          slide_button: slide_button
        })
      }

    },
    move: function(e) {
      let {
        slide_button
      } = this.data;
      let pageX = e.touches[0].pageX;
      let pageY = e.touches[0].pageY;
      let tempHeigth = pageY;
      let tempWidth = pageX;
      // if ((pageX + this.data.slide_button.width) > this.data.windowWidth ) {
      //   tempWidth = this.data.windowWidth - this.data.slide_button.width;
      // }
      if ((pageY + this.data.slide_button.height) > this.data.windowHeight) {
        tempHeigth = this.data.windowHeight - this.data.slide_button.height;
      }
      slide_button.top = (tempHeigth <= 23 ? 0 : tempHeigth);

      this.setData({
        slide_button: slide_button
      })
    },
    //鼠标释放时候的函数
    end: function(e) {
      let {
        slide_button
      } = this.data;
      this.endTime = e.timeStamp;
      if (e.touches[0] && e.touches[0].length) {
        let pageX = e.touches[0].pageX;
        let pageY = e.touches[0].pageY;
        let tempHeigth = pageY;
        let tempWidth = pageX;
        // if ((pageX + this.data.slide_button.width) > this.data.windowWidth) {
        //   tempWidth = this.data.windowWidth - this.data.slide_button.width;
        // }
        if ((pageY + this.data.slide_button.height) > this.data.windowHeight) {
          tempHeigth = this.data.windowHeight - this.data.slide_button.height;
        }
        slide_button.top = (tempHeigth <= 23 ? 0 : tempHeigth);

        this.setData({
          slide_button: slide_button
        })

      } else {
        if (this.endTime - this.startTime < 130) {
          this.triggerEvent('handlerPageTap', 'handlerPageTap');
        }
      }


    },

    handlerPageTap: function(e) {
      this.triggerEvent('handlerPageTap', 'handlerPageTap');
    }

  }
})