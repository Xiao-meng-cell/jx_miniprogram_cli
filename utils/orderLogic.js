var util = require('./util.js');

/**
 * 获取订单描述文字
 * @param {*} params 订单详情
 * @returns {orderStatusStr:主标题；orderSubStatusStr:副标题}
 */
function getOrderStatusStr(params) {
  var orderStatusStr = ""; //主标题
  var orderSubStatusStr = ""; //副标题

  //订单不存在
  if (!params || params == "") {
    return ({
      orderStatusStr: orderStatusStr,
      orderSubStatusStr: orderSubStatusStr,
    });
  }

  let data = params.data //订单详情 
  const goodItemOrder = data.items[0] //订单商品
  var afterSale = data.items[0].afterSale //商品售后信息
  let status = data.status //订单状态
  //比如说售后状态中，要显示售后前的文案，只能假设状态是2
  if (params.status !== undefined && params.status !== null) {
    status = params.status;
  }
  if (status == 0) { //超时无效，未付款已取消订单
    orderStatusStr = "订单已取消";
    orderSubStatusStr = "超出付款时间/已取消待付款订单";
  } else if (status == 1) { //待支付，尚未付款订单
    orderStatusStr = "待支付";
    var endPayTimeStr = util.getEndTimeSrt(data.endPayTime).strEndTime;
    var nowTime = new Date().getTime();
    if (nowTime > data.endPayTime) {
      orderSubStatusStr = "您还未支付，此订单已超过支付截止时间";
    } else {
      orderSubStatusStr = "您还未支付，此订单将在" + endPayTimeStr + "后自动取消";
    }
  } else if (status == 2) { //已付款订单
    var noAfterSale = false
    //比如说售后状态中，要显示售后前的文案，只能无视售后状态
    if (params.status !== undefined && params.status !== null) {
      noAfterSale = true
    }
    let dataInfo = getPayStatusStrData(data, noAfterSale);
    orderStatusStr = dataInfo.statusStr
    orderSubStatusStr = dataInfo.subStatusStr

  } else if (status == 3) { //已完成订单
    orderStatusStr = "订单已完成";
    if ((goodItemOrder.typeCode == "service" || goodItemOrder.typeCode == "logistics") && data.addressType == 'merchant') {
      orderSubStatusStr = "已核销券码"
    } else if (goodItemOrder.typeCode == "logistics" && data.addressType == 'user') {
      orderSubStatusStr = "已确认收货"
    } else if (goodItemOrder.typeCode == "deposit") {
      orderSubStatusStr = "已到截止日期"
    } else if (goodItemOrder.typeCode == "virtual") {
      orderSubStatusStr = ""
    }
  } else if (status == 4) { //已取消、售后已完成订单
    //售后完成的订单
    orderStatusStr = "订单已取消";
    //目前只已知售后完成才会取消
    if (afterSale && afterSale.status == 5) {
      orderSubStatusStr = "售后已完成";
    }
  } else if (status == 5) { //售后中订单
    var orderStatusStrData = getAfterSaleStatusStr(data);
    orderStatusStr = orderStatusStrData.orderStatusStr;
    orderSubStatusStr = orderStatusStrData.orderSubStatusStr;
  }

  return ({
    orderStatusStr: orderStatusStr,
    orderSubStatusStr: orderSubStatusStr
  });
}

/**
 * 获取已付款订单状态描述
 * @param {*} data 订单详情
 * @param {*} noAfterSale 是否包含售后信息
 */
function getPayStatusStrData(data, noAfterSale) {
  var orderStatusStr = "";
  var orderSubStatusStr = "";

  var IsAgent = IsHaveAgentStore(data);

  // 检测物流信息 是否已发货
  let isExpress = false;
  if (data && data.trackingNumberExist) {
    isExpress = true;
  }

  // 售后被拒绝
  if (data.items[0].afterSale && data.items[0].afterSale.status == 3 && !noAfterSale) {
    orderStatusStr = "商家不同意退货";
    orderSubStatusStr = "如不满意处理结果，可联系平台解决";
  }
  // 售后已取消
  else if (util.getTypeCodeType(data.items[0].typeCode) == 'EntityProduct') { // 实体
    if (data.addressType == 'merchant') { // 到店
      orderStatusStr = "待核销";
      if (IsAgent) { // 代理
        var needExpress = false;
        // 到店-到店显示 不用发货
        if (data.items[0].typeCode == 'service') {
          needExpress = false;
        }
        // 到店-物流 要发货
        else if (data.items[0].typeCode == 'logistics') {
          needExpress = true;
        }
        let dataInfo = getServiceAgentStr(data, needExpress);
        orderStatusStr = dataInfo.statusStr;
        orderSubStatusStr = dataInfo.subStatusStr;
      } else { // 自卖
        orderSubStatusStr = "您还未到店进行核销，请尽快到店进行核销！";
      }
    } else if (data.addressType == 'user') { //物流
      if (isExpress) {
        orderStatusStr = "卖家已发货";
        orderSubStatusStr = "卖家已发货，请确定收货！";
      } else {
        orderStatusStr = "已付款成功";
        orderSubStatusStr = "您已付款成功，商家正在抓紧备货发货中！";
      }
    }
  } else if (util.getTypeCodeType(data.items[0].typeCode) == 'VirtualProduct') { //虚拟
    if (data.items[0].typeCode == 'deposit') {
      var endTimeData = util.getEndTimeSrt(data.dueTime);
      var nowTime = new Date().getTime();
      orderStatusStr = "已付款成功";
      if (nowTime < data.endTime) {
        orderSubStatusStr = "此活动已结束！";
      } else {
        orderSubStatusStr = "此活动将在" + endTimeData.strEndTime + "后自动结束！";
      }
    } else if (data.items[0].typeCode == 'virtual') {
      orderStatusStr = "已付款成功";
      orderSubStatusStr = "您已付款成功，商家正在备货发货中！";
    } else if (data.items[0].typeCode === 'estate') {
      orderStatusStr = '待核销'
      orderSubStatusStr = '24小时自动核销'
    }
  }

  return {
    statusStr: orderStatusStr,
    subStatusStr: orderSubStatusStr
  };
}

