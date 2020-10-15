import { postData } from './api.js'
import { getFillICOList } from './storage/fillICOList'
import { loadCharacterList } from './loadCharacterList'
import { loadAutoBuild } from './loadAutoBuild'

export function loadAutoFillICO (page) {
  const fillicoList = getFillICOList()
  const charas = []
  for (let i = 0; i < fillicoList.length; i++) { charas.push(fillicoList[i].charaId) }
  const start = 50 * (page - 1)
  const ids = charas.slice(start, start + 50)
  const totalPages = Math.ceil(charas.length / 50)
  postData('chara/list', ids.map(x => +x)).then((d) => {
    if (d.State === 0) {
      loadCharacterList(d.Value, page, totalPages, loadAutoBuild, 'chara_ico', false)
    }
  })
}
