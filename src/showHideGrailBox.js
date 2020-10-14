import $ from 'jquery'
import { getSettings } from './storage/settings'

export function showHideGrailBox () {
  const settings = getSettings()
  const config = settings.hide_grail
  if (config === 'on') {
    $('#grail').hide()
    setTimeout(() => {
      $('#pager1').hide()
    }, 500)
  }
}
