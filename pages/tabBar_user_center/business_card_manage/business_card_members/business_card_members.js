// miniprogram/pages/tabBar_user_center/business_card_manage/business_card_members/business_card_members.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
var pinyin = require('../../../../utils/pinyin.js')
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantCode: "",
    card_list_merchant: [],
    pageIndex: 0, //翻页目录
    pageIndex_add: 0, //二维数组下标
    business_info: "", //商家信息
    keyword: "", //搜索关键字
    inviteDisplay: false, //是否显示邀请
    role: 0, //角色（0共享合伙人，1事业合伙人，2企业管理员，3老板）
    userId: "",
    memberCount: 0, //成员数量
    alpha: '', //按名字排名组建用
    windowHeight: '', //按名字排名组建用
    hidden_alpha: true, //按名字排名组建用
    alphabet_list: [{
        alphabet: 'A',
        datas: []
      },
      {
        alphabet: 'B',
        datas: []
      },
      {
        alphabet: 'C',
        datas: []
      },
      {
        alphabet: 'D',
        datas: []
      },
      {
        alphabet: 'E',
        datas: []
      },
      {
        alphabet: 'F',
        datas: []
      },
      {
        alphabet: 'G',
        datas: []
      },
      {
        alphabet: 'H',
        datas: []
      },
      {
        alphabet: 'I',
        datas: []
      },
      {
        alphabet: 'J',
        datas: []
      },
      {
        alphabet: 'K',
        datas: []
      },
      {
        alphabet: 'L',
        datas: []
      },
      {
        alphabet: 'M',
        datas: []
      },
      {
        alphabet: 'N',
        datas: []
      },
      {
        alphabet: 'O',
        datas: []
      },
      {
        alphabet: 'P',
        datas: []
      },
      {
        alphabet: 'Q',
        datas: []
      },
      {
        alphabet: 'R',
        datas: []
      },
      {
        alphabet: 'S',
        datas: []
      },
      {
        alphabet: 'T',
        datas: []
      },
      {
        alphabet: 'U',
        datas: []
      },
      {
        alphabet: 'V',
        datas: []
      },
      {
        alphabet: 'W',
        datas: []
      },
      {
        alphabet: 'X',
        datas: []
      },
      {
        alphabet: 'Y',
        datas: []
      },
      {
        alphabet: 'Z',
        datas: []
      },
      {
        alphabet: 'other',
        datas: []
      },
    ],
    alphabet_list_display: [],
    lookEachOther: 0, //允许互相查看名片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.getOptions(options, function (data, num) {
      that.initOptions(data)
      if (num == 1) {
        that.onShow()
      }
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
    if (options.merchantCode) {
      let userId = ""
      if (options.userId) {
        userId = options.userId
      }
      this.setData({
        merchantCode: options.merchantCode,
        role: options.role,
        userId: userId,
      });
      wx.setNavigationBarTitle({
        title: options.role == 3 ? "旗下员工" : "企业同事",
      })
      this.getBusinessInfo();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu();
    let res = wx.getSystemInfoSync()
    this.setData({
      scrollHeight: res.windowHeight
    });
    let rightAlphaHeight = res.windowHeight;
    let query = wx.createSelectorQuery();
    query.select('#rightAlpha').boundingClientRect();
    query.selectViewport().scrollOffset();
    let that = this;
    query.exec(function (res) {

      rightAlphaHeight = res[0].height
      //每一个字母所占的高度
      that.apHeight = rightAlphaHeight / 26;
      that.setData({
        windowHeight: rightAlphaHeight
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.merchantCode) {
      // if (this.data.role == 1) {
      //   this.loadMineTeam();
      //   this.getNumByParentUserIdAndCode();
      // } else {
      this.getCount();
      this.getMemberList()
      // }
    }

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
    this.setData({
      pageIndex: this.data.pageIndex + 20,
      pageIndex_add: this.data.pageIndex_add + 1
    })
    this.getMemberList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    console.log(e)
    let role = e.target.dataset.role
    this.setData({
      inviteDisplay: false,
    })
    if (role == 1) {
      return {
        title: (this.data.business_info.shortName ? this.data.business_info.shortName : this.data.business_info.name) + "诚邀您的加入成为事业合伙人!",
        path: "pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply?higherLevelCode=" + wx.getStorageSync('user').userCode + "&invite=true" + "&merchantCode=" + this.data.business_info.code + "&role=" + role + '&batchShare=' + app.globalData.batchShare,
        imageUrl: this.data.business_info.bgUrls[0],
        success: res => {
          wx.showToast({
            title: '转发成功',
            icon: "none"
          })
        },
        fail: res => {
          wx.showToast({
            title: '转发失败',
            icon: "none"
          })
        }
      }
    } else {
      return {
        title: (this.data.business_info.shortName ? this.data.business_info.shortName : this.data.business_info.name) + "诚邀您的加入成为共享合伙人!",
        path: "pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply?higherLevelCode=" + wx.getStorageSync('user').userCode + "&invite=true" + "&merchantCode=" + this.data.business_info.code + "&role=" + role,
        imageUrl: this.data.business_info.bgUrls[0],
        success: res => {
          wx.showToast({
            title: '转发成功',
            icon: "none"
          })
        },
        fail: res => {
          wx.showToast({
            title: '转发失败',
            icon: "none"
          })
        }
      }
    }

  },

  /**
   * 获取企业详情信息
   */
  getBusinessInfo: function () {
    http.get(
      app.globalData.host + "/biz/user/merchant/info", {
        merchantCode: this.data.merchantCode
      },
      (status, resultCode, message, data) => {
        this.setData({
          business_info: data,
          lookEachOther: data.lookEachOther,
        })
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 获取企业员工数量
   */
  getCount: function () {
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/user/count", {
        merchantCode: this.data.merchantCode
      },
      (status, resultCode, message, data) => {
        let memberCount = data
        wx.setNavigationBarTitle({
          title: this.data.role == 3 ? "旗下员工" : "企业同事" + "（" + memberCount + "）",
        })
        this.setData({
          memberCount: memberCount,
        })
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  /**
   * 获取旗下员工
   */
  getMemberList: function () {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    let that = this
    let clerkList = wx.getStorageSync('cl' + that.data.merchantCode)
    if (clerkList != "" && clerkList.length > 0) {
      new Promise(function (resolve, reject) {
        that.setData({
          alphabet_list_display: clerkList
        })
        if (that.data.alphabet_list_display && that.data.alphabet_list_display.length > 0) {
          wx.hideLoading()
          resolve();
        } else {
          reject();
        }
      })
    }

    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/list", {
        merchantCode: this.data.merchantCode,
        skip: this.data.pageIndex,
        limit: 10000,
        filter: this.data.keyword,
      },
      (status, resultCode, message, data) => {
        console.log(data)
        this.handlerCardList(data)
      },
      (status, resultCode, message, data) => {
        console.log('获取旗下员工失败')
        wx.hideLoading()
      }
    );
  },

  handlerCardList: function (data) {
    let that = this
    let alphabet_list = this.data.alphabet_list
    for (let i in data) {
      let item = data[i]
      if (!item) {
        continue
      }
      if (item) {
        item.initial = pinyin.getPinYinFirstCharacter(item.name);
        switch (item.initial) {
          case "A":
            alphabet_list[0].datas.push(item);
            break;
          case "B":
            alphabet_list[1].datas.push(item);
            break;
          case "C":
            alphabet_list[2].datas.push(item);
            break;
          case "D":
            alphabet_list[3].datas.push(item);
            break;
          case "E":
            alphabet_list[4].datas.push(item);
            break;
          case "F":
            alphabet_list[5].datas.push(item);
            break;
          case "G":
            alphabet_list[6].datas.push(item);
            break;
          case "H":
            alphabet_list[7].datas.push(item);
            break;
          case "I":
            alphabet_list[8].datas.push(item);
            break;
          case "J":
            alphabet_list[9].datas.push(item);
            break;
          case "K":
            alphabet_list[10].datas.push(item);
            break;
          case "L":
            alphabet_list[11].datas.push(item);
            break;
          case "M":
            alphabet_list[12].datas.push(item);
            break;
          case "N":
            alphabet_list[13].datas.push(item);
            break;
          case "O":
            alphabet_list[14].datas.push(item);
            break;
          case "P":
            alphabet_list[15].datas.push(item);
            break;
          case "Q":
            alphabet_list[16].datas.push(item);
            break;
          case "R":
            alphabet_list[17].datas.push(item);
            break;
          case "S":
            alphabet_list[18].datas.push(item);
            break;
          case "T":
            alphabet_list[19].datas.push(item);
            break;
          case "U":
            alphabet_list[20].datas.push(item);
            break;
          case "V":
            alphabet_list[21].datas.push(item);
            break;
          case "W":
            alphabet_list[22].datas.push(item);
            break;
          case "X":
            alphabet_list[23].datas.push(item);
            break;
          case "Y":
            alphabet_list[24].datas.push(item);
            break;
          case "Z":
            alphabet_list[25].datas.push(item);
            break;
          default:
            alphabet_list[26].datas.push(item);
        }
      }
    }
    let finalList = []
    for (let i in alphabet_list) {
      let item = alphabet_list[i]
      if (item.datas && item.datas.length > 0) {
        finalList.push(item)
      }
    }
    new Promise(function (resolve, reject) {
      that.setData({
        alphabet_list: finalList,
        alphabet_list_display: finalList,
      })
      if (that.data.alphabet_list_display && that.data.alphabet_list_display.length > 0) {
        wx.setStorageSync("cl" + that.data.merchantCode, finalList)
        wx.hideLoading()
        resolve();
      } else {
        reject();
      }
    })
  },

  /**
   * 跳转名片详情
   */
  jumpCardDetail: function (e) {
    // console.log('dddd',this.data.role)
    // if (this.data.role != 3 && this.data.lookEachOther != 1) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '群主设置访问权限，无法访问',
    //   })
    //  return
    // }
    if (e.currentTarget.dataset.status == 2) {
      wx.showToast({
        title: '名片审核中',
        icon: "none"
      })
      return
    }
    // wx.navigateTo({
    //   url: '/pages/tabBar_user_center/business_card_manage/business_card_detail/business_card_detail?merchantCode=' + e.currentTarget.dataset.merchantcode + "&workerId=" + e.currentTarget.dataset.id + "&read=true&role=" + this.data.role,
    // })
    wx.navigateTo({
      url: '/pages/clerk/show/show?merchantCode=' + e.currentTarget.dataset.merchantcode + '&higherLevelCode=' + app.globalData.higherLevelCode + "&workerId=" + e.currentTarget.dataset.id + "&read=true&role=" + this.data.role,
    })
  },

  /**
   * 搜索
   */
  searchCard: function (e) {
    if (e) {
      this.setData({
        keyword: e.detail.value
      });
      if (e.detail.value == "") {
        this.searchList();
      }
    }

  },

  /** 搜索列表 */
  searchList: function (e) {
    this.setData({
      pageIndex: 0,
      pageIndex_add: 0,
      alphabet_list: [{
          alphabet: 'A',
          datas: []
        },
        {
          alphabet: 'B',
          datas: []
        },
        {
          alphabet: 'C',
          datas: []
        },
        {
          alphabet: 'D',
          datas: []
        },
        {
          alphabet: 'E',
          datas: []
        },
        {
          alphabet: 'F',
          datas: []
        },
        {
          alphabet: 'G',
          datas: []
        },
        {
          alphabet: 'H',
          datas: []
        },
        {
          alphabet: 'I',
          datas: []
        },
        {
          alphabet: 'J',
          datas: []
        },
        {
          alphabet: 'K',
          datas: []
        },
        {
          alphabet: 'L',
          datas: []
        },
        {
          alphabet: 'M',
          datas: []
        },
        {
          alphabet: 'N',
          datas: []
        },
        {
          alphabet: 'O',
          datas: []
        },
        {
          alphabet: 'P',
          datas: []
        },
        {
          alphabet: 'Q',
          datas: []
        },
        {
          alphabet: 'R',
          datas: []
        },
        {
          alphabet: 'S',
          datas: []
        },
        {
          alphabet: 'T',
          datas: []
        },
        {
          alphabet: 'U',
          datas: []
        },
        {
          alphabet: 'V',
          datas: []
        },
        {
          alphabet: 'W',
          datas: []
        },
        {
          alphabet: 'X',
          datas: []
        },
        {
          alphabet: 'Y',
          datas: []
        },
        {
          alphabet: 'Z',
          datas: []
        },
        {
          alphabet: 'other',
          datas: []
        },
      ],
      card_list_merchant: [],
    })
    this.getMemberList()
  },

  /** 邀请员工 */
  invitePersonnel: function () {
    if (this.data.business_info.status == 1) {
      console.log(this.data.role)
      if (this.data.role > 0) {
        this.setData({
          inviteDisplay: true,
        })
      } else {
        wx.showToast({
          title: '共享合伙人不能发起邀请！',
          icon: 'none',
          mask: true,
        })
      }
    } else {
      wx.showToast({
        title: '企业状态异常！',
        icon: 'error',
      })
    }
  },

  /** 关闭邀请 */
  closeInvite: function () {
    this.setData({
      inviteDisplay: false,
    })
  },

  /**防止滑动冒泡 */
  doNotMove: function () {
    return false;
  },

  /** 获取我的团队 */
  loadMineTeam: function (e) {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    http.get(
      app.globalData.host + "/biz/user/merchant/clerk/listByRole", {
        merchantCode: this.data.merchantCode,
        userId: this.data.userId,
        skip: this.data.pageIndex,
        limit: 20,
        filter: this.data.keyword,
      },
      (status, resultCode, message, data) => {
        console.log('获取我的团队成功')
        console.log(data)
        let memberCount = data.length
        if (memberCount > 0) {
          wx.setNavigationBarTitle({
            title: '团队成员(' + data.length + ")",
          })
        }
        let list = data;
        this.setData({
          ['card_list_merchant[' + this.data.pageIndex_add + ']']: list,
          memberCount: this.data.memberCount > 0 ? this.data.memberCount : memberCount,
        });

        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        console.log('获取我的团队失败')
        wx.hideLoading()
      }
    );
  },

  /**
   * 获取业务精力/事业合伙人团队成员人数
   */
  getNumByParentUserIdAndCode: function () {
    http.get(
      app.globalData.host + "biz/user/merchant/clerk/mine/countByParentUserIdAndCode", {
        merchantCode: this.data.merchantCode,
        userId: this.data.userId,
      },
      (status, resultCode, message, data) => {
        this.setData({
          memberCount: data,
        });
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        wx.hideLoading()
      }
    );
  },

  //点击
  handlerAlphaTap: function (e) {
    let {
      ap
    } = e.target.dataset;
    this.setData({
      alpha: ap,
      hidden_alpha: false
    });
  },

  //滑动
  handlerMove: function (e) {
    let {
      alphabet_list
    } = this.data;
    this.setData({
      hidden_alpha: false
    });
    let rY = e.touches[0].clientY - 52; //竖向滑动的距离
    if (rY >= 0) {
      let index = Math.ceil((rY - this.apHeight) / this.apHeight);
      if (0 <= index < alphabet_list.length) {
        let nonwAp = alphabet_list[index];
        nonwAp && this.setData({
          alpha: nonwAp.alphabet
        });
      }
    }
  },

  //滑动结束
  handlerEnd: function (e) {
    setTimeout(() => {
      this.setData({
        hidden_alpha: true
      });
    }, 500)
  },

  /**
   * 查看申请列表
   */
  toApplyList: function () {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/manager/apply_manager/apply_manager',
    })
  },

  /** 分享名片 */
  shareCardCode: function (e) {
    wx.navigateTo({
      url: '/pages/tabBar_user_center/business_card_manage/business_card_scene/scene_code/scene_code?id=' + e.currentTarget.dataset.id + "&type=clerk",
    })
  },

  /** 允许互相查看名片 */
  lookEachOther: function (e) {
    http.post(
      app.globalData.host + "biz/user/merchant/edit/item", {
        item: "lookEachOther",
        value: e.detail.value ? 1 : 0,
      },
      (status, resultCode, message, data) => {},
      (status, resultCode, message, data) => {
        wx.showToast({
          title: '修改失败',
        })
      }
    );
  },
})