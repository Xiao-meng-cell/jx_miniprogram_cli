
import websdk from "./sdk/webimSDK3.1.2";
import config from "./WebIMConfig";

console.group = console.group || {};
console.groupEnd = console.groupEnd || {};

var window = {};
let WebIM = window.WebIM = websdk;
window.WebIM.config = config;

WebIM.conn = new WebIM.connection({
	appKey: WebIM.config.appkey,
	isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
	https:  WebIM.config.https,
	url: WebIM.config.xmppURL,
	apiUrl: WebIM.config.apiURL,
	isAutoLogin: true,
	heartBeatWait: WebIM.config.heartBeatWait,
	autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	autoReconnectInterval: WebIM.config.autoReconnectInterval
});
module.exports = {
	"default": WebIM
};
