import { getData } from './api.js'

export function getWeeklyShareBonus (callback) {
  if (!confirm('已经周六了，赶紧领取股息吧？')) { return }

  getData('event/share/bonus').then(d => {
    if (d.State === 0) { alert(d.Value) } else { alert(d.Message) }
    callback()
  })
}
