import { formatNumber, formatTime } from '../formats'
import renderCharacterDepth from './characterDepth'
import renderCharacterTag from './characterTag'
import renderBadge from './badge'
import { normalizeAvatar } from '../normalizeAvatar'
import { caculateICO } from '../ico/calculate'

export function renderCharacter (item, type, even, showCancel) {
  let line = 'line_odd'
  if (even) { line = 'line_even' }
  const amount = `<small title="固定资产">${formatNumber(item.Sacrifices, 0)}</small>`

  const tag = renderCharacterTag(item)
  const depth = renderCharacterDepth(item)
  let id = item.Id
  if (item.CharacterId) { id = item.CharacterId }
  const time = item.LastOrder
  let avatar = `<a href="/rakuen/topic/crt/${id}?trade=true" class="avatar l" target="right"><span class="avatarNeue avatarReSize32 ll" style="background-image:url('${normalizeAvatar(item.Icon)}')"></span></a>`
  let cancel = ''
  if (showCancel) { cancel = `<span><small data-id="${id}" class="cancel_auction">[取消]</small></span>` }
  let badge = renderBadge(item, true, true, true)
  let chara

  if (type === 'auction') {
    chara = `<li class="${line} item_list" data-id="${id}">${avatar}<div class="inner">
<a href="/rakuen/topic/crt/${id}?trade=true" class="title avatar l" target="right">${item.Name}${badge}</a> <small class="grey">(+${item.Rate.toFixed(2)})</small>
<div class="row"><small class="time">${formatTime(time)}</small>
${cancel}</div></div>${tag}</li>`
  } else if (type === 'ico') {
    badge = renderBadge(item, false, false, false)
    chara = `<li class="${line} item_list" data-id="${id}">${avatar}<div class="inner">
<a href="/rakuen/topic/crt/${id}?trade=true" class="title avatar l" target="right">${item.Name}${badge}</a>
<div class="row"><small class="time">${formatTime(item.End)}</small><span><small>${formatNumber(item.State, 0)} / ${formatNumber(item.Total, 1)}</small></span>
</div></div><div class="tags tag lv1">ICO进行中</div></li>`
  } else if (type === 'temple') {
    let costs = ''
    if (item.Assets - item.Sacrifices < 0) {
      costs = `<small class="fall" title="损耗">${item.Assets - item.Sacrifices}</small>
<span><small data-id="${id}" data-lv="${item.CharacterLevel}"  data-cost="${item.Sacrifices - item.Assets}" class="fill_costs">[补充]</small></span>`
    }
    avatar = `<a href="/rakuen/topic/crt/${id}?trade=true" class="avatar l" target="right"><span class="avatarNeue avatarReSize32 ll" style="background-image:url('${normalizeAvatar(item.Cover)}')"></span></a>`
    chara = `<li class="${line} item_list" data-id="${id}" data-lv="${item.CharacterLevel}">${avatar}<div class="inner">
<a href="/rakuen/topic/crt/${id}?trade=true" class="title avatar l" target="right">${item.Name}<span class="badge lv${item.CharacterLevel}">lv${item.CharacterLevel}</span></a> <small class="grey">(+${item.Rate.toFixed(2)})</small>
<div class="row"><small class="time" title="创建时间">${formatTime(item.Create)}</small><small title="固有资产 / 献祭值">${item.Assets} / ${item.Sacrifices}</small>${costs}</div></div>
<div class="tag lv${item.Level}">${item.Level}级圣殿</div></li>`
  } else if (!item.Current) {
    const pre = caculateICO(item)
    badge = renderBadge(item, false, false, false)
    // let percent = formatNumber(item.Total / pre.Next * 100, 0);
    chara = `<li class="${line} item_list" data-id="${id}">${avatar}<div class="inner">
<a href="/rakuen/topic/crt/${id}?trade=true" class="title avatar l" target="right">${item.Name}${badge}</a> <small class="grey">(ICO进行中: lv${pre.Level})</small>
<div class="row"><small class="time">${formatTime(item.End)}</small><span><small>${formatNumber(item.Users, 0)}人 / ${formatNumber(item.Total, 1)} / ₵${formatNumber(pre.Price, 2)}</small></span>
${cancel}</div></div><div class="tags tag lv${pre.Level}">ICO进行中</div></li>`
  } else {
    chara = `<li class="${line} item_list" data-id="${id}">${avatar}<div class="inner">
<a href="/rakuen/topic/crt/${id}?trade=true" class="title avatar l" target="right">${item.Name}${badge}</a> <small class="grey">(+${item.Rate.toFixed(2)} / ${formatNumber(item.Total, 0)} / ₵${formatNumber(item.MarketValue, 0)})</small>
<div class="row"><small class="time">${formatTime(item.LastOrder)}</small>${amount}<span title="买入 / 卖出 / 成交">${depth}</span>
${cancel}</div></div>${tag}</li>`
  }

  return chara
}
