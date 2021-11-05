/** 手机号码校验 */
function phone(text) {
  let regExp = /^1[3-9]\d{9}$/;
  return regExp.test(text)
}

module.exports = {
  phone: phone,
}