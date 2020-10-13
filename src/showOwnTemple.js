import $ from 'jquery'
import { getFollowList, setFollowList } from "./storage/followList";
import { getSettings } from "./storage/settings"

export function showOwnTemple() {
  let followList = getFollowList();
  let settings = getSettings();
  let pre_temple = settings.pre_temple;
  let temples = $( '#lastTemples .item' );
  let me = followList.user;
  if ( !me ) {
    me = $( '#new_comment .reply_author a' )[ 0 ].href.split( '/' ).pop();
    followList.user = me;
    setFollowList( followList );
  }
  for ( let i = 0; i < temples.length; i++ ) {
    if ( temples[ i ].querySelector( `.name a[href$="${me}"]` ) ) {
      temples[ i ].classList.add( 'my_temple' );
      temples[ i ].classList.remove( 'replicated' );
      if ( pre_temple == 'on' )
        $( '#lastTemples' ).prepend( temples[ i ] );
      break;
    }
  }
  $( '#expandButton' ).one( 'click', () => {
    showOwnTemple();
  } );
}
