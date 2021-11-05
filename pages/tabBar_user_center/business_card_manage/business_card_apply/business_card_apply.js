// miniprogram/pages/tabBar_user_center/business_card_manage/business_card_apply/business_card_apply.js
var util = require('../../../../utils/util.js');
var http = require('../../../../utils/http.js');
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        capsuleTop: 0,
        userDefalutBack: false,
        networkType: true, //监听网络连接与断开
        card_name: "",
        card_position: "",
        card_phone: "",
        card_headimg: "",
        card_wx: "",
        card_qq: "",
        card_email: "",
        pageIndex: 0,
        pageLimit: 10,
        keyword: "",
        card_list: [], //卡片列表数据
        pageIndex_add: 0, //二维数组下标
        business_info: {}, //选中的企业
        show_business_list: false,
        invite: false, //是否是店长邀请
        applyCardData: "", //待提交名片数据
        useImport: false, //是否使用了一键导入
        my_all_card_list: [], //我的所有名片
        my_all_card_list_length: 0, //所有名片长度
        current: 0, //当前名片模板
        chooseBusiness_button: true,
        noInviteRock: false,
        clerk_code: "",
        clerkskinIndex: 0, //选中的皮肤下标
        clerkskin: null, //皮肤背景
        role: '',
        clerker: false,
        vicpalmMain: app.globalData.vicpalmMain, //是否掌胜科技为主体
        merchant_code: "",
        autoSumbit: true, //自动提交申请
        inviteStatus: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        app.watch(that.watchBack); //监听网络变化
        app.getOptions(options, function (data, num) {
            that.initOptions(data)
            if (num == 1) {
                that.onShow()
            }
        }, function (data, qrcode_scene) {
            that.initOptions(data)
        }, function (data, qrcode_scene) {
            console.log('通过旧二维码获取option回调', data, qrcode_scene)
            let higherLevelCode = util.getQueryString(qrcode_scene, "user");
            let merchantCode = util.getQueryString(qrcode_scene, "id");
            let invite = util.getQueryString(qrcode_scene, "invite");
            let role = util.getQueryString(qrcode_scene, "role");
            let inviteStatus = util.getQueryString(qrcode_scene, "inviteStatus");
            //&是我们定义的参数链接方式
            if (higherLevelCode) {
                app.globalData.higherLevelCode = higherLevelCode;
                app.globalData.isReloadThePage_tabBar_index = true;
                app.globalData.jumpIndex_fromApp = true;
            }
            if (merchantCode) {
                app.globalData.isReloadThePage_tabBar_index = true;
                that.setData({
                    merchant_code: merchantCode
                });
            }
            if (invite != 'undefined' && invite != 'false') {

                that.setData({
                    invite: true
                })
            }
            console.log('vvvvvvvvv', invite, that.data.invite)
            if (role) {
                that.setData({
                    role: role,
                    clerk_code: app.globalData.higherLevelCode
                });
                if (wx.getStorageSync('user')) {
                    that.getParentUserId();
                }
            } else {
                that.getServiceListByKeyword();
            }
            if (inviteStatus) {
                that.setData({
                    inviteStatus: inviteStatus
                })
            }
        })

        if (wx.getStorageSync('user')) {
            this.searchMineCardList();
        }
    },
    //初始化参数
    initOptions(options) {
        console.log(wx.getStorageSync('myMerchantInfo').code)
        if (options.invite) {
            this.setData({
                invite: true
            })
        }
        if (options.higherLevelCode) {
            app.globalData.higherLevelCode = options.higherLevelCode;
            app.globalData.isReloadThePage_tabBar_index = true;
        }
        if (options.merchantCode) {
            this.setData({
                merchant_code: options.merchantCode
            });
        }
        if (options.noInviteRock) {
            this.setData({
                noInviteRock: true
            });
        }
        if (options.inviteStatus) {
            this.setData({
                inviteStatus: options.inviteStatus
            })
        }
        if (options.role) {
            this.setData({
                role: options.role,
                clerk_code: app.globalData.higherLevelCode
            });
            if (wx.getStorageSync('user')) {
                this.getParentUserId();
            } else {
                app.isUserLogin(function (isLogin) {})
            }
        } else {
            this.getServiceListByKeyword();
        }


        if (!wx.getStorageSync('user')) {
            wx.showToast({
                title: '您未登录哦',
                icon: "none"
            })
            return false
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
        this.setData({
            capsuleTop: app.globalData.capsuleTop,
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getBusinessInfo();
        if (wx.getStorageSync('user')) {
            this.getParentUserId();
            this.getClerkStyle();
            if (this.data.merchant_code != "") {
                this.getUserClerkInfo()
                this.setData({
                    autoSumbit: false,
                })
            }
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
        if (!app.globalData.vicpalmMain) { //独立小程序
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
        if (this.data.show_business_list) {
            this.setData({
                pageIndex: this.data.pageIndex + 10,
                pageIndex_add: this.data.pageIndex_add + 1
            })
            this.getServiceListByKeyword();
        }

    },

    /**
     * 用户点击右上角分享
     */
    // onShareAppMessage: function () {

    // },

    /**
     * 返回上一页
     */
    backPreviousPage: function () {
        var pages = getCurrentPages()
        if (pages.length > 1) {
            if (!app.globalData.vicpalmMain) { //独立小程序
                wx.navigateTo({
                    url: '/pages/tabBar_user_center/user_center',
                })
            } else {
                wx.navigateBack({
                    delta: 1
                })
            }
        } else {
            this.backIndexPage()
        }
    },

    /**
     * 返回首页
     */
    backIndexPage: function () {
        wx.navigateTo({
            url: '/pages/tabBar_index/business_homepage/business_homepage?merchantCode=' + this.data.merchant_code + '&higherLevelCode=' + app.globalData.higherLevelCode,
        })
    },

    /**
     * 执行搜索
     */
    executeSearch: function (e) {
        this.setData({
            keyword: e.detail.value,
            pageIndex: 0,
            pageIndex_add: 0
        });
        this.getServiceListByKeyword();
    },




    /**
     * 获取企业详情信息
     */
    getBusinessInfo: function () {
        http.get(
            app.globalData.host + "/biz/user/merchant/info", {
                merchantCode: this.data.vicpalmMain ? this.data.merchant_code : app.globalData.defaultMerchantCode
            },
            (status, resultCode, message, data) => {
                this.setData({
                    business_info: data,
                })

            },
            (status, resultCode, message, data) => {}
        );
    },

    /**
     * 点击某个企业，选中
     */
    chooseBusinessClick: function (e) {
        this.setData({
            business_info: e.currentTarget.dataset.business_info,
        });
        this.chooseBusiness();
        wx.pageScrollTo({
            scrollTop: 0
        })
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
     * 选择门店,展示门店列表
     */
    chooseBusiness: function () {
        if (this.data.invite) {
            wx.showToast({
                title: "邀请状态中无法更换企业",
                icon: "none"
            })
            return false;
        }
        this.setData({
            chooseBusiness_button: !this.data.chooseBusiness_button,
            show_business_list: !this.data.show_business_list
        });
    },


    /**
     * 获取某类别的列表
     */
    getServiceListByKeyword: function () {
        wx.showLoading({
            title: '数据加载中',
            mask: true
        })

        http.get(
            app.globalData.host + "/biz/user/merchant/list", {
                skip: this.data.pageIndex,
                limit: this.data.pageLimit,
                lng: app.globalData.current_lng,
                lat: app.globalData.current_lat,
                merchantCityId: app.globalData.city_info.id ? app.globalData.city_info.id : 1,
                type: "country",
                orderBy: "distance",
                filter: this.data.keyword
            },
            (status, resultCode, message, data) => {
                data = this.handleData(data);
                this.setData({
                    ['card_list[' + this.data.pageIndex_add + ']']: data
                });
                wx.hideLoading();
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },

    /**
     * 操作返回来的数据
     */
    handleData: function (array) {
        var data = array;
        for (var i = 0; i < data.length; i++) {
            data[i].dis = app.getDisance(data[i].lat, data[i].lng);
        }
        return data;

    },

    /**检测用户在指定店铺下的名片 */
    getUserClerkInfo() {
        http.get(
            app.globalData.host + "biz/user/merchant/clerk/getClerkInfo", {
                merchantCode: this.data.vicpalmMain ? this.data.merchant_code : app.globalData.defaultMerchantCode,
                userId: wx.getStorageSync('user').id
            },
            (status, resultCode, message, data) => {
                if (!data) {
                    if (!this.data.autoSumbit) {
                        this.setData({
                            autoSumbit: true,
                        })
                        return
                    }
                    this.submitData();
                } else {
                    if (!data.id) { //商家身份
                        this.submitData();
                    } else {
                        if (data.merchantStatus == '3') {
                            wx.showModal({
                                title: '温馨提示',
                                content: '企业已过期，名片无法使用',
                            })
                            return false;
                        }
                        if (data.merchantStatus == '-1') {
                            wx.showModal({
                                title: '温馨提示',
                                content: '企业已注销，名片无法使用',
                            })
                            return false;
                        }
                        if (data.status == 2) { //名片审核中
                            wx.showModal({
                                title: '温馨提示',
                                content: '名片正在审核中，请勿重复提交申请',
                                showCancel: false,
                                showModal: true,
                                success: function (res) {
                                    if (res.confirm) {
                                        setTimeout(() => {
                                            wx.navigateTo({
                                                url: "/pages/tabBar_user_center/user_center"
                                            })
                                        }, 1500);
                                    }
                                }
                            })
                            return false;
                        }
                        if (data.status == 1) {
                            wx.redirectTo({
                                url: "/pages/clerk/show/show?workerId=" + data.id + '&higherLevelCode=' + app.globalData.higherLevelCode
                            })
                        }
                    }
                }
            },
            (status, resultCode, message, data) => {
                wx.hideLoading()
            }
        );
    },

    /**申请提交 */
    submitData: function () {
        console.log('22222222222', this.data.invite)
        var check_data = this.checkUpData();
        let obj = {};
        obj.merchantCode = this.data.business_info.code;
        obj.name = this.data.card_name;
        obj.company = this.data.business_info.name;
        obj.phone = this.data.card_phone;
        obj.email = this.data.card_email;
        obj.addr = this.data.business_info.addr;
        obj.headimg = this.data.card_headimg;
        obj.clerkskinUrl = this.data.clerkskin;
        obj.styleValue = "business";
        obj.styleType = "business";
        obj.wx = this.data.card_wx;
        obj.qq = this.data.card_qq;
        obj.position = this.data.card_position;
        obj.companyShort = this.data.business_info.shortName;
        obj.merchantShortName = this.data.business_info.shortName;
        obj.status = this.data.invite ? 1 : 2;
        if (check_data) {
            wx.showLoading({
                title: '正在提交',
            })
            let inviteStatus = parseInt(this.data.inviteStatus)

            http.post(
                app.globalData.host + "/biz/user/merchant/clerk/apply", {
                    merchantCode: this.data.business_info.code,
                    name: this.data.card_name,
                    // company: this.data.business_info.name,
                    phone: this.data.card_phone,
                    email: this.data.card_email,
                    addr: this.data.business_info.addr,
                    sex: undefined,
                    headimg: this.data.card_headimg,
                    wx: this.data.card_wx,
                    qq: this.data.card_qq,
                    clerkskinUrl: this.data.clerkskin,
                    styleType: "business",
                    position: this.data.card_position,
                    // companyShort: this.data.business_info.shortName,
                    // merchantShortName: this.data.business_info.shortName,
                    status: this.data.invite ? 1 : 2,
                    role: this.data.role ? this.data.role : 1,
                    parentUserId: this.data.parentUserId ? this.data.parentUserId : undefined,
                    inviteStatus: inviteStatus ? inviteStatus : 1
                },
                (status, resultCode, message, data) => {
                    wx.setStorageSync("applyCardData", obj);
                    wx.hideLoading();
                    wx.showToast({
                        title: '提交成功',
                        icon: "none",
                        mask: true,
                        success: (res) => {
                            setTimeout(function () {
                                wx.navigateTo({
                                    url: "/pages/tabBar_user_center/user_center"
                                })
                                // wx.navigateTo({
                                //     url: '/pages/tabBar_user_center/business_card_manage/business_card_index/business_card_index',
                                // })
                            }, 1000)
                        },
                    })
                },
                (status, resultCode, message, data) => {
                    wx.hideLoading()
                    wx.showToast({
                        title: message,
                        icon: "none",
                        mask: true,
                    })
                }
            );
        }
    },


    /**
     * 提交申请
     */
    submitApply: function () {
        let that = this;
        app.isUserLogin(function (isLogin) {
            if (isLogin) {
                that.getUserClerkInfo();
            }
        })
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
        } else if (this.data.card_name.trim() == "" || this.data.card_name.trim() == null) {
            wx.showToast({
                title: '姓名不能为空',
                icon: "none"
            })
            return false
        } else if (!this.data.card_position) {
            wx.showToast({
                title: '职位未填写',
                icon: "none"
            })
            return false
        } else if (this.data.card_position.trim() == "" || this.data.card_position.trim() == null) {
            wx.showToast({
                title: '职位不能为空',
                icon: "none"
            })
            return false
        } else if (!this.data.card_phone) {
            wx.showToast({
                title: '请输入号码',
                icon: "none"
            })
            return false
        } else if (this.data.card_phone.trim() == "" || this.data.card_phone.trim() == null) {
            wx.showToast({
                title: '号码不能为空',
                icon: "none"
            })
            return false
        } else if (!this.data.business_info.code) {
            wx.showToast({
                title: '请选择公司/单位',
                icon: "none"
            })
            return false
        } else if (!this.data.clerkskin) {
            wx.showToast({
                title: '请选择名片背景',
                icon: "none"
            })
            return false
        } else {
            return true
        }
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
                wx.hideLoading();
            },
            (status, resultCode, message, data) => {
                wx.hideLoading();
            }
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

    /**
     * 清除缓存
     */
    clearImport: function () {
        this.setData({
            card_name: "",
            card_phone: "",
            card_email: "",
            card_headimg: "",
            card_wx: "",
            card_qq: "",
            card_position: "",
            useImport: false
        });

    },

    /**
     * 一键导入缓存
     */
    oneClickImport: function () {
        if (this.data.applyCardData) {
            this.setData({
                card_name: this.data.applyCardData.name,
                card_phone: this.data.applyCardData.phone,
                card_email: this.data.applyCardData.email,
                card_headimg: this.data.applyCardData.headimg,
                card_wx: this.data.applyCardData.wx,
                card_qq: this.data.applyCardData.qq,
                card_position: this.data.role && this.data.role == 0 ? '共享合伙人' : '事业合伙人',
                useImport: true
            });
        }
    },

    /** 检查身份 */
    // checkIdentity: function () {
    //     if (!this.data.merchant_code) {
    //         return false;
    //     }
    //     console.log('检查身份')
    //     wx.showLoading({
    //         title: '加载中...',
    //         mask: true,
    //     })
    //     http.get(
    //         app.globalData.host + 'biz/user/merchant/clerk/apply/check', {
    //             merchantCode: this.data.merchant_code
    //         },
    //         (status, resultCode, message, data) => {
    //             // console.log('检查身份成功')
    //             console.log(data);debugger
    //             if (data == 1 || data == 2) {
    //                 // console.log('为该企业员工')
    //                 this.setData({
    //                     clerker:true
    //                 })
    //                 // this.jumpCardDetail()
    //             } else {
    //                 console.log('非该企业员工')
    //                 wx.hideLoading()
    //             }
    //         },
    //         (status, resultCode, message, data) => {
    //             wx.hideLoading()
    //         }
    //     );
    // },

    /** 搜索我的名片列表 */
    searchMineCardList: function () {
        if (!wx.getStorageSync('user')) {
            wx.showToast({
                title: '用户未登录',
                icon: "none"
            })
            return false
        }
        http.get(
            app.globalData.host + 'biz/user/merchant/clerk/mine/list', {},
            (status, resultCode, message, data) => {
                this.setData({
                    my_all_card_list: data,
                    current: 0,
                    my_all_card_list_length: data.length,
                    applyCardData: data[0]
                });
                this.oneClickImport();
                // this.checkIdentity();
                wx.hideLoading()
            },
            (status, resultCode, message, data) => {
                console.log('检查身份失败')
                wx.hideLoading()
            }
        )
    },


    /** 跳转到我的名片详情 */
    jumpCardDetail: function () {
        for (let i in this.data.my_all_card_list) {
            let cardObj = this.data.my_all_card_list[i];
            if (cardObj.merchantCode == this.data.merchant_code && cardObj.userId == wx.getStorageSync('user').id) {
                wx.redirectTo({
                    url: '/pages/clerk/show/show?merchantCode=' + this.data.merchant_code + '&higherLevelCode=' + app.globalData.higherLevelCode + "&workerId=" + cardObj.id + "&toIndex=true",
                })
                break
            }
        }
    },

    /**
     * 换一个名片模板
     */
    changeOne: function () {
        if (this.data.my_all_card_list_length > 0) {
            this.setData({
                current: this.data.current < this.data.my_all_card_list_length - 1 ? this.data.current + 1 : 0
            });
            this.setData({
                applyCardData: this.data.my_all_card_list[this.data.current]
            });
            this.oneClickImport();
        }

    },

    /***
     * 获取用户信息
     */
    getParentUserId: function () {
        if (this.data.clerk_code) {
            http.get(
                app.globalData.host + 'personal/infoByCode', {
                    userCode: this.data.clerk_code,
                },
                (status, resultCode, message, data) => {
                    console.log(data);
                    this.setData({
                        parentUserId: data.id
                    });
                },
                (status, resultCode, message, data) => {
                    wx.showToast({
                        title: '获取共享合伙人失败',
                        icon: "none"
                    })
                }
            );
        }

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
     * 获取名片模板 /biz/clerk/style/getStyleAll
     */
    getClerkStyle: function () {
        http.get(
            app.globalData.host + 'biz/clerk/style/getStyleAll', {},
            (status, resultCode, message, data) => {
                // console.log(data);
                this.setData({
                    clerkStyle: data
                });
                this.getBusinessStyle(data)
            },
            (status, resultCode, message, data) => {

            }
        );
    },


    /**
     * 获取商务名片
     */
    getBusinessStyle: function (data) {
        if (data != null && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].styleValue == "business" && data[i].jsonUrl) {
                    let businessBg = JSON.parse(data[i].jsonUrl);
                    this.setData({
                        businessBg: businessBg,
                        clerkskin: businessBg.clerkskin[0]
                    });
                }
            }
        }
    },

    /**
     * 点击更换商务名片背景/皮肤
     */
    switchClerkSkin: function (e) {
        let index = e.currentTarget.dataset.index;
        let value = e.currentTarget.dataset.clerkskin;
        this.setData({
            clerkskinIndex: index,
            clerkskin: value
        });
    }
})