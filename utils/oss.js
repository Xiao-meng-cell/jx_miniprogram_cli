"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var util = require('./util.js');
var http = require('./http.js');

var sts = null;
var stsTimestamp = 0;

//上传
var uploadHttp = http.upload;
exports.uploadHttp = uploadHttp;

exports.uploadAliyun = uploadHttp;
exports.upload = uploadHttp;