/**
 * 根据样式获取名片图片
 * @param {*} clerk  名片详情信息
 */
function getIconByStyle(clerk) {
  let styleId = clerk.styleId;
  let iconUrls = {}
  //交换名片
  let jhmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/icon_exchange_blue%403x.png"
  //编辑名片
  let bjmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/iconEdit%402x.png"
  //联系电话
  let lxdh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/icon_Telephone_blue%403x.png"
  //分享名片
  let fxmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/icon_share_blue%403x.png"
  //旗下精英
  let qxjy = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/icon_flag_blue%403x.png"
  //直播
  let live = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/icon_live_online_blue%403x.png"
  //已服务客户
  let yfwkh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/icon_manege_blue%403x.png"
  //总销售额
  let xse = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/xse.png"
  //总销售单量
  let xsdl = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/xsdl.png"
  //收藏
  let favBg = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/background_collect_blue%403x.png"
  let fav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/icon_collect_white2%403x.png"
  let unFav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/icon_collect_white1%403x.png"
  //邀请合伙人
  let invitePersonnel = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/blue/float_invitation_blue%403x.png"

  if (styleId && styleId != "") {
    switch (styleId) {
      case "card_black":
        jhmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/icon_exchange_black%403x.png"
        lxdh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/icon_Telephone_black%403x.png"
        fxmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/icon_share_black%403x.png"
        qxjy = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/icon_flag_black%403x.png"
        live = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/live.gif"
        yfwkh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/icon_manege_black%403x.png"
        xse = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/xse.png"
        xsdl = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/xsdl.png"
        favBg = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/background_collect_black%403x.png"
        unFav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/icon_collect_yellow1%403x.png"
        fav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/icon_collect_yellow2%403x.png"
        invitePersonnel = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/black/float_invitation_black%403x.png"
        break;
      case "card_yellow":
        jhmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/yellow/icon_exchange_yellow%403x.png"
        lxdh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/yellow/icon_Telephone_yellow%403x.png"
        fxmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/yellow/icon_share_yellow%403x.png"
        qxjy = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/yellow/icon_flag_yellow%403x.png"
        live = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/yellow/live.gif"
        yfwkh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/yellow/icon_manege_gold%403x.png"
        xse = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/yellow/xse.png"
        xsdl = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/yellow/xsdl.png"
        favBg = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/yellow/background_collect_yellow%403x.png"
        invitePersonnel = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/yellow/float_invitation_yellow%403x.png"
        break;
      case "card_violet":
        jhmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/icon_exchange_violet%403x.png"
        lxdh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/icon_Telephone_violet%403x.png"
        fxmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/icon_share_violet%403x.png"
        qxjy = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/icon_flag_violet%403x.png"
        live = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/live.gif"
        yfwkh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/icon_manege_purple%403x.png"
        xse = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/xse.png"
        xsdl = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/xsdl.png"
        favBg = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/background_collect_violet%403x.png"
        unFav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/icon_collect_golden%403x.png"
        fav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/icon_collect_golden2%403x.png"
        invitePersonnel = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/violet/float_invitation_violet%403x.png"
        break;
      case "card_control":
        jhmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/icon_exchange_black%403x.png"
        lxdh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/icon_Telephone_blue%403x.png"
        fxmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/icon_share_blue%403x.png"
        live = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/live.gif"
        qxjy = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/icon_qixiajingying_blue%403x.png"
        yfwkh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/icon_manege_blue%403x.png"
        xse = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/xse.png"
        xsdl = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/xsdl.png"
        favBg = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/collect-bg%403x.png"
        fav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/fav.png"
        unFav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/unFav.png"
        invitePersonnel = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/float_invitation_black%403x.png"
        break;
      case "card_51":
        jhmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/51/icon_exchange_black%403x.png"
        lxdh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/51/icon_Telephone_blue%403x.png"
        fxmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/51/icon_share_blue%403x.png"
        live = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/51/live.gif"
        qxjy = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/51/icon_qixiajingying_blue%403x.png"
        yfwkh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/51/icon_manege_blue%403x.png"
        xse = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/51/xse.png"
        xsdl = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/51/xsdl.png"
        favBg = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/51/collect-bg%403x.png"
        fav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/fav.png"
        unFav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/unFav.png"
        invitePersonnel = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/51/float_invitation_black%403x.png"
        break;
      case "card_52":
        jhmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/52/icon_exchange_black%403x.png"
        lxdh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/52/icon_Telephone_blue%403x.png"
        fxmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/52/icon_share_blue%403x.png"
        live = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/52/live.gif"
        qxjy = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/52/icon_qixiajingying_blue%403x.png"
        yfwkh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/52/icon_manege_blue%403x.png"
        xse = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/52/xse.png"
        xsdl = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/52/xsdl.png"
        favBg = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/52/collect-bg%403x.png"
        fav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/fav.png"
        unFav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/control/unFav.png"
        invitePersonnel = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/52/float_invitation_black.png"
        break;
      case "card_365":
        jhmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/icon_exchange_blue@2x.png"
        bjmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/iconEdit%402x.png"
        lxdh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/call_phone_blue@2x.png"
        fxmp = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/iconShare@2x.png"
        live = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/icon_Signin@2x.png"
        qxjy = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/icon_qixiajingying_blue%403x.png"
        yfwkh = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/icon_manege_blue%403x.png"
        xse = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/xse.png"
        xsdl = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/xsdl.png"
        favBg = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/favBg.png"
        unFav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/unFav.png"
        fav = "https://weclubbing.oss-cn-shenzhen.aliyuncs.com/static/miniProgramBusiness/assets/clerkDetail/style/365/fav.png"
        break;
      default:
        break;
    }
  }
  iconUrls.jhmp = jhmp
  iconUrls.bjmp = bjmp
  iconUrls.lxdh = lxdh
  iconUrls.fxmp = fxmp
  iconUrls.qxjy = qxjy
  iconUrls.live = live
  iconUrls.yfwkh = yfwkh
  iconUrls.xsdl = xsdl
  iconUrls.xse = xse
  iconUrls.favBg = favBg
  iconUrls.fav = fav
  iconUrls.unFav = unFav
  iconUrls.invitePersonnel = invitePersonnel

  return iconUrls
}

module.exports = {
  getIconByStyle: getIconByStyle
}