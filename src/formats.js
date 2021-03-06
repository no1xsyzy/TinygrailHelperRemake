export function formatDate (date) {
  date = new Date(date)
  return date.format('yyyy-MM-dd hh:mm:ss')
}
export function formatTime (timeStr) {
  const now = new Date()
  const time = new Date(timeStr) - (new Date().getTimezoneOffset() + 8 * 60) * 60 * 1000

  let times = (time - now) / 1000
  let day = 0
  let hour = 0
  let minute = 0
  let second = 0
  if (times > 0) {
    day = Math.floor(times / (60 * 60 * 24))
    hour = Math.floor(times / (60 * 60)) - Math.floor(times / (60 * 60 * 24)) * 24
    minute = Math.floor(times / 60) - Math.floor(times / (60 * 60)) * 60

    if (day > 0) { return `剩余${day}天${hour}小时` } else if (hour > 0) { return `剩余${hour}小时${minute}分钟` } else { return `即将结束 剩余${minute}分钟` }
    // return '即将结束';
  } else {
    times = Math.abs(times)
    day = Math.floor(times / (60 * 60 * 24))
    hour = Math.floor(times / (60 * 60))
    minute = Math.floor(times / 60)
    second = Math.floor(times)

    if (minute < 1) {
      return `${second}s ago`
    } else if (minute < 60) {
      return `${minute}m ago`
    } else if (hour < 24) {
      return `${hour}h ago`
    }

    if (day > 1000) { return 'never' }

    return `[${new Date(timeStr).format('yyyy-MM-dd')}] ${day}d ago`
  }
}
export function formatNumber (number, decimals, decPoint, thousandsSep) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
  const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  const dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  let s = ''
  // toFixedFix = function (n, prec) {
  //   let k = Math.pow(10, prec);
  //   return '' + Math.ceil(n * k) / k;
  // };
  // s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  s = (prec ? n.toFixed(prec) : '' + Math.round(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

export function formatBidPrice (price) {
  return (price - Math.round(price)) >= 0 ? Math.round(price) : Math.round(price) - 0.5
}
export function formatAskPrice (price) {
  if (Number.isInteger(parseFloat(price))) { return price } else { return (price - Math.floor(price)) > 0.5 ? Math.ceil(price) : Math.floor(price) + 0.5 }
}
