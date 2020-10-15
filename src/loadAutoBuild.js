import { postData } from './api.js'
import { getAutoTempleList } from './storage/autoTempleList'
import { loadCharacterList } from './loadCharacterList'
import { autoBuildTemple } from './autoBuildTemple'

export function loadAutoBuild (page) {
  const autoTempleList = getAutoTempleList()
  autoBuildTemple(autoTempleList)
  const charas = []
  for (let i = 0; i < autoTempleList.length; i++) { charas.push(autoTempleList[i].charaId) }
  const start = 50 * (page - 1)
  const ids = charas.slice(start, start + 50)
  const totalPages = Math.ceil(charas.length / 50)
  postData('chara/list', ids.map(x => +x)).then((d) => {
    if (d.State === 0) {
      loadCharacterList(d.Value, page, totalPages, loadAutoBuild, 'chara', false)
    }
  })
}
