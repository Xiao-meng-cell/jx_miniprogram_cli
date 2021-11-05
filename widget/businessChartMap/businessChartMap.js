// widget/businessChartMap/businessChartMap.js
var http = require('../../utils/http.js');
var util = require('../../utils/util.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    merchantCode: {
      type: null,
      observer: function (newVal, oldVal) {
        if (newVal != '') {
          this.setData({
            merchantCode: newVal
          })
          this.getCountryDataList()
          this.getZkDataShow()
        }
      }
    },

    clerkId: {
      type: null,
      observer: function (newVal, oldVal) {
        if (newVal != '') {
          this.setData({
            clerkId: newVal
          })
        }
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    merchantCode: "",
    clerkId: "",
    provinceNum: 0,
    cityNum: 0,
    storeNum: 0,
    businessScope: "",
    colorList: ['#94EFF2', '#23D9E7', '#0E95B8', '#A5DBFF', '#5ABDFF', '#2F95FB', '#1C64C5', '#7276E5', '#4A4FD2', '#3E41A7'],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /** 前往店铺覆盖全国地图 */
    goToMap: function () {
      if (this.data.provinceNum == 0) {
        return
      }
      let urlPre = "https://h5.vicpalm.com/weclubbing";
      if (app.globalData.h5PathTest) {
        urlPre = "https://h5.vicpalm.com/testprojectonline";
      }
      let url = urlPre + "/operatingPoint?merchantCode=" + this.data.merchantCode
      if (this.data.clerkId && this.data.clerkId != "") {
        url = url + "&cardId=" + this.data.clerkId
      }
      let lat = app.globalData.current_lat
      let lng = app.globalData.current_lng
      if (lat && lat != "") {
        url = url + "&lat=" + lat + "&lng=" + lng
        url = url + "&fromType=wxApp"
        let webUrl = encodeURIComponent(url); //编码   
        console.log(webUrl);
        wx.navigateTo({
          url: '/pages/web_view_html/web_view_html?webUrl=' + webUrl
        })
      } else {
        wx.getLocation({
          type: 'wgs84',
          success: res => {
            app.globalData.current_lat = res.latitude;
            app.globalData.current_lng = res.longitude;
            url = url + "&lat=" + res.latitude + "&lng=" + res.longitude
            url = url + "&fromType=wxApp"
            let webUrl = encodeURIComponent(url); //编码   
            console.log(webUrl);
            wx.navigateTo({
              url: '/pages/web_view_html/web_view_html?webUrl=' + webUrl
            })
          }
        })
      }
    },

    goToScope: function () {
      let urlPre = "https://h5.vicpalm.com/weclubbing";
      if (app.globalData.h5PathTest) {
        urlPre = "https://h5.vicpalm.com/testprojectonline";
      }
      let url = urlPre + "/operatingPoint?merchantCode=" + this.data.merchantCode
      console.log(url);
      console.log(this.data.clerkId)
      if (this.data.clerkId && this.data.clerkId != "") {
        url = url + "&cardId=" + this.data.clerkId
      }
      let webUrl = encodeURIComponent(url); //编码   
      console.log(webUrl);
      wx.redirectTo({
        url: '/pages/web_view_html/web_view_html?webUrl=' + webUrl
      })
    },

    /**获取店铺全国分布数据 */
    getCountryDataList: function () {
      http.get(
        app.globalData.host + "biz/user/merchant/branch/list/all", {
          merchantCode: this.data.merchantCode
        },
        (status, resultCode, message, data) => {
          if (data && data.length > 0) {
            let provinceData = []
            let cityData = []
            for (let i in data) {
              let amapGeo = JSON.parse(data[i].amapGeo);
              if (amapGeo && amapGeo.provincedata) {
                provinceData.push({
                  name: amapGeo.provincedata.name,
                  cityCode: amapGeo.provincedata.adcode,
                })
              }
              if (amapGeo && amapGeo.citydata) {
                cityData.push({
                  name: amapGeo.citydata.name,
                  cityCode: amapGeo.citydata.adcode,
                })
              }
            }
            provinceData = util.uniqueArr(provinceData);
            cityData = util.uniqueArr(cityData);
            
            for (let i in provinceData) {
              let provinceItem = provinceData[i]
              let code = provinceItem.cityCode
              // console.log(provinceData[i])
              if (code == "110000" || code == "120000" || code == "500000" || code == "310000" || code == "810000" || code == "820000") {
                cityData.push({
                  name: provinceData[i].name,
                  cityCode: provinceData[i].cityCode,
                })
              }
            }

            this.setData({
              provinceNum: provinceData.length,
              cityNum: cityData.length,
              storeNum: data.length
            })
          }
        },
        (status, resultCode, message, data) => {}
      )
    },

    /** 获取智控信息 */
    getZkDataShow: function () {
      http.get(
        app.globalData.host + "biz/user/merchant/branch/data/show", {
          merchantCode: this.data.merchantCode,
        },
        (_status, _resultCode, _message, _data) => {
          let value = _data.valueShow
          if (value && value != "" && JSON.parse(value)) {
            let temp = JSON.parse(value)

            let bs = temp.businessScope
            let colorIndex = 0
            for (let i in bs) {
              let bsItem = bs[i]
              bsItem.color = this.data.colorList[colorIndex]
              colorIndex += 1
              if (colorIndex == 10) {
                colorIndex = 0
              }
            }
            //经营范围
            this.setData({
              businessScope: bs,
            })
            // console.log(this.data.businessScope)
          }
        },
        (_status, _resultCode, _message, _data) => {}
      );
    },
  },
})