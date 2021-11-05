
let app = getApp();
let config = {
	// xmppURL: "wss://im-api.easemob.com/ws/", //小程序2.0sdk线上环境
	// xmppURL: "wss://im-api-hsb.easemob.com/ws/", //小程序2.0sdk沙箱环境
	// xmppURL: 'wss://im-api-new-hsb.easemob.com/websocket', //小程序沙箱环境
	xmppURL: 'wss://im-api-wechat.easemob.com/websocket', //3.0sdk小程序线上环境
	apiURL: "https://a1.easemob.com", // 线上环境 
	appkey: app.globalData.host == "https://www.vicpalm.com/weclubbing/remote/" ? "1138190715085099#zstalk" : "1138190715085099#test",    
	https: false,
	isMultiLoginSessions: true,
	isWindowSDK: false,
	isSandBox: false,
	isDebug: false,
	autoReconnectNumMax: 15,
	autoReconnectInterval: 2,
	isWebRTC: false,
	isAutoLogin: true
};

export default config;
