import $ from 'jquery'
import { getFollowList } from './storage/followList'
import { getSettings } from './storage/settings'

export function showOwnLink () {
  const followList = getFollowList()
  const settings = getSettings()
  const preLink = settings.pre_temple
  const links = $('#grailBox .assets_box #lastLinks.assets .link.item')
  let me = followList.user
  if (!me) {
    me = $('#new_comment .reply_author a')[0].href.split('/').pop()
    followList.user = me
    localStorage.setItem('TinyGrail_followList', JSON.stringify(followList))
  }
  for (let i = 0; i < links.length; i++) {
    const user = links[i].querySelector('.name a').href.split('/').pop()
    if (user === me) {
      links[i].classList.add('my_link')
      if (preLink === 'on') { $(links[i]).siblings('.rank.item').after(links[i]) }
      break
    }
  }
}
