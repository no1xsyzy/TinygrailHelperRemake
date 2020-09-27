import { getFollowList, setFollowList } from "./storage/followList";

export function followChara( charaId ) {
  let followList = getFollowList();
  let button = `<button id="followCharaButton" class="text_button">[关注角色]</button>`;
  if ( followList.charas.includes( charaId ) ) {
    button = `<button id="followCharaButton" class="text_button">[取消关注]</button>`;
  }
  if ( $( '#kChartButton' ).length )
    $( '#kChartButton' ).before( button );
  else
    $( '#grailBox .title .text' ).after( button );

  $( '#followCharaButton' ).on( 'click', () => {
    if ( followList.charas.includes( charaId ) ) {
      followList.charas.splice( followList.charas.indexOf( charaId ), 1 );
      $( '#followCharaButton' ).text( '[关注角色]' );
    } else {
      followList.charas.unshift( charaId );
      $( '#followCharaButton' ).text( '[取消关注]' );
    }
    setFollowList( followList );
  } );
}
