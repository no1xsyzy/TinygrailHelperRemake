import { getFillICOList, setFillICOList } from '../storage/fillICOList'
import { fullfillICO } from './fullfill'
import { removeEmpty } from '../removeEmpty'

export function fillICO () {
  let fillicoList = getFillICOList()
  const icoList = []
  for (let i = 0; i < fillicoList.length; i++) {
    const endTime = new Date(new Date(fillicoList[i].end) - (new Date().getTimezoneOffset() + 8 * 60) * 60 * 1000)
    const leftTime = (new Date(endTime).getTime() - new Date().getTime()) / 1000 // 剩余时间：秒
    if (leftTime < 60) {
      console.log(`ico check#${fillicoList[i].charaId} -「${fillicoList[i].name}」 目标等级:lv${fillicoList[i].target} ${leftTime}s left`)
      icoList.push(fillicoList[i])
      delete fillicoList[i]
    }
  }
  fillicoList = removeEmpty(fillicoList)
  setFillICOList(fillicoList)
  if (icoList.length) { fullfillICO(icoList) }
}
