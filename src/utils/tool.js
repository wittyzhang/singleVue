function _getDatedata(diff, noDay) {
  var dateData = {
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
    millisec: 0
  };
  if (diff <= 0) {
    return dateData;
  }
  if (!noDay) {
    if (diff >= (365.25 * 86400)) {
      dateData.years = Math.floor(diff / (365.25 * 86400));
      diff -= dateData.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      dateData.days = Math.floor(diff / 86400);
      diff -= dateData.days * 86400;
    }
  }
  if (diff >= 3600) {
    dateData.hours = Math.floor(diff / 3600);
    diff -= dateData.hours * 3600;
  }
  if (diff >= 60) {
    dateData.min = Math.floor(diff / 60);
    diff -= dateData.min * 60;
  }
  dateData.sec = Math.round(diff);
  dateData.millisec = diff % 1 * 1000;
  return dateData;
};

function _renderTimer(diff, noDay, dom, noSeconds, onlySeconds, callback) {
  var data = _getDatedata(diff, noDay);
  var day = data.days ? data.days + '天' : '';
  var dom = dom || '__timer__';
  var str = "";
  if (noSeconds) {
    str = '<span class="day">' + day + '</span>' + '<span>' + _zero(data.hours) + '</span>' + '<small>:</small>' + '<span>' + _zero(data.min) + '</span>';
  } else if (onlySeconds) {
    str = '<span>' + _zero(data.sec) + '</span>';
  } else {
    str = '<span class="day">' + day + '</span>' + '<span>' + _zero(data.hours) + '</span>' + '<small>:</small>' + '<span>' + _zero(data.min) + '</span>' + '<small>:</small>' + '<span>' + _zero(data.sec) + '</span>';
  }
  if (document.querySelector('#' + dom)) {
    document.querySelector('#' + dom).innerHTML = str;
  } else if (document.querySelectorAll('.' + dom) && document.querySelectorAll('.' + dom).length) {
    let dom_len = document.querySelectorAll('.' + dom);
    dom_len.forEach(element => {
      element.innerHTML = str;
    });
  } else {
    callback && callback({
      day: data.days || 0,
      hours: _zero(data.hours) || 0,
      min: _zero(data.min) || 0,
      sec: _zero(data.sec) || 0,
    });
  }
};

function _zero(num) {
  if (num < 10) {
    return '0' + num;
  };
  return num;
};
export const countDownSeconds = function (obj) {
  var timer = null,
    totalDiff = obj.totalDiff,
    noDay = obj.noDay || false,
    noSeconds = obj.seconds || false,
    onlySeconds = obj.onlySeconds || false,
    complete = obj.complete || function () { };

  function clock() {
    totalDiff--;
    _renderTimer(totalDiff, noDay, obj.dom, noSeconds, onlySeconds, complete);
    if (totalDiff == 0) {
      obj.callback && obj.callback();
    }
    if (totalDiff <= 0) {
      clearInterval(timer);
    };
  }
  clock();
  timer = setInterval(clock, 1000);
  return timer;
};

export function countDownMinutes(obj) { // 不现实秒钟的倒计时
  var timer = null,
    totalDiff = obj.totalDiff,
    noDay = obj.noDay || false;

  function clock() {
    totalDiff--;
    _renderTimer(totalDiff, noDay, obj.dom, true, false);
    if (totalDiff == 0) {
      obj.callback && obj.callback();
    }
    if (totalDiff <= 0) {
      clearInterval(timer);
    }
  }
  clock();
  timer = setInterval(clock, 1000);
  return timer;
};

export const isWeixin = function () { // 是否是微信浏览器
  const u = navigator.userAgent.toLowerCase()
  const isWeixin = u.indexOf('micromessenger') > -1 || u.indexOf('wechat') > -1
  return isWeixin
}

