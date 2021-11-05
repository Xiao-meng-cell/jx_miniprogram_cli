/**
 * 根据ID获取会员卡样式
 * @param {*} info  会员卡信息
 */
function getStyleById(info) {
  let styleId = info.remarks
  let cardStyle = {}

  let fontColor = "#FFFFFF" //字体颜色
  let expBackgroundColor = "rgba(255,255,255,0.3)" //经验条底色
  let expActiveColor = "rgba(255,255,255,0.4)" //经验条颜色
  let expColor = "rgba(255,255,255,0.6)" //经验点颜色
  let flagVipPre = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/member/vipLevel/" //等级标识前缀
  if (styleId && styleId != "") {
    switch (styleId) {
      case "blackGold":
        fontColor = "#EDDBB9"
        expBackgroundColor = "rgba(237,219,185,0.3)"
        expActiveColor = "rgba(237,219,185,0.4)"
        expColor = "rgba(237,219,185,0.6)"
        break;
      case "golden":
        fontColor = "#333333"
        expBackgroundColor = "rgba(51,51,51,0.3)"
        expActiveColor = "rgba(51,51,51,0.4)"
        expColor = "rgba(51,51,51,0.6)"
        break;
      case "black":
      case "lavender":
      case "blue":
      case "customize":
        break;
    }
  }
  cardStyle.fontColor = fontColor
  cardStyle.expBackgroundColor = expBackgroundColor
  cardStyle.expActiveColor = expActiveColor
  cardStyle.expColor = expColor
  cardStyle.flagVipPre = flagVipPre

  return cardStyle
}

module.exports = {
  getStyleById: getStyleById
}