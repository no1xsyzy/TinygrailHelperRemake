import $ from 'jquery'
import { getData, postData } from './api.js'

export async function autoJoinICO (icoList) {
  for (let i = 0; i < icoList.length; i++) {
    const charaId = icoList[i].CharacterId
    await getData(`chara/${charaId}`).then((d) => {
      if (d.State === 0) {
        const offer = 5000
        const Id = d.Value.Id
        if (d.Value.Total < 100000 && d.Value.Users < 15) {
          getData(`chara/initial/${Id}`).then((d) => {
            if (d.State === 1) {
              postData(`chara/join/${Id}/${offer}`, null).then((d) => {
                if (d.State === 0) {
                  console.log(`#${charaId} 追加注资成功。`)
                  $(`#eden_tpc_list li[data-id=${charaId}] .row`).append(`<small class="raise">+${offer}</small>`)
                }
              })
            }
          })
        }
      }
    })
  }
}