export const async_isMiniProgram = function () { // 是否是小程序环境
  return new Promise((resolve, reject) => {
    function ready() {
      if (window.__wxjs_environment === 'miniprogram') {
        resolve(true);
      } else {
        // wx.miniProgram.getEnv(function(res) {
        //   resolve(res.miniprogram);
        // });
        resolve(false);
      }
    }
    if (window.WeixinJSBridge && WeixinJSBridge.invoke) {
      document.addEventListener('WeixinJSBridgeReady', ready, false)
    } else {
      ready()
    }
  });
}
// 判断各个小程序环境
/*
* 微信小程序 return wx
* 抖音小程序 return tt
* other程序 return normal
*
* 抖音sdk: <script src="https://s3.pstatp.com/toutiao/tmajssdk/jssdk-1.0.1.js"></script>
* wx sdk: <script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
*/
export const sync_isMicroApp = function () {
  return new Promise((resolve, reject) => {
    const UA = navigator.userAgent.toLowerCase();
    if (UA.includes("micromessenger")) {
      // 微信小程序
      function _ready() {
        if (window.__wxjs_environment === 'miniprogram' || UA.includes("miniprogram")) {
          resolve('wx');
        } else if(wx && wx.miniProgram && wx.miniProgram.getEnv) {
          wx.miniProgram.getEnv(function(res) {
            if (res.miniprogram) {
              resolve('wx');
            } else {
              resolve('normal');
            }
          });
        } else {
          resolve('normal');
        }
      }
      if (window.WeixinJSBridge && WeixinJSBridge.invoke) {
        document.addEventListener('WeixinJSBridgeReady', function(){
          _ready();
        }, false);
      } else {
        _ready();
      }
    } else if (UA.includes("toutiaomicroapp")) {
      // 抖音小程序
      resolve('tt');
    } else {
      resolve('normal');
    }
  });
};

export const isApp = function () {
  var href = window.location.href;
  var re = href.indexOf('_app');
  if (navigator.userAgent.indexOf('miyabaobei_') > -1 || re !== -1) {
    return true;
  }
  return false;
};

// export const fomatFloat = function (src) {
//   if (!arguments.length) return -1;
//   var result = parseFloat(src);
//   if (isNaN(result)) {
//     return false;
//   }
//   result = Math.round(src * 100) / 100;
//   return result;
// };

export const parseTime = function (time, cFormat) {
  if (!time) return '';

  var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  var date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  // 大写代表00，小写代表0
  var formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    H: date.getHours(),
    I: date.getMinutes(),
    S: date.getSeconds(),
    a: date.getDay(),
  };

  var timeStr = format.replace(/{(y|m|d|M|D|h|i|s|H|I|S|a)+}/g, function (result, key, c, d) {
    var value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      switch (key) {
        case 'M':
        case 'D':
        case 'H':
        case 'I':
        case 'S':
          value = '0' + value;
          break;
      }
    }
    return value || 0;
  });
  return timeStr;
};

export function getQueryString(name) { // 获取url 对象
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

export function fomatFloat(src, pos) { // 格式化价格
  if (!arguments.length) return -1;
  if (!isNaN(src)) {
    pos = (src > 0 && src < 1) ? 2 : pos || 1;
    // return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos); // 四舍五入
    return Math.floor(src * Math.pow(10, pos)) / Math.pow(10, pos); // 直接截取
  }
  return src
}

export function setCookie(key, value, expire) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

export function getcookie(name) {
  const arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
  if (arr != null) {
    return unescape(arr[2]);
  }
  return '';
}
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getcookie(name);
  if(cval!=null)
  document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
export function removeCookie(name) {
  setCookie(name, '', -1, '');
}

export function jumpApp(url){
  var url_s =  url;  //苹果打开app的链接(由苹果开发提供)
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  console.log("222")
  window.location.href = url_s;
}
// 常用表单校验规则
export function  valiTelephone(rule, value, callback){
  const preg = /^((13[0-9])|(15[0-9])|(14[57])|(16[0-9]{1})|(19[0-9]{1})|(17[0-9])|(18[0-9]))\d{8}$/;
  if (!preg.test(value)) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
}
export function validateIdNo(rule, value,callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if ((!reg.test(value)) && value != '') {
    callback(new Error(rule.message));
  } else {
    callback();
  }
}
export function validateContacts(rule, value, callback) {
  if (!/^[\u4e00-\u9fa5]{1,20}$/.test(value)) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}
export function validateCode(rule, value, callback) {
  const preg = /^[0-9a-zA-Z]{1,20}$/;
  if (!preg.test(value)) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}
export function validateName(rule, value, callback) {
  if (!/^[\u4e00-\u9fa5]{2,4}$/.test(value)) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}
export function validateTax(rule, value, callback) {
  const preg = /^[a-zA-Z0-9]{15}$/;
  if (!preg.test(value)) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}
export function validateContactsName(rule, value, callback) {
  const preg = /^[\u4e00-\u9fa5A-Za-z]+$/;
  if (!preg.test(value)) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}