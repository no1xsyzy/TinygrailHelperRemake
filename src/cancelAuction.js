import $ from 'jquery'
import { getData, postData } from './api.js'

export function cancelAuction (chara) {
  let message = '确定取消竞拍？'
  const Day = new Date().getDay()
  if (Day === 6) { message = '周六取消竞拍将收取20%税，确定取消竞拍？' }
  if (!confirm(message)) { return }
  $('#TB_window .loading').show()
  $('#TB_window .label').hide()
  $('#TB_window .desc').hide()
  $('#TB_window .trade').hide()
  getData('chara/user/auction/1/100').then((d) => {
    let id = 0
    for (let i = 0; i < d.Value.Items.length; i++) {
      if (chara.Id === d.Value.Items[i].CharacterId) {
        id = d.Value.Items[i].Id
        break
      }
    }
    if (id) {
      postData(`chara/auction/cancel/${id}`, null).then((d) => {
        $('#TB_window .loading').hide()
        $('#TB_window .label').show()
        $('#TB_window .desc').show()
        $('#TB_window .trade').show()
        if (d.State === 0) {
          $('#TB_window .trade').hide()
          $('#TB_window .label').hide()
          $('#TB_window .desc').text('取消竞拍成功')
        } else { alert(d.Message) }
      })
    } else {
      $('#TB_window .loading').hide()
      $('#TB_window .desc').text('未找到竞拍角色')
    }
  })
}
