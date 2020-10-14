import $ from 'jquery'
import { getData } from './api.js'
import { getCharaInitPrice, setCharaInitPrice } from './storage/charaInitPrice'
import { sellAll } from './sellAll'

export function showInitialPrice (charaId) {
  const charaInitPrice = getCharaInitPrice()
  if (charaInitPrice[charaId]) {
    const initPrice = charaInitPrice[charaId].init_price
    const time = charaInitPrice[charaId].time
    $($('#grailBox .info .text')[1]).append(`<span title="上市时间:${time}">发行价：${initPrice}</span>`)
    sellAll(charaId, initPrice)
  } else {
    getData(`chara/charts/${charaId}/2019-08-08`).then((d) => {
      const initPrice = d.Value[0].Begin.toFixed(2)
      const time = d.Value[0].Time.replace('T', ' ')
      getCharaInitPrice()
      charaInitPrice[charaId] = {
        init_price: initPrice,
        time: time
      }
      setCharaInitPrice(charaInitPrice)
      $($('#grailBox .info .text')[1]).append(`<span title="上市时间:${time}">发行价：${initPrice}</span>`)
      sellAll(charaId, initPrice)
    })
  }
}
