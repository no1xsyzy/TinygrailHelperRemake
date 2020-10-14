import $ from 'jquery'
import { getFillICOList } from './storage/fillICOList'
import { openICODialog } from './openICODialog'

export function setFullFillICO (chara) {
  const fillicoList = getFillICOList()
  let button
  let inorder = false
  const charaId = chara.CharacterId
  for (let i = 0; i < fillicoList.length; i++) {
    if (fillicoList[i].charaId === charaId) {
      inorder = true
    }
  }
  if (inorder) {
    button = '<button id="followICOButton" class="text_button">[自动补款中]</button>'
  } else {
    button = '<button id="followICOButton" class="text_button">[自动补款]</button>'
  }
  $('#grailBox .title .text').after(button)
  $('#followICOButton').on('click', () => {
    openICODialog(chara)
  })
}
