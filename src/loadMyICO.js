import { getData } from './api.js'
import { loadCharacterList } from './loadCharacterList'

export function loadMyICO (page) {
  getData(`chara/user/initial/0/${page}/50`).then((d) => {
    if (d.State === 0) {
      loadCharacterList(d.Value.Items, d.Value.CurrentPage, d.Value.TotalPages, loadMyICO, 'ico', false)
    }
  })
}