/** 检查是否为代理 */
function IsHaveAgentStore(data) {
  if (data && data.onshelfStoreCode) {
    if (data.onshelfStoreCode !== data.storeCode) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

/**
 * 获取代理到店商品订单状态描述
 * @param {*} data 订单详情
 * @param {*} needExpress 是否需要配送
 */
function getServiceAgentStr(data, needExpress) {
  var orderStatusStr = "";
  var orderSubStatusStr = "";

  //检测物流信息 是否已发货
  let isExpress = data.trackingNumberExist

  if (needExpress) {
    //是否发货
    if (isExpress) {
      //是否签收 1：已签收 0：未签收
      var isSigned = data && data.isSigned ? data.isSigned : 0;
      if (isSigned) {
        orderStatusStr = "待核销";
        orderSubStatusStr = "您还未到店进行核销，请尽快到店进行核销！";
      } else {
        orderStatusStr = "备货中";
        orderSubStatusStr = "您已成功支付，卖家正在备货中";
      }
    } else {
      orderStatusStr = "备货中";
      orderSubStatusStr = "您已成功支付，卖家正在备货中！";
    }
  } else {
    orderStatusStr = "待核销";
    orderSubStatusStr = "您还未到店进行核销，请尽快到店进行核销！";
  }
  return {
    statusStr: orderStatusStr,
    subStatusStr: orderSubStatusStr
  };
}

/**
 * 获取售后订单状态描述
 * @param {*} data 订单详情
 */
function getAfterSaleStatusStr(data) {
  var afterSale = data.items[0].afterSale;
  var orderStatusStr = "售后中";
  var orderSubStatusStr = "";
  var afterSaleTypeStr = "";

  if (afterSale) {
    if (afterSale.typeCode == 'return_order') {
      afterSaleTypeStr = "退款";
    } else if (afterSale.typeCode == 'refund_order') {
      afterSaleTypeStr = "仅退款";
    }
    if (afterSale.status == 1) {
      orderStatusStr = "售后申请中";
      orderSubStatusStr = '等待商家处理';
    } else if (afterSale.status == 2) {
      orderStatusStr = afterSaleTypeStr + "申请已通过";
      orderSubStatusStr = '卖家受理通过';
    } else if (afterSale.status == 3) {
      //已拒绝不进这里，此时订单状态变为2
      orderStatusStr = '已拒绝' + afterSaleTypeStr;
      orderSubStatusStr = '卖家受理拒绝';
    } else if (afterSale.status == 4) {
      orderSubStatusStr = '退换中';
    } else if (afterSale.status == 5) {
      //已完成不进这里，此时订单状态变为4
      orderSubStatusStr = '售后已完成';
    } else if (afterSale.status == 6) {
      //已取消不进这里，此时订单状态变为2
      orderSubStatusStr = '售后已取消';
    }
  }

  return {
    orderStatusStr: orderStatusStr,
    orderSubStatusStr: orderSubStatusStr
  };
}

/** 获取售后状态 */
function getAfterSaleType(data, orderData) {
  let afterSaleType = ''
  const isAgentStoreData = orderData || data // 害怕别的地方调用的时候orderData没传进来
  // 是否发货
  let express = data.trackingNumberExist || orderData.trackingNumberExist
  if (data && util.getTypeCodeType(data.productTypeCode) == 'VirtualProduct') {
    afterSaleType = 'refund_order';
  } else if (data && util.getTypeCodeType(data.productTypeCode) == 'EntityProduct') {
    // 自卖
    if (!IsHaveAgentStore(isAgentStoreData)) {
      if (isAgentStoreData.addressType == "merchant") {
        // 到店(仅退款)
        afterSaleType = 'refund_order';
      } else if (isAgentStoreData.addressType == "user") {
        // 物流
        afterSaleType = express ? 'return_order' : 'refund_order';
      }
    } else {
      if (data.productTypeCode == "service") {
        afterSaleType = 'refund_order';
      } else if (data.productTypeCode == "logistics" && isAgentStoreData.addressType == "user") {
        afterSaleType = express ? 'return_order' : 'refund_order';
      } else if (data.productTypeCode == "logistics" && isAgentStoreData.addressType == "merchant") {
        afterSaleType = 'refund_order';
      }
    }
    return afterSaleType;
  }
}

module.exports = {
  getOrderStatusStr: getOrderStatusStr,
  getAfterSaleType: getAfterSaleType,
}