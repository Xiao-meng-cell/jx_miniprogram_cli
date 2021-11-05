// livePackage/pages/complaint/complaint.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    merchantCode: "", //商家code
    complaintImgList: [], //投诉图片列表
    complaintText: "", //投诉内容
    complaintType: "", //投诉类型
    waitUploadCount: 0, //等待上传图片数量
    imgUploading: false, //图片上传中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.merchantCode) {
      this.setData({
        merchantCode: options.merchantCode,
      })
    }
    if (options.complaintType) {
      this.setData({
        complaintType: options.complaintType,
      })
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
  // onShareAppMessage: function () {

  // },


  complaintTextValue: function (e) {
    this.setData({
      complaintText: e.detail.value,
    })
  },

  /** 提交投诉 */
  complaintSubmit: function () {
    let that = this
    if (this.data.complaintText == "") {
      wx.showToast({
        title: '请填写投诉原因',
        icon: "none",
        mask: true,
      })
      return
    }
    wx.showLoading({
      title: '提交中...',
    })
    http.post(
      app.globalData.host + "/biz/service/complaint/handling/add", {
        complaintType: this.data.complaintType,
        dataId: this.data.merchantCode,
        complaintContent: this.data.complaintText,
        complaintAttachment: JSON.stringify(this.data.complaintImgList),
      },
      (_status, _resultCode, _message, data) => {
        wx.showToast({
          title: '投诉成功',
          mask: true,
          success: (res) => {
            that.data.setInter = setInterval(
              function () {
                clearInterval(that.data.setInter)
                wx.navigateBack()
              }, 1000);
          },
        })
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  removePic: function (e) {
    let index = e.currentTarget.dataset.index
    this.data.complaintImgList.splice(index, 1)
    this.setData({
      complaintImgList: this.data.complaintImgList,
    })
  },


  /**
   * 上传图片
   */
  uploadImg: function () {
    let that = this;
    app.isUserLogin(function (isLogin) {
      if (isLogin) {
        if (that.data.complaintImgList.length >= 12) {
          return
        }
        if (that.data.imgUploading) {
          wx.showToast({
            title: '图片上传中...',
            icon: 'none',
            mask: true,
          })
          return
        }
        var count = 12 - (that.data.complaintImgList.length != 0 ? that.data.complaintImgList.length : that.data.waitUploadCount)
        wx.chooseImage({
          count: count,
          success: res => {
            that.setData({
              imgUploading: true,
            })
            let fileUrls = []
            let hasError = false
            for (let i in res.tempFilePaths) {
              let fileError = false
              var index_gif = res.tempFilePaths[i].lastIndexOf(".gif");
              if (index_gif != -1) {
                fileError = true
                hasError = true
              }
              var tempFilesSize = res.tempFiles[i].size;
              if (tempFilesSize > 2000000) {
                fileError = true
                hasError = true
              }
              if (!fileError) {
                fileUrls.push(res.tempFilePaths[i])
              }
              that.setData({
                waitUploadCount: fileUrls.length,
              })
            }
            if (hasError) {
              wx.showToast({
                icon: "none",
                title: '上传图片不能大于2M且不支持GIF格式',
              })
            }
            app.globalData.uploadFileOsss(
              fileUrls,
              "merchant/dynamic",
              (status, resultCode, message, data) => {
                that.setData({
                  complaintImgList: that.data.complaintImgList.concat(data),
                  imgUploading: false,
                })
              },
              (status, resultCode, message, data) => {
                wx.hideLoading();
              }
            );
          },
        })
      }
    })
  },

  //图片点击事件查看大图
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list

    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList, // 需要预览的图片http链接列表
    })
  },
})