import $ from 'jquery'
export function menuItemClicked (func) {
  $('.timelineTabs a').removeClass('focus')
  $('.timelineTabs a').removeClass('top_focus')
  $('#helperMenu').addClass('focus')
  if (func) { func(1) }
}
