import $ from 'jquery'
import { getData } from './api.js'

export function sellAll (charaId, initPrice) {
  $($('#grailBox .info .text')[1]).append('<button id="sell_out" class="text_button" title="以发行价全部卖出">[全部卖出]</button>')
  $('#sell_out').on('click', function () {
    getData(`chara/user/${charaId}`).then((d) => {
      $('.ask .price').val(initPrice)
      $('.ask .amount').val(d.Value.Amount)
    })
  })
}
