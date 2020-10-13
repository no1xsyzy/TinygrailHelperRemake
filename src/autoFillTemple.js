import { getData, postData } from './api.js'
import { getSettings } from './storage/settings'
import { getItemsSetting } from './storage/itemsSetting'

const ItemsSetting = getItemsSetting()

// 自动补塔
export function autoFillTemple () {
  if (getSettings().auto_fill_temple !== 'on') { return }
  async function autoFillCosts (autoFillCostList) {
    for (let i = 0; i < autoFillCostList.length; i++) {
      const id = autoFillCostList[i].id
      const supplyId = autoFillCostList[i].supplyId
      const cost = autoFillCostList[i].cost
      await postData(`magic/stardust/${supplyId}/${id}/${cost}/true`, null).then((d) => {
        if (d.State === 0) {
          console.log(`自动补塔 #${id} ${d.Value}`)
        } else {
          console.log(`自动补塔 #${id} ${d.Message}`)
        }
      })
    }
  }

  function checkLostTemple (currentPage) {
    const autoFillCostList = []
    getData(`chara/user/temple/0/${currentPage}/500`).then((d) => {
      if (d.State === 0) {
        for (let i = 0; i < d.Value.Items.length; i++) {
          const info = {}
          const lv = d.Value.Items[i].CharacterLevel
          info.id = d.Value.Items[i].CharacterId
          info.supplyId = ItemsSetting.stardust ? ItemsSetting.stardust[lv] : null
          info.cost = d.Value.Items[i].Sacrifices - d.Value.Items[i].Assets
          if (info.cost >= 100 && info.cost <= 250 && info.id !== info.supplyId && info.supplyId) {
            autoFillCostList.push(info)
          }
        }
        autoFillCosts(autoFillCostList)
        if (currentPage < d.Value.TotalPages) {
          checkLostTemple(currentPage + 1)
        }
      }
    })
  }
  checkLostTemple(1)
}
