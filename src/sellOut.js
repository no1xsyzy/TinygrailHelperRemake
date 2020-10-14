import $ from 'jquery'
import { getData, postData } from './api.js'
import { getCharaInitPrice } from './storage/charaInitPrice'

let charaInitPrice

export function sellOut () {
  charaInitPrice = getCharaInitPrice()
  $('#eden_tpc_list .item_list').removeAttr('onclick')
  $('#eden_tpc_list .item_list').each((i, e) => {
    const id = $(e).data('id')
    const sellBtn = `<span><small data-id="${id}" class="sell_btn">[卖出]</small></span>`
    if (!$(e).find('.sell_btn').length) {
      $(`#eden_tpc_list li[data-id=${id}] .row`).append(sellBtn)
    }
  })
  $('.sell_btn').on('click', (e) => {
    const id = $(e.target).data('id')
    if (id) {
      const priceTag = $(`#eden_tpc_list li[data-id=${id}]`).find('div.tag')[0].innerText.match(/₵([0-9]*(\.[0-9]{1,2})?)/)
      const priceNow = priceTag ? priceTag[1] : 0 // 获取抽奖时买价
      getData(`chara/${id}`).then((d) => {
        const initPrice = charaInitPrice[id] ? charaInitPrice[id].init_price : d.Value.Price
        const price = Math.max(parseFloat(priceNow), parseFloat(initPrice).toFixed(2), d.Value.Current.toFixed(2))
        getData(`chara/user/${id}`).then((d) => {
          const amount = d.Value.Amount
          if (amount) {
            postData(`chara/ask/${id}/${price}/${amount}`, null).then((d) => {
              if (d.Message) { console.log(`#${id}: ${d.Message}`) } else { console.log(`卖出委托#${id} ${price}*${amount}`) }
            })
          }
        })
      })
    }
    $(`#eden_tpc_list li[data-id=${id}]`).remove()
  })
}
