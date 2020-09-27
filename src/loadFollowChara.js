import { postData } from './api.js';
import { getFollowList } from "./storage/followList";
import { loadCharacterList } from './loadCharacterList';

export function loadFollowChara( page ) {
  let followList = getFollowList();
  let start = 50 * ( page - 1 );
  let ids = followList.charas.slice( start, start + 50 );
  let totalPages = Math.ceil( followList.charas.length / 50 );
  postData( 'chara/list', ids ).then( ( d ) => {
    if ( d.State === 0 ) {
      loadCharacterList( d.Value, page, totalPages, loadFollowChara, 'chara', true );
    }
  } );
}
