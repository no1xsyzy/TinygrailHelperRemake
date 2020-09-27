import { postData } from './api.js';
import { getFollowList } from "./storage/followList";
import { loadCharacterList } from './loadCharacterList';
import { loadValhalla } from "./loadValhalla";
import { loadUserAuctions } from "./loadUserAuctions";

export function loadFollowAuction( page ) {
  let followList = getFollowList();
  let start = 20 * ( page - 1 );
  let ids = followList.auctions.slice( start, start + 20 );
  let totalPages = Math.ceil( followList.auctions.length / 20 );
  postData( 'chara/list', ids ).then( ( d ) => {
    if ( d.State === 0 ) {
      loadCharacterList( d.Value, page, totalPages, loadFollowAuction, 'auction', true );
      postData( 'chara/auction/list', ids ).then( ( d ) => {
        loadUserAuctions( d );
      } );
      loadValhalla( ids );
    }
  } );
}
