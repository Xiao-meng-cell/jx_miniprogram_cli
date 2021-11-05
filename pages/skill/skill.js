// pages/skill/skill.js
const app = getApp();
const http = require("../../utils/http.js");
const util = require("../../utils/util.js");
const the = this;
Page({
  data: {
    cate: 'list1',
    scrollTop: 0,
    tempScrollTop: 0,
    menus: [],
    lastTapDiffTime: 0,
    checkedBean: null,
    pcode: null, //父类code（公共事务）
    onlyParent: false, //只显示父类
    official: null, //公共事务
  },

  onLoad: function (options) {
    if (options.onlyparent) {
      this.setData({
        onlyParent: true,
      })
    }
    if (options.official) {
      this.setData({
        official: options.official == "true" ? true : false,
      })
    }
    this.getTreeDatas();
  },

  clickMenu: function (e) {
    //console.log(e);
    var that = this;
    that.setData({
      cate: e.currentTarget.dataset.name
    })
    that.setData({
      scrollTop: that.data.menus[e.target.dataset.id].minHeight,
    })
  },
  scroll(e) {
    var curTime = e.timeStamp;
    var lastTime = this.data.lastTapDiffTime;
    this.data.tempScrollTop = e.detail.scrollTop;
    if (lastTime > 0) {
      if (curTime - lastTime > 300) {
        //console.log("大：" + e.timeStamp + "-" + lastTime + "=" + (curTime - lastTime));
        this.setData({
          scrollTop: e.detail.scrollTop,
          lastTapDiffTime: curTime,
        });
      }
    } else {
      this.setData({
        scrollTop: e.detail.scrollTop,
        lastTapDiffTime: curTime,
      });
    }

  },

  getTreeDatas: function () {
    var that = this;
    wx.showLoading({
      title: '正在加载中...',
    });
    http.get(
      app.globalData.host + 'task/tag/tree', {
        rootCode: app.getTagCode() ? app.getTagCode() : 'merchant',
      },
      (status, resultCode, message, data) => {
        var dataObject = data;
        that.data.menus = dataObject.subs;

        if (!that.data.onlyParent) {
          that.queryMultipleNodes();
        }

        let menus = []
        if (this.data.official != null) {
          if (this.data.official) {
            for (let i in dataObject.subs) {
              let subObj = dataObject.subs[i]
              if (subObj.code == "official") {
                menus.push(subObj)
              }
              break
            }
          } else {
            for (let i in dataObject.subs) {
              let subObj = dataObject.subs[i]
              if (subObj.code != "official") {
                menus.push(subObj)
              }
            }
          }
        } else {
          menus = dataObject.subs
        }

        that.setData({
          menus: menus,
          cate: "list" + dataObject.subs[0].id,
        });
        wx.hideLoading();
      },
      (status, resultCode, message, data) => {
        //console.log(data);
        wx.showToast({
          title: '获取失败',
          duration: 2000
        })
      });
  },

  /**
   * 计算view模块高度
   */
  queryMultipleNodes: function () {
    setTimeout(() => {
      var datas = this.data.menus;
      let that = this;
      let query = wx.createSelectorQuery().in(this);
      for (var i = 0; i < datas.length; i++) {
        query.select('.item' + i).boundingClientRect();
      }
      query.exec(res => {
        var totalHeight = 0;
        for (var i = 0; i < res.length; i++) {
          datas[i].minHeight = totalHeight;
          totalHeight += res[i].height;
          datas[i].maxHeight = totalHeight;
        }
        that.setData({
          menus: datas
        })
        console.log(that.data.menus);
      });
    }, 300)
  },

  scrollTouchend: function (e) {
    console.log("停止了");
    var that = this;
    this.setData({
      scrollTop: that.data.tempScrollTop,
    });
  },

  checkClassify: function (e) {
    var that = this;
    that.setData({
      checkedBean: e.currentTarget.dataset.bean,
      pcode: e.currentTarget.dataset.parentbeancode,
    })
    that.data.pcode = e.currentTarget.dataset.parentbeancode,
      that.data.checkedBean = e.currentTarget.dataset.bean;
    app.globalData.selectType = e.currentTarget.dataset.bean;
    app.globalData.pcode = e.currentTarget.dataset.parentbeancode;
    if (app.globalData.pcode != "official") {
      app.globalData.pcode == null;
      //获取页面栈
      var pages = getCurrentPages();
      if (pages.length > 1) {
        //上一个页面实例对象
        var prePage = pages[pages.length - 2];
        //关键在这里
        // prePage.changeIsTangData(false)
      }
    } else {
      //获取页面栈
      var pages = getCurrentPages();
      if (pages.length > 1) {
        //上一个页面实例对象
        var prePage = pages[pages.length - 2];
        //关键在这里
        // prePage.changeIsTangData(true)
      }
    }


    wx.navigateBack({
      delta: 1 // 返回上一级页面。
    })
  },

  /** 前往企业排行 */
  goToRanking: function (e) {
    let parentItem = e.currentTarget.dataset.bean
    wx.navigateTo({
      url: '/pages/tabBar_index/ranking/ranking?selectedTagCode=' + parentItem.code,
    })
  },


})