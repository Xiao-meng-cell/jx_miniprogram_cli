var crypto = require('./crypto.js');
const util = require('./util.js');



var CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';





//随机数
var random = function (n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 61);
    res += CHARS.charAt(id);
  }
  return res;
}

let isRefreshing = true;

function resetLogin() {
  if (isRefreshing) {
    isRefreshing = true;
    // wx.clearStorageSync();
    wx.clearStorage({
      success: function () {
        wx.navigateTo({
          url: '/pages/authorization/authorization'
        })
      }
    });
  }
  isRefreshing = false;
}

/**
 * date转timestamp
 * @param date
 * @returns {timestamp}
 */
var timestamp = function (date = new Date()) {
  return new Date().getTime();
};

var fetchOk = function (mtype, data, success, error) {
  if (data && data.result) {
    if (success) {
      success(200, data.resultCode, data.message, data.data);
    }
  } else {
    if (error) {
      let status = 500;
      let resultCode = data.resultCode;
      if (resultCode) {
        if (resultCode == 'shiro.principal.unknown.error' || resultCode == 'shiro.token.invalid.error' || resultCode == 'auth.login.required') { //用户信息校验失败
          status = 401;
          resetLogin();
        }
      } else {
        resultCode = "core." + mtype + ".error";
      }
      error(status, data.resultCode, data.message, null);
    }
  }
}

var fetchError = function (mtype, data, error) {
  console.log(data);
  let res = {};
  if (data && data.data) {
    res = data.data;
  } else {
    res = data;
  }
  if (error) {
    //错误消息(错误页面或json字符串)
    var message = null;
    var resultCode = null;
    var status = 500;
    if (res && res.status) {
      status = res.status;
    }
    try {
      if (res && res.message) {
        message = res.message;
      }
      if (res && res.resultCode) {
        resultCode = res.resultCode;
      }
    } catch (e) {
      console.log(e);
    }

    if (status == 401) { //用户信息校验失败
      resetLogin();
    } else if (status == 403) {
      message = "用户没有权限！";
    } else if (status == 404) {
      message = "服务不存在！";
    } else if (status == 504) {
      message = "网络超时！";
    }
    if (resultCode) {
      if (resultCode == 'shiro.principal.unknown.error' || resultCode == 'shiro.token.invalid.error' || resultCode == 'auth.login.required' || resultCode == 'shiro.digest.error') { //用户信息校验失败
        status = 401;
        resetLogin();
      }
    } else {
      resultCode = "core." + mtype + ".error";
    }
    error(status, resultCode, message, null);
  }
}

//restful
var restful = function (type, method, url, params, success, error) {
  if (type == null) {
    type = 'POST';
  }
  var mtype = type;

  if (type == 'GET') {
    method = null;
  }
  if (method) {
    method = method.toUpperCase();
    mtype = method;
  }

  mtype = mtype.toLowerCase();

  if (wx.getStorageSync('user')) {
    params.principalId = wx.getStorageSync('user').id ? wx.getStorageSync('user').id : '0'
    params.safety = wx.getStorageSync('user').safety ? wx.getStorageSync('user').safety : 'safety'
  }

  var p = Object.assign({}, params);
  for (let item in p) {
    if (p[item] == undefined || p[item] == null) {
      delete p[item]
    }
  }

  var principal = wx.getStorageSync("principal");
  var digestKey = wx.getStorageSync("digestKey");
  var ssdid = wx.getStorageSync("ssdid") ? wx.getStorageSync("ssdid") : random(32);

  if (method && method != 'GET' && method != 'POST') {
    p._method = method;
  }

  p._client = "wx.wxml"
  p._app = "weclubbing"
  p._version = "2.0.86"
  p.ssdid = ssdid;
  var fetchParams = function () {
    var r = '';
    if (principal && principal.length > 0 && digestKey && digestKey.length > 0) {
      p.principal = principal;
      p.timestamp = timestamp();
      p.nonce = random(16);
      p.digest = crypto.digest(digestKey, p);
    }
    if (mtype == "POST" || mtype == "post") {
      r = p;
    } else {
      let paramsArray = [];
      Object.keys(p).forEach(key => { //参数编码
        var v = p[key];
        if (v != undefined && v != null) {
          if (v instanceof Array) {
            v.forEach(vk => {
              paramsArray.push(key + "=" + encodeURIComponent(vk));
            });
          } else {
            paramsArray.push(key + "=" + encodeURIComponent(v));
          }
        }
      });
      // console.log(r);
      r = paramsArray.join("&");
    }
    return r;
  }

  var fetchUrl = function () {
    var r = url;
    if (type == 'GET') {
      if (r.search(/\?/) === -1) {
        r += '?' + fetchParams();
      } else {
        r += '&' + fetchParams();
      }
    }
    return r;
  }

  wx.request({
    url: fetchUrl(),
    data: fetchParams(),
    method: type,

    header: {
      'X-Requested-With': 'XMLHttpRequest',
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    success(res) {
      fetchOk(mtype, res.data, success, error);
    },
    fail(err) {
      fetchError(mtype, err, error);
    }
  });
};

//DELETE提交
exports.delete = function (url, params, success, error) {
  restful('POST', 'DELETE', url, params, success, error);
}

var getf = function (url, params, success, error) {
  restful('GET', null, url, params, success, error);
}
//GET获取数据
exports.get = getf;

//PATCH提交
exports.patch = function (url, params, success, error) {
  restful('POST', 'PATCH', url, params, success, error);
}

//POST提交
exports.post = function (url, params, success, error) {
  restful('POST', 'POST', url, params, success, error);
}

//PUT提交
exports.put = function (url, params, success, error) {
  restful('POST', 'PUT', url, params, success, error);
}

//上传
exports.upload = function (url, fileUrl, params, success, error) {
  wx.uploadFile({
    url: url, //仅为示例，非真实的接口地址
    filePath: fileUrl,
    name: 'file',
    formData: params,
    header: {
      "content-type": "multipart/form-data"
    },
    success(res) {
      var data = res.data;
      try {
        data = JSON.parse(data);
      } catch (e) {

      }
      var ext = '.file';
      var extIndex = fileUrl.lastIndexOf(".");
      if (extIndex > 0) {
        ext = fileUrl.substr(extIndex);
      }
      ext = ext.toLowerCase();
      if (ext == '.jpg' || ext == '.png' || ext == '.jpeg' || ext == '.gif') {
        const app = getApp();
        getf(
          app.globalData.host + 'aliyun/scanImageFlag', {
            imageUrl: data.data.oss,
            lv: 2
          },
          (cstatus, cresultCode, cmessage, cdata) => {
            if (cdata) {
              fetchOk('post', data, success, error);
            } else {
              fetchError('post', {
                status: 500,
                responseText: '{"status":500,"resultCode":"image.forbidden","message":"图片违规"}'
              }, error);
            }
          },
          (cstatus, cresultCode, cmessage, cdata) => {
            fetchOk('post', data, success, error);
          }
        );
      } else {
        fetchOk('post', data, success, error);
      }
    },
    fail(err) {
      fetchError('post', err, error);
    }
  });
}