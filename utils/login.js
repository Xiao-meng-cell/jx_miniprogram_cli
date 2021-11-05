/*
  - Copyright (c) 2018-2025, vicpalm All rights reserved.
  - Author:lg
  - 2020-09-09 15:17:46
  - 通用helper
  */
 var http = require('./http')
 var util = require('./util')
 var RSAKey = require('./rsa-client');
 var base64 = require('./base64.js');
 /**导入状态**/
 const $promise = {}
 export default {
	 /**
		* 微信登录
		*/
	 async wxLogin() {
		 const {
			 openId,
			 unionId
		 } = getApp().globalData
		 if (openId || unionId) return Promise.resolve(getApp().globalData)
		 return ($promise.wxToken = $promise.wxToken || new Promise(async (resolve, reject) => {
			 try {
				 // 基础库 2.10.2 版本起，异步 API 支持 callback & promise 两种调用方式。当接口参数 Object 对象中不包含 success/fail/complete 时将默认返回 promise，否则仍按回调方式执行，无返回值。
				 const {
					 code
				 } = await wx.login()
 
				 // 获取appId
				 const appInfo = await wx.getAccountInfoSync()
				 const {
					 appId
				 } = appInfo.miniProgram
 
				 let data  = await this.getAuthorization(code, appId)
		 
				 // 获取openid, session_key
				 let {
					 openid,
					 session_key,
					 unionid
				 } = data
				 wx.setStorageSync('appId', appId)
				 wx.setStorageSync('ssdid', openid)
				 resolve(Object.assign(getApp().globalData, {
					 openId: openid,
					 unionId: unionid,
					 appId,
					 ssdid: openid,
					 session_key
				 }))
 
			 } catch (err) {
 
				 reject(err)
			 } finally {
 
				 wx.nextTick(() => delete $promise.wxToken)
			 }
		 }))
	 },
 // 获取小程序openId
	 getAuthorization(code, appId) {
		 return new Promise((resolve, reject) => {
			 http.post(
				 getApp().globalData.host + 'wechat/authorization_minpro', {
					 code: code,
					 appid: appId
				 },
				 (status, resultCode, message, data) => {
					 resolve(data)
				 },
				 (status, resultCode, message, data) => {
					 reject(data)
				 }
			 );
		 })
	 },
 
	 /**
		* 获取商家信息
		*/
	 async getMerchantInfo(cb) {
		 let _that = this
		 //获取ext配置内容
 
 
		 //通过appid获取
		 let appInfo = await this.getAppInfo()
		 _that.log('获取appid', appInfo)
		 let appId = appInfo.miniProgram.appId
		 wx.setStorageSync('appId', appId)
		 getApp().globalData.appId = appId
		 //获取商家信息
		 http.get(getApp().globalData.api.merchant.merchantInfo, {
				 type: "wxml",
				 key: "appId",
				 value: appInfo.miniProgram.appId,
				 publish: '-1',
			 }, (status, resultCode, message, data) => {
				 _that.log('data', data)
				 wx.setStorageSync('merchantInfo', data)
				 getApp().globalData.merchantInfo = data
				 wx.setStorageSync('merchantCode', data.code)
				 getApp().globalData.merchantCode = data.code
				 getApp().globalData.defaultMerchantCode = data.code
				 console.log("=根据appid获取企业信息", data)
				 this.getMicroConfInfo(data.code)
				 //存储商户号到状态中
				//  store.data.merchantCode = data.code
			 },
			 (status, resultCode, message, data) => {
				 _that.log('获取商户信息失败')
			 });
 
	 },
	 /**
		* 获取加密公钥
		*/
	 async getRsa() {
		 return new Promise((resolve, reject) => {
		 http.get(
			 getApp().globalData.host + "rsa", {},
			 (status, resultCode, message, data) => {
				 resolve(data)
			 },
			 (status, resultCode, message, data) => {
				 reject(data)
			 })
		 })
	 },
	 getRsaKey() {
		 return new Promise(async (resolve, reject) => {
				 try {
						 // 加密解密需要同一个key
						 let key = util.random(16)
						 let	data= await this.getRsa()
						 let rsaKey = new RSAKey()
						 if (rsaKey == null) return null
						 rsaKey.setPublic(base64.b64tohex(data.modulus), base64.b64tohex(data.exponent))
						 let keyValue = base64.hex2b64(rsaKey.encrypt(key))
						 resolve({
								 key,
								 keyValue
						 })
				 } catch (err) {
						 reject(err)
						 throw new Error(err)
				 }
		 })
 },
 // 微信登录，通过返回信息判断用户是否存在
 async miniprogramLogin(params){
	 return new Promise((resolve, reject) => {
		 http.post(
			 getApp().globalData.host + 'miniprogram/login', params,
			 (status, resultCode, message, data) => {
				 resolve(data)
			 },
			 (status, resultCode, message, data) => {
				 reject(data)
			 }
	 )
	 })
 },
 };