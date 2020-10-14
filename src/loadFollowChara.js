import { postData } from './api.js'
import { getFollowList } from './storage/followList'
import { loadCharacterList } from './loadCharacterList'

export function loadFollowChara (page) {
  const followList = getFollowList()
  const start = 50 * (page - 1)
  const ids = followList.charas.slice(start, start + 50)
  const totalPages = Math.ceil(followList.charas.length / 50)
  postData('chara/list', ids).then((d) => {
    if (d.State === 0) {
      loadCharacterList(d.Value, page, totalPages, loadFollowChara, 'chara', true)
    }
  })
}
