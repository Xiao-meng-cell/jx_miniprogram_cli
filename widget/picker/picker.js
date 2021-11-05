const leftPad0 = function(v, n) {
  if (!v) {
    v = "";
  }
  let prefix = "";
  for (let i = 0; i < n; i++) {
    prefix += "0";
  }
  return (prefix + v).substr(-n);
};
const stringToDate = function(str) {
  if(str != ''){
    str = str.replace(/\-/g, "/") //ios设备不支持new Date(time)的这个time格式为yyyy-mm-dd,必须要转换成"/"
    // console.log(1111111)
    // console.log(str);
    return new Date(str);
  }
};
const isLeapYear = function(year) {
  if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
    return true;
  }
  return false;
};
const now = new Date();
const years = [];
const beginYear = now.getFullYear();
let nowYear = String(beginYear);
let beginMonth = now.getMonth();
let beginDate = now.getDate(); //获取当前日(1-31)
if(beginMonth < 10){
  beginMonth = '0' + String(beginMonth);
}else{
  beginMonth =  String(beginMonth);
}
if(beginDate < 10){
  beginDate = '0' + String(beginDate);
}else{
  beginDate =  String(beginDate);
}
const valueStart = [nowYear, beginMonth, beginDate, "10", "00"];
// console.log(valueStart);

for (var i = beginYear; i <= now.getFullYear() + 10; i++) {
  years.push(i + "年");
}
const months = [];
for (var i = 0; i < 12; i++) {
  months.push(leftPad0(i + 1, 2) + "月");
}
const days = [];
for (var i = 0; i < 31; i++) {
  days.push(leftPad0(i + 1, 2) + "日");
}
const hours = [];
for (var i = 0; i < 24; i++) {
  hours.push(leftPad0(i, 2) + "时");
}
const minutes = [];
for (var i = 0; i < 60; i++) {
  minutes.push(leftPad0(i, 2) + "分");
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
    dateValue: {
      type: Date
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    valueArray: valueStart,
    rangeValues: [
      years,
      months,
      days,
      hours,
      minutes
    ],
    pickerYear: beginYear,
    pickerMonth: 1
  },
  observers: {
    value: function(v) {
      if(v != ''){
        this.setData({
          valueArray: this._dateToValueArray(stringToDate(v))
        })
      }
    },
    dateValue: function(date) {
      this.setData({
        valueArray: this._dateToValueArray(date)
      })
    },
    valueArray: function(v) {
      this._settMonthDays(v[0] + beginYear, v[1] + 1);
    }
  },
/**
   * 组件的方法列表
   */
  methods: {
    _dateToValueArray(date) {
      return [date.getFullYear() - beginYear, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()];
    },
    _settMonthDays(year, month) {
      let monthDays = 31;
      switch (month) {
        case 2:
          monthDays = 28;
          if (isLeapYear(year)) {
            monthDays = 29;
          }
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          monthDays = 30;
          break;
      }
      let days = [];
      for (let i = 0; i < monthDays; i++) {
        days.push(leftPad0(i + 1, 2) + "日");
      }
      this.setData({
        pickerYear: year,
        pickerMonth: month,
        "rangeValues[2]": days
      });
    },
    handleCancel(e) {
      this.setData({
        valueArray: this.data.valueArray
      })
    },
    handleColumnChange(e) {
      if (e.detail.column > 1) return false;
      let year = this.data.pickerYear;
      let month = this.data.pickerMonth;
      if (e.detail.column == 0) {
        year = e.detail.value + beginYear;
      } else if (e.detail.column == 1) {
        month = e.detail.value + 1;
      }
      this._settMonthDays(year, month);
    },
    handleValueChange(e) {
      // console.log(99999999);
      // console.log(e.detail.value);
      let dateArr = [];
      for (let i in e.detail.value) {
        let v = this.data.rangeValues[i][e.detail.value[i]];
        dateArr.push(v.toString().substr(0, v.length - 1))
      }
      // console.log(dateArr);
      let dateString = dateArr[0] + "/" + dateArr[1] + "/" + dateArr[2] + " " + dateArr[3] + ":" + dateArr[4] + ":00";
      // console.log(dateString);
      this.triggerEvent('change', {
        date: stringToDate(dateString),
        dateString
      })
    }
  }
})