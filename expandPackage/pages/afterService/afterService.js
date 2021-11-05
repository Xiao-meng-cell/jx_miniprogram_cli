// expandPackage/pages/afterService/afterService.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
var orderLogic = require('../../../utils/orderLogic.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIOS: app.globalData.platform == "ios" ? true : false,
    data: null,
    code: '',
    storeImg: '',
    storeName: '',
    productName: '',
    productDescription: '',
    createdTime: '',
    productFileUrls: '',
    totalPriceYuan: '',
    actualPrice: "",
    cause: '请选择',
    asDesc: '', //售后退换理由

    //页面状态 
    //step1：选择售后服务类型
    //step2：填写售后信息
    //step3：填写物流相关信息
    //step4：联系平台介入售后
    pageStatus: 'step1',

    //售后服务类型 
    // goods_rejected：退款退货；
    // refund：仅退款；
    serverType: '',

    evidenceList: [], //凭证图片列表
    evidenceImages: [], //凭证图片最终上传列表
    evidenceDisplay: [], //凭证图片列表显示用
    freightList: [], //物流单据图片列表
    freightImages: [], //物流单据图片最终上传列表
    freightDisplay: [], //物流单据图片列表显示用
    freightCode: '', //物流单号
    typeCode: '', //商品类型  logistics：物流商品；service：到店服务

    enableUpload: true, //启用上传
    vidPlaying: false, //视频播放中
    videoUrl: "", //视频路径
    currentTypeCode:''//当前商品类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('加载售后信息')
    let bean = app.globalData.customerOrderDetail
    console.log(bean)
    wx.setNavigationBarTitle({
      title: '选择服务类型',
    })
    if (bean) {
      this.setData({
        data: bean,
        code: bean.items[0].code,
        storeImg: bean.onshelfStore.bgUrls[0],
        storeName: bean.onshelfStore.name,
        productName: bean.items[0].productName,
        productDescription: bean.items[0].skuName,
        productFileUrls: bean.items[0].productFileUrls,
        createdTime: bean.createdTime,
        totalPriceYuan: bean.items[0].totalPrice,
        actualPrice: bean.items[0].totalPrice - bean.items[0].damagePrice,
        typeCode: bean.typeCode,
        currentTypeCode:bean.product.typeCode
      })
      
      if (bean.afterSale && bean.afterSale.status != 6) {
        if (bean.afterSale.status == 2) { //售后单已受理
          wx.setNavigationBarTitle({
            title: '上传物流凭证',
          })
          this.setData({
            pageStatus: 'step3',
          })
        } else if (bean.afterSale.status == 3) { //售后单被拒绝
          wx.setNavigationBarTitle({
            title: '联系平台',
          })
          this.setData({
            pageStatus: 'step4',
          })
        }
      } else {
        let afterSaleType = orderLogic.getAfterSaleType(bean.items[0], bean)
        if (afterSaleType == "refund_order") {
          wx.setNavigationBarTitle({
            title: '申请退款',
          })
          this.setData({
            pageStatus: 'step2',
            serverType: 'refund_order',
          })
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /** 前往步骤2：信息填写 */
  goToStep2: function (e) {
    wx.setNavigationBarTitle({
      title: '申请退款',
    })
    this.setData({
      pageStatus: 'step2',
      serverType: e.currentTarget.dataset.type,
    })
  },


  /** 选择售后理由 */
  changeCause: function () {
    let itemList = ['尺寸规格与商品描述不符', '商品残破/超过保质期/缺少部件', '发货时间过长/未发货', '其它']
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#37424d',
      success: (result) => {
        this.setData({
          cause: itemList[result.tapIndex],
        })
      },
    })
  },

  //上传凭证
  uploadEvidencePic: function (e) {
    let that = this //获取上下文
    if (!that.data.enableUpload) {
      wx.showToast({
        title: '上传中...',
        icon: "none",
        mask: true,
      })
      return
    }
    let evidenceList = that.data.evidenceList
    //选择图片
    wx.chooseMedia({
      count: 6, // 默认6，这里显示一次选择相册的图片数量 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        console.log(res);
        let tempFiles = res.tempFiles
        //把选择的图片 添加到集合里
        for (let i in tempFiles) {
          tempFiles[i]['upload_percent'] = 0
          tempFiles[i]['path_server'] = ''
          if (that.data.isIOS) {
            tempFiles[i].fileType = "image"
            let isVid = util.getUrlType(tempFiles[i]['tempFilePath'])
            if (isVid) {
              tempFiles[i].fileType = "video"
            }
          }
          evidenceList.push(tempFiles[i])
        }
        //显示
        that.data.evidenceList = evidenceList;
        that.setData({
          evidenceList: evidenceList,
          enableUpload: false,
        });
        console.log(evidenceList);
        that.uploadMoreImgs(0, evidenceList, 6, false);
      }
    })
  },

  /** 点击删除凭证图片 */
  deleteEvidenceImg: function (e) {
    let evidenceList = this.data.evidenceList;
    let index = e.currentTarget.dataset.index;
    evidenceList.splice(index, 1);
    this.data.evidenceList = evidenceList;
    this.setData({
      evidenceList: evidenceList
    });
    console.log(evidenceList);
    this.uploadMoreImgs(0, evidenceList, 6, true);
  },

  //上传物流单据
  uploadFreightPic: function (e) {
    let that = this //获取上下文
    if (!that.data.enableUpload) {
      wx.showToast({
        title: '上传中...',
        icon: "none",
        mask: true,
      })
      return
    }
    let freightList = that.data.freightList
    //选择图片
    wx.chooseImage({
      count: 6, // 默认6，这里显示一次选择相册的图片数量 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 

        console.log(res);
        let tempFiles = res.tempFiles
        //把选择的图片 添加到集合里
        for (let i in tempFiles) {
          tempFiles[i]['upload_percent'] = 0
          tempFiles[i]['path_server'] = ''
          freightList.push(tempFiles[i])
        }
        //显示
        that.data.freightList = freightList;
        that.setData({
          freightList: freightList,
          enableUpload: false,
        });
        console.log(freightList);
        that.uploadMoreImgs(1, freightList, 3, false);
      }
    })
  },

  //点击删除物流单据图片
  deleteFreightImg(e) {
    let freightList = this.data.freightList;
    let index = e.currentTarget.dataset.index;
    freightList.splice(index, 1);
    this.data.freightList = freightList;
    this.setData({
      freightList: freightList
    });
    console.log(freightList);
    this.uploadMoreImgs(1, freightList, 3, true);
  },

  /**
   * 上传图片组
   * @params typeImage 图片组类型（0：售后凭证，1：物流单据）
   * @params selectImages 改组已选的微信本地图片组
   * @params mulCount 最多多少张
   * @params isDel 是否是删除
   */
  uploadMoreImgs: function (typeImage, selectImages, mulCount, isDel) {
    var that = this;
    if (isDel) {
      var data = [];
      let resDisplay = []
      for (let i in selectImages) {
        data[i] = selectImages[i]['path_server']; //path
        if (selectImages[i].fileType == "image") {
          resDisplay.push(selectImages[i]['path_server'])
        }
      }
      if (typeImage == 0) {
        that.setData({
          evidenceList: selectImages, //售后凭证组
          evidenceImages: data,
          evidenceDisplay: resDisplay,
        });
      } else if (typeImage == 1) {
        that.setData({
          freightList: selectImages, //物流单据组
          freightImages: data,
          freightDisplay: resDisplay,
        });
      }
      return;
    }
    if (selectImages.length == 0) {
      wx.showToast({
        title: '请选图片/视频',
        image: '/assets/images/bank_close.png',
        duration: 2000
      })
      return;
    }
    if (selectImages.length > mulCount) {
      wx.showToast({
        title: '只能选' + mulCount + '张',
        image: '/assets/images/bank_close.png',
        duration: 2000
      })
      return;
    }
    var hadImgs = []; //已经上传过的图片对象组
    var havaSelected = []; //新选择的图片
    var tempUImgs = [];
    for (var i = 0; i < selectImages.length; i++) { //遍历上传，上传涉黄直接清空所有列表，提醒用户重新上传图片
      if (selectImages[i].path_server.length > 0) {
        hadImgs.push(selectImages[i]);
      } else {
        tempUImgs.push(selectImages[i]);
        havaSelected.push(selectImages[i].tempFilePath);
      }
    }
    wx.showLoading({
      title: '正在上传...',
    })
    app.globalData.uploadFileOsss(
      havaSelected,
      "afterService/img",
      (status, resultCode, message, data) => {
        wx.hideLoading();
        var tempHaves = hadImgs; //已经存在的
        for (let i in tempUImgs) {
          tempUImgs[i]['upload_percent'] = 100
          tempUImgs[i]['path_server'] = data[i]
          hadImgs.push(tempUImgs[i]);
        }
        data = [];
        let resDisplay = []
        for (let j in hadImgs) {
          let item = hadImgs[j]
          data.push(item.path_server);
          if (item.fileType == "image") {
            resDisplay.push(item.path_server)
          }
        }
        if (typeImage == 0) {
          that.setData({
            evidenceList: hadImgs, //售后凭证组
            evidenceImages: data,
            evidenceDisplay: resDisplay,
          });
        } else if (typeImage == 1) {
          that.setData({
            freightList: hadImgs, //物流单据组
            freightImages: data,
            freightDisplay: resDisplay,
          });
        }
        that.setData({
          enableUpload: true,
        })
      },
      (status, resultCode, message, data) => {
        console.log("upload error");
        wx.hideLoading();
        wx.showToast({
          title: message ? message : '上传失败',
          image: '/assets/images/bank_close.png',
          duration: 2000
        })
      }
    );
  },

  // 预览图片
  previewImg: function (e) {
    console.log(e);
    //获取当前图片的下标
    let path = e.currentTarget.dataset.path;
    let type = e.currentTarget.dataset.type;
    //所有图片
    let imgs = [];
    if (type == 'evidence') {
      imgs = this.data.evidenceDisplay;
    } else if (type == 'freight') {
      imgs = this.data.freightDisplay;
    }
    wx.previewImage({
      //当前显示图片
      current: path,
      //所有图片
      urls: imgs
    })
  },


  asDescInputHandler: function (e) {
    var value = e.detail.value
    this.setData({
      asDesc: value
    })
  },

  /** 提交表单 */
  submit: function () {
    console.log('提交售后表单')
    if (this.data.cause == "请选择" || this.data.cause == "") {
      wx.showToast({
        title: '请选择售后理由！',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return
    }

    //组售后凭证图片
    let evidenceUrls = []
    for (let i in this.data.evidenceImages) {
      let path_server = this.data.evidenceImages[i]
      evidenceUrls.push(path_server)
    }

    http.post(
      app.globalData.business_host + 'customerorder/complain', {
        orderCode: this.data.code,
        typeCode: this.data.serverType,
        title: this.data.cause,
        description: this.data.asDesc,
        url: JSON.stringify(evidenceUrls),
      },
      (status, resultCode, message, data) => {
        console.log('售后提交成功！')
        console.log(data)
        wx.showToast({
          title: '售后提交成功',
          icon: 'none',
          duration: 1500,
          mask: true,
        })
        this.getOrderDetail(data)
      },
      (status, resultCode, message, data) => {
        console.log('售后提交失败！')
        wx.showToast({
          title: '售后提交失败！',
          icon: 'none',
          duration: 1500,
          mask: true,
        })
        console.log(data)
      }
    );
  },

  /** 扫码录入物流单号 */
  scan: function () {
    let that = this
    wx.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        that.setData({
          freightCode: res.result,
        })
      },
    })
  },

  freightCodeInputHandler: function (e) {
    var value = e.detail.value
    this.setData({
      freightCode: value
    })
  },

  /** 提交物流单 */
  submitLogisticsInfo: function () {
    console.log('提交物流单')
    if (this.data.freightCode == "") {
      wx.showToast({
        title: '请填写物流单号！',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return
    }

    //组物流单据图片
    let freightUrls = []
    for (let i in this.data.freightImages) {
      let path_server = this.data.freightImages[i]
      freightUrls.push(path_server)
    }

    //内容对象JSON化
    let contentObj = {}
    contentObj["content"] = this.data.freightCode

    http.post(
      app.globalData.business_host + 'aftersalereply/reply', {
        afterSaleCode: this.data.data.afterSale.code,
        typeCode: 'upload_return_info',
        content: JSON.stringify(contentObj),
        userCode: wx.getStorageSync('userCode'),
        url: JSON.stringify(freightUrls),
      },
      (status, resultCode, message, data) => {
        console.log('提交物流单成功！')
        console.log(data)
        this.getOrderDetail()
      },
      (status, resultCode, message, data) => {
        console.log('提交物流单失败！')
      }
    );
  },

  /** 提交客服申诉 */
  submitAppeal: function () {
    console.log('提交客服申诉')
    if (this.data.asDesc == "") {
      wx.showToast({
        title: '请填写投诉说明！',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return
    }

    //内容对象JSON化
    let contentObj = {}
    contentObj["content"] = this.data.asDesc

    http.post(
      app.globalData.business_host + 'aftersalereply/reply', {
        afterSaleCode: this.data.data.afterSale.code,
        typeCode: 'appeal',
        content: JSON.stringify(contentObj),
        userCode: wx.getStorageSync('userCode'),
      },
      (status, resultCode, message, data) => {
        console.log('提交客服申诉成功！')
        console.log(data)
        this.getOrderDetail()
      },
      (status, resultCode, message, data) => {
        console.log('提交客服申诉失败！')
      }
    );
  },

  //获取订单详情
  getOrderDetail: function (data = null) {
    wx.setStorageSync('afterServiceHidden', true)
    // if (data) {
    //   app.globalData.afterSaleDetail = data
    //   wx.navigateTo({
    //     url: '/pages/order/after_service/progress/progress',
    //   })
    // } else {
    //   console.log('获取订单详情')
    //   var that = this;
    //   wx.showLoading({
    //     title: '正在加载中...',
    //   })
    //   http.get(
    //     app.globalData.business_host + 'customerorder/info', {
    //       orderCode: that.data.code
    //     },
    //     (status, resultCode, message, data) => {
    //       console.log(data);
    //       app.globalData.afterSaleDetail = data
    //       wx.navigateTo({
    //         url: '/pages/order/after_service/progress/progress',
    //       })
    //       wx.hideLoading();
    //     },
    //     (status, resultCode, message, data) => {
    //       console.log("获取失败");
    //       wx.hideLoading();
    //       wx.showToast({
    //         title: '获取数据失败！',
    //         duration: 2000
    //       })
    //     });
    // }
    wx.redirectTo({
      url: '/pages/order/detail/order_details?orderId=' + this.data.code,
    })
  },

  /** 播放视频 */
  videoPlay: function (e) {
    let item = e.currentTarget.dataset.item
    this.setData({
      videoUrl: item.path_server,
    })
    this.videoContext = wx.createVideoContext('videoPlayer')
    this.controlVidPlayer()
  },

  /** 控制视频播放隐藏显示 */
  controlVidPlayer: function () {
    this.setData({
      vidPlaying: !this.data.vidPlaying,
    })
    if (!this.data.vidPlaying) {
      this.videoContext.stop()
    } else {
      this.videoContext.seek(0)
      this.videoContext.play()
    }
  },

  mouseStopOperate: function () {

  },
})