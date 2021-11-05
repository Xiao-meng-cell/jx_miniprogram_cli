// miniprogram/pages/live/live.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/http.js');
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
const npmBuffer = require('/buffer');
var qqmapsdk;

let WebIM = require("../../webIm/WebIM")["default"];
let logout = false;

/**ipush websocket start */
var PING = 1
var MESSAGE = 2
var REGISTER = 3
var wsIpush = null;
var pingStaute = 0; //发ping标识 ，0是不要发，1是可以发
var reConTimes = 0; //重连次数
var sendRelation = 0; //im发送邀请关系，0是未发送，1是已发送
var TOTAL_TRY_TIME = 3; // n次ping发不出去，用作一个标识
var hadTryTime = 0; //重连次数，看看是不是和reConTimes重复了
/**ipush websocket end */

var regExp = new RegExp("/[^x00-x80]/");
var onloadOptions = null;

var huanXinMessage = []; //环信队列，长度不能太长
var huanXinMessage_timer = null; //环信队列监听
var userHaveJoin = {}; //用户进入直播间队列
var live_red_envelope = []; //红包消息特效队列
var live_red_bgm = null; //红包背景音乐
var redMp3 = 'https://oss.vicpalm.com/static/redRadio/red_radio.mp3'; //红包背景音乐url
var listenRed_envelope_timer = null; //红包监听

