import $ from 'jquery'
import { closeDialog } from './closeDialog'
import { getSettings } from './storage/settings'

export function showGallery () {
  const settings = getSettings()
  if (settings.gallery === 'on') {
    let index = 0
    $('body').on('keydown', function (e) {
      switch (event.keyCode) {
        case 37:
          closeDialog()
          $('.item .card')[index - 1].click()
          break
        case 39:
          closeDialog()
          $('.item .card')[index + 1].click()
          break
      }
    })
    $('body').on('touchstart', '#TB_window.temple', function (e) {
      let touch = e.originalEvent
      const startX = touch.changedTouches[0].pageX
      $(this).on('touchmove', function (e) {
        e.preventDefault()
        touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]
        if (touch.pageX - startX > 20) { // 向左
          closeDialog()
          $('.item .card')[index - 1].click()
          $(this).off('touchmove')
        } else if (touch.pageX - startX < -20) { // 向右
          closeDialog()
          $('.item .card')[index + 1].click()
          $(this).off('touchmove')
        };
      })
    }).on('touchend', function () {
      $(this).off('touchmove')
    })
    setInterval(function () {
      $('.item .card').on('click', (e) => {
        index = $('.item .card').index(e.currentTarget)
      })
    }, 1000)
  }
}
