import $ from 'jquery'
import { getData, postData } from './api.js'
import { formatNumber } from './formats'
import { normalizeAvatar } from './normalizeAvatar'

export function cancelBids () {
  if (!confirm('取消全部买单？')) { return }
  $('#eden_tpc_list ul').html('')
  getData('chara/user/assets').then((d) => {
    const Balance = d.Value.Balance
    getData('chara/bids/0/1/1000').then((d) => {
      cancelAllBids(d.Value.Items, Balance)
    })
  })
}

async function cancelAllBids (charas, Balance) {
  for (let i = 0; i < charas.length; i++) {
    const id = charas[i].Id
    const name = charas[i].Name
    const avatar = `<a href="/rakuen/topic/crt/${id}?trade=true" class="avatar l" target="right"><span class="avatarNeue avatarReSize32 ll" style="background-image:url('${normalizeAvatar(charas[i].Icon)}')"></span></a>`
    await getData(`chara/user/${id}`).then((d) => {
      let line = 'line_even'
      if (i % 2 === 0) { line = 'line_odd' }
      const tid = d.Value.Bids[0].Id
      const price = d.Value.Bids[0].Price
      const amount = d.Value.Bids[0].Amount
      Balance += price * amount
      postData(`chara/bid/cancel/${tid}`, null).then((d) => {
        const message = `<li class="${line} item_list item_log" data-id="${id}">${avatar}<span class="tag raise">+${formatNumber(price * amount, 2)}</span>
₵${formatNumber(Balance, 2)}<span class="row"><small class="time">取消买单(${tid}) #${id} 「${name}」 ${price}*${amount}</small></span></li>`
        $('#eden_tpc_list ul').prepend(message)
      })
    })
  }
}
