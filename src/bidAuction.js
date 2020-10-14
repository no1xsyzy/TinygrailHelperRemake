import $ from 'jquery'
import { postData } from './api.js'

export function bidAuction (chara) {
  $('#TB_window .loading').show()
  $('#TB_window .label').hide()
  $('#TB_window .desc').hide()
  $('#TB_window .trade').hide()
  const price = $('.trade.auction .price').val()
  const amount = $('.trade.auction .amount').val()
  postData(`chara/auction/${chara.Id}/${price}/${amount}`, null).then((d) => {
    $('#TB_window .loading').hide()
    $('#TB_window .label').show()
    $('#TB_window .desc').show()
    $('#TB_window .trade').show()
    if (d.State === 0) {
      const message = d.Value
      $('#TB_window .trade').hide()
      $('#TB_window .label').hide()
      $('#TB_window .desc').text(message)
    } else {
      alert(d.Message)
    }
  })
}
