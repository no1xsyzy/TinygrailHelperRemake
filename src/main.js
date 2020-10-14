import './style.css'

import { launchObserver } from './launchObserver'
import { autoFillTemple } from './autoFillTemple'
import { autoTemple } from './autoTemple'
import { fillICO } from './ico/fill'
import { getShareBonus } from './getShareBonus'
import { hideBonusButton } from './hideBonusButton'
import { loadHelperMenu } from './loadHelperMenu'
import { showGallery } from './showGallery'
import { showHideGrailBox } from './showHideGrailBox'
import { showTopWeek } from './showTopWeek'
import { addCharaInfo } from './add_chara_info'
import { addIcoInfo } from './add_ico_info'
import { getSettings } from './storage/settings'

//= ======================================================================================================//

setInterval(autoFillTemple, 60 * 60 * 1000)
setInterval(autoTemple, 60 * 60 * 1000)
setInterval(fillICO, 30 * 1000)

// character page
if (location.pathname.startsWith('/rakuen/topic/crt') || location.pathname.startsWith('/character')) {
  const parentNode = document.getElementById('subject_info') || document.getElementById('columnCrtB')
  // charater trade info
  let charaFetched = false
  launchObserver({
    parentNode: parentNode,
    selector: '#grailBox .assets_box',
    failCallback: () => {
      charaFetched = false
    },
    successCallback: () => {
      if (charaFetched) return
      charaFetched = true
      addCharaInfo()
    },
    stopWhenSuccess: false
  })
  // charater ico info
  let icoFetched = false
  launchObserver({
    parentNode: parentNode,
    selector: '#grailBox .trade .money',
    failCallback: () => {
      icoFetched = false
    },
    successCallback: () => {
      if (icoFetched) return
      icoFetched = true
      addIcoInfo()
    },
    stopWhenSuccess: false
  })
} else if (location.pathname.startsWith('/rakuen/home')) { // rakuen homepage
  // 周六未领取股息则自动领取
  if (getSettings().get_bonus === 'on') getShareBonus()
  launchObserver({
    parentNode: document.body,
    selector: '#topWeek',
    successCallback: () => {
      hideBonusButton() // 隐藏签到
      showTopWeek() // 显示萌王榜排名数值
      showGallery() // 显示画廊
    }
  })
  let charaFetched = false
  launchObserver({
    parentNode: document.body,
    selector: '#grailBox .assets_box',
    failCallback: () => {
      charaFetched = false
    },
    successCallback: () => {
      if (charaFetched) return
      charaFetched = true
      addCharaInfo()
    },
    stopWhenSuccess: false
  })
} else if (location.pathname.startsWith('/rakuen/topiclist')) { // menu page
  setTimeout(function () {
    loadHelperMenu()
  }, 500)
} else if (location.pathname.startsWith('/user')) { // user homepage
  launchObserver({
    parentNode: document.body,
    selector: '#grail',
    successCallback: () => {
      showHideGrailBox()
      showGallery()
    }
  })
  let charaFetched = false
  launchObserver({
    parentNode: document.body,
    selector: '#grailBox .assets_box',
    failCallback: () => {
      charaFetched = false
    },
    successCallback: () => {
      if (charaFetched) return
      charaFetched = true
      addCharaInfo()
    },
    stopWhenSuccess: false
  })
}
