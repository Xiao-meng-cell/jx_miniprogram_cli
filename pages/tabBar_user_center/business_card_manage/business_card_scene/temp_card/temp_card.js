var http = require('../../../../../utils/http.js');
const util = require("../../../../../utils/util.js");
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_name: "游客",
    card_merchantName: "",
    card_position: "",
    card_phone: "",
    card_headimg: "",
    card_wx: "",
    card_qq: "",
    card_email: "",
    card_merchantAddr: "",
    read: false,
    tipsDisplay: true, //提示是否显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.read) {
      this.setData({
        read: true
      });
    }
    if (options.workerId) {
      this.setData({
        workerId: options.workerId
      });
      this.getWorkerInfo(options.workerId);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getUserInfo({
      success: res => {
        this.setData({
          card_headimg: res.userInfo.avatarUrl
        });
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

  // },

  /**
   * 输入名片姓名
   */
  inputCardName: function (e) {
    this.setData({
      card_name: e.detail.value
    });
  },

  /** 输入公司名称 */
  inputCardMerchantName: function (e) {
    var t_text = e.detail.value.length;
    if (t_text <= 30) {
      this.setData({
        card_merchantName: e.detail.value
      });
    } else if (t_text > 30) {
      wx.showToast({
        title: '最多只能输入30字',
        icon: "none"
      })
      return this.data.memo
    }
  },

  /**
   * 输入名片职位
   */
  inputCardPosition: function (e) {
    var t_text = e.detail.value.length;
    if (t_text <= 30) {
      this.setData({
        card_position: e.detail.value
      });
    } else if (t_text > 30) {
      wx.showToast({
        title: '最多只能输入30字',
        icon: "none"
      })
      return this.data.memo
    }
  },

  /**
   * 输入手机
   */
  inputCardPhone: function (e) {
    this.setData({
      card_phone: e.detail.value
    });
  },

  /**
   * 输入邮箱
   */
  inputCardEmail: function (e) {
    this.setData({
      card_email: e.detail.value
    });
  },

  /**
   * 输入QQ号
   */
  inputCardQQ: function (e) {
    this.setData({
      card_qq: e.detail.value
    });
  },

  /**
   * 输入微信号
   */
  inputCardWX: function (e) {
    this.setData({
      card_wx: e.detail.value
    });
  },

  /**
   * 输入详细地址
   */
  inputCardMerchantAddr: function (e) {
    this.setData({
      card_merchantAddr: e.detail.value
    });
  },

  /**
   * 地图导航
   */
  mapNavigation: function () {
    let that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        wx.chooseLocation({
          success: function (res) {
            that.setData({
              card_merchantAddr: res.address + res.name
            })
          },
        })
      }
    })
  },

  /**
   * 图片点击事件查看大图
   */
  imgYu: function (event) {

    var src = event.currentTarget.dataset.src; //获取data-src

    if (!src) {
      return
    }
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src], // 需要预览的图片http链接列表
      success: res => {},
      fail: res => {}
    })
  },

  /**
   * 上传用户头像
   */
  uploadImgVideo: function () {
    var count = 1;
    wx.chooseImage({
      count: count,
      success: res => {
        var index_gif = res.tempFilePaths[0].lastIndexOf(".gif");
        if (index_gif != -1) {
          wx.showModal({
            title: '不支持gif格式',
            content: '请重新上传',
          })
          return false;
        }
        var tempFilesSize = res.tempFiles[0].size;
        if (tempFilesSize > 2000000) {
          wx.showModal({
            title: '上传图片不能大于2M!',
            content: '请重新上传'
          })
          return false;
        }
        wx.showLoading({
          title: '正在上传',
        })
        app.globalData.uploadFileOsss(
          res.tempFilePaths,
          "user/supply",
          (status, resultCode, message, data) => {
            this.checkUpYellow(data);
            wx.hideLoading();
          },
          (status, resultCode, message, data) => {
            wx.hideLoading();
          }
        );

      },
    })

  },

  /**
   * 鉴黄接口
   */
  checkUpYellow: function (data) {
    var showImg = data;
    http.get(
      app.globalData.host + 'aliyun/scanImageFlag', {
        imageUrl: data[0],
        lv: 2,
      },
      (status, resultCode, message, data) => {
        if (data) {
          this.setData({
            card_headimg: showImg[0]
          });
        } else {
          wx.showModal({
            title: '图片涉嫌违规，已禁止上传',
            content: '请重新上传图片',
          })
        }

      },
      (status, resultCode, message, data) => {}
    );
  },

  /**
   * 删除上传的图片或者视频
   */
  deleteFile: function (e) {
    this.setData({
      card_headimg: ""
    });
  },

  /**
   * 提交申请
   */
  submitApply: function () {
    wx.showLoading({
      title: '正在提交',
    })
    var check_data = this.checkUpData();
    if (check_data) {
      http.post(
        app.globalData.host + "/biz/usermerchantclerk/addTemporary", {
          userId: wx.getStorageSync('user').id,
          name: "游客",
          company: this.data.card_merchantName,
          companyShort: this.data.card_merchantName,
          headimg: this.data.card_headimg,
          phone: this.data.card_phone,
          email: this.data.card_email,
          addr: this.data.card_merchantAddr,
          sex: undefined,
          wx: this.data.card_wx,
          qq: this.data.card_qq,
          position: this.data.card_position,
        },
        (status, resultCode, message, data) => {
          wx.hideLoading();
          wx.showToast({
            title: '创建成功',
            icon: "none"
          })
          //刷新名片列表并使用新建的临时名片
          wx.setStorageSync('reloadPage', data)
          wx.navigateBack({
            delta: 1
          })
        },
        (status, resultCode, message, data) => {
          wx.hideLoading()
          wx.showModal({
            title: message,
            content: '',
          })
        }
      );
    }
  },

  /**
   * 检查数据对不对
   */
  checkUpData: function () {
    if (!this.data.card_headimg) {
      wx.showToast({
        title: '请上传头像',
        icon: "none"
      })
      return false
    } else if (!this.data.card_name) {
      wx.showToast({
        title: '姓名未填写',
        icon: "none"
      })
      return false
      // } else if (!this.data.card_merchantName) {
      //   wx.showToast({
      //     title: '公司/单位未填写',
      //     icon: "none"
      //   })
      //   return false
      // } else if (!this.data.card_position) {
      //   wx.showToast({
      //     title: '职位未填写',
      //     icon: "none"
      //   })
      //   return false
      // } else if (!this.data.card_phone) {
      //   wx.showToast({
      //     title: '请输入手机号码',
      //     icon: "none"
      //   })
      //   return false
    } else {
      return true
    }
  },

  /**
   * 获取职员信息 clerk/info
   */
  getWorkerInfo: function (workerId) {
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/info", {
        id: workerId
      },
      (status, resultCode, message, data) => {
        if (data == null || data == -1) {
          return
        }
        this.setData({
          card_name: data.name,
          card_position: data.position,
          card_phone: data.phone,
          workerId: data.id,
          card_company: data.company,
          companyShort: data.companyShort,
          card_shortName: data.merchantShortName,
          card_headimg: data.headimg,
          card_email: data.email,
          card_wx: data.wx,
          card_qq: data.qq,
          merchantCode: data.merchantCode,
        });

      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },


  /**
   * 删除名片
   */
  deleteCard: function () {
    http.post(
      app.globalData.host + "/biz/user/merchant/clerk/del", {
        id: this.data.workerId,
        merchantCode: this.data.merchantCode
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '删除成功',
          icon: "none",
          success: res => {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 500)

          }
        })
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /** 关闭提示 */
  closeTip: function (e) {
    this.setData({
      tipsDisplay: false,
    })
  },

  /** 申请名片 */
  applyCard: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply',
    })
  },
})