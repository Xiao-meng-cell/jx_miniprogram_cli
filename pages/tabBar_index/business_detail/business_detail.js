// miniprogram/pages/tabBar_index/business_detail/business_detail.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
const regExp = require('../../../utils/regExp.js');
var qqmapsdk;
//获取应用实例
const app = getApp();
const phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fromNews: true,
        userDefalutBack: false,
        isHeight: false,
        networkType: true, //监听网络连接与断开
        propertie: '', //特征值
        onshelfCode: '',
        testServer: app.globalData.testServer,
        independentPay: app.globalData.independentPay,
        cartNum: null, //购物车数量
        business_detail: {}, //企业活动详情
        goodsFavorites: false, //商品收藏
        city_info: app.globalData.city_info, //当前定位所在城市信息
        eventCode: "",
        show_business_phone: true, //展示企业号码列表
        join_user_num: "", //参与用户总数
        business_phone: "", //企业电话列表
        activityTime: false,
        activityTime_d: "00",
        activityTime_h: "00",
        activityTime_m: "00",
        activityTime_s: "00",
        activityTime_month: '00',
        activityTime_day: '00',
        endtime_display: "", //结束时间显示
        hidden_explain_detail: true,
        iPhone_X: app.globalData.iPhone_X,
        activityType: "", //活动类型
        product_activityType: "", //产品活动类型
        product_activityMask: "",
        noPhone: false,
        wxCode: "",
        session_key: "",
        imgList: [], //图片列表
        mainImgIndex: 1, //当前图片下标
        videoURL: '', //视频url
        existVideo: false, //存在视频
        selectedDisplayType: "img", //选中显示类型（vr:VR看房；vid:视频；img:图片）
        videoAutoPlay: false, //视频是否自动播放
        merchant_err: false,
        windowHeight: app.globalData.windowHeight,
        windowWidth: app.globalData.windowWidth,
        quantity: 1, //数量
        isEdit: false, //是否为编辑状态
        name: "", //姓名
        nameEnable: false,
        phone: "", //手机号
        phoneEnable: false,
        priCity: "", //省市区
        addr: "", //详细地址
        addrEnable: false,
        order_message: "",
        memoEnable: false,
        operation_show: true, //用户操作栏是否显示
        prePadingTop: 0, //上一次距上边距
        saveAddr: false,
        condition: false,
        order_addr: "", //收货地址
        operation: "", //优惠券操作方式
        couponIdList: [], //优惠券id数组
        couponList: "", //优惠券id数组
        discount_price: 0, //所有折扣值
        total_price: "", //总价（不包含会员优惠券价格）
        total_vip_price: 0, //总价（包含会员优惠券价格）
        tvpHasDp: false, //VIP劵后价格是否包含折扣价
        hasUsableCredit: true, //包含预充值
        vipDiscount: 0, //会员系统优惠券
        isShare: false, //是否已经分享
        clerkState: false,
        showReward: false,
        wxVersion: "",
        capsuleTop: 0,
        capsuleHeight: 0,
        specList: "", //sku规格
        selected_text: "", //选中sku值
        chooseSkus: [], //已选择的规格
        orderMessage: [], //便捷备注
        messageText: [],
        skus: "",
        sku_priceYuan: "",
        sku_referencePriceYuan: "", //订单参考价
        sku_url: "",
        sku_stock: "",
        damagePriceYuan: "", //违约金
        damagePriceTotal: "", //违约金总计
        sku_weight: 1, //选中sku重量
        choose_skuProperties: "",
        eventProducts: "",
        shareDiscount: false, //分享优惠
        shareDiscountPrice: 0,
        showZTDZ: false, //显示自提地址
        pickAddr: {}, //提货地址
        cartDisplay: false, //购物车是否显示
        showLogisticsTemple: true, //是否显示运费模板
        sourceAddr: "", //货源所在地，发货地
        targetAddr: "", //目标地，收货地址
        useDefaultAddr: true, //使用默认地址
        provincesList: [], //省列表
        citiesList: [], //城市列表
        countyList: [], //区/县列表
        choos_citiesList: [],
        choos_countyList: [],
        choose_result: [], //已经选择的地址数据
        addrIndex: [0, 0, 0], //地址下标
        allAddrList: "",
        logisticsChargeType: 1,
        logisticsPrice: 0.00, //运费
        logisticsStatus: 0, //物流状态 （1:物流；2:付费；3:无法配送）
        logisticsInfo: "", //物流信息
        minPrice: 0, //最小价格
        maxPrice: 0, //最高价格
        minReferencePrice: 0, //最小参考价格
        maxReferencePrice: 0, //最高参考价格
        forwarding: false, //是否转发中
        platform: null, //当前系统是ios还是android平台等
        freshTips: "", //生鲜提示
        fresh_flag_top: 0,
        fresh_flag_z_index: -5,
        freshOvertimeTips: false,
        serviceAddr: "", //到店服务地址
        freePostageNum: 0, //满件包邮数量
        projectNearbyPointNavIndex: 0,
        projectNearbyList: "", //周边列表
        projectLocal: "", //项目所在位置坐标点
        markers: "", //地图标记点
        shareType: 'goods',
        goodsStatus: 1, //商品状态（结合活动状态与货源状态）
        onShowLoadEnable: true, //启用onShow中加载数据方法
        vrUrl: "", //房地产商品VR看房地址
        managerDisplay: true, //显示项目联系人
        mapData: {
            latitude: 0,
            longitude: 0,
        },
        projectMapTag: "",
        certified: true, //企业是否过审
        clerk_code: '',
        totalHeight: 0, //页面总高度
        progress: 0, //浏览百分比
        orderParam: {},
        startDeliveryTime: '', //配送时间
        endDeliveryTime: '',
        filterTimeLastDate: "", //时间过滤截止时间,
        showBtn: false, //分享商品弹框显示
        submitOrderEnable: true, //开启提交订单
        submitOrderTime: 10, //提交订单间隔
        bossUserCode: '', //商家的userCode
        enableMember: app.globalData.enableMember,
        //会员、预充值
        vipCouponPrice: 0,
        enableMemberRecharge: false, //启用会员预充值
        useMemberRecharge: true, //使用会员预充值
        rechargeBalance: 0, //预充值余额
        usableCredit: 0, //预充值可抵扣金额
        payPwd: "", //支付密码
        indChooseCoupon: false, //自主选择优惠券
        couponCodes: [], //会员优惠券编号列表
        vipCouponEmpty: true, //会员优惠券为空
        //雷达数据采集所需数据
        timer: null, //雷达时间采集定时器
        startTime: null, //浏览开始时间
        scene: '',
        sceneDT: '0',
        winHeight: 0, //窗口高度
        pageHeight: 0, //页面高度
        progress: 0, //浏览页面百分比
        resetLocation: false, //重置位置授权
        allHeadimg: false,
        shareTotal: 0,
        shareRecord: [],
        shareUserId: '',
        skuProperties: '',
        sharePlay:''
    },

    getPlatform: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    platform: res.platform,
                });
                if (res.platform == "devtools") {} else if (res.platform == "ios") {} else if (res.platform == "android") {}
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        app.watch(that.watchBack); //监听网络变化
        wx.showLoading({
            title: '数据加载中',
            mask: true
        })
        this.getPlatform();

        app.getOptions(options, function (data, fromAPP) {
            that.initOptions(data)
            if (fromAPP == 1) {
                that.onShow()
            }
        }, function (data, qrcode_scene) {
            //&是我们定义的参数链接方式
            if (qrcode_scene.split("$")[0]) {
                app.globalData.higherLevelCode = qrcode_scene.split("$")[0];
                that.setData({
                    clerk_code: qrcode_scene.split("$")[0]
                });
                app.globalData.isReloadThePage_tabBar_index = true;
            }
            if (qrcode_scene.split("$")[1]) {
                that.setData({
                    eventCode: qrcode_scene.split("$")[1],
                    onShowLoadEnable: false,
                });
            }
            that.initOptions(data)
        })
    },
    //初始化参数
    initOptions(options) {
        // console.log('initOptionsoptions', options)
        //微信小卡片，页面跳转 获取参数
        if (options.higherLevelCode) {
            app.globalData.higherLevelCode = options.higherLevelCode;
            app.globalData.isReloadThePage_tabBar_index = true;
        }
        if (options.code) {
            this.setData({
                eventCode: options.code + "",
                onShowLoadEnable: false,
            });
            this.getJoinUser()
        }
        if (options.showReward) {
            this.setData({
                showReward: true
            });
        }
        if (options.activityType) {
            this.setData({
                activityType: options.activityType
            });
        }
        if (options.clerk_code) {
            this.setData({
                clerk_code: options.clerk_code
            });
        } else {
            this.setData({
                clerk_code: ''
            });
        }
        if (options.sceneType) {
            this.setData({
                scene: options.sceneType
            });
        }
        if (options.sceneDT) {
            this.setData({
                sceneDT: options.sceneDT
            });
        }
        if (options.referrerInfo) {
            this.setData({
                eventCode: options.referrerInfo.extraData.code, //预支付单号，从前面一个小程序传过来
                clerk_code: options.referrerInfo.extraData.clerk_code,
            })
        }
        if (options.shareUserId) {
            this.setData({
                shareUserId: options.shareUserId
            })
        }
        if (options.skuProperties) {
            this.setData({
                skuProperties: unescape(options.skuProperties)
            })
        }
        // this.getBusinessDetail();
        this.setData({
            iPhone_X: app.globalData.iPhone_X,
            allAddrList: wx.getStorageSync('allAddrList')
        })
        if (!this.data.allAddrList) {
            this.getPCC();
        } else {
            this.separateData();
        }
        qqmapsdk = new QQMapWX({
            key: app.globalData.qqMapKey
        });
        if (options.markLive && options.markLive == 1) {
            this.setData({
                cartDisplay: true
            })
        }
    },

    /**监听网络变化 */
    watchBack: function (networkType) {
        this.setData({
            networkType: networkType
        });
        // console.log('==========网络监听==========', this.data.networkType);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let that = this;
        const query = wx.createSelectorQuery()
        query.select('#main').boundingClientRect((res) => {
            this.setData({
                totalHeight: Math.ceil(res.height)
            })
        }).exec()
        query.selectViewport().scrollOffset()
        this.setData({
            activity_pageHeightDevice: setInterval(function () {
                query.exec(function (res) {
                    that.setData({
                        prePadingTop: res[0].height
                    });
                })
            }, 1000)
        });
        if (!wx.getStorageSync('user')) {
            app.isUserLogin(function (isLogin) {})
        }
        wx.createSelectorQuery().select('#fresh_flag').boundingClientRect(function (rect) {
            // console.log(rect)
            that.setData({
                fresh_flag_top: that.data.windowWidth - rect.height / 2,
            })
        }).exec();
        this.setData({
            wxVersion: util.compareVersion(app.globalData.wxVersion, "7.0.0"),
            capsuleTop: app.globalData.capsuleTop,
            capsuleHeight: app.globalData.capsuleHeight,
        });
        this.clearIntervalByTime();
        wx.hideShareMenu()
        this.payPassword = this.selectComponent("#payPassword")
    },

    /**防止滑动冒泡 */
    doNotMove: function () {
        return false;
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
        let date = new Date();
        let time = util.tsFormatTime(date, "h:m");
        let d = new Date(date);
        d = +d + 1000 * 60 * 60 * 24;
        d = new Date(d);
        d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        // console.log(date);
        // this.setData({
        //     startDeliveryTime: d + " 10:00"
        // })
        this.data.startTime = util.timestamp();
        this.setData({
            forwarding: false,
            submitOrderEnable: true,
        })
        //不启用onshow方法
        if (!app.globalData.onShowEnable) {
            app.globalData.onShowEnable = true
            return
        }
        //加载产品详情
        if (this.data.eventCode && this.data.eventCode != "") {
            this.getBusinessDetail();
        }
        //判断登录状态
        if (wx.getStorageSync('user')) {
            /**获取购物车数量 */
            app.loadCartNum(function (tabBar) {
                that.setData({
                    cartNum: tabBar.list[2].number
                });
            })
            this.getOrderAddr();
        }
        //如果是更改了地址就刷新数据
        if (app.globalData.changeCity) {
            if (app.globalData.city_info.id !== "") {
                this.setData({
                    city_info: app.globalData.city_info,
                    targetAddr: app.globalData.city_info.name != "" ? app.globalData.city_info.name : "",
                });
            }
        } else {
            this.checkUserLocation();
        }
        app.checkLocationScope() //检查用户位置授权
        //接收优惠劵列表页返回，自主选择优惠劵后重新计算价格
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        this.setData({
            vipDiscount: currPage.data.vipDiscount,
            total_vip_price: currPage.data.total_vip_price,
            couponCodes: currPage.data.couponCodes,
            indChooseCoupon: currPage.data.indChooseCoupon,
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        clearInterval(this.data.timer);
        clearInterval(this.data.activity_timeDevice);
        clearInterval(this.data.activity_pageHeightDevice);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        clearInterval(this.data.timer);
        clearInterval(this.data.activity_timeDevice);
        clearInterval(this.data.activity_pageHeightDevice);
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
            operation_show: false,
        })
    },

    //监听屏幕滚动 判断上下滚动  
    onPageScroll: function (ev) {
        if (ev.scrollTop > this.data.prePadingTop - this.data.windowHeight) {
            this.setData({
                operation_show: false,
            })
        } else {
            this.setData({
                operation_show: true,
            })
        }
    },

    handleChange(e) {
        // console.log(e)
        let startDeliveryTime = util.tsFormatTime(new Date(e.detail.dateString).getTime(), "Y-M-D h:m");
        this.setData({
            startDeliveryTime: startDeliveryTime
        })
    },

    /**浏览时长统计 */
    postStayTime() {
        if (!wx.getStorageSync('user')) {
            clearInterval(this.data.timer);
            return;
        }
        http.post(
            app.globalData.host + "collect/pingGoodView", {
                eventCode: this.data.eventCode,
                stayTime: app.globalData.stayTime,
                merchantCode: this.data.business_detail.storeCode,
                userId: wx.getStorageSync('user').id,
                scene: this.data.scene == "" ? "wxapp" + this.data.business_detail.merchant.code : this.data.scene,
                sceneDT: this.data.sceneDT,
                h5Once: this.data.startTime,
                batchShare: app.globalData.batchShare,
                visitor: wx.getStorageSync('visitor'), //游客标识
                productCode: this.data.business_detail.product.code ? this.data.business_detail.product.code : '',
                higherLevelCode: app.globalData.higherLevelCode,
                clerkUserCode: this.data.clerk_code ? this.data.clerk_code : '',
                accessRoutes: app.globalData.accessRoutes,
                routesDescribe: app.globalData.routesDescribe,
                pageId: "pages/tabBar_index/business_detail/business_detail",
                pageDescribe: "商品详情页",
                progress: this.data.progress > 100 ? 100 : this.data.progress,
            },
            (status, resultCode, message, data) => {
                // console.log("商品统计时间", this.data.stayTime);
            },
            (status, resultCode, _message, data) => {

            }
        );

    },

    showShareBtn: function () {
        if (wx.getStorageSync('user')) {
            this.setData({
                showBtn: !this.data.showBtn
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (e) {
        if (e.from === 'button' && e.target.dataset.operate === "diedeile") {
           this.goH5Diediele()
            return {
                title: this.data.business_detail.title,
                path: "pages/diedeile/diediele?shareUserId=" + wx.getStorageSync('user').id + "&eventCode="+ this.data.eventCode,
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
        // }
    }
        else{
            let clerk_code = this.data.clerkState ? wx.getStorageSync('user').userCode : this.data.clerk_code;
            //叠叠乐传的分享人id
            let shareUserId = this.data.sharePlay && this.data.sharePlay.isOpen && this.data.sharePlay.isOpen == '1' ? wx.getStorageSync('user').id : '';
            let skuProperties = shareUserId ? this.data.choose_skuProperties : ''
            if (wx.getStorageSync('user')) {
                app.Shareacquisition(this.data.shareType, this.data.business_detail.merchant.code, this.data.eventCode, this.data.business_detail.product.code, null, clerk_code, null, null)
            }
            this.shareAttendByReward();
            this.setData({
                showBtn: false,
                forwarding: true,
            })
            return {
                title: this.data.business_detail.title,
                path: "pages/tabBar_index/business_detail/business_detail?code=" + this.data.business_detail.code + (wx.getStorageSync('user') ? ("&higherLevelCode=" + wx.getStorageSync('user').userCode) : "") + "&activityType=" + this.data.business_detail.typeCode + "&clerk_code=" + clerk_code + '&batchShare=' + app.globalData.batchShare + '&shareUserId=' + shareUserId + '&skuProperties=' + escape(skuProperties),
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
     * 获取参加用户人数
     */
    getJoinUser: function () {
        http.get(
            app.globalData.business_host + "/browsrecord/scanPersonList", {
                eventCode: this.data.eventCode,
                count: 47,
            },
            (status, resultCode, message, data) => {
                if (data.count > 0) {
                    // let temp = this.handleJoinUser(data.orderUserlist);
                    // if (temp && temp.length > 47) {
                    //   temp.length = 47;
                    // }

                    this.setData({
                        join_user_list: data.orderUserlist,
                        join_user_num: data.count,
                    });
                }

            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },

    /**
     * 处理参与用户数据
     */
    handleJoinUser: function (array) {
        // console.log("处理参与用户数据")
        // console.log(array)
        var array = array;
        var new_array = [];
        let map = {};
        if (array.length >= 5) {
            for (let i = array.length - 1; i > array.length - 5; i--) {
                array[i].createdTime = util.tsFormatTime(array[i].createdTime, "Y年M月D日");
                array[i].createdTime = util.tsFormatTime(array[i].modifiedTime, "Y年M月D日");
                if (array[i].user.nickname.length > 0) {
                    array[i].user.nickname = array[i].user.nickname[0] + "**";
                }
                if (map[array[i].user.id]) {
                    array.splice(i, 1);
                } else {
                    map[array[i].user.id] = true;
                    new_array = new_array.concat(array[i]);
                }
            }
        } else {
            for (let i = array.length - 1; i >= 0; i--) {
                array[i].createdTime = util.tsFormatTime(array[i].createdTime, "Y年M月D日");
                array[i].createdTime = util.tsFormatTime(array[i].modifiedTime, "Y年M月D日");
                if (array[i].user.nickname.length > 0) {
                    array[i].user.nickname = array[i].user.nickname[0] + "**";
                }
                if (map[array[i].user.id]) {
                    array.splice(i, 1);
                } else {
                    map[array[i].user.id] = true;
                    new_array = new_array.concat(array[i]);
                }
            }
        }
        return new_array
    },


    /**
     * 展示企业号码列表
     */
    showBusinessPhoneList: function () {
        if (this.data.business_detail.showStorePhone != 1) {
            wx.showToast({
                title: '企业设置了隐私保护',
                icon: "none"
            })
            return
        }
        if (!this.data.business_phone) {
            wx.showToast({
                title: '暂无联系方式',
                icon: "none"
            })
        } else {
            this.setData({
                show_business_phone: !this.data.show_business_phone
            });
        }


    },

    /**
     * 处理取出来的互动详情
     */
    handleBusinessDetail: function (obj) {
        //生鲜特有判断 start
        if (obj.product.typeCode == "fresh") {
            let lastDeliveryStartTime = ""
            let lastDeliveryEndTime = ""
            if (util.isSameDate(obj.product.lastDeliveryStartTime, obj.product.lastDeliveryEndTime)) {
                lastDeliveryStartTime = util.tsFormatTime(obj.product.lastDeliveryStartTime, "M月D日 h:m")
                lastDeliveryEndTime = util.tsFormatTime(obj.product.lastDeliveryEndTime, "h:m")
            } else {
                lastDeliveryStartTime = util.tsFormatTime(obj.product.lastDeliveryStartTime, "M月D日 h:m")
                lastDeliveryEndTime = util.tsFormatTime(obj.product.lastDeliveryEndTime, "M月D日 h:m")
            }
            // console.log(lastDeliveryStartTime)
            // console.log(lastDeliveryEndTime)
            this.setData({
                fresh_flag_z_index: 2,
                lastDeliveryStartTime: lastDeliveryStartTime,
                lastDeliveryEndTime: lastDeliveryEndTime,
            })
        }
        //生鲜特有判断 end

        //房地产特有判断 start
        if (obj.product.typeCode == "estate") {
            //价格类型
            let priceType = ""
            if (obj.product.orderRealEstateAttach.sellingPriceType == 1) {
                priceType = "售价"
            } else if (obj.product.orderRealEstateAttach.sellingPriceType == 2) {
                priceType = "首付"
            } else if (obj.product.orderRealEstateAttach.sellingPriceType == 3) {
                priceType = "面议"
            }
            obj.product.orderRealEstateAttach.priceType = priceType

            //显示价格
            let displayPrice = ""
            if (obj.product.orderRealEstateAttach.isNegotiable == 0) {
                displayPrice = "￥" + obj.product.orderRealEstateAttach.price
            } else {
                displayPrice = "价格面议"
            }
            obj.product.orderRealEstateAttach.displayPrice = displayPrice

            //地图标记点
            let markers = []
            let markerItem = {}
            markerItem.id = 0
            markerItem.latitude = obj.product.orderRealEstateAttach.lat
            markerItem.longitude = obj.product.orderRealEstateAttach.lng
            markerItem.title = obj.product.orderRealEstateAttach.title
            markerItem.iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/position%403x.png"
            markerItem.width = 30
            markerItem.height = 30
            markers.push(markerItem)
            this.setData({
                projectLocal: markerItem,
                markers: markers,
            })

            //其他户型
            for (let i in obj.product.orderRealEstateAttach.estateUnitInfos) {
                let item = obj.product.orderRealEstateAttach.estateUnitInfos[i]
                let displayPrice = ""
                if (item.sellingPriceType == 1) {
                    displayPrice = "售价："
                    if (item.isNegotiable == 0) {
                        displayPrice = displayPrice + item.price
                    } else {
                        displayPrice = displayPrice + "咨询价格"
                    }
                } else if (item.sellingPriceType == 2) {
                    displayPrice = "首付："
                    if (item.isNegotiable == 0) {
                        displayPrice = displayPrice + item.price
                    } else {
                        displayPrice = displayPrice + "咨询价格"
                    }
                } else if (item.sellingPriceType == 3) {
                    displayPrice = "价格面议"
                }
                item["displayPrice"] = displayPrice

                for (let j in item.medias) {
                    let mediaObj = item.medias[j]
                    if (mediaObj.type == "image") {
                        item["image"] = mediaObj.url
                        break
                    }
                }
            }

            //项目周边
            let estateSurroundingTags = []
            for (let i in obj.product.orderRealEstateAttach.estateSurroundingInfos) {
                let estateSurroundingInfo = obj.product.orderRealEstateAttach.estateSurroundingInfos[i]
                let tempTags = (estateSurroundingInfo.title.substring(1, estateSurroundingInfo.title.length - 1)).split(",")
                for (let j in tempTags) {
                    let estateSurroundingTagItem = {}
                    estateSurroundingTagItem.name = tempTags[j]
                    switch (tempTags[j]) {
                        case "交通":
                            estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_bus_gray.png"
                            estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_bus.png"
                            break;
                        case "学校":
                            estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_school_gray.png"
                            estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_school.png"
                            break;
                        case "医院":
                            estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_hospital.png"
                            estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_hospital-blue.png"
                            break;
                        case "购物":
                            estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_shopping_cart.png"
                            estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_shopping_cart-blue.png"
                            break;
                        case "餐饮":
                            estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_ranstuarant_gray.png"
                            estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_ranstuarant.png"
                            break;
                        case "银行":
                            estateSurroundingTagItem.icon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_bank_gray.png"
                            estateSurroundingTagItem.iconSelected = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/icon_bank.png"
                            break;
                        default:
                            break;
                    }
                    estateSurroundingTags.push(estateSurroundingTagItem)
                }
            }
            obj.product.orderRealEstateAttach.estateSurroundingTags = estateSurroundingTags

            //VR看房
            if (obj.product.orderRealEstateAttach.panoramicUrl && obj.product.orderRealEstateAttach.panoramicUrl != "") {
                this.setData({
                    vrUrl: obj.product.orderRealEstateAttach.panoramicUrl,
                    selectedDisplayType: "vr",
                })
            }

            //组建项目周边数据
            let projectMapTag = obj.product.orderRealEstateAttach.estateSurroundingInfos[0].title
            let mapData = {
                latitude: obj.product.orderRealEstateAttach.lat,
                longitude: obj.product.orderRealEstateAttach.lng,
                title: obj.product.orderRealEstateAttach.title
            }
            this.setData({
                mapData: mapData,
                projectMapTag: projectMapTag,
            })
        }
        //房地产特有判断 end

        if (obj.fileJson) {
            obj.fileJson = JSON.parse(obj.fileJson);
            obj.illustration = obj.fileJson.illustration;
        }
        obj.product.price = util.priceSwitch(obj.product.price);
        obj.discountPrice = util.priceSwitch(obj.discountPrice);
        obj.dis = app.getDisance(obj.merchant.lat, obj.merchant.lng);

        this.operateShowZTDZ(obj)
        this.operateLogistics(obj)
        //补全库存与重量
        let onshelfSkus = obj.onshelf.onshelfSkus
        for (let i in onshelfSkus) {
            let onshelfSkuObj = onshelfSkus[i]
            for (let j in obj.product.skus) {
                if (onshelfSkuObj.properties == obj.product.skus[j].properties) {
                    onshelfSkuObj["stock"] = obj.product.skus[j].stock
                    onshelfSkuObj["weight"] = obj.product.skus[j].weight
                    onshelfSkuObj["damagePriceYuan"] = obj.product.skus[j].damagePriceYuan
                }
            }
        }

        //==== 商品状态判断 start ====
        let goodsStatus = 1
        if (obj.status != 1) {
            goodsStatus = obj.status
        }
        if (obj.product) {
            goodsStatus = obj.product.status != 1 ? obj.product.status : goodsStatus
            goodsStatus = obj.product.store.status != 1 ? obj.product.store.status : goodsStatus
            let totalStock = 0
            for (let i in obj.product.skus) {
                let temp = obj.product.skus[i]
                totalStock = totalStock + temp.stock
            }
            if (totalStock == 0) {
                goodsStatus = 0
            }
        }

        //==== 商品状态判断 end ====

        let messageText = [];
        if (obj.product && obj.product.attachSpecList && obj.product.attachSpecList.length > 0) {
            for (let i in obj.product.attachSpecList) {
                for (let j in obj.product.attachSpecList[i].values) {
                    let name = obj.product.attachSpecList[i].values[j];
                    obj.product.attachSpecList[i].values[j] = {
                        name: name,
                        isSelect: j == 0 ? true : false
                    }
                }
                messageText.push({
                    text: obj.product.attachSpecList[i].text,
                    value: obj.product.attachSpecList[i].text + ':' + obj.product.attachSpecList[i].values[0].name
                });
            }
        }
        this.setData({
            messageText: messageText,
            orderMessage: (obj.product && obj.product.attachSpecList) ? obj.product.attachSpecList : [],
            skus: onshelfSkus,
            sku_priceYuan: obj.onshelf.onshelfSkus[0].priceYuan,
            sku_url: obj.onshelf.onshelfSkus[0].url,
            sku_stock: obj.product.skus[0].stock ? obj.product.skus[0].stock : "",
            sku_weight: obj.product.skus[0].weight ? obj.product.skus[0].weight : 1,
            product_activityType: obj.product.typeCode,
            product_activityMask: obj.addressType,
            damagePriceYuan: obj.product.skus[0].damagePriceYuan ? obj.product.skus[0].damagePriceYuan : "",
            endtime_display: util.tsFormatTime(obj.onshelf.endTime, "Y-M-D h:m:s"),
            goodsStatus: goodsStatus,
            goodsFavorites: obj.isFavorites == 0 ? false : true,
            certified: obj.merchant.certified == 1 ? true : false,
        });
        // console.log(this.data.messageText);
        // console.log(this.data.orderMessage);
        let array = obj.onshelf.onshelfSkus;
        let arrayLength = obj.onshelf.onshelfSkus.length;
        array.sort(function (a, b) {
            return a.price - b.price
        })
        this.setData({
            minPrice: obj.onshelf.onshelfSkus[0].priceYuan,
            maxPrice: obj.onshelf.onshelfSkus[arrayLength - 1].priceYuan,
        });
        if (!this.data.choose_skuProperties) {
            this.getSpecList(obj.productCode);
        } else {
            this.matchingSku();
        }
        app.globalData.goodsDetail = obj.product
        return obj
    },

    /**便捷备注选择 */
    chooseOrderMsg(e) {
        let value = e.currentTarget.dataset.value;
        let text = e.currentTarget.dataset.text;
        let orderMessage = this.data.orderMessage;
        for (let i in orderMessage) {
            if (text == orderMessage[i].text) {
                for (let j in orderMessage[i].values) {
                    if (value.name == orderMessage[i].values[j].name) {
                        orderMessage[i].values[j].isSelect = true;
                    } else {
                        orderMessage[i].values[j].isSelect = false;
                    }
                }
            }

        }
        for (let k in this.data.messageText) {
            if (text == this.data.messageText[k].text) {
                this.data.messageText[k].value = text + ':' + value.name;
            }
        }
        // console.log(this.data.messageText);
        // console.log(orderMessage);
        this.setData({
            orderMessage: orderMessage
        });
    },

    /**
     * 时间倒计时
     */
    countTime: function () {
        if (this.data.product_activityType == "estate") {
            return
        }
        var startDate = ""
        var endDate = ""
        if (this.data.business_detail.product.typeCode == 'fresh') {
            startDate = new Date(util.tsFormatTime(this.data.business_detail.startTime, "Y/M/D h:m:s"));
            endDate = new Date(util.tsFormatTime(this.data.business_detail.product.lastDeadline, "Y/M/D h:m:s"));
        } else {
            startDate = new Date(util.tsFormatTime(this.data.business_detail.startTime, "Y/M/D h:m:s"));
            endDate = new Date(util.tsFormatTime(this.data.business_detail.endTime, "Y/M/D h:m:s"));
        }

        //获取开始时间  
        var nowStartDate = startDate.getTime();
        //获取结束时间  
        var end = endDate.getTime();
        //当前时间
        var date = new Date();
        var now = date.getTime();

        if (now > end) {
            //已结束
            this.setData({
                activityTime: false,
                freshOvertimeTips: true,
                freshNextRound: true,
            });
            clearInterval(this.data.activity_timeDevice);
        } else if ((now - nowStartDate) > 0) {
            //时间差  
            var leftTime = end - now;
            //定义变量 d,h,m,s保存倒计时的时间  
            var d, h, m, s, month, day;
            if (leftTime > 0) {
                d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                month = Math.floor(leftTime / 1000 / 60 / 60 / 24 / 30);
                day = Math.floor(leftTime / (1000 * 60 * 60 * 24) % 30);
                h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                // h = Math.floor(leftTime / 1000 / 60 / 60);
                m = Math.floor(leftTime / 1000 / 60 % 60);
                s = Math.floor(leftTime / 1000 % 60);
                this.setData({
                    activityTime_d: d,
                    activityTime_h: (h < 10 ? "0" + h : h),
                    activityTime_m: (m < 10 ? "0" + m : m),
                    activityTime_s: (s < 10 ? "0" + s : s),
                    activityTime_month: (month < 10 ? "0" + month : month),
                    activityTime_day: (day < 10 ? "0" + day : day),
                    activityTime: true,
                });
            }
        }
    },

    /** 判断是共享合伙人（业务员)、事业合伙人（业务经理）、商家 */
    checkClerkApply: function () {
        http.get(
            app.globalData.host + "biz/user/merchant/clerk/checkSalesman", {
                merchantCode: this.data.business_detail.storeCode,
                userCode: this.data.clerk_code
            },
            (_status, _resultCode, _message, data) => {
                //0是共享合伙人（业务员），1是事业合伙人（业务经理），2是企业管理员（老板）
                if (!data) {
                    if (this.data.business_detail.merchant.phone && this.data.business_detail) {
                        this.setData({
                            // business_phone: data.business_detail.merchant.phone.split(",")
                        });
                    }
                } else {
                    this.setData({
                        // business_phone: data.clerk.phone.split(',')
                    });
                }
            },
            (_status, _resultCode, _message, data) => {}
        );
    },

    /**
     * 联系企业
     */
    contactBusiness: function (e) {
        var business_phone = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: business_phone
        })
    },

    /**
     * 跳转至企业首页(需要雷达采集)
     */
    jumpBusinessHomePage: function (e) {
        wx.navigateTo({
            url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.business_detail.merchant.code + '&higherLevelCode=' + app.globalData.higherLevelCode + '&userId=' + this.data.business_detail.merchant.userId + '&tagCode=' + e.currentTarget.dataset.tagcode + '&showStorePhone=' + this.data.business_detail.showStorePhone + '&sceneType=order' + this.data.business_detail.merchant.code + '&sceneDT=' + this.data.eventCode,
        })
    },

    /**
     * 是否展示玩法详情
     */
    tabExplainDetail: function () {
        wx.navigateTo({
            url: "/pages/web_view_html/web_view_html?webUrl=https://oss.vicpalm.com/static/weclubbing/protocol-zcrs/how_to_play.html",
        })
    },

    /**
     * 分享后参加互动
     */
    shareAttendByReward: function () {
        let funName = ""
        if (this.data.activityType == "discount") {
            funName = "discountevent/attend"
        } else if (this.data.activityType == "reward") {
            funName = "rewardevent/attend"
        } else if (this.data.activityType == "inreward") {
            funName = "internalrewardevent/attend"
        } else if (this.data.activityType == "original") {
            funName = "originalevent/attend"
        } else if (this.data.activityType == "universalRebate") {
            funName = "rebateevent/attend"
        }
        if (this.data.product_activityType != "estate" && !this.data.activityTime) {
            wx.showToast({
                title: '活动已结束',
                icon: "none"
            })
            return
        }
        http.post(
            app.globalData.business_host + funName, {
                eventCode: this.data.eventCode
            },
            (status, resultCode, message, data) => {
                this.setData({
                    isShare: true,
                });
                if(!this.data.sharePlay){
                    this.getCouponList();
                }
            },
            (status, resultCode, message, data) => {
                if (resultCode == "duplicate_error") {}
                if (resultCode == "repeated_error") {
                    wx.showModal({
                        title: message,
                        content: '',
                    })
                }
            }
        );
    },


    //图片点击事件查看大图
    imgYu: function (event) {
        var src = event.currentTarget.dataset.src; //获取data-src
        var imgList = event.currentTarget.dataset.list; //获取data-list

        //图片预览
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: imgList, // 需要预览的图片http链接列表
            success: res => {},
            fail: res => {}
        })
    },

    /**
     * 通知父级页面，把onPhone设置为true
     */
    setNoPhone: function (e) {
        if (!wx.getStorageSync('user').phone) {
            this.setData({
                noPhone: true
            });
        } else {
            this.setData({
                noPhone: false
            });
        }
        if (wx.getStorageSync('user')) {
            this.setDefaultAaddr();
        }
    },


    /**********绑定号码部分 start************** */
    /**
     * 获取手机号码
     */
    getPhoneNumber: function (e) {
        if (e.detail.encryptedData) {
            if (this.data.session_key) {
                this.decrypt_wxml(e.detail.encryptedData, e.detail.iv);
            } else {
                this.authorization_wxml_phone(e.detail.encryptedData, e.detail.iv);
            }
        }
    },

    /**
     * 绑定手机号获取sesson——key
     */
    authorization_wxml_phone: function (encryptedData, iv) {
        wx.login({
            success: res => {
                this.setData({
                    wxCode: res.code
                });
                // http.post(
                //   app.globalData.host + 'wechat/authorization_wxml2', {
                //     code: this.data.wxCode,
                //   },
                http.post(
                    app.globalData.host + 'wechat/authorization_minpro', {
                        code: this.data.wxCode,
                        appid: app.globalData.appId
                    },
                    (status, resultCode, message, data) => {
                        this.setData({
                            session_key: data.session_key,
                        });
                        this.decrypt_wxml(encryptedData, iv);

                    },
                    (status, resultCode, message, data) => {}
                );
            },
            fail: res => {
                wx.showToast({
                    title: '获取登陆信息失败,请重新登陆',
                    icon: "none"
                })
            }
        })
    },

    /**
     * 获取手机号码
     */
    decrypt_wxml: function (encryptedData, iv) {
        http.post(
            app.globalData.host + 'wechat/decrypt_wxml', {
                sessionKey: this.data.session_key,
                encryptedData: encryptedData,
                ivData: iv
            },
            (status, resultCode, message, data) => {
                var temp = JSON.parse(data)
                this.bindWXPhone(temp.phoneNumber);
            },
            (status, resultCode, message, data) => {}
        );
    },



    /**
     * 绑定手机
     */
    bindWXPhone: function (phone) {
        http.post(
            app.globalData.host + 'personal/cert/savePhone', {
                phone: phone,
                wxPhone: phone
            },
            (status, resultCode, message, data) => {
                wx.showToast({
                    title: '绑定成功',
                    icon: "none"
                })

                let user = wx.getStorageSync('user');
                user.phone = phone;
                wx.setStorageSync('user', user)
                this.setData({
                    noPhone: false
                });
            },
            (status, resultCode, message, data) => {}
        );
    },
    /**********绑定号码部分 end**************** */

    /** 处理资源 */
    handleRes: function () {
        if (this.data.business_detail) {
            let assets = this.data.business_detail.illustration
            let existVideo = false
            let imgList = []
            let videoUrl = ''
            for (let i in assets) {
                let assetUrl = assets[i]
                if (util.getUrlType(assetUrl)) {
                    existVideo = true
                    videoUrl = assetUrl;
                    this.getFastVideoUrl(videoUrl);
                } else {
                    imgList.push(assetUrl)
                }
            }
            this.setData({
                imgList: imgList,
                existVideo: existVideo,
                selectedDisplayType: this.data.vrUrl == "" ? existVideo ? "vid" : "img" : "vr",
            })
            this.saveShareInfo()
        }
    },

    /** 切换显示 */
    changeShow: function (e) {
        this.setData({
            selectedDisplayType: e.currentTarget.dataset.type,
            videoAutoPlay: e.currentTarget.dataset.type == "vid" ? true : false,
        })
    },


    /**
     * 获取点播地址
     */
    getFastVideoUrl: function (videoUrl) {
        let strVod = "https://vod.vicpalm.com/";
        let strOutin = "https://outin";
        let current = videoUrl;
        if (current.indexOf(strVod) > -1) {

        } else if (current.indexOf(strOutin) > -1) {

        } else {
            http.get(
                app.globalData.host + "convert/vod/info", {
                    srcUri: current
                },
                (status, resultCode, message, data) => {
                    this.setData({
                        videoURL: data.desUri ? data.desUri : data.srcUri
                    });
                },
                (status, resultCode, message, data) => {

                }
            );
        }
    },
    /**
     * 获取30天内销售量
     */
    getParams: function (eventCode) {
        http.get(
            app.globalData.business_host + "product/getParams", {
                productCode: eventCode
            },
            (status, resultCode, message, data) => {
                this.setData({
                    sold: data.orderNum
                });
            },
            (status, resultCode, message, data) => {

            }
        );
    },

    /**
     * 去首页(需要雷达采集)
     */
    toIndex: function () {
        let merchantCode = ""
        if (this.data.business_detail.merchant) {
            merchantCode = this.data.business_detail.merchant.code
        }
        if (merchantCode == "" && wx.getStorageSync('merchant_code')) {
            merchantCode = wx.getStorageSync('merchant_code')
        }
        if (merchantCode == "") {
            merchantCode == app.globalData.defaultMerchantCode
        }
        wx.navigateTo({
            url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + merchantCode + '&higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=order' + this.data.business_detail.merchant.code + '&sceneDT=' + this.data.eventCode,
        })
    },

    /** 减少数量 */
    delQuantity: function () {
        let num = this.data.quantity
        if (num > 1) {
            num = num - 1
        }
        this.setData({
            quantity: num,
            indChooseCoupon: false
        })
        this.operatePrice()
        if (this.data.enableMember) {
            this.getBestCoupon(this.data.onshelfCode)
        }

    },

    /** 增加数量 */
    addQuantity: function () {
        if (num >= this.data.sku_stock) {
            return
        }
        let num = this.data.quantity
        if (num < this.data.sku_stock) {
            num = num + 1
        }
        this.setData({
            quantity: num,
            indChooseCoupon: false
        })
        this.operatePrice()
        if (this.data.enableMember) {
            this.getBestCoupon(this.data.onshelfCode)
        }

    },

    /** 设置编辑状态 */
    setEdit: function (e) {
        if (e.currentTarget.dataset.type == "name") {
            this.setData({
                nameEnable: true,
            })
        } else if (e.currentTarget.dataset.type == "phone") {
            this.setData({
                phoneEnable: true,
            })
        } else if (e.currentTarget.dataset.type == "addr") {
            this.setData({
                addrEnable: true,
            })
        } else if (e.currentTarget.dataset.type == "memo") {
            this.setData({
                memoEnable: true,
            })
        } else {
            this.setData({
                isEdit: true,
            })
        }
    },

    cancelEdit: function () {
        this.setData({
            isEdit: false,
            nameEnable: false,
            phoneEnable: false,
            addrEnable: false,
        })
    },

    /** 数量输入 */
    numInput: function (e) {
        this.setData({
            quantity: e.detail.value,
        })
        this.operatePrice()
    },

    nameInput: function (e) {
        this.setData({
            name: e.detail.value,
        })
    },

    phoneInput: function (e) {
        this.setData({
            phone: e.detail.value,
        })
    },

    addrInput: function (e) {
        this.setData({
            addr: e.detail.value,
        })
    },

    memoInput: function (e) {
        this.setData({
            order_message: e.detail.value,
        })
    },

    /** 立即购买 直到底部 */
    toBottom: function () {
        wx.pageScrollTo({
            scrollTop: 500000,
        })
        this.setData({
            operation_show: false,
        })
    },

    unitChange: function () {
        this.setData({
            saveAddr: !this.data.saveAddr,
        })
    },

    open: function (e) {
        let sure = e.currentTarget.dataset.sure;
        this.setData({
            condition: !this.data.condition
        })
        if (sure) {
            this.matchCity(this.data.provincesList[this.data.addrIndex[0]].code, this.data.addrIndex);
        }
    },

    /**
     * 地址改变时触发
     */
    bindChange: function (e) {
        let addrIndex = e.detail.value;
        this.matchCity(this.data.provincesList[addrIndex[0]].code, addrIndex);
    },

    /**
     * 获取用户默认的收货地址 /customeraddress/default
     */
    setDefaultAaddr: function () {
        if (this.data.order_addr != "" || !this.data.business_detail || !this.data.business_detail.product) {
            return
        }
        //到店产品
        if (this.data.business_detail.product.typeCode == "service" || (this.data.business_detail.product.typeCode == "logistics" && this.data.business_detail.addressType == "merchant")) {
            let obj = {};
            obj.addrdetail = this.data.business_detail.merchant.addr
            obj.name = this.data.business_detail.merchant.userName
            obj.phone = this.data.business_detail.merchant.userPhone
            obj.provinceCode = this.data.business_detail.provinceCode
            obj.provinceName = this.data.business_detail.provinceName
            obj.cityCode = this.data.business_detail.cityCode
            obj.cityName = this.data.business_detail.cityName
            obj.areaCode = this.data.business_detail.areaCode
            obj.areaName = this.data.business_detail.areaName
            this.setData({
                serviceAddr: obj,
                order_addr: obj,
            });
            this.getBestCoupon(this.data.business_detail.onshelfCode)
            wx.hideLoading()
        } else {
            this.getDefaultAddrs();
        }
    },

    /** 获取默认地址 */
    getDefaultAddrs() {
        http.get(
            app.globalData.business_host + "customeraddress/default", {},
            (status, resultCode, message, data) => {
                if (data) {
                    let obj = data;
                    obj.addrdetail = data.provinceName + data.cityName + data.areaName + data.address;
                    obj.name = data.linkman;
                    obj.phone = data.phone;
                    app.globalData.userHarvestAddress = obj;
                    this.setData({
                        order_addr: app.globalData.userHarvestAddress,
                        targetAddr: app.globalData.userHarvestAddress.cityName,
                    });
                    //虚拟、定金商品设置用户名与电话 start
                    if (this.data.business_detail.product.typeCode == "virtual" || this.data.business_detail.product.typeCode == "deposit" || this.data.business_detail.product.typeCode == 'estate') {
                        let phoneStr = ""
                        if (data.phone != null && data.phone != "") {
                            phoneStr = data.phone
                        }
                        if (phoneStr == "") {
                            phoneStr = wx.getStorageSync('user').phone
                        }
                        this.setData({
                            name: data.linkman != null && data.linkman != '' ? data.linkman : "",
                            phone: phoneStr,
                        })
                    }
                    //虚拟、定金商品设置用户名与电话 end
                    this.getBestCoupon(this.data.business_detail.onshelfCode)
                }
                this.getLogisticsCharge()
                wx.hideLoading()
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },

    /**
     * 获取优惠券（其他商品）
     */
    getCouponList: function () {
        http.get(
            app.globalData.business_host + "coupon/myCouponList", {
                onshelfCode: this.data.business_detail.onshelfCode,
                skuProperties: this.data.choose_skuProperties,
                // type:this.data.sharePlay?'share':null
            },
            (status, resultCode, message, data) => {
                if (data.length > 0) {
                    this.setData({
                        operation: data[0].operation,
                        isShare: true,
                    })
                }
                this.setData({
                    couponList: data,
                    couponIdList: this.handleCouponList(data)
                });
                this.countSingleDiscount();
                // this.getBestCoupon(this.data.business_detail.onshelfCode)
                wx.hideLoading();
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },
        /**
     *获取优惠券（叠叠乐活动商品）
     */
    diedieleCoupon: function () {
        http.get(
            app.globalData.business_host + "coupon/getShareCouponList", {
                onshelfCode: this.data.business_detail.onshelfCode,
                skuProperties: this.data.choose_skuProperties,
                // type:this.data.sharePlay?'share':null
            },
            (status, resultCode, message, data) => {
                if (data.length > 0) {
                    this.setData({
                        operation: data[0].operation,
                        isShare: true,
                    })
                }
                this.setData({
                    couponList: data,
                    couponIdList: this.handleCouponList(data)
                });
                this.countSingleDiscount();
                // this.getBestCoupon(this.data.business_detail.onshelfCode)
                wx.hideLoading();
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },

    /**
     * 处理优惠券列表
     */
    handleCouponList: function (array) {
        let obj = [];
        for (let i = 0; i < array.length; i++) {
            obj = obj.concat(array[i].id)
        }
        return obj;
    },

    /**
     * 计算价格
     */
    countSingleDiscount: function () {
        let total_price = 0 //总价

        //分享优惠券 start
        let discount_price = 0
        let couponList = this.data.couponList
        for (let i = 0; i < couponList.length; i++) {
            let couponObj = couponList[i]
            if (couponObj.typeCode == "pay") {
                if (couponObj.operation == "add_and_multiply") {
                    discount_price = discount_price + (couponObj.value / 100) * this.data.quantity
                } else if (couponObj.operation == "add") {
                    discount_price = discount_price + (couponObj.value / 100)
                }
            }
        }
        //分享优惠券 end

        //计算物流运费 start
        let logisticsPrice = 0
        //未配置物流模板，则默认为物流
        if (this.data.logisticsInfo != "" && this.data.logisticsInfo.areaType == 2) {
            //获取重量
            let weight = 1
            let prodouctSku = this.data.business_detail.product.skus
            for (let i in prodouctSku) {
                if (prodouctSku[i].properties == this.data.choose_skuProperties) {
                    weight = prodouctSku[i].weight
                }
            }
            //计算运费
            logisticsPrice = util.countLogisticsPrice(this.data.business_detail.product.orderLogisticsTemple.chargeType, this.data.logisticsInfo.basicPrice, this.data.logisticsInfo.increasePrice, this.data.quantity, weight, this.data.logisticsInfo.proBasicNum, this.data.logisticsInfo.increaseNum, this.data.freePostageNum)
        }
        //计算物流运费 end

        total_price = (this.data.sku_priceYuan * this.data.quantity) - discount_price + logisticsPrice / 100
    //  console.log('ffffffffffffaaaaaaaaaaaa',this.data.sku_priceYuan,this.data.quantity,discount_price,logisticsPrice / 100,total_price)
        //扣除VIP优惠劵金额
        // if (this.data.indChooseCoupon) { //自主选择优惠劵
        //     total_price = total_price - Number(this.data.vipDiscount)
        // } else { //系统默认优惠劵
        //     total_price = (total_price - this.data.vipCouponPrice / 100).toFixed(2)
        // }

        //判断VIP劵后价格是否扣除其他折扣
        // let total_vip_price = this.data.total_vip_price
        // let tvpHasDp = this.data.tvpHasDp
        // if (total_vip_price != 0 && discount_price != 0 && !tvpHasDp) {
        //     total_vip_price = Number(total_vip_price) - Number(discount_price)
        //     if (total_vip_price < 0) {
        //         total_vip_price = 0
        //     }
        //     tvpHasDp = true
        // }

        //计算会员预充值可以抵用金额 start
        // let usableCredit = 0
        // let tp = total_vip_price != 0 ? total_vip_price : total_price
        // if (Number(total_vip_price) == 0 && total_price != 0) {
        //     tp = tp - Number(this.data.vipDiscount)
        //     if (tp < 0) {
        //         tp = 0
        //     }
        // }
        // if (this.data.rechargeBalance < tp * 100) {
        //     usableCredit = this.data.rechargeBalance
        // } else {
        //     usableCredit = tp * 100
        // }

        // if (this.data.rechargeBalance < total_price * 100) {
        //     usableCredit = this.data.rechargeBalance
        // } else {
        //     usableCredit = total_price * 100
        // }

        // if (this.data.useMemberRecharge) {
        //     total_price = total_price - usableCredit / 100
        // }
        //计算会员预充值可以抵用金额 end

        // if (this.data.useMemberRecharge && Number(total_vip_price) > 0) {
        //     total_vip_price = Number(total_vip_price) - usableCredit / 100
        // }

        this.setData({
            logisticsPrice: logisticsPrice / 100,
            discount_price: discount_price,
            total_price: Number(total_price).toFixed(2),
            // usableCredit: usableCredit,
            // total_vip_price: total_vip_price,
            //   : tvpHasDp,
        });
    },

    /** 运算价格 */
    operatePrice: function () {
        this.countSingleDiscount()
        let dataObj = this.data.business_detail
        let discountPrice = 0
        dataObj["spzj"] = (this.data.sku_priceYuan * this.data.quantity).toFixed(2)
        let damagePriceTotal = (this.data.damagePriceYuan * this.data.quantity).toFixed(2)
        this.setData({
            business_detail: dataObj,
            damagePriceTotal: damagePriceTotal,
        })
    },

    /**
     * 获取企业基本信息
     */
    getBusinessInfo: function () {
        http.get(
            app.globalData.host + "biz/user/merchant/info", {
                merchantCode: this.data.business_detail.storeCode,
            },
            (status, resultCode, message, data) => {
                this.setData({
                    businessInfo: data,
                });
                this.getBossInfo()
                wx.hideLoading()
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },
    getBossInfo: function () {
        http.get(
            app.globalData.host + "personal/info", {
                userId: this.data.businessInfo.userId
            },
            (status, resultCode, message, data) => {
                this.setData({
                    bossUserCode: data.code,
                });
                wx.hideLoading()
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },

    /***
     * 提交订单
     */
    submissionOrder: function () {
        //物流商品需要检测是否获取用户授权
        if (this.data.business_detail.product.typeCode == "logistics" && this.data.business_detail.addressType == "user") {
            //未允许位置授权
            if (!app.globalData.userLocation_scope) {
                //拒绝位置授权
                if (app.globalData.userLocationReject) {
                    this.setData({
                        resetLocation: true,
                    })
                } else {
                    app.getLocationByUser() //获取用户位置信息
                }
                return
            }
        }
        if (!this.data.submitOrderEnable) {
            wx.showLoading({
                title: '订单提交中...',
                mask: true,
            })
            return
        }
        if (this.data.sku_stock == null || this.data.sku_stock == '') {
            wx.showToast({
                title: '暂无库存',
            })
            return false
        } else {
            let data = {};
            data.lat = this.data.business_detail.lat ? this.data.business_detail.lat : this.data.businessInfo.lat;
            data.lng = this.data.business_detail.lng ? this.data.business_detail.lng : this.data.businessInfo.lng;
            if (this.data.business_detail.product.typeCode == 'baking') {
                if (this.data.startDeliveryTime == '') {
                    wx.showToast({
                        title: '请选择配送时间！',
                        icon: "none"
                    })
                    return;
                } else {
                    let time = new Date().getTime();
                    let startDeliveryTime = new Date(this.data.startDeliveryTime.replace(/-/g, '/')).getTime();
                    if (time > startDeliveryTime) { //烘焙商品
                        wx.showToast({
                            title: '配送时间不能小于等于当前时间，请重新选择！',
                            icon: "none"
                        })
                        return;
                    }
                    data.startDeliveryTime = this.data.startDeliveryTime + ':00';
                    data.endDeliveryTime = this.data.startDeliveryTime + ':00';
                }
            }
            let msg = [];
            if (this.data.messageText.length > 0) {
                for (let i in this.data.messageText) {
                    msg.push(this.data.messageText[i].value)
                }
            }
            msg = msg.join('&');
            data.customerOrderMemo = msg + '&' + this.data.order_message;
            if (this.data.showZTDZ) {
                //到店
                data.name = wx.getStorageSync('user') && wx.getStorageSync('user').name ? wx.getStorageSync('user').name : "";
                data.phone = wx.getStorageSync('user') && wx.getStorageSync('user').phone ? wx.getStorageSync('user').phone : "";
                data.provinceName = this.data.pickAddr.provinceName;
                data.provinceCode = this.data.pickAddr.provinceCode;
                data.cityName = this.data.pickAddr.cityName;
                data.cityCode = this.data.pickAddr.cityCode;
                data.areaName = this.data.pickAddr.areaName;
                data.areaCode = this.data.pickAddr.areaCode;
                data.addr = this.data.pickAddr.addr;

                // console.log('订单提交============',data);return;
                this.setData({
                    orderParam: data
                });
                this.checkOrder();
            } else {
                if (this.data.order_addr != "" || this.data.order_addr) {
                    if (this.data.logisticsStatus === 3) {
                        wx.showToast({
                            title: '该地址不在配送范围，请重新选择收货地址！',
                            icon: "none"
                        })
                        return;
                    }
                    //默认地址
                    data.name = this.data.order_addr.name;
                    data.phone = this.data.order_addr.phone;
                    if (this.data.product_activityType == "fresh") {
                        //生鲜
                        data.provinceName = this.data.pickAddr.provinceName;
                        data.cityName = this.data.pickAddr.cityName;
                        data.areaName = this.data.pickAddr.areaName;
                        data.provinceCode = this.data.pickAddr.provinceCode;
                        data.cityCode = this.data.pickAddr.cityCode;
                        data.areaCode = this.data.pickAddr.areaCode;
                        data.addr = this.data.pickAddr.addr;
                        data.customerOrderMemo = this.data.freshRemarks;
                    }
                    if (this.data.product_activityType != "virtual" && this.data.product_activityType != "deposit" && this.data.product_activityType != "fresh") {
                        data.addr = this.data.order_addr.addrdetail;
                        data.provinceName = this.data.order_addr.provinceName !== "undefined" ? this.data.order_addr.provinceName : "";
                        data.cityName = this.data.order_addr.cityName !== "undefined" ? this.data.order_addr.cityName : "";
                        data.areaName = this.data.order_addr.areaName !== "undefined" ? this.data.order_addr.areaName : "";
                        data.provinceCode = this.data.order_addr.provinceCode !== "undefined" ? this.data.order_addr.provinceCode : "";
                        data.cityCode = this.data.order_addr.cityCode !== "undefined" ? this.data.order_addr.cityCode : "";
                        data.areaCode = this.data.order_addr.areaCode !== "undefined" ? this.data.order_addr.areaCode : "";
                    }
                    // console.log('下单提交信息=========', data);
                    this.setData({
                        orderParam: data
                    });
                    this.checkOrder();
                } else {
                    if (this.data.product_activityType == "fresh" || (this.data.product_activityType == "logistics" && this.data.product_activityMask == 'user')) {
                        //生鲜
                        if (this.data.name != '' && this.data.phone != '' && this.data.addr != '' && this.data.choose_result.length != 0) {
                            data.provinceName = this.data.choose_result[0].name,
                                data.cityName = this.data.choose_result[1].name,
                                data.areaName = this.data.choose_result[2].name,
                                data.provinceCode = this.data.choose_result[0].code,
                                data.cityCode = this.data.choose_result[1].code,
                                data.areaCode = this.data.choose_result[2].code,
                                data.addr = this.data.addr,
                                this.setData({
                                    orderParam: data
                                });
                            this.checkOrder();
                        } else {
                            wx.showToast({
                                title: '请完善收货地址',
                                icon: "none"
                            })
                            return false;
                        }
                    }
                    if (this.data.product_activityType == "virtual" || this.data.product_activityType == "deposit" || this.data.product_activityType == "estate" || this.data.product_activityType == "fresh") {
                        //虚拟、定金、生鲜
                        if (data.name == "" || data.phone == "") {
                            wx.showToast({
                                title: '请填写完整收货信息',
                                icon: "none"
                            })
                            return;
                        } else if (data.name != "" && data.phone == "") {
                            wx.showToast({
                                title: '请填写手机号码',
                                icon: "none"
                            })
                            return;
                        }
                        this.setData({
                            orderParam: data
                        });
                        this.checkOrder();
                    }
                    if (this.data.product_activityType != "virtual" && this.data.product_activityType != "deposit" && this.data.product_activityType != "estate" && this.data.product_activityType != "fresh") {
                        data.provinceName = this.data.addressVal.provinceName;
                        data.cityName = this.data.addressVal.cityName;
                        data.areaName = this.data.addressVal.areaName;
                        data.provinceCode = this.data.addressVal.provinceCode;
                        data.cityCode = this.data.addressVal.cityCode;
                        data.areaCode = this.data.addressVal.areaCode;
                        if (this.data.name != '' && this.data.phone != '' && this.data.addr != '' && this.data.choose_result.length != 0) {
                            data.provinceName = this.data.choose_result[0].name;
                            data.cityName = this.data.choose_result[1].name;
                            data.areaName = this.data.choose_result[2].name;
                            data.provinceCode = this.data.choose_result[0].code;
                            data.cityCode = this.data.choose_result[1].code;
                            data.areaCode = this.data.choose_result[2].code;
                            data.addr = data.provinceName + data.cityName + data.areaName + this.data.addr;
                            if (this.data.logisticsStatus === 3) {
                                wx.showToast({
                                    title: '该地址不在配送范围，请重新选择收货地址！',
                                    icon: "none"
                                })
                                return;
                            }
                            this.setData({
                                orderParam: data
                            });
                            this.checkOrder();
                        } else {
                            wx.showToast({
                                title: '请完善收货地址',
                                icon: "none"
                            })
                            return false;
                        }
                        if (this.data.choose_result.length != 0) {
                            data.provinceName = this.data.choose_result[0].name,
                                data.cityName = this.data.choose_result[1].name,
                                data.areaName = this.data.choose_result[2].name,
                                data.provinceCode = this.data.choose_result[0].code,
                                data.cityCode = this.data.choose_result[1].code,
                                data.areaCode = this.data.choose_result[2].code,
                                data.addr = data.provinceName + data.cityName + data.areaName + this.data.addr;
                        }
                        if (data.name == "" || (this.data.order_addr.addrdetail == "" && (data.provinceName == "" || this.data.addr == ""))) {
                            if (this.data.logisticsStatus === 3) {
                                wx.showToast({
                                    title: '该地址不在配送范围，请重新选择收货地址！',
                                    icon: "none"
                                })
                                return;
                            }
                            wx.showToast({
                                title: '请填写完整收货信息',
                                icon: "none"
                            })
                            return;
                        } else if (data.phone == "") {
                            wx.showToast({
                                title: '请填写手机号码',
                                icon: "none"
                            })
                            return;
                        }
                        this.checkOrder();
                    }
                }
            }
            //虚拟、定金商品手输联系人电话
            if (this.data.product_activityType == "virtual" || this.data.product_activityType == "deposit") {
                data.name = this.data.name
                data.phone = this.data.phone
            }
        }
    },

    /** 订单配送校验 */
    checkOrder: function () {
        if (this.data.product_activityType == "virtual" || this.data.product_activityType == "deposit" || this.data.product_activityType == "estate" || this.data.product_activityType == "fresh") {
            //虚拟、定金、生鲜
            if (this.data.name == "" || this.data.phone == "") {
                wx.showToast({
                    title: '请填写完整收货信息',
                    icon: "none"
                })
                return;
            } else if (this.data.name != "" && this.data.phone == "") {
                wx.showToast({
                    title: '请填写手机号码',
                    icon: "none"
                })
                return;
            }
            if (!regExp.phone(this.data.phone)) {
                wx.showToast({
                    title: '手机号码格式不正确',
                    icon: "none"
                })
                return;
            }
        }
        http.get(
            app.globalData.business_host + "/product/productMemo", {
                productCodes: JSON.stringify([this.data.business_detail.productCode]),
                addressType: this.data.business_detail.addressType,
            },
            (status, resultCode, message, data) => {
                this.setData({
                    freshTips: data,
                })
                let that = this;
                if (message != "") {
                    wx.showModal({
                        title: '',
                        content: message,
                        success(res) {
                            if (res.confirm) {
                                // that.saveOrder();
                                this.toPayMoney()
                            } else if (res.cancel) {

                            }
                        }
                    })
                }
                if (message == "") {
                    // this.saveOrder();
                    this.toPayMoney()
                }
            },
            (status, resultCode, message, data) => {}
        );
    },

    /** 新增订单 */
    saveOrder: function () {
        this.setData({
            submitOrderEnable: false,
        })
        console.log(this.data.orderParam)
        if (this.data.business_detail.typeCode == "original") {
            this.newOrderOriginal(this.data.orderParam);
        } else if (this.data.business_detail.typeCode == "reward") {
            this.newOrderReward(this.data.orderParam);
        } else if (this.data.business_detail.typeCode == "inreward") {
            this.newOrderInreward(this.data.orderParam);
        } else if (this.data.business_detail.typeCode == "universalRebate") {
            this.newOrderRebate(this.data.orderParam);
        }
        if (this.data.saveAddr) {
            this.saveAddr()
        }
    },

    /**
     * 提交原价订单接口 typeCode=discount  /discountevent/newOrder
     * price	int	商品单价
       num	int	购买数量
       totalPrice	float	总价
       address	varchar	送货地址
       phone	varchar	联系电话
       linkman	varchar	联系人
       beginTime	datetime	下单时间
       customerOrderMemo	varchar	客户备注
     */
    newOrderOriginal: function (data) {
        let param = {
            inviteCode: app.globalData.higherLevelCode,
            eventCode: this.data.business_detail.code,
            num: this.data.quantity,
            provinceName: data.provinceName ? data.provinceName : "",
            provinceCode: data.provinceCode ? data.provinceCode : "",
            cityName: data.cityName ? data.cityName : "",
            cityCode: data.cityCode ? data.cityCode : "",
            areaName: data.areaName ? data.areaName : "",
            areaCode: data.areaCode ? data.areaCode : "",
            address: data.addr ? data.addr : "",
            lat: data.lat,
            lng: data.lng,
            phone: data.phone,
            linkman: data.name,
            customerOrderMemo: (data.customerOrderMemo && data.customerOrderMemo != "") ? data.customerOrderMemo : "",
            productCode: this.data.business_detail.product.code,
            userCode: wx.getStorageSync('user').userCode ? wx.getStorageSync('user').userCode : "",
            couponIds: JSON.stringify(this.data.couponIdList),
            onshelfCode: this.data.business_detail.onshelfCode,
            skuProperties: this.data.choose_skuProperties,
            startDeliveryTime: data.startDeliveryTime ? data.startDeliveryTime : null,
            endDeliveryTime: data.endDeliveryTime ? data.endDeliveryTime : null,
            vipCouponCodes: this.data.couponCodes && this.data.couponCodes.length > 0 ? JSON.stringify(this.data.couponCodes) : undefined,
        };
        http.post(
            app.globalData.business_host + 'originalevent/newSkuOrder', param,
            (status, resultCode, message, data) => {
                app.globalData.confirmOrder = true;
                this.setData({
                    orderId: data,
                    isShare: false,
                });
                // this.toPayMoney();
                this.toPayMoneySub()
            },
            (status, resultCode, message, data) => {
                app.globalData.confirmOrder = true;
                wx.hideLoading()
                this.setData({
                    submitOrderEnable: true,
                })
                wx.showModal({
                    content: message,
                    showCancel: false,
                })
            }
        );
    },

    /**
     * 提交分享返利龙订单接口 typeCode=reward  /rewardevent/newOrder
     * price	int	商品单价
       num	int	购买数量
       totalPrice	float	总价
       address	varchar	送货地址
       phone	varchar	联系电话
       linkman	varchar	联系人
       customerOrderMemo	varchar	客户备注
     */
    newOrderReward: function (data) {
        let param = {
            inviteCode: app.globalData.higherLevelCode,
            eventCode: this.data.business_detail.code,
            num: this.data.quantity,
            provinceName: data.provinceName ? data.provinceName : "",
            provinceCode: data.provinceCode ? data.provinceCode : "",
            cityName: data.cityName ? data.cityName : "",
            cityCode: data.cityCode ? data.cityCode : "",
            areaName: data.areaName ? data.areaName : "",
            areaCode: data.areaCode ? data.areaCode : "",
            address: data.addr ? data.addr : "",
            lat: data.lat,
            lng: data.lng,
            phone: data.phone,
            linkman: data.name,
            customerOrderMemo: data.customerOrderMemo && data.customerOrderMemo != "" ? data.customerOrderMemo : "",
            productCode: this.data.business_detail.product.code,
            userCode: wx.getStorageSync('user').userCode ? wx.getStorageSync('user').userCode : "",
            couponIds: JSON.stringify(this.data.couponIdList),
            onshelfCode: this.data.business_detail.onshelfCode,
            skuProperties: this.data.choose_skuProperties,
            startDeliveryTime: data.startDeliveryTime ? data.startDeliveryTime : null,
            endDeliveryTime: data.endDeliveryTime ? data.endDeliveryTime : null,
            vipCouponCodes: this.data.couponCodes && this.data.couponCodes.length > 0 ? JSON.stringify(this.data.couponCodes) : undefined,
        };
        http.post(
            app.globalData.business_host + 'rewardevent/newSkuOrder', param,
            (status, resultCode, message, data) => {
                app.globalData.confirmOrder = true;
                this.setData({
                    orderId: data,
                    isShare: false,
                });
                // this.toPayMoney();
                this.toPayMoneySub()
            },
            (status, resultCode, message, data) => {
                app.globalData.confirmOrder = true;
                wx.hideLoading()
                this.setData({
                    submitOrderEnable: true,
                })
                wx.showModal({
                    content: message,
                    showCancel: false,
                })
            }
        );
    },

    /**
     * 提交全民赚佣订单接口 typeCode=reward  
     * price	int	商品单价
       num	int	购买数量
       totalPrice	float	总价
       address	varchar	送货地址
       phone	varchar	联系电话
       linkman	varchar	联系人
       customerOrderMemo	varchar	客户备注
     */
    newOrderRebate: function (data) {
        let param = {
            inviteCode: app.globalData.higherLevelCode,
            eventCode: this.data.business_detail.code,
            num: this.data.quantity,
            provinceName: data.provinceName ? data.provinceName : "",
            provinceCode: data.provinceCode ? data.provinceCode : "",
            cityName: data.cityName ? data.cityName : "",
            cityCode: data.cityCode ? data.cityCode : "",
            areaName: data.areaName ? data.areaName : "",
            areaCode: data.areaCode ? data.areaCode : "",
            address: data.addr ? data.addr : "",
            lat: data.lat,
            lng: data.lng,
            phone: data.phone,
            linkman: data.name,
            customerOrderMemo: data.customerOrderMemo && data.customerOrderMemo != "" ? data.customerOrderMemo : "",
            productCode: this.data.business_detail.product.code,
            userCode: wx.getStorageSync('user').userCode ? wx.getStorageSync('user').userCode : "",
            couponIds: JSON.stringify(this.data.couponIdList),
            onshelfCode: this.data.business_detail.onshelfCode,
            skuProperties: this.data.choose_skuProperties,
            startDeliveryTime: data.startDeliveryTime ? data.startDeliveryTime : null,
            endDeliveryTime: data.endDeliveryTime ? data.endDeliveryTime : null,
            vipCouponCodes: this.data.couponCodes && this.data.couponCodes.length > 0 ? JSON.stringify(this.data.couponCodes) : undefined,
        };
        http.post(
            app.globalData.business_host + 'rebateevent/newSkuOrder', param,
            (status, resultCode, message, data) => {
                app.globalData.confirmOrder = true;
                this.setData({
                    orderId: data,
                    isShare: false,
                });
                // this.toPayMoney();
                this.toPayMoneySub()
            },
            (status, resultCode, message, data) => {
                app.globalData.confirmOrder = true;
                wx.hideLoading()
                this.setData({
                    submitOrderEnable: true,
                })
                wx.showModal({
                    content: message,
                    showCancel: false,
                })
            }
        );
    },

    /**
 * 提交内部返利龙订单接口 typeCode=reward  /rewardevent/newOrder
 * price	int	商品单价
   num	int	购买数量
   totalPrice	float	总价
   address	varchar	送货地址
   phone	varchar	联系电话
   linkman	varchar	联系人
   customerOrderMemo	varchar	客户备注
 */
    newOrderInreward: function (data) {
        let param = {
            inviteCode: this.data.clerk_code,
            eventCode: this.data.business_detail.code,
            num: this.data.quantity,
            provinceName: data.provinceName ? data.provinceName : "",
            provinceCode: data.provinceCode ? data.provinceCode : "",
            cityName: data.cityName ? data.cityName : "",
            cityCode: data.cityCode ? data.cityCode : "",
            areaName: data.areaName ? data.areaName : "",
            areaCode: data.areaCode ? data.areaCode : "",
            address: data.addr ? data.addr : "",
            lat: data.lat,
            lng: data.lng,
            phone: data.phone,
            linkman: data.name,
            customerOrderMemo: data.customerOrderMemo && data.customerOrderMemo != "" ? data.customerOrderMemo : "",
            productCode: this.data.business_detail.product.code,
            couponIds: JSON.stringify(this.data.couponIdList),
            onshelfCode: this.data.business_detail.onshelfCode,
            skuProperties: this.data.choose_skuProperties,
            startDeliveryTime: data.startDeliveryTime ? data.startDeliveryTime : null,
            endDeliveryTime: data.endDeliveryTime ? data.endDeliveryTime : null,
            vipCouponCodes: this.data.couponCodes && this.data.couponCodes.length > 0 ? JSON.stringify(this.data.couponCodes) : undefined,
        };
        http.post(
            app.globalData.business_host + 'internalrewardevent/newSkuOrder', param,
            (status, resultCode, message, data) => {
                app.globalData.confirmOrder = true;
                this.setData({
                    orderId: data,
                    isShare: false,
                });
                // this.toPayMoney();
                this.toPayMoneySub()
            },
            (status, resultCode, message, data) => {
                app.globalData.confirmOrder = true;
                wx.hideLoading()
                this.setData({
                    submitOrderEnable: true,
                })
                wx.showModal({
                    content: message,
                    showCancel: false,
                })
            }
        );
        // } else {
        //     wx.showToast({
        //         title: '合伙人参数为空',
        //         icon: "none"
        //     })
        // }

    },

    /**
     * 选择收货地址
     */
    chooseUserAddress: function () {
        if (this.data.business_detail.product.typeCode == "service") {
            wx.showModal({
                title: '该商品为到店商品',
                content: '到店商品无法修改收货地址，请到店消费',
            })
            return
        }
        this.setData({
            useDefaultAddr: false,
        })
        wx.navigateTo({
            url: '/pages/tabBar_user_center/address/addr_list/addr_list?from_confirm_order=true&product_code=' + this.data.business_detail.productCode,
        })
    },

    /**
     * 获取用户选择的收货地址
     */
    getOrderAddr: function () {
        //初次加载产品详情页使用默认收货地址
        if (this.data.useDefaultAddr) {
            this.setDefaultAaddr()
            return
        }
        wx.showLoading({
            title: '数据处理中...',
            mask: true,
        })
        this.setData({
            order_addr: app.globalData.userHarvestAddress,
            targetAddr: app.globalData.userHarvestAddress.cityName,
        });
        this.searchLogisticsCharge(this.data.order_addr.provinceCode)
        this.getBestCoupon(this.data.business_detail.onshelfCode)
    },

    /** 保存收货地址 */
    saveAddr: function () {
        http.post(
            app.globalData.business_host + "customeraddress/save", {
                address: this.data.addr,
                provinceName: this.data.choose_result[0].name,
                provinceCode: this.data.choose_result[0].code,
                cityName: this.data.choose_result[1].name,
                cityCode: this.data.choose_result[1].code,
                areaName: this.data.choose_result[2].name,
                areaCode: this.data.choose_result[2].code,
                phone: this.data.phone,
                linkman: this.data.name,
                isDefault: 0,
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },

    /**
     * 第一步：获取微信支付openid  
     */
    toPayMoney: function (e) {
        if (this.data.enableMember && this.data.useMemberRecharge && this.data.usableCredit > 0) {
            this.payPassword.checkPic()
        } else {
            // this.toPayMoneySub()
            this.saveOrder()
        }
    },

    toPayMoneySub: function () {
        wx.showLoading({
            title: '付款中',
            mask: true
        })
        wx.login({
            success: res => {
                this.setData({
                    wxCode: res.code
                });
                http.post(
                    app.globalData.host + 'wechat/authorization_minpro', {
                        code: this.data.wxCode,
                        appid: app.globalData.appId
                    },
                    (status, resultCode, message, data) => {
                        this.getWeChatRecharge(data.openid)
                    },
                    (status, resultCode, message, data) => {}
                );
            }
        })
    },

    /**
     * 第二步：获取微信支付需要用的参数
     */
    getWeChatRecharge: function (data) {
        let that = this
        let payTest = app.globalData.testServer; //测试服免支付
        let independentPay = app.globalData.independentPay;
        if (payTest && independentPay) {
            
            payTest = false;
        }
        http.post(
            app.globalData.business_host + (payTest ? 'atest/customerorder/unipay_thirdpay_test' : 'customerorder/unipay_thirdpay'), {
                openId: data + "",
                body: "微信企业版小程序客户订单付款",
                frpCode: (payTest && !independentPay ? 'WEIXIN_XCX_2' : 'WEIXIN_XCX'),
                channel: independentPay ? 'channel_wechat' : 'channel_joinpay',
                appId: app.globalData.appId,
                orderCode: that.data.orderId + "",
                deductBalance: this.data.enableMember && this.data.enableMemberRecharge && this.data.useMemberRecharge && this.data.usableCredit > 0 ? 1 : 0,
                password: this.data.enableMember && this.data.enableMemberRecharge && this.data.useMemberRecharge && this.data.usableCredit > 0 ? this.data.payPwd : undefined,
            },
            (status, resultCode, message, data) => {
                if (payTest || !data.needPay) {
                    that.setData({
                        submitOrderEnable: true,
                    })
                    wx.showToast({
                        title: '支付成功',
                        icon: "none"
                    })
                    this.collectSceneType(); //订单场景采集
                    wx.navigateTo({
                        url: '/pages/order/detail/order_details?orderId=' + that.data.orderId,
                    })
                    return
                } else {
                    that.weChatRecharge(data.params, data.orderNo);
                }
            },
            (status, resultCode, message, data) => {
                that.setData({
                    submitOrderEnable: true,
                })
                wx.showToast({
                    title: message,
                    icon: "none",
                    mask: true,
                })
            }
        );
    },

    /**
     * 第三步：请求微信支付
     */
    weChatRecharge: function (data, orderNo) {
        var that = this;
        wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success(res) {
                that.pollingOrder(orderNo);
            },
            fail(res) {
                wx.hideLoading()
            }
        })
    },

    /**
     * 第四步：轮询结算单获取状态
     */
    pollingOrder: function (code) {
        let that = this
        http.get(
            app.globalData.host + 'biz/usersettlement/info', {
                code: code,
            },
            (status, resultCode, message, data) => {
                if (data.status == 4) {
                    that.setData({
                        submitOrderEnable: true,
                    })
                    //支付成功
                    wx.showToast({
                        title: '支付成功',
                        icon: "none"
                    })
                    wx.navigateTo({
                        url: '/pages/order/detail/order_details?orderId=' + this.data.orderId,
                    })
                    this.collectSceneType(); //订单场景采集
                } else if (data.status == 5) {
                    that.setData({
                        submitOrderEnable: true,
                    })
                    wx.showToast({
                        title: '支付失败',
                        icon: "none"
                    })
                } else { //继续轮询
                    that.pollingOrder(code);
                }
            },
            (status, resultCode, message, data) => {
                wx.showToast({
                    title: '支付失败',
                    icon: "none"
                })
                that.setData({
                    submitOrderEnable: true,
                })
            }
        );
    },

    /**
     * 订单场景采集
     * 该订单产生的场景
     */
    collectSceneType() {
        let sceneType = '';
        if (this.data.scene) {
            sceneType = this.data.scene.replace(/[^a-zA-Z]/g, ''); //截取字符串英文部分
        }
        let param = {
            sceneType: sceneType == '' ? 'wxapp' : sceneType, //进入详情的上一页，类别，例如live
            sceneDT: this.data.sceneDT, //进入详情的上一页，具体的id，例如名片id，动态id，商家主页的商家code，直播间的商家code
            merchantCode: this.data.business_detail.storeCode,
            userId: wx.getStorageSync('user').id,
            orderCode: this.data.orderId
        }
        // console.log('param==========', param);
        http.post(
            app.globalData.host + 'collect/collectSceneType', param,
            (status, resultCode, message, data) => {
                console.log('订单场景采集成功！');
            },
            (status, resultCode, message, data) => {}
        );
    },

    /**
     * 判断是不是共享合伙人
     */
    checkUserClerk() {
        // console.log('返回详情====================', this.business_detail);
        if (!wx.getStorageSync('user')) {
            return;
        }
        http.get(
            app.globalData.host + "biz/user/merchant/clerk/status", {
                merchantCode: this.data.business_detail.storeCode,
                userId: wx.getStorageSync('user').id,
            },
            (status, resultCode, message, data) => {
                if (data == 0 || data == 1) {
                    this.setData({
                        clerkState: true
                    });
                }
            },
            (status, resultCode, message, data) => {
                // this.$toast.center(message);
            }
        );
    },

    /**
     * 返回上一页
     */
    backPreviousPage: function () {
        var pages = getCurrentPages()
        if (pages.length > 1) {
            wx.navigateBack({
                delta: 1
            })
        } else {
            this.backIndexPage()
        }
    },

    /**
     * 返回首页(需要雷达采集)
     */
    backIndexPage: function () {
        wx.navigateTo({
            url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.business_detail.merchant.code + '&higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=order' + this.data.business_detail.merchant.code + '&sceneDT=' + this.data.eventCode,
        })
    },


    /**
     * 地图导航
     */
    mapNavigation: function () {
        var lat = this.data.business_detail.lat ? this.data.business_detail.lat : this.data.business_detail.merchant.lat
        var lng = this.data.business_detail.lng ? this.data.business_detail.lng : this.data.business_detail.merchant.lng
        if (lat && lng) {
            wx.openLocation({
                latitude: lat,
                longitude: lng,
                name: this.data.business_detail.merchant.shortName && this.data.business_detail.merchant.shortName != "" ? this.data.business_detail.merchant.shortName : this.data.business_detail.merchant.name,
                address: this.data.business_detail.address ? this.data.business_detail.address : this.data.business_detail.merchant.addr,
            })
        } else {
            wx.showToast({
                title: '企业未设置定位',
                icon: "none"
            })
        }
    },

    /** 获取可用优惠券  
     */
    getBestCoupon: function (onshelfCode) {
        if (this.data.indChooseCoupon) {
            return
        }
        let number = (this.data.quantity).toString()
        http.get(
            app.globalData.vip_host + 'vip/coupon/issue/checkSkuReturnCouponPrice', {
                eventCode: this.data.eventCode,
                onshelfCode: onshelfCode == "" ? this.data.business_detail.onshelfCode : onshelfCode,
                productCode: this.data.business_detail.productCode,
                storeCode: this.data.business_detail.merchant.code,
                userCode: wx.getStorageSync('user').userCode,
                number: number,
                properties: this.data.propertie ? this.data.propertie : null,
                provinceCode: this.data.order_addr && this.data.order_addr.provinceCode && this.data.order_addr.provinceCode != "" ? this.data.order_addr.provinceCode : undefined,
                couponIds: this.data.couponIdList && this.data.couponIdList.length > 0 ? JSON.stringify(this.data.couponIdList) : undefined,
            },
            (status, resultCode, message, data) => {
                let vipCouponEmpty = true
                if (data) {
                    let total_vip_price = (Number(this.data.total_price) - Number(data.couponPriceYuan)).toFixed(2)
                    if (data.couponCodes.length > 0) {
                        vipCouponEmpty = false
                    }
                    this.setData({
                        vipDiscount: data.couponPriceYuan,
                        vipCouponPrice: data.couponPrice,
                        couponCodes: data.couponCodes,
                        total_vip_price: total_vip_price,
                        vipCouponEmpty: vipCouponEmpty,
                    })
                    this.countSingleDiscount()
                } else {
                    return false
                }

            },
            (status, resultCode, message, data) => {}
        )
    },

    /**
     * 请求sku规格
     */
    getSpecList: function (productCode) {
        http.get(
            app.globalData.business_host + '/product/specList', {
                productCode: productCode
            },
            (status, resultCode, message, data) => {
                this.setData({
                    specList: this.handlerSkuData(data)
                });
                wx.hideLoading();
            },
            (status, resultCode, message, data) => {
                wx.hideLoading();
            }
        );
    },

    /**处理sku数据
     * 
     */
    handlerSkuData: function (data) {
        let data_productSpecs = {};
        let chooseSkus = this.data.chooseSkus
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].productSpecs.length; j++) {
                    data_productSpecs = data[i].productSpecs[j];
                    data_productSpecs.key = i;
                    data_productSpecs.lock = (j == 0) ? 1 : 0;
                    data[i].productSpecs[j] = data_productSpecs;
                    if (j == 0) {
                        let isExist = false
                        for (let k in chooseSkus) {
                            let temp = chooseSkus[k].split("=")
                            if (temp[0] == data[i].productSpecs[j].specCode) {
                                isExist = true
                            }
                        }
                        if (!isExist) {
                            chooseSkus.push(data[i].productSpecs[j].specCode + "=" + data[i].productSpecs[j].value)
                        }
                    }
                }
            }
        }
        this.setData({
            chooseSkus: chooseSkus,
        });
        this.matchingSku();
        return data;

    },


    /**
     * 选择sku动态改变图片或者价格
     */
    chooseSkus: function (e) {
        let key = e.currentTarget.dataset.key;
        let choose = e.currentTarget.dataset.id;
        let speccode = e.currentTarget.dataset.speccode;
        let value = e.currentTarget.dataset.value;
        let lock = e.currentTarget.dataset.lock;
        // if (lock == 2) {
        //   return
        // }
        let length = this.data.specList.length;
        for (var i = 0; i < this.data.specList[key].productSpecs.length; i++) {
            let productSpecs = this.data.specList[key].productSpecs;
            if (length > 1) {
                for (var j = 0; j < productSpecs.length; j++) {
                    if (lock == 1) { //取消选择
                        // this.data.specList[key].productSpecs[j].lock = 0;
                        // this.data.chooseSkus[key] = {};
                    } else { //选择
                        if (productSpecs[j].id != choose) {
                            // this.data.specList[key].productSpecs[j].lock = 2;
                            this.data.specList[key].productSpecs[j].lock = 0;
                        } else {
                            this.data.specList[key].productSpecs[j].lock = 1;
                        }
                        this.data.chooseSkus[key] = speccode + "=" + value;
                    }
                }
            } else {
                for (var j = 0; j < productSpecs.length; j++) {
                    if (lock == 1) { //取消选择
                        // this.data.specList[key].productSpecs[j].lock = 0;
                        // this.data.chooseSkus[key] = {};
                    } else { //选择
                        if (productSpecs[j].id != choose) {
                            this.data.specList[key].productSpecs[j].lock = 0;
                        } else {
                            this.data.specList[key].productSpecs[j].lock = 1;
                        }
                        this.data.chooseSkus[key] = speccode + "=" + value;
                    }
                }
            }
        }
        this.setData({
            ['specList[' + key + '].productSpecs']: this.data.specList[key].productSpecs,
            indChooseCoupon: false,
        });
        this.matchingSku();
        if (this.data.enableMember) {
            this.getBestCoupon(this.data.onshelfCode)
        }

    },

    /**
     * 排列组合sku
     */
    arrangeSku: function () {
        let array = this.data.chooseSkus;
        let resData = [];
        let len = array.length;
        if (len == 1) {
            resData.push(array[0])
        }
        if (len == 2) {
            resData.push(array[0] + '&' + array[1]);
            resData.push(array[1] + '&' + array[0]);
        }
        if (len == 3) {
            resData.push(array[0] + '&' + array[1] + '&' + array[2]);
            resData.push(array[1] + '&' + array[0] + '&' + array[2]);
            resData.push(array[2] + "&" + array[0] + '&' + array[1]);
            resData.push(array[2] + "&" + array[1] + '&' + array[0]);
            resData.push(array[0] + "&" + array[2] + '&' + array[1]);
            resData.push(array[1] + "&" + array[2] + '&' + array[0]);
        }
        return resData;
    },


    /**
     * 选中后匹配sku
     */
    matchingSku: function () {
        let key = this.arrangeSku();
        let skus = this.data.skus;
        for (var i = 0; i < skus.length; i++) {
            for (let j = 0; j < key.length; j++) {
                if (key[j] == skus[i].properties) {
                    this.setData({
                        sku_priceYuan: skus[i].priceYuan,
                        sku_url: skus[i].url,
                        sku_stock: skus[i].stock,
                        sku_weight: skus[i].weight,
                        damagePriceYuan: skus[i].damagePriceYuan ? skus[i].damagePriceYuan : 0,
                        choose_skuProperties: key[j],
                    });
                    let selectedSkuTextList = [] //选中SKU列表组合
                    //拆解sku字符串
                    let array = key[j].split("&")
                    //第一组sku
                    let str1 = array[0].split("=")
                    let sku1Value = str1[1]

                    //第二组sku
                    let str2 = ""
                    let sku2Value = ""
                    if (array.length > 1) {
                        str2 = array[1].split("=")
                        sku2Value = str2[1]
                        selectedSkuTextList.push(sku1Value + "-" + sku2Value)
                        selectedSkuTextList.push(sku2Value + "-" + sku1Value)
                    } else {
                        selectedSkuTextList.push(sku1Value)
                    }

                    // this.setData({
                    //     selected_text: str2.length > 1 ? sku1Value + "-" + sku2Value : sku1Value
                    // })
                    for (let tempIndex in selectedSkuTextList) {
                        if (skus[i].name == selectedSkuTextList[tempIndex]) {
                            this.setData({
                                onshelfCode: skus[i].onshelfCode,
                                propertie: skus[i].properties,
                                selected_text: skus[i].name,
                            })
                        }
                    }

                    if (this.data.eventProducts[i] && key[j] == this.data.eventProducts[i].skuProperties) {
                        this.setData({
                            ["business_detail.discountPrice"]: this.data.eventProducts[i].discountPrice
                        });
                    }
                    if (wx.getStorageSync('user')) {
                        if(this.data.sharePlay){
                            this.diedieleCoupon()
                        }
                        else{
                            this.getCouponList();
                        }   
                    }
                    this.operatePrice();

                    //获取参考价
                    let eventProducts = this.data.eventProducts
                    for (let k in eventProducts) {
                        if (key[j] == eventProducts[k].skuProperties) {
                            this.setData({
                                sku_referencePriceYuan: eventProducts[k].referencePrice ? (eventProducts[k].referencePrice / 100).toFixed(2) : 0
                            })
                        }
                    }
                    return
                }
            }
        }
    },

    /**
     * 定时清除定时器
     */
    clearIntervalByTime: function () {
        setTimeout(() => {
            console.log("30秒后清除定时器");
            clearInterval(this.data.activity_pageHeightDevice);
        }, 30000)
    },

    /**
     * 获取sku对应的优惠
     */
    getSkuEventProducts: function () {
        //eventProducts
        if (this.data.business_detail.typeCode == "original") {
            this.setData({
                eventProducts: this.data.business_detail.originalEventProducts
            });
        } else if (this.data.business_detail.typeCode == "reward") {
            this.setData({
                eventProducts: this.data.business_detail.rewardEventProducts
            });
        } else if (this.data.business_detail.typeCode == "discount") {
            this.setData({
                eventProducts: this.data.business_detail.discountEventProducts
            });
        } else if (this.data.business_detail.typeCode == "inreward") {
            this.setData({
                eventProducts: this.data.business_detail.inRewardEventProduct
            });
        } else if (this.data.business_detail.typeCode == "universalRebate") {
            this.setData({
                eventProducts: this.data.business_detail.rebateEventProducts
            });
        }

        var eventProducts = this.data.eventProducts,
            sortArr = [];
        for (let i = 0; i < eventProducts.length; i++) {
            sortArr.push(eventProducts[i].referencePrice)
        }
        let max = Math.max(...sortArr); //最大值
        let min = Math.min(...sortArr); //最小值
        this.setData({
            minReferencePrice: (min / 100).toFixed(2),
            maxReferencePrice: (max / 100).toFixed(2),
            sku_referencePriceYuan: max ? (max / 100).toFixed(2) : 0,
        })
        this.searcrShareDiscount()
    },

    /** 搜索分享优惠 */
    searcrShareDiscount: function () {
        let shareDiscount = false
        let shareDiscountPrice = 0
        for (let i in this.data.eventProducts) {
            let product = this.data.eventProducts[i]
            if (product.discountPrice != 0) {
                shareDiscount = true
                shareDiscountPrice = util.priceSwitch(product.discountPrice)
                break
            }
        }
        this.setData({
            shareDiscount: shareDiscount,
            shareDiscountPrice: shareDiscountPrice,
        })

    },


    /** 处理到店自提地址 */
    operateShowZTDZ(goodsObj) {
        let ztdzDisplay = false
        if (goodsObj.product.typeCode == "service") { //到店商品
            ztdzDisplay = true
        } else if (goodsObj.product.typeCode == "logistics") { //物流商品
            if (goodsObj.addressType == "merchant") { //物流到店
                ztdzDisplay = true
            }
        }
        this.setData({
            showZTDZ: ztdzDisplay,
            pickAddr: {
                provinceName: goodsObj.provinceName && goodsObj.provinceName != "" ? goodsObj.provinceName : goodsObj.merchant.merchantProvince ? goodsObj.merchant.merchantProvince.name : "",
                provinceCode: goodsObj.provinceCode && goodsObj.provinceCode != "" ? goodsObj.provinceCode : goodsObj.merchant.merchantProvince ? goodsObj.merchant.merchantProvince.code : "",
                cityName: goodsObj.cityName && goodsObj.cityName != "" ? goodsObj.cityName : goodsObj.merchant.merchantCity ? goodsObj.merchant.merchantCity.name : "",
                cityCode: goodsObj.cityCode && goodsObj.cityCode != "" ? goodsObj.cityCode : goodsObj.merchant.merchantCity ? goodsObj.merchant.merchantCity.code : "",
                areaName: goodsObj.areaName && goodsObj.areaName != "" ? goodsObj.areaName : "",
                areaCode: goodsObj.areaCode && goodsObj.areaCode != "" ? goodsObj.areaCode : "",
                addr: goodsObj.address && goodsObj.address != "" ? goodsObj.address : goodsObj.merchant.addr,
            }
        });
    },


    /**
     * 获取活动详情，不分类别
     */
    getBusinessDetail: function () {
        wx.showLoading({
            title: '数据加载中...',
            mask: true,
        })
        http.get(
            app.globalData.business_host + 'event/info', {
                eventCode: this.data.eventCode,
                isTrack: "1",
                userCode: this.data.clerk_code
            },
            (status, resultCode, message, data) => {
                this.setData({
                    business_detail: this.handleBusinessDetail(data),
                    total_price: data.onshelf.onshelfSkus[0].priceYuan,
                    activityType: data.typeCode,
                    business_phone: data.trackUserInfo.phone,
                });
                // if (this.data.business_detail.allowCoupon == "1") {
                //     this.getByMerchantCode()
                // } 会员系统
                if (data.sharePlay) {
                    if (this.data.shareUserId == wx.getStorageSync('user').id) {
                        //当前登录人是分享者，则展示叠叠乐分享记录列表
                        this.diediele()

                    } else {
                        //当前登录人不是分享者，不展示叠叠乐分享记录，且新增分享记录
                        this.getDiediele()
                    }
                    data.sharePlay.discountPrice=data.sharePlay.discountPrice/100,
                    data.sharePlay.maxDiscountPrice=data.sharePlay.maxDiscountPrice/100,
                    data.sharePlay.count=parseInt(data.sharePlay.maxDiscountPrice/data.sharePlay.discountPrice)
                    this.setData({
                        sharePlay:data.sharePlay
                    })
                }
                this.getBusinessInfo();
                this.handleRes();
                wx.setNavigationBarTitle({
                    title: this.data.business_detail.product.name,
                })
                if (this.data.business_detail.status == -1 || this.data.business_detail.status == 0) {
                    this.setData({
                        merchant_err: true
                    });
                }
                if (this.data.business_detail.merchant.status == 0 || this.data.business_detail.merchant.status == 3) {
                    this.setData({
                        merchant_err: true
                    });
                }
                this.checkClerkApply();
                // this.getSkuEventProducts();
                if (wx.getStorageSync('user')) {
                    this.checkUserClerk();
                    this.getOrderAddr()
                }
                var that = this;
                this.setData({
                    activity_timeDevice: setInterval(function () {
                        that.countTime();
                    }, 1000)
                })
                this.postStayTime();
                clearInterval(this.data.timer);
                that.data.timer = setInterval(function () {
                    that.postStayTime();
                }, app.globalData.stayTime);
                that.operatePrice();
                // if (this.data.enableMember) {
                //     this.getBestCoupon(this.data.business_detail.onshelfCode)
                // }
                wx.hideLoading();
                if (this.data.product_activityType == "estate") {
                    if (this.data.business_detail.product.orderRealEstateAttach.estateSurroundingTags && this.data.business_detail.product.orderRealEstateAttach.estateSurroundingTags[0]) {
                        this.searchNearby(this.data.business_detail.product.orderRealEstateAttach.estateSurroundingTags[0].name, 0)
                    }
                }
            },
            (status, resultCode, message, data) => {
                if (status == 500) {
                    this.setData({
                        merchant_err: true
                    });
                }
                wx.hideLoading();
            }
        );
    },
    /** 叠叠乐分享记录列表 */
    diediele: function () {
        http.get(
            app.globalData.business_host + 'share/record/getRecordList', {
                eventCode: this.data.eventCode
            },
            (status, resultCode, message, data) => {
                if (data) {
                    this.setData({
                        shareTotal:parseInt(data.total),
                        shareRecord: data.record
                    })
                }
                console
            },
            (status, resultCode, message, data) => {}
        )
    },
    /** 新增叠叠乐分享记录 */
    getDiediele: function () {
        http.post(
            app.globalData.business_host + 'share/record/saveRecord', {
                shareUserId: this.data.shareUserId,
                eventCode: this.data.eventCode,
                skuProperties: 'default=默认'
            },
            (status, resultCode, message, data) => {
              
            },
            (status, resultCode, message, data) => {}
        )
    },
    /** 捕获鼠标操作 */
    catchMouseOperate: function () {},

    /** 进入购物车 */
    goToCart: function () {
        app.isUserLogin(function (isLogin) {
            if (isLogin) {
                wx.navigateTo({
                    url: '/pages/tabBar_index/cart/cart',
                })
            }
        })
    },

    /** 显示购物车选项 */
    showCart: function () {
        this.setData({
            cartDisplay: !this.data.cartDisplay,
        })
    },

    /** 加入购物车 */
    joinCart: function () {
        let that = this;
        app.isUserLogin(function (isLogin) {
            if (isLogin) {
                //生鲜特有判断 start
                if (that.data.business_detail.product.typeCode == 'fresh') {
                    wx.showModal({
                        title: '温馨提示',
                        confirmText: '确定',
                        content: "此为生鲜商品，下单后\r\n" + that.data.freshTips,
                        showCancel: true,
                        success: (result) => {
                            if (result.confirm) {
                                that.insertCart()
                            } else {
                                that.setData({
                                    cartDisplay: false,
                                })
                            }
                        },
                    })
                    //生鲜特有判断 end
                } else {
                    that.insertCart()
                }
            }
        })
    },

    /** 插入购物车 */
    insertCart: function () {
        let name = "";
        let phone = "";
        let addr = "";
        let provinceCode = "";
        let provinceName = "";
        let cityCode = "";
        let cityName = "";
        let areaCode = "";
        let areaName = "";
        if (this.data.order_addr) {
            name = this.data.order_addr.name;
            phone = this.data.order_addr.phone;
            addr = this.data.order_addr.addrdetail;
            provinceCode = this.data.order_addr.provinceCode;
            provinceName = this.data.order_addr.provinceName;
            cityCode = this.data.order_addr.cityCode;
            cityName = this.data.order_addr.cityName;
            areaCode = this.data.order_addr.areaCode;
            areaName = this.data.order_addr.areaName;
        } else {
            name = this.data.name
            phone = this.data.phone
            addr = this.data.choose_result.length >= 3 ? (this.data.choose_result[0].name + this.data.choose_result[1].name + this.data.choose_result[2].name + this.data.addr) : "";
            provinceCode = this.data.choose_result.length >= 3 ? this.data.choose_result[0].code : "";
            provinceName = this.data.choose_result.length >= 3 ? this.data.choose_result[0].name : "";
            cityCode = this.data.choose_result.length >= 3 ? this.data.choose_result[1].code : "";
            cityName = this.data.choose_result.length >= 3 ? this.data.choose_result[1].name : "";
            areaCode = this.data.choose_result.length >= 3 ? this.data.choose_result[2].code : "";
            areaName = this.data.choose_result.length >= 3 ? this.data.choose_result[2].name : "";
        }
        // console.log('用户code');
        let msg = [];
        if (this.data.messageText.length > 0) {
            for (let i in this.data.messageText) {
                msg.push(this.data.messageText[i].value)
            }
        }
        msg = msg.join('&');
        let customerOrderMemo = null;
        if (msg.length > 0) {
            if (this.data.order_message != '') {
                customerOrderMemo = msg + '&' + this.data.order_message
            } else {
                customerOrderMemo = msg;
            }
        }
        // console.log(customerOrderMemo);
        // console.log(this.data.messageText);
        http.post(
            app.globalData.business_host + "cart/newCart", {
                eventCode: this.data.eventCode,
                skuProperties: this.data.choose_skuProperties,
                onshelfCode: this.data.business_detail.onshelfCode,
                num: this.data.quantity,
                provinceCode: provinceCode,
                provinceName: provinceName,
                cityCode: cityCode,
                cityName: cityName,
                areaCode: areaCode,
                areaName: areaName,
                address: addr,
                phone: phone,
                linkman: name,
                refUserCode: this.data.activityType == "inreward" ? this.data.clerk_code : app.globalData.higherLevelCode,
                customerOrderMemo: customerOrderMemo ? customerOrderMemo : null, //备注
            },
            (status, resultCode, message, data) => {
                /**获取购物车数量 */
                let that = this;
                wx.showToast({
                    title: message,
                })
                setTimeout(function (params) {
                    app.loadCartNum(function (tabBar) {
                        that.setData({
                            cartNum: tabBar.list[2].number
                        });
                    })
                    that.setData({
                        cartDisplay: false,
                    })
                }, 1000)
            },
            (status, resultCode, message, data) => {
                wx.showToast({
                    title: '加入购物车失败',
                    icon: "none",
                    mask: true,
                })
            }
        )
    },

    /** 处理物流问题 */
    operateLogistics: function (goodsObj) {
        //是否显示运费栏 
        let showLogisticsTemple = true
        if (goodsObj.product.typeCode == "service") {
            showLogisticsTemple = false
        } else if (goodsObj.product.typeCode == "virtual" || goodsObj.product.typeCode == "deposit") {
            showLogisticsTemple = false;
        } else {
            if (goodsObj.addressType == "merchant") {
                showLogisticsTemple = false
            } else {
                //货源所在地，发货地（未配置物流模板，则默认为企业所在地）
                let sourceAddr = ""
                if (goodsObj.product.orderLogisticsTemple) {
                    sourceAddr = goodsObj.product.orderLogisticsTemple.sourceCityName
                } else {
                    sourceAddr = goodsObj.product.store.merchantCity.name
                }
                this.setData({
                    sourceAddr: sourceAddr,
                })
            }
        }
        this.setData({
            showLogisticsTemple: showLogisticsTemple,
        })
    },

    /** 检查定位授权是否打开 */
    checkUserLocation: function () {
        var that = this
        var setUserLocationTimeOut = function () {
            if (app.globalData.city_info.id === "") {
                setTimeout(function () {
                    if (app.globalData.city_info.id !== "") {
                        that.setData({
                            city_info: app.globalData.city_info,
                            targetAddr: app.globalData.city_info.name != "" ? app.globalData.city_info.name : "",
                        })
                    } else {
                        setUserLocationTimeOut()
                    }
                }.bind(that), 100)
            } else {
                if (that.data.city_info.id == "") {
                    that.setData({
                        city_info: app.globalData.city_info,
                        targetAddr: app.globalData.city_info.name != "" ? app.globalData.city_info.name : "",
                    });
                }
            }
        }
        setUserLocationTimeOut();
    },

    /** 获取物流费用 */
    getLogisticsCharge: function () {
        let provinceCode = ""
        //默认优先使用收货地址，如收货地址不存在改用当前定位所在地址
        if (this.data.order_addr && this.data.order_addr.provinceCode != "") {
            provinceCode = this.data.order_addr.provinceCode
            this.searchLogisticsCharge(provinceCode)
        } else {
            this.getProvinceByLocation()
        }
    },

    /** 通过定位获取省份得到相关物流费用 */
    getProvinceByLocation: function () {
        http.get(
            app.globalData.business_host + "city/selectProvinceByCityName", {
                cityName: this.data.city_info.name,
            },
            (status, resultCode, message, data) => {
                this.searchLogisticsCharge(data.code)
            },
            (status, resultCode, message, data) => {}
        );
    },

    /** 搜索相关物流费用 */
    searchLogisticsCharge: function (provinceCode) {
        if (!provinceCode) {
            return
        }
        let provinceCodes = []
        provinceCodes.push(provinceCode)
        http.get(
            app.globalData.business_host + "logisticstemple/getProLogisticsInfo", {
                productCode: this.data.business_detail.productCode,
                provinceCodes: JSON.stringify(provinceCodes),
            },
            (status, resultCode, message, data) => {
                // console.log("搜索相关物流费用")
                // console.log(data)
                this.setData({
                    logisticsChargeType: data.chargeType,
                    logisticsInfo: data.chargerDetailList[0],
                    logisticsStatus: data.chargerDetailList[0].areaType,
                    logisticsPrice: data.chargerDetailList[0].areaType == 2 ? util.priceSwitch(data.chargerDetailList[0].basicPrice) : 0,
                    freePostageNum: data.chargerDetailList[0].freePostageNum > 0 ? data.chargerDetailList[0].freePostageNum : 0,
                })
                this.countSingleDiscount()
                wx.hideLoading()
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },

    /**
     * 初始化/分离省份，城市，县城/区
     */
    separateData: function () {
        let allAddrList = this.data.allAddrList;
        for (let i = 0; i < allAddrList.length; i++) {
            if (allAddrList[i].pcodeStr.length == 2) {
                this.data.provincesList.push(allAddrList[i]);
            } else if (allAddrList[i].pcodeStr.length == 5) {
                this.data.citiesList.push(allAddrList[i]);
            } else {
                this.data.countyList.push(allAddrList[i]);
            }
        }
        this.setData({
            provincesList: this.data.provincesList,
            citiesList: this.data.citiesList,
            countyList: this.data.countyList,
        });
        this.matchCity(this.data.provincesList[0].code);
    },

    /**
     * 选择省份，改变城市
     */
    matchCity: function (pcode, addrIndex) {
        let citiesList = this.data.citiesList;
        let choos_citiesList = [];
        for (let i = 0; i < citiesList.length; i++) {
            if (pcode == citiesList[i].pcodeStr) {
                choos_citiesList.push(citiesList[i]);
            }
        }
        this.setData({
            choos_citiesList: choos_citiesList
        });
        if (addrIndex) {
            this.matchCounty(this.data.choos_citiesList[addrIndex[1]].code, addrIndex);
        } else {
            this.matchCounty(this.data.choos_citiesList[0].code);
        }
    },

    /**
     * 选择城市，改变区/县
     */
    matchCounty: function (pcode, addrIndex) {
        let countyList = this.data.countyList;
        let choos_countyList = [];
        for (let i = 0; i < countyList.length; i++) {
            if (pcode == countyList[i].pcodeStr) {
                choos_countyList.push(countyList[i]);
            }
        }
        this.setData({
            choos_countyList: choos_countyList,
            addrIndex: addrIndex ? addrIndex : [0, 0, 0]
        });
        if (addrIndex) {
            this.setData({
                ["choose_result[0]"]: this.data.provincesList[addrIndex[0]],
                ["choose_result[1]"]: this.data.choos_citiesList[addrIndex[1]],
                ["choose_result[2]"]: this.data.choos_countyList[addrIndex[2]],
            });
        }
        // console.log(this.data.choose_result);
    },


    /**
     * 获取所有省/市/县/区
     */
    getPCC: function () {
        http.get(
            app.globalData.business_host + "city/childrenAll", {
                pcode: "01",
            },
            (status, resultCode, message, data) => {
                this.setData({
                    allAddrList: data
                });
                wx.setStorageSync('allAddrList', this.data.allAddrList);
                this.separateData();
                wx.hideLoading();
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },

    /** 前往物流详情 */
    goToLogisticsDetail: function () {
        wx.navigateTo({
            url: '/pages/tabBar_index/logistics_info_detail/logistics_info_detail?tcode=' + this.data.business_detail.product.logistictempCode,
            success: function (res) {
                app.globalData.onShowEnable = true
            },
        })
    },

    /** 保存分享信息 */
    saveShareInfo: function () {
        if (!wx.getStorageSync('user')) {
            return
        }
        if (!app.globalData.higherLevelCode) {
            return false
        }
        http.post(
            app.globalData.business_host + "/userShare/saveShare", {
                storeCode: this.data.business_detail.storeCode,
                shareUser: app.globalData.higherLevelCode,
                source: "小程序",
            },
            (_status, _resultCode, _message, _data) => {

            },
            (_status, _resultCode, _message, _data) => {}
        );
    },

    imgListChange: function (e) {
        this.setData({
            mainImgIndex: e.detail.current + 1,
        })
    },

    closeFreshOvertimeTips: function () {
        this.setData({
            freshOvertimeTips: false,
        })
    },

    /** 选择项目周边导航点 */
    changeNearbyPointNav: function (e) {
        this.searchNearby(e.currentTarget.dataset.keyword, e.currentTarget.dataset.index)
    },

    /** 搜索周边 */
    searchNearby: function (keyword, index) {
        let that = this
        qqmapsdk.search({
            keyword: keyword,
            location: this.data.business_detail.product.orderRealEstateAttach.lat + "," + this.data.business_detail.product.orderRealEstateAttach.lng,
            success: function (res) {
                let markers = []
                markers.push(that.data.projectLocal)
                for (let i in res.data) {
                    let locationItem = res.data[i]
                    if (keyword == "交通") {
                        locationItem.addressList = locationItem.address.split(",")
                    }
                    locationItem.dis = locationItem._distance.toFixed(0)
                    let markerItem = {}
                    markerItem.id = parseInt(i) + 1
                    markerItem.title = locationItem.title
                    markerItem.latitude = locationItem.location.lat
                    markerItem.longitude = locationItem.location.lng
                    switch (keyword) {
                        case "交通":
                            markerItem.iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/position-bus%403x.png"
                            break;
                        case "餐饮":
                            markerItem.iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/position_ranstuarant%403x.png"
                            break;
                        case "学校":
                            markerItem.iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/potition-school%403x.png"
                            break;
                        case "银行":
                            markerItem.iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/position-bank%403x.png"
                            break;
                        case "医院":
                            markerItem.iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/position-hospital%403x.png"
                            break;
                        case "购物":
                            markerItem.iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/position-shopping%403x.png"
                            break;
                        default:
                            break;
                    }
                    markerItem.width = 30
                    markerItem.height = 30

                    markers.push(markerItem)
                }
                that.setData({
                    projectNearbyList: res.data,
                    markers: markers,

                })
                // console.log(that.data.projectNearbyList)
            },
        })
        this.setData({
            projectNearbyPointNavIndex: index
        })
    },

    /** 跳转项目详情页 */
    goToProjectDetail: function (e) {
        wx.navigateTo({
            url: '/estatePackage/pages/projectDetail/projectDetail?code=' + this.data.business_detail.product.orderRealEstateAttach.code,
        })
    },

    /** 跳转户型页(需要雷达采集) */
    goToHouseLayout: function (e) {
        let item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: '/estatePackage/pages/houseLayout/houseLayout?id=' + item.id + '&higherLevelCode=' + app.globalData.higherLevelCode + '&merchantCode=' + this.data.business_detail.merchant.code + '&eventCode=' + this.data.business_detail.code + '&clerkCode=' + this.data.clerk_code + '&productCode=' + this.data.business_detail.productCode + '&sceneType=order' + this.data.business_detail.merchant.code + '&sceneDT=' + this.data.eventCode,
        })
    },

    /** 商品收藏 */
    goodsFavorites: function () {
        let that = this;
        let url = "userCollect/collect"
        if (that.data.goodsFavorites == 1) {
            url = "userCollect/cancelCollect"
        }
        app.isUserLogin(function (isLogin) {
            if (isLogin) {
                http.post(
                    app.globalData.host + url, {
                        contentCode: that.data.eventCode,
                        type: app.globalData.collectTypeEvent,
                    },
                    (_status, _resultCode, _message, data) => {
                        wx.showToast({
                            title: !that.data.goodsFavorites ? '收藏成功' : '取消收藏成功',
                            icon: "none"
                        })
                        that.setData({
                            goodsFavorites: !that.data.goodsFavorites
                        });
                    },
                    (_status, _resultCode, _message, _data) => {}
                )
            }
        })
    },

    /** 前往VR */
    goToVr: function () {
        let vrUrl = util.vrUrlHandler(this.data.vrUrl, app.globalData.appId)
        wx.navigateTo({
            url: "/pages/web_view_html/web_view_html?webUrl=" + vrUrl
        })
    },

    /** 前往资讯 */
    goToNews: function () {
        wx.navigateTo({
            url: '/estatePackage/pages/news/news?merchantCode=' + this.data.business_detail.storeCode,
        })
    },

    goToNav: function (e) {
        let item = e.currentTarget.dataset.item
        let keyword = this.data.business_detail.product.orderRealEstateAttach.estateSurroundingTags[e.currentTarget.dataset.index].name
        // console.log(item)
        wx.navigateTo({
            url: '/estatePackage/pages/mapNav/index?lat=' + item.location.lat + '&lng=' + item.location.lng + '&title=' + item.title + '&keyword=' + keyword
        })
    },

    markertap: function (e) {
        let markerId = e.markerId
        let markers = this.data.markers

        for (let i in markers) {
            if (markers[i].id == markerId) {
                let item = markers[i]
                wx.navigateTo({
                    url: '/estatePackage/pages/mapNav/index?lat=' + item.latitude + '&lng=' + item.longitude + '&title=' + item.title + '&keyword=' + item.keyword
                })
            }
        }
    },

    /** 导航 */
    openLocation: function () {
        var orderBean = this.data.business_detail.product.orderRealEstateAttach
        wx.openLocation({
            longitude: Number(orderBean.lng),
            latitude: Number(orderBean.lat),
            name: orderBean.title,
            address: orderBean.address,
        })
    },

    /**跳转会员系统我的优惠券列表 */
    goCouponPage: function () {
        if (this.data.vipCouponEmpty) {
            return
        }
        let onshelfCode = this.data.onshelfCode ? this.data.onshelfCode : this.data.business_detail.onshelfCode
        wx.navigateTo({
            url: '/expandPackage/pages/member/coupon/coupon?merchantCode=' + this.data.business_detail.merchant.code + "&onlyUsable=true&displayCheckbox=true&eventCode=" + this.data.eventCode + "&onshelfCode=" + onshelfCode + "&productCode=" + this.data.business_detail.productCode + "&propertie=" + escape(this.data.propertie) + "&total_price=" + this.data.total_price + "&quantity=" + this.data.quantity + "&couponCodes=" + JSON.stringify(this.data.couponCodes) + "&couponIds=" + JSON.stringify(this.data.couponIdList) + "&topTips=false",
        })
    },

    /** 使用会员预充值 */
    useMemberRecharge: function () {
        if (!this.data.enableMemberRecharge) {
            return
        }
        let useMemberRecharge = !this.data.useMemberRecharge
        // let total_vip_price = this.data.total_vip_price
        // if (useMemberRecharge) {
        //     total_vip_price = util.accSubtr(total_vip_price, this.data.usableCredit / 100)
        // } else {
        //     total_vip_price = util.accAdd(total_vip_price, this.data.usableCredit / 100)
        // }
        this.setData({
            useMemberRecharge: useMemberRecharge,
            // total_vip_price: total_vip_price,
        })
        this.countSingleDiscount()
    },

    /** 获取会员预充值 */
    getByMerchantCode: function () {
        http.get(
            app.globalData.business_host + "merchantMemberBalance/getByMerchantCode", {
                merchantCode: this.data.business_detail.storeCode,
            },
            (_status, _resultCode, _message, data) => {
                this.setData({
                    rechargeBalance: data.balance,
                    enableMemberRecharge: data.balance > 0 ? true : false,
                })
                this.countSingleDiscount()
            },
            (_status, _resultCode, _message, _data) => {}
        )
    },

    /** 关闭支付密码 */
    closePayPassword: function () {
        this.setData({
            submitOrderEnable: true,
        })
    },

    /** 验证支付密码 */
    verifyPic: function (e) {
        this.setData({
            payPwd: e.detail,
        })
        // this.toPayMoneySub()
        this.saveOrder()
    },

    /** 前往充值 */
    goToAddCredit: function () {
        wx.showLoading({
            title: '跳转中...',
            mask: true,
        })
        wx.navigateTo({
            url: '/expandPackage/pages/member/credit/addCredit/addCredit?merchantCode=' + this.data.business_detail.merchant.code,
        })
    },

    /** 隐藏显示重新位置授权 */
    hiddenResetLocation: function () {
        this.setData({
            resetLocation: !this.data.resetLocation,
        })
    },

    ResetLocation: function () {
        app.getLocationByUser()
    },
    showAllHeadimg:function(){
        this.setData({
            allHeadimg:!this.data.allHeadimg
        })
    },
    goH5Diediele:function(){
        let urlPre = "https://h5.vicpalm.com/weclubbing";
        if (app.globalData.h5PathTest) {
          urlPre = "https://h5.vicpalm.com/testprojectonline";
        }
        let url= urlPre + '/totalCoupon?shareUserId=' + wx.getStorageSync('user').id +'&eventCode='+this.data.eventCode
          http.post(
            app.globalData.business_host + "share/url/record/saveRecord", {
                storeCode : this.data.business_detail.storeCode,
                url:url,
                eventCode:this.data.eventCode
            },
            (_status, _resultCode, _message, data) => {
            },
            (_status, _resultCode, _message, _data) => {}
        )
    }
})