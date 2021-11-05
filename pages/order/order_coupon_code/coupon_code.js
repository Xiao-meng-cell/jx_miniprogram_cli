// miniprogram/pages/order/order_coupon_code/coupon_code.js
const QRCode = require('../../../utils/weapp-qrcode.js');
const QR = require('../../../utils/qrcode.js');
import rpx2px from '../../../utils/rpx2px.js';
let qrcode;

// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(400);
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderBean: null,
    text: '12345',
    image: '',
    // 用于设置wxml里canvas的width和height样式
    qrcodeWidth: qrcodeWidth,
    imgsrc: '',

    canvasHidden: false, //默认不让canvas二维码隐藏，否则不能生成二维码
    imagePath: "" //弹出框二维码显示图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var orderBean = options.orderBeanStr
    this.setData({
      orderBean: orderBean
    });

    const z = this

    qrcode = new QRCode('canvas', {
      usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
      text: orderBean,
      image: 'https://izsyue.oss-cn-shenzhen.aliyuncs.com/assets/applets/enterpriseEdition/images/tab_user_default.png',
      width: qrcodeWidth,
      height: qrcodeWidth,
      colorDark: "#000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    z.data.text = orderBean;
    // 生成图片，绘制完成后调用回调
    qrcode.makeCode(z.data.text, () => {
      // 回调
      qrcode.exportImage(function (path) {
        z.setData({
          imgsrc: path
        })
      })
    })

    var that = this;
    var initUrl = orderBean;
    //创建二维码
    that.createQrCode(initUrl, "mycanvas", 300, 300);
  },

  /**
   * 绘制二维码图片
   */
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => {
      this.canvasToTempImage();
    }, 500);
  },
  /**
   * 获取临时缓存照片路径，存入data中
   */
  canvasToTempImage: function () {
    var that = this;
    //把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function (res) {

      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  confirmHandler: function (e) {
    let {
      value
    } = e.detail
    this.renderCode(value)
  },
  renderCode(value) {
    const z = this

    qrcode.makeCode(value, () => {

      qrcode.exportImage(function (path) {

        z.setData({
          imgsrc: path
        })
      })
    })
  },
  inputHandler: function (e) {
    var value = e.detail.value
    this.setData({
      text: value
    })
  },
  tapHandler: function () {
    this.renderCode(this.data.text)
  },
  // 长按保存
  save: function () {
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        if (res.tapIndex == 0) {
          qrcode.exportImage(function (path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

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
  // onShareAppMessage: function() {

  // }
})