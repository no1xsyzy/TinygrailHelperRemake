import $ from 'jquery'
import { openBuildDialog } from './openBuildDialog'
import { getAutoTempleList, setAutoTempleList } from './storage/autoTempleList'

export function setBuildTemple (chara) {
  let inTempleList = false
  let charaId = chara.Id
  const autoTempleList = getAutoTempleList()
  if (chara.CharacterId) { charaId = chara.CharacterId }
  for (let i = 0; i < autoTempleList.length; i++) {
    if (autoTempleList[i].charaId === charaId) { inTempleList = true }
  }
  setAutoTempleList(autoTempleList)
  let button
  if (inTempleList) {
    button = '<button id="autobuildButton" class="text_button">[自动建塔中]</button>'
  } else {
    button = '<button id="autobuildButton" class="text_button">[自动建塔]</button>'
  }
  if ($('#buildButton').length) { $('#buildButton').after(button) } else { $('#grailBox .title .text').after(button) }

  $('#autobuildButton').on('click', () => {
    openBuildDialog(chara)
  })
}
