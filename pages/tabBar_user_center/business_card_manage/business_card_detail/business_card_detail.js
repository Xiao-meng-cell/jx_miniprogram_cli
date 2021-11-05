// miniprogram/pages/tabBar_user_center/business_card_detail/business_card_detail.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
var RSAKey = require('../../../../utils/rsa-client.js');
var base64 = require('../../../../utils/base64.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business_info: "", //企业信息
    clerkTemplateType: "default", //名片模板类型
    card_name: "未填写",
    card_position: "未填写",
    card_phone: "未填写",
    card_shortName: "",
    card_headimg: "",
    card_message: "",
    card_role: 0,
    card_userId: "",
    show_update_card: false, //是否展示修改表单
    show_visitor_record: false, //是否显示访客记录
    card_template_list: [], //名片留言模板列表
    hidden_add_card_template: true,
    hidden_template_item: true,
    hidden_send_message: true,
    hideen_all_info: true, //隐藏名片全部信息
    update_item_index: -1,
    read: false, //只读
    cover: "phone",
    hot: "",
    shares: "",
    seen_list: "",
    toIndex: false, //是否返回首页
    merchant_err: false,
    role: 0, //角色（0共享合伙人，1事业合伙人，2企业管理员，3老板）
    levelBtnText: "",
    clerk_code: "",
    current_userId: wx.getStorageSync("user") ? wx.getStorageSync("user").id : "",
    parentUserId: "",
    namePositionWidth: 0, //姓名职位行宽度
    nameWidth: 0, //姓名宽度
    positionWidth: 0, //职位宽度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.getOptions(options, function (data) {
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧小程序码
      that.initOptions(data)
    }, function (data, qrcode_scene) {
      //旧二维码
      that.initOptions(data)
    })
  },
  //初始化参数
  initOptions(options) {
    if (options.read) {
      this.setData({
        read: true
      });
    }
    if (options.merchantCode) { //企业code，必传
      this.setData({
        merchant_code: options.merchantCode
      });
      //this.getClerkList();
    }
    if (options.workerId) {
      this.setData({
        workerId: options.workerId
      });

      this.getRecordsByClerkId();
      // this.addHot();
    }
    if (options.toIndex) {
      this.setData({
        toIndex: true
      });
    }

    if (options.role) {
      this.setData({
        role: options.role,
      });
    }

    this.getBusinessInfo();
    this.getBusinessTagCode();
    this.getCardTemplateList();
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.hideShareMenu()
    let that = this
    wx.createSelectorQuery().selectAll('#viewNamePosition').boundingClientRect(function (rect) {
      that.setData({
        namePositionWidth: rect[0].width,
      })
    }).exec()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //判断是否从名片模板展示页返回
    //是，则直接略过当前页
    // if (wx.getStorageSync('cardTemplateReturn')) {
    //   wx.removeStorageSync('cardTemplateReturn')
    //   wx.navigateTo({
    //     url: '/pages/tabBar_user_center/business_card_manage/business_card_index/business_card_index',
    //   })
    // } else {
    if (this.data.workerId) {
      this.getWorkerInfo(this.data.workerId);
    }
    this.setData({
      current_userId: wx.getStorageSync("user").id,
    });
    this.getBusinessActivity();
    // }
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
    if (this.data.toIndex) {
      wx.navigateTo({
        url: '/pages/tabBar_user_center/user_center',
      })
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
  onShareAppMessage: function (e) {
    console.log("分享名片")
    console.log(this.data.show_visitor_record)
    this.addShares();
    this.setData({
      hidden_send_message: true
    });
    if (e.from === 'button') {
      // 来自页面内转发按钮
      console.log(e.target);
      console.log("按钮转发")
      return {
        title: this.data.business_info.name,
        path: "pages/clerk/clerk_good_list/clerk_good_list?shareId=" + this.data.shareId + "&higherLevelCode=" + this.data.clerk_code + "&workerId=" + this.data.workerId + "&merchantCode=" + this.data.merchant_code + '&batchShare=' + app.globalData.batchShare,
        imageUrl: this.data.business_info.bgUrls[0],
        success: res => {},
        fail: res => {}
      }
    } else {
      return {
        title: this.data.card_message ? this.data.card_message : ((this.data.business_info.shortName ? this.data.business_info.shortName : this.data.business_info.name) + "  " + this.data.card_name),
        path: "pages/clerk/show/show?higherLevelCode=" + wx.getStorageSync('user').userCode + "&merchantCode=" + this.data.merchant_code + "&workerId=" + this.data.workerId + "&shareId=" + this.data.shareId + "&cover=" + this.data.cover + "&showVisitorRecord=" + this.data.show_visitor_record,
        imageUrl: "",
        success: res => {
          // this.closeMenuSheet();
        },
        fail: res => {}
      }
    }

  },

  /**
   * 获取企业详情信息
   */
  getBusinessInfo: function () {
    http.get(
      app.globalData.host + "/biz/user/merchant/info", {
        userId: wx.getStorageSync('user').id,
        merchantCode: this.data.merchant_code
      },
      (status, resultCode, message, data) => {
        data.dis = app.getDisance(data.lat, data.lng)
        this.setData({
          business_info: data
        });
        if (this.data.business_info.status == 0 || this.data.business_info.status == 3) {
          this.setData({
            merchant_err: true
          });
          wx.hideLoading();
        }

      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: message,
          icon: "none"
        })
        if(status == 500){
          this.setData({
              merchant_err: true
          });
        }
        wx.hideLoading()
      }
    );
  },

  /**防止滑动冒泡 */
  doNotMove: function () {
    return false;
  },


  /**
   * 获取企业服务类别
   */
  getBusinessTagCode: function () {
    http.get(
      app.globalData.host + 'biz/user/merchant/tag/list', {
        merchantCode: this.data.merchant_code
      },
      (status, resultCode, message, data) => {
        this.setData({
          tagCode: data[0].tagCode,
        });
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
      });
  },

  /**
   * 输入名片姓名
   */
  inputCardName: function (e) {
    this.setData({
      card_name: e.detail.value
    });
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
   * 展示或关闭名片修改框
   */
  updateCardShow: function () {
    this.setData({
      show_update_card: !this.data.show_update_card
    });
  },

  /**
   * 联系企业
   */
  contactBusiness: function (e) {
    // var business_phone = this.data.business_info.phone; 
    var business_phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: business_phone
    })
  },



  /**
   * 获取企业的所有职员 /biz/user/merchant/clerk/list
   */
  getClerkList: function () {
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/list", {
        merchantCode: this.data.merchant_code
      },
      (status, resultCode, message, data) => {
        if (data.length > 0) {
          this.setData({
            card_name: data[0].name,
            card_position: data[0].company,
            card_phone: data[0].phone,
            workerId: data[0].id,
            card_email: data[0].email,
            card_wx: data[0].wx,
            card_qq: data[0].qq,
          });
        }

      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
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
        console.log(data)
        if (data == null || data == -1) {
          return
        }
        this.setData({
          clerkTemplateType: data.styleType,
          card_name: data.name,
          card_position: data.position,
          card_phone: data.phone,
          workerId: data.id,
          card_shortName: data.merchantShortName,
          card_headimg: data.headimg,
          card_email: data.email,
          card_wx: data.wx,
          card_qq: data.qq,
          card_role: data.role,
          card_userId: data.userId,
          shares: data.shares,
          hot: data.hot,
          parentUserId: data.parentUserId
        });
        if (this.data.clerkTemplateType == "" || this.data.clerkTemplateType == null || this.data.clerkTemplateType == "default") {
          this.getUserInfoByUserId();
          this.computeNamePositionWidth()
        } else {
          wx.navigateTo({
            url: '/pages/clerk/show/show?workerId=' + data.id + '&merchantCode=' + data.merchantCode + '&higherLevelCode='+ app.globalData.higherLevelCode,
          })
        }
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /***
   * 获取用户信息
   */
  getUserInfoByUserId: function () {
    http.get(
      app.globalData.host + 'personal/info', {
        userId: this.data.userId,
      },
      (status, resultCode, message, data) => {
        this.setData({
          clerk_code: data.code
        });
      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '获取共享合伙人失败',
          icon: "none"
        })
      }
    );
  },

  /**
   * 保存修改的名片信息
   */
  saveCardMessage: function () {
    wx.showLoading({
      title: '正在保存',
    })
    http.post(
      app.globalData.host + "/biz/user/merchant/clerk/mine/info", {
        merchantCode: this.data.merchant_code,
        name: this.data.card_name,
        position: this.data.card_position,
        phone: this.data.card_phone,
        headimg: this.data.card_headimg,
        email: this.data.card_email,
        wx: this.data.card_wx,
        qq: this.data.card_qq,
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功',
          icon: "none"
        })
        this.updateCardShow();

      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
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
   * 展示或隐藏新建模板框
   */
  showAddCardTemplate: function () {
    this.setData({
      hidden_add_card_template: !this.data.hidden_add_card_template
    });
  },

  /**
   * 名片留言输入
   */
  inputCardMessage: function (e) {
    this.setData({
      card_message: e.detail.value,
      new_card_message: e.detail.value
    });
  },

  /**
   * 新增名片，保存名片
   */
  addCardTemplate: function () {
    if (!this.data.card_message) {
      wx.showToast({
        title: '模板不能为空',
        icon: "none"
      })
      return
    }
    http.post(
      app.globalData.host + "/biz/user/clerk/template/add", {
        clerkId: this.data.workerId,
        content: this.data.card_message,
        title: "",
        url: ""
      },
      (status, resultCode, message, data) => {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功',
          icon: "none"
        })
        this.getCardTemplateList();
        this.setData({
          hidden_add_card_template: true
        });

      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },


  /**
   * 加载模板列表
   */
  getCardTemplateList: function () {
    http.get(
      app.globalData.host + "/biz/user/clerk/template/list", {
        clerkId: this.data.workerId
      },
      (status, resultCode, message, data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].disabled = true;
        }
        wx.hideLoading();
        this.setData({
          card_template_list: data
        });

      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 编辑模板
   */
  openUpdateItem: function (e) {
    if ((this.data.update_item_index != e.currentTarget.dataset.index) && (this.data.update_item_index != -1)) {
      this.setData({
        ['card_template_list[' + this.data.update_item_index + '].disabled']: true
      });
    }

    this.setData({
      update_item_index: e.currentTarget.dataset.index,
      ['card_template_list[' + e.currentTarget.dataset.index + '].disabled']: false
    });
  },

  /**
   * 取消编辑模板
   */
  cancelUpdateItem: function (e) {
    this.setData({
      update_item_index: -1,
      ['card_template_list[' + e.currentTarget.dataset.index + '].disabled']: true
    });
  },


  /**
   * 编辑名片，保存名片
   */
  updateCardTemplate: function () {
    http.post(
      app.globalData.host + "/biz/user/clerk/template/edit", {
        id: this.data.card_template_list[this.data.update_item_index].id,
        clerkId: this.data.workerId,
        content: this.data.card_message,
        title: "",
        url: ""
      },
      (status, resultCode, message, data) => {
        this.setData({
          update_item_index: -1
        });
        wx.hideLoading();
        wx.showToast({
          title: '保存成功',
          icon: "none"
        })
        this.getCardTemplateList();

      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 删除名片留言模板
   */
  deleteCardTemplate: function (e) {
    wx.showModal({
      title: '删除模板',
      content: '删除后将无法找回该条数据',
      success: res => {
        if (res.confirm) {
          http.post(
            app.globalData.host + "/biz/user/clerk/template/del", {
              id: this.data.card_template_list[e.currentTarget.dataset.index].id,
            },
            (status, resultCode, message, data) => {
              wx.hideLoading();
              wx.showToast({
                title: '删除成功',
                icon: "none"
              })
              this.getCardTemplateList();
            },
            (status, resultCode, message, data) => {
              wx.hideLoading()
            }
          );
        } else if (res.cancel) {}
      }
    })
  },


  /**
   * 选择该模板
   */
  chooseOneTemplate: function (e) {

    this.setData({
      hidden_template_item: true,
      card_message: this.data.card_template_list[e.currentTarget.dataset.index].content
    });
  },

  /**
   * 展示模板列表
   */
  showTemplateList: function (e) {
    this.setData({
      update_item_index: -1,
      hidden_template_item: !this.data.hidden_template_item,
    });
  },


  /**
   * 新增留言信息
   */
  addMessage: function () {
    wx.showLoading({
      title: '保存中',
      mask: "true"
    })
    if (!this.data.card_message) {
      wx.hideLoading();
      return
    }
    http.post(
      app.globalData.host + "/biz/usershare/mine/add", {
        userId: wx.getStorageSync('user').id,
        content: this.data.card_message,
        title: "",
        url: "",
        merchantCode: this.data.merchant_code
      },
      (status, resultCode, message, data) => {
        let that = this;
        this.setData({
          card_message: this.data.new_card_message,
          shareId: data,
          showTextareaEdit: false,
        });
        wx.hideLoading();

      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 分享按钮，展示名片发送弹窗
   */
  showAddMessage: function () {
    this.setData({
      hidden_send_message: !this.data.hidden_send_message
    });
    this.addMessage();
  },

  /**
   * 取消发送
   */
  sendMessageCancel: function () {
    this.setData({
      hidden_send_message: !this.data.hidden_send_message
    });
  },

  /**
   * 删除员工名片
   */
  deleteCard: function (e) {
    wx.showLoading({
      title: '删除中',
    })
    http.post(
      app.globalData.host + "/biz/user/merchant/clerk/del", {
        id: this.data.workerId,
        merchantCode: this.data.merchant_code
      },
      (status, resultCode, message, data) => {
        if (data) {
          wx.showToast({
            title: '删除成功',
            icon: "none"
          })
          wx.navigateBack({
            delta: 1
          })
        }
        wx.hideLoading();


      },
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '删除失败',
          icon: "none"
        })
        wx.hideLoading()
      }
    );
  },


  /**
   * 设置手机号关联主页
   */
  setPhoneCover: function () {
    if (this.data.cover == "phone") {
      this.setData({
        cover: "false"
      });
    } else {
      this.setData({
        cover: "phone"
      });
    }

  },



  /**
   * 获取最新的浏览记录
   */
  getRecordsByClerkId: function () {
    http.get(
      app.globalData.host + "biz/clerkbrowsingrel/getRecordsByClerkId", {
        clerkId: this.data.workerId,
      },
      (status, resultCode, message, data) => {
        this.setData({
          seen_list: data
        });
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },


  /**
   * 添加分享次数
   */
  addShares: function () {
    http.post(
      app.globalData.host + "biz/usermerchantclerk/updateSharesById", {
        clerkId: this.data.workerId,
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /** 是否显示访客记录 */
  showVisitorRecord: function (e) {
    this.setData({
      show_visitor_record: e.detail.value,
    })
  },

  /**
   * 去首页
   */
  toIndex: function () {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_homepage/business_homepage' + '&higherLevelCode='+ app.globalData.higherLevelCode,
    })
  },

  /** 晋升降级 */
  levelUpDown: function (e) {
    if (e.currentTarget.dataset.role == 0) {
      let that = this
      wx.showModal({
        title: '温馨提示',
        content: '撤销事业合伙人，该经理团队将被删除',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确认',
        success: function (res) {
          if (res.confirm) {
            http.post(
              app.globalData.host + "biz/user/merchant/clerk/updateClerkRole", {
                merchantCode: that.data.business_info.code,
                hisUserId: that.data.card_userId,
                clerkId: that.data.workerId,
                role: e.currentTarget.dataset.role,
              },
              (status, resultCode, message, data) => {
                wx.showToast({
                  title: "已撤销事业合伙人",
                  duration: 2000,
                  icon: "none",
                  mask: true,
                })
                that.getWorkerInfo(that.data.workerId)
              },
              (status, resultCode, message, data) => {}
            );
          }
        },
      })
    } else {
      http.post(
        app.globalData.host + "biz/user/merchant/clerk/updateClerkRole", {
          merchantCode: this.data.business_info.code,
          hisUserId: this.data.card_userId,
          clerkId: this.data.workerId,
          role: e.currentTarget.dataset.role,
        },
        (status, resultCode, message, data) => {
          wx.showToast({
            title: "已晋升为事业合伙人",
            duration: 2000,
            icon: "none",
            mask: true,
          })
          this.getWorkerInfo(this.data.workerId)
        },
        (status, resultCode, message, data) => {
          if (resultCode == 'updateClerkRole.parent_error.error') {
            wx.showToast({
              title: "该名片无法晋升",
              duration: 2000,
              icon: "none",
              mask: true,
            })
          }
        }
      );
    }
  },


  /**
   * 显示textarea
   */
  showTextareaEdit: function (e) {
    this.setData({
      showTextareaEdit: true
    });
  },

  /**
   * 隐藏textarea
   */
  hideTextareaEdit: function (e) {
    if (e.detail.value) {
      this.setData({
        new_card_message: e.detail.value,
        card_message: e.detail.value,
      });
      console.log(this.data.new_card_message);
    }

    this.setData({
      showTextareaEdit: false
    });
  },


  /**
   * 获取企业活动
   */
  getBusinessActivity: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    http.get(
      app.globalData.business_host + "internalrewardevent/page", {
        pageIndex: this.data.pageIndex,
        pageLimit: 20,
        // storeCode: this.data.merchant_code,
        storeCode: this.data.merchant_code
      },
      (status, resultCode, message, data) => {

        if (data.list.length < 1) {
          wx.hideLoading();
        }
        this.setData({
          goodsList: data.list
        });
        console.log(this.data.goodsList);
        this.handlerList();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 操作数据
   */
  handlerList: function () {
    for (let i = 0; i < this.data.goodsList.length; i++) {
      let list = this.data.goodsList[i];

      let obj = {};
      if (list.fileJson) {
        obj.pic = JSON.parse(list.fileJson).illustration[0];
        if (obj.pic) {
          obj.type = util.getUrlType(JSON.parse(list.fileJson).illustration[0])
        }
      }
      this.data.goodsList[i].illustration = obj.pic;
      this.data.goodsList[i].videoType = obj.type;
      this.data.goodsList[i].product.price = util.priceSwitch(this.data.goodsList[i].product.price);
      this.data.goodsList[i].discountPrice = util.priceSwitch(this.data.goodsList[i].discountPrice);
      this.data.goodsList[i].inRewardEventProduct[0].bonus = util.priceSwitch(this.data.goodsList[i].inRewardEventProduct[0].bonus);
      this.data.goodsList[i].inRewardEventProduct[0].managerBonus = util.priceSwitch(this.data.goodsList[i].inRewardEventProduct[0].managerBonus);
      this.data.goodsList[i].dis = app.getDisance(this.data.goodsList[i].merchant.lat, this.data.goodsList[i].merchant.lng);
    }
    this.setData({
      goodsList: this.data.goodsList
    });
    wx.hideLoading();
  },


  /**
   * 跳转到详情
   */
  goToDetail: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_index/business_detail/business_detail?code=' + e.currentTarget.dataset.code + '&higherLevelCode=' + app.globalData.higherLevelCode + "&activityType=" + e.currentTarget.dataset.activitytype + "&clerk_code=" + this.data.clerk_code + "&showReward=true",
    })
  },

  /**
   * 展开或收起名片全部信息
   */
  changeCardInfoDisplay: function () {
    this.setData({
      hideen_all_info: !this.data.hideen_all_info
    });
  },

  /**
   * 复制信息
   */
  setCopyText: function (e) {
    if (e.currentTarget.dataset.text) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.text,
        success(res) {
          wx.showToast({
            title: '复制成功',
            icon: "none"
          })
          wx.getClipboardData({
            success(res) {}
          })
        }
      })
    }
  },

  /**
   * 保存联系人
   */
  save_phone: function () {
    wx.addPhoneContact({
      firstName: this.data.card_name,
      mobilePhoneNumber: this.data.card_phone,
      organization: this.data.business_info.name,
      title: this.data.card_position,
      success: () => {
        wx.showToast({
          title: '联系人添加成功',
          icon: "none"
        });
      },
      fail: err => {
        wx.showToast({
          title: '联系人添加失败，请稍候重试',
          icon: "none"
        });
      }
    })
  },

  /**
   * 地图导航
   */
  mapNavigation: function () {
    var lat = this.data.business_info.lat;
    var lng = this.data.business_info.lng;
    if (lat && lng) {
      wx.openLocation({
        latitude: lat,
        longitude: lng,
        name: this.data.business_info.addr,
        address: this.data.business_info.addr
      })
    } else {
      wx.showToast({
        title: '企业未设置定位',
        icon: "none"
      })
    }
  },

  /** 分享名片 */
  shareCardCode: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/scene_code/scene_code?id=' + e.currentTarget.dataset.id + "&type=clerk",
    })
  },

  /**
   * 跳转名片商城
   */
  jumpClerkGoodList: function () {
    if (this.data.workerId && this.data.merchant_code) {
      if (this.data.goodsList.length > 0) {
        wx.navigateTo({
          url: "/pages/clerk/clerk_good_list/clerk_good_list?shareId=" + this.data.shareId + "&higherLevelCode=" + this.data.clerk_code + "&workerId=" + this.data.workerId + "&merchantCode=" + this.data.merchant_code,
        })
      } else {
        wx.showToast({
          title: '商家未上架商品',
          duration: 2000,
          icon: "none"
        })
      }
    }
  },

  /** 计算姓名与职位宽度 */
  computeNamePositionWidth: function () {
    let that = this
    wx.createSelectorQuery().selectAll('#txtName').boundingClientRect(function (rect) {
      that.setData({
        nameWidth: rect[0].width,
      })
    }).exec()
    wx.createSelectorQuery().selectAll('#txtPosition').boundingClientRect(function (rect) {
      that.setData({
        positionWidth: rect[0].width,
      })
    }).exec()

    if (that.data.nameWidth + that.data.positionWidth > that.data.namePositionWidth) {
      that.setData({
        nameWidth: that.data.namePositionWidth * 0.7,
        positionWidth: that.data.namePositionWidth * 0.3,
      })
    }
  },
})