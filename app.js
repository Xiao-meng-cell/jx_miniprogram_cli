//app.js

var http = require('./utils/http.js');
var RSAKey = require('./utils/rsa-client.js');
var base64 = require('./utils/base64.js');
var util = require('./utils/util.js');
var crypto = require('./utils/crypto.js');
var oss = require('./utils/oss.js');
var QQMapWX = require('./utils/qqmap-wx-jssdk.js');
/**导入通用helper**/
var login = require('./utils/login').default
App({
  onLaunch: function (options) {
    //============ 游客标记 start ============
    let timestamp = util.timestamp(); //当前时间戳
    let key = util.random(8);
    let visitor = 'wxapp' + timestamp + key;
    if (!wx.getStorageSync('visitor')) {
      wx.setStorageSync('visitor', visitor);
    }
    //============ 游客标记 end ============

    //===== 获取差异化配置 start =========
    let extConfig = wx.getExtConfigSync()
    //默认通过API获取，当获取失败时采用静态设置
    let accountInfo = wx.getAccountInfoSync()
    if (accountInfo) {
      this.globalData.appId = accountInfo.miniProgram.appId
    }

    if (this.globalData.appId == "") {
      this.globalData.appId = extConfig.appId
    }

    this.globalData.vicpalmMain = extConfig.vicpalmMain ? extConfig.vicpalmMain : this.globalData.vicpalmMain
    this.globalData.independentPay = extConfig.independentPay ? extConfig.independentPay : this.globalData.independentPay
    this.globalData.defaultMerchantCode = extConfig.defaultMerchantCode ? extConfig.defaultMerchantCode : this.globalData.defaultMerchantCode

    //===== 获取差异化配置 end =========

    /**判断正式、测试切换，清空缓存，重新登入 */
    if (wx.getStorageSync('httpPath') && wx.getStorageSync('httpPath') != this.globalData.host) {
      wx.clearStorage();
    } else {
      wx.setStorageSync('httpPath', this.globalData.host);
    }

    //隐藏系统底部菜单
    this.hidetabbar();
    this.globalData.lander = wx.getStorageSync('user');
    this.globalData.myMerchantInfo = wx.getStorageSync("myMerchantInfo");
    var app = this;
    this.globalData.testServer = this.globalData.host == "https://test.vicpalm.com/weclubbing/remote/" ? true : false;
    this.checkNetworkOnOpen();
    this.checkNetwork();
    this.getUserPhone();
    this.getMenuButtonBoundingClientRect()
    this.checkLocationScope()

    if (options.query.user) {
      wx.login({
        success: res => {
          app.globalData.isReloadThePage_tabBar_index = true;
          this.globalData.lander = JSON.parse(options.query.user);

          wx.setStorageSync("user", this.globalData.lander);
          wx.setStorageSync("principal", this.globalData.lander.username);
          wx.setStorageSync("userCode", this.globalData.lander.userCode);
          wx.setStorageSync("digestKey", options.query.digestKey)

          wx.navigateTo({
            url: '/pages/authorization/authorization?formPersonal=true',
          })
          this.getLocationByUser();
        },
        fail: res => {
          wx.showToast({
            title: '获取登陆信息失败,请重新登陆',
            icon: "none"
          })
        }
      })

    }

    var encrypt = function (val) {
      var rsaKey = app.globalData.rsaKey;
      if (rsaKey == null) {
        return null;
      }
      return base64.hex2b64(rsaKey.encrypt(val));
    }

    /**
     * oss
     */
    var ossSts = function (success, error) {
      http.get(
        app.globalData.OSS_STS, {},
        success,
        error
      );
    };
    app.globalData.ossSts = ossSts;

    /**
     * 上传文件
     * @param fileUrl 文件路径
     * @param uploadPath 上传路径
     * @param success 成功回调方法
     * @param error 失败回调方法
     */
    var uploadFile = function (fileUrl, uploadPath, success, error) {
      var params = {};
      params.fileType = "file.oss";
      params.uploadPath = uploadPath;
      oss.upload(
        app.globalData.UPLOAD,
        fileUrl,
        params,
        (status, resultCode, message, data) => {
          data.uri = data.url;
          if (data && !data.url.startsWith("http")) {
            if (!data.url.startsWith("/")) {
              data.url = app.globalData.UPLOAD_PATH + data.url;
            }
          }
          if (success) {
            //success(status, resultCode, message, data);
            success(status, resultCode, message, data.oss ? data.oss : data.url);
          }
        },
        error
      );
    };
    app.globalData.uploadFile = uploadFile;

    var uploadFiles = function (fileUrls, desUrls, index, uploadPath, success, error) {
      uploadFile(
        fileUrls[index],
        uploadPath,
        (status, resultCode, message, data) => {
          desUrls.push(data);
          if (index == fileUrls.length - 1) {
            success(status, resultCode, message, desUrls);
          } else {
            uploadFiles(fileUrls, desUrls, index + 1, uploadPath, success, error);
          }
        },
        error);
    };

    /**
     * 上传文件
     * @param fileUrls 文件路径
     * @param uploadPath 上传路径
     * @param success 成功回调方法
     * @param error 失败回调方法
     */
    app.globalData.uploadFiles = function (fileUrls, uploadPath, success, error) {
      uploadFiles(fileUrls, [], 0, uploadPath, success, error);
    };

    /**
     * 上传文件到OSS
     * @param fileUrl 文件路径
     * @param uploadPath 上传路径
     * @param success 成功回调方法
     * @param error 失败回调方法
     */
    var uploadFileOss = function (fileUrl, uploadPath, success, error) {
      var params = {};
      params.fileType = "file.oss";
      params.uploadPath = uploadPath;
      oss.upload(
        app.globalData.UPLOAD,
        fileUrl,
        params,
        (status, resultCode, message, data) => {
          data.uri = data.url;
          if (data && !data.url.startsWith("http")) {
            if (!data.url.startsWith("/")) {
              data.url = app.globalData.UPLOAD_PATH + data.url;
            }
          }
          if (success) {
            // success(status, resultCode, message, data);
            success(status, resultCode, message, data.oss ? data.oss : data.url);
          }
        },
        error
      );
    };
    app.globalData.uploadFileOss = uploadFileOss;

    var uploadFileOsss = function (fileUrls, desUrls, index, uploadPath, success, error) {
      uploadFileOss(
        fileUrls[index],
        uploadPath,
        (status, resultCode, message, data) => {
          desUrls.push(data);
          if (index == fileUrls.length - 1) {
            success(status, resultCode, message, desUrls);
          } else {
            uploadFileOsss(fileUrls, desUrls, index + 1, uploadPath, success, error);
            //uploadFileOss(fileUrls[index + 1], uploadPath, success, error);
          }
        },
        error);
    };

    /**
     * 上传文件
     * @param fileUrls 文件路径
     * @param uploadPath 上传路径
     * @param success 成功回调方法
     * @param error 失败回调方法
     */
    app.globalData.uploadFileOsss = function (fileUrls, uploadPath, success, error) {
      uploadFileOsss(fileUrls, [], 0, uploadPath, success, error);
    };

    /**
     * 上传图片
     * @param fileUrl 文件路径
     * @param uploadPath 上传路径
     * @param success 成功回调方法
     * @param error 失败回调方法
     */
    var uploadImage = function (fileUrl, uploadPath, width, height, success, error) {
      var params = {};
      params.fileType = "image.oss";
      params.uploadPath = uploadPath;
      params.imageWidth = width;
      params.imageHeight = height;
      oss.upload(
        app.globalData.UPLOAD,
        fileUrl,
        params,
        (status, resultCode, message, data) => {
          data.uri = data.url;
          if (data && !data.url.startsWith("http")) {
            if (!data.url.startsWith("/")) {
              data.url = app.globalData.UPLOAD_PATH + data.url;
            }
          }
          if (success) {
            // success(status, resultCode, message, data);
            success(status, resultCode, message, data.oss ? data.oss : data.url);
          }
        },
        error
      );
    };
    exports.uploadImage = uploadImage;

    app.globalData.uploadImages = function (fileUrls, desUrls, index, uploadPath, width, height, success, error) {
      uploadImage(
        fileUrls[index],
        uploadPath,
        width, height,
        (status, resultCode, message, data) => {
          desUrls.push(data);
          if (index == fileUrls.length - 1) {
            if (success) {
              success(status, resultCode, message, desUrls);
            }
          } else {
            uploadImages(fileUrls, desUrls, index + 1, uploadPath, width, height, success, error);
          }
        },
        error);
    };

    /**
     * 上传文件
     * @param fileUrls 文件路径
     * @param uploadPath 上传路径
     * @param success 成功回调方法
     * @param error 失败回调方法
     */
    app.globalData.uploadImages = function (fileUrls, uploadPath, width, height, success, error) {
      uploadImages(fileUrls, [], 0, uploadPath, width, height, success, error);
    };

    /**
     * 上传图片到OSS
     * @param fileUrl 文件路径
     * @param uploadPath 上传路径
     * @param success 成功回调方法
     * @param error 失败回调方法
     */
    var uploadImageOss = function (fileUrl, uploadPath, width, height, success, error) {
      var params = {};
      params.fileType = "image.oss";
      params.uploadPath = uploadPath;
      params.imageWidth = width;
      params.imageHeight = height;
      oss.upload(
        app.globalData.UPLOAD,
        fileUrl,
        params,
        (status, resultCode, message, data) => {
          data.uri = data.url;
          if (data && !data.url.startsWith("http")) {
            if (!data.url.startsWith("/")) {
              data.url = app.globalData.UPLOAD_PATH + data.url;
            }
          }
          if (success) {
            // success(status, resultCode, message, data);
            success(status, resultCode, message, data.oss ? data.oss : data.url);
          }
        },
        error
      );
    };
    app.globalData.uploadImageOss = uploadImageOss;

    var uploadImageOsss = function (fileUrls, desUrls, index, uploadPath, width, height, success, error) {
      uploadImageOss(
        fileUrls[index],
        uploadPath,
        width, height,
        (status, resultCode, message, data) => {
          desUrls.push(data);
          if (index == fileUrls.length - 1) {
            if (success) {
              success(status, resultCode, message, desUrls);
            }
          } else {
            uploadImageOsss(fileUrls, desUrls, index + 1, uploadPath, width, height, success, error);
          }
        },
        error);
    };

    /**
     * 上传文件
     * @param fileUrls 文件路径
     * @param uploadPath 上传路径
     * @param success 成功回调方法
     * @param error 失败回调方法
     */
    app.globalData.uploadImageOsss = function (fileUrls, uploadPath, width, height, success, error) {
      uploadImageOsss(fileUrls, [], 0, uploadPath, width, height, success, error);
    };

    app.globalData.encrypt = encrypt;
    if (!app.globalData.ssdid) {
      var key_ssdid = util.random(32);
      app.globalData.ssdid = key_ssdid;
      wx.setStorageSync('ssdid', app.globalData.ssdid)
    }


    var init = function () {
      if (!wx.getStorageSync('user')) {
        return;
      }
      http.get(
        app.globalData.host + "rsa", {},
        (status, resultCode, message, data) => {
          console.log("init 成功")
          wx.hideLoading();
          var rsaKey = new RSAKey();
          rsaKey.setPublic(base64.b64tohex(data.modulus), base64.b64tohex(data.exponent));
          app.globalData.rsaKey = rsaKey;
        },
        (status, resultCode, message, data) => {
          console.log("init 失败")
          wx.hideLoading();
          wx.showToast({
            title: message,
          })
        })
    };
    init();
    this.autoUpdate(); //检查更新

  }, //onLaunch方法结束

  // 这里这么写，是要在其他界面监听，而不是在app.js中监听，而且这个监听方法，需要一个回调方法。
  watch: function (method) {
    var obj = this.globalData;
    Object.defineProperty(obj, "networkType", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._networkType = value;
        // console.log('是否会被执行2')
        method(value);
      },
      get: function () {
        // 可以在这里打印一些东西，然后在其他界面调用getApp().globalData.name的时候，这里就会执行。
        return this._networkType
      }
    })
  },

  //隐藏系统底部菜单
  hidetabbar() {
    // wx.hideTabBar({
    //   fail: function () {
    //     setTimeout(function () { // 做了个延时重试一次，作为保底。
    //       wx.hideTabBar()
    //     }, 500)
    //   }
    // });
  },

  getLocationByUser: function () {
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        var qqmapsdk = new QQMapWX({
          key: this.globalData.qqMapKey
        });
        // 调用接口
        var that = this;
        that.globalData.current_lat = res.latitude;
        that.globalData.current_lng = res.longitude;
        that.globalData.city_info.lat = res.latitude
        that.globalData.city_info.lng = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            that.globalData.city_info.name = res.result.address_component.city;
            that.globalData.city_info.cityInit = res.result.address_component.city.substr(0, res.result.address_component.city.length - 1)
            that.globalData.city_info.district = res.result.address_component.district;
            that.globalData.city_info.province = res.result.address_component.province;
            that.getCurrentCity(that.globalData.city_info.name);
            that.getCityId(that.globalData.city_info.name, that.globalData.city_info.district, that.globalData.current_lng, that.globalData.current_lat);
          },
          fail: function (res) {

          },
          complete: function (res) {

          }
        });

      },
      fail: res => {},
      complete: res => {
        this.checkLocationScope()
      },
    })
  },


  /**
   * 获取当前定位城市的cityid
   */
  getCurrentCity: function (cityName) {
    console.log("获取当前定位城市的cityid")
    var name_miniPro = cityName;
    var name = cityName.substr(0, cityName.length - 1);
    http.get(
      this.globalData.host + "city", {
        city: name
      },
      (status, resultCode, message, data) => {
        console.log("获取当前定位城市的cityid 成功")
        this.globalData.locationCityId = data.id;
      },
      (status, resultCode, message, data) => {
        console.log("获取当前定位城市的cityid 成功")
      }
    );
  },

  /**
   * 当小程序显示的时候
   */
  onShow: function (options) {
    if (options.query.user) {
      this.globalData.isReloadThePage_tabBar_index = true;
    }
  },

  /**
   * 通过经纬度换算距离
   */
  toRad: function (d) {
    return d * Math.PI / 180;
  },

  /**
   * 通过经纬度换算距离
   */
  getDisance: function (lat2, lng2) {
    //lat为纬度, lng为经度, 一定不要弄错
    var lat1 = this.globalData.current_lat;
    var lng1 = this.globalData.current_lng;
    var dis = 0;
    var radLat1 = this.toRad(lat1);
    var radLat2 = this.toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = this.toRad(lng1) - this.toRad(lng2);
    dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    dis = Math.round((dis * 6378.137) * 10000) / 10000; //输出为公里
    if (dis < 1) {
      dis = dis * 1000;
      dis = dis.toFixed(2);
      dis = dis + "m"
    } else {
      dis = dis.toFixed(2);
      if (dis > 5000) {
        dis = ""
      } else {
        dis = dis + "km"
      }
    }
    return dis;
  },

  /**
   * 触摸开始事件
   */
  touchStart: function (e) {
    this.globalData.touchDotX = e.touches[0].pageX; // 获取触摸时的原点
    this.globalData.touchDotY = e.touches[0].pageY;
  },

  /**
   * 触摸结束事件
   */
  touchEnd: function (e) {
    let touchMoveX = e.changedTouches[0].pageX;
    let touchMoveY = e.changedTouches[0].pageY;
    let tmX = touchMoveX - this.globalData.touchDotX;
    let tmY = touchMoveY - this.globalData.touchDotY;
    let absX = Math.abs(tmX);
    let absY = Math.abs(tmY);
    if (absX > 2 * absY) {
      if (tmX < (-60)) {
        return "left";
      } else if (tmX > 60) {
        return "right";
      }
    }
    if (absY > absX * 2 && tmY < 0) {
      return "up";
    }
  },



  /**
   * 获取城市id
   */
  getCityId: function (cityName, locationAddr, lng, lat) {
    console.log("获取城市id")
    let name = cityName.substr(0, cityName.length - 1);
    http.get(
      this.globalData.host + "city", {
        city: name
      },
      (status, resultCode, message, data) => {
        console.log("获取城市id 成功")
        let city_info = this.globalData.city_info;
        city_info.id = data.id;
        this.globalData.city_info = city_info;
        this.setUserLocation(this.globalData.city_info.id, cityName, locationAddr, lng, lat);
      },
      (status, resultCode, message, data) => {
        console.log("获取城市id 失败")
      }
    );
  },

  /**判断用户是否登录授权 */
  isUserLogin(callBack) {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '/pages/authorization/authorization',
      })
      return;
    } else {
      callBack(true);
    }
  },

  /**
   * 校验图片是否涉黄
   * @params images 上传的图片数组["",""]
   * @params tipStr 提示图片组上传有涉黄
   */
  checkImgYellowish: function (images, tipStr) {
    var that = this;
    var isYellowishes = []; //保存涉黄下标
    if (images == null || images.length == 0) {
      wx.showModal({
        title: '您还没选择任何图片',
        content: '请选择图片',
      })
    } else {
      for (var i = 0; i < images.length; i++) {
        var imageUrl = images[i];
        http.get(
          that.globalData.host + 'aliyun/scanImageFlag', {
            imageUrl: imageUrl,
            lv: 2,
          },
          (status, resultCode, message, data) => {
            if (data) {
              isYellowishes.push(imageUrl);
              if (isYellowishes.length == images.length) { //需要全部检测才能全部鉴成功
                wx.hideLoading();
                return true
              }
            } else {
              wx.hideLoading();
              wx.showModal({
                title: tipStr + '图片涉嫌违规，已禁止上传',
                content: '请重新上传图片',
              })
              return false;
            }

          },
          (status, resultCode, message, data) => {
            wx.hideLoading();
            wx.showToast({
              title: '鉴黄失败!',
              icon: "none",
              duration: 2000
            })
            return null;
          }
        );
      }
    }
  },

  /**
   * 设置用户位置
   */
  setUserLocation: function (cityId, locationName, locationAddr, lng, lat) {
    console.log("设置用户位置")
    if (!this.globalData.lander) {
      return false;
    }
    http.post(
      this.globalData.host + "personal/setUserLocation", {
        cityId: cityId,
        locationName: locationName,
        locationAddr: locationAddr,
        lng: lng,
        lat: lat
      },
      (status, resultCode, message, data) => {
        console.log("设置用户位置 成功")
        this.globalData.openLocations = true;
      },
      (status, resultCode, message, data) => {
        console.log("设置用户位置 失败")
        // wx.showToast({
        //   title: '获取单个城市错误',
        //   icon:"none"
        // })
      }
    );
  },


  /**
   * 获取当前登录人的上企业信息
   */
  getLenderBusinessInfo: function () {
    console.log("获取当前登录人的上企业信息")
    http.get(
      this.globalData.host + "biz/user/merchant/info", {
        userId: this.globalData.lander.id
      },
      (status, resultCode, message, data) => {
        console.log("获取当前登录人的上企业信息 成功")
        if (data.status != -1) {
          this.globalData.myMerchantInfo = data;
          wx.setStorageSync("myMerchantInfo", this.globalData.myMerchantInfo);
        }
      },
      (status, resultCode, message, data) => {
        console.log("获取当前登录人的上企业信息 失败")
        wx.hideLoading({
          title: "获取登录人企业信息失败"
        })
      }
    );
  },

  /**
   * 检查网络是否打开
   */
  checkNetwork: function () {
    var that = this;
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        that.globalData.networkType = false;
      } else {
        that.globalData.networkType = true;
      }
      if (res.networkType == "3g" || res.networkType == "2g") {
        wx.showToast({
          title: '网络连接不稳定',
          icon: "none",
          duration: 2000
        })
      }
    })
  },

  /**
   * 打开小程序，检查网络是否连接
   */
  checkNetworkOnOpen: function () {
    var that = this;
    wx.getNetworkType({
      success(res) {
        if (res.networkType == "unknown" || res.networkType == "none") {
          that.globalData.networkType = false;
        } else {
          that.globalData.networkType = true;
        }
        if (res.networkType == "3g" || res.networkType == "2g") {
          wx.showToast({
            title: '网络连接不稳定',
            icon: "none",
            duration: 2000
          })
        }
      },
      fail(res) {
        that.globalData.networkType = false;
      }
    })
  },


  /**
   * 检查定位是否打开
   */
  checkLocationScope: function () {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          //打开提示框，提示前往设置页面
          this.globalData.userLocation_scope = true;
        } else {
          let temp = res.authSetting['scope.userLocation']
          if (temp === false) {
            this.globalData.userLocationReject = true;
          }
          this.globalData.userLocation_scope = false;
        }
      }
    })
  },

  /**
   * 判断机型
   */
  getUserPhone: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.windowWidth = res.windowWidth;
        this.globalData.wxVersion = res.version;
        this.globalData.platform = res.platform;
        // var barHeight = (res.platform == "ios" ? 44 : 48);
        // this.globalData.capsuleTop = res.statusBarHeight + (barHeight - 32) / 2;
        if (res.model.indexOf("iPhone X") > -1) {
          this.globalData.iPhone_X = true
        }
        if (res.model.indexOf("iPhone 1") > -1) {
          this.globalData.iPhone_X = true
        }
      }
    })
  },

  getMenuButtonBoundingClientRect: function () {
    let obj = wx.getMenuButtonBoundingClientRect()
    this.globalData.capsuleTop = obj.top
    this.globalData.capsuleHeight = obj.height
  },

  /**
   * 加密方法
   */
  encrypt: function (val) {
    var rsaKey = this.globalData.rsaKey;
    if (rsaKey == null) {
      return null;
    }
    return base64.hex2b64(rsaKey.encrypt(val));
  },


  /**
   * 自动更新
   */
  autoUpdate: function () {
    var self = this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否下载新版本并重启小程序？',
            success: function (res) {
              if (res.confirm) {
                wx.removeStorageSync('user');
                wx.removeStorageSync('userCode');
                wx.removeStorageSync('myMerchantInfo');
                self.globalData.lander = null;
                self.globalData.myMerchantInfo = null;
                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                self.downLoadAndUpdate(updateManager)
              } else if (res.cancel) {
                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                  showCancel: false, //隐藏取消按钮
                  confirmText: "确定更新", //只保留确定更新按钮
                  success: function (res) {
                    if (res.confirm) {
                      //下载新版本，并重新应用
                      self.downLoadAndUpdate(updateManager)
                    }
                  }
                })
              }
            }
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  /**
   * 下载小程序新版本并重启应用
   */
  downLoadAndUpdate: function (updateManager) {
    var self = this
    wx.showLoading();
    //静默下载更新小程序新版本
    updateManager.onUpdateReady(function () {
      wx.hideLoading()
      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    })
  },

  /** 获取企业分类编号 */
  getTagCode: function () {
    let tagCode = this.globalData.tagCode
    return tagCode == "" ? undefined : tagCode
  },
  //分享采集参数
  Shareacquisition: function (shareType, merchantCode, eventCode, productCode, higherLevelCode, clerkUserCode, clerkId, newsId) {
    var userId = this.globalData.lander.id;
    var postUrl = this.globalData.host;
    var higherLevelCode = this.globalData.myShareCode;
    this.globalData.collectparam = {
      shareType: shareType,
      merchantCode: merchantCode,
      userId: userId,
      higherLevelCode: higherLevelCode,
      clerkUserCode: clerkUserCode,
    }
    if (shareType == "clerk") {
      this.globalData.collectparam['clerkId'] = clerkId
      this.globalData.collectparam['pageId'] = "clerk_detail"
      this.globalData.collectparam['pageDescribe'] = "名片详情页"
    }
    if (shareType == "merchant") {
      this.globalData.collectparam['shareType'] = shareType
      this.globalData.collectparam['pageId'] = "business_homepage"
      this.globalData.collectparam['pageDescribe'] = "商家主页"
    }
    if (shareType == "live") {
      this.globalData.collectparam['shareType'] = shareType
      this.globalData.collectparam['pageId'] = "live"
      this.globalData.collectparam['pageDescribe'] = "直播页"
    }
    if (shareType == "news") {
      this.globalData.collectparam['newsId'] = newsId
      this.globalData.collectparam['pageId'] = "news_detail"
      this.globalData.collectparam['pageDescribe'] = "动态详情页"
    }
    if (shareType == "goods") {
      this.globalData.collectparam['eventCode'] = eventCode
      this.globalData.collectparam['productCode'] = productCode
      this.globalData.collectparam['pageId'] = "business_detail"
      this.globalData.collectparam['pageDescribe'] = "商品详情页"
    }

    this.globalData.collectparam['accessRoutes'] = this.globalData.accessRoutes
    this.globalData.collectparam['routesDescribe'] = this.globalData.routesDescribe

    console.log("提交参数", this.globalData.collectparam)
    var that = this;
    http.post(
      postUrl + "collect/collectShareOperation", that.globalData.collectparam,
      (status, resultCode, message, data) => {
        console.log('统计收集成功');
      },
      (status, resultCode, _message, data) => {

      }
    )

  },

  /**
   * 订阅消息
   * tmplId:['gh8CVR5Qn0-an','YqJnLuXMt7027NAEBB0p'] //传入模板id一条或者多条,最多3条
   * completeCallBack//完成唤起回调
   * 
   * 
     <button bindtap="subscribeMsg">点击订阅消息</button>
     需按钮唤起回调
   */
  subscribeMsg(tmplId, completeCallBack) {
    let that = this
    wx.requestSubscribeMessage({
      tmplIds: tmplId, //模板ids,最多3条
      success(res) {
        if (res[tmplId] == 'accept') { //某条订阅信息 接收或者拒绝
          that.cloudSendMsg();
        } else if (res[tmplId] == 'reject') { // 用户拒绝授权
          wx.showModal({
            title: '温馨提示',
            content: "您已关闭消息推送，如需要消息推送服务，请点击确定跳转设置页面打开授权后再次尝试。",
            success: function (modal) {
              if (modal.confirm) { // 点击确定
                wx.openSetting({
                  withSubscriptions: true
                })
              }
            }
          })
        }
      },
      fail(err) {
        if (err.errCode == '20004') {
          wx.showModal({
            title: '温馨提示',
            content: "您的消息订阅主开关已关闭，如需要消息推送服务，请点击确定跳转设置页面打开授权后再次尝试。",
            success: function (modal) {
              if (modal.confirm) { // 点击确定
                wx.openSetting({
                  withSubscriptions: true
                })
              }
            }
          })
        }
      },
      complete(res) {
        console.log('complete  调用完成')
        // 无论取消还是接收都会执行:比如 下单(无论订阅号是取消还是接收都执行)
        //完成回调
        completeCallBack()
      }
    })
  },

  /**
   * 封装option
   * options
   * callBack 回调1接口回调，0原始传参
   * miniCodeCallBack 解析小程序码回调
   * qrCodeCallBack 解析二维码回调
   */
  getOptions(options, callBack, miniCodeCallBack, qrCodeCallBack) {
    let that = this
    if (options.batchId) {
      //通过batchId获取option
      console.log('通过batchId获取option', options.batchId)
      that.getShareParams(options, function (data) {
        that.getBetchShareId(data);
        callBack(data, 1)
      }, function (data) {})
    } else if (options.scene) {
      let qrcode_scene = decodeURIComponent(options.scene).trim();
      if (qrcode_scene.split("=")[0] == 'batchId') {
        //通过小程序码batchId获取option
        let option = {
          batchId: qrcode_scene.split("=")[1]
        }
        console.log('通过小程序码batchId获取option', option)
        that.getShareParams(option, function (data) {
          that.getBetchShareId(data);
          callBack(data, 1)
        }, function (data) {})
      } else {
        //兼容旧小程序码获取option
        console.log('兼容旧小程序码获取option', options)
        that.getBetchShareId(options);
        miniCodeCallBack(options, qrcode_scene)
      }
    } else if (options.q) {
      //通过二维码获取option
      let qrcode_scene = decodeURIComponent(options.q);
      console.log('qrcode_scene', qrcode_scene)
      let batchId = util.getQueryString(qrcode_scene, "batchId");
      console.log('batchId', batchId)

      if (batchId != null && batchId != "") {
        console.log('通过二维码batchId获取option', options)
        let option = {
          batchId: batchId
        }
        that.getShareParams(option, function (data) {
          that.getBetchShareId(data);
          callBack(data, 1)
        }, function (data) {})
      } else {
        //兼容旧二维码获取option
        console.log('通过旧二维码获取option', options)
        that.getBetchShareId(options);
        qrCodeCallBack(options, qrcode_scene)
      }
    } else {
      //兼容旧参数
      console.log('兼容旧参数', options)
      that.getBetchShareId(options);
      callBack(options, 0)
    }
  },

  /**
   * 获取分享参数
   * options
   * success 成功回调
   * fail 失败回调
   */
  getShareParams: function (options, success, fail) {
    console.log("获取分享参数")
    let that = this
    if (options.batchId) {
      let batchId = options.batchId
      http.get(
        this.globalData.host + "/biz/params/get", {
          id: batchId
        },
        (status, resultCode, message, data) => {
          console.log('获取分享参数', data);
          that.getBetchShareId(data);
          success(data)
        },
        (status, resultCode, _message, data) => {
          console.log("获取分享参数 失败")
          fail(data)
        }
      )
    }
  },
  /**
   * 获取分享源头ID
   */
  getBetchShareId: function (options) {
    console.log('获取---options', options);
    if (options.batchShare != null && options.batchShare != '' && options.batchShare != 'undefined') {
      this.globalData.batchShare = options.batchShare
      // console.log('获取分享源头ID---options', this.globalData.batchShare);
    } else {
      if (this.globalData.batchShare == '' && this.globalData.lander && this.globalData.lander.id != null) {
        this.globalData.batchShare = 'wxapp_' + this.globalData.lander.id + '_' + Date.parse(new Date())
      }
    }
    console.log('获取分享源头ID', this.globalData.batchShare);
  },


  /**
   * 分享
   * prams 请求参数
   * (appId,scene,page,size,userId,userCode,inviteCode)
   * title 分享标题
   * path 分享路径
   * imageUrl 分享图片
   */
  share: function (prams, title, path, imageUrl) {
    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
    };
  },

  loadCartNum(callBack) {
    console.log("获取购物车数量")
    if (!this.globalData.lander) {
      return;
    }
    http.get(
      this.globalData.business_host + "cart/count", { //独立小程序只查找对应购物车数量
        onshelfStoreCode: this.globalData.vicpalmMain ? null : this.globalData.defaultMerchantCode
      },
      (status, resultCode, message, data) => {
        console.log("加载购物车数量 成功")
        this.globalData.tabBar.list[2].number = data;
        let tabBar = this.globalData.tabBar;
        callBack(tabBar);
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        console.log("加载购物车数量失败")
      }
    );
  },

  /** 获取场景值 */
  getSenceCode: function (senceCode) {
    //判断场景值
    switch (senceCode) {
      case 1007: //单人聊天小程序卡片
        this.globalData.accessRoutes = "wxCard"
        this.globalData.routesDescribe = "微信小卡片"
        break;
      case 1008: //群聊小程序卡片
        this.globalData.accessRoutes = "wxCard"
        this.globalData.routesDescribe = "微信小卡片"
        break;
      case 1047: //扫描小程序码
        this.globalData.accessRoutes = "scan"
        this.globalData.routesDescribe = "扫码进入"
        break;
      case 1048: //长按图片识别小程序码
        this.globalData.accessRoutes = "scan"
        this.globalData.routesDescribe = "扫码进入"
        break;
      case 1049: //手机相册识别小程序码
        this.globalData.accessRoutes = "scan"
        this.globalData.routesDescribe = "扫码进入"
        break;
      case 1065: //H5打开
        this.globalData.accessRoutes = "H5"
        this.globalData.routesDescribe = "H5链接"
        break;
      case 1089: //微信主界面下拉
        this.globalData.accessRoutes = "dropApplet"
        this.globalData.routesDescribe = "下拉小程序"
        break;
      default:
        if (senceCode) {
          this.globalData.accessRoutes = senceCode
          this.globalData.routesDescribe = "其他途径进入"
        }
        break;
    }
  },

  /**
   * 获取屏幕可视区域高度
   */
  getWindowInfo(callBack) {
    wx.getSystemInfo({
      success: (res) => {
        callBack(res);
      },
    })
  },

  /**
   * 获取view标签相关属性，包含宽、高、上下间距等
   */
  getPageHeight(callBack, view) { //view：需要获取的view
    let query = wx.createSelectorQuery();
    query.select(view).boundingClientRect(function (rect) {
      callBack(rect);
    }).exec();
  },

  globalData: {
    OSS_STS: "https://www.vicpalm.com/weclubbing/remote/oss/sts",
    ossSts: null,
    UPLOAD: "https://www.vicpalm.com/weclubbing/oss/",
    UPLOAD_PATH: "/weclubbing/oss/",
    uploadFile: null,
    uploadFiles: null,
    uploadFileOss: null,
    uploadFileOsss: null,
    uploadImage: null,
    uploadImages: null,
    uploadImageOss: null,
    uploadImageOsss: null,
    userInfo: null,

    testServer: false,

    // img_host: "http://izsyue.oss-cn-shenzhen.aliyuncs.com/assets/applets/enterpriseEdition/images/",
    city_info: {
      id: "",
      lat: 0,
      lng: 0,
      name: "",
      cityInit: "",
    },
    tabBar: {
      blockid: 0,
      bgcolor: "#ffffff",
      showborder: true,
      bordercolor: "#eeeeee",
      color: "#37424D",
      selectedColor: "#37424D",
      list: [{
          pagePath: "/pages/tabBar_index/business_homepage/business_homepage",
          text: "首页",
          iconPath: "/assets/images/tab_business_default.png",
          selectedIconPath: "/assets/images/tab_business_selected.png",
          isdot: false,
          number: 0,
          isShow: true,
        },
        {
          pagePath: "/pages/tabBar_index/business_goods/business_goods",
          text: "分类",
          iconPath: "/assets/images/tab_activity_default.png",
          selectedIconPath: "/assets/images/tab_activity_selected.png",
          isdot: false,
          number: 0,
          isShow: true,
        },
        {
          pagePath: "/pages/tabBar_index/cart/cart",
          text: "购物车",
          iconPath: "/assets/images/tab_cart_default.png",
          selectedIconPath: "/assets/images/tab_cart_selected.png",
          isdot: false,
          number: 0,
          isShow: true,
        },
        {
          pagePath: "/pages/tabBar_user_center/user_center",
          text: "工作台",
          iconPath: "/assets/images/tab_user_default.png",
          selectedIconPath: "/assets/images/tab_user_selected.png",
          isdot: false,
          number: 0,
          isShow: true,
        }
      ]
    },
    //========= 重要 很重要 非常重要 发布前需要注意 start =========
    host: "https://www.vicpalm.com/weclubbing/remote/",
    im: "https://www.vicpalm.com/weclubbing/im/",
    business_host: "https://www.vicpalm.com/weclubbing/order/",
    vip_host: "https://www.vicpalm.com/weclubbing/cloud/vip/system/",
    ipush_host: "wss://lpush.vicpalm.com/",

    // host: "https://test.vicpalm.com/weclubbing/remote/",
    // im: "https://test.vicpalm.com/weclubbing/im/",
    // business_host: "https://test.vicpalm.com/weclubbing/order/",
    // vip_host: "https://test.vicpalm.com/weclubbing/cloud/vip/system/",
    // ipush_host: "wss://test.vicpalm.com:9093",

    appId: "wxba47ec164035a715", //企业版 wx8e99b6918eb537ea; 掌胜优品 wxdc99d7cc57ddb65b; 掌创人生 wx827e01ca3d4ec7d5;
    //一下都是独立小程序
    // 味熊烘焙馆 wx00a71e008067167b  辰中照明 wx7c568d2d5ef5d8ab  广西翔盛建设工程有限公司 wx777af4dca2a34200 广西捷恩诚房地产开发集团 wx71684e181e17a1bb
    // wxcdfc45acbf1dc973(天同府); wx39bbe1db0cfa7552(锦多鑫)
    vicpalmMain: false, //是否掌胜科技为主体
    independentPay: true, //是否开启独立支付
    h5PathTest: false, //是否为H5测试路径
    merchantTemplate: "shop", //商家模板
    enableMember: false, //启用会员功能
    defaultMerchantCode: "2041926838963101566", //初始化默认商家编号  2051726499611105498 默认“掌创推荐”; 2031925914750105999 掌胜; 2051726136767106348(小龚-测试), //靖西2041926838963101566  祖哥测试服店664927011885103266
    //以下都是独立小程序
    // 2051926784092105338(味熊烘焙馆-正式),664926346915109217(蚂蚁-测试)(味熊烘焙馆) 2041726758596105395(辰中照明-正式服) 2031725936795108138(广西翔盛建设工程有限公司-正式服) 2041926420565108894(广西捷恩诚房地产开发集团-正式服)
    //2031726790388105544(天同府-正式); 2041926784470105319(锦多鑫 -正式);
    //========= 重要 很重要 非常重要 发布前需要注意 end =========

    //企业分类编号（默认为空，不区分行业）
    //家装：190412213841
    //旅游：190928191353
    tagCode: "",
    rsaKey: null,
    encrypt: null,
    current_lat: null,
    current_lng: null,
    // lander: null, //当前登录用户信息
    touchDotX: 0, //X按下时坐标
    touchDotY: 0, //y按下时坐标
    qqMapKey: "5U4BZ-HWQAP-LATDH-VQBRP-3XGSV-WVF6C",
    higherLevelCode: "", //别人的分享码
    clerk_code: '', //合伙人code
    openid: "",
    edition: "0.14.16", //版本号，发包之前才写
    openLocations: false, //是否开启定位
    fromApp: "", //从app中来的
    locationCityId: "", //当前用户所定位的城市id
    changeCity: false, //是否切换了城市 
    networkType: undefined, //网络是否连接
    userLocation_scope: undefined, //用户是否打开位置权限
    userLocationReject: false, //用户拒绝位置授权
    selectType: null, //企业所属行业分类
    pcode: null, //企业所属行业分类父类
    myMerchantInfo: "", //当前登录人的企业信息
    userHarvestAddress: "", //用户下单时选择收货地址
    iPhone_X: false, //判断用户手机是否是iphone X 系列
    //checkImgYellowish: false, //校验图片是否涉黄
    merchant_code: "", //企业id
    confirmOrder: false, //是否提交过当前订单
    isReloadThePage_tabBar_index: true, //判断是否要重新加载首页
    jumpIndex_fromApp: false, //跳转到首页
    dynamicType: "", //发布企业动态时所选类型
    cashOutHickoryDetail: '', //提现详情
    afterSaleDetail: null, //售后相关详情
    goodsDetail: null, //活动产品详情
    scene1089: false, //小卡片分享后是否设置返回首页
    coupon_code: "", //优惠券编码
    vasCoupon: "", //增值服务优惠券
    windowHeight: 0,
    windowWidth: 0,
    wxVersion: "",
    capsuleHeight: "", //右上角胶囊按钮高度
    capsuleTop: "", //右上角胶囊按钮上边距
    onShowEnable: true, //是否启用onshow方法
    authorization: false, //是否已经打开了登录页
    WebIM: null, //环信webIM
    imUserInfo: null, //环信用户信息
    closeGoodsEntrance: true, //关闭商品入口
    roomId: null, //聊天室id
    imAccessToken: null, //im是否登录
    wsIpush: null, //ipush的websocket,
    pingStaute: 0, //发ping标识 ，0是不要发，1是可以发
    reConTimes: 0, //ipush重连次数
    collectparam: {}, //雷达参数采集
    batchShare: "", //源头ID,
    learningGardenUrl: "",

    //审核状态
    auditStatusFail: -1, //审核不通过
    auditStatusWait: 0, //未审核
    auditStatusPass: 1, //审核通过
    auditStatusProgress: 2, //审核中

    //收藏类型
    collectTypeCompany: "company", //企业
    collectTypeEvent: "event", //商品
    collectTypeNews: "news", //动态

    /**雷达页面停留时间采集 */
    stayTime: 5000,

    memberRecordDetail: "", //会员记录详情

    accessRoutes: "", //进入渠道
    routesDescribe: "", //渠道描述
    login: login, //登录文件
    isNewUser: false //是否是新用户
  }
})