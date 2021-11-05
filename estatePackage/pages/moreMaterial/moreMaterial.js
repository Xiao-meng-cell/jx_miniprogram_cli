// estatePackage/pages/moreMaterial/moreMaterial.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    databank: [], //资料库
    databankHidden: true, //资料库隐藏
    databankPageIndex: 1,
    databankPageIndex_add: 0, //二维数组下标
    fileInfo: {},
    showFileBox: false //显示文件
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.userId) {
      this.setData({
        userId: options.userId + ""
      });
      this.getDatabank()
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /** 获取资料库 */
  getDatabank: function () {
    http.get(
      app.globalData.host + "/biz/user/folder/get/files/by/fileStatus/new", {
        index: this.data.databankPageIndex,
        limit: 9,
        userId: this.data.userId,
        fileStatus: 1,
      },
      (_status, _resultCode, _message, data) => {
        if (data.list.length > 0) {
          this.handlerDatabankList(data.list)
        } else {
          wx.hideLoading()
        }
      },
      (_status, _resultCode, _message, _data) => {
        wx.hideLoading()
      }
    );
  },

  /** 处理资料库列表 */
  handlerDatabankList: function (list) {
    //console.log('资料库列表==========', list);
    for (let i in list) {
      let item = list[i]
      let fileType = item.suffix
      let fileTypeIcon = ""
      let isLocation = false
      if (item.lat && item.lat != "" && item.lng && item.lng != "") {
        isLocation = true;
      }
      if (fileType == "doc" || fileType == "docx") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/WORD%403x.png"
      } else if (fileType == "xls" || fileType == "xlsx") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/EXCEL%403x.png"
      } else if (fileType == "ppt" || fileType == "pptx") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/PPT@3x.png"
      } else if (fileType == "pdf") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/PDF%403x.png"
      } else if (fileType == "txt") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/USUAL@3x.png"
      } else if (item.type == "image") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/picture%403x.png"
      } else if (item.type == "audio") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/music%403x.png"
      } else if (item.type == "video") {
        fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/video%403x.png"
      } else if (item.type == "other" && fileType == "of") {
        if (item.url) {
          fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/3D%25403x.png"
        } else {
          fileTypeIcon = "http://izsyue.oss-cn-shenzhen.aliyuncs.com/assets/applets/enterpriseEdition/images/file_address.png"
        }
      }
      item["fileTypeIcon"] = fileTypeIcon;
      item["isLocation"] = isLocation;
      item["displayTime"] = util.tsFormatTime(item.createdTime, "Y.M.D");
      item["title"] = item.title.split('.')[0];
    }
    this.setData({
      ['databank[' + this.data.databankPageIndex_add + ']']: list
    })
    wx.hideLoading()
  },
  /** 加载更多资料库 */
  loadMoreDatabank: function () {
    this.setData({
      databankPageIndex: this.data.databankPageIndex + 1,
      databankPageIndex_add: this.data.databankPageIndex_add + 1
    })
    this.getDatabank()
  },

  //打开文件
  openFile(e) {
    let file = e.currentTarget.dataset.file
    console.log('file',file)
    this.setData({
      fileInfo: file,
      showFileBox: true
    })
  },
  //关闭文件
  closeFile() {
    this.setData({
      showFileBox: false
    })
  },

})