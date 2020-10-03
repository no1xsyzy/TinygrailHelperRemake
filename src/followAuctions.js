import $ from 'jquery'
import { getData } from './api.js';
import { getFollowList, setFollowList } from "./storage/followList";

export function followAuctions( charaId ) {
  getData( `chara/user/${charaId}/tinygrail/false` ).then( ( d ) => {
    let followList = getFollowList();
    if ( d.State == 0 ) {
      let button;
      if ( followList.auctions.includes( charaId ) ) {
        button = `<button id="followAuctionButton" class="text_button">[取消关注]</button>`;
      } else {
        button = `<button id="followAuctionButton" class="text_button">[关注竞拍]</button>`;
      }
      $( '#buildButton' ).before( button );
      $( '#followAuctionButton' ).on( 'click', () => {
        if ( followList.auctions.includes( charaId ) ) {
          followList.auctions.splice( followList.auctions.indexOf( charaId ), 1 );
          $( '#followAuctionButton' ).text( '[关注竞拍]' );
        } else {
          followList.auctions.unshift( charaId );
          $( '#followAuctionButton' ).text( '[取消关注]' );
        }
        setFollowList( followList );
      } );
    }
  } );
}
