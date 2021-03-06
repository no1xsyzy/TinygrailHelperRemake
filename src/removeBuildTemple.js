import $ from 'jquery'
import { getAutoTempleList, setAutoTempleList } from './storage/autoTempleList'

export function removeBuildTemple (charaId) {
  const autoTempleList = getAutoTempleList()
  for (let i = 0; i < autoTempleList.length; i++) {
    if (autoTempleList[i].charaId === charaId) {
      autoTempleList.splice(i, 1)
      break
    }
  }
  $('#autobuildButton').text('[自动建塔]')
  setAutoTempleList(autoTempleList)
}
