// pages/invitation/invitation.js
// widget/map/map.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioPlaying: true, //语音是否播放
    festival_bgm:'',
    seletPage:0,
    capsuleTop: 0,
    capsuleHeight: 0,
    duration: 500,
    timer: null,
    animation15: {},
    animation14: {},
    animation13: {},
    animation12: {},
    animation11: {},
    animation10: {},
    animation9: {},
    animation8: {},
    animation7: {},
    animation6: {},
    animation5: {},
    animation4: {},
    animation3: {},
    wineGlass: {},
    urlImage: 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/invitation/',
    latitude: 21.713181,
    longitude: 108.373333,
    scale: 16,
    markers: [{
      iconPath: "",
      id: 0,
      latitude: 21.713181,
      longitude: 108.373333,
      width: 15,
      height: 15,
      callout: {
        content: '四海钱隆酒业',
        display: 'ALWAYS',
        color: '#27292B',
        bgColor: '#FFC637',
        padding: 8,
        borderRadius: 20,
        borderColor: '#fff',
        fontSize: 13,
        borderWidth: 2,
        textAlign: 'center',

      },
    }],
    image_preview: ['https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/invitation/img32.jpg', 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/invitation/img41.jpg', 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/invitation/img33.jpg', 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/invitation/img51.jpg', 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/invitation/img52.jpg', 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/invitation/new0.jpg', 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/invitation/new1.jpg', 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/invitation/new2.jpg']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      capsuleTop: app.globalData.capsuleTop,
      capsuleHeight: app.globalData.capsuleHeight,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.wineGlass(true)
    setTimeout(function () {
      this.animationImage(true,3)
    }.bind(this), 1000);
  
    // 实例化API核心类
    this.mapCtx = wx.createMapContext('map')
    this.initPlayFestivalBgm(true);
  },

  //红酒杯动效
  wineGlass: function (come) {
    var animation = wx.createAnimation({
      duration: come ? 1000:1,
      timingFunction: 'ease',
    })
    if (come) {
      animation.translateX(-180).step()
      this.setData({
        wineGlass: animation.export()
      })
    } else {
      animation.translateX(0).step()
      this.setData({
        wineGlass: animation.export()
      })
    }

  },
  /**
   * 淡入淡出
   */
  animationImage: function (come,which) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    if (come) {
      animation.opacity(1).step()
    } else {
      animation.opacity(0).step()
    }
    if(which=='3'){
      this.setData({
        animation3: animation.export()
      })
    }
    if(which=='4'){
      this.setData({
        animation4: animation.export()
      })
    }
    if(which=='5'){
      this.setData({
        animation5: animation.export()
      })
    }
    if(which=='6'){
      this.setData({
        animation6: animation.export()
      })
    }
    if(which=='7'){
      this.setData({
        animation7: animation.export()
      })
    }
    if(which=='8'){
      this.setData({
        animation8: animation.export()
      })
    }
    if(which=='9'){
      this.setData({
        animation9: animation.export()
      })
    }
    if(which=='10'){
      this.setData({
        animation10: animation.export()
      })
    }
    if(which=='11'){
      this.setData({
        animation11: animation.export()
      })
    }
    if(which=='12'){
      this.setData({
        animation12: animation.export()
      })
    }
    if(which=='13'){
      this.setData({
        animation13: animation.export()
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.timer);
    if (this.data.festival_bgm) {
      this.data.festival_bgm.destroy();
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tabClick: function (e) {
    let index = e.currentTarget.dataset.index;
    let item = e.currentTarget.dataset.item;
    this.setData({
      active: index,
      title: item.text
    })
  },
  swiperChange: function (e) {
    let index = e.detail.current
    console.log(this.data.seletPage)
    if(this.data.seletPage !=index){
      this.wineGlass(false)
      this.animationImage(false,4)
      this.animationImage(false,3)
      this.animationImage(false,5)
      this.animationImage(false,6)
      this.animationImage(false,7)
      this.animationImage(false,8)
      this.animationImage(false,9)
      this.animationImage(false,10)
      this.animationImage(false,11)
      this.animationImage(false,12)
      this.animationImage(false,13)
    }
    setTimeout(function () {
      this.wineGlass(true)
    }.bind(this),800);
 
    if (index === 0) {
      setTimeout(function () {
        this.animationImage(true,3)
      }.bind(this), 800);
    }
    if (index === 1) {
      setTimeout(function () {
        this.animationImage(true,4)
      }.bind(this), 800);
      setTimeout(function () {
        this.animationImage(true,5)
      }.bind(this), 1500);
    }
    if (index === 2) {
      setTimeout(function () {
        this.animationImage(true,6)
      }.bind(this), 800);
      setTimeout(function () {
        this.animationImage(true,7)
      }.bind(this), 1500);
    }
    if (index === 3) {
      setTimeout(function () {
        this.animationImage(true,8)
      }.bind(this), 800);
      setTimeout(function () {
        this.animationImage(true,9)
      }.bind(this), 1500);
    }
    if (index === 4) {
      setTimeout(function () {
        this.animationImage(true,10)
      }.bind(this), 800);
      setTimeout(function () {
        this.animationImage(true,11)
      }.bind(this), 1500);
    }
    if (index === 5) {
      setTimeout(function () {
        this.animationImage(true,12)
      }.bind(this), 800);
      setTimeout(function () {
        this.animationImage(true,13)
      }.bind(this), 1500);
    }
    this.setData({
      seletPage:index
    })
  },

  //前往地图导航
  goMapDetail: function () {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: '四海钱隆酒业',
      address: '防城港港口区站前路高铁一号30号商铺'
    })
  },
  /**
   * 图片预览
   */
  imagePreview: function (e) {
    console.log(e)
    var current = e.currentTarget.dataset.previewindex
    wx.previewImage({
      current: this.data.image_preview[current],
      urls: this.data.image_preview
    })
  },
  /**
   * 播放背景音乐
   */
  initPlayFestivalBgm: function () {
    this.data.festival_bgm = wx.createInnerAudioContext()
    this.data.festival_bgm.autoplay = true;
    this.data.festival_bgm.loop = true;
    this.data.festival_bgm.src = 'https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/invitation/music1.mp3';
    this.data.festival_bgm.onPlay(() => {

    })

  },

  /**
   * 播放或者暂停背景音乐
   */
  playOrPauseFestivalBgm: function () {
    if (this.data.festival_bgm.paused) {
      this.data.festival_bgm.play(() => {})
    } else {
      this.data.festival_bgm.pause();
    }
    this.setData({
      audioPlaying: this.data.festival_bgm.paused,
    })
  },
})