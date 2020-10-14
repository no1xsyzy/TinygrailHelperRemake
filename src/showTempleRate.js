import $ from 'jquery'
import { getData } from './api.js'
import { formatNumber } from './formats'

export function showTempleRate (chara) {
  const rate = chara.Rate
  const level = chara.Level
  getData(`chara/temple/${chara.Id}`).then((d) => {
    const templeAll = {
      1: 0,
      2: 0,
      3: 0
    }
    for (let i = 0; i < d.Value.length; i++) {
      templeAll[d.Value[i].Level]++
    }
    const templeRate = rate * (level + 1) * 0.3
    $('#grailBox .assets_box .bold .sub').attr('title', '活股股息:' + formatNumber(rate, 2))
    $('#grailBox .assets_box .bold .sub').before(`<span class="sub"> (${templeAll[3]} + ${templeAll[2]} + ${templeAll[1]})</span>`)
    $('#expandButton').before(`<span class="sub" title="圣殿股息:${formatNumber(templeRate, 2)}"> (${formatNumber(templeRate, 2)})</span>`)
  })
}
