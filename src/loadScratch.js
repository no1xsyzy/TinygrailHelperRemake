import $ from 'jquery'
import { getData, postData } from './api.js'
import { getItemsSetting } from './storage/itemsSetting'
import { loadCharacterList } from './loadCharacterList'

export function loadScratch () {
  const ItemsSetting = getItemsSetting()
  $('#eden_tpc_list ul').html('')
  $('#eden_tpc_list ul').append('<li class="line_odd item_list" style="text-align: center;">[刮刮乐]</li>')
  const scratchResults = []
  const scratchIds = []
  const chaosCubeResults = []
  const chaosCubeIds = []
  scratch()

  function scratch () {
    getData('event/scratch/bonus2').then((d) => {
      if (d.State === 0) {
        for (let i = 0; i < d.Value.length; i++) {
          scratchResults.push(d.Value[i])
          scratchIds.push(d.Value[i].Id)
        }
        if (!d.Value.length) {
          scratchResults.push(d.Value)
          scratchIds.push(d.Value.Id)
        }
        scratch()
      } else {
        postData('chara/list', scratchIds.map(x => +x)).then((d) => {
          for (let i = 0; i < d.Value.length; i++) {
            d.Value[i].Sacrifices = scratchResults[i].Amount
            d.Value[i].Current = scratchResults[i].SellPrice
          }
          loadCharacterList(d.Value, 2, 2, loadScratch, 'chara', false)
          $('#eden_tpc_list ul').append('<li class="line_odd item_list" style="text-align: center;">[混沌魔方]</li>')
          chaosCube()
        })
      }
    })
  }

  function chaosCube () {
    const templeId = ItemsSetting.chaosCube
    if (templeId) {
      postData(`magic/chaos/${templeId}`, null).then((d) => {
        console.log(d)
        if (d.State === 0) {
          for (let i = 0; i < d.Value.length; i++) {
            chaosCubeResults.push(d.Value[i])
            chaosCubeIds.push(d.Value[i].Id)
          }
          if (!d.Value.length) {
            chaosCubeResults.push(d.Value)
            chaosCubeIds.push(d.Value.Id)
          }
          chaosCube()
        } else {
          if (d.Message !== '今日已超过使用次数限制或资产不足。') {
            alert(d.Message)
            chaosCube()
          } else {
            postData('chara/list', chaosCubeIds.map(x => +x)).then((d) => {
              for (let i = 0; i < d.Value.length; i++) {
                d.Value[i].Sacrifices = chaosCubeResults[i].Amount
                d.Value[i].Current = chaosCubeResults[i].SellPrice
              }
              loadCharacterList(d.Value, 2, 2, loadScratch, 'chara', false)
            })
          }
        }
      })
    } else { alert('未设置施放混沌魔方的圣殿，请先在角色圣殿施放一次混沌魔方即可完成预设') }
  }
}