//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        networkType: true, //监听网络连接与断开
        scene: 'live',
        sceneDT: '',
        liveBg: '',
        capsuleTop: 0,
        capsuleHeight: 0,
        iphone_x: app.globalData.iPhone_X, //是否为iphonex
        merchantCode: "", //商家编号
        merchantInfo: "", //商家信息
        businessStatus: "", //商家状态
        sharerMerchantCode: "", //分享者商家编号
        roomId: "", //聊天室ID
        liveUrl: "", //直播地址
        isgiftHidden: true, //红包是否隐藏, 默认不显示
        liveTitle: "", //直播标题
        liveUserId: "", //直播用户ID
        offline: false, //主播离线
        clerkCode: '', //名片code
        onlineTotal: 0, //在线总人数
        inviteEnable: false, //开启邀请申请名片
        imInput_holdKeyBoard: true, //是否收起键盘
        onInput_holdKeyBoard: true, //外部是否收起键盘
        userRole: -1, //当前用户角色（-1：非员工；0：共享合伙人；1：事业合伙人；2：商家）
        imInput_focus: false, //是否
        chartroomDisplay: false, //聊天室是否显示
        messageList: [], //聊天室消息列表
        scroll_into_message: 0, //滚动到制定的消息位置
        currentUser: "",
        msgObj: "", //自己发的消息
        topGoods: false, //显示置顶商品
        onInput: false, //是否在输入状态
        loginCon: false, //是否已经登录上环信
        live_conDevice: null, //启用定时重连
        fromApp: false, //是否从app过来
        fromSaleMan: null, //来自哪个业务员
        isPrivate: 0, //是否为私密房间
        password: "", //房间密码
        inputPassword: false, //输入密码
        pwdText: '', //密码文本
        passwordError: false,
        redIndex: 0,
        redDoneTimes: 0, //图片加载是否全部完成 
        redIndex: 0,
        redMp3: 'https://oss.vicpalm.com/static/redRadio/red_radio.mp3',
        live_red_bgm: null,
        live_red_envelope: [], //红包队列
        playReady: true, //红包播放准备
        selectedRedEnvelope: false, //选择红包
        giftList: "", //红包列表
        giftCode: "", //选中红包code
        giftPrice: "", //选中红包面额
        selectedGift: "", //选中红包
        testServer: app.globalData.testServer, //是否为测试服
        isConIpush: 0, //是否正确打开了ipush链接，并且ping正常
        pingStaute: 0, //ping状态，不为1视为正常
        databank: [], //资料库
        databankHidden: true, //资料库隐藏
        databankPageIndex: 1,
        databankPageIndex_add: 0, //二维数组下标
        databankTopNum: 0, //资料库列表距顶
        databankTextContent: "", //资料库文本资料内容
        databankAudioHidden: true, //资料库音频资料隐藏显示
        databankAudioPlaying: false, //资料库音频资料是否播放
        databankAudio: "", //资料库音频
        databankMapHidden: false, //资料库地图资料隐藏显示
        displayDataBankDetail: false,
        unload: false, //离开本页，不再重连socket
        skipTipsHidden: true, //跳转提示隐藏
        wideScreen: false, //是否为宽屏
        platform: null, //当前系统devtools,ios,android
        inviteMan: null, //邀请人
        goodsListDisplay: false, //商品列表是否显示
        pageIndex: 1,
        pageLimit: 10,
        business_activity_list: [],
        business_activity_list_new: [],
        pageIndex_add: 0, //二维数组下标
        business_activity_load_all: false, //商品加载完毕
        databank_load_all: false, //资料库加载完毕
        map_flag_buding: false,
        map_flag_bus: false,
        map_flag_school: false,
        map_flag_food: false,
        map_flag_buy: false,
        map_flag_bank: false,
        firstHorizontal: true, //第一次横屏直播提示
        topFile: null, //置顶文件
        cartNum: null, //购物车数量
        loading_reload: true, //是否显示加载loading
        loading_reload_text: "加载中...",
        listen_im_open: 0, //环信重连次数
        popupOpen: true, //是否已经打开了弹窗
        messageQueue: {}, //消息待回执队列
        checkClick: true, //发送消息时间，用于防止刷屏
        playerMode: "contain", //直播画面模式
        liveStream: 0, //直播码流
        liveStreamHidden: true, //隐藏切换码流
        inputBottom: '',
        fileInfo: {},
        isShowFile: false,
        sendSuccess: false, //聊天消息是否发送成功
        sendTimer: null,
        sendNum: 0, //累计发送消息不出次数
        moreOperateHidden: true, //隐藏更多操作
        complaintMainHidden: true, //隐藏投诉主体
        complaintImgList: [], //投诉图片列表
        complaintText: "", //投诉内容
        waitUploadCount: 0, //等待上传图片数量
        imgUploading: false, //图片上传中
        shareType: 'live', //分享类型
        liveMuted: false, //直播静音
        timer: null, //雷达时间采集定时器
        skipSecond_timeDevice: null,
        skipSecond: '',
        skipSecond_timeDevice: '',
        startTime: null,
        keepout: false,
        goodsTagList: [], //商品分类列表
        goodsTagSelectedIndex: 0, //选中商品分类下标
        goodsCategoryCode: "", //选中商品分类编号
        newsIndex: '',
        recording: false, //是否在回放点播视频
        beginTime: '', //预播时间
        cleanStatut: false, //清屏各组件的状态
        autoplay: true, //是否自动播放·
        muted: false, //是否静音onhide
        loop: true, //是否循环播放
        controls: true, //是否显示播放控件
        ctvVideoPlaying: true, //视频模板视频是否播放
        recordingInfoInterval: null,
        inviteStatus: null,
        initialTime: null, //录播视频当前播放位置
        playBtn: false, //录播视频播放按钮
    },

    /** 获取平台 */
    getPlatform: function () {
        var that = this;
        let res = wx.getSystemInfoSync();
        that.setData({
            platform: res.platform,
        });
        if (res.platform == "ios") {
            let wxVersion = util.compareVersion(app.globalData.wxVersion, "7.0.12");
            let isTipsVersion = wx.getStorageSync("isTipsVersion");
            if (wxVersion < 0 && isTipsVersion != 1) {
                wx.showModal({
                    title: '当前微信版本低',
                    content: '您当前的微信版本较低，部分功能将无法使用，为了更佳的观看体验，建议将微信升级到最新版本',
                })
            }
            wx.setStorageSync("isTipsVersion", 1);

        } else if (res.platform == "android") {
            let wxVersion = util.compareVersion(app.globalData.wxVersion, "7.0.14");
            let isTipsVersion = wx.getStorageSync("isTipsVersion");
            if (wxVersion < 0 && isTipsVersion != 1) {
                wx.showModal({
                    title: '当前微信版本低',
                    content: '您当前的微信版本较低，部分功能将无法使用，为了更佳的观看体验，建议将微信升级到最新版本',
                })
                wx.setStorageSync("isTipsVersion", 1);
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        app.watch(that.watchBack); //监听网络变化
        app.getOptions(options, function (data, fromApp) {
            that.initOptions(data)
            if (fromApp == 1) {
                that.setData({
                    fromApp: true,
                })
                that.onShow()
            }
        }, function (data, qrcode_scene) {
            //旧小程序码
            //获取商家code
            if (qrcode_scene.split("$")[1]) {
                that.setData({
                    merchantCode: qrcode_scene.split("$")[1],
                })
            }
            //获取聊天室ID
            if (qrcode_scene.split("$")[2]) {
                that.setData({
                    roomId: qrcode_scene.split("$")[2],
                })
            }
            //获取名片Code
            if (qrcode_scene.split("$")[3]) {
                that.setData({
                    clerkCode: qrcode_scene.split("$")[3],
                })
            }
            that.initOptions(data)
        }, function (data, qrcode_scene) {
            //旧二维码
            let higherLevelCode = util.getQueryString(qrcode_scene, "user");
            let merchantCode = util.getQueryString(qrcode_scene, "id");
            let clerkCode = util.getQueryString(qrcode_scene, "clerk");
            let sharerMerchantCode = util.getQueryString(qrcode_scene, "channelCode"); //待定
            //&是我们定义的参数链接方式
            if (higherLevelCode) {
                app.globalData.higherLevelCode = higherLevelCode;
                app.globalData.isReloadThePage_tabBar_index = true;
                app.globalData.jumpIndex_fromApp = true;
            }
            if (merchantCode) {
                that.setData({
                    merchantCode: merchantCode,
                })
            }
            if (clerkCode) {
                that.setData({
                    clerkCode: clerkCode,
                })
            }
            if (sharerMerchantCode) {
                that.setData({
                    sharerMerchantCode: sharerMerchantCode,
                })
            }
            that.initOptions(data)
        })
    },
    //初始化参数
    initOptions(options) {
        onloadOptions = options;
        console.log(options);
        this.checkNetState();
        this.getPlatform();
        // if (this.data.platform != "android" && this.data.platform != "ios") {//禁用手机、平板以外的端观看直播，防止刷屏,开发过程中请注释这个判断
        //   return false;
        // }
        if (options) {
            //从别的小程序跳进来 options.query
            if (options.query) {
                console.log("获取到跳转小程序的参数");
                console.log(options.query);
                wx.showModal({
                    title: '从别的小程序跳过来',
                    content: options.query,
                })
            }
            //页面跳转获取参数
            if (options.merchantCode) {
                this.setData({
                    merchantCode: options.merchantCode,
                })
            }
            if (options.roomId) {
                this.setData({
                    roomId: options.roomId,
                })
            }
            if (options.higherLevelCode) {
                app.globalData.higherLevelCode = options.higherLevelCode;
            }
            if (options.clerk_code) {
                this.setData({
                    clerkCode: options.clerk_code,
                })
            }
            if (options.channelCode) {
                this.setData({
                    sharerMerchantCode: options.channelCode,
                });
            }
            if (options.sceneType) {
                this.setData({
                    scene: options.sceneType,
                });
            }
            if (options.sceneDT) {
                this.setData({
                    sceneDT: options.sceneDT,
                });
            }
            this.getGoodsType();
            qqmapsdk = new QQMapWX({
                key: app.globalData.qqMapKey
            });
        }
        this.getBusinessInfo()
        this.getBusinessStatus()
        this.sendIpushPing()
        this.getHuanXinMessage();
        this.setData({
            testServer: (app.globalData.host == 'https://www.vicpalm.com/weclubbing/remote/' ? false : true),
        })
        //阻止小程序锁屏
        wx.setKeepScreenOn({
            keepScreenOn: true,
        })
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
        this.setData({
            capsuleTop: app.globalData.capsuleTop,
            capsuleHeight: app.globalData.capsuleHeight,
        });
        this.ctx = wx.createLivePlayerContext('player')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
        app.isUserLogin(function (isLogin) {
            if (isLogin) {
                if (that.data.merchantCode) {
                    that.logonCallback();
                }
                /**获取购物车数量 */
                app.loadCartNum(function (tabBar) {
                    that.setData({
                        cartNum: tabBar.list[2].number
                    });
                })
                that.getUserLander(wx.getStorageSync('user').id);
            }
        })
        that.data.startTime = util.timestamp();
        if (app.globalData.roomId != '' && app.globalData.imAccessToken != '') {
            that.setData({
                loginCon: true
            });
        }
        that.setData({
            sendSuccess: false,
            pwdText: '',
        });
        //查询缓存中是否有待发送商品
        if (wx.getStorageSync('waitSendGoods')) {
            let goodsObj = wx.getStorageSync('waitSendGoods')
            wx.removeStorageSync('waitSendGoods')
            that.userSendIm(JSON.stringify(goodsObj), "goods");
        }

        if (that.data.merchantCode && that.data.merchantCode != '') {
            if (that.data.clerkCode && that.data.clerkCode != '' && that.data.sharerMerchantCode && that.data.sharerMerchantCode != '') {
                that.checkClerkRole();
                that.checkUserRole();
                that.getBusinessActivity();
            }
        }
        that.initPlayRedBgm();
        that.onListenRed_envelope();

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        if (this.data.recording) {
            let {
                liveUrl,
                initialTime
            } = this.data
            let arr = app.globalData.initialData
            let brr = []
            if (arr == '') {
                brr.push({
                    liveUrl: liveUrl,
                    time: initialTime
                })
                app.globalData.initialData = brr
            } else {
                for (let i in arr) {
                    if (liveUrl == arr[i].liveUrl) {
                        arr.splice(i, 1)
                    }
                }
                brr = arr
                brr.push({
                    liveUrl: liveUrl,
                    time: initialTime
                })
                app.globalData.initialData = brr
            }

            console.log('rrrrrrr', app.globalData.initialData)
        }

        clearInterval(this.data.timer);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        if (live_red_bgm) {
            live_red_bgm.stop();
        }
        clearInterval(this.data.timer);
        clearInterval(this.data.olTotal_timeDevice);
        clearInterval(this.data.live_conDevice);
        clearInterval(this.data.ping_timer);
        clearInterval(this.data.skipSecond_timeDevice);
        clearInterval(this.data.skip_timeDevice);
        clearInterval(this.data.listen_im_open_timer);
        clearInterval(listenRed_envelope_timer);
        clearInterval(huanXinMessage_timer);
        this.setData({
            unload: true,
            pingStaute: 0
        })
        wsIpush = null;
        hadTryTime = 0;
        app.globalData.imAccessToken = null;
        wx.closeSocket();
        // wx.offDeviceMotionChange()
        wx.stopDeviceMotionListening()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        // console.log("用户下拉刷新");
        this.setData({
            loading_reload: false
        });
        let that = this;
        that.logonCallback();
        setTimeout(function () {
            wx.stopPullDownRefresh();
            that.setData({
                loading_reload: true
            });
        }, 1500);

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 跳转至企业首页(需要雷达采集)
     */
    jumpBusinessHomePage: function (e) {
        wx.navigateTo({
            url: '/pages/tabBar_index/business_homepage/business_homepage?tagCode=' + this.data.merchantInfo.tagcode + "&merchantCode=" + this.data.merchantInfo.code + '&higherLevelCode=' + app.globalData.higherLevelCode + "&showStorePhone=1&sceneType=live&sceneDT=" + this.data.merchantCode,
        })
    },

    /**浏览时长统计 */
    postStayTime() {
        if (!wx.getStorageSync('user')) {
            clearInterval(this.data.timer);
            return;
        }
        http.post(
            app.globalData.host + "collect/pingLiveView", {
                batchShare: app.globalData.batchShare,
                merchantCode: this.data.merchantCode,
                channelCode: this.data.sharerMerchantCode != "" ? this.data.sharerMerchantCode : this.data.merchantInfo.code,
                userId: wx.getStorageSync('user').id,
                scene: this.data.scene == "" ? "wxapp" + this.data.merchantCode : this.data.scene,
                sceneDT: this.data.sceneDT,
                stayTime: app.globalData.stayTime,
                visitor: wx.getStorageSync('visitor'), //游客标识
                higherLevelCode: app.globalData.higherLevelCode ? app.globalData.higherLevelCode : '',
                h5Once: this.data.startTime,
                clerkUserCode: this.data.clerkCode ? this.data.clerkCode : '',
                accessRoutes: app.globalData.accessRoutes,
                routesDescribe: app.globalData.routesDescribe,
                pageId: "livePackage/pages/live/live",
                pageDescribe: "直播页",
                progress: 100,
            },
            (status, resultCode, message, data) => {
                let tempDate2 = new Date()
                // console.log('浏览时间统计成功:' + tempDate2.getHours() + ":" + tempDate2.getMinutes() + ":" + tempDate2.getSeconds());
            },
            (status, resultCode, _message, data) => {

            }
        )
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        if (wx.getStorageSync('user')) {
            app.Shareacquisition(this.data.shareType, this.data.merchantCode, null, null, null, this.data.clerkCode, null, null)
        }
        let title = (this.data.liveTitle && this.data.liveTitle != "") ? (this.data.liveTitle + '的直播，快来看！') : ((!this.data.merchantInfo.shortName || this.data.merchantInfo.shortName == "") ? (this.data.merchantInfo.name + '的直播间，快来看！') : (this.data.merchantInfo.shortName + '的直播间，快来看！'));
        let imgUrl = this.data.merchantInfo.bgUrls[0] + "?x-oss-process=image/resize,m_fill,w_800,h_640";
        return {
            imageUrl: imgUrl,
            title: title,
            path: "livePackage/pages/live/live?merchantCode=" + this.data.merchantCode + "&roomId=" + this.data.roomId + (wx.getStorageSync('user') ? ("&higherLevelCode=" + wx.getStorageSync('user').userCode) : "") + "&clerk_code=" + (this.data.userRole >= 0 ? wx.getStorageSync('userCode') : this.data.clerkCode) + '&batchShare=' + app.globalData.batchShare
        }
    },

    /**监听视频播放时间 */
    timeupdate: function (e) {
        let currentTime = parseInt(e.detail.currentTime)
        this.setData({
            initialTime: currentTime
        })
    },

    /** 手机翻转后页面重置调用 */
    onResize: function (res) {
        if (res.size.windowWidth > res.size.windowHeight) {
            this.setData({ //横屏
                wideScreen: true,
                playerMode: "contain",
                inputBottom: 0
            })
        } else {
            this.setData({ //竖屏
                wideScreen: false,
                playerMode: "fillCrop",
                inputBottom: 0
            })
        }
    },

    /**
     * 登录成功回调
     */
    logonCallback: function () {
        this.conIpush();
        this.getBusinessActivity()
        this.getChatroomInfo();
        this.checkClerkRole()
        this.checkUserRole()
        this.setData({
            currentUser: wx.getStorageSync('user'),
        })
    },

    /**
     * 跳转到商家商品页
     */
    jumpGoods: function () {
        wx.navigateTo({
            url: '/pages/live/goods/goods?merchantCode=' + this.data.merchantCode + '&clerkCode=' + (this.data.userRole >= 0 ? wx.getStorageSync('userCode') : this.data.clerkCode),
        })
    },

    /**
     * 跳转到购物车
     */
    jumpCart: function () {
        wx.navigateTo({
            url: '/pages/tabBar_index/cart/cart',
        })
    },

    /**判断后端是否隐藏红包 */
    giftHidden: function () {
        http.get(
            app.globalData.host + "config/vars", {},
            (status, resultCode, message, data) => {
                if (data && data.gift_hidden == 0) {
                    this.setData({
                        isgiftHidden: false
                    });
                } else {
                    this.setData({
                        isgiftHidden: true
                    });
                }
                console.log('eeeeeeeeeeeee', this.data.isgiftHidden)
            },
            (status, resultCode, message, data) => {

            }
        );
    },

    /**2秒隐藏提示语 */
    warnHide: function () {
        let i = 0;
        let that = this;
        let warnTime = setInterval(function () {
            i++;
            if (i == 5) {
                i = 0;
                console.log(i);
                that.data.messageList.shift();
                that.setData({
                    messageList: that.data.messageList
                });
                clearInterval(warnTime);
            }
        }, 1000);
    },

    /** 获取直播间信息 */
    getChatroomInfo: function () {
        let that = this
        if (!wx.getStorageSync('user')) {
            return;
        }
        http.get(
            app.globalData.im + "/chatroom/getChatroomByCode", {
                merchantCode: this.data.merchantCode,
            },
            (_status, _resultCode, _message, data) => {
                if (data && data.recordingUrl) {
                    let brr = app.globalData.initialData
                    for (let i in brr) {
                        if (brr[i].liveUrl == data.recordingUrl) {
                            this.setData({
                                initialTime: brr[i].time
                            })
                            break
                        } else {
                            this.setData({
                                initialTime: 0
                            })
                        }
                    }
                    // console.log('ttttt', this.data.initialTime,data.recordingUrl)
                }

                if (data && data.pullUrl || data && data.recordingUrl) {
                    // console.log("获取直播间信息")
                    // console.log(data)
                    app.globalData.roomId = data.chatroomId;

                    let obj = {
                        userid: wx.getStorageSync('user').id,
                        groupid: app.globalData.roomId,
                        type: 2
                    }
                    this.sendMsg(JSON.stringify(obj), PING);
                    // console.log('messageList=======', this.data.messageList);
                    if ((data.pullUrl != "" && data.pullUrl != null) || (data.recordingUrl != "" || data.recordingUrl != null)) {
                        if (this.data.messageList.length > 0) {
                            this.data.messageList.unshift({
                                from: "wxapp",
                                type: "warn",
                                text: "欢迎来到直播间！掌创人生提倡绿色健康直播，直播内容和评论严禁出现违法违规，低俗色情，吸烟酗酒等内容，若有违反，将视情节严重程度对作者账号进行禁播、永久禁播或封停账号处理。",
                            });
                        } else {
                            this.setData({
                                messageList: [{
                                    from: "wxapp",
                                    type: "warn",
                                    text: "欢迎来到直播间！掌创人生提倡绿色健康直播，直播内容和评论严禁出现违法违规，低俗色情，吸烟酗酒等内容，若有违反，将视情节严重程度对作者账号进行禁播、永久禁播或封停账号处理。",
                                }],
                            })
                        }
                    }
                    this.setData({
                        liveBg: data.bgUrl,
                        recording: data.recordingUrl && data.recordingUrl != '' ? true : false,
                        roomId: data.chatroomId,
                        liveUrl: data.recordingUrl && data.recordingUrl != '' ? data.recordingUrl : data.pullUrl,
                        liveUserId: data.owner,
                        liveTitle: data.description ? data.description : "",
                        offline: data.pullUrl || data.recordingUrl ? false : true,
                        olTotal_timeDevice: data.pullUrl == "" || data.pullUrl == null ? null : setInterval(function () {
                            that.getOnlineTotal();
                        }, 5000),
                        isPrivate: data.isPrivate,
                        password: data.password,
                        inputPassword: data.isPrivate == 0 ? false : true,
                    })
                    this.getRecordingInfo();
                    let that = this;
                    this.setData({
                        recordingInfoInterval: setInterval(function () {
                            that.getRecordingInfo();
                        }, 5 * 60 * 1000),
                    });
                    this.giftHidden();
                    if (this.data.isPrivate == 0) {
                        this.getUserLoginInfo();
                        this.warnHide();
                    }
                    this.getGiftList();
                    this.getDatabank();
                    this.saveShareInfo();
                    this.checkUserCode();

                    if (this.data.recording) {
                        this.clerkTemplateVideoContext = wx.createVideoContext('clerkTemplateVideo')
                    }
                } else {
                    this.setData({
                        offline: true,
                    })
                    if (this.data.offline && this.data.skipTipsHidden) {
                        this.setData({
                            skipTipsHidden: false,
                            skipSecond: 2,
                            skipSecond_timeDevice: setInterval(function () {
                                that.skipSecond();
                            }, 1000),
                            skip_timeDevice: setInterval(function () {
                                that.skipOther();
                            }, 2000),
                        })
                    }
                }
                wx.hideLoading()
            },
            (_status, _resultCode, _message, _data) => {
                wx.hideLoading()
                this.setData({
                    offline: true,
                })
                if (this.data.offline && this.data.skipTipsHidden) {
                    this.setData({
                        skipTipsHidden: false,
                        skipSecond: 2,
                        skipSecond_timeDevice: setInterval(function () {
                            that.skipSecond();
                        }, 1000),
                        skip_timeDevice: setInterval(function () {
                            that.skipOther();
                        }, 2000),
                    })
                }
            }
        );
    },

    //获取预播时间
    getRecordingInfo: function () {
        http.get(
            app.globalData.im + "/recording/precast/next", {
                chatroomId: this.data.roomId,
            },
            (_status, _resultCode, _message, data) => {
                clearInterval(this.data.recordingInfoInterval);
                if (data.beginTime) {
                    this.setData({
                        beginTime: util.tsFormatTime(data.beginTime * 1000, "Y-M-D h:m")
                    })
                }
            },
            (_status, _resultCode, _message, _data) => {
                wx.hideLoading()
            }
        );
    },

    /**
     * 获取企业详情信息
     */
    getBusinessInfo: function () {
        let that = this;
        http.get(
            app.globalData.host + "biz/user/merchant/info", {
                merchantCode: this.data.merchantCode
            },
            (_status, _resultCode, _message, data) => {
                this.setData({
                    merchantInfo: data,
                });
            },
            (_status, _resultCode, _message, _data) => {
                wx.hideLoading()
            }
        );
    },

    /** 保存分享信息 */
    saveShareInfo: function () {
        if (!wx.getStorageSync('user')) {
            return false
        }
        if (!app.globalData.higherLevelCode) {
            return false
        }
        http.post(
            app.globalData.business_host + "/userShare/saveShare", {
                storeCode: this.data.merchantCode,
                shareUser: app.globalData.higherLevelCode,
                liveCode: this.data.roomId,
                source: "小程序",
            },
            (_status, _resultCode, _message, _data) => {},
            (_status, _resultCode, _message, _data) => {}
        );
    },

    /** 申请名片 */
    applyCard: function () {
        if (this.data.userRole > -1) {
            return false
        }

        let role = '0';
        if (this.data.fromSaleMan && this.data.fromSaleMan.role == 2) { //商家邀请事业合伙人，事业合伙人邀请共享合伙人
            role = '1';
        }
        wx.navigateTo({
            url: '/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply?merchantCode=' + this.data.merchantCode + (this.data.inviteStatus == 1 ? '&invite=true' : '') + (this.data.inviteEnable ? "&higherLevelCode=" + this.data.clerkCode : '') + "&role=" + role + '&inviteStatus=' + this.data.inviteStatus,
        })
        console.log(this.data.inviteStatus, this.data.merchantCode, role)
    },
    /**
     * 审核申请
     */
    isInvite: function () {
        http.get(
            app.globalData.host + "biz/merchant/config/value/get", {
                merchantCode: this.data.merchantCode,
                type: 'liveApplyClerk',
                code: 'live.apply.clerk'
            },
            (status, resultCode, message, data) => {
                if (data && data.value == '2') {
                    this.setData({
                        inviteStatus: 2, //需要审核
                        inviteEnable: false
                    })
                } else {
                    this.setData({
                        inviteStatus: 1, //不需要审核
                        inviteEnable: true
                    })
                }
                this.applyCard()
            },
            (status, resultCode, message, data) => {}
        );
    },

    /** 退出直播间 */
    exitLive: function () {
        var pages = getCurrentPages()
        if (pages.length > 1) {
            wx.navigateBack({
                delta: 1
            })
        } else {
            wx.redirectTo({
                url: '/pages/tabBar_index/business_homepage/business_homepage' + '?higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=live&sceneDT=' + this.data.merchantCode,
            })
        }
    },


    /**
     * 跳转到我的名片
     */
    jumpClerk: function () {
        wx.redirectTo({
            url: "/pages/clerk/show/show?higherLevelCode=" + this.data.clerkCode + "&workerId=" + this.data.workerId + "&merchantCode=" + this.data.merchantCode + '&higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=live&sceneDT=' + this.data.merchantCode,
        })
    },


    /**
     * 跳转商家主页
     */
    jumpHomePage: function () {
        wx.navigateTo({
            url: '/livePackage/pages/liveInfo/liveInfo?merchantCode=' + this.data.merchantCode + '&roomId=' + this.data.roomId + '&higherLevelCode=' + app.globalData.higherLevelCode,
        })
    },


    /**收藏企业、取消收藏*/
    favoritesOperate() {
        let that = this;
        let url = "userCollect/collect"
        if (that.data.merchantInfo.isFavorites == 1) {
            url = "userCollect/cancelCollect"
        }
        app.isUserLogin(function (isLogin) {
            if (isLogin) {
                http.post(
                    app.globalData.host + url, {
                        contentCode: that.data.merchantCode,
                        type: 'company'
                    },
                    (status, resultCode, message, data) => {
                        wx.showToast({
                            title: that.data.merchantInfo.isFavorites == 0 ? '收藏成功' : '取消收藏成功',
                            icon: "none"
                        })
                        that.setData({
                            ['merchantInfo.isFavorites']: !that.data.merchantInfo.isFavorites
                        });
                    },
                    (status, resultCode, message, data) => {}
                );
            }
        })
    },

    /** 阻止鼠标操作 */
    stopMouseOperate: function () {

    },

    /** 获取在线总人数 */
    getOnlineTotal: function () {
        http.get(
            app.globalData.im + "chatroom/chatroomAffiliationsCount", {
                chatroomId: this.data.roomId,
            },
            (_status, _resultCode, _message, _data) => {
                this.setData({
                    onlineTotal: _data > 0 ? _data : this.data.onlineTotal,
                })
            },
            (_status, _resultCode, _message, _data) => {}
        );
    },

    /** 检查名片角色 */
    checkClerkRole: function () {
        if (!this.data.clerkCode) {
            return false;
        }
        http.get(
            app.globalData.host + "/biz/user/merchant/clerk/checkSalesman", {
                merchantCode: this.data.sharerMerchantCode != "" && this.data.merchantCode != this.data.sharerMerchantCode ? (this.data.sharerMerchantCode) : (this.data.merchantCode),
                userCode: this.data.clerkCode,
            },
            (_status, _resultCode, _message, _data) => {
                this.setData({
                    fromSaleMan: _data
                });
                if (_data && _data.role > 0) {
                    this.setData({
                        inviteEnable: true,
                    })
                }
            },
            (_status, _resultCode, _message, _data) => {}
        );
    },

    /** 检查当前用户角色 */
    checkUserRole: function () {
        if (!this.data.merchantCode || !wx.getStorageSync('user')) {
            return false;
        }
        if (!wx.getStorageSync('user')) {
            return false;
        }
        http.get(
            app.globalData.host + "/biz/user/merchant/clerk/status", {
                merchantCode: this.data.sharerMerchantCode != "" && this.data.merchantCode != this.data.sharerMerchantCode ? (this.data.sharerMerchantCode) : (this.data.merchantCode),
                userId: wx.getStorageSync('user').id,
            },
            (_status, _resultCode, _message, _data) => {
                this.setData({
                    userRole: _data,
                })
                let that = this;
                // if (!that.data.fromApp) {
                //     that.postStayTime();
                // }
                // clearInterval(this.data.timer);
                // that.data.timer = setInterval(function () {
                //     that.postStayTime();
                // }, app.globalData.stayTime);
            },
            (_status, _resultCode, _message, _data) => {}
        );
    },



    /**
     * 环信用户登录
     */
    getUserLoginInfo: function () {
        http.get(
            app.globalData.im + "user/auth", {},
            (_status, _resultCode, _message, data) => {
                app.globalData.imUserInfo = data;
                this.userLoginIm();
            },
            (_status, _resultCode, _message, _data) => {
                console.log(_data);
            }
        );
    },
    /**
     * 初始化IM
     */
    initIM: function () {
        let that = this;
        WebIM.conn.listen({
            onOpened(message) {
                if (app.globalData.imAccessToken != '' && app.globalData.roomId != '') {
                    WebIM.conn.joinChatRoom({
                        roomId: app.globalData.roomId, // 聊天室id
                        success: function (res) {
                            if (res.data && res.data.result) {
                                that.imGetUserInfo(res.data.user); //发送用户加入聊天室信息
                            }
                        }
                    });
                }
            },
            onReconnect() {
                wx.showToast({
                    title: "重连中...",
                    duration: 2000
                });
            },
            onSocketConnected() {
                wx.showToast({
                    title: "socket连接成功",
                    duration: 2000
                });
            },
            onClosed() {
                WebIM.conn.close();
            },
            onPresence(message) {
                // console.log("onPresence", message);
                switch (message.type) {
                    case "leaveGroup":
                        // console.log('用户离开直播间' + message.from, '==========', app.globalData.imUserInfo.userId);
                        break;
                    case "memberJoinChatRoomSuccess": // 用户进入直播间
                        // console.log('用户进入直播间' + message.from, '==========', app.globalData.imUserInfo.userId);
                        if (message.from != app.globalData.imUserInfo.userId) {
                            that.imGetUserInfo(message.from); //发送用户加入聊天室信息
                        }
                        console.log('用户进入直播间' + message.from);
                        break;
                    case "removedFromGroup":
                        // console.log('用户离开直播间' + message.from, '==========', app.globalData.imUserInfo.userId);
                        // if (message.from == app.globalData.imUserInfo.userId) { //用户被迫下线，重新登入im
                        //   that.setData({
                        //     loginCon: false
                        //   });
                        //   that.imGetUserInfo(message.from);//发送用户加入聊天室信息
                        // }
                        break;
                    default:
                        break;
                }
            },
            onTextMessage(message) {
                let msg = {}
                msg.data = message.data;
                that.handlerChatRoomMessage(msg);
            },

            onClose(message) {
                // console.log('环信关闭了=============', message);
            },

            // 各种异常
            onError(error) {
                if (that.data.loading_reload) {
                    that.setData({
                        loading_reload: false,
                        loading_reload_text: "当前网络不稳定，下拉重新加载..."
                    });
                }
                if (app.globalData.imAccessToken != '' && app.globalData.roomId != '') {
                    WebIM.conn.joinChatRoom({
                        roomId: app.globalData.roomId, // 聊天室id
                        success: function (res) {
                            if (res.data && res.data.result) {
                                that.imGetUserInfo(res.data.user); //发送用户加入聊天室信息
                            }
                        }
                    });
                }
                // if (error.type == 'socket_error') {///sendMsgError
                // 	wx.showToast({
                // 		title: "网络已断开",
                // 		icon: 'none',
                // 		duration: 2000
                // 	});
                // }
            },
        });
    },

    /**
     * 环信用户登录
     */
    userLoginIm: function () {
        let app = getApp();
        let that = this;
        let options = {
            apiUrl: WebIM.config.apiURL,
            user: app.globalData.imUserInfo.userId,
            pwd: app.globalData.imUserInfo.password,
            grant_type: 'password',
            appKey: WebIM.config.appkey,
            success: function (res) {
                if (res && res.access_token) {
                    app.globalData.imAccessToken = res.access_token;
                    that.initIM();
                }
            },
            error: function () {}
        }
        WebIM.conn.open(options);
    },

    /****直播间互动采集 */
    collectLiveSpeak() {
        http.post(
            app.globalData.host + "collect/collectLiveSpeak", {
                merchantCode: this.data.merchantCode,
                higherLevelCode: app.globalData.higherLevelCode ? app.globalData.higherLevelCode : '',
                batchShare: app.globalData.batchShare,
                optType: 'live',
                operation: 'liveSpeak',
                visitor: wx.getStorageSync('visitor'), //游客标识
            },
            (status, resultCode, message, data) => {
                console.log('直播间互动采集成功');
            },
            (status, resultCode, _message, data) => {

            }
        );
    },

    /**
     * 用户发送信息
     */
    userSendIm: function (msg, type) {
        //直播间互动采集
        this.collectLiveSpeak();
        let app = getApp();
        let that = this;
        let time = new Date();
        time = util.tsFormatTime(time, "Y年M月D h:m");
        let msgObj = {
            from: wx.getStorageSync('user').id,
            text: msg,
            type: type,
            sendTime: time,
            chatroomId: app.globalData.roomId,
            userName: wx.getStorageSync('user').nickname,
            headimg: wx.getStorageSync('user').headimg,
        };
        var i = 1;
        if (this.data.checkClick) {
            that.data.sendTimer = setInterval(function () {
                i++;
                if (i == 2 && !that.data.sendSuccess) { //2秒钟消息没有发出，做相应提示
                    i = 0;
                    clearInterval(that.data.sendTimer);
                    if (that.data.loading_reload) {
                        that.setData({
                            loading_reload: false,
                            loading_reload_text: "当前网络不稳定,消息无法发送，下拉刷新试试..."
                        });
                        setTimeout(function () {
                            that.setData({
                                loading_reload: true
                            });
                        }, 5000);
                    }
                }
            }, 1000)

            let id = WebIM.conn.getUniqueId();
            let msg = new WebIM.message('txt', id);
            let roomId = app.globalData.roomId;
            msg.set({
                msg: JSON.stringify(msgObj),
                to: roomId,
                chatType: 'chatroom',
                roomType: true,
                ext: {}, // 扩展消息
                success: function () {
                    i = 1;
                    clearInterval(that.data.sendTimer);
                    that.setData({ //清空输入框
                        message: "",
                        sendSuccess: true
                    });
                    let msg = {};
                    msg.data = JSON.stringify(msgObj);
                    that.handlerChatRoomMessage(msg);
                }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
                fail: function () {
                    console.log('消息发送失败==========');
                }
            });
            msg.setGroup('groupchat'); // 群聊类型
            WebIM.conn.send(msg.body);
        } else {
            wx.showToast({
                title: '操作太频繁了',
                icon: "none"
            })
            return false;
        }
        this.data.checkClick = false;
        setTimeout(function () {
            that.data.checkClick = true;
        }, 2000);
    },

    /**
     * 获取用户输入的信息
     */
    imIput: function (e) {
        this.setData({
            message: e.detail.value,
            messageLength: (e.detail.value + "").match(regExp)
        });
        // console.log((e.detail.value + ""));
    },

    /**
     * 发送消息
     */
    sendMessage: function (e) {
        this.setData({
            onInput_holdKeyBoard: true
        });
        if (!this.data.loginCon) {
            wx.showToast({
                title: '正在努力加入直播间',
                duration: 2000,
                icon: 'none',
                mask: false,
            })
            return
        }
        if (this.data.message == null || this.data.message == "") {
            wx.showToast({
                title: '消息不能为空！',
                duration: 2000,
                icon: 'none',
                mask: false,
            })
            return
        }
        if (this.data.message.trim() == null || this.data.message.trim() == "") {
            wx.showToast({
                title: '消息不能为空！',
                duration: 2000,
                icon: 'none',
                mask: false,
            })
            return
        }
        if (this.data.message.length > 60) {
            wx.showToast({
                title: '消息不能超过60个字符！',
                duration: 2000,
                icon: 'none',
                mask: false,
            })
            return
        } else {
            this.data.message = util.isMobileNumber(this.data.message);
        }
        this.userSendIm(this.data.message, "text");
    },


    /**
     * 切换是收起器键盘
     */
    switchInput_holdKeyBoard: function () {
        this.setData({
            imInput_holdKeyBoard: !this.data.imInput_holdKeyBoard
        });
    },

    /**
     * 点击已经弹起的聊天室聊天记录
     */
    clickChatRecord: function () {
        this.setData({
            imInput_focus: false
        });
    },

    /** 控制聊天室隐藏显示 */
    controlChartroom: function () {
        this.setData({
            chartroomDisplay: !this.data.chartroomDisplay,
        });
    },
    /** 清屏显示 */
    cleanSrenn: function () {
        this.setData({
            cleanStatut: !this.data.cleanStatut,
        });
    },
    /**
     * 获取并处理聊天室信息
     */
    handlerChatRoomMessage: function (data) {
        if (data && data.data) {
            let data_json = JSON.parse(data.data);
            if ((data_json.chatroomId != this.data.roomId) && data_json.typeCode != "gift") {
                return false;
            }
            // 解析商品信息 start
            let goodsObj = []
            if (data_json.type == "goods") {
                goodsObj = JSON.parse(data_json.text)
                // console.log(goodsObj);
                goodsObj["fileJson"] = JSON.parse(goodsObj.fileJson);
                goodsObj["pic"] = goodsObj.fileJson.illustration[0];
                data_json["goodsObj"] = goodsObj;
            }
            if (data_json.type == "join_im") {
                if (userHaveJoin[data_json.from] && userHaveJoin[data_json.from] != 1) {
                    return
                } else {
                    userHaveJoin[data_json.from] = 2;
                }
            }

            if (this.data.messageList.length == 0) {
                this.setData({
                    ['messageList[' + (this.data.messageList.length - 1 > 0 ? this.data.messageList.length - 1 : 0) + ']']: data_json,
                    scroll_into_message: (this.data.messageList.length - 1 > 0 ? this.data.messageList.length - 1 : 0)
                })
            } else if (this.data.messageList.length >= 50) {
                this.data.messageList.shift();
                this.data.messageList.length = this.data.messageList.length + 1;
                this.data.messageList[this.data.messageList.length - 1] = data_json;
                this.setData({
                    messageList: this.data.messageList,
                    scroll_into_message: (this.data.messageList.length - 1 > 0 ? this.data.messageList.length - 1 : 0),
                })
            } else {
                this.data.messageList.length = this.data.messageList.length + 1;
                this.setData({
                    ['messageList[' + (this.data.messageList.length - 1 > 0 ? this.data.messageList.length - 1 : 0) + ']']: data_json,
                    scroll_into_message: (this.data.messageList.length - 1 > 0 ? this.data.messageList.length - 1 : 0)
                })
            }
        }

        // console.log('消息==========', this.data.messageList);
    },

    /** 前往商品详情(需要雷达采集) */
    goToGoodsDetail: function (e, mark) {
        wx.navigateTo({
            url: '/pages/tabBar_index/business_detail/business_detail?code=' + e.currentTarget.dataset.goods.code + "&clerk_code=" + (this.data.userRole >= 0 ? wx.getStorageSync('userCode') : this.data.clerkCode) + "&markLive=" + mark + '&sceneType=live' + this.data.merchantCode + '&sceneDT=' + this.data.merchantCode,
            success: function (e) {},
            fail: function (e) {}
        })
    },

    /** 预览图片 */
    preimage: function (e) {
        var current = e.currentTarget.dataset.src;
        var tempUrls = [];
        tempUrls.push(current);
        wx.previewImage({
            current: current, // 当前显示图片的http链接 
            urls: tempUrls // 需要预览的图片http链接列表  
        })
    },

    /** 复制内容 */
    copyContent: function (e) {
        var content = e.currentTarget.dataset.content;
        wx.setClipboardData({
            data: content,
            success: function (res) {
                wx.showToast({
                    title: '复制成功，请打开浏览器访问',
                    icon: "none",
                })
            }
        });
    },

    /**
     * 外面input聚焦 
     */
    imIputFocus: function (e) {
        this.setData({
            onInput: true,
            inputBottom: e.detail.height
        });
        // console.log('高度=======',this.data.inputBottom);
    },

    /**
     * 外面input失焦
     */
    imInputBlur: function (e) {
        this.setData({
            onInput: false,
            inputBottom: 0
        });
    },


    /**防止滑动冒泡 */
    doNotMove: function () {
        this.setData({
            onInput: false,
            onInput_holdKeyBoard: false
        });
        return false;
    },

    /**
     * 点击直播组件
     */
    clickLive: function () {
        this.setData({
            onInput: false,
            onInput_holdKeyBoard: false
        });
    },

    /**
     * 直播状态变化，可监听直播下播或者其他的
     */
    liveStateChange: function (e) {
        if (e.detail.code == '-2301') {
            this.setData({
                offline: true,
                liveUrl: ""
            })
            this.autoReconnection();
        } else if (e.detail.code == '2006') {
            this.setData({
                offline: true,
                liveUrl: ""
            })
            this.autoReconnection();
        } else {
            this.setData({
                offline: false,
            });
            clearInterval(this.data.live_conDevice);
        }

    },


    /**
     * 刷新数据
     */
    reLoadData: function () {
        this.closeSkip()
        this.getBusinessInfo()
        this.getChatroomInfo();
        this.checkClerkRole()
        this.checkUserRole()
        this.setData({
            currentUser: wx.getStorageSync('user'),
        })
    },

    /**
     * 自动重连
     */
    autoReconnection: function () {
        var that = this;
        if (this.data.liveUrl) {
            clearInterval(this.data.live_conDevice);
        } else if (!this.data.live_conDevice) {
            this.setData({
                live_conDevice: setInterval(function () {
                    that.getChatroomInfo();
                }, 1000)
            });
        }
    },

    /** 密码输入 */
    passwordInput: function (e) {
        this.setData({
            pwdText: e.detail.value,
        })
    },

    /** 检查密码 */
    checkPwd: function () {
        if (this.data.passwordError) {
            this.setData({
                passwordError: false,
            })
        } else {
            if (this.data.pwdText == this.data.password) {
                this.setData({
                    passwordError: false,
                    inputPassword: false,
                    pwdText: ''
                })
                this.getUserLoginInfo();
                this.warnHide();
            } else {
                this.setData({
                    passwordError: true,
                })
            }
        }
    },

    /**
     * 链接ipush的websocket
     */
    conIpush: function (reCon) {
        wsIpush = wx.connectSocket({
            url: app.globalData.ipush_host
        });
        app.globalData.wsIpush = wsIpush
        let that = this;

        wsIpush.onOpen(function (res) {
            if (wx.getStorageSync('user') && wx.getStorageSync('user').id) {
                let messagetxt = {
                    userid: wx.getStorageSync('user').id,
                    platform: "wxapp_zcrs",
                    _cid: wx.getStorageSync('user').id + Date.parse(new Date())
                };
                let jsonStr = JSON.stringify(messagetxt);
                that.sendMsg(jsonStr, REGISTER);
                that.setData({
                    loading_reload: true,
                    loading_reload_text: "加载中..."
                });
            }

            if (reCon) {
                reConTimes = reConTimes + 1
                // console.log("重连" + reConTimes);
            }

            wsIpush.onClose(function (res) {
                console.log("链接关闭了，佩奇");
                pingStaute = 0;
                hadTryTime = 0;
                app.globalData.pingStaute = pingStaute;
                that.setData({
                    isConIpush: 0,
                    pingStaute: pingStaute
                });
                that.reconIpush();
            });

            wsIpush.onError(function (res) {
                // console.log("链接出错,佩奇");
                // console.log(res);
                if (wsIpush) {
                    wsIpush.close();
                    wxIpush = null;
                }
                pingStaute = 0;
                hadTryTime = 0;
                that.setData({
                    isConIpush: 0,
                    pingStaute: pingStaute
                });
                that.reconIpush();
            });

            wsIpush.onMessage(function (data) {
                // console.log("ipushReturn");
                that.reset();
                if (that.data.loading_reload) {
                    that.setData({
                        loading_reload: true,
                        loading_reload_text: "加载中..."
                    });
                }
                that.onMessage_parse(data);

            })

        })

    },

    /**
     * 发送消息
     */
    sendMsg: function (data, msgType) {
        let that = this;
        if (app.globalData.wsIpush == null) {
            return -1;
        }
        let hl = new DataView(new ArrayBuffer(2));
        let cid = new DataView(new ArrayBuffer(4));
        let b;
        let last_buffer;
        let hl1 = new Uint8Array(hl.byteLength);
        let cid1 = new Uint8Array(cid.byteLength);
        if (msgType && msgType == REGISTER) {

            cid.setUint32(0, REGISTER)
        } else {
            cid.setUint32(0, MESSAGE)
        }
        if (data == null) {
            hl.setUint16(0, cid.byteLength);
            for (var i = 0; i < cid1.length; i++) {
                cid1[i] = cid.getUint8(i);
            }
            for (var i = 0; i < hl1.length; i++) {
                hl1[i] = hl.getUint8(i);
            }
            last_buffer = this.ab2str(hl1) + this.ab2str(cid1);
        } else {
            b = this.str2ab(data);
            hl.setUint16(0, this.getObjectSize(b) + cid.byteLength)
            for (var i = 0; i < hl1.length; i++) {
                hl1[i] = hl.getUint8(i);
            }
            for (var i = 0; i < cid1.length; i++) {
                cid1[i] = cid.getUint8(i);
            }
            //单独处理data部分,不然都转成arraybuffer，中文会乱码
            let bodyData = JSON.parse(data);
            if (bodyData && bodyData.text) {
                // bodyData = JSON.parse(bodyData.text);
                last_buffer = this.ab2str(hl1) + this.ab2str(cid1) + JSON.stringify(bodyData);
                console.log(last_buffer);
            } else {
                last_buffer = this.ab2str(hl1) + this.ab2str(cid1) + this.ab2str(b);
            }
        }
        wsIpush.send({
            data: last_buffer,
            success: function (res) {
                pingStaute = 1;
                reConTimes = 0;
                if (pingStaute != that.data.pingStaute) {
                    that.setData({
                        pingStaute: pingStaute
                    });
                }
            }
        });
        return 0;
    },

    /**
     * 发送ping
     */
    sendIpushPing: function () {
        // console.log('wsIpush=======', wsIpush);
        this.setData({
            ping_timer: setInterval(() => {
                let that = this;
                // console.log('wsIpush=======', wsIpush);
                if (TOTAL_TRY_TIME <= hadTryTime) {
                    hadTryTime = 0;
                    if (wsIpush) {
                        wsIpush.close();
                        wxIpush = null;
                    }
                    pingStaute = 0;
                    this.setData({
                        isConIpush: 0,
                        pingStaute: pingStaute
                    });
                    this.reconIpush();
                } else {
                    if (wsIpush == null) {
                        return -1;
                    }
                    if (pingStaute == 0) {
                        return -1;
                    }
                    let dataLen = new DataView(new ArrayBuffer(2));
                    let cmdType = new DataView(new ArrayBuffer(4));
                    dataLen.setUint16(0, new ArrayBuffer(2).byteLength);
                    cmdType.setUint32(0, PING);
                    let data8 = that.dv2uint(dataLen, new ArrayBuffer(2).byteLength);
                    let cmd8 = that.dv2uint(cmdType, new ArrayBuffer(4).byteLength);
                    var last_buffer = that.ab2str(data8) + that.ab2str(cmd8);
                    wsIpush.send({
                        data: last_buffer,
                        success: function (res) {

                        },
                        fail: function () {

                        }
                    });
                    hadTryTime = hadTryTime + 1;
                }

            }, 3000)
        });

    },


    /**
     * 获取对象长度
     */
    getObjectSize: function (obj) {
        let arr = Object.keys(obj)
        return arr.length
    },

    /**
     * 处理dataView转Uint8Array
     */
    dv2uint: function (dataView, arrayBufferbyteLength) {
        if (dataView && arrayBufferbyteLength) {
            let array = new Uint8Array(arrayBufferbyteLength);
            for (var i = 0; i < array.length; i++) {
                array[i] = dataView.getUint8(i);
            }
            return array;
        } else {
            return null
        }

    },

    /**
     * arrayBuffer转字符串
     */
    ab2str: function (buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf)); //需指定编码，例如UTF-16编码 Uint16Array
    },

    //字符串转ArrayBuffer
    str2ab: function (str) {
        var arr = [];
        for (var i = 0, j = str.length; i < j; ++i) {
            arr.push(str.charCodeAt(i));
        }
        var buf = new Uint8Array(arr); //需指定编码，例如UTF-16编码 Uint16Array
        return buf
    },


    /**
     * 当有信息返回,解析消息
     */
    onMessage_parse: function (pkg) {
        if (!pkg || !pkg.data) {
            return -1;
        }
        let cmdType = 0;
        let cmdStr = null;
        let ret = {}
        let array_byte = pkg.data;
        this.ipushHandlerMessage(pkg, array_byte);
    },


    /**
     * 解码，配合decodeURIComponent使用
     */
    base64_decode: function (input) { // 解码，配合decodeURIComponent使用
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = base64EncodeChars.indexOf(input.charAt(i++));
            enc2 = base64EncodeChars.indexOf(input.charAt(i++));
            enc3 = base64EncodeChars.indexOf(input.charAt(i++));
            enc4 = base64EncodeChars.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        return this.utf8_decode(output);
    },

    /**
     * utf8解码
     */
    utf8_decode: function (utftext) { // utf-8解码
        var string = '';
        let i = 0;
        let c = 0;
        let c1 = 0;
        let c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c1 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
                i += 2;
            } else {
                c1 = utftext.charCodeAt(i + 1);
                c2 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
                i += 3;
            }
        }
        return string;
    },



    /**
     * 解析消息体后,处理信息
     */
    onMessage: function (obj) {
        if (obj.cmdType && obj.cmdType == REGISTER) {
            let obj = {
                groupid: this.data.roomId,
                platform: "wxapp_zcrs",
                ver: '1.1',
                type: 2,
            }
            this.sendMsg(JSON.stringify(obj), PING);
        }
        if (this.data.isConIpush <= 20) {

            if (obj && obj.cmdType && (obj.cmdType == PING)) {
                this.setData({
                    isConIpush: this.data.isConIpush + 1
                });
            }
        }
        if (obj && obj.cmdType && obj.cmdType != REGISTER && obj.cmdType != PING) {
            if (obj.cmdStr) {
                let cmdStr = JSON.parse(obj.cmdStr);
                let msg = {};
                if (cmdStr.text) {
                    msg = JSON.parse(cmdStr.text);
                } else {
                    msg = cmdStr;
                }
                if (msg.typeCode == 'gift') {
                    this.data.live_red_envelope.push(msg);
                    this.setData({
                        live_red_envelope: this.data.live_red_envelope
                    });
                    this.listenlive_red_envelopeMessage(msg);
                } else if (msg.typeCode == 'file' || msg.typeCode == 'merchandise') {
                    this.handlerTopFile(msg);
                }

            }

        }

        //消息回执，每收到消息都要回执
        if (obj && obj.cmdType && obj.cmdStr) {
            // console.log("消息回执");
            let msg = JSON.parse(obj.cmdStr);
            if (msg.typemsg != 30 && msg._sid && !msg._cid) {
                let messageQueue = this.data.messageQueue
                if (messageQueue[this.data.roomId + "$" + msg._sid]) {

                } else {
                    messageQueue[this.data.roomId + "$" + msg._sid] = msg._sid;
                    console.log("发送了回执");
                    console.log(messageQueue);
                    let msgText = {
                        _sid: msg._sid,
                        _st: msg._st,
                        type: 16,
                        groupid: this.data.roomId
                    };
                    this.sendMsg(JSON.stringify(msgText), MESSAGE);
                }
                this.setData({
                    messageQueue: messageQueue
                });

            }
        }
    },

    /**
     * 重新链接ipush定时器
     */
    reconIpush: function () {
        if (pingStaute == 1) {

        } else {
            if (!this.data.unload) {
                if (this.data.loading_reload) {
                    this.setData({
                        loading_reload: false,
                        loading_reload_text: "当前网络不稳定,下拉重新加载..."
                    });
                }

                if (wsIpush) {
                    wsIpush.close();
                    wsIpush = null;
                }
                this.conIpush(true);
            }
        }
    },


    /**
     * 超时判断与检测
     */
    reset: function () {
        hadTryTime = 0;
    },

    /**
     * 获取礼物列表/gift/giftList
     */
    getGiftList: function () {
        http.get(
            app.globalData.host + "gift/giftList", {
                pageSkip: 1,
                pageLmit: 10
            },
            (_status, _resultCode, _message, data) => {
                // 处理图片资源
                for (var i = 0; i < data.length; i++) {
                    let giftItem = data[i];
                    data[i].price = util.priceSwitch(data[i].price, false)
                    // 无前缀自动补齐
                    if (giftItem.icon.indexOf("http") != 0) {
                        if (this.data.testServer) {
                            giftItem.icon = "https://test.vicpalm.com" + giftItem.icon
                        } else {
                            giftItem.icon = "https://www.vicpalm.com" + giftItem.icon
                        }
                    }
                }
                this.setData({
                    giftList: data,
                })
                // console.log('红包列表=========', this.data.giftList);
                wx.hideLoading()
            },
            (_status, _resultCode, _message, _data) => {
                wx.hideLoading()
            }
        );
    },

    /**
     * 发送红包
     */
    sendLiveGift: function () {
        if (this.data.isConIpush <= 0) {
            wx.showToast({
                title: '红包加载中...',
                icon: "none"
            })
            if (reConTimes <= 5 && !this.data.unload) {
                if (wsIpush) {
                    wsIpush.close();
                    wsIpush = null;
                }
                this.conIpush(true);
            }
            // return
        }
        if (!this.data.liveUserId) {
            wx.showToast({
                title: '未选中主播',
                icon: "none"
            })
            return
        }
        if (!this.data.roomId) {
            wx.showToast({
                title: '未进入直播间',
                icon: "none"
            })
            return
        }
        if (!this.data.giftCode || this.data.giftCode == "") {
            wx.showToast({
                title: '未选择红包',
                icon: "none"
            })
            return
        }
        wx.showLoading({
            title: '赠送中...',
            icon: "none",
            mask: true,
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
                        http.post(
                            app.globalData.host + (this.data.testServer ? 'atest/gift/liveGift' : 'gift/liveGift'), {
                                openId: data.openid,
                                body: "微信企业版小程序客户发送直播红包",
                                frpCode: (this.data.testServer ? 'ORIGINAL' : 'WEIXIN_XCX'),
                                appId: app.globalData.appId,
                                num: this.data.giftNum ? this.data.giftNum : 1,
                                relationCode: this.data.roomId,
                                giftCode: this.data.giftCode,
                                toUserId: this.data.liveUserId
                            },
                            (status, resultCode, message, data) => {
                                if (!this.data.testServer) {
                                    this.weChatRecharge(data.params);
                                } else {
                                    wx.hideLoading();
                                    this.setData({
                                        selectedRedEnvelope: false,
                                    })
                                }
                            },
                            (status, resultCode, message, data) => {
                                wx.hideLoading();
                            }
                        );
                    },
                    (status, resultCode, message, data) => {}
                );
            }
        })
    },

    /**
     * 获取微信支付需要用的参数
     */
    weChatRecharge: function (data) {
        var that = this;
        wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success(res) {
                wx.hideLoading();
                that.setData({
                    selectedRedEnvelope: false,
                })
            },
            fail(res) {
                wx.hideLoading();
                that.setData({
                    selectedRedEnvelope: false,
                })
            }
        })
    },

    playAnimation: function () {
        if (!this.data.playReady) {
            return
        }
        this.setData({
            redIndex: this.data.redIndex + 1,
            showGiftData: this.data.live_red_envelope[0]
        })
        // console.log('红包信息===========', this.data.showGiftData);
        let that = this;
        if (this.data.live_red_bgm.paused) {
            this.data.live_red_bgm.play(() => {})
        }
        let animation_festival = wx.createAnimation({
            duration: 2500,
            timingFunction: 'linear',
        })
        this.setData({
            animation_red_10: animation_festival.step().export(),
        })
        this.data.live_red_envelope.splice(0, 1);
        // this.setData({
        //   live_red_envelope: that.data.live_red_envelope
        // });
        setTimeout(function () {
            that.setData({
                redIndex: 0,
                playReady: true,
                live_red_envelope: that.data.live_red_envelope
            })
            that.data.live_red_bgm.stop(() => {})
        }, 2500);

    },

    /**
     * 监听红包队列是否有数据
     */
    onListenRed_envelope: function () {
        let that = this;
        if (that.data.recon_Red_envelope_timer == null) {
            this.setData({
                recon_Red_envelope_timer: setInterval(function () {
                    if (that.data.live_red_envelope[0]) {
                        that.playAnimation();
                    }
                }, 2000)
            });
        }
    },

    /**
     * 图片加载完成触发
     */
    redLoadOk: function (e) {
        this.setData({
            redDoneTimes: this.data.redDoneTimes + e.currentTarget.dataset.redindex
        });
    },

    /**
     * 播放背景音乐
     */
    initPlayRedBgm: function () {
        live_red_bgm = wx.createInnerAudioContext()
        live_red_bgm.autoplay = false;
        live_red_bgm.loop = false;
        live_red_bgm.src = redMp3;
        this.data.live_red_bgm = wx.createInnerAudioContext()
        this.data.live_red_bgm.autoplay = false;
        this.data.live_red_bgm.loop = false;
        this.data.live_red_bgm.src = this.data.redMp3;
        this.setData({
            live_red_bgm: this.data.live_red_bgm
        });
    },


    /** 选择红包 */
    selectRedEnvelope: function () {
        this.setData({
            selectedRedEnvelope: !this.data.selectedRedEnvelope,
        })
    },

    /** 选择红包面额 */
    selectDenomination: function (e) {
        this.setData({
            giftPrice: e.currentTarget.dataset.item.price,
            giftCode: e.currentTarget.dataset.item.code,
            selectedGift: e.currentTarget.dataset.item,
        })
        console.log('红包面额', this.data.giftPrice)
    },



    /** 获取资料库 */
    getDatabank: function () {
        http.get(
            app.globalData.host + "/biz/user/folder/get/files/by/fileStatus/new", {
                index: this.data.databankPageIndex,
                limit: 9,
                userId: this.data.liveUserId,
                fileStatus: 1,
            },
            (_status, _resultCode, _message, data) => {
                wx.hideLoading()
                if (data.list.length < 1) {
                    this.setData({
                        databank_load_all: true,
                    })
                }
                if (data.list && data.list.length > 0) {
                    this.handlerDatabankList(data.list)
                    this.setData({
                        databank_load_all: false,
                    })
                } else {
                    this.setData({
                        databank_load_all: true,
                    })
                }
            },
            (_status, _resultCode, _message, _data) => {
                wx.hideLoading()
            }
        );
    },

    /** 处理资料库列表 */
    handlerDatabankList: function (list) {
        // console.log('资料库列表==========', list);
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
        if (this.data.databank_load_all) {
            return;
        }
        this.setData({
            databankPageIndex: this.data.databankPageIndex + 1,
            databankPageIndex_add: this.data.databankPageIndex_add + 1
        })
        this.getDatabank()
    },

    /** 资料库隐藏显示 */
    databankHidden: function () {
        this.setData({
            databankHidden: !this.data.databankHidden,
            databankTopNum: 0,
            pageIndex: 1,
            pageIndex_add: 0,
            databankPageIndex: 1,
            databankPageIndex_add: 0

        })
        if (!this.data.databankHidden) {
            this.getDatabank();
        }
    },

    //**打开文档资料 */
    openDocument() {
        if (this.data.fileInfo.type == "document") {
            let that = this;
            wx.downloadFile({
                url: that.data.fileInfo.url,
                success: (result) => {
                    let filePath = result.tempFilePath
                    wx.openDocument({
                        filePath: filePath,
                        fileType: that.data.fileInfo.fileType,
                        success: (res) => {
                            wx.hideLoading()
                        },
                        fail: (res) => {
                            wx.showToast({
                                title: '文件打开失败！',
                                icon: "none",
                                mask: true,
                            })
                            wx.hideLoading()
                        },
                    })
                },
                fail: (result) => {
                    wx.showToast({
                        title: '文件加载失败！',
                        icon: "none",
                        mask: true,
                    })
                    wx.hideLoading()
                },
            })
        }
        if (this.data.fileInfo.type == 'other' && this.data.fileInfo.url) {
            wx.redirectTo({
                url: '/pages/web_view_html/web_view_html?webUrl=' + this.data.fileInfo.url,
            })
        }
    },

    /** 打开资料库文件 */
    openFile: function (e) {
        let fileInfo = e.currentTarget.dataset.item;
        wx.hideLoading();
        this.setData({
            fileInfo: fileInfo
        });
        // console.log('打开=====', this.data.fileInfo);
        if (fileInfo.typeCode && fileInfo.typeCode == 'merchandise') {
            //需要雷达采集
            wx.navigateTo({
                url: '/pages/tabBar_index/business_detail/business_detail?code=' + fileInfo.code + '&sceneType=live&sceneDT=' + this.data.merchantCode + "&clerk_code=" + (this.data.userRole >= 0 ? wx.getStorageSync('userCode') : this.data.clerkCode) + '&sceneType=live' + this.data.merchantCode + '&sceneDT=' + this.data.merchantCode,
                success: function (e) {},
                fail: function (e) {}
            })
        } else {
            if (fileInfo.type == 'map' || (fileInfo.suffix == 'of' && !fileInfo.url && fileInfo.address)) {
                this.openMap()
            } else {
                this.setData({
                    isShowFile: true
                });
            }
            if (fileInfo.type == "document" || fileInfo.type == "audio") {
                let that = this;
                wx.downloadFile({
                    url: fileInfo.url,
                    success: (result) => {
                        let filePath = result.tempFilePath
                        if (fileInfo.suffix == "txt") {
                            let fs = wx.getFileSystemManager()
                            fs.readFile({
                                filePath: filePath,
                                encoding: 'utf8',
                                success: (res) => {
                                    wx.hideLoading()
                                    that.setData({
                                        databankTextContent: res.data
                                    })
                                },
                                fail: (res) => {
                                    wx.showToast({
                                        title: '文件打开失败！',
                                        icon: "none",
                                        mask: true,
                                    })
                                    wx.hideLoading()
                                },
                            })
                        } else if (fileInfo.type == "audio") {
                            wx.hideLoading()
                            that.setData({
                                databankAudioHidden: false,
                                displayDataBankDetail: true,
                            })
                            this.data.databankAudio = wx.createInnerAudioContext()
                            this.data.databankAudio.autoplay = false;
                            this.data.databankAudio.loop = true;
                            this.data.databankAudio.src = filePath;
                            this.data.databankAudio.onPlay(() => {})
                        }
                    },
                    fail: (result) => {
                        wx.showToast({
                            title: '文件加载失败！',
                            icon: "none",
                            mask: true,
                        })
                        wx.hideLoading()
                    },
                })
            }

            if (fileInfo.type == "video" || fileInfo.type == "audio") {
                this.setData({
                    liveMuted: true,
                })
            }
        }

    },

    /**
     * 播放或者暂停资料库音频
     */
    playOrPauseDatabankAudio: function () {
        if (this.data.databankAudio.paused) {
            this.data.databankAudio.play(() => {})
            console.log("播放音频");
        } else {
            this.data.databankAudio.pause();
            console.log("暂停音频");
        }
        this.setData({
            databankAudioPlaying: this.data.databankAudio.paused,
        })
    },

    /** 跳转倒计时 */
    skipSecond: function () {
        this.setData({
            skipSecond: this.data.skipSecond - 1,
        })
    },

    /** 跳转 */
    skipOther: function () {
        this.goToPage()
    },

    /** 跳转页面 */
    goToPage: function () {
        let that = this;
        this.closeSkip()
        if (this.data.fromSaleMan && this.data.fromSaleMan.clerkId != null) {
            wx.redirectTo({
                url: '/pages/clerk/show/show?workerId=' + this.data.fromSaleMan.clerkId + '&merchantCode=' + this.data.merchantCode + '&higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=live&sceneDT=' + this.data.merchantCode,
            })
        } else {
            if ((this.data.merchantInfo && this.data.merchantInfo.status == 1) || (this.data.fromSaleMan && this.data.fromSaleMan.merchantStatus == 1)) {
                wx.redirectTo({
                    url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.merchantCode + '&higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=live&sceneDT=' + this.data.merchantCode,
                })
            } else if ((this.data.merchantInfo && this.data.merchantInfo.status == 3) || (this.data.fromSaleMan && this.data.fromSaleMan.merchantStatus == 3)) {
                wx.redirectTo({
                    url: '/pages/tabBar_index/business_homepage/business_homepage' + '?higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=live&sceneDT=' + this.data.merchantCode,
                })
            } else if ((this.data.merchantInfo && this.data.merchantInfo.status <= 0) || (this.data.fromSaleMan && this.data.fromSaleMan.merchantStatus <= 0)) {
                wx.redirectTo({
                    url: '/pages/tabBar_index/business_homepage/business_homepage' + '?higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=live&sceneDT=' + this.data.merchantCode,
                })
            } else {
                wx.redirectTo({
                    url: '/pages/tabBar_index/business_homepage/business_homepage' + '?higherLevelCode=' + app.globalData.higherLevelCode + '&sceneType=live&sceneDT=' + this.data.merchantCode,
                })
            }
        }
    },

    /** 关闭跳转提示 */
    closeSkip: function () {
        clearInterval(this.data.skipSecond_timeDevice);
        clearInterval(this.data.skip_timeDevice);
        this.setData({
            skipTipsHidden: true,
        })
    },

    /** 打开地图 */
    openMap: function (e) {
        this.setData({
            databankHidden: true,
            databankMapHidden: true
        })
        this.buildMapInfo()
    },

    /** 构建地图信息 */
    buildMapInfo: function () {
        // console.log(this.data.fileInfo);
        let markers = []
        let markersItem = {}
        markersItem["latitude"] = this.data.fileInfo.lat
        markersItem["longitude"] = this.data.fileInfo.lng
        markersItem["iconPath"] = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/ziliaoku-position%403x.png"
        markersItem["width"] = 25
        markersItem["height"] = 30
        markers.push(markersItem)
        this.setData({
            markers: markers
        })
    },

    /** 资料库地图类资料隐藏 */
    databankMapHidden: function () {
        if (this.data.databankMapHidden) {
            this.setData({
                databankMapHidden: false,
                displayDataBankDetail: false,
                map_flag_bank: false,
                map_flag_bus: false,
                map_flag_buy: false,
                map_flag_school: false,
                map_flag_food: false,
                map_flag_buding: false,
            })
        } else {
            if (this.data.isShowFile) {
                this.setData({
                    isShowFile: false,
                    liveMuted: false,
                });
            }
        }
        if (!this.data.databankMapHidden && !this.data.isShowFile) {
            this.setData({
                fileInfo: {}
            });
        }
        if (this.data.databankAudio) {
            this.data.databankAudio.pause();
            this.setData({
                databankAudioPlaying: false
            });
        }
    },

    /**
     * 检查usercode
     */
    checkUserCode: function () {
        if (app.globalData.higherLevelCode) {
            http.get(
                app.globalData.host + 'personal/infoByCode', {
                    userCode: app.globalData.higherLevelCode,
                },
                (status, resultCode, message, data) => {
                    this.setData({
                        inviteMan: data
                    });
                    this.sendConditions();
                },
                (status, resultCode, message, data) => {

                })
        }
    },

    /**
     * 等待条件成熟后发送加入房间、邀请加入房间等信息
     */
    sendConditions: function () {
        let that = this;
        if (sendRelation == 1) {
            return false;
        }
        if (pingStaute == 1) {
            if (sendRelation == 0 && that.data.inviteMan) {
                let textMsg = {};
                textMsg.type = "join";
                textMsg.userId = wx.getStorageSync('user').id;
                wx.getStorageSync('user').nickname = util.isMobileNumber(wx.getStorageSync('user').nickname);
                that.data.inviteMan.nickname = util.isMobileNumber(that.data.inviteMan.nickname);
                textMsg.text = (wx.getStorageSync('user').id == that.data.inviteMan.id ? (wx.getStorageSync('user').nickname + "  进入直播间") : (wx.getStorageSync('user').nickname + "  通过  " + that.data.inviteMan.nickname + "  分享，" + "进入直播间"));
                let msgText = {
                    recvUid: that.data.liveUserId,
                    text: JSON.stringify(textMsg),
                    platform: "wxapp_zcrs",
                    type: 3,
                    _ct: Date.parse(new Date()),
                    _cid: wx.getStorageSync('user').id + '_' + Date.parse(new Date())
                };
                sendRelation = 1;
                that.sendMsg(JSON.stringify(msgText), MESSAGE);
            }
        } else {
            setTimeout(function () {
                that.sendConditions();
            }, 1000);
        }
    },

    /** 打开商品列表 */
    openGoodsList: function () {
        this.setData({
            goodsListDisplay: true,
        });
    },

    /** 关闭浮层 */
    closeFloat: function () {
        this.setData({
            goodsListDisplay: false,
            chartroomDisplay: false,
        });
    },

    /**
     * 获取企业活动
     */
    getBusinessActivity: function () {
        http.get(
            app.globalData.business_host + "fastevent/inrewardPage", {
                pageIndex: this.data.pageIndex,
                pageLimit: this.data.pageLimit,
                storeCode: this.data.sharerMerchantCode != "" && this.data.merchantCode != this.data.sharerMerchantCode ? (this.data.sharerMerchantCode) : (this.data.merchantCode),
                productStoreCode: this.data.sharerMerchantCode != "" && this.data.merchantCode != this.data.sharerMerchantCode ? (this.data.merchantCode) : null,
                categoryCode: this.data.goodsCategoryCode == "" ? null : this.data.goodsCategoryCode,
                sortType: 'customize',
                sortOrder: 'asc'
            },
            (status, resultCode, message, data) => {
                wx.hideLoading();
                if (data.list.length < 1) {
                    this.setData({
                        business_activity_load_all: true,
                    })
                }
                this.setData({
                    business_activity_list_new: data.list,
                });
                if (data.list && data.list.length > 0) {
                    this.handlerActivitiList();
                    this.setData({
                        business_activity_load_all: false,
                    })
                } else {
                    this.setData({
                        business_activity_load_all: true,
                    })
                }
            },
            (status, resqultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },

    /**
     * 处理活动列表
     */
    handlerActivitiList: function () {
        for (let i = 0; i < this.data.business_activity_list_new.length; i++) {
            let list = this.data.business_activity_list_new[i];
            if (!list) {
                wx.hideLoading();
                return
            }
            if (list.fileJson) {
                let key_title = list.title;
                let obj = {};
                obj.pic = JSON.parse(list.fileJson).illustration[0];
                if (obj.pic) {
                    obj.type = util.getUrlType(JSON.parse(list.fileJson).illustration[0])
                }
                this.data.business_activity_list_new[i].illustration = obj.pic;
                this.data.business_activity_list_new[i].videoType = obj.type;
                this.data.business_activity_list_new[i].product.price = util.priceSwitch(this.data.business_activity_list_new[i].minPrice);
                this.data.business_activity_list_new[i].minPriceDisplay = util.priceSwitch(this.data.business_activity_list_new[i].minPrice);
                this.data.business_activity_list_new[i].maxPriceDisplay = util.priceSwitch(this.data.business_activity_list_new[i].maxPrice);
                this.data.business_activity_list_new[i].discountPrice = util.priceSwitch(this.data.business_activity_list_new[i].discountPrice);
                this.data.business_activity_list_new[i].dis = app.getDisance(this.data.business_activity_list_new[i].merchant.lat, this.data.business_activity_list_new[i].merchant.lng);
            } else {
                this.data.business_activity_list_new.splice(i, 1);
                i = i - 1;
            }

        }
        this.setData({
            ['business_activity_list[' + this.data.pageIndex_add + ']']: this.data.business_activity_list_new
        });
        wx.hideLoading();
    },

    /** 获取产品分类 */
    getGoodsType: function () {
        // console.log('ssssss', this.data.sharerMerchantCode)
        http.get(
            app.globalData.business_host + "eventType/getEventTypes", {
                storeCode: this.data.sharerMerchantCode != "" && this.data.merchantCode != this.data.sharerMerchantCode ? (this.data.sharerMerchantCode) : (this.data.merchantCode),
                countEvent: 1,
                statuses: JSON.stringify(["1"]),
                typeCodes: JSON.stringify([
                    "inreward",
                ]),
                excludeEmpty: 1,
                productStatuses: JSON.stringify(["1"]),
                productStoreCode: this.data.sharerMerchantCode != "" && this.data.merchantCode != this.data.sharerMerchantCode ? (this.data.merchantCode) : null,
            },
            (status, resultCode, message, data) => {
                // console.log(data.typeList)
                let gtl = []
                gtl.push({
                    code: "",
                    count: data.allCount,
                    name: "全部商品"
                })
                gtl = gtl.concat(data.typeList);
                gtl.push({
                    code: '0',
                    count: data.otherCount,
                    name: "其他分类"
                })
                this.setData({
                    goodsTagList: gtl
                })
            },
            (status, resultCode, message, data) => {}
        );
    },

    /** 点击商品分类 */
    clickGoodsTag: function (e) {
        this.setData({
            newsIndex: e.currentTarget.dataset.index,
            goodsTagSelectedIndex: e.currentTarget.dataset.index,
            goodsCategoryCode: e.currentTarget.dataset.item.code,
        })
        // console.log('传回来的参数',this.data.goodsCategoryCode)
        this.getBusinessActivity();
    },

    /**展示分类 */
    showClassify: function () {
        this.setData({
            keepout: !this.data.keepout,
        })
    },

    goodsCategoryFn: function (e) {
        let index = e.currentTarget.dataset.index1;
        let offsetLeft = e.currentTarget.offsetLeft;
        this.setData({
            keepout: !this.data.keepout,
            newsIndex: index,
            goodsTagSelectedIndex: index,
            goodsCategoryCode: e.currentTarget.dataset.item1.code,
            selectedTab: e.currentTarget.dataset.item1,
            scrollLeft: index * 80 - offsetLeft
        })
        this.getBusinessActivity();
    },

    /** 发送商品 */
    sendGoods: function (e) {
        let goods = e.currentTarget.dataset.goods
        goods.fromUserId = wx.getStorageSync('user').id;
        this.userSendIm(JSON.stringify(goods), "goods");
        this.closeFloat();
    },

    /** 加入购物车 */
    cartGoods: function (e) {
        // let goods = e.currentTarget.dataset.goods
        // goods.fromUserId = wx.getStorageSync('user').id;
        this.goToGoodsDetail(e, 1);
    },

    /**
     * 加载更多数据
     */
    loadMore: function () {
        if (this.data.business_activity_load_all) {
            return
        }
        this.setData({
            pageIndex: this.data.pageIndex + 1,
            pageIndex_add: this.data.pageIndex_add + 1
        })
        this.getBusinessActivity()
    },

    /** 点击地图标记 */
    clickMapFlag: function (e) {
        let that = this
        let type = e.currentTarget.dataset.type
        let keyword = ""
        let iconPath = ""
        if (type == "buding") {
            keyword = !this.data.map_flag_buding ? "楼盘" : ""
            iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/position-buding%402x.png"
            this.setData({
                map_flag_buding: !this.data.map_flag_buding,
                map_flag_bus: false,
                map_flag_school: false,
                map_flag_food: false,
                map_flag_buy: false,
                map_flag_bank: false,
            })
        } else if (type == "bus") {
            keyword = !this.data.map_flag_bus ? "公交" : ""
            iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/position-bus%402x.png"
            this.setData({
                map_flag_bus: !this.data.map_flag_bus,
                map_flag_buding: false,
                map_flag_school: false,
                map_flag_food: false,
                map_flag_buy: false,
                map_flag_bank: false,
            })
        } else if (type == "school") {
            keyword = !this.data.map_flag_school ? "学校" : ""
            iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/potition-school%402x.png"
            this.setData({
                map_flag_school: !this.data.map_flag_school,
                map_flag_buding: false,
                map_flag_bus: false,
                map_flag_food: false,
                map_flag_buy: false,
                map_flag_bank: false,
            })
        } else if (type == "food") {
            keyword = !this.data.map_flag_food ? "餐饮" : ""
            iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/position_ranstuarant%402x.png"
            this.setData({
                map_flag_food: !this.data.map_flag_food,
                map_flag_buding: false,
                map_flag_bus: false,
                map_flag_school: false,
                map_flag_buy: false,
                map_flag_bank: false,
            })
        } else if (type == "buy") {
            keyword = !this.data.map_flag_buy ? "购物" : ""
            iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/position-shopping%402x.png"
            this.setData({
                map_flag_buy: !this.data.map_flag_buy,
                map_flag_buding: false,
                map_flag_bus: false,
                map_flag_school: false,
                map_flag_food: false,
                map_flag_bank: false,
            })
        } else if (type == "bank") {
            keyword = !this.data.map_flag_bank ? "银行" : ""
            iconPath = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/position-bank%402x.png"
            this.setData({
                map_flag_bank: !this.data.map_flag_bank,
                map_flag_buding: false,
                map_flag_bus: false,
                map_flag_school: false,
                map_flag_food: false,
                map_flag_buy: false,
            })
        }
        if (keyword == "") {
            this.setData({
                markers: [{
                    latitude: that.data.fileInfo.lat,
                    longitude: that.data.fileInfo.lng,
                    iconPath: "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/ziliaoku-position%403x.png",
                    width: 25,
                    height: 30,
                }],
            })
        }
        qqmapsdk.search({
            keyword: keyword,
            location: this.data.fileInfo.lat + "," + this.data.fileInfo.lng,
            success: function (res) {
                let mks = []
                mks.push({
                    latitude: that.data.fileInfo.lat,
                    longitude: that.data.fileInfo.lng,
                    iconPath: "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/ziliaoku-position%403x.png",
                    width: 25,
                    height: 30,
                })
                for (var i = 0; i < res.data.length; i++) {
                    mks.push({
                        title: res.data[i].title,
                        id: res.data[i].id,
                        latitude: res.data[i].location.lat,
                        longitude: res.data[i].location.lng,
                        iconPath: iconPath, //图标路径
                        width: 25,
                        height: 30
                    })
                }
                that.setData({
                    markers: mks,
                })
            },
        })
    },


    /**
     * 处理资料库置顶数据
     */
    handlerTopFile: function (a) {
        if (a.typeCode == 'file') { //主播文件推送
            let fileTypeIndex = a.title.lastIndexOf(".")
            let fileTypeIcon = null
            let type = null
            let suffix = ""
            let fileType = a.title.substring(fileTypeIndex + 1, a.title.length);
            fileType = fileType.toLowerCase();
            a.name = a.title.split('.')[0];
            if (fileType == "doc" || fileType == "docx") {
                fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/WORD%403x.png"
                type = "document"
            } else if (fileType == "xls" || fileType == "xlsx") {
                fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/EXCEL%403x.png"
                type = "document"
            } else if (fileType == "ppt" || fileType == "pptx") {
                fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/PPT@3x.png"
                type = "document"
            } else if (fileType == "pdf") {
                fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/PDF%403x.png"
                type = "document"
                suffix = "pdf"
            } else if (fileType == "txt") {
                fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/USUAL@3x.png"
                type = "document"
                suffix = "txt"
            } else if (fileType == "png" || fileType == "bmp" || fileType == "jpeg" || fileType == "jpg" || fileType == "gif" || fileType == "tif") {
                type = "image"
                if (a.url && a.url != "") {
                    fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/picture%403x.png"
                } else {
                    fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/location%403x.png"
                }
            } else if (fileType == "mp3" || fileType == "wav") {
                fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/music%403x.png"
                type = "audio"
            } else if (fileType == "mp4" || fileType == "rm" || fileType == "rmvb" || fileType == "mov" || fileType == "m4v" || fileType == "avi" || fileType == "dat" || fileType == "mkv" || fileType == "flv" || fileType == "3gp" || fileType == "wmv" || fileType == "asf") {
                fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/video%403x.png"
                type = "video"
            } else if (fileType == "of" && !a.address) {
                fileTypeIcon = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/3D%25403x.png"
                type = "other"
                suffix = "of"
            } else if (a.address && a.address != '') {
                type = 'map';
                fileTypeIcon = "http://izsyue.oss-cn-shenzhen.aliyuncs.com/assets/applets/enterpriseEdition/images/file_address.png"
            }
            a.fileTypeIcon = fileTypeIcon;
            a.type = type
            a.suffix = suffix
        }
        if (a.typeCode == 'merchandise') { //主播商品推送
            a["fileJson"] = JSON.parse(a.fileJson);
            a["pic"] = a.fileJson.illustration[0];
        }
        this.setData({
            topFile: a
        });
        console.log(this.data.topFile);
    },
    /**
     * 当前页面网络状态监听
     */
    netStateChange: function (res) {
        if (res.detail.info.netJitter > 1000) {
            wx.showModal({
                title: '温馨提示',
                content: '当前网络不稳定,可退出小程序重新进入,或者删除小程序后重新进入',
            })
        }
    },


    /**
     * 根据userId获取用户信息
     */
    imGetUserInfo: function (userId) {
        http.get(
            app.globalData.im + "user/info", {
                userId: userId
            },
            (status, resultCode, message, data) => {
                let that = this;
                this.setData({
                    loginCon: true
                });
                if (data && data.userId) {
                    let msgObj = {
                        from: data.userId,
                        text: data.nickname + "进入直播间",
                        type: "join_im",
                        userName: data.nickname,
                        headimg: data.headimg,
                        chatroomId: that.data.roomId
                    };
                    this.listenHuanXinMessage(msgObj);
                }
                wx.hideLoading()
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },


    /**
     * 整个网络状态监听
     */
    checkNetState: function () {
        wx.onNetworkStatusChange(function (res) {
            if (!res.isConnected) {
                wx.showToast({
                    title: '网络未连接',
                    icon: "none",
                    duration: 2000,
                    mask: true,
                })
            }
        })

    },

    /**
     * 接收消息，处理分块接收消息
     */
    ipushHandlerMessage: function (pkg, byte) {
        // console.log("接收消息")
        let array_byte = byte;
        if (array_byte.byteLength) {
            if (pkg != null) {
                let newType = new DataView(array_byte.slice(2, 6));
                let mlen = new DataView(array_byte.slice(0, 2));
                mlen = mlen.getUint16() + 2;
                let hasParseLen = mlen; //已经取出来的长度
                if (mlen <= array_byte.byteLength) {
                    if (mlen == array_byte.byteLength) { //一次性取完，打完收工
                        let cmdType = newType.getUint32();
                        let decodedString = this.arrayBufferToString(array_byte.slice(6, array_byte.byteLength))
                        let json = {};
                        if (decodedString && decodedString != "") {
                            json = JSON.parse(decodedString);
                        }
                        if (json.text) {
                            pkg.data = json.text;
                        } else {
                            pkg.data = decodedString;
                        }
                        if (pkg && pkg.data) { //只接收处理红包消息
                            let json = JSON.parse(pkg.data);
                            if (json.typeCode == 'gift') {
                                this.handlerChatRoomMessage(pkg);
                            }
                        }
                        let ret = {};
                        ret.cmdType = cmdType;
                        ret.cmdStr = decodedString;
                        this.onMessage(ret);
                    } else {
                        while (true) {
                            if (array_byte.byteLength == hasParseLen) {
                                break;
                            }
                            console.log("一次接收多条消息，while循环");
                            let msg = null;
                            if (hasParseLen == mlen) {
                                msg = array_byte.slice(0, hasParseLen);
                            } else {
                                msg = array_byte.slice(hasParseLen, array_byte.byteLength - hasParseLen);
                                hasParseLen = hasParseLen + msg.byteLength
                            }
                            let cmdType = new DataView(msg.slice(2, 6));
                            cmdType = cmdType.getUint32();
                            let decodedString = this.arrayBufferToString(array_byte.slice(6, array_byte.byteLength))
                            pkg.data = decodedString;
                            if (pkg && pkg.data) { //只接收处理红包消息
                                let json = JSON.parse(pkg.data);
                                if (json.typeCode == 'gift') {
                                    this.handlerChatRoomMessage(pkg);
                                }
                            }
                            let ret = {};
                            ret.cmdType = cmdType;
                            ret.cmdStr = decodedString;
                            this.onMessage(ret);
                        }
                    }
                } else {
                    //一次发消息没发完的情况,待蚂蚁再确认

                }

            }
        }
    },


    /**
     * 处理一次发不完的情况
     */
    incompleteHandlerMessage: function () {

    },


    /**
     * arrayBuffer转字符串
     */
    arrayBufferToString: function (buffer, encoding) {
        if (!buffer) {
            return false;
        }
        if (encoding == null) encoding = 'utf8';
        return npmBuffer.Buffer.from(buffer).toString(encoding);
    },


    /**
     * 获取其他资源的码流
     */
    getOtherLiveUrl: function () {
        http.get(
            app.globalData.im + "chatroom/getChatroomByCode", {
                merchantCode: this.data.merchantCode,
                isTra: this.data.liveStream == 0 ? false : true,
            },
            (_status, _resultCode, _message, data) => {
                if (data) {
                    this.setData({
                        liveUrl: data.pullUrl,
                    })
                }
                wx.hideLoading()
            },
            (_status, _resultCode, _message, _data) => {
                wx.hideLoading()
            }
        );
    },


    /**
     * 获取当前登录人的用户信息，更新缓存
     */
    getUserLander: function (userId) {
        http.get(
            app.globalData.im + "user/info", {
                userId: userId
            },
            (status, resultCode, message, data) => {
                let user = wx.getStorageSync("user")
                if (data && data.nickname) {
                    user.nickname = data.nickname;
                }
                if (data && data.headimg) {
                    user.headimg = data.headimg
                }
                wx.setStorageSync("user", user);
                wx.hideLoading();
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },


    /**
     * 设置环信消息队列
     */
    listenHuanXinMessage: function (message) {
        let length = huanXinMessage.length;
        if (length == 0) {
            huanXinMessage[length] = message;
        } else if (length >= 500) {
            huanXinMessage.shift();
            huanXinMessage.length = huanXinMessage.length + 1;
            huanXinMessage[(huanXinMessage.length - 1 > 0 ? huanXinMessage.length - 1 : 0)] = message;
        } else {
            huanXinMessage.length = huanXinMessage.length + 1;
            huanXinMessage[(huanXinMessage.length - 1 > 0 ? huanXinMessage.length - 1 : 0)] = message;
        }
    },

    /**
     * 设置红包消息特效队列
     */
    listenlive_red_envelopeMessage: function (message) {
        let length = live_red_envelope.length;
        if (length == 0) {
            live_red_envelope[length] = message;
        } else if (length >= 500) {
            // live_red_envelope.shift();
            live_red_envelope.length = live_red_envelope.length + 1;
            live_red_envelope[(live_red_envelope.length - 1 > 0 ? live_red_envelope.length - 1 : 0)] = message;
        } else {
            live_red_envelope.length = live_red_envelope.length + 1;
            live_red_envelope[(live_red_envelope.length - 1 > 0 ? live_red_envelope.length - 1 : 0)] = message;
        }
    },


    /**
     * 定时调用读取环信的消息队列
     */
    getHuanXinMessage: function () {
        let that = this;
        huanXinMessage_timer = setInterval(function () {
            let data = {}
            if (huanXinMessage.length > 0) {
                let initMessage = huanXinMessage.shift();
                if (initMessage && initMessage.type == 'join_im') {
                    data.data = JSON.stringify(initMessage);
                    that.handlerChatRoomMessage(data);
                } else if (initMessage && initMessage.data) {
                    data.data = initMessage.data;
                    that.handlerChatRoomMessage(data);
                }
            }
        }, 500);
    },

    /** 显示隐藏切换码流 */
    displayChangeLiveStream: function () {
        this.setData({
            liveStreamHidden: !this.data.liveStreamHidden,
            moreOperateHidden: true,
        })
    },

    /** 切换码流 */
    changeLiveStream: function (e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            liveStream: index,
        })
        this.getOtherLiveUrl()
        this.displayChangeLiveStream()
    },

    /** 更多操作 */
    moreOperate: function () {
        this.setData({
            moreOperateHidden: !this.data.moreOperateHidden,
        })
    },

    /** 隐藏显示投诉 */
    showHiddenComplaint: function () {
        this.setData({
            complaintMainHidden: !this.data.complaintMainHidden,
            moreOperateHidden: true,
            complaintImgList: this.data.complaintMainHidden ? [] : this.data.complaintImgList,
        })
    },

    /**
     * 上传图片
     */
    uploadImg: function () {
        if (this.data.complaintImgList.length >= 12) {
            return
        }
        if (this.data.imgUploading) {
            wx.showToast({
                title: '图片上传中...',
                icon: 'none',
                mask: true,
            })
            return
        }
        var count = 12 - (this.data.complaintImgList.length != 0 ? this.data.complaintImgList.length : this.data.waitUploadCount)
        wx.chooseImage({
            count: count,
            success: res => {
                this.setData({
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
                    this.setData({
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
                        this.setData({
                            complaintImgList: this.data.complaintImgList.concat(data),
                            imgUploading: false,
                        })
                    },
                    (status, resultCode, message, data) => {
                        wx.hideLoading();
                    }
                );
            },
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

    complaintTextValue: function (e) {
        this.setData({
            complaintText: e.detail.value,
        })
    },

    /** 提交投诉 */
    complaintSubmit: function () {
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
                complaintType: "live",
                dataId: this.data.merchantCode,
                complaintContent: this.data.complaintText,
                complaintAttachment: JSON.stringify(this.data.complaintImgList),
            },
            (_status, _resultCode, _message, data) => {
                wx.showToast({
                    title: '投诉成功',
                    mask: true,
                })
                this.showHiddenComplaint()
                wx.hideLoading()
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
    ctvVideoPlay: function () {
        this.setData({
            ctvVideoPlaying: true,
            playBtn: false,
        })
    },
    ctvVideoPause: function () {
        this.setData({
            ctvVideoPlaying: false,
        })
    },
    bindended: function () {
        this.setData({
            initialTime: null,
            playBtn: true
        })
    },
    ctvVideoPlayPause: function () {

        if (this.data.ctvVideoPlaying) {
            this.clerkTemplateVideoContext.pause()
        } else {
            this.clerkTemplateVideoContext.play()
        }
    },

    //获取企业状态
    getBusinessStatus: function () {
        http.get(
            app.globalData.host + "merchant/status", {
                merchantCode: this.data.merchantCode,
                templateCode: "shop",
            },
            (status, resultCode, message, data) => {
                this.setData({
                    businessStatus: data,
                    offline: data.live == 1 ? false : true,
                })
            },
            (status, resultCode, message, data) => {}
        );
    },
})