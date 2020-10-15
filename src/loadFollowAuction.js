import { postData } from './api.js'
import { getFollowList } from './storage/followList'
import { loadCharacterList } from './loadCharacterList'
import { loadValhalla } from './loadValhalla'
import { loadUserAuctions } from './loadUserAuctions'

export function loadFollowAuction (page) {
  const followList = getFollowList()
  const start = 20 * (page - 1)
  const ids = followList.auctions.slice(start, start + 20)
  const totalPages = Math.ceil(followList.auctions.length / 20)
  postData('chara/list', ids.map(x => +x)).then((d) => {
    if (d.State === 0) {
      loadCharacterList(d.Value, page, totalPages, loadFollowAuction, 'auction', true)
      postData('chara/auction/list', ids).then((d) => {
        loadUserAuctions(d)
      })
      loadValhalla(ids)
    }
  })
}
