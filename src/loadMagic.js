import $ from 'jquery'
import { postData } from './api.js'
import { getItemsSetting, setItemsSetting } from './storage/itemsSetting'
import { closeDialog } from './closeDialog'
import { loadCharacterList } from './loadCharacterList'
import { loadScratch } from './loadScratch'

export function loadMagic () {
  closeDialog()
  const ItemsSetting = getItemsSetting()
  const templeId = ItemsSetting.chaosCube || ''
  const monoId = ItemsSetting.guidepost ? ItemsSetting.guidepost.monoId : ''
  const toMonoId = ItemsSetting.guidepost ? ItemsSetting.guidepost.toMonoId : ''
  const dialog = `<div id="TB_overlay" class="TB_overlayBG TB_overlayActive"></div>
<div id="TB_window" class="dialog" style="display:block;max-width:640px;min-width:400px;">
<table align="center" width="98%" cellspacing="0" cellpadding="5" class="settings">
<tr><td title="消耗圣殿10点固定资产，获取随机角色10-100股随机数量">混沌魔方</td>
<td>炮塔：<input id="chaosCube" type="number" style="width:60px" value="${templeId}"></td><td></td>
<td><input class="inputBtn" value="发射" id="submit_chaosCube" type="submit"></td></tr>
<tr><td title="消耗圣殿100点固定资产，获取指定股票10-100股随机数量，目标人物的等级要小于或等于发动攻击圣殿的人物等级">虚空道标</td>
<td>炮塔：<input id="monoId" type="number" style="width:60px" value="${monoId}"></td>
<td>目标：<input id="toMonoId" type="number" style="width:60px" value="${toMonoId}"></td>
<td><input class="inputBtn" value="发射" id="submit_guidepost" type="submit"></td></tr>
<tr><td title="用一个角色的活股或固定资产，给另一个角色的圣殿消耗进行补充，目标人物的等级要小于或等于发动攻击圣殿的人物等级">星光碎片</td>
<td>能源：<input id="supplyId" type="number" style="width:60px"></td>
<td>目标：<input id="toSupplyId" type="number" style="width:60px"></td></tr>
<td></td><td>类型：<select id="isTemple" style="width:60px"><option value="false">活股</option><option value="true" selected="selected">塔股</option></select></td>
<td>数量：<input id="amount" type="number" style="width:60px" value="100"></td>
<td><input class="inputBtn" value="充能" id="submit_stardust" type="submit"></td></tr>
</tbody></table>
<a id="TB_closeWindowButton" title="Close">X关闭</a>
</div>
</div>`

  $('body').append(dialog)
  $('#TB_closeWindowButton').on('click', closeDialog)
  $('#TB_overlay').on('click', closeDialog)
  $('#submit_chaosCube').on('click', () => {
    const templeId = $('#chaosCube').val()
    ItemsSetting.chaosCube = templeId
    setItemsSetting(ItemsSetting)
    postData(`magic/chaos/${templeId}`, null).then((d) => {
      closeDialog()
      console.log(d)
      if (d.State === 0) {
        $('#eden_tpc_list ul').html('')
        $('#eden_tpc_list ul').append('<li class="line_odd item_list" style="text-align: center;">[混沌魔方]</li>')
        const Id = d.Value.Id
        const Amount = d.Value.Amount
        const SellPrice = d.Value.SellPrice
        postData('chara/list', [Id].map(x => +x)).then((d) => {
          for (let i = 0; i < d.Value.length; i++) {
            d.Value[i].Sacrifices = Amount
            d.Value[i].Current = SellPrice
          }
          loadCharacterList(d.Value, 2, 2, loadScratch, 'chara', false)
        })
      } else { alert(d.Message) }
    })
  })
  $('#submit_guidepost').on('click', () => {
    const monoId = $('#monoId').val()
    const toMonoId = $('#toMonoId').val()
    ItemsSetting.guidepost = {
      monoId: monoId,
      toMonoId: toMonoId
    }
    setItemsSetting(ItemsSetting)
    postData(`magic/guidepost/${monoId}/${toMonoId}`, null).then((d) => {
      closeDialog()
      console.log(d)
      if (d.State === 0) {
        $('#eden_tpc_list ul').html('')
        $('#eden_tpc_list ul').append('<li class="line_odd item_list" style="text-align: center;">[虚空道标]</li>')
        const Id = d.Value.Id
        const Amount = d.Value.Amount
        const SellPrice = d.Value.SellPrice
        postData('chara/list', [Id].map(x => +x)).then((d) => {
          for (let i = 0; i < d.Value.length; i++) {
            d.Value[i].Sacrifices = Amount
            d.Value[i].Current = SellPrice
          }
          loadCharacterList(d.Value, 2, 2, loadScratch, 'chara', false)
        })
      } else { alert(d.Message) }
    })
  })
  $('#submit_stardust').on('click', () => {
    const supplyId = $('#supplyId').val()
    const toSupplyId = $('#toSupplyId').val()
    const isTemple = $('#isTemple').val()
    const amount = $('#amount').val()
    postData(`magic/stardust/${supplyId}/${toSupplyId}/${amount}/${isTemple}`, null).then((d) => {
      closeDialog()
      console.log(d)
      if (d.State === 0) {
        alert(d.Value)
        $('#eden_tpc_list ul').html('')
        $('#eden_tpc_list ul').append('<li class="line_odd item_list" style="text-align: center;">[星光碎片]</li>')
        postData('chara/list', [supplyId, toSupplyId].map(x => +x)).then((d) => {
          loadCharacterList(d.Value, 2, 2, loadScratch, 'chara', false)
        })
      } else { alert(d.Message) }
    })
  })
}
