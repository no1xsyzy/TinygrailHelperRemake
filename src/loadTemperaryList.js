import { postData } from './api.js'
import { loadCharacterList } from './loadCharacterList'
import { charasList } from './charasList'

export function loadTemperaryList (page) {
  const start = 50 * (page - 1)
  const ids = charasList.slice(start, start + 50)
  console.log(ids)
  const totalPages = Math.ceil(charasList.length / 50)
  postData('chara/list', ids).then((d) => {
    if (d.State === 0) {
      loadCharacterList(d.Value, page, totalPages, loadTemperaryList, 'chara', false)
    }
  })
}
