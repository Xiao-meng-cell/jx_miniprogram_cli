var CryptoJS = require('./crypto-js/crypto-js.js');

//摘要
exports.digest = function(key, data){
	var content = '';
	if(typeof data == 'string'){
		content = data;
	} else if(typeof data == 'object'){
		let arr = [];
		Object.keys(data).forEach(k => {
			var value = data[k];
			if(value != null) {
                if (value instanceof Array) {
                    for (var i = 0; i < value.length; i++) {
                      if (value[i]) {
                        arr.push(k + "=" + value[i]);
                      }
                    }
                } else {
                  arr.push(k + "=" + value);
                }
            }
		});
		arr.sort();
		for(var i = 0; i < arr.length ; i ++) {
      var aa = arr[i];
      var ai = aa.indexOf("=");
			content = content + aa.substr(0,ai) + aa.substr(ai + 1);
		}
	}
	return CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(content, key));
}

// AES 加密
exports.aesEncrypt = function (key, data) {
    var k = CryptoJS.enc.Utf8.parse(key);//16位
    var iv = CryptoJS.enc.Utf8.parse(key);
    var encrypted = '';
    var srcs = CryptoJS.enc.Utf8.parse(data);
        encrypted = CryptoJS.AES.encrypt(srcs, k, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

// AES 解密
exports.aesDecrypt = function (key, data) {
    var k = CryptoJS.enc.Utf8.parse(key); 
    var iv = CryptoJS.enc.Utf8.parse(key);
    var encryptedHexStr = CryptoJS.enc.Base64.parse(data);
    var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = CryptoJS.AES.decrypt(srcs, k, {
        iv: iv,
        mode: CryptoJS.mode.CBC
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}