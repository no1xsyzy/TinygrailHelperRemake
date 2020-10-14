import { getData } from './api.js'
import { setBuildTemple } from './setBuildTemple'
import { followChara } from './followChara'
import { setFullFillICO } from './setFullFillICO'
import { showEndTime } from './showEndTime'

export function addIcoInfo () {
  const charaId = location.pathname.split('/').pop()
  followChara(charaId) // 关注角色
  getData(`chara/${charaId}`).then((d) => {
    const chara = d.Value
    showEndTime(chara) // 显示结束时间
    setBuildTemple(chara) // 自动建塔
    setFullFillICO(chara) // 自动补款
  })
}
