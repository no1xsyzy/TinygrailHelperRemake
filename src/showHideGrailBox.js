import $ from 'jquery'
export function showHideGrailBox() {
  let settings = getSettings();
  let config = settings.hide_grail;
  if ( config == 'on' ) {
    $( '#grail' ).hide();
    setTimeout( () => {
      $( '#pager1' ).hide();
    }, 500 );
  }
}
