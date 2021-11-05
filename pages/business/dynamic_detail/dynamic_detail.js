// miniprogram/pages/business/dynamic_detail/dynamic_detail.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capsuleTop: 0,
    networkType: true, //监听网络连接与断开
    title_name: "企业动态",
    typeName: "",
    errorImg: "https://oss.vicpalm.com/defaultNoPic.jpg",
    hotel_california: [], //处理后的json数据
    initial_data: "",
    image_preview_data: [],
    data_error: false, //动态是否被删除或者已经过期
    overdue: false, //是否过期或者删除
    merchant_code: "",
    business_info: "",
    fromApp: false, //是否是从别人的分享进来
    newsId: "", //动态id
    video_data: [],
    play_video: false, //是否播放视频
    current_video_index: -1, //当前播放的视频
    video_height: 0,
    switch_baseline: 0,
    windowHeight: 0,
    windowWidth: 0,
    video_play_end: false,
    business_activity_list: "",
    merchant_headingUrl: '',
    business_activity_list: "",
    merchantFavorites: false, //是否收藏关注企业
    shareType: 'news',


    //雷达数据采集所需数据
    timer: null, //雷达时间采集定时器
    startTime: null, //浏览开始时间
    scene: '',
    sceneDT: '0',
    winHeight: 0, //窗口高度
    pageHeight: 0, //页面高度
    progress: 0, //浏览页面百分比
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.watch(that.watchBack); //监听网络变化
    app.getOptions(options, function (data) {
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧小程序码
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧二维码
      that.initOptions(data)
    })
    this.initPageProgress()
  },

  //初始化参数
  initOptions(options) {
    if (options.higherLevelCode) { //小卡片带分享码
      app.globalData.higherLevelCode = options.higherLevelCode;
      app.globalData.isReloadThePage_tabBar_index = true;
    }
    if (options.fromApp) {
      this.setData({
        fromApp: true
      })
    }
    if (options.newsId) {
      this.setData({
        newsId: options.newsId
      });
    }
    if (options.sceneType) {
      this.setData({
        scene: options.sceneType
      });
    }
    if (options.sceneDT) {
      this.setData({
        sceneDT: options.sceneDT
      });
    }

    this.getInvitation();
  },

  /**监听网络变化 */
  watchBack: function (networkType) {
    this.setData({
      networkType: networkType
    });
    // console.log('==========网络监听==========', this.data.networkType);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getPhoneSystemInfo();
    this.setData({
      capsuleTop: app.globalData.capsuleTop,
      capsuleHeight: app.globalData.capsuleHeight,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.startTime = util.timestamp();
    this.postStayTime();
    let that = this;
    clearInterval(this.data.timer);
    that.data.timer = setInterval(function () {
      that.postStayTime();
    }, app.globalData.stayTime);
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

  /**浏览时长统计 */
  postStayTime() {
    if (!wx.getStorageSync('user')) {
      clearInterval(this.data.timer);
      return;
    }
    http.post(
      app.globalData.host + "collect/pingNewsView", {
        batchShare: app.globalData.batchShare,
        merchantCode: this.data.merchant_code,
        userId: wx.getStorageSync('user').id,
        scene: this.data.scene + this.data.merchant_code,
        sceneDT: this.data.sceneDT,
        visitor: wx.getStorageSync('visitor'), //游客标识
        stayTime: app.globalData.stayTime,
        h5Once: this.data.startTime,
        higherLevelCode: app.globalData.higherLevelCode ? app.globalData.higherLevelCode : '',
        newsId: this.data.newsId,
        accessRoutes: app.globalData.accessRoutes,
        routesDescribe: app.globalData.routesDescribe,
        pageId: "pages/business/dynamic_detail/dynamic_detail",
        pageDescribe: "动态详情页",
        progress: this.data.progress > 100 ? 100 : this.data.progress,
      },
      (status, resultCode, message, data) => {
        // console.log('浏览时间统计成功');
      },
      (status, resultCode, _message, data) => {

      }
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (wx.getStorageSync('user')) {
      app.Shareacquisition(this.data.shareType, this.data.merchant_code, null, null, null, null, null, this.data.newsId)
    }
    this.cancelPlay();
    return {
      title: this.data.title_name + this.data.typeName,
      path: "pages/business/dynamic_detail/dynamic_detail?newsId=" + this.data.newsId + "&fromApp=true" + (wx.getStorageSync('user') ? ("&higherLevelCode=" + wx.getStorageSync('user').userCode) : "") + '&batchShare=' + app.globalData.batchShare,
      imageUrl: "",
      success: res => {

        console.log("分享成功")

      },
      fail: res => {}
    }
  },

  /**
   * 监听页面滑动事件
   */
  onPageScroll: function (e) {
    //计算页面深度用
    let scrollH = parseInt(e.scrollTop); // 滚动高度
    let pageHeight = this.data.pageHeight;
    let clientH = this.data.winHeight; //屏幕高度
    let result = Math.round(scrollH / Math.abs(pageHeight - clientH) * 100); // 百分比
    this.setData({ //滚动条距离顶部高度
      progress: result
    })
    console.log(this.data.progress)
  },

  /**
   * 获取手机设备信息
   */
  getPhoneSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth * res.pixelRatio > 1000 ? 1000 : res.windowWidth * res.pixelRatio,
          video_height: parseInt((res.windowWidth * 5) / 9),
          switch_baseline: parseInt((res.windowWidth * 5) / 9)
        })
      }
    })
  },



  /**防止滑动冒泡 */
  doNotMove: function () {
    return false;
  },

  /**
   * 根据id判断是否为邀请函
   */
  getInvitation: function () {
    http.get(
      app.globalData.host + "/biz/variableconfig/get", {
        variable: 'bao_news'
      },
      (status, resultCode, message, data) => {
        if (data && data == this.data.newsId) {
          wx.navigateTo({
            url: '/pages/invitation/invitation'
          })
        }
        this.getDetailsByNewsId();
      },
      (status, resultCode, message, data) => {
        this.getDetailsByNewsId();
      },
    )
  },
  /**
   * 根据id或者动态详情
   */
  getDetailsByNewsId: function () {
    wx.showLoading({
      title: '正在加载...',
    })
    http.get(
      app.globalData.host + "/biz/user/merchant/news/info", {
        newsId: this.data.newsId
      },
      (status, resultCode, message, data) => {
        this.setData({
          typeName: data.typeName ? data.typeName : "",
          initial_data: data,
        });
        this.handleData(data);
        this.getBusinessInfo(data.merchantCode);
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        this.setData({
          data_error: true,
          fromApp: false
        });
        wx.hideLoading();
      }
    );
  },

  /**
   * 处理动态数据
   */
  handleData: function (data) {
    let image_preview_data = this.data.image_preview_data;
    let video_data = this.data.video_data;
    let json_arr_temp = JSON.parse(data.json);
    if (json_arr_temp) {
      for (var i = 0; i < json_arr_temp.length; i++) {
        if (json_arr_temp[i].type == "web") {
          let data_temp = json_arr_temp[i].value;
          json_arr_temp[i].value = data_temp.value;
          json_arr_temp[i].image = data_temp.image;
          image_preview_data.push(json_arr_temp[i].image);
          json_arr_temp[i].index = image_preview_data.length - 1 > 0 ? image_preview_data.length - 1 : 0;
          json_arr_temp[i].errorimg = false;
          json_arr_temp[i].is3D = true;
        } else if (json_arr_temp[i].type != "text") {
          json_arr_temp[i].errorimg = false;
          if (json_arr_temp[i].image) {
            image_preview_data.push(json_arr_temp[i].image);
            json_arr_temp[i].index = image_preview_data.length - 1 > 0 ? image_preview_data.length - 1 : 0;
          }
          if (json_arr_temp[i].type == "image") {
            if (util.getUrlType(json_arr_temp[i].value)) {
              json_arr_temp[i].type = "video";
              video_data.push(json_arr_temp[i]);
              json_arr_temp[i].video_index = video_data.length - 1 > 0 ? video_data.length - 1 : 0;
            } else {
              image_preview_data.push(json_arr_temp[i].value);
              json_arr_temp[i].index = image_preview_data.length - 1 > 0 ? image_preview_data.length - 1 : 0;
            }
          } else if (json_arr_temp[i].type == "video") {
            video_data.push(json_arr_temp[i]);
            json_arr_temp[i].video_index = video_data.length - 1 > 0 ? video_data.length - 1 : 0;
          }
        }
      }
    } else {
      json_arr_temp = data.fileUrls;
      for (var i = 0; i < json_arr_temp.length; i++) {
        let json_temp = {};
        if (util.getUrlType(json_arr_temp[i])) {
          json_temp.type = "video";
          json_temp.value = json_arr_temp[i];
          video_data.push(json_arr_temp[i]);
          json_temp.video_index = video_data.length - 1 > 0 ? video_data.length - 1 : 0;
          json_arr_temp[i] = json_temp;
        } else {
          json_temp.type = "image";
          json_temp.value = json_arr_temp[i];
          image_preview_data.push(json_arr_temp[i]);
          json_temp.index = image_preview_data.length - 1 > 0 ? image_preview_data.length - 1 : 0;
          json_arr_temp[i] = json_temp;
        }
      }
    }

    for (let i in data.eventList) {
      let goodsItem = data.eventList[i]
      goodsItem.pic = JSON.parse(goodsItem.fileJson).illustration[0];
    }

    if (data.params) {
      data["params"] = data.params != "" ? JSON.parse(data.params) : ""
    } else {
      data["params"] = ""
    }
    let isFavorites = false
    if (data.params != "" && data.params.isFavorites) {
      isFavorites = data.params.isFavorites == 1 ? true : false
    }

    this.setData({
      hotel_california: json_arr_temp,
      image_preview_data: image_preview_data,
      video_data: video_data,
      business_activity_list: data.eventList,
      isFavorites: isFavorites,
    });
    this.getFastVideoUrl(0, this.data.video_data.length);
    this.setPlayBaseLine();
  },


  /**
   * 获取企业详情信息
   */
  getBusinessInfo: function (merchant_code) {
    http.get(
      app.globalData.host + "/biz/user/merchant/info", {
        merchantCode: merchant_code
      },
      (status, resultCode, message, data) => {
        this.setData({
          title_name: data.name,
          merchant_headingUrl: util.getMerchantHeadImg(data),
          merchant_code: data.code,
          business_info: data,
        });
        if (data.status == 0 || data.status == 3) {
          this.setData({
            data_error: true
          });
        }
        wx.setNavigationBarTitle({
          title: this.data.title_name + this.data.typeName
        })
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  //等比缩放图片并保存
  imageLoad: function (e) {
    //获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  

    var viewHeight = parseInt(this.data.scrollWidth) / ratio;
    var imgheight = viewHeight.toFixed(0);
    var imgheightarray = this.data.imgheights;
    //把每一张图片的高度记录到数组里
    imgheightarray.push(imgheight);

    this.setData({
      imgheights: imgheightarray,
    });
  },

  /** 图片加载失败 */
  imageErrorHandler: function (e) {
    this.data.hotel_california[e.currentTarget.dataset.errorimg].errorimg = true;
    let url = this.data.hotel_california[e.currentTarget.dataset.errorimg].vlaue;
    let strVod = "https://vod.vicpalm.com/";
    let strOutin = "https://outin";
    if (url && url.indexOf(strVod) > -1) {

    } else if (url && url.indexOf(strOutin) > -1) {

    } else {
      this.setData({
        hotel_california: this.data.hotel_california
      });
    }
  },

  /**
   * 图片预览
   */
  imagePreview: function (e) {
    wx.previewImage({
      current: this.data.image_preview_data[e.currentTarget.dataset.previewindex],
      urls: this.data.image_preview_data
    })
  },

  /**
   * 点击连接
   */
  jumpLink: function (e) {
    let url = e.currentTarget.dataset.url
    if (e.currentTarget.dataset.is3d) {
      url = util.vrUrlHandler(url, app.globalData.appId)
    }
    wx.navigateTo({
      url: "/pages/web_view_html/web_view_html?webUrl=" + url
    })
  },

  /**
   * 点击查看视频
   */
  viewVideo: function (e) {
    var current = e.currentTarget.dataset.url;
    let strVod = "https://vod.vicpalm.com/";
    let strOutin = "https://outin";
    if (current.indexOf(strVod) > -1) {
      wx.navigateTo({
        url: '/pages/business/video_show/video_show?src=' + current,
      })
    } else if (current.indexOf(strOutin) > -1) {
      wx.navigateTo({
        url: '/pages/business/video_show/video_show?src=' + current,
      })
    } else {
      http.get(
        app.globalData.host + "convert/vod/info", {
          srcUri: current
        },
        (status, resultCode, message, data) => {
          wx.navigateTo({
            url: '/pages/business/video_show/video_show?src=' + data.desUri,
          })
        },
        (status, resultCode, message, data) => {
          wx.navigateTo({
            url: '/pages/business/video_show/video_show?src=' + current,
          })
        }
      );
    }
  },


  /**
   * 跳转到商家(需要雷达采集)
   */
  toBusiness: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.merchant_code + '&higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=news' + this.data.merchant_code + '&sceneDT=' + this.data.newsId,
    })
  },

  /**
   * 处理图文列表
   */
  handleListCover: function (i, value) {
    let length = this.data.hotel_california.length
    for (var j = 0; j < length; j++) {
      let temp = this.data.hotel_california[j];
      if (temp.type == "video" && temp.video_index == i) {
        this.setData({
          ['hotel_california[' + j + '].value']: value
        });
        if (temp.errorimg) {
          this.setData({
            ['hotel_california[' + j + '].errorimg']: false
          });
        }
      }
    }
  },

  /********视频组件 start**********/

  /**
   * 获取点播地址
   */
  getFastVideoUrl: function (i, length) {
    let video_data = this.data.video_data;
    if (i < length) {

      let strVod = "https://vod.vicpalm.com/";
      let strOutin = "https://outin";
      let current = video_data[i].value;
      if (current.indexOf(strVod) > -1) {
        i = i + 1;
        this.getFastVideoUrl(i, length);
      } else if (current.indexOf(strOutin) > -1) {
        i = i + 1;
        this.getFastVideoUrl(i, length);
      } else {
        http.get(
          app.globalData.host + "convert/vod/info", {
            srcUri: current
          },
          (status, resultCode, message, data) => {
            video_data[i].value = data.desUri ? data.desUri : data.srcUri;
            this.handleListCover(i, video_data[i].value);
            this.setData({
              ['video_data[' + i + '].value']: video_data[i].value
            })
            i = i + 1;
            this.getFastVideoUrl(i, length);
          },
          (status, resultCode, message, data) => {
            i = i + 1;
            this.getFastVideoUrl(i, length);
          }
        );
      }
    }
  },

  /***
   * 点击播放视频，展示视频列表
   */
  playVideoView: function (e) {
    this.setData({
      current_video_index: e.currentTarget.dataset.video_index,
      play_video: true,
      video_play_end: false,
    })
    //修改导航栏颜色
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#000000'
    // })

  },

  /**
   * 取消播放
   */
  cancelPlay: function () {
    this.setData({
      current_video_index: -1,
      play_video: false
    })
    //修改导航栏颜色
    // wx.setNavigationBarColor({
    //   frontColor: '#000000',
    //   backgroundColor: '#ffffff'
    // })
  },

  /**
   * 滑动视频view
   */
  scrollVideo: function (e) {
    let that = this;
    if (this.scrollEndTimer) {
      clearTimeout(this.scrollEndTimer);
      this.scrollEndTimer = null;
    }
    this.scrollEndTimer = setTimeout(function () {
      that.switchVideo(e.detail.scrollTop)
    }, 100);
  },

  /**
   * 设置播放范围
   */
  setPlayBaseLine: function () {
    let video_data = this.data.video_data;
    let switch_baseline = this.data.switch_baseline;
    for (var i = video_data.length; i >= 1; i--) {
      // do something...
      if ((i - 1) == 0) {
        video_data[0].startLine = 0;
        video_data[0].endLine = switch_baseline * 1;
      } else {
        video_data[i - 1].startLine = (switch_baseline * i) - switch_baseline + 10;
        video_data[i - 1].endLine = switch_baseline * i;
      }

    }
    this.setData({
      video_data: video_data
    });

  },


  /**
   * 切换到指定视频
   */
  switchVideo: function (scrollTop) {
    let length = this.data.video_data.length;
    let video_data = this.data.video_data;
    for (var i = 0; i < length; i++) {

      if (video_data[i].startLine <= scrollTop && scrollTop < video_data[i].endLine) {
        this.setData({
          current_video_index: i,
          video_play_end: false,
        });
        break;
      }
    }
  },



  /**
   * 点击播放指定视频
   */
  clickPlayVideo: function (e) {
    this.setData({
      current_video_index: e.currentTarget.dataset.video_index,
      play_video: true,
      video_play_end: false,
    })
  },


  /**
   * 视频播放结束
   */
  videoPlayEnd: function () {
    this.setData({
      video_play_end: true,
    });

  },

  /********视频组件 end**********/



  /** 收藏企业 */
  merchantFavorites: function () {
    let that = this;
    let url = "userCollect/collect"
    if (that.data.isFavorites) {
      url = "userCollect/cancelCollect"
    }
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        http.post(
          app.globalData.host + url, {
            contentCode: this.data.newsId,
            type: app.globalData.collectTypeNews,
          },
          (_status, _resultCode, _message, data) => {
            wx.showToast({
              title: !that.data.isFavorites ? '收藏成功' : '取消收藏成功',
              icon: "none"
            })
            that.setData({
              isFavorites: !that.data.isFavorites
            });
          },
          (_status, _resultCode, _message, _data) => {}
        )
      }
    })
  },

  /** 跳转商品详情(需要雷达采集) */
  jumpBusinessActivityDetail: function (e) {
    wx.navigateTo({
      url: "/pages/tabBar_index/business_detail/business_detail?code=" + e.currentTarget.dataset.code + '&sceneType=news' + this.data.merchant_code + '&sceneDT=' + this.data.newsId + "&activityType=" + e.currentTarget.dataset.activitytype,
    })
  },

  /**获取相关高度 */
  initPageProgress: function () {
    let that = this
    /**获取可视区域 */
    getApp().getWindowInfo(function (win) {
      that.setData({
        winHeight: win.windowHeight
      });
    })

    /**获取页面内容总高度 */
    let view = '#main';
    setTimeout(() => {
      getApp().getPageHeight(function (res) {
        that.setData({
          pageHeight: res.height
        });
      }, view)
    }, 600);
  },
})