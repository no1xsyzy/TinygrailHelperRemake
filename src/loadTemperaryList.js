import { postData } from './api.js';
import { loadCharacterList } from './loadCharacterList';
import { charas_list } from "./charas_list";

export function loadTemperaryList( page ) {
  let start = 50 * ( page - 1 );
  let ids = charas_list.slice( start, start + 50 );
  console.log( ids );
  let totalPages = Math.ceil( charas_list.length / 50 );
  postData( 'chara/list', ids ).then( ( d ) => {
    if ( d.State === 0 ) {
      loadCharacterList( d.Value, page, totalPages, loadTemperaryList, 'chara', false );
    }
  } );
}
