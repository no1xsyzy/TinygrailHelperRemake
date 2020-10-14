import $ from 'jquery'
import { getData } from './api.js'
import { getCharaInitPrice } from './storage/charaInitPrice'
import { formatNumber, formatDate } from './formats'
import { closeDialog } from './closeDialog'

export function openHistoryDialog (chara, page) {
  const dialog = `<div id="TB_overlay" class="TB_overlayBG TB_overlayActive"></div>
<div id="TB_window" class="dialog" style="display:block;max-width:640px;min-width:400px;">
<div class="title">上${page}周拍卖结果 - #${chara.Id} 「${chara.Name}」 ₵${formatNumber(chara.Current, 2)} / ${formatNumber(chara.Total, 0)}</div>
<div class="desc" style="display:none"></div>
<div class="result" style="display:none; max-height: 500px; overflow: auto;"></div>
<div class="page_inner">
<a id="nextweek" class="p" style="display:none; float: left;margin-bottom: 5px;margin-left: 50px;">后一周</a>
<a id="lastweek" class="p" style="display:none; float: right;margin-bottom: 5px;margin-right: 50px;">前一周</a>
</div>
<div class="loading"></div>
<a id="TB_closeWindowButton" title="Close">X关闭</a>
</div>`
  $('body').append(dialog)

  $('#TB_closeWindowButton').on('click', closeDialog)
  $('#TB_overlay').on('click', closeDialog)
  const charaInitPrice = getCharaInitPrice()
  const weekAsMilliseconds = 7 * 24 * 3600 * 1000
  const templeWeek = Math.floor((new Date() - new Date('2019/10/05')) / weekAsMilliseconds + 1)
  const icoWeek = Math.floor((new Date() - new Date(charaInitPrice[chara.Id].time)) / weekAsMilliseconds + 1)
  const week = Math.min(templeWeek, icoWeek)
  getData(`chara/auction/list/${chara.Id}/${page}`).then((d) => {
    $('#TB_window .loading').hide()
    if (d.State === 0 && d.Value.length > 0) {
      let success = 0
      let total = 0
      d.Value.forEach((a) => {
        let state = 'even'
        let name = '失败'
        if (a.State === 1) {
          success++
          total += a.Amount
          state = 'raise'
          name = '成功'
        }
        const record = `
<div class="row"><span class="time">${formatDate(a.Bid)}</span>
<span class="user"><a target="_blank" href="/user/${a.Username}">${a.Nickname}</a></span>
<span class="price">₵${formatNumber(a.Price, 2)} / ${formatNumber(a.Amount, 0)}</span>
<span class="tag ${state}">${name}</span></div>`
        $('#TB_window .result').append(record)
      })
      $('#TB_window .desc').text(`共有${d.Value.length}人参与拍卖，成功${success}人 / ${total}股`)
      $('#TB_window .result').show()
    } else {
      $('#TB_window .desc').text('暂无拍卖数据')
    }
    $('#TB_window .desc').show()
    if (page > 1) { $('#nextweek').show() }
    if (page < week) { $('#lastweek').show() }
    $('#nextweek').on('click', () => {
      page--
      closeDialog()
      openHistoryDialog(chara, page)
    })
    $('#lastweek').on('click', () => {
      page++
      closeDialog()
      openHistoryDialog(chara, page)
    })
  })
}
