import $ from 'jquery'
import { getFollowList } from "./storage/followList";

export function showOwnLink() {
  let followList = getFollowList();
  let settings = getSettings();
  let pre_link = settings.pre_temple;
  let links = $( '#grailBox .assets_box #lastLinks.assets .link.item' );
  let me = followList.user;
  if ( !me ) {
    me = $( '#new_comment .reply_author a' )[ 0 ].href.split( '/' ).pop();
    followList.user = me;
    localStorage.setItem( 'TinyGrail_followList', JSON.stringify( followList ) );
  }
  for ( let i = 0; i < links.length; i++ ) {
    let user = links[ i ].querySelector( '.name a' ).href.split( '/' ).pop();
    if ( user === me ) {
      links[ i ].classList.add( 'my_link' );
      if ( pre_link == 'on' )
        $( links[ i ] ).siblings( '.rank.item' ).after( links[ i ] );
      break;
    }
  }
}
