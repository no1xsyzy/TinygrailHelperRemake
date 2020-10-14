import $ from 'jquery'
export function showPrice (chara) {
  const price = chara.Price.toFixed(2)
  $($('#grailBox .info .text')[1]).append(`<span>评估价：${price}</span>`)
}
